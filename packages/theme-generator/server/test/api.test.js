import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const supertest = require('supertest');
const Theme = require('../theme-model.js');
const app = require('../index.js');

let mongoServer;

// 内置主题数量（仅 web-TDesign 1 个）
const BUILT_IN_COUNT = 1;

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

describe('API 集成测试', () => {
  // ========== GET /api/themes ==========
  describe('GET /api/themes', () => {
    it('无自定义主题时应返回仅内置主题', async () => {
      const res = await supertest(app).get('/api/themes');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(BUILT_IN_COUNT);
      expect(res.body[0].type).toBe('built-in');
      expect(res.body[0].id).toBe('web-TDesign');
    });

    it('应返回内置 + 自定义主题', async () => {
      await supertest(app)
        .post('/api/themes')
        .send({ name: 'Custom1', variables: { light: 'a' } });

      const res = await supertest(app).get('/api/themes');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(BUILT_IN_COUNT + 1);
    });

    it('platform=mobile 时不应包含内置主题', async () => {
      const res = await supertest(app).get('/api/themes?platform=mobile');
      expect(res.status).toBe(200);
      const builtIn = res.body.filter(t => t.type === 'built-in');
      expect(builtIn.length).toBe(0);
    });

    it('内置主题始终排在自定义主题前面', async () => {
      await supertest(app)
        .post('/api/themes')
        .send({ name: 'Custom', variables: { x: 1 } });

      const res = await supertest(app).get('/api/themes');
      const list = res.body;

      let lastBuiltIn = -1;
      let firstCustom = list.length;
      list.forEach((item, idx) => {
        if (item.type === 'built-in') lastBuiltIn = idx;
        if (item.type === 'custom' && idx < firstCustom) firstCustom = idx;
      });

      expect(lastBuiltIn).toBeLessThan(firstCustom);
    });
  });

  // ========== POST /api/themes ==========
  describe('POST /api/themes', () => {
    it('缺少 name 返回 400', async () => {
      const res = await supertest(app)
        .post('/api/themes')
        .send({ variables: { color: {} } });
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('name');
    });

    it('缺少 variables 返回 400', async () => {
      const res = await supertest(app)
        .post('/api/themes')
        .send({ name: 'Test Theme' });
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('variables');
    });

    it('有效请求返回 201', async () => {
      const res = await supertest(app)
        .post('/api/themes')
        .send({
          name: 'My Theme',
          platform: 'mobile',
          variables: { light: 'a', dark: 'b' },
        });
      expect(res.status).toBe(201);
      expect(res.body.id).toMatch(/^custom-/);
      expect(res.body.name).toBe('My Theme');
    });
  });

  // ========== PUT /api/themes/:id ==========
  describe('PUT /api/themes/:id', () => {
    it('内置主题返回 403', async () => {
      const res = await supertest(app)
        .put('/api/themes/web-TDesign')
        .send({ name: 'Hacked' });
      expect(res.status).toBe(403);
      expect(res.body.error).toContain('内置主题不可修改');
    });

    it('不存在的 id 返回 404', async () => {
      const res = await supertest(app)
        .put('/api/themes/custom-0000000000000-aaaaaa')
        .send({ name: 'Nope' });
      expect(res.status).toBe(404);
    });

    it('有效更新返回 200', async () => {
      const created = await supertest(app)
        .post('/api/themes')
        .send({ name: 'Original', variables: { x: 1 } });

      const res = await supertest(app)
        .put('/api/themes/' + created.body.id)
        .send({ name: 'Updated' });
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Updated');
    });
  });

  // ========== DELETE /api/themes/:id ==========
  describe('DELETE /api/themes/:id', () => {
    it('内置主题返回 403', async () => {
      const res = await supertest(app)
        .delete('/api/themes/web-TDesign');
      expect(res.status).toBe(403);
      expect(res.body.error).toContain('内置主题不可删除');
    });

    it('不存在的 id 返回 404', async () => {
      const res = await supertest(app)
        .delete('/api/themes/custom-0000000000000-aaaaaa');
      expect(res.status).toBe(404);
    });

    it('有效删除返回 204', async () => {
      const created = await supertest(app)
        .post('/api/themes')
        .send({ name: 'ToDelete', variables: { x: 1 } });

      const res = await supertest(app)
        .delete('/api/themes/' + created.body.id);
      expect(res.status).toBe(204);
    });
  });

  // ========== GET /api/themes/:id/variables ==========
  describe('GET /api/themes/:id/variables', () => {
    it('自定义主题返回 variables', async () => {
      const variables = { light: 'css-light', dark: 'css-dark', extra: 'css-extra' };
      const created = await supertest(app)
        .post('/api/themes')
        .send({ name: 'VarTheme', variables });

      const res = await supertest(app)
        .get('/api/themes/' + created.body.id + '/variables');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(variables);
    });

    it('不存在的 id 返回 404', async () => {
      const res = await supertest(app)
        .get('/api/themes/custom-0000000000000-aaaaaa/variables');
      expect(res.status).toBe(404);
    });
  });
});
