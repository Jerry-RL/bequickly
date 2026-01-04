# GitHub SSH Key 配置指南

## 📋 步骤概览

1. 检查是否已有 SSH key
2. 生成新的 SSH key（如果没有）
3. 添加 SSH key 到 ssh-agent
4. 复制 SSH key 到 GitHub
5. 测试 SSH 连接
6. 更改 Git 远程地址为 SSH

---

## 🔍 步骤 1: 检查是否已有 SSH key

打开 PowerShell 或 Git Bash，运行：

```powershell
ls ~/.ssh
```

如果看到 `id_rsa` 和 `id_rsa.pub`（或 `id_ed25519` 和 `id_ed25519.pub`），说明已有 SSH key，可以跳过步骤 2。

---

## 🔑 步骤 2: 生成新的 SSH key

### 方法 1: 使用 Ed25519（推荐）

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### 方法 2: 使用 RSA（如果 Ed25519 不支持）

```powershell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**提示：**
- 按 Enter 使用默认文件位置（通常是 `~/.ssh/id_ed25519` 或 `~/.ssh/id_rsa`）
- 可以设置密码短语（passphrase），也可以直接按 Enter 跳过
- 将 `your_email@example.com` 替换为你的 GitHub 邮箱

---

## 🔐 步骤 3: 启动 ssh-agent 并添加 key

### Windows (PowerShell)

```powershell
# 启动 ssh-agent
Start-Service ssh-agent

# 添加 SSH key
ssh-add ~/.ssh/id_ed25519
# 或
ssh-add ~/.ssh/id_rsa
```

### Windows (Git Bash)

```bash
# 启动 ssh-agent
eval "$(ssh-agent -s)"

# 添加 SSH key
ssh-add ~/.ssh/id_ed25519
# 或
ssh-add ~/.ssh/id_rsa
```

---

## 📋 步骤 4: 复制 SSH public key

### PowerShell

```powershell
# Ed25519
cat ~/.ssh/id_ed25519.pub | clip

# 或 RSA
cat ~/.ssh/id_rsa.pub | clip
```

### Git Bash / Linux / Mac

```bash
# Ed25519
cat ~/.ssh/id_ed25519.pub

# 或 RSA
cat ~/.ssh/id_rsa.pub
```

然后**手动复制**输出的内容（从 `ssh-ed25519` 或 `ssh-rsa` 开始到邮箱结束）。

---

## 🌐 步骤 5: 添加 SSH key 到 GitHub

1. **登录 GitHub**
   - 访问 https://github.com
   - 登录你的账户

2. **打开设置**
   - 点击右上角头像 → **Settings**
   - 或直接访问：https://github.com/settings/profile

3. **进入 SSH and GPG keys**
   - 左侧菜单找到 **SSH and GPG keys**
   - 或直接访问：https://github.com/settings/keys

4. **添加新的 SSH key**
   - 点击 **New SSH key** 按钮
   - **Title**: 输入一个描述性名称（如 "My Windows PC"）
   - **Key**: 粘贴刚才复制的 SSH public key（整个内容）
   - 点击 **Add SSH key**

5. **确认密码**
   - 输入 GitHub 密码确认

---

## ✅ 步骤 6: 测试 SSH 连接

```powershell
ssh -T git@github.com
```

**预期输出：**
```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

如果看到这个，说明配置成功！

**如果遇到问题：**
- 确保 ssh-agent 正在运行
- 确保 SSH key 已添加到 ssh-agent
- 检查 GitHub 上的 SSH key 是否正确添加

---

## 🔄 步骤 7: 更改 Git 远程地址为 SSH

### 检查当前远程地址

```powershell
git remote -v
```

如果显示的是 HTTPS 地址（如 `https://github.com/username/repo.git`），需要改为 SSH。

### 更改远程地址

```powershell
# 方法 1: 如果还没有添加远程地址
git remote add origin git@github.com:username/repo.git

# 方法 2: 如果已有远程地址，更改它
git remote set-url origin git@github.com:username/repo.git
```

**注意：**
- 将 `username` 替换为你的 GitHub 用户名
- 将 `repo` 替换为你的仓库名

### 验证更改

```powershell
git remote -v
```

应该显示：
```
origin  git@github.com:username/repo.git (fetch)
origin  git@github.com:username/repo.git (push)
```

---

## 🚀 步骤 8: 现在可以推送了

```powershell
git push -u origin master
# 或
git push -u origin main
```

---

## 🔧 常见问题解决

### 问题 1: Permission denied (publickey)

**解决方案：**
```powershell
# 确保 ssh-agent 运行
Start-Service ssh-agent

# 添加 key
ssh-add ~/.ssh/id_ed25519

# 测试连接
ssh -T git@github.com
```

### 问题 2: 多个 SSH key 管理

如果你有多个 GitHub 账户或 SSH key，可以创建 `~/.ssh/config` 文件：

```powershell
# 创建 config 文件
notepad ~/.ssh/config
```

添加内容：
```
# GitHub account 1
Host github.com-account1
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_account1

# GitHub account 2
Host github.com-account2
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_account2
```

然后使用：
```powershell
git remote set-url origin git@github.com-account1:username/repo.git
```

### 问题 3: Windows ssh-agent 服务未启动

```powershell
# 以管理员身份运行 PowerShell
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
```

---

## 📝 快速命令参考

```powershell
# 生成 SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# 启动 ssh-agent
Start-Service ssh-agent

# 添加 key
ssh-add ~/.ssh/id_ed25519

# 复制 public key
cat ~/.ssh/id_ed25519.pub | clip

# 测试连接
ssh -T git@github.com

# 更改远程地址
git remote set-url origin git@github.com:username/repo.git

# 推送代码
git push -u origin master
```

---

## ✅ 完成！

配置完成后，你就可以使用 SSH 方式推送和拉取代码了，不再需要输入密码，也不会遇到 SSL 连接问题。

