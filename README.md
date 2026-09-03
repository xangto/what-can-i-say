# what-can-i-say

基于 [WXT](https://wxt.dev/) 框架开发的浏览器扩展,使用 Vue 3 + Element Plus + TypeScript,支持 Chrome / Firefox(Manifest V3)。

## 功能特性

- **哔哩哔哩自定义字体** — 在 B 站页面注入自定义 CSS,可通过弹窗选择字体(微软雅黑、宋体、黑体、楷体等),保存后无需刷新页面即可实时生效
- **B 站页面样式定制** — 内置自定义样式表(如视频卡片作者昵称颜色)
- **右键划词翻译** — 选中网页文本后右键,通过「文本操作 → 有道翻译」菜单直接跳转到有道词典查询

## 技术栈

| 类别 | 技术 |
| ---- | ---- |
| 框架 | [WXT](https://wxt.dev/) |
| UI | Vue 3 + Element Plus |
| 语言 | TypeScript |
| 构建 | Vite |

## 目录结构

```
├── public/                 # 静态资源(扩展图标等)
│   └── icon/
├── src/
│   ├── assets/             # 项目资源
│   ├── components/         # 公共组件
│   └── entries/            # 扩展入口
│       ├── background/     # 后台脚本(右键菜单)
│       ├── xxx.content/ # 内容脚本(注入自定义样式)
│       ├── options/        # 选项页
│       └── popup/          # 弹窗页(字体设置)
├── auto-imports.d.ts       # 自动导入声明(自动生成)
├── components.d.ts         # 组件自动注册声明(自动生成)
├── package.json
├── wxt.config.ts           # WXT 配置
└── web-ext.config.ts       # web-ext 配置
```
