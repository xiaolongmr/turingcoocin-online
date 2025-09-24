/**
 * 列表页面主要逻辑
 * 处理脚本收藏列表的显示、搜索、删除等功能
 */

(function() {
    'use strict';
    
    // 初始化页面
    initializeSearch();
    refreshPage();
    
    // 添加点击事件监听器
    document.addEventListener('click', handleClick, false);
    
    // 监听CEP事件
    csInterface.addEventListener(EVENTS.REFRESH_LIST, handleRefreshEvent);
    
    /**
     * 处理刷新事件
     * @param {Object} event - 事件对象
     */
    function handleRefreshEvent(event) {
        refreshPage();
    }
    
    /**
     * 处理点击事件
     * @param {Event} clickEvent - 点击事件对象
     */
    function handleClick(clickEvent) {
        try {
            var target = clickEvent.target;
            
            // 处理脚本执行按钮点击
            if (target.className === 'jsxName') {
                var scriptType = target.value.split('|')[0];
                var scriptPath = target.value.split('|')[1];
                
                if (Number(scriptType) === 0) {
                    // 发送脚本文件
                    sendScriptFile(scriptPath);
                } else if (Number(scriptType) === 1) {
                    // Web脚本需要转换为完整URL，使用统一配置管理
                    var fullScriptUrl = AppConfig.relativePathToUrl(scriptPath);
                    runWebJsx(fullScriptUrl);
                }
            }
            // 处理删除按钮点击
            else if (target.parentElement.className === 'jsxIcon') {
                var scriptData = target.parentElement.parentElement.children[1].innerHTML;
                var listPath = getListPath();
                var fileContent = readFileMe(listPath).trim();
                var lines = fileContent.split('\r');
                var targetIndex = target.parentElement.parentElement.index;
                var newContent = '';
                
                // 重新构建文件内容，排除要删除的行
                for (var i = 0; i < lines.length; i++) {
                    if (i != targetIndex) {
                        newContent = newContent + '\r' + lines[i];
                    }
                }
                
                // 写入更新后的内容
                writeFileMe(listPath, newContent.trim());
                refreshPage();
                showTipsBar('删除成功|云乐脚本坞|' + H5IMG['logo']);
            }
        } catch (error) {
            alert(error.message);
        }
    }
    
    /**
     * 刷新页面内容
     * 重新加载和显示脚本列表
     */
    function refreshPage() {
        try {
            var listPath = getListPath();
            
            // 检查列表文件是否存在
            if (!PathExists(listPath)) {
                showTipsBar('未收藏任何脚本，请添加|云乐脚本坞|' + H5IMG['logo']);
                return;
            }
            
            var fileContent = readFileMe(listPath).trim();
            
            // 如果文件为空
            if (fileContent == '') {
                showTipsBar('未收藏任何脚本，请添加|云乐脚本坞|' + H5IMG['logo']);
            }
            
            var lines = fileContent.split('\r');
            var listContainer = document.getElementById('listBar');
            listContainer.innerHTML = null;
            
            // 遍历每一行，创建列表项
            for (var i = 0; i < lines.length; i++) {
                var scriptType = lines[i].split('|')[0];
                var scriptPath = lines[i].split('|')[1];
                var fileName = getFileName(scriptPath);
                
                // 创建主容器
                var itemContainer = document.createElement('div');
                itemContainer.className = 'jsxBar topcoat-button jsxNewName';
                itemContainer.index = i;
                listContainer.appendChild(itemContainer);
                
                // 创建左侧区域
                var leftArea = document.createElement('div');
                leftArea.className = 'jsxLeft';
                itemContainer.appendChild(leftArea);
                
                // 创建文件图标
                var fileIcon = document.createElement('img');
                fileIcon.className = 'folerIcon';
                fileIcon.src = '../images/file.svg';
                leftArea.appendChild(fileIcon);
                
                // 创建脚本名称按钮
                var nameButton = document.createElement('div');
                nameButton.className = 'jsxName';
                nameButton.innerHTML = fileName;
                nameButton.value = lines[i];
                
                if (Number(scriptType) == 0) {
                    nameButton.title = scriptPath;
                }
                
                itemContainer.appendChild(nameButton);
                
                // 创建右侧区域
                var rightArea = document.createElement('div');
                rightArea.className = 'jsxRight';
                itemContainer.appendChild(rightArea);
                
                // 创建删除图标
                var deleteIcon = document.createElement('img');
                deleteIcon.className = 'jsxIcon';
                deleteIcon.src = '../images/local.svg';
                rightArea.appendChild(deleteIcon);
            }
        } catch (error) {
            // 错误处理
        }
    }
    
    /**
     * 初始化搜索功能
     * 为搜索框添加输入事件监听器
     */
    function initializeSearch() {
        $('#serm').on('input', function() {
            var searchInput = document.getElementById('serm');
            var listItems = document.getElementsByClassName('jsxBar');
            
            // 遍历所有列表项，根据搜索关键字显示/隐藏
            for (var i = 0; i < listItems.length; i++) {
                var item = listItems[i];
                
                // 检查脚本名称是否包含搜索关键字
                if (isBaoHan(item.children[1].innerHTML, searchInput.value) || searchInput.value === '') {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }
    
})();