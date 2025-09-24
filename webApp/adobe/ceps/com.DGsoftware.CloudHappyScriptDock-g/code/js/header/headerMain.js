/**
 * Header页面主要逻辑
 * 处理头部页面的事件监听和交互
 */

(function() {
    'use strict';
    
    // 添加DOMContentLoaded事件监听器
    document.addEventListener('DOMContentLoaded', initializeHeader, false);
    
    /**
     * 初始化头部页面
     * 显示欢迎提示信息
     */
    function initializeHeader(event) {
        // 显示提示栏，包含欢迎信息和图标
        showTipsBar('欢迎使用云乐脚本坞|' + H5IMG['logo']);
    }
    
})();