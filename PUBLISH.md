# 发布指南 / Publishing Guide

## GitHub 发布步骤

### 1. 初始化 Git 仓库（如果还没有）

```bash
git init
git add .
git commit -m "Initial commit: bequickly CLI tool"
```

### 2. 添加远程仓库

```bash
git remote add origin https://github.com/YOUR_USERNAME/bequickly.git
```

### 3. 推送到 GitHub

```bash
git branch -M main
git push -u origin main
```

### 4. 创建标签（可选）

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## npm 发布步骤

### 1. 登录 npm

```bash
npm login
```

### 2. 检查包名是否可用

```bash
npm view bequickly
```

如果包名已被占用，需要在 `package.json` 中修改 `name` 字段。

### 3. 构建项目

```bash
npm run build
```

### 4. 检查发布内容

```bash
npm pack --dry-run
```

这会显示将要发布的文件列表。

### 5. 发布到 npm

```bash
# 发布公开版本
npm publish

# 或者发布 beta 版本
npm publish --tag beta

# 或者发布私有版本（需要付费账户）
npm publish --access restricted
```

### 6. 验证发布

```bash
npm view bequickly
```

### 7. 测试安装

```bash
npx bequickly@latest --version
```

## 更新版本

### 1. 更新版本号

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 小版本 (1.0.0 -> 1.1.0)
npm version minor

# 大版本 (1.0.0 -> 2.0.0)
npm version major
```

### 2. 提交并推送

```bash
git push && git push --tags
```

### 3. 发布

```bash
npm publish
```

## 注意事项

1. **版本号**: 遵循语义化版本控制 (SemVer)
2. **README**: 确保 README.md 是最新的
3. **测试**: 发布前确保所有功能正常工作
4. **依赖**: 检查依赖版本是否合适
5. **文件**: 确保 `.npmignore` 或 `package.json` 中的 `files` 字段正确配置

## 回滚版本

如果发布有问题，可以撤销：

```bash
npm unpublish bequickly@1.0.0
```

注意：npm 不允许在 72 小时内删除已发布的包，除非是私有包或从未被下载过。

