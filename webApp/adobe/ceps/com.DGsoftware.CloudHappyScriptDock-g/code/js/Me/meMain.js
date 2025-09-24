/**
 * meMain.js - 个人中心主模块
 * 解密版本 - 解密时间：2025年1月24日
 * 功能：处理个人中心页面的初始化和交互逻辑
 */

(function() {
    'use strict';
    
    /**
     * 初始化个人中心页面
     */
    function initMePage() {
        // 绑定版权信息点击事件
        bindCopyrightClick();
        
        // 绑定个人中心按钮点击事件
        document.addEventListener('click', handleMePageClick, false);
    }
    
    /**
     * 处理个人中心页面点击事件
     * @param {Event} event - 点击事件对象
     */
    function handleMePageClick(event) {
        var target = event.target;
        
        // 检查是否点击了非个人中心相关元素
        if (target.className !== 'me-page-element') {
            showTipsBar('图灵柯信|云乐脚本坞 · 版权|' + H5IMG['TCLOGO']);
        }
    }
    
    /**
     * 绑定版权信息点击事件
     */
    function bindCopyrightClick() {
        // 使用jQuery绑定点击事件
        $('#copyright-info').click(function() {
            // 打开CEP应用网页
            cepAppWebPage();
        });
    }
    
    /**
     * 显示个人信息
     */
    function showPersonalInfo() {
        var userInfo = {
            name: '图灵柯信',
            location: '湖南长沙',
            contact: 'QQ: 3314778163',
            email: 'fa.ardieska@gmail.com',
            website: 'localhost:3000'
        };
        
        var infoHtml = '<div class="personal-info">' +
                      '<h3>开发者信息</h3>' +
                      '<p><strong>姓名：</strong>' + userInfo.name + '</p>' +
                      '<p><strong>地址：</strong>' + userInfo.location + '</p>' +
                      '<p><strong>联系：</strong>' + userInfo.contact + '</p>' +
                      '<p><strong>邮箱：</strong>' + userInfo.email + '</p>' +
                      '<p><strong>网站：</strong>' + userInfo.website + '</p>' +
                      '</div>';
        
        showTipsBar(infoHtml);
    }
    
    /**
     * 显示软件信息
     */
    function showSoftwareInfo() {
        var softwareInfo = {
            name: '云乐脚本坞',
            version: '1.0.0',
            description: '专为Adobe软件设计的脚本管理工具',
            features: [
                '脚本收藏管理',
                '一键执行脚本',
                '云端同步功能',
                '用户界面友好'
            ]
        };
        
        var featuresHtml = softwareInfo.features.map(function(feature) {
            return '<li>' + feature + '</li>';
        }).join('');
        
        var infoHtml = '<div class="software-info">' +
                      '<h3>' + softwareInfo.name + '</h3>' +
                      '<p><strong>版本：</strong>' + softwareInfo.version + '</p>' +
                      '<p><strong>描述：</strong>' + softwareInfo.description + '</p>' +
                      '<p><strong>主要功能：</strong></p>' +
                      '<ul>' + featuresHtml + '</ul>' +
                      '</div>';
        
        showTipsBar(infoHtml);
    }
    
    /**
     * 处理用户反馈
     */
    function handleUserFeedback() {
        showInputDialog(
            '请输入您的反馈意见：',
            '',
            function(feedback) {
                if (feedback.trim()) {
                    // 发送反馈到服务器
                    sendFeedbackToServer(feedback);
                    showSuccessAlert('感谢您的反馈！我们会认真考虑您的建议。');
                } else {
                    showWarningAlert('请输入有效的反馈内容。');
                }
            },
            function() {
                // 用户取消反馈
                console.log('用户取消了反馈');
            }
        );
    }
    
    /**
     * 发送反馈到服务器
     * @param {string} feedback - 反馈内容
     */
    function sendFeedbackToServer(feedback) {
        var feedbackData = {
            content: feedback,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            extensionId: idName
        };
        
        // 这里可以添加实际的服务器通信逻辑
        console.log('发送反馈：', feedbackData);
        
        // 模拟发送成功
        setTimeout(function() {
            console.log('反馈发送成功');
        }, 1000);
    }
    
    /**
     * 检查更新
     */
    function checkForUpdates() {
        showInfoAlert('正在检查更新...');
        
        // 模拟检查更新过程
        setTimeout(function() {
            var hasUpdate = Math.random() > 0.7; // 30%概率有更新
            
            if (hasUpdate) {
                showConfirmDialog(
                    '发现新版本！是否立即更新？',
                    function() {
                        showInfoAlert('开始下载更新...');
                        // 这里可以添加实际的更新逻辑
                    },
                    function() {
                        showInfoAlert('您选择了稍后更新。');
                    }
                );
            } else {
                showSuccessAlert('当前已是最新版本！');
            }
        }, 2000);
    }
    
    // 页面加载完成后初始化
    initMePage();
    
    // 导出公共方法
    window.MePage = {
        showPersonalInfo: showPersonalInfo,
        showSoftwareInfo: showSoftwareInfo,
        handleUserFeedback: handleUserFeedback,
        checkForUpdates: checkForUpdates
    };
    
})();