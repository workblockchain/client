# Work Blockchain

Decentralized labor record and reactive settlement platform.

## 🛠️ 开发脚本说明

### 包管理器说明

```bash
# 本项目使用 pnpm 作为包管理器，命令格式：
pnpm <command>    # 例如：pnpm dev
# 如使用 npm 需要显式添加 run：
npm run <command> # 例如：npm run dev
```

### 开发环境

```bash
pnpm dev       # 启动Vite开发服务器（纯Web模式）
pnpm tauri     # 启动Tauri桌面应用开发模式
pnpm storybook # 启动组件库开发环境（端口6006）
```

### 构建命令

```bash
pnpm build        # 构建Tauri桌面应用
pnpm build.web    # 构建纯Web应用（输出至dist目录）
pnpm build.all    # 同时构建桌面应用和组件库
pnpm build.review # 构建Web应用+组件库（代码审查用）
```

### 代码质量

```bash
pnpm format # 代码格式化（Prettier + 版权声明检查）
pnpm review # 代码检查（Prettier校验 + Oxlint + 版权声明）
```

### 国际化工具

```bash
pnpm i18n        # 检查i18n翻译文件完整性
pnpm svg-imports # 生成SVG组件导入文件
```

### 测试相关

```bash
pnpm prepare # 安装Playwright测试环境依赖
```
