import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';
import fc from 'fast-check';

const require = createRequire(import.meta.url);
const { toSummary, toDetail } = require('../theme-store.js');

/**
 * 生成随机 hex 颜色的 fast-check arbitrary
 * 格式: #RRGGBB（大写）
 */
const hexColorArb = fc
  .integer({ min: 0, max: 0xffffff })
  .map((n) => '#' + n.toString(16).toUpperCase().padStart(6, '0'));

/**
 * 构造包含 --td-brand-color-7 的 CSS 变量文本
 */
function buildLightCss(brandColor7) {
  return `:root {
  --td-brand-color-1: #f2f3ff;
  --td-brand-color-7: ${brandColor7};
  --td-brand-color-8: #003cab;
}`;
}

/**
 * 构造 mock Mongoose 文档（模拟旧主题，缺少 brandColor 字段）
 */
function mockDoc({ brandColor, variables }) {
  return {
    themeId: 'custom-1234567890-abcdef',
    name: 'Test Theme',
    platform: 'web',
    brandColor,
    variables,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-06-01'),
  };
}

describe('Bug Condition Exploration: brandColor 未从 variables 提取', () => {
  /**
   * Property 1: Bug Condition - 缺失 brandColor 时未从 variables 提取品牌色
   *
   * **Validates: Requirements 1.1, 2.1, 2.3**
   *
   * 当 brandColor 为 undefined 且 variables.light 包含 --td-brand-color-7: <color>;
   * 时，toSummary 应返回该 <color> 而非默认值 #0052D9。
   *
   * 在未修复代码上运行，预期 FAIL（确认 bug 存在）。
   */
  it('[PBT] toSummary 应从 variables.light 提取品牌色（brandColor 为 undefined 时）', () => {
    fc.assert(
      fc.property(
        hexColorArb.filter((c) => c !== '#0052D9'),
        (color) => {
          const doc = mockDoc({
            brandColor: undefined,
            variables: { light: buildLightCss(color), dark: '', extra: '' },
          });
          const result = toSummary(doc);
          expect(result.brandColor).toBe(color);
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property 1 (toDetail): Bug Condition - toDetail 同样应从 variables 提取品牌色
   *
   * **Validates: Requirements 1.1, 2.1**
   */
  it('[PBT] toDetail 应从 variables.light 提取品牌色（brandColor 为 undefined 时）', () => {
    fc.assert(
      fc.property(
        hexColorArb.filter((c) => c !== '#0052D9'),
        (color) => {
          const doc = mockDoc({
            brandColor: undefined,
            variables: { light: buildLightCss(color), dark: '', extra: '' },
          });
          const result = toDetail(doc);
          expect(result.brandColor).toBe(color);
        }
      ),
      { numRuns: 50 }
    );
  });
});

describe('Preservation: 显式 brandColor 和默认值行为不变', () => {
  /**
   * 生成随机非空 hex 颜色的 arbitrary（排除默认值 #0052D9）
   * 格式: #RRGGBB（大写）
   */
  const nonDefaultHexColorArb = fc
    .integer({ min: 0, max: 0xffffff })
    .map((n) => '#' + n.toString(16).toUpperCase().padStart(6, '0'))
    .filter((c) => c !== '#0052D9');

  /**
   * 生成不包含 --td-brand-color-7 的随机 CSS 文本
   */
  const cssWithoutBrandColor7Arb = fc
    .array(
      fc.record({
        name: fc.stringMatching(/^--td-[a-z]+-[a-z]+-\d+$/).filter(
          (s) => s !== '--td-brand-color-7'
        ),
        value: fc.stringMatching(/^#[0-9A-Fa-f]{6}$/),
      }),
      { minLength: 0, maxLength: 5 }
    )
    .map((entries) =>
      entries.length === 0
        ? ':root {}'
        : ':root {\n' +
          entries.map((e) => `  ${e.name}: ${e.value};`).join('\n') +
          '\n}'
    )
    .filter((css) => !css.includes('--td-brand-color-7'));

  /**
   * 生成随机 CSS 文本（可能包含也可能不包含 brand-color-7）
   */
  const randomCssArb = fc.oneof(
    cssWithoutBrandColor7Arb,
    hexColorArb.map((c) => buildLightCss(c))
  );

  // --- Observation-based example tests ---

  it('toSummary: 显式 brandColor 优先于 variables 中的品牌色', () => {
    const doc = mockDoc({
      brandColor: '#FF0000',
      variables: { light: buildLightCss('#E34D59'), dark: '', extra: '' },
    });
    expect(toSummary(doc).brandColor).toBe('#FF0000');
  });

  it('toSummary: 显式 brandColor + null variables 返回显式值', () => {
    const doc = mockDoc({ brandColor: '#00A870', variables: null });
    expect(toSummary(doc).brandColor).toBe('#00A870');
  });

  it('toDetail: 显式 brandColor 优先于 variables 中的品牌色', () => {
    const doc = mockDoc({
      brandColor: '#FF0000',
      variables: { light: buildLightCss('#E34D59'), dark: '', extra: '' },
    });
    expect(toDetail(doc).brandColor).toBe('#FF0000');
  });

  it('toSummary: undefined brandColor + 无 brand-color-7 的 variables 返回默认值', () => {
    const doc = mockDoc({
      brandColor: undefined,
      variables: { light: 'no-brand-color-here', dark: '', extra: '' },
    });
    expect(toSummary(doc).brandColor).toBe('#0052D9');
  });

  it('toSummary: undefined brandColor + null variables 返回默认值', () => {
    const doc = mockDoc({ brandColor: undefined, variables: null });
    expect(toSummary(doc).brandColor).toBe('#0052D9');
  });

  // --- Property-Based Tests ---

  /**
   * Property 2a: 显式 brandColor 始终被保留
   *
   * **Validates: Requirements 3.1, 3.2, 3.3**
   *
   * 对任意非空 brandColor 值，toSummary 和 toDetail 始终返回该显式值，
   * 不从 variables 提取。
   */
  it('[PBT] toSummary 始终返回显式 brandColor，不从 variables 提取', () => {
    fc.assert(
      fc.property(nonDefaultHexColorArb, randomCssArb, (color, css) => {
        const doc = mockDoc({
          brandColor: color,
          variables: { light: css, dark: '', extra: '' },
        });
        const result = toSummary(doc);
        expect(result.brandColor).toBe(color);
      }),
      { numRuns: 100 }
    );
  });

  it('[PBT] toDetail 始终返回显式 brandColor，不从 variables 提取', () => {
    fc.assert(
      fc.property(nonDefaultHexColorArb, randomCssArb, (color, css) => {
        const doc = mockDoc({
          brandColor: color,
          variables: { light: css, dark: '', extra: '' },
        });
        const result = toDetail(doc);
        expect(result.brandColor).toBe(color);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2b: 无品牌色信息时返回默认值
   *
   * **Validates: Requirements 3.4**
   *
   * 当 brandColor 为 undefined 且 variables 中不包含 --td-brand-color-7 时，
   * toSummary 和 toDetail 返回默认值 #0052D9。
   */
  it('[PBT] toSummary: brandColor undefined + 无 brand-color-7 → 返回默认值 #0052D9', () => {
    fc.assert(
      fc.property(cssWithoutBrandColor7Arb, (css) => {
        const doc = mockDoc({
          brandColor: undefined,
          variables: { light: css, dark: '', extra: '' },
        });
        const result = toSummary(doc);
        expect(result.brandColor).toBe('#0052D9');
      }),
      { numRuns: 100 }
    );
  });

  it('[PBT] toDetail: brandColor undefined + 无 brand-color-7 → 返回默认值 #0052D9', () => {
    fc.assert(
      fc.property(cssWithoutBrandColor7Arb, (css) => {
        const doc = mockDoc({
          brandColor: undefined,
          variables: { light: css, dark: '', extra: '' },
        });
        const result = toDetail(doc);
        expect(result.brandColor).toBe('#0052D9');
      }),
      { numRuns: 100 }
    );
  });

  it('[PBT] toSummary: brandColor undefined + null variables → 返回默认值 #0052D9', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const doc = mockDoc({ brandColor: undefined, variables: null });
          const result = toSummary(doc);
          expect(result.brandColor).toBe('#0052D9');
        }
      ),
      { numRuns: 1 }
    );
  });
});
