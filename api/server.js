/**
 * 通用静态文件服务器
 * 支持多项目托管，适用于GitHub和Vercel部署
 * 服务器根目录: F:\www.turingcoocin.online
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS，允许跨域请求
app.use(cors());

// 解析JSON请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 配置静态文件服务，支持Adobe CEP扩展
app.use(express.static(path.join(__dirname, '..'), {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['html', 'htm', 'js', 'css', 'png', 'jpg', 'gif', 'svg', 'ico', 'jsx', 'ini'],
    index: ['index.html'],
    maxAge: 0, // 禁用缓存，适合开发环境
    redirect: false,
    setHeaders: function (res, filePath, stat) {
        // 设置正确的MIME类型
        if (filePath.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript; charset=utf-8');
        } else if (filePath.endsWith('.jsx')) {
            res.set('Content-Type', 'application/javascript; charset=utf-8');
        } else if (filePath.endsWith('.css')) {
            res.set('Content-Type', 'text/css; charset=utf-8');
        } else if (filePath.endsWith('.html')) {
            res.set('Content-Type', 'text/html; charset=utf-8');
        } else if (filePath.endsWith('.ini')) {
            res.set('Content-Type', 'text/plain; charset=utf-8');
        }
        // 禁用缓存头
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.set('x-timestamp', Date.now());
    }
}));

// 根路由 - 显示项目首页
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Adobe CEP扩展特殊路由支持
// 处理CEP扩展的主页面
app.get('/webApp/adobe/ceps/:extensionName/pages/:pageName', (req, res) => {
  const { extensionName, pageName } = req.params;
  const filePath = path.join(__dirname, '..', 'webApp', 'adobe', 'ceps', extensionName, 'pages', pageName);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send(`页面未找到: ${pageName}`);
  }
});

// 处理CEP扩展的代码文件
app.get('/webApp/adobe/ceps/:extensionName/code/*', (req, res) => {
  const { extensionName } = req.params;
  const codePath = req.params[0]; // 获取通配符部分
  const filePath = path.join(__dirname, '..', 'webApp', 'adobe', 'ceps', extensionName, 'code', codePath);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send(`代码文件未找到: ${codePath}`);
  }
});

// 处理CEP扩展的样式文件
app.get('/webApp/adobe/ceps/:extensionName/styles/*', (req, res) => {
  const { extensionName } = req.params;
  const stylePath = req.params[0];
  const filePath = path.join(__dirname, '..', 'webApp', 'adobe', 'ceps', extensionName, 'styles', stylePath);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send(`样式文件未找到: ${stylePath}`);
  }
});

// 处理CEP扩展的图片文件
app.get('/webApp/adobe/ceps/:extensionName/images/*', (req, res) => {
  const { extensionName } = req.params;
  const imagePath = req.params[0];
  const filePath = path.join(__dirname, '..', 'webApp', 'adobe', 'ceps', extensionName, 'images', imagePath);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send(`图片文件未找到: ${imagePath}`);
  }
});

// 动态项目路由 - 自动检测项目目录
app.get('/projects', (req, res) => {
    try {
        const projectsDir = path.join(__dirname, '..');
        const items = fs.readdirSync(projectsDir, { withFileTypes: true });
        const projects = items
            .filter(item => item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules')
            .map(item => ({
                name: item.name,
                path: `/${item.name}`,
                type: 'directory'
            }));
        
        res.json({
            status: 'success',
            projects: projects,
            total: projects.length
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: '无法读取项目目录',
            error: error.message
        });
    }
});

// 快捷访问webApp项目
app.get('/webapp', (req, res) => {
  res.redirect('/webApp/');
});

// CEP扩展便捷访问路由
// Green版本（已解密）
app.get('/green', (req, res) => {
  res.redirect('/webApp/adobe/ceps/com.DGsoftware.CloudHappyScriptDock-y/pages/main.html');
});

app.get('/green/:page', (req, res) => {
  const { page } = req.params;
  const pageMap = {
    'list': 'list_collect.html',
    'user': 'user_collect.html', 
    'cloud': 'cloud_collect.html',
    'me': 'me_collect.html',
    'header': 'Header.html'
  };
  
  const fileName = pageMap[page] || `${page}.html`;
  res.redirect(`/webApp/adobe/ceps/com.DGsoftware.CloudHappyScriptDock-y/pages/${fileName}`);
});

// 原版（参考）
app.get('/original', (req, res) => {
  res.redirect('/webApp/adobe/ceps/com.DGsoftware.CloudHappyScriptDock/pages/main.html');
});

app.get('/original/:page', (req, res) => {
  const { page } = req.params;
  const pageMap = {
    'list': 'list_collect.html',
    'user': 'user_collect.html',
    'cloud': 'cloud_collect.html', 
    'me': 'me_collect.html',
    'header': 'Header.html'
  };
  
  const fileName = pageMap[page] || `${page}.html`;
  res.redirect(`/webApp/adobe/ceps/com.DGsoftware.CloudHappyScriptDock/pages/${fileName}`);
});

// 处理小写 webapp 路径重定向到 webApp（仅限确实是小写的情况）
app.get('/webapp', (req, res) => {
    res.redirect('/webApp/');
});

app.get('/webapp/:project/*', (req, res) => {
    // 只处理确实是小写 webapp 开头的路径
    const filePath = req.path.replace('/webapp', '/webApp');
    res.redirect(filePath);
});

// API路由 - 服务器状态
app.get('/api/status', (req, res) => {
    res.json({
        status: 'success',
        message: 'TuringCoocin 多项目服务器运行正常',
        techStack: {
            nodejs: process.version,
            express: require('express/package.json').version,
            platform: process.platform
        },
        server: {
            version: '2.0.0',
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            timestamp: new Date().toISOString()
        },
        environment: process.env.NODE_ENV || 'development'
    });
});

// 状态信息路由（简化版本）
app.get('/status', (req, res) => {
    res.json({
        status: 'running',
        techStack: 'Node.js + Express.js',
        nodejs: process.version,
        express: require('express/package.json').version,
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
    });
});

// API路由 - 文件浏览器
app.get('/api/browse/*', (req, res) => {
    try {
        const requestPath = req.params[0] || '';
        const fullPath = path.join(__dirname, requestPath);
        
        // 安全检查 - 防止目录遍历攻击
        if (!fullPath.startsWith(__dirname)) {
            return res.status(403).json({
                status: 'error',
                message: '访问被拒绝'
            });
        }
        
        if (!fs.existsSync(fullPath)) {
            return res.status(404).json({
                status: 'error',
                message: '路径不存在'
            });
        }
        
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            const items = fs.readdirSync(fullPath, { withFileTypes: true });
            const contents = items.map(item => ({
                name: item.name,
                type: item.isDirectory() ? 'directory' : 'file',
                size: item.isFile() ? fs.statSync(path.join(fullPath, item.name)).size : null,
                modified: fs.statSync(path.join(fullPath, item.name)).mtime
            }));
            
            res.json({
                status: 'success',
                path: requestPath,
                type: 'directory',
                contents: contents
            });
        } else {
            res.json({
                status: 'success',
                path: requestPath,
                type: 'file',
                size: stat.size,
                modified: stat.mtime
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: '读取路径失败',
            error: error.message
        });
    }
});

// 健康检查路由 - 用于Vercel等平台
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404错误处理 - 返回美观的错误页面
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - 页面未找到</title>
            <style>
                body { font-family: 'Microsoft YaHei', Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
                .error-container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #e74c3c; margin-bottom: 20px; }
                p { color: #666; margin-bottom: 30px; }
                a { color: #3498db; text-decoration: none; padding: 10px 20px; background: #ecf0f1; border-radius: 5px; }
                a:hover { background: #bdc3c7; }
            </style>
        </head>
        <body>
            <div class="error-container">
                <h1>🔍 404 - 页面未找到</h1>
                <p>抱歉，您访问的页面不存在。</p>
                <p>请求路径: <code>${req.path}</code></p>
                <a href="/">🏠 返回首页</a>
                <a href="/projects" style="margin-left: 10px;">📁 浏览项目</a>
            </div>
        </body>
        </html>
    `);
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('服务器错误:', err.stack);
    res.status(500).send(`
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>500 - 服务器错误</title>
            <style>
                body { font-family: 'Microsoft YaHei', Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
                .error-container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #e74c3c; margin-bottom: 20px; }
                p { color: #666; margin-bottom: 30px; }
                a { color: #3498db; text-decoration: none; padding: 10px 20px; background: #ecf0f1; border-radius: 5px; }
                a:hover { background: #bdc3c7; }
            </style>
        </head>
        <body>
            <div class="error-container">
                <h1>⚠️ 500 - 服务器内部错误</h1>
                <p>服务器遇到了一个错误，请稍后重试。</p>
                <a href="/">🏠 返回首页</a>
            </div>
        </body>
        </html>
    `);
});

// 本地启动服务器（仅在非 Vercel 环境下）
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 服务器已启动在 http://localhost:${PORT}`);
        console.log(`📁 静态文件目录: ${path.join(__dirname, '..')}`);
        console.log(`🔧 支持的文件类型: html, htm, js, css, png, jpg, gif, svg, ico, jsx, ini`);
    });
}

// 导出 Vercel 函数
module.exports = app;