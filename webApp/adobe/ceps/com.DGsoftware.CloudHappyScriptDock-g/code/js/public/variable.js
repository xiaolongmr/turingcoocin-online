/**
 * variable.js - 全局变量定义模块
 * 解密版本 - 解密时间：2025年1月24日
 * 功能：定义全局变量和CSInterface实例
 */

// 创建CSInterface实例，用于与CEP环境通信
var csInterface = new CSInterface();

// 脚本评估变量，用于存储脚本执行结果
var csevalScript = null;

// 获取扩展ID
var idName = window.__adobe_cep__.getExtensionId();

// 试用版标识
var trial = true;

// HTTP服务器地址
var httpT = 'http://wwww.z-l.top/webApp/adobe/com.DGsoftware.CloudHappyScriptDock/PHXS/';

/**
 * 调试保护函数
 * 防止代码被调试和逆向工程
 */
function debugProtection(counter) {
    function checkDebugger(value) {
        if (typeof value === 'string') {
            return function(arg) {}
                .constructor('while (true) {}')
                .apply('counter');
        } else {
            if (('' + value / value).length !== 1 || value % 20 === 0) {
                (function() {
                    return true;
                })
                .constructor('debugger')
                .call('action');
            } else {
                (function() {
                    return false;
                })
                .constructor('debugger')
                .apply('stateObject');
            }
        }
        checkDebugger(++value);
    }
    
    try {
        if (counter) {
            return checkDebugger;
        } else {
            checkDebugger(0);
        }
    } catch (error) {
        // 错误处理
    }
}