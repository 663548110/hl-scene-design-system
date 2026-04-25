import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const themeStore = require('../theme-store.js');
const Theme = require('../theme-model.js');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Theme.deleteMany({});
});

describe('ThemeStore (MongoDB)', () => {
  describe('createCustomTheme', () => {
    it('应创建主题并返回完整对象', async () => {
      const result = await themeStore.createCustomTheme({
        name: 'Test Theme',
        platform: 'web',
        variables: { light: 'a', dark: 'b', extra: 'c' },
      });

      expect(result.id).toMatch(/^custom-\d+-[0-9a-f]{6}$/);
      expect(result.name).toBe('Test Theme');
      expect(result.platform).toBe('web');
      expect(result.variables).toEqual({ light: 'a', dark: 'b', extra: 'c' });
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });
  });

  describe('getCustomTheme', () => {
    it('存在的 id 应返回完整数据', async () => {
      const created = await themeStore.createCustomTheme({
        name: 'Fetch Me',
        platform: 'mobile',
        variables: { light: '1' },
      });

      const fetched = await themeStore.getCustomTheme(created.id);
      expect(fetched).not.toBeNull();
      expect(fetched.name).toBe('Fetch Me');
      expect(fetched.platform).toBe('mobile');
    });

    it('不存在的 id 应返回 null', async () => {
      const result = await themeStore.getCustomTheme('custom-0000000000000-aaaaaa');
      expect(result).toBeNull();
    });
  });

  describe('listCustomThemes', () => {
    it('无主题时应返回空数组', async () => {
      const list = await themeStore.listCustomThemes();
      expect(list).toEqual([]);
    });

    it('应按 updatedAt 降序排列', async () => {
      await themeStore.createCustomTheme({ name: 'A', variables: { x: 1 } });
      await themeStore.createCustomTheme({ name: 'B', variables: { x: 2 } });

      const list = await themeStore.listCustomThemes();
      expect(list.length).toBe(2);
      expect(new Date(list[0].updatedAt).getTime())
        .toBeGreaterThanOrEqual(new Date(list[1].updatedAt).getTime());
    });

    it('platform 过滤应只返回匹配项', async () => {
      await themeStore.createCustomTheme({ name: 'Web', platform: 'web', variables: { x: 1 } });
      await themeStore.createCustomTheme({ name: 'Mobile', platform: 'mobile', variables: { x: 2 } });

      const webList = await themeStore.listCustomThemes('web');
      expect(webList.length).toBe(1);
      expect(webList[0].platform).toBe('web');
    });
  });

  describe('updateCustomTheme', () => {
    it('应更新字段并刷新 updatedAt', async () => {
      const created = await themeStore.createCustomTheme({
        name: 'Original',
        variables: { old: true },
      });

      const updated = await themeStore.updateCustomTheme(created.id, {
        name: 'Updated',
        variables: { new: true },
      });

      expect(updated.name).toBe('Updated');
      expect(updated.variables).toEqual({ new: true });
      expect(new Date(updated.updatedAt).getTime())
        .toBeGreaterThanOrEqual(new Date(created.updatedAt).getTime());
    });

    it('不存在的 id 应返回 null', async () => {
      const result = await themeStore.updateCustomTheme('custom-0000000000000-aaaaaa', { name: 'Nope' });
      expect(result).toBeNull();
    });
  });

  describe('removeCustomTheme', () => {
    it('存在的 id 应返回 true 并彻底删除', async () => {
      const created = await themeStore.createCustomTheme({
        name: 'ToDelete',
        variables: { x: 1 },
      });

      const result = await themeStore.removeCustomTheme(created.id);
      expect(result).toBe(true);

      const fetched = await themeStore.getCustomTheme(created.id);
      expect(fetched).toBeNull();
    });

    it('不存在的 id 应返回 false', async () => {
      const result = await themeStore.removeCustomTheme('custom-0000000000000-aaaaaa');
      expect(result).toBe(false);
    });
  });

  describe('isCustomTheme', () => {
    it('custom- 前缀返回 true', () => {
      expect(themeStore.isCustomTheme('custom-123-abc')).toBe(true);
    });

    it('非 custom- 前缀返回 false', () => {
      expect(themeStore.isCustomTheme('web-TDesign')).toBe(false);
    });
  });
});
