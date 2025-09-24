/**
 * menuFlyout.js - 菜单弹出层模块
 * 解密版本 - 解密时间：2025年1月24日
 * 功能：处理右键菜单和弹出菜单的显示与交互
 */

/**
 * 创建右键菜单
 * @param {Array} menuItems - 菜单项数组
 * @param {number} x - 鼠标X坐标
 * @param {number} y - 鼠标Y坐标
 */
function createContextMenu(menuItems, x, y) {
    // 移除已存在的菜单
    removeExistingMenu();
    
    var menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.position = 'fixed';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.style.zIndex = '9999';
    
    menuItems.forEach(function(item) {
        if (item.separator) {
            var separator = document.createElement('div');
            separator.className = 'menu-separator';
            menu.appendChild(separator);
        } else {
            var menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            if (item.disabled) {
                menuItem.className += ' disabled';
            }
            
            menuItem.innerHTML = '<span class="menu-icon">' + (item.icon || '') + '</span>' +
                                '<span class="menu-text">' + item.text + '</span>' +
                                '<span class="menu-shortcut">' + (item.shortcut || '') + '</span>';
            
            if (!item.disabled && item.action) {
                menuItem.onclick = function() {
                    item.action();
                    removeExistingMenu();
                };
            }
            
            menu.appendChild(menuItem);
        }
    });
    
    document.body.appendChild(menu);
    
    // 调整菜单位置，防止超出屏幕
    adjustMenuPosition(menu, x, y);
    
    // 点击其他地方关闭菜单
    setTimeout(function() {
        document.addEventListener('click', closeMenuHandler);
        document.addEventListener('contextmenu', closeMenuHandler);
    }, 10);
}

/**
 * 移除已存在的菜单
 */
function removeExistingMenu() {
    var existingMenu = document.querySelector('.context-menu');
    if (existingMenu) {
        existingMenu.parentNode.removeChild(existingMenu);
    }
    document.removeEventListener('click', closeMenuHandler);
    document.removeEventListener('contextmenu', closeMenuHandler);
}

/**
 * 关闭菜单处理函数
 */
function closeMenuHandler(e) {
    var menu = document.querySelector('.context-menu');
    if (menu && !menu.contains(e.target)) {
        removeExistingMenu();
    }
}

/**
 * 调整菜单位置
 * @param {Element} menu - 菜单元素
 * @param {number} x - 原始X坐标
 * @param {number} y - 原始Y坐标
 */
function adjustMenuPosition(menu, x, y) {
    var rect = menu.getBoundingClientRect();
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    // 调整X坐标
    if (x + rect.width > windowWidth) {
        x = windowWidth - rect.width - 10;
    }
    if (x < 0) {
        x = 10;
    }
    
    // 调整Y坐标
    if (y + rect.height > windowHeight) {
        y = windowHeight - rect.height - 10;
    }
    if (y < 0) {
        y = 10;
    }
    
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
}

/**
 * 创建下拉菜单
 * @param {Element} trigger - 触发元素
 * @param {Array} menuItems - 菜单项数组
 * @param {string} position - 菜单位置 ('bottom', 'top', 'left', 'right')
 */
function createDropdownMenu(trigger, menuItems, position) {
    position = position || 'bottom';
    
    // 移除已存在的下拉菜单
    removeDropdownMenu();
    
    var dropdown = document.createElement('div');
    dropdown.className = 'dropdown-menu';
    dropdown.style.position = 'absolute';
    dropdown.style.zIndex = '9998';
    
    menuItems.forEach(function(item) {
        if (item.separator) {
            var separator = document.createElement('div');
            separator.className = 'menu-separator';
            dropdown.appendChild(separator);
        } else {
            var menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            if (item.disabled) {
                menuItem.className += ' disabled';
            }
            
            menuItem.innerHTML = '<span class="menu-icon">' + (item.icon || '') + '</span>' +
                                '<span class="menu-text">' + item.text + '</span>';
            
            if (!item.disabled && item.action) {
                menuItem.onclick = function() {
                    item.action();
                    removeDropdownMenu();
                };
            }
            
            dropdown.appendChild(menuItem);
        }
    });
    
    document.body.appendChild(dropdown);
    
    // 设置下拉菜单位置
    setDropdownPosition(dropdown, trigger, position);
    
    // 点击其他地方关闭菜单
    setTimeout(function() {
        document.addEventListener('click', closeDropdownHandler);
    }, 10);
}

/**
 * 设置下拉菜单位置
 * @param {Element} dropdown - 下拉菜单元素
 * @param {Element} trigger - 触发元素
 * @param {string} position - 位置
 */
function setDropdownPosition(dropdown, trigger, position) {
    var triggerRect = trigger.getBoundingClientRect();
    var dropdownRect = dropdown.getBoundingClientRect();
    
    var x, y;
    
    switch (position) {
        case 'top':
            x = triggerRect.left;
            y = triggerRect.top - dropdownRect.height;
            break;
        case 'left':
            x = triggerRect.left - dropdownRect.width;
            y = triggerRect.top;
            break;
        case 'right':
            x = triggerRect.right;
            y = triggerRect.top;
            break;
        case 'bottom':
        default:
            x = triggerRect.left;
            y = triggerRect.bottom;
            break;
    }
    
    // 调整位置防止超出屏幕
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    if (x + dropdownRect.width > windowWidth) {
        x = windowWidth - dropdownRect.width - 10;
    }
    if (x < 0) {
        x = 10;
    }
    
    if (y + dropdownRect.height > windowHeight) {
        y = windowHeight - dropdownRect.height - 10;
    }
    if (y < 0) {
        y = 10;
    }
    
    dropdown.style.left = x + 'px';
    dropdown.style.top = y + 'px';
}

/**
 * 移除下拉菜单
 */
function removeDropdownMenu() {
    var existingDropdown = document.querySelector('.dropdown-menu');
    if (existingDropdown) {
        existingDropdown.parentNode.removeChild(existingDropdown);
    }
    document.removeEventListener('click', closeDropdownHandler);
}

/**
 * 关闭下拉菜单处理函数
 */
function closeDropdownHandler(e) {
    var dropdown = document.querySelector('.dropdown-menu');
    if (dropdown && !dropdown.contains(e.target)) {
        // 检查是否点击了触发元素
        var trigger = document.querySelector('[data-dropdown-trigger]');
        if (!trigger || !trigger.contains(e.target)) {
            removeDropdownMenu();
        }
    }
}

/**
 * 创建工具提示
 * @param {Element} element - 目标元素
 * @param {string} text - 提示文本
 * @param {string} position - 位置 ('top', 'bottom', 'left', 'right')
 */
function createTooltip(element, text, position) {
    position = position || 'top';
    
    var tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.position = 'absolute';
    tooltip.style.zIndex = '10000';
    
    document.body.appendChild(tooltip);
    
    var elementRect = element.getBoundingClientRect();
    var tooltipRect = tooltip.getBoundingClientRect();
    
    var x, y;
    
    switch (position) {
        case 'bottom':
            x = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
            y = elementRect.bottom + 5;
            break;
        case 'left':
            x = elementRect.left - tooltipRect.width - 5;
            y = elementRect.top + (elementRect.height - tooltipRect.height) / 2;
            break;
        case 'right':
            x = elementRect.right + 5;
            y = elementRect.top + (elementRect.height - tooltipRect.height) / 2;
            break;
        case 'top':
        default:
            x = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
            y = elementRect.top - tooltipRect.height - 5;
            break;
    }
    
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
    
    return tooltip;
}

/**
 * 移除工具提示
 * @param {Element} tooltip - 工具提示元素
 */
function removeTooltip(tooltip) {
    if (tooltip && tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
    }
}

/**
 * 初始化菜单系统
 */
function initMenuSystem() {
    // 阻止默认右键菜单
    document.addEventListener('contextmenu', function(e) {
        var target = e.target;
        if (target.hasAttribute('data-context-menu')) {
            e.preventDefault();
            return false;
        }
    });
    
    // 处理下拉菜单触发器
    document.addEventListener('click', function(e) {
        var trigger = e.target.closest('[data-dropdown-trigger]');
        if (trigger) {
            e.preventDefault();
            e.stopPropagation();
            
            var menuData = trigger.getAttribute('data-dropdown-menu');
            if (menuData) {
                try {
                    var menuItems = JSON.parse(menuData);
                    var position = trigger.getAttribute('data-dropdown-position') || 'bottom';
                    createDropdownMenu(trigger, menuItems, position);
                } catch (error) {
                    console.error('Invalid menu data:', error);
                }
            }
        }
    });
}