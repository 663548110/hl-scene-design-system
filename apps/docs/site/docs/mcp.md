---
title: MCP 配置指南
spline: explain
description: RDesign 提供了基于 Model Context Protocol (MCP) 的组件库查询服务，为 AI 编程助手提供组件列表、API 文档、代码示例的结构化查询能力。
---

## 功能概览

| 工具 | 说明 |
|------|------|
| `get_component_list` | 查询组件列表，支持按分类过滤 |
| `get_component_docs` | 查询组件 API 文档（Markdown 格式），支持批量查询 |
| `get_component_demos` | 查询组件代码示例，自动完成 TD→RD 前缀替换 |

## 配置方式

### Kiro

在 `.kiro/settings/mcp.json` 中添加：

```json
{
  "mcpServers": {
    "rdesign-mcp-server": {
      "command": "npx",
      "args": ["-y", "rdesign-mcp-server"],
      "env": {
        "RDESIGN_SITE_BASE_URL": "http://14.103.168.2/mcp/readme"
      }
    }
  }
}
```

### Cursor

在 `.cursor/mcp.json` 中添加：

```json
{
  "mcpServers": {
    "rdesign-mcp-server": {
      "command": "npx",
      "args": ["-y", "rdesign-mcp-server"],
      "env": {
        "RDESIGN_SITE_BASE_URL": "http://14.103.168.2/mcp/readme"
      }
    }
  }
}
```

### VS Code (Copilot)

在 `.vscode/mcp.json` 中添加：

```json
{
  "servers": {
    "rdesign-mcp-server": {
      "command": "npx",
      "args": ["-y", "rdesign-mcp-server"],
      "env": {
        "RDESIGN_SITE_BASE_URL": "http://14.103.168.2/mcp/readme"
      }
    }
  }
}
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `RDESIGN_SITE_BASE_URL` | 远程站点数据源地址（推荐） |
| `RDESIGN_SITE_PATH` | 本地站点数据源路径（优先级最高） |
| `RDESIGN_CDN_BASE_URL` | CDN 数据源地址 |
| `RDESIGN_COMPONENT_PATH` | 本地 rdesign-component 目录路径 |

优先级：`RDESIGN_SITE_PATH` > `RDESIGN_SITE_BASE_URL` > `RDESIGN_CDN_BASE_URL` > `RDESIGN_COMPONENT_PATH`

## 验证

配置完成后，在 AI 助手中尝试以下操作来验证 MCP 服务是否正常工作：

- 询问「RDesign 有哪些按钮组件」
- 询问「RDButton 的 API 文档」
- 询问「给我一个 RDButton 的代码示例」
