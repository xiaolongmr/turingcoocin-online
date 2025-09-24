# TuringCoocin 多项目服务器

一个基于 **Node.js + Express.js** 的多项目动态文件服务器，专为托管多个项目而设计，特别优化了对 Adobe CEP 扩展的支持。

## 🚀 功能特性

- **Node.js 技术栈**: 基于 Node.js 14.0+ 和 Express.js 框架构建
- **多项目支持**: 自动识别和托管根目录下的所有项目
- **Adobe CEP 扩展支持**: 专门优化了对 Adobe CEP 扩展的脚本和样式文件处理
- **动态服务器**: 支持正确的 MIME 类型设置和缓存控制
- **便捷访问路由**: 提供简化的访问路径
- **RESTful API**: 提供项目列表和文件浏览 API 接口
- **健康检查**: 内置服务器状态监控和性能指标

## 📁 项目结构

```
www.turingcoocin.online/
├── server.js              # 主服务器文件
├── package.json           # 项目依赖配置
├── index.html            # 服务器首页
├── vercel.json           # Vercel 部署配置
├── .gitignore            # Git 忽略文件
├── README.md             # 项目说明文档
└── webApp/               # WebApp 项目目录
    └── adobe/
        └── ceps/
            ├── com.DGsoftware.CloudHappyScriptDock/      # 原始版本
            └── com.DGsoftware.CloudHappyScriptDock-y/    # Green版本（推荐）
```

## 🛠️ 本地开发

### 环境要求

- Node.js 14.0 或更高版本
- npm 6.0 或更高版本

### 安装和启动

1. 克隆项目到本地

```bash
git clone <repository-url>
cd www.turingcoocin.online
```

2. 安装依赖

```bash
npm install
```

3. 启动服务器

```bash
npm start
```

4. 访问服务器
   打开浏览器访问 `http://wwww.z-l.top`

### 可用路由

- `/` - 服务器首页和导航
- `/webApp/` - WebApp 项目访问
- `/green` - Green 版本 CEP 扩展（推荐）
- `/original` - 原始版本 CEP 扩展
- `/projects` - 项目列表 API
- `/api/browse/*` - 文件浏览 API
- `/health` - 服务器健康检查
- `/status` - 服务器状态信息

## 🌐 部署到 Vercel

### 方法一：通过 GitHub 连接

1. 将项目推送到 GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. 在 [Vercel](https://vercel.com) 上导入 GitHub 仓库

3. Vercel 会自动检测 `vercel.json` 配置并部署

### 方法二：使用 Vercel CLI

1. 安装 Vercel CLI

```bash
npm i -g vercel
```

2. 登录 Vercel

```bash
vercel login
```

3. 部署项目

```bash
vercel
```

## 📝 配置说明

### package.json

- 定义了项目依赖和启动脚本
- 包含 Express、CORS 等必要依赖

### server.js

- 主服务器文件，配置了所有路由和中间件
- 支持静态文件服务和动态内容处理
- 包含错误处理和优雅关闭机制

### vercel.json

- Vercel 部署配置文件
- 指定了 Node.js 运行时和路由规则
- 配置了生产环境变量

## 🔧 开发指南

### 添加新项目

1. 在根目录创建新的项目文件夹
2. 服务器会自动识别并提供访问
3. 可通过 `/projects` API 查看所有可用项目

### 自定义路由

在 `server.js` 中添加新的路由：

```javascript
app.get("/your-route", (req, res) => {
  // 路由处理逻辑
});
```

### 环境变量

- `PORT`: 服务器端口（默认 3000）
- `NODE_ENV`: 运行环境（development/production）

## 📋 注意事项

1. **Adobe CEP 扩展**: 推荐使用 Green 版本，功能更完整
2. **文件路径**: 确保所有文件路径使用正确的分隔符
3. **CORS**: 已配置跨域支持，适用于开发和生产环境
4. **缓存**: 开发环境禁用缓存，生产环境可根据需要调整

## 🐛 故障排除

### 端口占用

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### 依赖问题

```bash
# 清除缓存并重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📄 许可证

本项目仅供学习和开发使用。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目。

---

**开发者**: TuringCoocin  
**最后更新**: 2024 年 12 月
