/**
 * userMain.js - 用户管理模块
 * 解密版本 - 解密时间：2025年1月24日
 * 功能：处理用户脚本收藏、管理和界面交互
 */

(function() {
    'use strict';
    
    // 初始化用户界面
    initUserInterface();
    loadUserScripts();
    
    // 添加点击事件监听器
    document.addEventListener('click', handleUserClick, false);
    
    /**
     * 处理用户点击事件
     * @param {Event} event - 点击事件对象
     */
    function handleUserClick(event) {
        try {
            var target = event.target;
            
            // 处理脚本文件点击
            if (target.className === 'jsxName') {
                if (isValidScript(target.innerHTML.toLowerCase(), '.jsx')) {
                    sendScriptFile(target.value);
                }
            } 
            // 处理脚本收藏/移除操作
            else if (target.parentElement.className === 'jsxBox2') {
                var scriptPath = target.parentElement.parentElement.children[1].value;
                
                if (isValidScript(scriptPath.toLowerCase(), '.jsx') == false) {
                    // 移除脚本收藏
                    var userPath = getUserPath();
                    var fileContent = readFileMe(userPath).trim();
                    var lines = fileContent.split('\r');
                    var currentScript = target.parentElement.parentElement.parentElement.children[1].value;
                    var newContent = '';
                    
                    for (var i = 0; i < lines.length; i++) {
                        if (lines[i].trim() != currentScript.trim()) {
                            newContent = newContent + '\r' + lines[i];
                        }
                    }
                    
                    writeFileMe(userPath, newContent.trim());
                    loadUserScripts();
                    showTipsBar('移除脚本夹|云乐脚本坞|' + H5IMG.OK);
                } else {
                    // 添加脚本收藏
                    var listPath = getListPath();
                    var listContent = readFileMe(listPath).trim();
                    var scriptEntry = '0|' + scriptPath;
                    
                    writeFileMe(listPath, listContent.trim() + '\r' + scriptEntry);
                    begRefresh();
                    showTipsBar('收藏了新的脚本|云乐脚本坞|' + H5IMG.OK);
                }
            }
        } catch (error) {
            freshPage();
        }
    }
    
    /**
     * 读取文件内容
     * @param {string} filePath - 文件路径
     * @returns {string} 文件内容
     */
    function readFile(filePath) {
        var fs = require('fs');
        var content = fs.readFileSync(filePath);
        console.log(content);
        return content;
    }
    
    /**
     * 加载用户脚本列表
     */
    function loadUserScripts() {
        var userPath = getUserPath();
        
        // 检查用户路径是否存在
        if (!PathExists(userPath)) {
            return;
        }
        
        var fileContent = readFileMe(userPath).trim();
        var lines = fileContent.split('\r');
        var listContainer = document.getElementById('listBar');
        listContainer.innerHTML = null;
        
        // 如果文件为空，直接返回
        if (fileContent === '') {
            return;
        }
        
        // 使用CSInterface获取目录文件
        csInterface.evalScript('getDirFiles(' + '\'' + userPath + '\'' + ')', function(result) {
            var fileList = JSON.parse(result);
            var groupedScripts = new Array();
            var tempGroup = new Array();
            
            tempGroup.push(fileList[0]);
            groupedScripts.push(tempGroup);
            
            // 按脚本类型分组
            for (var i = 0; i < fileList.length; i++) {
                var found = false;
                
                for (var j = 0; j < groupedScripts.length; j++) {
                    var currentType = fileList[i].split('|')[0].trim();
                    var groupType = groupedScripts[j][0].split('|')[0].trim();
                    
                    if (currentType === groupType) {
                        groupedScripts[j].push(fileList[i].trim());
                        found = true;
                        break;
                    }
                }
                
                if (found == false) {
                    var newGroup = new Array();
                    newGroup.push(fileList[i].trim());
                    groupedScripts.push(newGroup);
                }
            }
            
            // 渲染脚本组
            for (var groupIndex = 0; groupIndex < groupedScripts.length; groupIndex++) {
                var groupName = groupedScripts[groupIndex][0].split('|')[0];
                var groupDesc = groupedScripts[groupIndex][0].split('|')[1];
                
                // 创建组容器
                var groupContainer = document.createElement('div');
                groupContainer.className = 'listItem';
                groupContainer.index = groupIndex;
                listContainer.appendChild(groupContainer);
                
                // 创建组头部
                var groupHeader = document.createElement('div');
                groupHeader.className = 'listItemHead';
                groupContainer.appendChild(groupHeader);
                
                // 创建组图标容器
                var iconContainer = document.createElement('div');
                iconContainer.className = 'listItemIcon';
                groupHeader.appendChild(iconContainer);
                
                // 创建组图标
                var groupIcon = document.createElement('img');
                groupIcon.className = 'listIcon';
                groupIcon.src = './img/folder.png';
                iconContainer.appendChild(groupIcon);
                
                // 创建组标题
                var groupTitle = document.createElement('div');
                groupTitle.className = 'jsxName';
                groupTitle.innerHTML = groupName;
                groupTitle.value = groupDesc;
                groupTitle.title = groupDesc;
                groupHeader.appendChild(groupTitle);
                
                // 创建操作按钮容器
                var actionContainer = document.createElement('div');
                actionContainer.className = 'jsxBox2';
                groupHeader.appendChild(actionContainer);
                
                // 创建操作图标
                var actionIcon = document.createElement('img');
                actionIcon.className = 'jsxIcon';
                actionIcon.src = './img/add.png';
                actionContainer.appendChild(actionIcon);
                
                // 创建脚本列表容器
                var scriptsContainer = document.createElement('div');
                scriptsContainer.className = 'listItemBody';
                groupContainer.appendChild(scriptsContainer);
                
                // 渲染组内脚本
                for (var scriptIndex = 0; scriptIndex < groupedScripts[groupIndex].length; scriptIndex++) {
                    var scriptName = groupedScripts[groupIndex][scriptIndex].split('|')[0];
                    var scriptDesc = groupedScripts[groupIndex][scriptIndex].split('|')[1];
                    var scriptPath = groupedScripts[groupIndex][scriptIndex].split('|')[2];
                    
                    if (scriptPath == '') {
                        continue;
                    }
                    
                    // 创建脚本项
                    var scriptItem = document.createElement('div');
                    scriptItem.className = 'listItemSub';
                    scriptsContainer.appendChild(scriptItem);
                    
                    // 创建脚本图标容器
                    var scriptIconContainer = document.createElement('div');
                    scriptIconContainer.className = 'listItemIcon';
                    scriptItem.appendChild(scriptIconContainer);
                    
                    // 创建脚本图标
                    var scriptIcon = document.createElement('img');
                    scriptIcon.className = 'listIconSub';
                    scriptIcon.src = './img/jsx.png';
                    scriptIconContainer.appendChild(scriptIcon);
                    
                    // 创建脚本名称
                    var scriptNameElement = document.createElement('div');
                    scriptNameElement.className = 'jsxName';
                    scriptNameElement.innerHTML = getFileName(scriptPath);
                    scriptNameElement.value = scriptPath;
                    scriptNameElement.title = scriptPath;
                    scriptItem.appendChild(scriptNameElement);
                    
                    // 创建脚本操作容器
                    var scriptActionContainer = document.createElement('div');
                    scriptActionContainer.className = 'jsxBox2';
                    scriptItem.appendChild(scriptActionContainer);
                    
                    // 创建脚本操作图标
                    var scriptActionIcon = document.createElement('img');
                    scriptActionIcon.className = 'jsxIcon';
                    scriptActionIcon.src = './img/del.png';
                    scriptActionContainer.appendChild(scriptActionIcon);
                }
            }
        });
    }
    
    /**
     * 初始化用户界面
     */
    function initUserInterface() {
        $('#addUserScript').click(function() {
            try {
                var userPath = getUserPath();
                var currentContent = readFileMe(userPath).trim();
                var dialog = window.cep.fs.showOpenDialog(false, true, '选择脚本文件夹', null, null);
                
                if (dialog.data != '') {
                    var isDuplicate = false;
                    var existingLines = currentContent.split('\r');
                    
                    // 检查是否已存在
                    for (var i = 0; i < existingLines.length; i++) {
                        if (existingLines[i].trim() == dialog.data) {
                            isDuplicate = true;
                        }
                    }
                    
                    if (isDuplicate) {
                        showTipsBar('脚本夹已存在|云乐脚本坞|' + H5IMG.TIP);
                        return;
                    } else {
                        writeFileMe(userPath, currentContent + '\r' + dialog.data);
                        loadUserScripts();
                        showTipsBar('加入了新的脚本夹|云乐脚本坞|' + H5IMG.OK);
                    }
                } else {
                    showTipsBar('请选择脚本文件夹|云乐脚本坞|' + H5IMG.TIP);
                }
            } catch (error) {
                // 处理错误
            }
        });
    }
    
})();