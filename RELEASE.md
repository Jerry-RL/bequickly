# 发布清单 / Release Checklist

## ✅ 已完成的任务

- [x] 添加模板版本功能
- [x] 实现多轮交互式生成功能（类似 create-next-app）
- [x] 安装所有依赖
- [x] 构建项目成功
- [x] 本地 link 测试通过
- [x] Git 仓库初始化
- [x] 创建 LICENSE 文件
- [x] 完善 README 文档（中英双语）

## 📋 发布前检查清单

### GitHub 发布

- [ ] 创建 GitHub 仓库
- [ ] 添加远程仓库地址
- [ ] 推送代码到 GitHub
- [ ] 创建 Release 标签

### npm 发布

- [ ] 检查包名是否可用 (`npm view bequickly`)
- [ ] 确认版本号正确 (`package.json`)
- [ ] 运行 `npm pack --dry-run` 检查发布内容
- [ ] 登录 npm (`npm login`)
- [ ] 发布到 npm (`npm publish`)
- [ ] 验证发布 (`npm view bequickly`)

## 🚀 快速发布命令

### GitHub

```bash
# 1. 创建仓库后，添加远程地址
git remote add origin https://github.com/YOUR_USERNAME/bequickly.git

# 2. 推送代码
git branch -M main
git push -u origin main

# 3. 创建标签
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### npm

```bash
# 1. 登录
npm login

# 2. 检查包名
npm view bequickly

# 3. 预览发布内容
npm pack --dry-run

# 4. 发布
npm publish

# 5. 验证
npm view bequickly
```

## 📝 测试命令

发布后，可以使用以下命令测试：

```bash
# 使用 npx 测试
npx bequickly@latest --version
npx bequickly@latest list
npx bequickly@latest init vibe-sandbox test-project
```

## 🔄 更新版本

```bash
# 更新版本号
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# 推送标签
git push && git push --tags

# 发布
npm publish
```

