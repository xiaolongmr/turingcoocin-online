/**
 * cepAlert.js - CEP弹窗提示模块
 * 解密版本 - 解密时间：2025年1月24日
 * 功能：提供各种类型的弹窗提示功能
 */

/**
 * 显示成功提示弹窗
 * @param {string} message - 提示消息内容
 * @param {number} duration - 显示持续时间（毫秒）
 */
function showSuccessAlert(message, duration) {
    duration = duration || 3000;
    
    var alertDiv = document.createElement('div');
    alertDiv.className = 'cep-alert success';
    alertDiv.innerHTML = '<i class="icon-success"></i>' + message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(function() {
        alertDiv.style.opacity = '0';
        setTimeout(function() {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 300);
    }, duration);
}

/**
 * 显示错误提示弹窗
 * @param {string} message - 错误消息内容
 * @param {number} duration - 显示持续时间（毫秒）
 */
function showErrorAlert(message, duration) {
    duration = duration || 5000;
    
    var alertDiv = document.createElement('div');
    alertDiv.className = 'cep-alert error';
    alertDiv.innerHTML = '<i class="icon-error"></i>' + message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(function() {
        alertDiv.style.opacity = '0';
        setTimeout(function() {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 300);
    }, duration);
}

/**
 * 显示警告提示弹窗
 * @param {string} message - 警告消息内容
 * @param {number} duration - 显示持续时间（毫秒）
 */
function showWarningAlert(message, duration) {
    duration = duration || 4000;
    
    var alertDiv = document.createElement('div');
    alertDiv.className = 'cep-alert warning';
    alertDiv.innerHTML = '<i class="icon-warning"></i>' + message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(function() {
        alertDiv.style.opacity = '0';
        setTimeout(function() {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 300);
    }, duration);
}

/**
 * 显示信息提示弹窗
 * @param {string} message - 信息内容
 * @param {number} duration - 显示持续时间（毫秒）
 */
function showInfoAlert(message, duration) {
    duration = duration || 3000;
    
    var alertDiv = document.createElement('div');
    alertDiv.className = 'cep-alert info';
    alertDiv.innerHTML = '<i class="icon-info"></i>' + message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(function() {
        alertDiv.style.opacity = '0';
        setTimeout(function() {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 300);
    }, duration);
}

/**
 * 显示确认对话框
 * @param {string} message - 确认消息内容
 * @param {function} onConfirm - 确认回调函数
 * @param {function} onCancel - 取消回调函数
 */
function showConfirmDialog(message, onConfirm, onCancel) {
    var overlay = document.createElement('div');
    overlay.className = 'cep-overlay';
    
    var dialog = document.createElement('div');
    dialog.className = 'cep-dialog confirm';
    dialog.innerHTML = 
        '<div class="dialog-header">确认</div>' +
        '<div class="dialog-content">' + message + '</div>' +
        '<div class="dialog-buttons">' +
            '<button class="btn-cancel">取消</button>' +
            '<button class="btn-confirm">确认</button>' +
        '</div>';
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    // 绑定事件
    var cancelBtn = dialog.querySelector('.btn-cancel');
    var confirmBtn = dialog.querySelector('.btn-confirm');
    
    cancelBtn.onclick = function() {
        document.body.removeChild(overlay);
        if (onCancel) onCancel();
    };
    
    confirmBtn.onclick = function() {
        document.body.removeChild(overlay);
        if (onConfirm) onConfirm();
    };
    
    // 点击遮罩层关闭
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
            if (onCancel) onCancel();
        }
    };
}

/**
 * 显示输入对话框
 * @param {string} message - 提示消息
 * @param {string} defaultValue - 默认值
 * @param {function} onConfirm - 确认回调函数
 * @param {function} onCancel - 取消回调函数
 */
function showInputDialog(message, defaultValue, onConfirm, onCancel) {
    var overlay = document.createElement('div');
    overlay.className = 'cep-overlay';
    
    var dialog = document.createElement('div');
    dialog.className = 'cep-dialog input';
    dialog.innerHTML = 
        '<div class="dialog-header">输入</div>' +
        '<div class="dialog-content">' +
            '<p>' + message + '</p>' +
            '<input type="text" class="input-field" value="' + (defaultValue || '') + '">' +
        '</div>' +
        '<div class="dialog-buttons">' +
            '<button class="btn-cancel">取消</button>' +
            '<button class="btn-confirm">确认</button>' +
        '</div>';
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    var inputField = dialog.querySelector('.input-field');
    var cancelBtn = dialog.querySelector('.btn-cancel');
    var confirmBtn = dialog.querySelector('.btn-confirm');
    
    // 自动聚焦输入框
    setTimeout(function() {
        inputField.focus();
        inputField.select();
    }, 100);
    
    cancelBtn.onclick = function() {
        document.body.removeChild(overlay);
        if (onCancel) onCancel();
    };
    
    confirmBtn.onclick = function() {
        var value = inputField.value;
        document.body.removeChild(overlay);
        if (onConfirm) onConfirm(value);
    };
    
    // 回车键确认
    inputField.onkeydown = function(e) {
        if (e.keyCode === 13) {
            confirmBtn.click();
        } else if (e.keyCode === 27) {
            cancelBtn.click();
        }
    };
    
    // 点击遮罩层关闭
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
            if (onCancel) onCancel();
        }
    };
}

/**
 * 关闭所有弹窗
 */
function closeAllAlerts() {
    var alerts = document.querySelectorAll('.cep-alert');
    for (var i = 0; i < alerts.length; i++) {
        if (alerts[i].parentNode) {
            alerts[i].parentNode.removeChild(alerts[i]);
        }
    }
    
    var overlays = document.querySelectorAll('.cep-overlay');
    for (var j = 0; j < overlays.length; j++) {
        if (overlays[j].parentNode) {
            overlays[j].parentNode.removeChild(overlays[j]);
        }
    }
}