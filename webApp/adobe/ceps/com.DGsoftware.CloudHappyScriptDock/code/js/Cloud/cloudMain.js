/**
 * 云端脚本页面主逻辑 - 解密版
 * 已修复硬编码路径问题，使用统一配置管理
 */
(function() {
    'use strict';
    
    // 初始化云端页面
    initCloudPage();
    
    // 绑定上传按钮事件
    bindUploadEvent();
    
    // 绑定点击事件
    document.addEventListener('click', handleClick, false);
    
    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        initCloudPage();
    });
    
    /**
     * 处理点击事件
     * @param {Event} event 点击事件
     */
    function handleClick(event) {
        try {
            var target = event.target;
            
            // 处理脚本执行
            if (target.className === 'jsxBox1') {
                if (isBaoHan(target.value.toLowerCase(), '.jsx')) {
                    runWebJsx(target.value);
                }
            } 
            // 处理脚本收藏
            else if (target.parentElement.className === 'jsxBox2') {
                var scriptName = target.parentElement.parentElement.children[1].innerHTML;
                var scriptPath = target.parentElement.parentElement.children[1].value;
                
                if (isBaoHan(scriptName.toLowerCase(), '.jsx')) {
                    var listPath = getListPath();
                    var listContent = readFileMe(listPath).trim();
                    
                    // 使用统一配置将完整URL转换为相对路径
                    var relativePath = AppConfig.urlToRelativePath(scriptPath);
                    
                    var scriptEntry = '1|' + relativePath;
                    writeFileMe(listPath, listContent.trim() + '\r' + scriptEntry);
                    begRefresh();
                    showTipsBar('收藏新脚本|云乐脚本坞|' + H5IMG['OK']);
                }
            }
        } catch (e) {
            // 静默处理错误
        }
    }
    
    /**
     * 初始化云端页面
     * 加载并显示脚本列表
     */
    function initCloudPage() {
        // 使用统一配置设置API URL
        var apiUrl = AppConfig.getBaseUrl() + 'dir.ini';
        
        // 设置全局变量以保持向后兼容
        if (typeof httpT === 'undefined') {
            window.httpT = AppConfig.getBaseUrl();
        }
        
        var listContainer = document.getElementById('listBar');
        if (!listContainer) return;
        listContainer.innerHTML = null;
        
        // 设置Ajax缓存
        $.ajaxSetup({cache: false});
        
        // 请求脚本列表数据
        $.ajax({
            url: apiUrl,
            success: function(data) {
                var content = data.trim();
                var lines = content.split('\r');
                var groupedScripts = new Array();
                var tempGroup = new Array();
                
                // 初始化第一组
                tempGroup.push(lines[0]);
                groupedScripts.push(tempGroup);
                
                // 按文件夹分组脚本
                for (var i = 1; i < lines.length; i++) {
                    var found = false;
                    
                    for (var j = 0; j < groupedScripts.length; j++) {
                        var currentFolder = lines[i].split('|')[0].trim();
                        var groupFolder = groupedScripts[j][0].split('|')[0].trim();
                        
                        if (currentFolder === groupFolder) {
                            groupedScripts[j].push(lines[i].trim());
                            found = true;
                            break;
                        }
                    }
                    
                    if (found == false) {
                        var newGroup = new Array();
                        newGroup.push(lines[i].trim());
                        groupedScripts.push(newGroup);
                    }
                }
                
                // 渲染分组后的脚本列表
                for (var k = 0; k < groupedScripts.length; k++) {
                    var folderName = groupedScripts[k][0].split('|')[0];
                    
                    // 创建文件夹容器
                    var folderDiv = document.createElement('div');
                    folderDiv.className = 'sum';
                    folderDiv.index = k;
                    listContainer.appendChild(folderDiv);
                    
                    // 创建文件夹头部
                    var folderHeader = document.createElement('div');
                    folderHeader.className = 'jsxBar topcoat-button folderName';
                    folderDiv.appendChild(folderHeader);
                    
                    // 文件夹图标容器
                    var iconContainer = document.createElement('div');
                    iconContainer.className = 'jsxBox0';
                    folderHeader.appendChild(iconContainer);
                    
                    // 文件夹图标
                    var folderIcon = document.createElement('img');
                    folderIcon.className = 'folderIcon';
                    folderIcon.src = '../images/folder1.svg';
                    iconContainer.appendChild(folderIcon);
                    
                    // 文件夹名称
                    var folderNameDiv = document.createElement('div');
                    folderNameDiv.className = 'jsxBox1';
                    folderNameDiv.innerHTML = folderName;
                    folderHeader.appendChild(folderNameDiv);
                    
                    // 文件夹操作区域
                    var folderActions = document.createElement('div');
                    folderActions.className = 'jsxBox2';
                    folderHeader.appendChild(folderActions);
                    
                    // 脚本列表容器
                    var scriptsContainer = document.createElement('div');
                    scriptsContainer.className = 'subJsxName hideElem';
                    folderDiv.appendChild(scriptsContainer);
                    
                    // 渲染文件夹中的脚本
                    for (var m = 0; m < groupedScripts[k].length; m++) {
                        var scriptFolder = groupedScripts[k][m].split('|')[0];
                        var scriptName = groupedScripts[k][m].split('|')[1] + '.jsx';
                        var scriptType = groupedScripts[k][m].split('|')[2];
                        var scriptVersion = groupedScripts[k][m].split('|')[3];
                        var scriptTitle = groupedScripts[k][m].split('|')[4];
                        
                        // 使用统一配置生成脚本URL
                        var scriptUrl = AppConfig.buildScriptUrl(scriptFolder, scriptName);
                        
                        // 创建脚本项
                        var scriptHeader = document.createElement('div');
                        scriptHeader.className = 'jsxBar JsxName topcoat-button jsxNewName';
                        scriptHeader.setAttribute('data-script-folder', scriptFolder);
                        scriptHeader.setAttribute('data-script-name', scriptName);
                        scriptsContainer.appendChild(scriptHeader);
                        
                        // 脚本图标容器
                        var scriptIconContainer = document.createElement('div');
                        scriptIconContainer.className = 'jsxBox0';
                        scriptHeader.appendChild(scriptIconContainer);
                        
                        // 脚本图标
                        var scriptIcon = document.createElement('img');
                        scriptIcon.className = 'folderIcon';
                        scriptIcon.src = '../images/file.svg';
                        scriptIconContainer.appendChild(scriptIcon);
                        
                        // 脚本名称和URL
                        var scriptNameDiv = document.createElement('div');
                        scriptNameDiv.className = 'jsxBox1';
                        scriptNameDiv.innerHTML = scriptName;
                        scriptNameDiv.value = scriptUrl;
                        scriptNameDiv.title = scriptTitle;
                        scriptNameDiv.setAttribute('data-script-url', scriptUrl);
                        scriptNameDiv.setAttribute('data-relative-path', AppConfig.urlToRelativePath(scriptUrl));
                        scriptHeader.appendChild(scriptNameDiv);
                        
                        // 脚本操作区域
                        var scriptActions = document.createElement('div');
                        scriptActions.className = 'jsxBox2';
                        scriptHeader.appendChild(scriptActions);
                        
                        // 收藏按钮
                        var favoriteIcon = document.createElement('img');
                        favoriteIcon.className = 'jsxIcon';
                        favoriteIcon.src = '../images/add.svg';
                        scriptActions.appendChild(favoriteIcon);
                    }
                }
            },
            error: function(xhr, status, error) {
                // 静默处理错误
            }
        });
    }
    
    /**
     * 绑定上传按钮事件
     */
    function bindUploadEvent() {
        $('#upLoadJsx').click(function() {
            try {
                // 使用统一配置处理上传功能
                handleUploadScript();
            } catch (e) {
                // 静默处理错误
                showTipsBar('上传功能暂时不可用|云乐脚本坞|' + H5IMG['ERR']);
            }
        });
    }
    
    /**
     * 处理脚本上传
     */
    function handleUploadScript() {
        // 打开文件选择对话框
        if (typeof CSInterface !== 'undefined') {
            var csInterface = new CSInterface();
            csInterface.evalScript('openFileDialog()', function(result) {
                if (result && result !== 'null') {
                    uploadScriptFile(result);
                }
            });
        } else {
            showTipsBar('此功能暂未开放|云乐脚本坞|' + H5IMG['ERR']);
        }
    }
    
    /**
     * 上传脚本文件
     */
    function uploadScriptFile(filePath) {
        var apiUrl = AppConfig.getBaseUrl();
        
        // 读取文件内容并上传
        $.ajax({
            url: apiUrl + 'api/upload',
            method: 'POST',
            data: {
                filePath: filePath
            },
            success: function(data) {
                showTipsBar('脚本上传成功|云乐脚本坞|' + H5IMG['OK']);
                // 刷新脚本列表
                initCloudPage();
            },
            error: function(xhr, status, error) {
                showTipsBar('脚本上传失败|云乐脚本坞|' + H5IMG['ERR']);
            }
        });
    }
})();