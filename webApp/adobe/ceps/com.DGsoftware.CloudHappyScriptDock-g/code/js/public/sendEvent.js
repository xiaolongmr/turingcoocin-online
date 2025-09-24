/**
 * sendEvent.js - 事件发送管理模块
 * 解密版本 - 解密时间：2025年1月24日
 * 功能：处理CEP扩展中的事件发送和通信
 */

// 刷新索引页面
function begRefresh() {
    var csInterface = new CSInterface();
    var event = new CSEvent();
    event.type = EVENTS.REFRESH_INDEX;
    event.scope = "APPLICATION";
    csInterface.dispatchEvent(event);
}

// 刷新主页面
function begRefreshMain() {
    var csInterface = new CSInterface();
    var event = new CSEvent();
    event.type = EVENTS.REFRESHMAIN_INDEX;
    event.scope = "APPLICATION";
    csInterface.dispatchEvent(event);
}

// 显示提示栏
function showTipsBar(message) {
    var csInterface = new CSInterface();
    var event = new CSEvent();
    event.type = EVENTS.SHOW_TIPSBAR;
    event.data = message;
    event.scope = "APPLICATION";
    csInterface.dispatchEvent(event);
}

// 发送JSX代码执行
function sendJsxCode(jsxCode) {
    var csInterface = new CSInterface();
    var event = new CSEvent();
    event.type = EVENTS.RUN_JSX;
    event.data = jsxCode;
    event.scope = "APPLICATION";
    csInterface.dispatchEvent(event);
}

// 关闭提示栏
function closeTipsBar() {
    var csInterface = new CSInterface();
    var event = new CSEvent();
    event.type = EVENTS.CLOSE_TIPSBAR;
    event.scope = "APPLICATION";
    csInterface.dispatchEvent(event);
}

// 发送提示栏文本
function sendTipsBarText(text) {
    var csInterface = new CSInterface();
    var event = new CSEvent();
    event.type = EVENTS.SEND_TIPSBAR_TEXT;
    event.data = text;
    event.scope = "APPLICATION";
    csInterface.dispatchEvent(event);
}

// 改变提示栏颜色
function changeTipsBarColor(color) {
    var csInterface = new CSInterface();
    var event = new CSEvent();
    event.type = EVENTS.CHANGE_TIPSBAR_COLOR;
    event.data = color;
    event.scope = "APPLICATION";
    csInterface.dispatchEvent(event);
}

// 改变提示栏文本颜色
function changeTipsBarTextColor(textColor) {
    var csInterface = new CSInterface();
    var event = new CSEvent();
    event.type = EVENTS.CHANGE_TIPSBAR_TEXTCOLOR;
    event.data = textColor;
    event.scope = "APPLICATION";
    csInterface.dispatchEvent(event);
}

// 显示许可证信息
function showLicense() {
    var csInterface = new CSInterface();
    var event = new CSEvent();
    event.type = EVENTS.SHOW_LICENSE;
    event.scope = "APPLICATION";
    csInterface.dispatchEvent(event);
}

// 发送提示文本
function TipsText(text) {
    var csInterface = new CSInterface();
    var event = new CSEvent();
    event.type = EVENTS.TS_TEXT;
    event.data = text;
    event.scope = "APPLICATION";
    csInterface.dispatchEvent(event);
}