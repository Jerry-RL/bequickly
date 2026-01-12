# 修复 Git 连接超时问题

## 问题描述

```
fatal: unable to access 'https://github.com/Jerry-RL/bequickly.git/': Failed to connect to github.com port 443: Timed out
```

## 解决方案

### 方案 1: 切换到 SSH 协议（推荐）⭐

SSH 协议通常比 HTTPS 更稳定，特别是在网络受限的环境中。

#### 步骤 1: 检查是否已有 SSH key

```powershell
ls ~/.ssh
```

如果看到 `id_rsa.pub` 或 `id_ed25519.pub`，说明已有 SSH key，跳到步骤 3。

#### 步骤 2: 生成 SSH key（如果没有）

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

按 Enter 使用默认位置，可以设置密码或直接跳过。

#### 步骤 3: 复制 SSH key 到剪贴板

```powershell
cat ~/.ssh/id_ed25519.pub | clip
# 或
cat ~/.ssh/id_rsa.pub | clip
```

#### 步骤 4: 添加到 GitHub

1. 访问 https://github.com/settings/keys
2. 点击 "New SSH key"
3. 粘贴 key，保存

#### 步骤 5: 测试 SSH 连接

```powershell
ssh -T git@github.com
```

如果看到 "Hi username! You've successfully authenticated..." 说明成功。

#### 步骤 6: 更改远程地址为 SSH

```powershell
cd bequickly
git remote set-url origin git@github.com:Jerry-RL/bequickly.git
```

#### 步骤 7: 验证并推送

```powershell
git remote -v
git push
```

### 方案 2: 配置 Git 代理

如果你使用代理（VPN），可以配置 Git 使用代理：

#### HTTP/HTTPS 代理

```powershell
# 设置代理（替换为你的代理地址和端口）
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 如果使用 SOCKS5 代理
git config --global http.proxy socks5://127.0.0.1:7890
git config --global https.proxy socks5://127.0.0.1:7890
```

#### 仅对 GitHub 使用代理

```powershell
git config --global http.https://github.com.proxy http://127.0.0.1:7890
```

#### 取消代理设置

```powershell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 方案 3: 使用 GitHub CLI

如果安装了 GitHub CLI (`gh`)，可以使用它来推送：

```powershell
# 安装 GitHub CLI（如果还没有）
# winget install GitHub.cli

# 登录
gh auth login

# 推送
git push
```

### 方案 4: 检查网络连接

```powershell
# 测试 GitHub 连接
ping github.com

# 测试 DNS 解析
nslookup github.com

# 如果 ping 不通，可能需要：
# 1. 检查防火墙设置
# 2. 检查公司/学校网络限制
# 3. 使用 VPN
```

### 方案 5: 增加超时时间

```powershell
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
```

## 快速修复命令（推荐使用 SSH）

```powershell
# 1. 切换到 SSH（如果已配置 SSH key）
cd bequickly
git remote set-url origin git@github.com:Jerry-RL/bequickly.git

# 2. 验证
git remote -v

# 3. 推送
git push
```

## 验证修复

```powershell
# 测试连接
git ls-remote origin

# 如果成功，会显示远程分支列表
```

## 常见问题

### Q: SSH key 已添加但还是连接失败？

A: 检查 SSH 配置：
```powershell
# 创建或编辑 ~/.ssh/config
notepad ~/.ssh/config
```

添加以下内容：
```
Host github.com
  Hostname github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  # 或 IdentityFile ~/.ssh/id_rsa
```

### Q: 公司网络限制，无法访问 GitHub？

A: 
1. 使用 VPN
2. 使用代理（方案 2）
3. 使用 GitHub CLI（方案 3）

### Q: 如何查看当前 Git 配置？

A:
```powershell
git config --list --show-origin
```

## 推荐方案

**最推荐：使用 SSH 协议（方案 1）**

原因：
- ✅ 更稳定可靠
- ✅ 不需要每次输入密码
- ✅ 不受 HTTPS 端口限制影响
- ✅ 适合长期使用

