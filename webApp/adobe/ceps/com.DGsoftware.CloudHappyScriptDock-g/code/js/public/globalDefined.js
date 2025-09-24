/**
 * 解密后的全局定义文件
 * 原文件：globalDefined.js
 * 解密时间：2025年1月24日
 * 修复硬编码路径问题，使用统一配置管理
 */

// 错误信息定义
var ERROR = {
    CAN_NOT_YUN: "请不要在虚拟机中运行，因安全原因，插件启动失败！",
    ERR_TRY: "发生错误，请重启后再试！",
    PASSWD_ERR: "激活码错误，请重新输入正确的激活码！"
};

// 图片资源路径定义 - 使用相对路径，避免硬编码
var H5IMG = {
    OK: "../images/alert/ok.svg",
    ERR: "../images/alert/err.svg",
    TIP: "../images/alert/tip.svg",
    LOGO: "../images/alert/logo.svg",
    TCLOGO: "../images/alert/tclogo.svg",
    WRONG: "../images/alert/wrong.svg",
    HELLO: "../images/alert/hello.svg"
};

// 事件定义 - 使用动态扩展ID
var EVENTS = {
    REFRESH_INDEX: idName + ".Event.Refresh",
    REFRESHMAIN_INDEX: idName + ".Event.RefreshMain",
    SHOW_TIPSBAR: idName + ".Event.showTipsBar",
    CLOSE_TIPSBAR: idName + ".Event.closeTipsBar",
    SEND_TIPSBAR_TEXT: idName + ".Event.sendTipsBarText",
    CHANGE_TIPSBAR_COLOR: idName + ".Event.changeTipsBarColor",
    CHANGE_TIPSBAR_TEXTCOLOR: idName + ".Event.changeTipsBarTextColor",
    SHOW_LICENSE: idName + ".Event.showLicensePage",
    RUN_JSX: idName + ".Event.runJsx",
    TS_TEXT: idName + ".Event.tipsText"
};

// 提示文本定义
var TIPSTEXT = {
    NULL: "",
    NEED_ACTIVE: "需要激活的产品",
    VIP: "授权用户",
    TRY: "当前是试用模式",
    TRY_END_TIME: "试用到期",
    WELCOME: "欢迎使用！",
    END_DAY: "剩余试用次数 ",
    COUNT: " 次",
    WELCOME_ADD: "欢迎使用，点光软件为您提供自动化工具定制服务，点击LOGO与我联系！",
    FINISH: "任务处理完成！",
    JSXBIN_RT_ERR: "脚本运行时返回了错误！",
    JSXBIN_NOSEL: "未选择图形！"
};

// DPI值定义
var DPI_VALUE = {
    P0: "7",
    P1: "20",
    P2: "2e",
    P3: "48",
    P4: "60",
    P5: "78",
    P6: "96",
    P7: "b4",
    P8: "fa",
    P9: "12c"
};

// 全局变量定义
var globalConfig = {
    // 应用程序名称
    appName: "CloudHappyScriptDock",
    
    // 版本信息
    version: "1.0.0",
    
    // 调试模式
    debugMode: false,
    
    // API配置 - 使用统一配置管理
    apiConfig: {
        baseUrl: (typeof AppConfig !== 'undefined') ? AppConfig.getBaseUrl() : "http://localhost:8081/",
        timeout: 30000,
        retryCount: 3
    },
    
    // UI配置
    uiConfig: {
        theme: "default",
        language: "zh-CN",
        autoSave: true
    }
};

// 全局常量定义
var CONSTANTS = {
    // 事件类型
    EVENTS: {
        INIT: "app_init",
        READY: "app_ready",
        ERROR: "app_error",
        UPDATE: "app_update"
    },
    
    // 状态码
    STATUS: {
        SUCCESS: 200,
        ERROR: 500,
        NOT_FOUND: 404,
        UNAUTHORIZED: 401
    },
    
    // 消息类型
    MESSAGE_TYPES: {
        INFO: "info",
        WARNING: "warning",
        ERROR: "error",
        SUCCESS: "success"
    }
};

// 全局工具函数
var GlobalUtils = {
    /**
     * 日志输出函数
     * @param {string} message - 日志消息
     * @param {string} level - 日志级别
     */
    log: function(message, level) {
        level = level || "info";
        if (globalConfig.debugMode) {
            console.log("[" + level.toUpperCase() + "] " + message);
        }
    },
    
    /**
     * 错误处理函数
     * @param {Error} error - 错误对象
     */
    handleError: function(error) {
        this.log("Error occurred: " + error.message, "error");
        // 可以在这里添加错误上报逻辑
    },
    
    /**
     * 获取当前时间戳
     * @returns {number} 时间戳
     */
    getTimestamp: function() {
        return new Date().getTime();
    },
    
    /**
     * 格式化日期
     * @param {Date} date - 日期对象
     * @returns {string} 格式化后的日期字符串
     */
    formatDate: function(date) {
        if (!date) date = new Date();
        return date.getFullYear() + "-" + 
               String(date.getMonth() + 1).padStart(2, "0") + "-" + 
               String(date.getDate()).padStart(2, "0") + " " +
               String(date.getHours()).padStart(2, "0") + ":" +
               String(date.getMinutes()).padStart(2, "0") + ":" +
               String(date.getSeconds()).padStart(2, "0");
    }
};

// 导出全局对象（如果使用模块系统）
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        globalConfig: globalConfig,
        CONSTANTS: CONSTANTS,
        GlobalUtils: GlobalUtils
    };
}