# Token Truth

这份文件维护设计 token 的事实来源和映射规则。

- 主要消费者：AI、代码生成、Figma 生成、组件库 MCP、文档站
- 主要目标：让“一个语义 token”在 Figma 和代码里都能找到对应来源
- 写法原则：**token 来源和映射结构化，解释尽量短**

## How To Read

1. 先看 `token_sources`，确认各类 token 的权威来源
2. 再看 `token_entry_template`，理解单条 token 该怎么写
3. 真正录入 token 时，只在 `## Token Entries` 里追加，不要发明新字段

## Token Sources

```yaml
token_entries:
  - token_id: "color_color_rd_bg_color_brand_page"
    semantic_name: "color / rd/bg-color/brand-page"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorBrandPage"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "20fd8bc35f8f4298ead59ebbb70b62e47c01f2ea"
      name: "color / rd/bg-color/brand-page"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#CFDAFF"
        css: "#CFDAFF"
        flutter: "0xFFCFDAFF"
        source: "rd/brand-color/3"
      Dark:
        value: "#00014D"
        css: "#00014D"
        flutter: "0xFF00014D"
        source: "rd/brand-color/1"
      "SL Light":
        value: "#7CE5D9"
        css: "#7CE5D9"
        flutter: "0xFF7CE5D9"
        source: "rd/brand-color/3"
      "SL Dark":
        value: "#002E2E"
        css: "#002E2E"
        flutter: "0xFF002E2E"
        source: "rd/brand-color/1"
      "SL Orange Light":
        value: "#F9EAC9"
        css: "#F9EAC9"
        flutter: "0xFFF9EAC9"
        source: "rd/brand-color/3"
      "SL Orange Dark":
        value: "#4D2100"
        css: "#4D2100"
        flutter: "0xFF4D2100"
        source: "rd/brand-color/1"
      "Mrj Light":
        value: "#D7C9FF"
        css: "#D7C9FF"
        flutter: "0xFFD7C9FF"
        source: "rd/brand-color/3"
      "Mrj Dark":
        value: "#261D61"
        css: "#261D61"
        flutter: "0xFF261D61"
        source: "rd/brand-color/1"
    notes:
      []
    fallback:
      allowed: false
      value: "#CFDAFF"
  - token_id: "color_color_rd_bg_color_component"
    semantic_name: "color / rd/bg-color/component"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorComponent"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "21f1a1225f2dabaeb151d0a922416e4868f6b85d"
      name: "color / rd/bg-color/component"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      Dark:
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "SL Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "SL Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "SL Orange Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "SL Orange Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "Mrj Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "Mrj Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
    notes:
      []
    fallback:
      allowed: false
      value: "#E7E7E7"
  - token_id: "color_color_rd_bg_color_component_active"
    semantic_name: "color / rd/bg-color/component-active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorComponentActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "747085c7794b1b6b63d5438e068173686e286c9e"
      name: "color / rd/bg-color/component-active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
      Dark:
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "rd/gray-color/10"
      "SL Light":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
      "SL Dark":
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "rd/gray-color/10"
      "SL Orange Light":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
      "SL Orange Dark":
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "rd/gray-color/10"
      "Mrj Light":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
      "Mrj Dark":
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "rd/gray-color/10"
    notes:
      []
    fallback:
      allowed: false
      value: "#A6A6A6"
  - token_id: "color_color_rd_bg_color_component_disabled"
    semantic_name: "color / rd/bg-color/component-disabled"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorComponentDisabled"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "a79b9bada0ba5660efb4fc9ff5051f9b60619a6d"
      name: "color / rd/bg-color/component-disabled"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "rd/gray-color/2"
      Dark:
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
      "SL Light":
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "rd/gray-color/2"
      "SL Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
      "SL Orange Light":
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "rd/gray-color/2"
      "SL Orange Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
      "Mrj Light":
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "rd/gray-color/2"
      "Mrj Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
    notes:
      []
    fallback:
      allowed: false
      value: "#EEEEEE"
  - token_id: "color_color_rd_bg_color_container"
    semantic_name: "color / rd/bg-color/container"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorContainer"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "26f0ae08fdbd532398eef9e72d2369199bb24829"
      name: "color / rd/bg-color/container"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "rd/font-white/1"
      Dark:
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "rd/gray-color/13"
      "SL Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "rd/font-white/1"
      "SL Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "rd/gray-color/13"
      "SL Orange Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "rd/font-white/1"
      "SL Orange Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "rd/gray-color/13"
      "Mrj Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "rd/font-white/1"
      "Mrj Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "rd/gray-color/13"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFF"
  - token_id: "color_color_rd_bg_color_container_active"
    semantic_name: "color / rd/bg-color/container-active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorContainerActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "7be75d92f48949bd83d89b2e24ff4623bab1b4ec"
      name: "color / rd/bg-color/container-active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      Dark:
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
      "SL Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "SL Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
      "SL Orange Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "SL Orange Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
      "Mrj Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "Mrj Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
    notes:
      []
    fallback:
      allowed: false
      value: "#E7E7E7"
  - token_id: "color_color_rd_bg_color_ground_glass"
    semantic_name: "color / rd/bg-color/ground-glass"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorGroundGlass"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c63a2970e413d13c0d1479a4ff22a7a6f07b73f5"
      name: "color / rd/bg-color/ground-glass"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFFCC"
        css: "#FFFFFFCC"
        flutter: "0xCCFFFFFF"
        source: "direct"
      Dark:
        value: "#242424CC"
        css: "#242424CC"
        flutter: "0xCC242424"
        source: "direct"
      "SL Light":
        value: "#FFFFFFCC"
        css: "#FFFFFFCC"
        flutter: "0xCCFFFFFF"
        source: "direct"
      "SL Dark":
        value: "#242424CC"
        css: "#242424CC"
        flutter: "0xCC242424"
        source: "direct"
      "SL Orange Light":
        value: "#FFFFFFCC"
        css: "#FFFFFFCC"
        flutter: "0xCCFFFFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#242424CC"
        css: "#242424CC"
        flutter: "0xCC242424"
        source: "direct"
      "Mrj Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "Mrj Dark":
        value: "#242424CC"
        css: "#242424CC"
        flutter: "0xCC242424"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFFCC"
  - token_id: "color_color_rd_bg_color_page"
    semantic_name: "color / rd/bg-color/page"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorPage"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c163aabad8909ec8019334654ed86475abc1bc68"
      name: "color / rd/bg-color/page"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "rd/gray-color/1"
      Dark:
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "rd/gray-color/14"
      "SL Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "rd/gray-color/1"
      "SL Dark":
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "rd/gray-color/14"
      "SL Orange Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "rd/gray-color/1"
      "SL Orange Dark":
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "rd/gray-color/14"
      "Mrj Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "rd/gray-color/1"
      "Mrj Dark":
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "rd/gray-color/14"
    notes:
      []
    fallback:
      allowed: false
      value: "#F3F3F3"
  - token_id: "color_color_rd_bg_color_secondarycomponent"
    semantic_name: "color / rd/bg-color/secondarycomponent"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorSecondarycomponent"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "cdc3c80b8667a8f2c5ab84a720ceccdd5fa4529e"
      name: "color / rd/bg-color/secondarycomponent"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      Dark:
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "SL Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "SL Dark":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "SL Orange Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "SL Orange Dark":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "Mrj Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "Mrj Dark":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
    notes:
      []
    fallback:
      allowed: false
      value: "#DCDCDC"
  - token_id: "color_color_rd_bg_color_secondarycomponent_active"
    semantic_name: "color / rd/bg-color/secondarycomponent-active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorSecondarycomponentActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "8dc0fc3e6c2b322ec11749ce10e5eaebee625ec7"
      name: "color / rd/bg-color/secondarycomponent-active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
      Dark:
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
      "SL Light":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
      "SL Dark":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
      "SL Orange Light":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
      "SL Orange Dark":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
      "Mrj Light":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
      "Mrj Dark":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "rd/gray-color/6"
    notes:
      []
    fallback:
      allowed: false
      value: "#A6A6A6"
  - token_id: "color_color_rd_bg_color_secondarycontainer"
    semantic_name: "color / rd/bg-color/secondarycontainer"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorSecondarycontainer"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "db6fbe20a53594f5e89e7278e2a0e58f0924b26b"
      name: "color / rd/bg-color/secondarycontainer"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "rd/gray-color/1"
      Dark:
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
      "SL Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "rd/gray-color/1"
      "SL Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
      "SL Orange Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "rd/gray-color/1"
      "SL Orange Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
      "Mrj Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "rd/gray-color/1"
      "Mrj Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "rd/gray-color/12"
    notes:
      []
    fallback:
      allowed: false
      value: "#F3F3F3"
  - token_id: "color_color_rd_bg_color_secondarycontainer_active"
    semantic_name: "color / rd/bg-color/secondarycontainer-active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorSecondarycontainerActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "686b38519181fa1c18d47279cda47fd4935e69a9"
      name: "color / rd/bg-color/secondarycontainer-active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      Dark:
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "SL Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "SL Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "SL Orange Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "SL Orange Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "Mrj Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "Mrj Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
    notes:
      []
    fallback:
      allowed: false
      value: "#DCDCDC"
  - token_id: "color_color_rd_bg_color_specialcomponent"
    semantic_name: "color / rd/bg-color/specialcomponent"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBgColorSpecialcomponent"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "e1ed3aa662be2416da233c781622cb5664b75f8c"
      name: "color / rd/bg-color/specialcomponent"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      Dark:
        value: "#FFFFFF00"
        css: "#FFFFFF00"
        flutter: "0x00FFFFFF"
        source: "direct"
      "SL Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "SL Dark":
        value: "#FFFFFF00"
        css: "#FFFFFF00"
        flutter: "0x00FFFFFF"
        source: "direct"
      "SL Orange Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#FFFFFF00"
        css: "#FFFFFF00"
        flutter: "0x00FFFFFF"
        source: "direct"
      "Mrj Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "Mrj Dark":
        value: "#FFFFFF00"
        css: "#FFFFFF00"
        flutter: "0x00FFFFFF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFF"
  - token_id: "color_color_rd_border_color"
    semantic_name: "color / rd/border-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBorderColor"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c7891f90517e4b36d9bb974def2910efbe77e267"
      name: "color / rd/border-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      Dark:
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "SL Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "SL Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "SL Orange Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "SL Orange Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "Mrj Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "Mrj Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
    notes:
      []
    fallback:
      allowed: false
      value: "#E7E7E7"
  - token_id: "color_color_rd_border_level_1_color"
    semantic_name: "color / rd/border-level/1-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBorderLevel1Color"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f5aa206c6220e93ce3ad7dfd0ea64f8329e681c9"
      name: "color / rd/border-level/1-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      Dark:
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "SL Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "SL Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "SL Orange Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "SL Orange Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "Mrj Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "Mrj Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
    notes:
      []
    fallback:
      allowed: false
      value: "#E7E7E7"
  - token_id: "color_color_rd_border_level_2_color"
    semantic_name: "color / rd/border-level/2-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBorderLevel2Color"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "92a2748742eedb3678c914dffbfe07ca3626e221"
      name: "color / rd/border-level/2-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      Dark:
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "rd/gray-color/9"
      "SL Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "SL Dark":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "rd/gray-color/9"
      "SL Orange Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "SL Orange Dark":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "rd/gray-color/9"
      "Mrj Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "Mrj Dark":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "rd/gray-color/9"
    notes:
      []
    fallback:
      allowed: false
      value: "#DCDCDC"
  - token_id: "color_color_rd_brand_color"
    semantic_name: "color / rd/brand-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColor"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "a7472ef25fefe58dc8b2da198116dc80f8c6dd04"
      name: "color / rd/brand-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#4E39F2"
        css: "#4E39F2"
        flutter: "0xFF4E39F2"
        source: "rd/brand-color/6"
      Dark:
        value: "#6B5EF5"
        css: "#6B5EF5"
        flutter: "0xFF6B5EF5"
        source: "rd/brand-color/6"
      "SL Light":
        value: "#0BC7B9"
        css: "#0BC7B9"
        flutter: "0xFF0BC7B9"
        source: "rd/brand-color/6"
      "SL Dark":
        value: "#2FD4C6"
        css: "#2FD4C6"
        flutter: "0xFF2FD4C6"
        source: "rd/brand-color/6"
      "SL Orange Light":
        value: "#E0A558"
        css: "#E0A558"
        flutter: "0xFFE0A558"
        source: "rd/brand-color/6"
      "SL Orange Dark":
        value: "#E6B872"
        css: "#E6B872"
        flutter: "0xFFE6B872"
        source: "rd/brand-color/6"
      "Mrj Light":
        value: "#8F73FB"
        css: "#8F73FB"
        flutter: "0xFF8F73FB"
        source: "rd/brand-color/6"
      "Mrj Dark":
        value: "#A991FF"
        css: "#A991FF"
        flutter: "0xFFA991FF"
        source: "rd/brand-color/6"
    notes:
      []
    fallback:
      allowed: false
      value: "#4E39F2"
  - token_id: "color_color_rd_brand_color_1"
    semantic_name: "color / rd/brand-color/1"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColor1"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "e5b2b4e545afa0ab2f1fe66347374350de1daec5"
      name: "color / rd/brand-color/1"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#F3F6FF"
        css: "#F3F6FF"
        flutter: "0xFFF3F6FF"
        source: "direct"
      Dark:
        value: "#00014D"
        css: "#00014D"
        flutter: "0xFF00014D"
        source: "direct"
      "SL Light":
        value: "#EDFCFA"
        css: "#EDFCFA"
        flutter: "0xFFEDFCFA"
        source: "direct"
      "SL Dark":
        value: "#002E2E"
        css: "#002E2E"
        flutter: "0xFF002E2E"
        source: "direct"
      "SL Orange Light":
        value: "#FFF9E8"
        css: "#FFF9E8"
        flutter: "0xFFFFF9E8"
        source: "direct"
      "SL Orange Dark":
        value: "#4D2100"
        css: "#4D2100"
        flutter: "0xFF4D2100"
        source: "direct"
      "Mrj Light":
        value: "#F3EFFE"
        css: "#F3EFFE"
        flutter: "0xFFF3EFFE"
        source: "direct"
      "Mrj Dark":
        value: "#261D61"
        css: "#261D61"
        flutter: "0xFF261D61"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#F3F6FF"
  - token_id: "color_color_rd_brand_color_10"
    semantic_name: "color / rd/brand-color/10"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColor10"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "9afeed5db1e57fe29a11bbaa0452ceecd9a8c723"
      name: "color / rd/brand-color/10"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#170068"
        css: "#170068"
        flutter: "0xFF170068"
        source: "direct"
      Dark:
        value: "#F1F1FF"
        css: "#F1F1FF"
        flutter: "0xFFF1F1FF"
        source: "direct"
      "SL Light":
        value: "#002E2E"
        css: "#002E2E"
        flutter: "0xFF002E2E"
        source: "direct"
      "SL Dark":
        value: "#EDFCFA"
        css: "#EDFCFA"
        flutter: "0xFFEDFCFA"
        source: "direct"
      "SL Orange Light":
        value: "#4D2100"
        css: "#4D2100"
        flutter: "0xFF4D2100"
        source: "direct"
      "SL Orange Dark":
        value: "#FFF9E8"
        css: "#FFF9E8"
        flutter: "0xFFFFF9E8"
        source: "direct"
      "Mrj Light":
        value: "#261D61"
        css: "#261D61"
        flutter: "0xFF261D61"
        source: "direct"
      "Mrj Dark":
        value: "#F3EFFE"
        css: "#F3EFFE"
        flutter: "0xFFF3EFFE"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#170068"
  - token_id: "color_color_rd_brand_color_2"
    semantic_name: "color / rd/brand-color/2"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColor2"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "50d45c0d542d4021c32f15247bc9f545c94cf378"
      name: "color / rd/brand-color/2"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E6ECFF"
        css: "#E6ECFF"
        flutter: "0xFFE6ECFF"
        source: "direct"
      Dark:
        value: "#0A0876"
        css: "#0A0876"
        flutter: "0xFF0A0876"
        source: "direct"
      "SL Light":
        value: "#C2F2EC"
        css: "#C2F2EC"
        flutter: "0xFFC2F2EC"
        source: "direct"
      "SL Dark":
        value: "#005453"
        css: "#005453"
        flutter: "0xFF005453"
        source: "direct"
      "SL Orange Light":
        value: "#F9EAC9"
        css: "#F9EAC9"
        flutter: "0xFFF9EAC9"
        source: "direct"
      "SL Orange Dark":
        value: "#713B0B"
        css: "#713B0B"
        flutter: "0xFF713B0B"
        source: "direct"
      "Mrj Light":
        value: "#ECE5FF"
        css: "#ECE5FF"
        flutter: "0xFFECE5FF"
        source: "direct"
      "Mrj Dark":
        value: "#382A87"
        css: "#382A87"
        flutter: "0xFF382A87"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#E6ECFF"
  - token_id: "color_color_rd_brand_color_3"
    semantic_name: "color / rd/brand-color/3"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColor3"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "efac85fbca168739993cfeb7734b31a75cfe936f"
      name: "color / rd/brand-color/3"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#CFDAFF"
        css: "#CFDAFF"
        flutter: "0xFFCFDAFF"
        source: "direct"
      Dark:
        value: "#1E179F"
        css: "#1E179F"
        flutter: "0xFF1E179F"
        source: "direct"
      "SL Light":
        value: "#7CE5D9"
        css: "#7CE5D9"
        flutter: "0xFF7CE5D9"
        source: "direct"
      "SL Dark":
        value: "#007A76"
        css: "#007A76"
        flutter: "0xFF007A76"
        source: "direct"
      "SL Orange Light":
        value: "#F9EAC9"
        css: "#F9EAC9"
        flutter: "0xFFF9EAC9"
        source: "direct"
      "SL Orange Dark":
        value: "#965A1E"
        css: "#965A1E"
        flutter: "0xFF965A1E"
        source: "direct"
      "Mrj Light":
        value: "#D7C9FF"
        css: "#D7C9FF"
        flutter: "0xFFD7C9FF"
        source: "direct"
      "Mrj Dark":
        value: "#513EAD"
        css: "#513EAD"
        flutter: "0xFF513EAD"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#CFDAFF"
  - token_id: "color_color_rd_brand_color_4"
    semantic_name: "color / rd/brand-color/4"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColor4"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "d7c7999220f5bb775248b2cf11632d5102c6f3fb"
      name: "color / rd/brand-color/4"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#AEBBFF"
        css: "#AEBBFF"
        flutter: "0xFFAEBBFF"
        source: "direct"
      Dark:
        value: "#3A2DC9"
        css: "#3A2DC9"
        flutter: "0xFF3A2DC9"
        source: "direct"
      "SL Light":
        value: "#55E0D2"
        css: "#55E0D2"
        flutter: "0xFF55E0D2"
        source: "direct"
      "SL Dark":
        value: "#02A199"
        css: "#02A199"
        flutter: "0xFF02A199"
        source: "direct"
      "SL Orange Light":
        value: "#ECCA8E"
        css: "#ECCA8E"
        flutter: "0xFFECCA8E"
        source: "direct"
      "SL Orange Dark":
        value: "#BB7E37"
        css: "#BB7E37"
        flutter: "0xFFBB7E37"
        source: "direct"
      "Mrj Light":
        value: "#C0ADFF"
        css: "#C0ADFF"
        flutter: "0xFFC0ADFF"
        source: "direct"
      "Mrj Dark":
        value: "#6E57D4"
        css: "#6E57D4"
        flutter: "0xFF6E57D4"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#AEBBFF"
  - token_id: "color_color_rd_brand_color_5"
    semantic_name: "color / rd/brand-color/5"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColor5"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "051981fb486920f20d46e0a2001e8375f6a7e5de"
      name: "color / rd/brand-color/5"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#8994FF"
        css: "#8994FF"
        flutter: "0xFF8994FF"
        source: "direct"
      Dark:
        value: "#584AF2"
        css: "#584AF2"
        flutter: "0xFF584AF2"
        source: "direct"
      "SL Light":
        value: "#2FD4C6"
        css: "#2FD4C6"
        flutter: "0xFF2FD4C6"
        source: "direct"
      "SL Dark":
        value: "#0BC7B9"
        css: "#0BC7B9"
        flutter: "0xFF0BC7B9"
        source: "direct"
      "SL Orange Light":
        value: "#E6B872"
        css: "#E6B872"
        flutter: "0xFFE6B872"
        source: "direct"
      "SL Orange Dark":
        value: "#E0A558"
        css: "#E0A558"
        flutter: "0xFFE0A558"
        source: "direct"
      "Mrj Light":
        value: "#A991FF"
        css: "#A991FF"
        flutter: "0xFFA991FF"
        source: "direct"
      "Mrj Dark":
        value: "#8F73FB"
        css: "#8F73FB"
        flutter: "0xFF8F73FB"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#8994FF"
  - token_id: "color_color_rd_brand_color_6"
    semantic_name: "color / rd/brand-color/6"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColor6"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f9e3a9603238aeaffc1ef27073b26b1819e2498c"
      name: "color / rd/brand-color/6"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#4E39F2"
        css: "#4E39F2"
        flutter: "0xFF4E39F2"
        source: "direct"
      Dark:
        value: "#6B5EF5"
        css: "#6B5EF5"
        flutter: "0xFF6B5EF5"
        source: "direct"
      "SL Light":
        value: "#0BC7B9"
        css: "#0BC7B9"
        flutter: "0xFF0BC7B9"
        source: "direct"
      "SL Dark":
        value: "#2FD4C6"
        css: "#2FD4C6"
        flutter: "0xFF2FD4C6"
        source: "direct"
      "SL Orange Light":
        value: "#E0A558"
        css: "#E0A558"
        flutter: "0xFFE0A558"
        source: "direct"
      "SL Orange Dark":
        value: "#E6B872"
        css: "#E6B872"
        flutter: "0xFFE6B872"
        source: "direct"
      "Mrj Light":
        value: "#8F73FB"
        css: "#8F73FB"
        flutter: "0xFF8F73FB"
        source: "direct"
      "Mrj Dark":
        value: "#A991FF"
        css: "#A991FF"
        flutter: "0xFFA991FF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#4E39F2"
  - token_id: "color_color_rd_brand_color_7"
    semantic_name: "color / rd/brand-color/7"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColor7"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "0acf5321742ee74ecb192871046c37dfe1143864"
      name: "color / rd/brand-color/7"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#4830E7"
        css: "#4830E7"
        flutter: "0xFF4830E7"
        source: "direct"
      Dark:
        value: "#8882F7"
        css: "#8882F7"
        flutter: "0xFF8882F7"
        source: "direct"
      "SL Light":
        value: "#02A199"
        css: "#02A199"
        flutter: "0xFF02A199"
        source: "direct"
      "SL Dark":
        value: "#55E0D2"
        css: "#55E0D2"
        flutter: "0xFF55E0D2"
        source: "direct"
      "SL Orange Light":
        value: "#BB7E37"
        css: "#BB7E37"
        flutter: "0xFFBB7E37"
        source: "direct"
      "SL Orange Dark":
        value: "#ECCA8E"
        css: "#ECCA8E"
        flutter: "0xFFECCA8E"
        source: "direct"
      "Mrj Light":
        value: "#6E57D4"
        css: "#6E57D4"
        flutter: "0xFF6E57D4"
        source: "direct"
      "Mrj Dark":
        value: "#C0ADFF"
        css: "#C0ADFF"
        flutter: "0xFFC0ADFF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#4830E7"
  - token_id: "color_color_rd_brand_color_8"
    semantic_name: "color / rd/brand-color/8"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColor8"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "68b69023f537cfa2026eb6c97f816aa6b6d913a2"
      name: "color / rd/brand-color/8"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#360ABD"
        css: "#360ABD"
        flutter: "0xFF360ABD"
        source: "direct"
      Dark:
        value: "#AAA6FA"
        css: "#AAA6FA"
        flutter: "0xFFAAA6FA"
        source: "direct"
      "SL Light":
        value: "#007A76"
        css: "#007A76"
        flutter: "0xFF007A76"
        source: "direct"
      "SL Dark":
        value: "#7CE5D9"
        css: "#7CE5D9"
        flutter: "0xFF7CE5D9"
        source: "direct"
      "SL Orange Light":
        value: "#965A1E"
        css: "#965A1E"
        flutter: "0xFF965A1E"
        source: "direct"
      "SL Orange Dark":
        value: "#F9EAC9"
        css: "#F9EAC9"
        flutter: "0xFFF9EAC9"
        source: "direct"
      "Mrj Light":
        value: "#513EAD"
        css: "#513EAD"
        flutter: "0xFF513EAD"
        source: "direct"
      "Mrj Dark":
        value: "#D7C9FF"
        css: "#D7C9FF"
        flutter: "0xFFD7C9FF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#360ABD"
  - token_id: "color_color_rd_brand_color_9"
    semantic_name: "color / rd/brand-color/9"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColor9"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "630727699af3910cfcd4f940e09ad67b3d2aa1b9"
      name: "color / rd/brand-color/9"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#250092"
        css: "#250092"
        flutter: "0xFF250092"
        source: "direct"
      Dark:
        value: "#CBCBFC"
        css: "#CBCBFC"
        flutter: "0xFFCBCBFC"
        source: "direct"
      "SL Light":
        value: "#005453"
        css: "#005453"
        flutter: "0xFF005453"
        source: "direct"
      "SL Dark":
        value: "#C2F2EC"
        css: "#C2F2EC"
        flutter: "0xFFC2F2EC"
        source: "direct"
      "SL Orange Light":
        value: "#713B0B"
        css: "#713B0B"
        flutter: "0xFF713B0B"
        source: "direct"
      "SL Orange Dark":
        value: "#F9EAC9"
        css: "#F9EAC9"
        flutter: "0xFFF9EAC9"
        source: "direct"
      "Mrj Light":
        value: "#382A87"
        css: "#382A87"
        flutter: "0xFF382A87"
        source: "direct"
      "Mrj Dark":
        value: "#ECE5FF"
        css: "#ECE5FF"
        flutter: "0xFFECE5FF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#250092"
  - token_id: "color_color_rd_brand_color_active"
    semantic_name: "color / rd/brand-color/active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColorActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "8cea47b1b8a6d2621645f4377d1c720bd07e786c"
      name: "color / rd/brand-color/active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#4830E7"
        css: "#4830E7"
        flutter: "0xFF4830E7"
        source: "rd/brand-color/7"
      Dark:
        value: "#8882F7"
        css: "#8882F7"
        flutter: "0xFF8882F7"
        source: "rd/brand-color/7"
      "SL Light":
        value: "#02A199"
        css: "#02A199"
        flutter: "0xFF02A199"
        source: "rd/brand-color/7"
      "SL Dark":
        value: "#55E0D2"
        css: "#55E0D2"
        flutter: "0xFF55E0D2"
        source: "rd/brand-color/7"
      "SL Orange Light":
        value: "#BB7E37"
        css: "#BB7E37"
        flutter: "0xFFBB7E37"
        source: "rd/brand-color/7"
      "SL Orange Dark":
        value: "#ECCA8E"
        css: "#ECCA8E"
        flutter: "0xFFECCA8E"
        source: "rd/brand-color/7"
      "Mrj Light":
        value: "#6E57D4"
        css: "#6E57D4"
        flutter: "0xFF6E57D4"
        source: "rd/brand-color/7"
      "Mrj Dark":
        value: "#C0ADFF"
        css: "#C0ADFF"
        flutter: "0xFFC0ADFF"
        source: "rd/brand-color/7"
    notes:
      []
    fallback:
      allowed: false
      value: "#4830E7"
  - token_id: "color_color_rd_brand_color_disabled"
    semantic_name: "color / rd/brand-color/disabled"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColorDisabled"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "142610d6b06e7adcd6d7670ba86c025d571b37e0"
      name: "color / rd/brand-color/disabled"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#CFDAFF"
        css: "#CFDAFF"
        flutter: "0xFFCFDAFF"
        source: "rd/brand-color/3"
      Dark:
        value: "#1E179F"
        css: "#1E179F"
        flutter: "0xFF1E179F"
        source: "rd/brand-color/3"
      "SL Light":
        value: "#7CE5D9"
        css: "#7CE5D9"
        flutter: "0xFF7CE5D9"
        source: "rd/brand-color/3"
      "SL Dark":
        value: "#007A76"
        css: "#007A76"
        flutter: "0xFF007A76"
        source: "rd/brand-color/3"
      "SL Orange Light":
        value: "#F9EAC9"
        css: "#F9EAC9"
        flutter: "0xFFF9EAC9"
        source: "rd/brand-color/3"
      "SL Orange Dark":
        value: "#965A1E"
        css: "#965A1E"
        flutter: "0xFF965A1E"
        source: "rd/brand-color/3"
      "Mrj Light":
        value: "#D7C9FF"
        css: "#D7C9FF"
        flutter: "0xFFD7C9FF"
        source: "rd/brand-color/3"
      "Mrj Dark":
        value: "#513EAD"
        css: "#513EAD"
        flutter: "0xFF513EAD"
        source: "rd/brand-color/3"
    notes:
      []
    fallback:
      allowed: false
      value: "#CFDAFF"
  - token_id: "color_color_rd_brand_color_focus"
    semantic_name: "color / rd/brand-color/focus"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColorFocus"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "8f4f7c0a873f6bc8a00c01fa90f024ff82d8fc87"
      name: "color / rd/brand-color/focus"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#F3F6FF"
        css: "#F3F6FF"
        flutter: "0xFFF3F6FF"
        source: "rd/brand-color/1"
      Dark:
        value: "#00014D"
        css: "#00014D"
        flutter: "0xFF00014D"
        source: "rd/brand-color/1"
      "SL Light":
        value: "#EDFCFA"
        css: "#EDFCFA"
        flutter: "0xFFEDFCFA"
        source: "rd/brand-color/1"
      "SL Dark":
        value: "#002E2E"
        css: "#002E2E"
        flutter: "0xFF002E2E"
        source: "rd/brand-color/1"
      "SL Orange Light":
        value: "#FFF9E8"
        css: "#FFF9E8"
        flutter: "0xFFFFF9E8"
        source: "rd/brand-color/1"
      "SL Orange Dark":
        value: "#4D2100"
        css: "#4D2100"
        flutter: "0xFF4D2100"
        source: "rd/brand-color/1"
      "Mrj Light":
        value: "#F3EFFE"
        css: "#F3EFFE"
        flutter: "0xFFF3EFFE"
        source: "rd/brand-color/1"
      "Mrj Dark":
        value: "#261D61"
        css: "#261D61"
        flutter: "0xFF261D61"
        source: "rd/brand-color/1"
    notes:
      []
    fallback:
      allowed: false
      value: "#F3F6FF"
  - token_id: "color_color_rd_brand_color_light"
    semantic_name: "color / rd/brand-color/light"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColorLight"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "2ad0388a7bb94a4c620b1e5b31f741810e9b1993"
      name: "color / rd/brand-color/light"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#F3F6FF"
        css: "#F3F6FF"
        flutter: "0xFFF3F6FF"
        source: "rd/brand-color/1"
      Dark:
        value: "#00014D"
        css: "#00014D"
        flutter: "0xFF00014D"
        source: "rd/brand-color/1"
      "SL Light":
        value: "#EDFCFA"
        css: "#EDFCFA"
        flutter: "0xFFEDFCFA"
        source: "rd/brand-color/1"
      "SL Dark":
        value: "#002E2E"
        css: "#002E2E"
        flutter: "0xFF002E2E"
        source: "rd/brand-color/1"
      "SL Orange Light":
        value: "#FFF9E8"
        css: "#FFF9E8"
        flutter: "0xFFFFF9E8"
        source: "rd/brand-color/1"
      "SL Orange Dark":
        value: "#4D2100"
        css: "#4D2100"
        flutter: "0xFF4D2100"
        source: "rd/brand-color/1"
      "Mrj Light":
        value: "#F3EFFE"
        css: "#F3EFFE"
        flutter: "0xFFF3EFFE"
        source: "rd/brand-color/1"
      "Mrj Dark":
        value: "#261D61"
        css: "#261D61"
        flutter: "0xFF261D61"
        source: "rd/brand-color/1"
    notes:
      []
    fallback:
      allowed: false
      value: "#F3F6FF"
  - token_id: "color_color_rd_brand_color_light_active"
    semantic_name: "color / rd/brand-color/light-active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdBrandColorLightActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "3a5d6ee77b1df7cac3b589d2ce6a481a6b004ef6"
      name: "color / rd/brand-color/light-active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E6ECFF"
        css: "#E6ECFF"
        flutter: "0xFFE6ECFF"
        source: "rd/brand-color/2"
      Dark:
        value: "#0A0876"
        css: "#0A0876"
        flutter: "0xFF0A0876"
        source: "rd/brand-color/2"
      "SL Light":
        value: "#C2F2EC"
        css: "#C2F2EC"
        flutter: "0xFFC2F2EC"
        source: "rd/brand-color/2"
      "SL Dark":
        value: "#005453"
        css: "#005453"
        flutter: "0xFF005453"
        source: "rd/brand-color/2"
      "SL Orange Light":
        value: "#F9EAC9"
        css: "#F9EAC9"
        flutter: "0xFFF9EAC9"
        source: "rd/brand-color/2"
      "SL Orange Dark":
        value: "#713B0B"
        css: "#713B0B"
        flutter: "0xFF713B0B"
        source: "rd/brand-color/2"
      "Mrj Light":
        value: "#ECE5FF"
        css: "#ECE5FF"
        flutter: "0xFFECE5FF"
        source: "rd/brand-color/2"
      "Mrj Dark":
        value: "#382A87"
        css: "#382A87"
        flutter: "0xFF382A87"
        source: "rd/brand-color/2"
    notes:
      []
    fallback:
      allowed: false
      value: "#E6ECFF"
  - token_id: "color_color_rd_capsule_active_bg"
    semantic_name: "color / rd/capsule/active-bg"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdCapsuleActiveBg"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "531c5a4deae3880e864c13d1e956d8d99b281c88"
      name: "color / rd/capsule/active-bg"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      Dark:
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "SL Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "SL Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "SL Orange Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "Mrj Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "Mrj Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFF"
  - token_id: "color_color_rd_capsule_active_border_color"
    semantic_name: "color / rd/capsule/active-border-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdCapsuleActiveBorderColor"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "87c7d48b0ac285c119c55f6968d3217eded46402"
      name: "color / rd/capsule/active-border-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
      Dark:
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
      "SL Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
      "SL Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
      "SL Orange Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
      "SL Orange Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
      "Mrj Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
      "Mrj Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#E7E7E7"
  - token_id: "color_color_rd_capsule_bg"
    semantic_name: "color / rd/capsule/bg"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdCapsuleBg"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "a9c81890028298df76fc0d6565b7da7aade84953"
      name: "color / rd/capsule/bg"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
      Dark:
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
      "SL Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
      "SL Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
      "SL Orange Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
      "SL Orange Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
      "Mrj Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
      "Mrj Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#F3F3F3"
  - token_id: "color_color_rd_capsule_wrap_bg"
    semantic_name: "color / rd/capsule/wrap-bg"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdCapsuleWrapBg"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "4eee39ea05d49fd1f0a0f12ef721d88ed7e6c4d5"
      name: "color / rd/capsule/wrap-bg"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      Dark:
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "SL Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "SL Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "SL Orange Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "Mrj Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "Mrj Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFF"
  - token_id: "color_color_rd_component_border"
    semantic_name: "color / rd/component-border"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdComponentBorder"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "12ef6d310dfdb3f01544a15a3ee0705c74d6d275"
      name: "color / rd/component-border"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      Dark:
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "rd/gray-color/9"
      "SL Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "SL Dark":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "rd/gray-color/9"
      "SL Orange Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "SL Orange Dark":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "rd/gray-color/9"
      "Mrj Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "rd/gray-color/4"
      "Mrj Dark":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "rd/gray-color/9"
    notes:
      []
    fallback:
      allowed: false
      value: "#DCDCDC"
  - token_id: "color_color_rd_component_stroke"
    semantic_name: "color / rd/component-stroke"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdComponentStroke"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "bed086efdd612f1ff481d90b8b4e537f202f7804"
      name: "color / rd/component-stroke"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      Dark:
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "SL Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "SL Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "SL Orange Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "SL Orange Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
      "Mrj Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "rd/gray-color/3"
      "Mrj Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "rd/gray-color/11"
    notes:
      []
    fallback:
      allowed: false
      value: "#E7E7E7"
  - token_id: "color_color_rd_error_color"
    semantic_name: "color / rd/error-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColor"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "731ea96bceb0afff7330852bb0d6d88ebd0c0238"
      name: "color / rd/error-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "rd/error-color/6"
      Dark:
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "rd/error-color/6"
      "SL Light":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "rd/error-color/6"
      "SL Dark":
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "rd/error-color/6"
      "SL Orange Light":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "rd/error-color/6"
      "SL Orange Dark":
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "rd/error-color/6"
      "Mrj Light":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "rd/error-color/6"
      "Mrj Dark":
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "rd/error-color/6"
    notes:
      []
    fallback:
      allowed: false
      value: "#D92020"
  - token_id: "color_color_rd_error_color_1"
    semantic_name: "color / rd/error-color/1"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColor1"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "89c805e7f4e4166e1da317d6a1f546ea3b71c43f"
      name: "color / rd/error-color/1"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFF0F0"
        css: "#FFF0F0"
        flutter: "0xFFFFF0F0"
        source: "direct"
      Dark:
        value: "#1A0000"
        css: "#1A0000"
        flutter: "0xFF1A0000"
        source: "direct"
      "SL Light":
        value: "#FFF0F0"
        css: "#FFF0F0"
        flutter: "0xFFFFF0F0"
        source: "direct"
      "SL Dark":
        value: "#1A0000"
        css: "#1A0000"
        flutter: "0xFF1A0000"
        source: "direct"
      "SL Orange Light":
        value: "#FFF0F0"
        css: "#FFF0F0"
        flutter: "0xFFFFF0F0"
        source: "direct"
      "SL Orange Dark":
        value: "#1A0000"
        css: "#1A0000"
        flutter: "0xFF1A0000"
        source: "direct"
      "Mrj Light":
        value: "#FFF0F0"
        css: "#FFF0F0"
        flutter: "0xFFFFF0F0"
        source: "direct"
      "Mrj Dark":
        value: "#1A0000"
        css: "#1A0000"
        flutter: "0xFF1A0000"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFF0F0"
  - token_id: "color_color_rd_error_color_10"
    semantic_name: "color / rd/error-color/10"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColor10"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "5c33a1aaa35e252321d0ac3ff3d3433304bfa311"
      name: "color / rd/error-color/10"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#400404"
        css: "#400404"
        flutter: "0xFF400404"
        source: "direct"
      Dark:
        value: "#FFE0E0"
        css: "#FFE0E0"
        flutter: "0xFFFFE0E0"
        source: "direct"
      "SL Light":
        value: "#400404"
        css: "#400404"
        flutter: "0xFF400404"
        source: "direct"
      "SL Dark":
        value: "#FFE0E0"
        css: "#FFE0E0"
        flutter: "0xFFFFE0E0"
        source: "direct"
      "SL Orange Light":
        value: "#400404"
        css: "#400404"
        flutter: "0xFF400404"
        source: "direct"
      "SL Orange Dark":
        value: "#FFE0E0"
        css: "#FFE0E0"
        flutter: "0xFFFFE0E0"
        source: "direct"
      "Mrj Light":
        value: "#400404"
        css: "#400404"
        flutter: "0xFF400404"
        source: "direct"
      "Mrj Dark":
        value: "#FFE0E0"
        css: "#FFE0E0"
        flutter: "0xFFFFE0E0"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#400404"
  - token_id: "color_color_rd_error_color_2"
    semantic_name: "color / rd/error-color/2"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColor2"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "76f5ca4113361d051d88486164b7194f0898b31d"
      name: "color / rd/error-color/2"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "direct"
      Dark:
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "direct"
      "SL Light":
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "direct"
      "SL Dark":
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "direct"
      "SL Orange Light":
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "direct"
      "SL Orange Dark":
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "direct"
      "Mrj Light":
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "direct"
      "Mrj Dark":
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFD6D6"
  - token_id: "color_color_rd_error_color_3"
    semantic_name: "color / rd/error-color/3"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColor3"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "8d313437367e5063df0312e64afc7d45d145d099"
      name: "color / rd/error-color/3"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFADAD"
        css: "#FFADAD"
        flutter: "0xFFFFADAD"
        source: "direct"
      Dark:
        value: "#5C1010"
        css: "#5C1010"
        flutter: "0xFF5C1010"
        source: "direct"
      "SL Light":
        value: "#FFADAD"
        css: "#FFADAD"
        flutter: "0xFFFFADAD"
        source: "direct"
      "SL Dark":
        value: "#5C1010"
        css: "#5C1010"
        flutter: "0xFF5C1010"
        source: "direct"
      "SL Orange Light":
        value: "#FFADAD"
        css: "#FFADAD"
        flutter: "0xFFFFADAD"
        source: "direct"
      "SL Orange Dark":
        value: "#5C1010"
        css: "#5C1010"
        flutter: "0xFF5C1010"
        source: "direct"
      "Mrj Light":
        value: "#FFADAD"
        css: "#FFADAD"
        flutter: "0xFFFFADAD"
        source: "direct"
      "Mrj Dark":
        value: "#5C1010"
        css: "#5C1010"
        flutter: "0xFF5C1010"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFADAD"
  - token_id: "color_color_rd_error_color_4"
    semantic_name: "color / rd/error-color/4"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColor4"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "ff7f542c1001cd31afeb226c21ae887e5ad62680"
      name: "color / rd/error-color/4"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FF7373"
        css: "#FF7373"
        flutter: "0xFFFF7373"
        source: "direct"
      Dark:
        value: "#8B1A1A"
        css: "#8B1A1A"
        flutter: "0xFF8B1A1A"
        source: "direct"
      "SL Light":
        value: "#FF7373"
        css: "#FF7373"
        flutter: "0xFFFF7373"
        source: "direct"
      "SL Dark":
        value: "#8B1A1A"
        css: "#8B1A1A"
        flutter: "0xFF8B1A1A"
        source: "direct"
      "SL Orange Light":
        value: "#FF7373"
        css: "#FF7373"
        flutter: "0xFFFF7373"
        source: "direct"
      "SL Orange Dark":
        value: "#8B1A1A"
        css: "#8B1A1A"
        flutter: "0xFF8B1A1A"
        source: "direct"
      "Mrj Light":
        value: "#FF7373"
        css: "#FF7373"
        flutter: "0xFFFF7373"
        source: "direct"
      "Mrj Dark":
        value: "#8B1A1A"
        css: "#8B1A1A"
        flutter: "0xFF8B1A1A"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FF7373"
  - token_id: "color_color_rd_error_color_5"
    semantic_name: "color / rd/error-color/5"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColor5"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "5758884bc7e7c47c92a04c2d72e8ec0447d6f661"
      name: "color / rd/error-color/5"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "direct"
      Dark:
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "direct"
      "SL Light":
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "direct"
      "SL Dark":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "direct"
      "SL Orange Light":
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "direct"
      "SL Orange Dark":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "direct"
      "Mrj Light":
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "direct"
      "Mrj Dark":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#F54040"
  - token_id: "color_color_rd_error_color_6"
    semantic_name: "color / rd/error-color/6"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColor6"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "30cd439678582083feef172701046b756927ec69"
      name: "color / rd/error-color/6"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "direct"
      Dark:
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "direct"
      "SL Light":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "direct"
      "SL Dark":
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "direct"
      "SL Orange Light":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "direct"
      "SL Orange Dark":
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "direct"
      "Mrj Light":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "direct"
      "Mrj Dark":
        value: "#F54040"
        css: "#F54040"
        flutter: "0xFFF54040"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#D92020"
  - token_id: "color_color_rd_error_color_7"
    semantic_name: "color / rd/error-color/7"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColor7"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "bb8dfa9366bd5c1e69b3818cd8fbaf9293445caa"
      name: "color / rd/error-color/7"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#B81010"
        css: "#B81010"
        flutter: "0xFFB81010"
        source: "direct"
      Dark:
        value: "#FF7373"
        css: "#FF7373"
        flutter: "0xFFFF7373"
        source: "direct"
      "SL Light":
        value: "#B81010"
        css: "#B81010"
        flutter: "0xFFB81010"
        source: "direct"
      "SL Dark":
        value: "#FF7373"
        css: "#FF7373"
        flutter: "0xFFFF7373"
        source: "direct"
      "SL Orange Light":
        value: "#B81010"
        css: "#B81010"
        flutter: "0xFFB81010"
        source: "direct"
      "SL Orange Dark":
        value: "#FF7373"
        css: "#FF7373"
        flutter: "0xFFFF7373"
        source: "direct"
      "Mrj Light":
        value: "#B81010"
        css: "#B81010"
        flutter: "0xFFB81010"
        source: "direct"
      "Mrj Dark":
        value: "#FF7373"
        css: "#FF7373"
        flutter: "0xFFFF7373"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#B81010"
  - token_id: "color_color_rd_error_color_8"
    semantic_name: "color / rd/error-color/8"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColor8"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "983a5d8e0f979ce4704914be10b47ba43ad68fc7"
      name: "color / rd/error-color/8"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#8C0C0C"
        css: "#8C0C0C"
        flutter: "0xFF8C0C0C"
        source: "direct"
      Dark:
        value: "#FF9999"
        css: "#FF9999"
        flutter: "0xFFFF9999"
        source: "direct"
      "SL Light":
        value: "#8C0C0C"
        css: "#8C0C0C"
        flutter: "0xFF8C0C0C"
        source: "direct"
      "SL Dark":
        value: "#FF9999"
        css: "#FF9999"
        flutter: "0xFFFF9999"
        source: "direct"
      "SL Orange Light":
        value: "#8C0C0C"
        css: "#8C0C0C"
        flutter: "0xFF8C0C0C"
        source: "direct"
      "SL Orange Dark":
        value: "#FF9999"
        css: "#FF9999"
        flutter: "0xFFFF9999"
        source: "direct"
      "Mrj Light":
        value: "#8C0C0C"
        css: "#8C0C0C"
        flutter: "0xFF8C0C0C"
        source: "direct"
      "Mrj Dark":
        value: "#FF9999"
        css: "#FF9999"
        flutter: "0xFFFF9999"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#8C0C0C"
  - token_id: "color_color_rd_error_color_9"
    semantic_name: "color / rd/error-color/9"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColor9"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "cfda5d3f9e4b9372a23c37d12354f0850fa32590"
      name: "color / rd/error-color/9"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#650808"
        css: "#650808"
        flutter: "0xFF650808"
        source: "direct"
      Dark:
        value: "#FFBFBF"
        css: "#FFBFBF"
        flutter: "0xFFFFBFBF"
        source: "direct"
      "SL Light":
        value: "#650808"
        css: "#650808"
        flutter: "0xFF650808"
        source: "direct"
      "SL Dark":
        value: "#FFBFBF"
        css: "#FFBFBF"
        flutter: "0xFFFFBFBF"
        source: "direct"
      "SL Orange Light":
        value: "#650808"
        css: "#650808"
        flutter: "0xFF650808"
        source: "direct"
      "SL Orange Dark":
        value: "#FFBFBF"
        css: "#FFBFBF"
        flutter: "0xFFFFBFBF"
        source: "direct"
      "Mrj Light":
        value: "#650808"
        css: "#650808"
        flutter: "0xFF650808"
        source: "direct"
      "Mrj Dark":
        value: "#FFBFBF"
        css: "#FFBFBF"
        flutter: "0xFFFFBFBF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#650808"
  - token_id: "color_color_rd_error_color_active"
    semantic_name: "color / rd/error-color/active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColorActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "79162bb541dccbef4fa7ead79a18a9e7a9801126"
      name: "color / rd/error-color/active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#B81010"
        css: "#B81010"
        flutter: "0xFFB81010"
        source: "rd/error-color/7"
      Dark:
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "rd/error-color/5"
      "SL Light":
        value: "#B81010"
        css: "#B81010"
        flutter: "0xFFB81010"
        source: "rd/error-color/7"
      "SL Dark":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "rd/error-color/5"
      "SL Orange Light":
        value: "#B81010"
        css: "#B81010"
        flutter: "0xFFB81010"
        source: "rd/error-color/7"
      "SL Orange Dark":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "rd/error-color/5"
      "Mrj Light":
        value: "#B81010"
        css: "#B81010"
        flutter: "0xFFB81010"
        source: "rd/error-color/7"
      "Mrj Dark":
        value: "#D92020"
        css: "#D92020"
        flutter: "0xFFD92020"
        source: "rd/error-color/5"
    notes:
      []
    fallback:
      allowed: false
      value: "#B81010"
  - token_id: "color_color_rd_error_color_disabled"
    semantic_name: "color / rd/error-color/disabled"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColorDisabled"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "32211ad11f01519909290b14af626addaad754e3"
      name: "color / rd/error-color/disabled"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFADAD"
        css: "#FFADAD"
        flutter: "0xFFFFADAD"
        source: "rd/error-color/3"
      Dark:
        value: "#5C1010"
        css: "#5C1010"
        flutter: "0xFF5C1010"
        source: "rd/error-color/3"
      "SL Light":
        value: "#FFADAD"
        css: "#FFADAD"
        flutter: "0xFFFFADAD"
        source: "rd/error-color/3"
      "SL Dark":
        value: "#5C1010"
        css: "#5C1010"
        flutter: "0xFF5C1010"
        source: "rd/error-color/3"
      "SL Orange Light":
        value: "#FFADAD"
        css: "#FFADAD"
        flutter: "0xFFFFADAD"
        source: "rd/error-color/3"
      "SL Orange Dark":
        value: "#5C1010"
        css: "#5C1010"
        flutter: "0xFF5C1010"
        source: "rd/error-color/3"
      "Mrj Light":
        value: "#FFADAD"
        css: "#FFADAD"
        flutter: "0xFFFFADAD"
        source: "rd/error-color/3"
      "Mrj Dark":
        value: "#5C1010"
        css: "#5C1010"
        flutter: "0xFF5C1010"
        source: "rd/error-color/3"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFADAD"
  - token_id: "color_color_rd_error_color_focus"
    semantic_name: "color / rd/error-color/focus"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColorFocus"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "b01f62f2624d48dd0632bca32d58e4ad8c294842"
      name: "color / rd/error-color/focus"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "rd/error-color/2"
      Dark:
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "rd/error-color/2"
      "SL Light":
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "rd/error-color/2"
      "SL Dark":
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "rd/error-color/2"
      "SL Orange Light":
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "rd/error-color/2"
      "SL Orange Dark":
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "rd/error-color/2"
      "Mrj Light":
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "rd/error-color/2"
      "Mrj Dark":
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "rd/error-color/2"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFD6D6"
  - token_id: "color_color_rd_error_color_light"
    semantic_name: "color / rd/error-color/light"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColorLight"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "90fcacef09e20e2d91a04fe7c453c22f677dbe59"
      name: "color / rd/error-color/light"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFF0F0"
        css: "#FFF0F0"
        flutter: "0xFFFFF0F0"
        source: "rd/error-color/1"
      Dark:
        value: "#1A0000"
        css: "#1A0000"
        flutter: "0xFF1A0000"
        source: "rd/error-color/1"
      "SL Light":
        value: "#FFF0F0"
        css: "#FFF0F0"
        flutter: "0xFFFFF0F0"
        source: "rd/error-color/1"
      "SL Dark":
        value: "#1A0000"
        css: "#1A0000"
        flutter: "0xFF1A0000"
        source: "rd/error-color/1"
      "SL Orange Light":
        value: "#FFF0F0"
        css: "#FFF0F0"
        flutter: "0xFFFFF0F0"
        source: "rd/error-color/1"
      "SL Orange Dark":
        value: "#1A0000"
        css: "#1A0000"
        flutter: "0xFF1A0000"
        source: "rd/error-color/1"
      "Mrj Light":
        value: "#FFF0F0"
        css: "#FFF0F0"
        flutter: "0xFFFFF0F0"
        source: "rd/error-color/1"
      "Mrj Dark":
        value: "#1A0000"
        css: "#1A0000"
        flutter: "0xFF1A0000"
        source: "rd/error-color/1"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFF0F0"
  - token_id: "color_color_rd_error_color_light_active"
    semantic_name: "color / rd/error-color/light-active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdErrorColorLightActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "7e070bec9698b389f27ac713257fd4701d9a845c"
      name: "color / rd/error-color/light-active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "rd/error-color/2"
      Dark:
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "rd/error-color/2"
      "SL Light":
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "rd/error-color/2"
      "SL Dark":
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "rd/error-color/2"
      "SL Orange Light":
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "rd/error-color/2"
      "SL Orange Dark":
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "rd/error-color/2"
      "Mrj Light":
        value: "#FFD6D6"
        css: "#FFD6D6"
        flutter: "0xFFFFD6D6"
        source: "rd/error-color/2"
      "Mrj Dark":
        value: "#3D0A0A"
        css: "#3D0A0A"
        flutter: "0xFF3D0A0A"
        source: "rd/error-color/2"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFD6D6"
  - token_id: "color_color_rd_font_gray_1"
    semantic_name: "color / rd/font-gray/1"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdFontGray1"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "30c69acdc01ccf5105c4045517b708a3b55b1ec8"
      name: "color / rd/font-gray/1"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "direct"
      Dark:
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "direct"
      "SL Light":
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "direct"
      "SL Dark":
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "direct"
      "SL Orange Light":
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "direct"
      "SL Orange Dark":
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "direct"
      "Mrj Light":
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "direct"
      "Mrj Dark":
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#000000E5"
  - token_id: "color_color_rd_font_gray_2"
    semantic_name: "color / rd/font-gray/2"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdFontGray2"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "659a7028a6416744675bb232ade58085def2fc07"
      name: "color / rd/font-gray/2"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      Dark:
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "SL Light":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "SL Dark":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "SL Orange Light":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "SL Orange Dark":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "Mrj Light":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "Mrj Dark":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#00000099"
  - token_id: "color_color_rd_font_gray_3"
    semantic_name: "color / rd/font-gray/3"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdFontGray3"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "22c2068947b437b77b35d8bc08db7bc299b1f1cd"
      name: "color / rd/font-gray/3"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
      Dark:
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
      "SL Light":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
      "SL Dark":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
      "SL Orange Light":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
      "SL Orange Dark":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
      "Mrj Light":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
      "Mrj Dark":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#00000066"
  - token_id: "color_color_rd_font_gray_4"
    semantic_name: "color / rd/font-gray/4"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdFontGray4"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "8df284ef55e80ce44f902bdbcf8f2a4a7274c04f"
      name: "color / rd/font-gray/4"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "direct"
      Dark:
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "direct"
      "SL Light":
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "direct"
      "SL Dark":
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "direct"
      "SL Orange Light":
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "direct"
      "SL Orange Dark":
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "direct"
      "Mrj Light":
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "direct"
      "Mrj Dark":
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#00000042"
  - token_id: "color_color_rd_font_white_1"
    semantic_name: "color / rd/font-white/1"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdFontWhite1"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "284ce556704414c10bcbd855aff874a8c898fc83"
      name: "color / rd/font-white/1"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      Dark:
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "direct"
      "SL Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "SL Dark":
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "direct"
      "SL Orange Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "direct"
      "Mrj Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "Mrj Dark":
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFF"
  - token_id: "color_color_rd_font_white_2"
    semantic_name: "color / rd/font-white/2"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdFontWhite2"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "af08870bb1d32d22370241b10b8f90ff8abd4283"
      name: "color / rd/font-white/2"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "direct"
      Dark:
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "direct"
      "SL Light":
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "direct"
      "SL Dark":
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "direct"
      "SL Orange Light":
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "direct"
      "Mrj Light":
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "direct"
      "Mrj Dark":
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFF8C"
  - token_id: "color_color_rd_font_white_3"
    semantic_name: "color / rd/font-white/3"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdFontWhite3"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "e15ff68dc239b8c2838514288421b018f96d80a0"
      name: "color / rd/font-white/3"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "direct"
      Dark:
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "direct"
      "SL Light":
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "direct"
      "SL Dark":
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "direct"
      "SL Orange Light":
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "direct"
      "Mrj Light":
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "direct"
      "Mrj Dark":
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFF59"
  - token_id: "color_color_rd_font_white_4"
    semantic_name: "color / rd/font-white/4"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdFontWhite4"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "665e4f824399936df3f9ff28dde3906abda8b05e"
      name: "color / rd/font-white/4"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "direct"
      Dark:
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "direct"
      "SL Light":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "direct"
      "SL Dark":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "direct"
      "SL Orange Light":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "direct"
      "Mrj Light":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "direct"
      "Mrj Dark":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFF38"
  - token_id: "color_color_rd_gray_color_1"
    semantic_name: "color / rd/gray-color/1"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor1"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "21b5d640c94698488dce41bed5e55e9167f583c4"
      name: "color / rd/gray-color/1"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
      Dark:
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
      "SL Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
      "SL Dark":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
      "SL Orange Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
      "SL Orange Dark":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
      "Mrj Light":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
      "Mrj Dark":
        value: "#F3F3F3"
        css: "#F3F3F3"
        flutter: "0xFFF3F3F3"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#F3F3F3"
  - token_id: "color_color_rd_gray_color_10"
    semantic_name: "color / rd/gray-color/10"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor10"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "3d6b62b15944cde85d6f789e51e983055d11b1cc"
      name: "color / rd/gray-color/10"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "direct"
      Dark:
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "direct"
      "SL Light":
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "direct"
      "SL Dark":
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "direct"
      "SL Orange Light":
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "direct"
      "SL Orange Dark":
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "direct"
      "Mrj Light":
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "direct"
      "Mrj Dark":
        value: "#4B4B4B"
        css: "#4B4B4B"
        flutter: "0xFF4B4B4B"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#4B4B4B"
  - token_id: "color_color_rd_gray_color_11"
    semantic_name: "color / rd/gray-color/11"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor11"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "8d5c0e4d75e513071a69fa5ed140cd25516cc52f"
      name: "color / rd/gray-color/11"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
      Dark:
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
      "SL Light":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
      "SL Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
      "SL Orange Light":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
      "SL Orange Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
      "Mrj Light":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
      "Mrj Dark":
        value: "#383838"
        css: "#383838"
        flutter: "0xFF383838"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#383838"
  - token_id: "color_color_rd_gray_color_12"
    semantic_name: "color / rd/gray-color/12"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor12"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c22570009c15cca3801d3cb5f6483730fc6baf01"
      name: "color / rd/gray-color/12"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
      Dark:
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
      "SL Light":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
      "SL Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
      "SL Orange Light":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
      "SL Orange Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
      "Mrj Light":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
      "Mrj Dark":
        value: "#2C2C2C"
        css: "#2C2C2C"
        flutter: "0xFF2C2C2C"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#2C2C2C"
  - token_id: "color_color_rd_gray_color_13"
    semantic_name: "color / rd/gray-color/13"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor13"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "6545ee70ce908baa94888db3ded524849b90c186"
      name: "color / rd/gray-color/13"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      Dark:
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "SL Light":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "SL Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "SL Orange Light":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "SL Orange Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "Mrj Light":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
      "Mrj Dark":
        value: "#242424"
        css: "#242424"
        flutter: "0xFF242424"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#242424"
  - token_id: "color_color_rd_gray_color_14"
    semantic_name: "color / rd/gray-color/14"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor14"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "d004b6c527c8ed0546c12e9c674094379b5441e9"
      name: "color / rd/gray-color/14"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "direct"
      Dark:
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "direct"
      "SL Light":
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "direct"
      "SL Dark":
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "direct"
      "SL Orange Light":
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "direct"
      "SL Orange Dark":
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "direct"
      "Mrj Light":
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "direct"
      "Mrj Dark":
        value: "#181818"
        css: "#181818"
        flutter: "0xFF181818"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#181818"
  - token_id: "color_color_rd_gray_color_2"
    semantic_name: "color / rd/gray-color/2"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor2"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "3a8231e67db80e072dda861c4b3e38aa4c056dcf"
      name: "color / rd/gray-color/2"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "direct"
      Dark:
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "direct"
      "SL Light":
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "direct"
      "SL Dark":
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "direct"
      "SL Orange Light":
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "direct"
      "SL Orange Dark":
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "direct"
      "Mrj Light":
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "direct"
      "Mrj Dark":
        value: "#EEEEEE"
        css: "#EEEEEE"
        flutter: "0xFFEEEEEE"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#EEEEEE"
  - token_id: "color_color_rd_gray_color_3"
    semantic_name: "color / rd/gray-color/3"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor3"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "ae3acdd3607ae1dd5395e77ca2397f87f3c5eced"
      name: "color / rd/gray-color/3"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
      Dark:
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
      "SL Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
      "SL Dark":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
      "SL Orange Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
      "SL Orange Dark":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
      "Mrj Light":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
      "Mrj Dark":
        value: "#E7E7E7"
        css: "#E7E7E7"
        flutter: "0xFFE7E7E7"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#E7E7E7"
  - token_id: "color_color_rd_gray_color_4"
    semantic_name: "color / rd/gray-color/4"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor4"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "0b81056697f28a62ec9d40b0d04910498788fa6b"
      name: "color / rd/gray-color/4"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "direct"
      Dark:
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "direct"
      "SL Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "direct"
      "SL Dark":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "direct"
      "SL Orange Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "direct"
      "SL Orange Dark":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "direct"
      "Mrj Light":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "direct"
      "Mrj Dark":
        value: "#DCDCDC"
        css: "#DCDCDC"
        flutter: "0xFFDCDCDC"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#DCDCDC"
  - token_id: "color_color_rd_gray_color_5"
    semantic_name: "color / rd/gray-color/5"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor5"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c04e403623aefde420ce7894c288467cda4b1db9"
      name: "color / rd/gray-color/5"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#C5C5C5"
        css: "#C5C5C5"
        flutter: "0xFFC5C5C5"
        source: "direct"
      Dark:
        value: "#C5C5C5"
        css: "#C5C5C5"
        flutter: "0xFFC5C5C5"
        source: "direct"
      "SL Light":
        value: "#C5C5C5"
        css: "#C5C5C5"
        flutter: "0xFFC5C5C5"
        source: "direct"
      "SL Dark":
        value: "#C5C5C5"
        css: "#C5C5C5"
        flutter: "0xFFC5C5C5"
        source: "direct"
      "SL Orange Light":
        value: "#C5C5C5"
        css: "#C5C5C5"
        flutter: "0xFFC5C5C5"
        source: "direct"
      "SL Orange Dark":
        value: "#C5C5C5"
        css: "#C5C5C5"
        flutter: "0xFFC5C5C5"
        source: "direct"
      "Mrj Light":
        value: "#C5C5C5"
        css: "#C5C5C5"
        flutter: "0xFFC5C5C5"
        source: "direct"
      "Mrj Dark":
        value: "#C5C5C5"
        css: "#C5C5C5"
        flutter: "0xFFC5C5C5"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#C5C5C5"
  - token_id: "color_color_rd_gray_color_6"
    semantic_name: "color / rd/gray-color/6"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor6"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f3082cf303d28d3605877c4df43bb85ec726bfcb"
      name: "color / rd/gray-color/6"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "direct"
      Dark:
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "direct"
      "SL Light":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "direct"
      "SL Dark":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "direct"
      "SL Orange Light":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "direct"
      "SL Orange Dark":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "direct"
      "Mrj Light":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "direct"
      "Mrj Dark":
        value: "#A6A6A6"
        css: "#A6A6A6"
        flutter: "0xFFA6A6A6"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#A6A6A6"
  - token_id: "color_color_rd_gray_color_7"
    semantic_name: "color / rd/gray-color/7"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor7"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "fb85ed0f6a5c09daa2bef862d72e958d322ac9ce"
      name: "color / rd/gray-color/7"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#8B8B8B"
        css: "#8B8B8B"
        flutter: "0xFF8B8B8B"
        source: "direct"
      Dark:
        value: "#8B8B8B"
        css: "#8B8B8B"
        flutter: "0xFF8B8B8B"
        source: "direct"
      "SL Light":
        value: "#8B8B8B"
        css: "#8B8B8B"
        flutter: "0xFF8B8B8B"
        source: "direct"
      "SL Dark":
        value: "#8B8B8B"
        css: "#8B8B8B"
        flutter: "0xFF8B8B8B"
        source: "direct"
      "SL Orange Light":
        value: "#8B8B8B"
        css: "#8B8B8B"
        flutter: "0xFF8B8B8B"
        source: "direct"
      "SL Orange Dark":
        value: "#8B8B8B"
        css: "#8B8B8B"
        flutter: "0xFF8B8B8B"
        source: "direct"
      "Mrj Light":
        value: "#8B8B8B"
        css: "#8B8B8B"
        flutter: "0xFF8B8B8B"
        source: "direct"
      "Mrj Dark":
        value: "#8B8B8B"
        css: "#8B8B8B"
        flutter: "0xFF8B8B8B"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#8B8B8B"
  - token_id: "color_color_rd_gray_color_8"
    semantic_name: "color / rd/gray-color/8"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor8"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "a0133ca08caa9e713484ead9b784ca37eee9b1a7"
      name: "color / rd/gray-color/8"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#777777"
        css: "#777777"
        flutter: "0xFF777777"
        source: "direct"
      Dark:
        value: "#777777"
        css: "#777777"
        flutter: "0xFF777777"
        source: "direct"
      "SL Light":
        value: "#777777"
        css: "#777777"
        flutter: "0xFF777777"
        source: "direct"
      "SL Dark":
        value: "#777777"
        css: "#777777"
        flutter: "0xFF777777"
        source: "direct"
      "SL Orange Light":
        value: "#777777"
        css: "#777777"
        flutter: "0xFF777777"
        source: "direct"
      "SL Orange Dark":
        value: "#777777"
        css: "#777777"
        flutter: "0xFF777777"
        source: "direct"
      "Mrj Light":
        value: "#777777"
        css: "#777777"
        flutter: "0xFF777777"
        source: "direct"
      "Mrj Dark":
        value: "#777777"
        css: "#777777"
        flutter: "0xFF777777"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#777777"
  - token_id: "color_color_rd_gray_color_9"
    semantic_name: "color / rd/gray-color/9"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdGrayColor9"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "e11479e3f63e4e1c2da441da0db40d7f516ad04f"
      name: "color / rd/gray-color/9"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "direct"
      Dark:
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "direct"
      "SL Light":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "direct"
      "SL Dark":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "direct"
      "SL Orange Light":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "direct"
      "SL Orange Dark":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "direct"
      "Mrj Light":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "direct"
      "Mrj Dark":
        value: "#5E5E5E"
        css: "#5E5E5E"
        flutter: "0xFF5E5E5E"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#5E5E5E"
  - token_id: "color_color_rd_information_color"
    semantic_name: "color / rd/information-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColor"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "eb44bac51a99f428fbfe48602c02331e630e30ec"
      name: "color / rd/information-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
      Dark:
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
      "SL Light":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
      "SL Dark":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
      "SL Orange Light":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
      "SL Orange Dark":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
      "Mrj Light":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
      "Mrj Dark":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
    notes:
      []
    fallback:
      allowed: false
      value: "#2659F0"
  - token_id: "color_color_rd_information_color_1"
    semantic_name: "color / rd/information-color/1"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColor1"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "777354009add4a23a8d9a351851a627e3b34c72a"
      name: "color / rd/information-color/1"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "direct"
      Dark:
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "direct"
      "SL Light":
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "direct"
      "SL Dark":
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "direct"
      "SL Orange Light":
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "direct"
      "SL Orange Dark":
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "direct"
      "Mrj Light":
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "direct"
      "Mrj Dark":
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#F0F4FF"
  - token_id: "color_color_rd_information_color_10"
    semantic_name: "color / rd/information-color/10"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColor10"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "231fdfe58a4392900d699fb12bd7e814b1041719"
      name: "color / rd/information-color/10"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#04165C"
        css: "#04165C"
        flutter: "0xFF04165C"
        source: "direct"
      Dark:
        value: "#D6E6FF"
        css: "#D6E6FF"
        flutter: "0xFFD6E6FF"
        source: "direct"
      "SL Light":
        value: "#04165C"
        css: "#04165C"
        flutter: "0xFF04165C"
        source: "direct"
      "SL Dark":
        value: "#D6E6FF"
        css: "#D6E6FF"
        flutter: "0xFFD6E6FF"
        source: "direct"
      "SL Orange Light":
        value: "#04165C"
        css: "#04165C"
        flutter: "0xFF04165C"
        source: "direct"
      "SL Orange Dark":
        value: "#D6E6FF"
        css: "#D6E6FF"
        flutter: "0xFFD6E6FF"
        source: "direct"
      "Mrj Light":
        value: "#04165C"
        css: "#04165C"
        flutter: "0xFF04165C"
        source: "direct"
      "Mrj Dark":
        value: "#D6E6FF"
        css: "#D6E6FF"
        flutter: "0xFFD6E6FF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#04165C"
  - token_id: "color_color_rd_information_color_2"
    semantic_name: "color / rd/information-color/2"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColor2"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "24ffaddd00998593004605f8735a6742d495cc6b"
      name: "color / rd/information-color/2"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#D6E4FF"
        css: "#D6E4FF"
        flutter: "0xFFD6E4FF"
        source: "direct"
      Dark:
        value: "#050F4A"
        css: "#050F4A"
        flutter: "0xFF050F4A"
        source: "direct"
      "SL Light":
        value: "#D6E4FF"
        css: "#D6E4FF"
        flutter: "0xFFD6E4FF"
        source: "direct"
      "SL Dark":
        value: "#050F4A"
        css: "#050F4A"
        flutter: "0xFF050F4A"
        source: "direct"
      "SL Orange Light":
        value: "#D6E4FF"
        css: "#D6E4FF"
        flutter: "0xFFD6E4FF"
        source: "direct"
      "SL Orange Dark":
        value: "#050F4A"
        css: "#050F4A"
        flutter: "0xFF050F4A"
        source: "direct"
      "Mrj Light":
        value: "#D6E4FF"
        css: "#D6E4FF"
        flutter: "0xFFD6E4FF"
        source: "direct"
      "Mrj Dark":
        value: "#050F4A"
        css: "#050F4A"
        flutter: "0xFF050F4A"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#D6E4FF"
  - token_id: "color_color_rd_information_color_3"
    semantic_name: "color / rd/information-color/3"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColor3"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "1a4bfc327d71cb0c5f012d3c7c9a3205fe6eb218"
      name: "color / rd/information-color/3"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#AABFFF"
        css: "#AABFFF"
        flutter: "0xFFAABFFF"
        source: "direct"
      Dark:
        value: "#0A1D72"
        css: "#0A1D72"
        flutter: "0xFF0A1D72"
        source: "direct"
      "SL Light":
        value: "#AABFFF"
        css: "#AABFFF"
        flutter: "0xFFAABFFF"
        source: "direct"
      "SL Dark":
        value: "#0A1D72"
        css: "#0A1D72"
        flutter: "0xFF0A1D72"
        source: "direct"
      "SL Orange Light":
        value: "#AABFFF"
        css: "#AABFFF"
        flutter: "0xFFAABFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#0A1D72"
        css: "#0A1D72"
        flutter: "0xFF0A1D72"
        source: "direct"
      "Mrj Light":
        value: "#AABFFF"
        css: "#AABFFF"
        flutter: "0xFFAABFFF"
        source: "direct"
      "Mrj Dark":
        value: "#0A1D72"
        css: "#0A1D72"
        flutter: "0xFF0A1D72"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#AABFFF"
  - token_id: "color_color_rd_information_color_4"
    semantic_name: "color / rd/information-color/4"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColor4"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "0292490783f1756c745024372afe3c672475f4d2"
      name: "color / rd/information-color/4"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#7A9EFF"
        css: "#7A9EFF"
        flutter: "0xFF7A9EFF"
        source: "direct"
      Dark:
        value: "#102690"
        css: "#102690"
        flutter: "0xFF102690"
        source: "direct"
      "SL Light":
        value: "#7A9EFF"
        css: "#7A9EFF"
        flutter: "0xFF7A9EFF"
        source: "direct"
      "SL Dark":
        value: "#102690"
        css: "#102690"
        flutter: "0xFF102690"
        source: "direct"
      "SL Orange Light":
        value: "#7A9EFF"
        css: "#7A9EFF"
        flutter: "0xFF7A9EFF"
        source: "direct"
      "SL Orange Dark":
        value: "#102690"
        css: "#102690"
        flutter: "0xFF102690"
        source: "direct"
      "Mrj Light":
        value: "#7A9EFF"
        css: "#7A9EFF"
        flutter: "0xFF7A9EFF"
        source: "direct"
      "Mrj Dark":
        value: "#102690"
        css: "#102690"
        flutter: "0xFF102690"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#7A9EFF"
  - token_id: "color_color_rd_information_color_5"
    semantic_name: "color / rd/information-color/5"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColor5"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "cee06f72fcc3495657ee169795cdb8017024aeb5"
      name: "color / rd/information-color/5"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#4F7CFF"
        css: "#4F7CFF"
        flutter: "0xFF4F7CFF"
        source: "direct"
      Dark:
        value: "#1A45D4"
        css: "#1A45D4"
        flutter: "0xFF1A45D4"
        source: "direct"
      "SL Light":
        value: "#4F7CFF"
        css: "#4F7CFF"
        flutter: "0xFF4F7CFF"
        source: "direct"
      "SL Dark":
        value: "#1A45D4"
        css: "#1A45D4"
        flutter: "0xFF1A45D4"
        source: "direct"
      "SL Orange Light":
        value: "#4F7CFF"
        css: "#4F7CFF"
        flutter: "0xFF4F7CFF"
        source: "direct"
      "SL Orange Dark":
        value: "#1A45D4"
        css: "#1A45D4"
        flutter: "0xFF1A45D4"
        source: "direct"
      "Mrj Light":
        value: "#4F7CFF"
        css: "#4F7CFF"
        flutter: "0xFF4F7CFF"
        source: "direct"
      "Mrj Dark":
        value: "#1A45D4"
        css: "#1A45D4"
        flutter: "0xFF1A45D4"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#4F7CFF"
  - token_id: "color_color_rd_information_color_6"
    semantic_name: "color / rd/information-color/6"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColor6"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "dcecd8359fa34a5df5a556a1f602057597e2d53d"
      name: "color / rd/information-color/6"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "direct"
      Dark:
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "direct"
      "SL Light":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "direct"
      "SL Dark":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "direct"
      "SL Orange Light":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "direct"
      "SL Orange Dark":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "direct"
      "Mrj Light":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "direct"
      "Mrj Dark":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#2659F0"
  - token_id: "color_color_rd_information_color_7"
    semantic_name: "color / rd/information-color/7"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColor7"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "6f8dbd7de0bc5a314e4f5969acc44f7e0d3587da"
      name: "color / rd/information-color/7"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#1A45D4"
        css: "#1A45D4"
        flutter: "0xFF1A45D4"
        source: "direct"
      Dark:
        value: "#5580FF"
        css: "#5580FF"
        flutter: "0xFF5580FF"
        source: "direct"
      "SL Light":
        value: "#1A45D4"
        css: "#1A45D4"
        flutter: "0xFF1A45D4"
        source: "direct"
      "SL Dark":
        value: "#5580FF"
        css: "#5580FF"
        flutter: "0xFF5580FF"
        source: "direct"
      "SL Orange Light":
        value: "#1A45D4"
        css: "#1A45D4"
        flutter: "0xFF1A45D4"
        source: "direct"
      "SL Orange Dark":
        value: "#5580FF"
        css: "#5580FF"
        flutter: "0xFF5580FF"
        source: "direct"
      "Mrj Light":
        value: "#1A45D4"
        css: "#1A45D4"
        flutter: "0xFF1A45D4"
        source: "direct"
      "Mrj Dark":
        value: "#5580FF"
        css: "#5580FF"
        flutter: "0xFF5580FF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#1A45D4"
  - token_id: "color_color_rd_information_color_8"
    semantic_name: "color / rd/information-color/8"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColor8"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "062cd3350b2009228b3bc835c5752f11ef1956e7"
      name: "color / rd/information-color/8"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#1034AA"
        css: "#1034AA"
        flutter: "0xFF1034AA"
        source: "direct"
      Dark:
        value: "#7A9EFF"
        css: "#7A9EFF"
        flutter: "0xFF7A9EFF"
        source: "direct"
      "SL Light":
        value: "#1034AA"
        css: "#1034AA"
        flutter: "0xFF1034AA"
        source: "direct"
      "SL Dark":
        value: "#7A9EFF"
        css: "#7A9EFF"
        flutter: "0xFF7A9EFF"
        source: "direct"
      "SL Orange Light":
        value: "#1034AA"
        css: "#1034AA"
        flutter: "0xFF1034AA"
        source: "direct"
      "SL Orange Dark":
        value: "#7A9EFF"
        css: "#7A9EFF"
        flutter: "0xFF7A9EFF"
        source: "direct"
      "Mrj Light":
        value: "#1034AA"
        css: "#1034AA"
        flutter: "0xFF1034AA"
        source: "direct"
      "Mrj Dark":
        value: "#7A9EFF"
        css: "#7A9EFF"
        flutter: "0xFF7A9EFF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#1034AA"
  - token_id: "color_color_rd_information_color_9"
    semantic_name: "color / rd/information-color/9"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColor9"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "3eb9e518a698e71f0c9014a3cdf746ba6ca0bf42"
      name: "color / rd/information-color/9"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#092480"
        css: "#092480"
        flutter: "0xFF092480"
        source: "direct"
      Dark:
        value: "#AAC2FF"
        css: "#AAC2FF"
        flutter: "0xFFAAC2FF"
        source: "direct"
      "SL Light":
        value: "#092480"
        css: "#092480"
        flutter: "0xFF092480"
        source: "direct"
      "SL Dark":
        value: "#AAC2FF"
        css: "#AAC2FF"
        flutter: "0xFFAAC2FF"
        source: "direct"
      "SL Orange Light":
        value: "#092480"
        css: "#092480"
        flutter: "0xFF092480"
        source: "direct"
      "SL Orange Dark":
        value: "#AAC2FF"
        css: "#AAC2FF"
        flutter: "0xFFAAC2FF"
        source: "direct"
      "Mrj Light":
        value: "#092480"
        css: "#092480"
        flutter: "0xFF092480"
        source: "direct"
      "Mrj Dark":
        value: "#AAC2FF"
        css: "#AAC2FF"
        flutter: "0xFFAAC2FF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#092480"
  - token_id: "color_color_rd_information_color_active"
    semantic_name: "color / rd/information-color/active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColorActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "aed08154643f789d508ab28e2bc4a252950f2d41"
      name: "color / rd/information-color/active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
      Dark:
        value: "#102690"
        css: "#102690"
        flutter: "0xFF102690"
        source: "rd/information-color/4"
      "SL Light":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
      "SL Dark":
        value: "#102690"
        css: "#102690"
        flutter: "0xFF102690"
        source: "rd/information-color/4"
      "SL Orange Light":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
      "SL Orange Dark":
        value: "#102690"
        css: "#102690"
        flutter: "0xFF102690"
        source: "rd/information-color/4"
      "Mrj Light":
        value: "#2659F0"
        css: "#2659F0"
        flutter: "0xFF2659F0"
        source: "rd/information-color/6"
      "Mrj Dark":
        value: "#102690"
        css: "#102690"
        flutter: "0xFF102690"
        source: "rd/information-color/4"
    notes:
      []
    fallback:
      allowed: false
      value: "#2659F0"
  - token_id: "color_color_rd_information_color_disabled"
    semantic_name: "color / rd/information-color/disabled"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColorDisabled"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "19b0736d9592d53f5305ed8719d6d5d69d575db7"
      name: "color / rd/information-color/disabled"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#AABFFF"
        css: "#AABFFF"
        flutter: "0xFFAABFFF"
        source: "rd/information-color/3"
      Dark:
        value: "#0A1D72"
        css: "#0A1D72"
        flutter: "0xFF0A1D72"
        source: "rd/information-color/3"
      "SL Light":
        value: "#AABFFF"
        css: "#AABFFF"
        flutter: "0xFFAABFFF"
        source: "rd/information-color/3"
      "SL Dark":
        value: "#0A1D72"
        css: "#0A1D72"
        flutter: "0xFF0A1D72"
        source: "rd/information-color/3"
      "SL Orange Light":
        value: "#AABFFF"
        css: "#AABFFF"
        flutter: "0xFFAABFFF"
        source: "rd/information-color/3"
      "SL Orange Dark":
        value: "#0A1D72"
        css: "#0A1D72"
        flutter: "0xFF0A1D72"
        source: "rd/information-color/3"
      "Mrj Light":
        value: "#AABFFF"
        css: "#AABFFF"
        flutter: "0xFFAABFFF"
        source: "rd/information-color/3"
      "Mrj Dark":
        value: "#0A1D72"
        css: "#0A1D72"
        flutter: "0xFF0A1D72"
        source: "rd/information-color/3"
    notes:
      []
    fallback:
      allowed: false
      value: "#AABFFF"
  - token_id: "color_color_rd_information_color_focus"
    semantic_name: "color / rd/information-color/focus"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColorFocus"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "2a9b01251139bb2953b7f922fce5e70a95a3e8a4"
      name: "color / rd/information-color/focus"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "rd/information-color/1"
      Dark:
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "rd/information-color/1"
      "SL Light":
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "rd/information-color/1"
      "SL Dark":
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "rd/information-color/1"
      "SL Orange Light":
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "rd/information-color/1"
      "SL Orange Dark":
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "rd/information-color/1"
      "Mrj Light":
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "rd/information-color/1"
      "Mrj Dark":
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "rd/information-color/1"
    notes:
      []
    fallback:
      allowed: false
      value: "#F0F4FF"
  - token_id: "color_color_rd_information_color_light"
    semantic_name: "color / rd/information-color/light"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColorLight"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "79c94a7a2aa86433fa1d06608c292f6555bbfb82"
      name: "color / rd/information-color/light"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "rd/information-color/1"
      Dark:
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "rd/information-color/1"
      "SL Light":
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "rd/information-color/1"
      "SL Dark":
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "rd/information-color/1"
      "SL Orange Light":
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "rd/information-color/1"
      "SL Orange Dark":
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "rd/information-color/1"
      "Mrj Light":
        value: "#F0F4FF"
        css: "#F0F4FF"
        flutter: "0xFFF0F4FF"
        source: "rd/information-color/1"
      "Mrj Dark":
        value: "#020B2E"
        css: "#020B2E"
        flutter: "0xFF020B2E"
        source: "rd/information-color/1"
    notes:
      []
    fallback:
      allowed: false
      value: "#F0F4FF"
  - token_id: "color_color_rd_information_color_light_active"
    semantic_name: "color / rd/information-color/light-active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdInformationColorLightActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "8683ff42b5a6a27a3c8701cccf3fa0599c5087da"
      name: "color / rd/information-color/light-active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#D6E4FF"
        css: "#D6E4FF"
        flutter: "0xFFD6E4FF"
        source: "rd/information-color/2"
      Dark:
        value: "#050F4A"
        css: "#050F4A"
        flutter: "0xFF050F4A"
        source: "rd/information-color/2"
      "SL Light":
        value: "#D6E4FF"
        css: "#D6E4FF"
        flutter: "0xFFD6E4FF"
        source: "rd/information-color/2"
      "SL Dark":
        value: "#050F4A"
        css: "#050F4A"
        flutter: "0xFF050F4A"
        source: "rd/information-color/2"
      "SL Orange Light":
        value: "#D6E4FF"
        css: "#D6E4FF"
        flutter: "0xFFD6E4FF"
        source: "rd/information-color/2"
      "SL Orange Dark":
        value: "#050F4A"
        css: "#050F4A"
        flutter: "0xFF050F4A"
        source: "rd/information-color/2"
      "Mrj Light":
        value: "#D6E4FF"
        css: "#D6E4FF"
        flutter: "0xFFD6E4FF"
        source: "rd/information-color/2"
      "Mrj Dark":
        value: "#050F4A"
        css: "#050F4A"
        flutter: "0xFF050F4A"
        source: "rd/information-color/2"
    notes:
      []
    fallback:
      allowed: false
      value: "#D6E4FF"
  - token_id: "color_color_rd_mask_active"
    semantic_name: "color / rd/mask-active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdMaskActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "9035b3aef4b6a1b62bd8363ff32910bf691af944"
      name: "color / rd/mask-active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      Dark:
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
      "SL Light":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "SL Dark":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
      "SL Orange Light":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "SL Orange Dark":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
      "Mrj Light":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "Mrj Dark":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#00000099"
  - token_id: "color_color_rd_mask_background"
    semantic_name: "color / rd/mask-background"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdMaskBackground"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "36f3c1bdd0d450dc44d625c1e2dd4a99c502a868"
      name: "color / rd/mask-background"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFFF5"
        css: "#FFFFFFF5"
        flutter: "0xF5FFFFFF"
        source: "direct"
      Dark:
        value: "#242424F5"
        css: "#242424F5"
        flutter: "0xF5242424"
        source: "direct"
      "SL Light":
        value: "#FFFFFFF5"
        css: "#FFFFFFF5"
        flutter: "0xF5FFFFFF"
        source: "direct"
      "SL Dark":
        value: "#242424F5"
        css: "#242424F5"
        flutter: "0xF5242424"
        source: "direct"
      "SL Orange Light":
        value: "#FFFFFFF5"
        css: "#FFFFFFF5"
        flutter: "0xF5FFFFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#242424F5"
        css: "#242424F5"
        flutter: "0xF5242424"
        source: "direct"
      "Mrj Light":
        value: "#FFFFFFF5"
        css: "#FFFFFFF5"
        flutter: "0xF5FFFFFF"
        source: "direct"
      "Mrj Dark":
        value: "#242424F5"
        css: "#242424F5"
        flutter: "0xF5242424"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFFF5"
  - token_id: "color_color_rd_mask_disabled"
    semantic_name: "color / rd/mask-disabled"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdMaskDisabled"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "23b2f597d42a15a9381cd095c7daca279c7d50bf"
      name: "color / rd/mask-disabled"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFF99"
        css: "#FFFFFF99"
        flutter: "0x99FFFFFF"
        source: "direct"
      Dark:
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "SL Light":
        value: "#FFFFFF99"
        css: "#FFFFFF99"
        flutter: "0x99FFFFFF"
        source: "direct"
      "SL Dark":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "SL Orange Light":
        value: "#FFFFFF99"
        css: "#FFFFFF99"
        flutter: "0x99FFFFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
      "Mrj Light":
        value: "#FFFFFF99"
        css: "#FFFFFF99"
        flutter: "0x99FFFFFF"
        source: "direct"
      "Mrj Dark":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFF99"
  - token_id: "color_color_rd_scroll_track_color"
    semantic_name: "color / rd/scroll-track-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdScrollTrackColor"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "3757a152f6ac16fa1bf2a476264f9ab5b3be9870"
      name: "color / rd/scroll-track-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      Dark:
        value: "#333333"
        css: "#333333"
        flutter: "0xFF333333"
        source: "direct"
      "SL Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "SL Dark":
        value: "#333333"
        css: "#333333"
        flutter: "0xFF333333"
        source: "direct"
      "SL Orange Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "SL Orange Dark":
        value: "#333333"
        css: "#333333"
        flutter: "0xFF333333"
        source: "direct"
      "Mrj Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "direct"
      "Mrj Dark":
        value: "#333333"
        css: "#333333"
        flutter: "0xFF333333"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFF"
  - token_id: "color_color_rd_scrollbar_color"
    semantic_name: "color / rd/scrollbar-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdScrollbarColor"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "8f224eb74748edb30e4fc4be33013aa65b26ed66"
      name: "color / rd/scrollbar-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#0000001A"
        css: "#0000001A"
        flutter: "0x1A000000"
        source: "direct"
      Dark:
        value: "#FFFFFF1A"
        css: "#FFFFFF1A"
        flutter: "0x1AFFFFFF"
        source: "direct"
      "SL Light":
        value: "#0000001A"
        css: "#0000001A"
        flutter: "0x1A000000"
        source: "direct"
      "SL Dark":
        value: "#FFFFFF1A"
        css: "#FFFFFF1A"
        flutter: "0x1AFFFFFF"
        source: "direct"
      "SL Orange Light":
        value: "#0000001A"
        css: "#0000001A"
        flutter: "0x1A000000"
        source: "direct"
      "SL Orange Dark":
        value: "#FFFFFF1A"
        css: "#FFFFFF1A"
        flutter: "0x1AFFFFFF"
        source: "direct"
      "Mrj Light":
        value: "#0000001A"
        css: "#0000001A"
        flutter: "0x1A000000"
        source: "direct"
      "Mrj Dark":
        value: "#FFFFFF1A"
        css: "#FFFFFF1A"
        flutter: "0x1AFFFFFF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#0000001A"
  - token_id: "color_color_rd_scrollbar_hover_color"
    semantic_name: "color / rd/scrollbar-hover-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdScrollbarHoverColor"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "9bd3b5c0748f5f1caf19e17d1cdf6fd956c1de42"
      name: "color / rd/scrollbar-hover-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#0000004D"
        css: "#0000004D"
        flutter: "0x4D000000"
        source: "direct"
      Dark:
        value: "#FFFFFF4D"
        css: "#FFFFFF4D"
        flutter: "0x4DFFFFFF"
        source: "direct"
      "SL Light":
        value: "#0000004D"
        css: "#0000004D"
        flutter: "0x4D000000"
        source: "direct"
      "SL Dark":
        value: "#FFFFFF4D"
        css: "#FFFFFF4D"
        flutter: "0x4DFFFFFF"
        source: "direct"
      "SL Orange Light":
        value: "#0000004D"
        css: "#0000004D"
        flutter: "0x4D000000"
        source: "direct"
      "SL Orange Dark":
        value: "#FFFFFF4D"
        css: "#FFFFFF4D"
        flutter: "0x4DFFFFFF"
        source: "direct"
      "Mrj Light":
        value: "#0000004D"
        css: "#0000004D"
        flutter: "0x4D000000"
        source: "direct"
      "Mrj Dark":
        value: "#FFFFFF4D"
        css: "#FFFFFF4D"
        flutter: "0x4DFFFFFF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#0000004D"
  - token_id: "color_color_rd_success_color"
    semantic_name: "color / rd/success-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColor"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "dc9163b81785ac2bd766d42685c0ed5e2eec03e9"
      name: "color / rd/success-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "rd/success-color/5"
      Dark:
        value: "#008A3A"
        css: "#008A3A"
        flutter: "0xFF008A3A"
        source: "rd/success-color/5"
      "SL Light":
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "rd/success-color/5"
      "SL Dark":
        value: "#008A3A"
        css: "#008A3A"
        flutter: "0xFF008A3A"
        source: "rd/success-color/5"
      "SL Orange Light":
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "rd/success-color/5"
      "SL Orange Dark":
        value: "#008A3A"
        css: "#008A3A"
        flutter: "0xFF008A3A"
        source: "rd/success-color/5"
      "Mrj Light":
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "rd/success-color/5"
      "Mrj Dark":
        value: "#008A3A"
        css: "#008A3A"
        flutter: "0xFF008A3A"
        source: "rd/success-color/5"
    notes:
      []
    fallback:
      allowed: false
      value: "#2BA471"
  - token_id: "color_color_rd_success_color_1"
    semantic_name: "color / rd/success-color/1"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColor1"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f46f7555c8f89fab8df8dd1a66150347568e5866"
      name: "color / rd/success-color/1"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "direct"
      Dark:
        value: "#001A08"
        css: "#001A08"
        flutter: "0xFF001A08"
        source: "direct"
      "SL Light":
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "direct"
      "SL Dark":
        value: "#001A08"
        css: "#001A08"
        flutter: "0xFF001A08"
        source: "direct"
      "SL Orange Light":
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "direct"
      "SL Orange Dark":
        value: "#001A08"
        css: "#001A08"
        flutter: "0xFF001A08"
        source: "direct"
      "Mrj Light":
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "direct"
      "Mrj Dark":
        value: "#001A08"
        css: "#001A08"
        flutter: "0xFF001A08"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#E3F9E9"
  - token_id: "color_color_rd_success_color_10"
    semantic_name: "color / rd/success-color/10"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColor10"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "3be81cf4c45fe6d8f06971a2e825e1c34a41ec4e"
      name: "color / rd/success-color/10"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#002515"
        css: "#002515"
        flutter: "0xFF002515"
        source: "direct"
      Dark:
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "direct"
      "SL Light":
        value: "#002515"
        css: "#002515"
        flutter: "0xFF002515"
        source: "direct"
      "SL Dark":
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "direct"
      "SL Orange Light":
        value: "#002515"
        css: "#002515"
        flutter: "0xFF002515"
        source: "direct"
      "SL Orange Dark":
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "direct"
      "Mrj Light":
        value: "#002515"
        css: "#002515"
        flutter: "0xFF002515"
        source: "direct"
      "Mrj Dark":
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#002515"
  - token_id: "color_color_rd_success_color_2"
    semantic_name: "color / rd/success-color/2"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColor2"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "e4f34180c654c46a388a944eb411c47792ef30a4"
      name: "color / rd/success-color/2"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "direct"
      Dark:
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "direct"
      "SL Light":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "direct"
      "SL Dark":
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "direct"
      "SL Orange Light":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "direct"
      "SL Orange Dark":
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "direct"
      "Mrj Light":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "direct"
      "Mrj Dark":
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#C6F3D7"
  - token_id: "color_color_rd_success_color_3"
    semantic_name: "color / rd/success-color/3"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColor3"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f4b8cd28eb706ca6adbb207feebf60c057538143"
      name: "color / rd/success-color/3"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "direct"
      Dark:
        value: "#004D1E"
        css: "#004D1E"
        flutter: "0xFF004D1E"
        source: "direct"
      "SL Light":
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "direct"
      "SL Dark":
        value: "#004D1E"
        css: "#004D1E"
        flutter: "0xFF004D1E"
        source: "direct"
      "SL Orange Light":
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "direct"
      "SL Orange Dark":
        value: "#004D1E"
        css: "#004D1E"
        flutter: "0xFF004D1E"
        source: "direct"
      "Mrj Light":
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "direct"
      "Mrj Dark":
        value: "#004D1E"
        css: "#004D1E"
        flutter: "0xFF004D1E"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#92DAB2"
  - token_id: "color_color_rd_success_color_4"
    semantic_name: "color / rd/success-color/4"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColor4"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "6cc34a4fcdded52c64190078d88ec600dd59363b"
      name: "color / rd/success-color/4"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#56C08D"
        css: "#56C08D"
        flutter: "0xFF56C08D"
        source: "direct"
      Dark:
        value: "#006B2A"
        css: "#006B2A"
        flutter: "0xFF006B2A"
        source: "direct"
      "SL Light":
        value: "#56C08D"
        css: "#56C08D"
        flutter: "0xFF56C08D"
        source: "direct"
      "SL Dark":
        value: "#006B2A"
        css: "#006B2A"
        flutter: "0xFF006B2A"
        source: "direct"
      "SL Orange Light":
        value: "#56C08D"
        css: "#56C08D"
        flutter: "0xFF56C08D"
        source: "direct"
      "SL Orange Dark":
        value: "#006B2A"
        css: "#006B2A"
        flutter: "0xFF006B2A"
        source: "direct"
      "Mrj Light":
        value: "#56C08D"
        css: "#56C08D"
        flutter: "0xFF56C08D"
        source: "direct"
      "Mrj Dark":
        value: "#006B2A"
        css: "#006B2A"
        flutter: "0xFF006B2A"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#56C08D"
  - token_id: "color_color_rd_success_color_5"
    semantic_name: "color / rd/success-color/5"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColor5"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "b091705543159294e7b5488b15f435a2fc831e00"
      name: "color / rd/success-color/5"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "direct"
      Dark:
        value: "#008A3A"
        css: "#008A3A"
        flutter: "0xFF008A3A"
        source: "direct"
      "SL Light":
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "direct"
      "SL Dark":
        value: "#008A3A"
        css: "#008A3A"
        flutter: "0xFF008A3A"
        source: "direct"
      "SL Orange Light":
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "direct"
      "SL Orange Dark":
        value: "#008A3A"
        css: "#008A3A"
        flutter: "0xFF008A3A"
        source: "direct"
      "Mrj Light":
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "direct"
      "Mrj Dark":
        value: "#008A3A"
        css: "#008A3A"
        flutter: "0xFF008A3A"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#2BA471"
  - token_id: "color_color_rd_success_color_6"
    semantic_name: "color / rd/success-color/6"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColor6"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "7f0d8bd5af5038afed63a3bf9a1e5bb086b37768"
      name: "color / rd/success-color/6"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#008858"
        css: "#008858"
        flutter: "0xFF008858"
        source: "direct"
      Dark:
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "direct"
      "SL Light":
        value: "#008858"
        css: "#008858"
        flutter: "0xFF008858"
        source: "direct"
      "SL Dark":
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "direct"
      "SL Orange Light":
        value: "#008858"
        css: "#008858"
        flutter: "0xFF008858"
        source: "direct"
      "SL Orange Dark":
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "direct"
      "Mrj Light":
        value: "#008858"
        css: "#008858"
        flutter: "0xFF008858"
        source: "direct"
      "Mrj Dark":
        value: "#2BA471"
        css: "#2BA471"
        flutter: "0xFF2BA471"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#008858"
  - token_id: "color_color_rd_success_color_7"
    semantic_name: "color / rd/success-color/7"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColor7"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c8f4241e4c79efe688f776c40775930ce105fa25"
      name: "color / rd/success-color/7"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#006C45"
        css: "#006C45"
        flutter: "0xFF006C45"
        source: "direct"
      Dark:
        value: "#56C08D"
        css: "#56C08D"
        flutter: "0xFF56C08D"
        source: "direct"
      "SL Light":
        value: "#006C45"
        css: "#006C45"
        flutter: "0xFF006C45"
        source: "direct"
      "SL Dark":
        value: "#56C08D"
        css: "#56C08D"
        flutter: "0xFF56C08D"
        source: "direct"
      "SL Orange Light":
        value: "#006C45"
        css: "#006C45"
        flutter: "0xFF006C45"
        source: "direct"
      "SL Orange Dark":
        value: "#56C08D"
        css: "#56C08D"
        flutter: "0xFF56C08D"
        source: "direct"
      "Mrj Light":
        value: "#006C45"
        css: "#006C45"
        flutter: "0xFF006C45"
        source: "direct"
      "Mrj Dark":
        value: "#56C08D"
        css: "#56C08D"
        flutter: "0xFF56C08D"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#006C45"
  - token_id: "color_color_rd_success_color_8"
    semantic_name: "color / rd/success-color/8"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColor8"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "fe4de7800dc81afb5ea81cc72f7d16f26bf4344d"
      name: "color / rd/success-color/8"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#005334"
        css: "#005334"
        flutter: "0xFF005334"
        source: "direct"
      Dark:
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "direct"
      "SL Light":
        value: "#005334"
        css: "#005334"
        flutter: "0xFF005334"
        source: "direct"
      "SL Dark":
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "direct"
      "SL Orange Light":
        value: "#005334"
        css: "#005334"
        flutter: "0xFF005334"
        source: "direct"
      "SL Orange Dark":
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "direct"
      "Mrj Light":
        value: "#005334"
        css: "#005334"
        flutter: "0xFF005334"
        source: "direct"
      "Mrj Dark":
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#005334"
  - token_id: "color_color_rd_success_color_9"
    semantic_name: "color / rd/success-color/9"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColor9"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "407239a5cd907f8b3ef5ca6868d5ee13abb868da"
      name: "color / rd/success-color/9"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#003B23"
        css: "#003B23"
        flutter: "0xFF003B23"
        source: "direct"
      Dark:
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "direct"
      "SL Light":
        value: "#003B23"
        css: "#003B23"
        flutter: "0xFF003B23"
        source: "direct"
      "SL Dark":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "direct"
      "SL Orange Light":
        value: "#003B23"
        css: "#003B23"
        flutter: "0xFF003B23"
        source: "direct"
      "SL Orange Dark":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "direct"
      "Mrj Light":
        value: "#003B23"
        css: "#003B23"
        flutter: "0xFF003B23"
        source: "direct"
      "Mrj Dark":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#003B23"
  - token_id: "color_color_rd_success_color_active"
    semantic_name: "color / rd/success-color/active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColorActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "20e0a2855740012aa9f59e856a9711cb6f24e817"
      name: "color / rd/success-color/active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#008858"
        css: "#008858"
        flutter: "0xFF008858"
        source: "rd/success-color/6"
      Dark:
        value: "#006B2A"
        css: "#006B2A"
        flutter: "0xFF006B2A"
        source: "rd/success-color/4"
      "SL Light":
        value: "#008858"
        css: "#008858"
        flutter: "0xFF008858"
        source: "rd/success-color/6"
      "SL Dark":
        value: "#006B2A"
        css: "#006B2A"
        flutter: "0xFF006B2A"
        source: "rd/success-color/4"
      "SL Orange Light":
        value: "#008858"
        css: "#008858"
        flutter: "0xFF008858"
        source: "rd/success-color/6"
      "SL Orange Dark":
        value: "#006B2A"
        css: "#006B2A"
        flutter: "0xFF006B2A"
        source: "rd/success-color/4"
      "Mrj Light":
        value: "#008858"
        css: "#008858"
        flutter: "0xFF008858"
        source: "rd/success-color/6"
      "Mrj Dark":
        value: "#006B2A"
        css: "#006B2A"
        flutter: "0xFF006B2A"
        source: "rd/success-color/4"
    notes:
      []
    fallback:
      allowed: false
      value: "#008858"
  - token_id: "color_color_rd_success_color_disabled"
    semantic_name: "color / rd/success-color/disabled"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColorDisabled"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f16ca94608ae811f803fe245fe64ad1cd8f7fa0c"
      name: "color / rd/success-color/disabled"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "rd/success-color/3"
      Dark:
        value: "#004D1E"
        css: "#004D1E"
        flutter: "0xFF004D1E"
        source: "rd/success-color/3"
      "SL Light":
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "rd/success-color/3"
      "SL Dark":
        value: "#004D1E"
        css: "#004D1E"
        flutter: "0xFF004D1E"
        source: "rd/success-color/3"
      "SL Orange Light":
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "rd/success-color/3"
      "SL Orange Dark":
        value: "#004D1E"
        css: "#004D1E"
        flutter: "0xFF004D1E"
        source: "rd/success-color/3"
      "Mrj Light":
        value: "#92DAB2"
        css: "#92DAB2"
        flutter: "0xFF92DAB2"
        source: "rd/success-color/3"
      "Mrj Dark":
        value: "#004D1E"
        css: "#004D1E"
        flutter: "0xFF004D1E"
        source: "rd/success-color/3"
    notes:
      []
    fallback:
      allowed: false
      value: "#92DAB2"
  - token_id: "color_color_rd_success_color_focus"
    semantic_name: "color / rd/success-color/focus"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColorFocus"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "50d8c3ad297cf8afd08fb6e22018e2876f2062aa"
      name: "color / rd/success-color/focus"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "rd/success-color/2"
      Dark:
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "rd/success-color/2"
      "SL Light":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "rd/success-color/2"
      "SL Dark":
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "rd/success-color/2"
      "SL Orange Light":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "rd/success-color/2"
      "SL Orange Dark":
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "rd/success-color/2"
      "Mrj Light":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "rd/success-color/2"
      "Mrj Dark":
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "rd/success-color/2"
    notes:
      []
    fallback:
      allowed: false
      value: "#C6F3D7"
  - token_id: "color_color_rd_success_color_light"
    semantic_name: "color / rd/success-color/light"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColorLight"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "fc2265c5640dad44ed5d66e0192a415e79df7a98"
      name: "color / rd/success-color/light"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "rd/success-color/1"
      Dark:
        value: "#001A08"
        css: "#001A08"
        flutter: "0xFF001A08"
        source: "rd/success-color/1"
      "SL Light":
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "rd/success-color/1"
      "SL Dark":
        value: "#001A08"
        css: "#001A08"
        flutter: "0xFF001A08"
        source: "rd/success-color/1"
      "SL Orange Light":
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "rd/success-color/1"
      "SL Orange Dark":
        value: "#001A08"
        css: "#001A08"
        flutter: "0xFF001A08"
        source: "rd/success-color/1"
      "Mrj Light":
        value: "#E3F9E9"
        css: "#E3F9E9"
        flutter: "0xFFE3F9E9"
        source: "rd/success-color/1"
      "Mrj Dark":
        value: "#001A08"
        css: "#001A08"
        flutter: "0xFF001A08"
        source: "rd/success-color/1"
    notes:
      []
    fallback:
      allowed: false
      value: "#E3F9E9"
  - token_id: "color_color_rd_success_color_light_active"
    semantic_name: "color / rd/success-color/light-active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdSuccessColorLightActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "79f82b4e4014c1314c037284f67eef4a58295426"
      name: "color / rd/success-color/light-active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "rd/success-color/2"
      Dark:
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "rd/success-color/2"
      "SL Light":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "rd/success-color/2"
      "SL Dark":
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "rd/success-color/2"
      "SL Orange Light":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "rd/success-color/2"
      "SL Orange Dark":
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "rd/success-color/2"
      "Mrj Light":
        value: "#C6F3D7"
        css: "#C6F3D7"
        flutter: "0xFFC6F3D7"
        source: "rd/success-color/2"
      "Mrj Dark":
        value: "#003314"
        css: "#003314"
        flutter: "0xFF003314"
        source: "rd/success-color/2"
    notes:
      []
    fallback:
      allowed: false
      value: "#C6F3D7"
  - token_id: "color_color_rd_table_shadow_color"
    semantic_name: "color / rd/table-shadow-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdTableShadowColor"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c70529c5e3b6cbbcd0d09f29c8e3d616accff522"
      name: "color / rd/table-shadow-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#00000014"
        css: "#00000014"
        flutter: "0x14000000"
        source: "direct"
      Dark:
        value: "#0000008C"
        css: "#0000008C"
        flutter: "0x8C000000"
        source: "direct"
      "SL Light":
        value: "#00000014"
        css: "#00000014"
        flutter: "0x14000000"
        source: "direct"
      "SL Dark":
        value: "#0000008C"
        css: "#0000008C"
        flutter: "0x8C000000"
        source: "direct"
      "SL Orange Light":
        value: "#00000014"
        css: "#00000014"
        flutter: "0x14000000"
        source: "direct"
      "SL Orange Dark":
        value: "#0000008C"
        css: "#0000008C"
        flutter: "0x8C000000"
        source: "direct"
      "Mrj Light":
        value: "#00000014"
        css: "#00000014"
        flutter: "0x14000000"
        source: "direct"
      "Mrj Dark":
        value: "#0000008C"
        css: "#0000008C"
        flutter: "0x8C000000"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#00000014"
  - token_id: "color_color_rd_text_color_anti"
    semantic_name: "color / rd/text-color/anti"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdTextColorAnti"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "13c5960188f84a894ab7346d635712687b289b98"
      name: "color / rd/text-color/anti"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "rd/font-white/1"
      Dark:
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "rd/font-white/1"
      "SL Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "rd/font-white/1"
      "SL Dark":
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "rd/font-white/1"
      "SL Orange Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "rd/font-white/1"
      "SL Orange Dark":
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "rd/font-white/1"
      "Mrj Light":
        value: "#FFFFFF"
        css: "#FFFFFF"
        flutter: "0xFFFFFFFF"
        source: "rd/font-white/1"
      "Mrj Dark":
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "rd/font-white/1"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFFFFF"
  - token_id: "color_color_rd_text_color_brand"
    semantic_name: "color / rd/text-color/brand"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdTextColorBrand"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "ad6b2cfdaf70c470b7b5f708059902b131138636"
      name: "color / rd/text-color/brand"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#4E39F2"
        css: "#4E39F2"
        flutter: "0xFF4E39F2"
        source: "rd/brand-color -> rd/brand-color/6"
      Dark:
        value: "#8882F7"
        css: "#8882F7"
        flutter: "0xFF8882F7"
        source: "rd/brand-color/7"
      "SL Light":
        value: "#0BC7B9"
        css: "#0BC7B9"
        flutter: "0xFF0BC7B9"
        source: "rd/brand-color -> rd/brand-color/6"
      "SL Dark":
        value: "#55E0D2"
        css: "#55E0D2"
        flutter: "0xFF55E0D2"
        source: "rd/brand-color/7"
      "SL Orange Light":
        value: "#E0A558"
        css: "#E0A558"
        flutter: "0xFFE0A558"
        source: "rd/brand-color -> rd/brand-color/6"
      "SL Orange Dark":
        value: "#ECCA8E"
        css: "#ECCA8E"
        flutter: "0xFFECCA8E"
        source: "rd/brand-color/7"
      "Mrj Light":
        value: "#8F73FB"
        css: "#8F73FB"
        flutter: "0xFF8F73FB"
        source: "rd/brand-color -> rd/brand-color/6"
      "Mrj Dark":
        value: "#C0ADFF"
        css: "#C0ADFF"
        flutter: "0xFFC0ADFF"
        source: "rd/brand-color/7"
    notes:
      []
    fallback:
      allowed: false
      value: "#4E39F2"
  - token_id: "color_color_rd_text_color_disabled"
    semantic_name: "color / rd/text-color/disabled"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdTextColorDisabled"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c1e96c9f76464e8616b84ca67d391d90cd8a69c8"
      name: "color / rd/text-color/disabled"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "rd/font-gray/4"
      Dark:
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "rd/font-white/4"
      "SL Light":
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "rd/font-gray/4"
      "SL Dark":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "rd/font-white/4"
      "SL Orange Light":
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "rd/font-gray/4"
      "SL Orange Dark":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "rd/font-white/4"
      "Mrj Light":
        value: "#00000042"
        css: "#00000042"
        flutter: "0x42000000"
        source: "rd/font-gray/4"
      "Mrj Dark":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "rd/font-white/4"
    notes:
      []
    fallback:
      allowed: false
      value: "#00000042"
  - token_id: "color_color_rd_text_color_inverted"
    semantic_name: "color / rd/text-color/inverted"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdTextColorInverted"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "b69016555345a0fae8d17204c73cca2561361192"
      name: "color / rd/text-color/inverted"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#AEBBFF"
        css: "#AEBBFF"
        flutter: "0xFFAEBBFF"
        source: "rd/brand-color/4"
      Dark:
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "rd/font-white/4"
      "SL Light":
        value: "#55E0D2"
        css: "#55E0D2"
        flutter: "0xFF55E0D2"
        source: "rd/brand-color/4"
      "SL Dark":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "rd/font-white/4"
      "SL Orange Light":
        value: "#ECCA8E"
        css: "#ECCA8E"
        flutter: "0xFFECCA8E"
        source: "rd/brand-color/4"
      "SL Orange Dark":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "rd/font-white/4"
      "Mrj Light":
        value: "#C0ADFF"
        css: "#C0ADFF"
        flutter: "0xFFC0ADFF"
        source: "rd/brand-color/4"
      "Mrj Dark":
        value: "#FFFFFF38"
        css: "#FFFFFF38"
        flutter: "0x38FFFFFF"
        source: "rd/font-white/4"
    notes:
      []
    fallback:
      allowed: false
      value: "#AEBBFF"
  - token_id: "color_color_rd_text_color_link"
    semantic_name: "color / rd/text-color/link"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdTextColorLink"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f20fc0011943a2a46c8a1d714ce2964ee549e5e2"
      name: "color / rd/text-color/link"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#4E39F2"
        css: "#4E39F2"
        flutter: "0xFF4E39F2"
        source: "rd/brand-color -> rd/brand-color/6"
      Dark:
        value: "#8882F7"
        css: "#8882F7"
        flutter: "0xFF8882F7"
        source: "rd/brand-color/7"
      "SL Light":
        value: "#0BC7B9"
        css: "#0BC7B9"
        flutter: "0xFF0BC7B9"
        source: "rd/brand-color -> rd/brand-color/6"
      "SL Dark":
        value: "#55E0D2"
        css: "#55E0D2"
        flutter: "0xFF55E0D2"
        source: "rd/brand-color/7"
      "SL Orange Light":
        value: "#E0A558"
        css: "#E0A558"
        flutter: "0xFFE0A558"
        source: "rd/brand-color -> rd/brand-color/6"
      "SL Orange Dark":
        value: "#ECCA8E"
        css: "#ECCA8E"
        flutter: "0xFFECCA8E"
        source: "rd/brand-color/7"
      "Mrj Light":
        value: "#8F73FB"
        css: "#8F73FB"
        flutter: "0xFF8F73FB"
        source: "rd/brand-color -> rd/brand-color/6"
      "Mrj Dark":
        value: "#C0ADFF"
        css: "#C0ADFF"
        flutter: "0xFFC0ADFF"
        source: "rd/brand-color/7"
    notes:
      []
    fallback:
      allowed: false
      value: "#4E39F2"
  - token_id: "color_color_rd_text_color_placeholder"
    semantic_name: "color / rd/text-color/placeholder"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdTextColorPlaceholder"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "4cc60ece78514b33106f0ee2e237d0bb8aaf8064"
      name: "color / rd/text-color/placeholder"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "rd/font-gray/3"
      Dark:
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "rd/font-white/3"
      "SL Light":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "rd/font-gray/3"
      "SL Dark":
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "rd/font-white/3"
      "SL Orange Light":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "rd/font-gray/3"
      "SL Orange Dark":
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "rd/font-white/3"
      "Mrj Light":
        value: "#00000066"
        css: "#00000066"
        flutter: "0x66000000"
        source: "rd/font-gray/3"
      "Mrj Dark":
        value: "#FFFFFF59"
        css: "#FFFFFF59"
        flutter: "0x59FFFFFF"
        source: "rd/font-white/3"
    notes:
      []
    fallback:
      allowed: false
      value: "#00000066"
  - token_id: "color_color_rd_text_color_primary"
    semantic_name: "color / rd/text-color/primary"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdTextColorPrimary"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "5218117d5c5cfd6f92942c5a049f377391309a7e"
      name: "color / rd/text-color/primary"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "rd/font-gray/1"
      Dark:
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "rd/font-white/1"
      "SL Light":
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "rd/font-gray/1"
      "SL Dark":
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "rd/font-white/1"
      "SL Orange Light":
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "rd/font-gray/1"
      "SL Orange Dark":
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "rd/font-white/1"
      "Mrj Light":
        value: "#000000E5"
        css: "#000000E5"
        flutter: "0xE5000000"
        source: "rd/font-gray/1"
      "Mrj Dark":
        value: "#FFFFFFE5"
        css: "#FFFFFFE5"
        flutter: "0xE5FFFFFF"
        source: "rd/font-white/1"
    notes:
      []
    fallback:
      allowed: false
      value: "#000000E5"
  - token_id: "color_color_rd_text_color_secondary"
    semantic_name: "color / rd/text-color/secondary"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdTextColorSecondary"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "e4a65948753c2e8b4cf3ca4e78a810d8ff200dff"
      name: "color / rd/text-color/secondary"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "rd/font-gray/2"
      Dark:
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "rd/font-white/2"
      "SL Light":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "rd/font-gray/2"
      "SL Dark":
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "rd/font-white/2"
      "SL Orange Light":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "rd/font-gray/2"
      "SL Orange Dark":
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "rd/font-white/2"
      "Mrj Light":
        value: "#00000099"
        css: "#00000099"
        flutter: "0x99000000"
        source: "rd/font-gray/2"
      "Mrj Dark":
        value: "#FFFFFF8C"
        css: "#FFFFFF8C"
        flutter: "0x8CFFFFFF"
        source: "rd/font-white/2"
    notes:
      []
    fallback:
      allowed: false
      value: "#00000099"
  - token_id: "color_color_rd_text_color_watermark"
    semantic_name: "color / rd/text-color/watermark"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdTextColorWatermark"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "633d238af1cfabe21f6a4b9fcf2e2b6947558aae"
      name: "color / rd/text-color/watermark"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#0000001A"
        css: "#0000001A"
        flutter: "0x1A000000"
        source: "direct"
      Dark:
        value: "#FFFFFF1A"
        css: "#FFFFFF1A"
        flutter: "0x1AFFFFFF"
        source: "direct"
      "SL Light":
        value: "#0000001A"
        css: "#0000001A"
        flutter: "0x1A000000"
        source: "direct"
      "SL Dark":
        value: "#FFFFFF1A"
        css: "#FFFFFF1A"
        flutter: "0x1AFFFFFF"
        source: "direct"
      "SL Orange Light":
        value: "#0000001A"
        css: "#0000001A"
        flutter: "0x1A000000"
        source: "direct"
      "SL Orange Dark":
        value: "#FFFFFF1A"
        css: "#FFFFFF1A"
        flutter: "0x1AFFFFFF"
        source: "direct"
      "Mrj Light":
        value: "#0000001A"
        css: "#0000001A"
        flutter: "0x1A000000"
        source: "direct"
      "Mrj Dark":
        value: "#FFFFFF1A"
        css: "#FFFFFF1A"
        flutter: "0x1AFFFFFF"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#0000001A"
  - token_id: "color_color_rd_warning_color"
    semantic_name: "color / rd/warning-color"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColor"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "45b120e7f4d0383e68407bc38faaaa5cd14ad07f"
      name: "color / rd/warning-color"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "rd/warning-color/5"
      Dark:
        value: "#C25800"
        css: "#C25800"
        flutter: "0xFFC25800"
        source: "rd/warning-color/5"
      "SL Light":
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "rd/warning-color/5"
      "SL Dark":
        value: "#C25800"
        css: "#C25800"
        flutter: "0xFFC25800"
        source: "rd/warning-color/5"
      "SL Orange Light":
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "rd/warning-color/5"
      "SL Orange Dark":
        value: "#C25800"
        css: "#C25800"
        flutter: "0xFFC25800"
        source: "rd/warning-color/5"
      "Mrj Light":
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "rd/warning-color/5"
      "Mrj Dark":
        value: "#C25800"
        css: "#C25800"
        flutter: "0xFFC25800"
        source: "rd/warning-color/5"
    notes:
      []
    fallback:
      allowed: false
      value: "#E37318"
  - token_id: "color_color_rd_warning_color_1"
    semantic_name: "color / rd/warning-color/1"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColor1"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "10c846ca2e364dbff9e93607dcf8914fec6a6f3d"
      name: "color / rd/warning-color/1"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "direct"
      Dark:
        value: "#1A0800"
        css: "#1A0800"
        flutter: "0xFF1A0800"
        source: "direct"
      "SL Light":
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "direct"
      "SL Dark":
        value: "#1A0800"
        css: "#1A0800"
        flutter: "0xFF1A0800"
        source: "direct"
      "SL Orange Light":
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "direct"
      "SL Orange Dark":
        value: "#1A0800"
        css: "#1A0800"
        flutter: "0xFF1A0800"
        source: "direct"
      "Mrj Light":
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "direct"
      "Mrj Dark":
        value: "#1A0800"
        css: "#1A0800"
        flutter: "0xFF1A0800"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFF1E9"
  - token_id: "color_color_rd_warning_color_10"
    semantic_name: "color / rd/warning-color/10"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColor10"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "b6ab7d79245f23669e131313035cd7a277575f06"
      name: "color / rd/warning-color/10"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#3B1700"
        css: "#3B1700"
        flutter: "0xFF3B1700"
        source: "direct"
      Dark:
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "direct"
      "SL Light":
        value: "#3B1700"
        css: "#3B1700"
        flutter: "0xFF3B1700"
        source: "direct"
      "SL Dark":
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "direct"
      "SL Orange Light":
        value: "#3B1700"
        css: "#3B1700"
        flutter: "0xFF3B1700"
        source: "direct"
      "SL Orange Dark":
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "direct"
      "Mrj Light":
        value: "#3B1700"
        css: "#3B1700"
        flutter: "0xFF3B1700"
        source: "direct"
      "Mrj Dark":
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#3B1700"
  - token_id: "color_color_rd_warning_color_2"
    semantic_name: "color / rd/warning-color/2"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColor2"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "05e037add3d3f0894fa73f3a463e5bf9c1e750ae"
      name: "color / rd/warning-color/2"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "direct"
      Dark:
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "direct"
      "SL Light":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "direct"
      "SL Dark":
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "direct"
      "SL Orange Light":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "direct"
      "SL Orange Dark":
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "direct"
      "Mrj Light":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "direct"
      "Mrj Dark":
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFD9C2"
  - token_id: "color_color_rd_warning_color_3"
    semantic_name: "color / rd/warning-color/3"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColor3"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "2345f7257729fd63a56d9b572bdf81d53d115c55"
      name: "color / rd/warning-color/3"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "direct"
      Dark:
        value: "#5C2200"
        css: "#5C2200"
        flutter: "0xFF5C2200"
        source: "direct"
      "SL Light":
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "direct"
      "SL Dark":
        value: "#5C2200"
        css: "#5C2200"
        flutter: "0xFF5C2200"
        source: "direct"
      "SL Orange Light":
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "direct"
      "SL Orange Dark":
        value: "#5C2200"
        css: "#5C2200"
        flutter: "0xFF5C2200"
        source: "direct"
      "Mrj Light":
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "direct"
      "Mrj Dark":
        value: "#5C2200"
        css: "#5C2200"
        flutter: "0xFF5C2200"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFB98C"
  - token_id: "color_color_rd_warning_color_4"
    semantic_name: "color / rd/warning-color/4"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColor4"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c28f2df8880f32e9d9f01c4fc0ae8b1bdf85eac2"
      name: "color / rd/warning-color/4"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FA9550"
        css: "#FA9550"
        flutter: "0xFFFA9550"
        source: "direct"
      Dark:
        value: "#8A3800"
        css: "#8A3800"
        flutter: "0xFF8A3800"
        source: "direct"
      "SL Light":
        value: "#FA9550"
        css: "#FA9550"
        flutter: "0xFFFA9550"
        source: "direct"
      "SL Dark":
        value: "#8A3800"
        css: "#8A3800"
        flutter: "0xFF8A3800"
        source: "direct"
      "SL Orange Light":
        value: "#FA9550"
        css: "#FA9550"
        flutter: "0xFFFA9550"
        source: "direct"
      "SL Orange Dark":
        value: "#8A3800"
        css: "#8A3800"
        flutter: "0xFF8A3800"
        source: "direct"
      "Mrj Light":
        value: "#FA9550"
        css: "#FA9550"
        flutter: "0xFFFA9550"
        source: "direct"
      "Mrj Dark":
        value: "#8A3800"
        css: "#8A3800"
        flutter: "0xFF8A3800"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#FA9550"
  - token_id: "color_color_rd_warning_color_5"
    semantic_name: "color / rd/warning-color/5"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColor5"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "6631c8cc9f061774aac1c98a79e518bb5d9a8e94"
      name: "color / rd/warning-color/5"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "direct"
      Dark:
        value: "#C25800"
        css: "#C25800"
        flutter: "0xFFC25800"
        source: "direct"
      "SL Light":
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "direct"
      "SL Dark":
        value: "#C25800"
        css: "#C25800"
        flutter: "0xFFC25800"
        source: "direct"
      "SL Orange Light":
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "direct"
      "SL Orange Dark":
        value: "#C25800"
        css: "#C25800"
        flutter: "0xFFC25800"
        source: "direct"
      "Mrj Light":
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "direct"
      "Mrj Dark":
        value: "#C25800"
        css: "#C25800"
        flutter: "0xFFC25800"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#E37318"
  - token_id: "color_color_rd_warning_color_6"
    semantic_name: "color / rd/warning-color/6"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColor6"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "3fa52b421472d9c97898fd32200209ad733dd422"
      name: "color / rd/warning-color/6"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#BE5A00"
        css: "#BE5A00"
        flutter: "0xFFBE5A00"
        source: "direct"
      Dark:
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "direct"
      "SL Light":
        value: "#BE5A00"
        css: "#BE5A00"
        flutter: "0xFFBE5A00"
        source: "direct"
      "SL Dark":
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "direct"
      "SL Orange Light":
        value: "#BE5A00"
        css: "#BE5A00"
        flutter: "0xFFBE5A00"
        source: "direct"
      "SL Orange Dark":
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "direct"
      "Mrj Light":
        value: "#BE5A00"
        css: "#BE5A00"
        flutter: "0xFFBE5A00"
        source: "direct"
      "Mrj Dark":
        value: "#E37318"
        css: "#E37318"
        flutter: "0xFFE37318"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#BE5A00"
  - token_id: "color_color_rd_warning_color_7"
    semantic_name: "color / rd/warning-color/7"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColor7"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "61868ec5a3518767aeafb8135dbbe7d987bf65ae"
      name: "color / rd/warning-color/7"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#954500"
        css: "#954500"
        flutter: "0xFF954500"
        source: "direct"
      Dark:
        value: "#FA9550"
        css: "#FA9550"
        flutter: "0xFFFA9550"
        source: "direct"
      "SL Light":
        value: "#954500"
        css: "#954500"
        flutter: "0xFF954500"
        source: "direct"
      "SL Dark":
        value: "#FA9550"
        css: "#FA9550"
        flutter: "0xFFFA9550"
        source: "direct"
      "SL Orange Light":
        value: "#954500"
        css: "#954500"
        flutter: "0xFF954500"
        source: "direct"
      "SL Orange Dark":
        value: "#FA9550"
        css: "#FA9550"
        flutter: "0xFFFA9550"
        source: "direct"
      "Mrj Light":
        value: "#954500"
        css: "#954500"
        flutter: "0xFF954500"
        source: "direct"
      "Mrj Dark":
        value: "#FA9550"
        css: "#FA9550"
        flutter: "0xFFFA9550"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#954500"
  - token_id: "color_color_rd_warning_color_8"
    semantic_name: "color / rd/warning-color/8"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColor8"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "8dcdbbf27bb42b236a7cd07325a8406af52f138c"
      name: "color / rd/warning-color/8"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#713300"
        css: "#713300"
        flutter: "0xFF713300"
        source: "direct"
      Dark:
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "direct"
      "SL Light":
        value: "#713300"
        css: "#713300"
        flutter: "0xFF713300"
        source: "direct"
      "SL Dark":
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "direct"
      "SL Orange Light":
        value: "#713300"
        css: "#713300"
        flutter: "0xFF713300"
        source: "direct"
      "SL Orange Dark":
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "direct"
      "Mrj Light":
        value: "#713300"
        css: "#713300"
        flutter: "0xFF713300"
        source: "direct"
      "Mrj Dark":
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#713300"
  - token_id: "color_color_rd_warning_color_9"
    semantic_name: "color / rd/warning-color/9"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColor9"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c6e5ec7f1233f94755d47f59814c74490b6367e5"
      name: "color / rd/warning-color/9"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#532300"
        css: "#532300"
        flutter: "0xFF532300"
        source: "direct"
      Dark:
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "direct"
      "SL Light":
        value: "#532300"
        css: "#532300"
        flutter: "0xFF532300"
        source: "direct"
      "SL Dark":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "direct"
      "SL Orange Light":
        value: "#532300"
        css: "#532300"
        flutter: "0xFF532300"
        source: "direct"
      "SL Orange Dark":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "direct"
      "Mrj Light":
        value: "#532300"
        css: "#532300"
        flutter: "0xFF532300"
        source: "direct"
      "Mrj Dark":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "#532300"
  - token_id: "color_color_rd_warning_color_active"
    semantic_name: "color / rd/warning-color/active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColorActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "206278cb00a84e3fa3068a62df64fbeea11bb3ef"
      name: "color / rd/warning-color/active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#BE5A00"
        css: "#BE5A00"
        flutter: "0xFFBE5A00"
        source: "rd/warning-color/6"
      Dark:
        value: "#8A3800"
        css: "#8A3800"
        flutter: "0xFF8A3800"
        source: "rd/warning-color/4"
      "SL Light":
        value: "#BE5A00"
        css: "#BE5A00"
        flutter: "0xFFBE5A00"
        source: "rd/warning-color/6"
      "SL Dark":
        value: "#8A3800"
        css: "#8A3800"
        flutter: "0xFF8A3800"
        source: "rd/warning-color/4"
      "SL Orange Light":
        value: "#BE5A00"
        css: "#BE5A00"
        flutter: "0xFFBE5A00"
        source: "rd/warning-color/6"
      "SL Orange Dark":
        value: "#8A3800"
        css: "#8A3800"
        flutter: "0xFF8A3800"
        source: "rd/warning-color/4"
      "Mrj Light":
        value: "#BE5A00"
        css: "#BE5A00"
        flutter: "0xFFBE5A00"
        source: "rd/warning-color/6"
      "Mrj Dark":
        value: "#8A3800"
        css: "#8A3800"
        flutter: "0xFF8A3800"
        source: "rd/warning-color/4"
    notes:
      []
    fallback:
      allowed: false
      value: "#BE5A00"
  - token_id: "color_color_rd_warning_color_disabled"
    semantic_name: "color / rd/warning-color/disabled"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColorDisabled"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "8b3efeca55e2dc6417792a2dbc892b887866ae62"
      name: "color / rd/warning-color/disabled"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "rd/warning-color/3"
      Dark:
        value: "#5C2200"
        css: "#5C2200"
        flutter: "0xFF5C2200"
        source: "rd/warning-color/3"
      "SL Light":
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "rd/warning-color/3"
      "SL Dark":
        value: "#5C2200"
        css: "#5C2200"
        flutter: "0xFF5C2200"
        source: "rd/warning-color/3"
      "SL Orange Light":
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "rd/warning-color/3"
      "SL Orange Dark":
        value: "#5C2200"
        css: "#5C2200"
        flutter: "0xFF5C2200"
        source: "rd/warning-color/3"
      "Mrj Light":
        value: "#FFB98C"
        css: "#FFB98C"
        flutter: "0xFFFFB98C"
        source: "rd/warning-color/3"
      "Mrj Dark":
        value: "#5C2200"
        css: "#5C2200"
        flutter: "0xFF5C2200"
        source: "rd/warning-color/3"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFB98C"
  - token_id: "color_color_rd_warning_color_focus"
    semantic_name: "color / rd/warning-color/focus"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColorFocus"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "e074fe6c6c8ea16ac85c1d7660dcf0b52a0b5c48"
      name: "color / rd/warning-color/focus"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "rd/warning-color/2"
      Dark:
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "rd/warning-color/2"
      "SL Light":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "rd/warning-color/2"
      "SL Dark":
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "rd/warning-color/2"
      "SL Orange Light":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "rd/warning-color/2"
      "SL Orange Dark":
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "rd/warning-color/2"
      "Mrj Light":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "rd/warning-color/2"
      "Mrj Dark":
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "rd/warning-color/2"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFD9C2"
  - token_id: "color_color_rd_warning_color_light"
    semantic_name: "color / rd/warning-color/light"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColorLight"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "b957ea34d224bc2ab5f3d7c0bcbce419bed25dd3"
      name: "color / rd/warning-color/light"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "rd/warning-color/1"
      Dark:
        value: "#1A0800"
        css: "#1A0800"
        flutter: "0xFF1A0800"
        source: "rd/warning-color/1"
      "SL Light":
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "rd/warning-color/1"
      "SL Dark":
        value: "#1A0800"
        css: "#1A0800"
        flutter: "0xFF1A0800"
        source: "rd/warning-color/1"
      "SL Orange Light":
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "rd/warning-color/1"
      "SL Orange Dark":
        value: "#1A0800"
        css: "#1A0800"
        flutter: "0xFF1A0800"
        source: "rd/warning-color/1"
      "Mrj Light":
        value: "#FFF1E9"
        css: "#FFF1E9"
        flutter: "0xFFFFF1E9"
        source: "rd/warning-color/1"
      "Mrj Dark":
        value: "#1A0800"
        css: "#1A0800"
        flutter: "0xFF1A0800"
        source: "rd/warning-color/1"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFF1E9"
  - token_id: "color_color_rd_warning_color_light_active"
    semantic_name: "color / rd/warning-color/light-active"
    category: "color"
    runtime_source:
      kind: generated_design_token
      name: "rdColorRdWarningColorLightActive"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f675c2ce5f064e4c662e0da1e413be6837271fd4"
      name: "color / rd/warning-color/light-active"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      Light:
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "rd/warning-color/2"
      Dark:
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "rd/warning-color/2"
      "SL Light":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "rd/warning-color/2"
      "SL Dark":
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "rd/warning-color/2"
      "SL Orange Light":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "rd/warning-color/2"
      "SL Orange Dark":
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "rd/warning-color/2"
      "Mrj Light":
        value: "#FFD9C2"
        css: "#FFD9C2"
        flutter: "0xFFFFD9C2"
        source: "rd/warning-color/2"
      "Mrj Dark":
        value: "#3D1500"
        css: "#3D1500"
        flutter: "0xFF3D1500"
        source: "rd/warning-color/2"
    notes:
      []
    fallback:
      allowed: false
      value: "#FFD9C2"
  - token_id: "radius_radius_rd_radius_default"
    semantic_name: "radius / rd/radius/default"
    category: "radius"
    runtime_source:
      kind: generated_design_token
      name: "rdRadiusRdRadiusDefault"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "a41dc573040f0ee079055e8e79142cdf3feef841"
      name: "radius / rd/radius/default"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      radius:
        value: "6px"
        css: "6px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "6px"
  - token_id: "radius_radius_rd_radius_extralarge"
    semantic_name: "radius / rd/radius/extraLarge"
    category: "radius"
    runtime_source:
      kind: generated_design_token
      name: "rdRadiusRdRadiusExtralarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "e58b275f7a3614d55387dcc5ff159494db0a0f07"
      name: "radius / rd/radius/extraLarge"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      radius:
        value: "12px"
        css: "12px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "12px"
  - token_id: "radius_radius_rd_radius_large"
    semantic_name: "radius / rd/radius/large"
    category: "radius"
    runtime_source:
      kind: generated_design_token
      name: "rdRadiusRdRadiusLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "3edf778bf3d820c179933cce3e314f998c78940d"
      name: "radius / rd/radius/large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      radius:
        value: "8px"
        css: "8px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "8px"
  - token_id: "radius_radius_rd_radius_round"
    semantic_name: "radius / rd/radius/round"
    category: "radius"
    runtime_source:
      kind: generated_design_token
      name: "rdRadiusRdRadiusRound"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c1efd2a14eff75db096ee97e329a31a819f42509"
      name: "radius / rd/radius/round"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      radius:
        value: "999px"
        css: "999px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "999px"
  - token_id: "radius_radius_rd_radius_small"
    semantic_name: "radius / rd/radius/small"
    category: "radius"
    runtime_source:
      kind: generated_design_token
      name: "rdRadiusRdRadiusSmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "34418ec75b5bb52558358415f02fba24ebf858b3"
      name: "radius / rd/radius/small"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      radius:
        value: "4px"
        css: "4px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "4px"
  - token_id: "size_font_rd_font_size_base"
    semantic_name: "font / rd/font-size/base"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeBase"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "21f196c2f08934a53f188052bf77b6fb3936397b"
      name: "font / rd/font-size/base"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "14px"
        css: "14px"
        source: "rd/font-size/title-small"
    notes:
      - "旧token，用于兼容"
    fallback:
      allowed: false
      value: "14px"
  - token_id: "size_font_rd_font_size_body_extrasmall"
    semantic_name: "font / rd/font-size/body-extraSmall"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeBodyExtrasmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "e2bf80e7e0f5ed20f000a46dcf32c08c1db39249"
      name: "font / rd/font-size/body-extraSmall"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "10px"
        css: "10px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "10px"
  - token_id: "size_font_rd_font_size_body_large"
    semantic_name: "font / rd/font-size/body-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeBodyLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "ff55c6e2d9698e5336c3b4e289987c34ee8273c9"
      name: "font / rd/font-size/body-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "16px"
        css: "16px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "16px"
  - token_id: "size_font_rd_font_size_body_medium"
    semantic_name: "font / rd/font-size/body-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeBodyMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f1940dbd7efa70af4c53847a10698161e156a8da"
      name: "font / rd/font-size/body-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "14px"
        css: "14px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "14px"
  - token_id: "size_font_rd_font_size_body_small"
    semantic_name: "font / rd/font-size/body-small"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeBodySmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "d7233a6b11dc8b46f6091f4764dfd47e21b6bc45"
      name: "font / rd/font-size/body-small"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "12px"
        css: "12px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "12px"
  - token_id: "size_font_rd_font_size_display_large"
    semantic_name: "font / rd/font-size/display-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeDisplayLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "3fbb94562b14e77b3268acf60e15dd602cf16018"
      name: "font / rd/font-size/display-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "64px"
        css: "64px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "64px"
  - token_id: "size_font_rd_font_size_display_medium"
    semantic_name: "font / rd/font-size/display-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeDisplayMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "e07571ee484ac4a051040164cb8f9bb9c88823a6"
      name: "font / rd/font-size/display-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "48px"
        css: "48px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "48px"
  - token_id: "size_font_rd_font_size_headline_large"
    semantic_name: "font / rd/font-size/headline-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeHeadlineLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "6b9b2fb55536d151d3d0e506723c7ba81421836f"
      name: "font / rd/font-size/headline-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "36px"
        css: "36px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "36px"
  - token_id: "size_font_rd_font_size_headline_medium"
    semantic_name: "font / rd/font-size/headline-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeHeadlineMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "d26cbc341a6b2dd170b796887148f64a34b08cd5"
      name: "font / rd/font-size/headline-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "28px"
        css: "28px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "28px"
  - token_id: "size_font_rd_font_size_headline_small"
    semantic_name: "font / rd/font-size/headline-small"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeHeadlineSmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "033ed97a11450d173d384cd4c0f6423c45c235ad"
      name: "font / rd/font-size/headline-small"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "24px"
        css: "24px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "24px"
  - token_id: "size_font_rd_font_size_l"
    semantic_name: "font / rd/font-size/l"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeL"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "c227a2e13ecac98209476a5bd7ec5bf151a9cfb0"
      name: "font / rd/font-size/l"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "18px"
        css: "18px"
        source: "rd/font-size/title-large"
    notes:
      - "旧token，用于兼容"
    fallback:
      allowed: false
      value: "18px"
  - token_id: "size_font_rd_font_size_link_large"
    semantic_name: "font / rd/font-size/link-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeLinkLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "30b17318ac0c24545ce2c6969c2f3bccfbc42a69"
      name: "font / rd/font-size/link-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "16px"
        css: "16px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "16px"
  - token_id: "size_font_rd_font_size_link_medium"
    semantic_name: "font / rd/font-size/link-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeLinkMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "441fbb79acdc74b66544902f92713be4bb7f1c09"
      name: "font / rd/font-size/link-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "14px"
        css: "14px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "14px"
  - token_id: "size_font_rd_font_size_link_small"
    semantic_name: "font / rd/font-size/link-small"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeLinkSmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "7d46bd65f9f24c8413f10667b4ed731e097b23fc"
      name: "font / rd/font-size/link-small"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "12px"
        css: "12px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "12px"
  - token_id: "size_font_rd_font_size_m"
    semantic_name: "font / rd/font-size/m"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeM"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "5fff3a9ca94dd64019cf767a74d6b353590a970a"
      name: "font / rd/font-size/m"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "16px"
        css: "16px"
        source: "rd/font-size/title-medium"
    notes:
      - "旧token，用于兼容"
    fallback:
      allowed: false
      value: "16px"
  - token_id: "size_font_rd_font_size_mark_extrasmall"
    semantic_name: "font / rd/font-size/mark-extraSmall"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeMarkExtrasmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "4a635bebbafd97bea14b4beb86ed7eebdd405231"
      name: "font / rd/font-size/mark-extraSmall"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "10px"
        css: "10px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "10px"
  - token_id: "size_font_rd_font_size_mark_large"
    semantic_name: "font / rd/font-size/mark-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeMarkLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "60042e29fd52e47d101cbf7e3dd76b414f5d854d"
      name: "font / rd/font-size/mark-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "16px"
        css: "16px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "16px"
  - token_id: "size_font_rd_font_size_mark_medium"
    semantic_name: "font / rd/font-size/mark-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeMarkMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "b1f27cd742e46a64c1b05c80c3b21ae70c1d3eb2"
      name: "font / rd/font-size/mark-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "14px"
        css: "14px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "14px"
  - token_id: "size_font_rd_font_size_mark_small"
    semantic_name: "font / rd/font-size/mark-small"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeMarkSmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "0425b1c453f0dd3e120441bfd35fb9bd85f6b8e1"
      name: "font / rd/font-size/mark-small"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "12px"
        css: "12px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "12px"
  - token_id: "size_font_rd_font_size_s"
    semantic_name: "font / rd/font-size/s"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeS"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "cb00df340801f2e919c26eb3694cc2bfd57f22b3"
      name: "font / rd/font-size/s"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "12px"
        css: "12px"
        source: "rd/font-size/body-small"
    notes:
      - "旧token，用于兼容"
    fallback:
      allowed: false
      value: "12px"
  - token_id: "size_font_rd_font_size_title_extralarge"
    semantic_name: "font / rd/font-size/title-extraLarge"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeTitleExtralarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "765f82c191637c979b41c8f63957b4e56b5a3a7a"
      name: "font / rd/font-size/title-extraLarge"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "20px"
        css: "20px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "20px"
  - token_id: "size_font_rd_font_size_title_large"
    semantic_name: "font / rd/font-size/title-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeTitleLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "ff977a2be34b2a213fedb7d4f973a303b125b253"
      name: "font / rd/font-size/title-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "18px"
        css: "18px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "18px"
  - token_id: "size_font_rd_font_size_title_medium"
    semantic_name: "font / rd/font-size/title-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeTitleMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "2875d8de7561589e058c511b33209d83f8fca50a"
      name: "font / rd/font-size/title-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "16px"
        css: "16px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "16px"
  - token_id: "size_font_rd_font_size_title_small"
    semantic_name: "font / rd/font-size/title-small"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeTitleSmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "fa8a0290d93b9a12945acfe0e906a12c5f3d881e"
      name: "font / rd/font-size/title-small"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "14px"
        css: "14px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "14px"
  - token_id: "size_font_rd_font_size_xl"
    semantic_name: "font / rd/font-size/xl"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeXl"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "b1433f9a1d199ba5a79cb6e1caf75145450ff36b"
      name: "font / rd/font-size/xl"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "20px"
        css: "20px"
        source: "rd/font-size/title-extraLarge"
    notes:
      - "旧token，用于兼容"
    fallback:
      allowed: false
      value: "20px"
  - token_id: "size_font_rd_font_size_xs"
    semantic_name: "font / rd/font-size/xs"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeXs"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "5adf87d054cdcf123c3b47dccb2805fcb509ef31"
      name: "font / rd/font-size/xs"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "10px"
        css: "10px"
        source: "rd/font-size/body-extraSmall"
    notes:
      - "旧token，用于兼容"
    fallback:
      allowed: false
      value: "10px"
  - token_id: "size_font_rd_font_size_xxl"
    semantic_name: "font / rd/font-size/xxl"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontSizeXxl"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "332f345ef513fd8ffba77923e1ba989c3a93ea0b"
      name: "font / rd/font-size/xxl"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "36px"
        css: "36px"
        source: "rd/font-size/headline-large"
    notes:
      - "旧token，用于兼容"
    fallback:
      allowed: false
      value: "36px"
  - token_id: "size_font_rd_line_height_body_extrasmall"
    semantic_name: "font / rd/line-height/body-extraSmall"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightBodyExtrasmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "4a704481514342df92167190d1276e83b85a07a3"
      name: "font / rd/line-height/body-extraSmall"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "16px"
        css: "16px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "16px"
  - token_id: "size_font_rd_line_height_body_large"
    semantic_name: "font / rd/line-height/body-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightBodyLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "7ff94c5a06f8d331ae347b53494e7cf23439af03"
      name: "font / rd/line-height/body-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "24px"
        css: "24px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "24px"
  - token_id: "size_font_rd_line_height_body_medium"
    semantic_name: "font / rd/line-height/body-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightBodyMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "6e264e0524a19869fd3993f0cd14c5ce32d1aa3f"
      name: "font / rd/line-height/body-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "22px"
        css: "22px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "22px"
  - token_id: "size_font_rd_line_height_body_small"
    semantic_name: "font / rd/line-height/body-small"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightBodySmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "8e8c412ebbf53f50801925a399c8289bd5884e15"
      name: "font / rd/line-height/body-small"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "20px"
        css: "20px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "20px"
  - token_id: "size_font_rd_line_height_display_large"
    semantic_name: "font / rd/line-height/display-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightDisplayLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "637dcb4bc59c943dc2f2fa16620a66caafd6e057"
      name: "font / rd/line-height/display-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "72px"
        css: "72px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "72px"
  - token_id: "size_font_rd_line_height_display_medium"
    semantic_name: "font / rd/line-height/display-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightDisplayMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "7eecbda40cfb83d3ed1f91a18593ae99ac161bdb"
      name: "font / rd/line-height/display-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "56px"
        css: "56px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "56px"
  - token_id: "size_font_rd_line_height_headline_large"
    semantic_name: "font / rd/line-height/headline-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightHeadlineLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "7a674a6b6aa596570279209f90eebe88f56bb585"
      name: "font / rd/line-height/headline-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "44px"
        css: "44px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "44px"
  - token_id: "size_font_rd_line_height_headline_medium"
    semantic_name: "font / rd/line-height/headline-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightHeadlineMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "197eeba2f67c371188a4cec466f65ecab6f6d812"
      name: "font / rd/line-height/headline-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "36px"
        css: "36px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "36px"
  - token_id: "size_font_rd_line_height_headline_small"
    semantic_name: "font / rd/line-height/headline-small"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightHeadlineSmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "4b37718e308f3838f9a59182a0fb36a7797cdd11"
      name: "font / rd/line-height/headline-small"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "32px"
        css: "32px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "32px"
  - token_id: "size_font_rd_line_height_link_large"
    semantic_name: "font / rd/line-height/link-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightLinkLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "1d38788d3499b0ce0f0560b1a36aa9cab76fbf9c"
      name: "font / rd/line-height/link-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "24px"
        css: "24px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "24px"
  - token_id: "size_font_rd_line_height_link_medium"
    semantic_name: "font / rd/line-height/link-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightLinkMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "1f36359489cf206c94305771172770307d2f35e0"
      name: "font / rd/line-height/link-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "22px"
        css: "22px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "22px"
  - token_id: "size_font_rd_line_height_link_small"
    semantic_name: "font / rd/line-height/link-small"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightLinkSmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f5cedb1afe06d601e61159c8bc0fa6b3002a60f0"
      name: "font / rd/line-height/link-small"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "20px"
        css: "20px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "20px"
  - token_id: "size_font_rd_line_height_mark_extrasmall"
    semantic_name: "font / rd/line-height/mark-extraSmall"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightMarkExtrasmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "a2bd0f66e1f00f1114b1b9d7f8fe625c89f4c600"
      name: "font / rd/line-height/mark-extraSmall"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "16px"
        css: "16px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "16px"
  - token_id: "size_font_rd_line_height_mark_large"
    semantic_name: "font / rd/line-height/mark-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightMarkLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f320f1693264d60b8cd23066c1f70327bf8f2ea2"
      name: "font / rd/line-height/mark-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "24px"
        css: "24px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "24px"
  - token_id: "size_font_rd_line_height_mark_medium"
    semantic_name: "font / rd/line-height/mark-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightMarkMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "4eef6d482a4ef851b553ea319467c39803395016"
      name: "font / rd/line-height/mark-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "22px"
        css: "22px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "22px"
  - token_id: "size_font_rd_line_height_mark_small"
    semantic_name: "font / rd/line-height/mark-small"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightMarkSmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "0a899d7373dc122cba9aa7034897c9c5dba74f2b"
      name: "font / rd/line-height/mark-small"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "20px"
        css: "20px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "20px"
  - token_id: "size_font_rd_line_height_title_extralarge"
    semantic_name: "font / rd/line-height/title-extraLarge"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightTitleExtralarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "5060584899d7cb1ad39cf7d7a0d5d683ae1f3a4b"
      name: "font / rd/line-height/title-extraLarge"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "28px"
        css: "28px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "28px"
  - token_id: "size_font_rd_line_height_title_large"
    semantic_name: "font / rd/line-height/title-large"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightTitleLarge"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "64693a18896ba53781625bb630be9da728032ac8"
      name: "font / rd/line-height/title-large"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "26px"
        css: "26px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "26px"
  - token_id: "size_font_rd_line_height_title_medium"
    semantic_name: "font / rd/line-height/title-medium"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightTitleMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "d2d733d4827e67b46b6d4e1ee9eb823d358c7810"
      name: "font / rd/line-height/title-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "24px"
        css: "24px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "24px"
  - token_id: "size_font_rd_line_height_title_small"
    semantic_name: "font / rd/line-height/title-small"
    category: "size"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdLineHeightTitleSmall"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "6c47b093de58ab0359141a08ec1285e6b7701d30"
      name: "font / rd/line-height/title-small"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "22px"
        css: "22px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "22px"
  - token_id: "spacing_spacer_rd_spacer"
    semantic_name: "spacer / rd/spacer"
    category: "spacing"
    runtime_source:
      kind: generated_design_token
      name: "rdSpacerRdSpacer"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "693f21029dfadb303fe3ab5b25c4fb79c84098a6"
      name: "spacer / rd/spacer"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      spacer:
        value: "2px"
        css: "2px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "2px"
  - token_id: "spacing_spacer_rd_spacer_1"
    semantic_name: "spacer / rd/spacer-1"
    category: "spacing"
    runtime_source:
      kind: generated_design_token
      name: "rdSpacerRdSpacer1"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "577100e73ac34730590f1d666dd103d7d75e5fbf"
      name: "spacer / rd/spacer-1"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      spacer:
        value: "4px"
        css: "4px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "4px"
  - token_id: "spacing_spacer_rd_spacer_2"
    semantic_name: "spacer / rd/spacer-2"
    category: "spacing"
    runtime_source:
      kind: generated_design_token
      name: "rdSpacerRdSpacer2"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "22d0dc1c8983333acd8894b33d42d4d6a7251b29"
      name: "spacer / rd/spacer-2"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      spacer:
        value: "6px"
        css: "6px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "6px"
  - token_id: "spacing_spacer_rd_spacer_3"
    semantic_name: "spacer / rd/spacer-3"
    category: "spacing"
    runtime_source:
      kind: generated_design_token
      name: "rdSpacerRdSpacer3"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "1856577adb63171a4361d47c619723ccb3817546"
      name: "spacer / rd/spacer-3"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      spacer:
        value: "8px"
        css: "8px"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "8px"
  - token_id: "spacing_spacer_rd_spacer_4"
    semantic_name: "spacer / rd/spacer-4"
    category: "spacing"
    runtime_source:
      kind: generated_design_token
      name: "rdSpacerRdSpacer4"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "357fe10d24c04913400757f79cbe944dfa162246"
      name: "spacer / rd/spacer-4"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      spacer:
        value: "12px"
        css: "12px"
        source: "direct"
    notes:
      - "间距-小-x"
    fallback:
      allowed: false
      value: "12px"
  - token_id: "spacing_spacer_rd_spacer_5"
    semantic_name: "spacer / rd/spacer-5"
    category: "spacing"
    runtime_source:
      kind: generated_design_token
      name: "rdSpacerRdSpacer5"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "0f038e906b689e61ea547ea7cff2d55788286fb5"
      name: "spacer / rd/spacer-5"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      spacer:
        value: "16px"
        css: "16px"
        source: "direct"
    notes:
      - "间距-小"
    fallback:
      allowed: false
      value: "16px"
  - token_id: "spacing_spacer_rd_spacer_6"
    semantic_name: "spacer / rd/spacer-6"
    category: "spacing"
    runtime_source:
      kind: generated_design_token
      name: "rdSpacerRdSpacer6"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "cc482d8ea12e6bac38a0038612184a31147d5f0b"
      name: "spacer / rd/spacer-6"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      spacer:
        value: "24px"
        css: "24px"
        source: "direct"
    notes:
      - "间距-中"
    fallback:
      allowed: false
      value: "24px"
  - token_id: "spacing_spacer_rd_spacer_7"
    semantic_name: "spacer / rd/spacer-7"
    category: "spacing"
    runtime_source:
      kind: generated_design_token
      name: "rdSpacerRdSpacer7"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "f76599a738e90a3f217fd9552c01e1c8950b2396"
      name: "spacer / rd/spacer-7"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      spacer:
        value: "32px"
        css: "32px"
        source: "direct"
    notes:
      - "间距-大"
    fallback:
      allowed: false
      value: "32px"
  - token_id: "spacing_spacer_rd_spacer_8"
    semantic_name: "spacer / rd/spacer-8"
    category: "spacing"
    runtime_source:
      kind: generated_design_token
      name: "rdSpacerRdSpacer8"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "040ad3a6ba901713588701dd35f26f90e2465e2e"
      name: "spacer / rd/spacer-8"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      spacer:
        value: "48px"
        css: "48px"
        source: "direct"
    notes:
      - "间距-大-x"
    fallback:
      allowed: false
      value: "48px"
  - token_id: "spacing_spacer_rd_spacer_9"
    semantic_name: "spacer / rd/spacer-9"
    category: "spacing"
    runtime_source:
      kind: generated_design_token
      name: "rdSpacerRdSpacer9"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "cfe78516b00a4f5e52530367181e368c6f9145c6"
      name: "spacer / rd/spacer-9"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      spacer:
        value: "80px"
        css: "80px"
        source: "direct"
    notes:
      - "间距-大-xx"
    fallback:
      allowed: false
      value: "80px"
  - token_id: "typography_font_rd_font_family"
    semantic_name: "font / rd/font-family"
    category: "typography"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontFamily"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "b58d0cd8b23bff60d60058d2878ab9d055eb50a3"
      name: "font / rd/font-family"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "PingFang SC"
        css: "PingFang SC"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "PingFang SC"
  - token_id: "typography_font_rd_font_family_medium"
    semantic_name: "font / rd/font-family-medium"
    category: "typography"
    runtime_source:
      kind: generated_design_token
      name: "rdFontRdFontFamilyMedium"
      path: "generated/figma-token-source.json"
    figma_source:
      kind: variable
      key: "43af5a68aab87475e0f3e520a1525543280899f4"
      name: "font / rd/font-family-medium"
    source_file: "rdesign灵犀2.0"
    values_by_mode:
      font:
        value: "PingFang SC"
        css: "PingFang SC"
        source: "direct"
    notes:
      []
    fallback:
      allowed: false
      value: "PingFang SC"
```

这节只回答：
- 每类 token 在代码里从哪里来
- 每类 token 在 Figma 里从哪里来

## Token Entry Template

```yaml
token_entry_template:
  token_id: REPLACE_ME
  semantic_name: REPLACE_ME
  category: REPLACE_ME
  runtime_source:
    kind: REPLACE_ME
    name: REPLACE_ME
    path: REPLACE_ME
  figma_source:
    kind: REPLACE_ME
    key: REPLACE_ME
    name: REPLACE_ME
  notes: []
  fallback:
    allowed: false
    value: null
```

字段建议：
- `token_id`: 稳定 id，给工具和同步脚本用
- `semantic_name`: 给人读的语义名
- `category`: 例如 `color`、`spacing`、`radius`
- `runtime_source`: 代码真相
- `figma_source`: Figma 真相
- `notes`: 只放必要补充，不写长段背景
- `fallback`: 仅在确有必要时使用

## Mapping Rules

```yaml
mapping_rules:
  prefer_semantic_tokens: true
  prefer_runtime_truth_when_documented: true
  allow_hardcoded_fallback_by_default: false
  require_figma_and_runtime_link: true
```

执行原则：
- 能绑定语义 token，就不要写裸值
- 如果运行时命名和 Figma 命名不同，用映射解决，不要各写各的
- 默认不允许把 fallback 当正式值

## Consumer Notes

```yaml
consumer_notes:
  design_side:
    display_name: 设计侧
    uses:
      - semantic token selection
      - figma variable or style mapping
    system_ids:
      - figma_design_agent
  code_side:
    display_name: 编码侧
    uses:
      - runtime token source path
      - semantic token binding
      - token truth lookup
      - runtime and figma source lookup
    system_ids:
      - component_library_mcp
      - component_library_docs
      - code_tooling
```

这节只说明“哪类角色会怎么用”，不在这里写消费实现。

## Token Entries

真实 token 条目只允许写在这一节，并且必须放在 `token_entries` YAML block 里。

```yaml
token_entries:
  - token_id: REPLACE_ME
    semantic_name: REPLACE_ME
    category: REPLACE_ME
    runtime_source:
      kind: REPLACE_ME
      name: REPLACE_ME
      path: REPLACE_ME
    figma_source:
      kind: REPLACE_ME
      key: REPLACE_ME
      name: REPLACE_ME
    notes: []
    fallback:
      allowed: false
      value: null
```

维护约定：
- parser 只把这一节里的 `token_entries` 当作真实数据
- `token_entry_template` 只做模板，不算真实条目
- 允许后续按 `### Color`、`### Spacing` 之类子标题继续分块，但机读以 `token_entries` 为准

## Recommended Recording Order

建议按这个顺序补内容：

1. colors
2. spacing
3. radius
4. typography
5. shadow

原因：
- 颜色和间距最常被组件和页面生成直接消费
- 字体和阴影通常依赖更完整的上下文

## Update Checklist

- 新增 token 类别时，先更新 `token_sources`
- 新增具体 token 时，只改 `## Token Entries`
- 如果 Figma 或代码来源变了，优先改本文件
- 不要把具体组件用法写进这里，组件用法写到 `components/*.md`
