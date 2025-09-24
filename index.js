/**
 * 图灵烹饪在线网站 - 主入口文件
 * 
 * 这个文件作为 Vercel 部署的入口点，导入并导出位于 api 目录中的 Express 应用
 * 
 * 功能说明：
 * - 作为 Vercel 无服务器函数的入口点
 * - 导入 Express 框架和配置好的应用
 * - 确保静态文件和 API 路由正常工作
 * 
 * @author TuringCoocin
 * @version 1.0.0
 */

// 导入 Express 框架（Vercel 检测需要）
const express = require('express');

// 导入位于 api 目录中的配置好的 Express 应用
const app = require('./api/server');

// 导出应用供 Vercel 使用
module.exports = app;