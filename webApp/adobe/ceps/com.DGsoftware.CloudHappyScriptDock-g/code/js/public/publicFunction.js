/**
 * 公共函数库 - 解密版本
 * 解密时间: 2025年1月24日
 * 说明: 包含CEP扩展的核心公共函数，用于脚本执行、文件操作、路径管理等功能
 */

// 初始化主题管理器
themeManager.init();

/**
 * 发送脚本代码到Adobe应用程序执行
 * @param {string} scriptCode - 要执行的脚本代码
 */
function sendScriptNr(scriptCode) {
    csInterface.evalScript(scriptCode);
}

/**
 * 发送脚本文件到Adobe应用程序执行
 * @param {string} filePath - 脚本文件路径
 */
function sendScriptFile(filePath) {
    if (PathExists(filePath)) {
        csInterface.evalScript('$.evalFile("' + filePath + '")');
    } else {
        showTipsBar('脚本文件不存在：' + H5IMG.error);
    }
}

// 添加全局点击事件监听器
document.addEventListener('click', getClick, false);

/**
 * 处理点击事件，主要用于文件夹展开/收起功能
 * @param {Event} event - 点击事件对象
 */
function getClick(event) {
    var targetElement = event.target.parentElement.parentElement;
    
    if (targetElement.className === 'sum') {
        var subElement = targetElement.children[1];
        var iconElement = targetElement.children[0].children[0].children[0];
        
        if (subElement.className === 'subJsxName hideElem') {
            // 展开文件夹
            iconElement.src = '../images/folder-open.svg';
            subElement.className = 'subJsxName showElem';
        } else {
            // 收起文件夹
            iconElement.src = '../images/folder.svg';
            subElement.className = 'subJsxName hideElem';
        }
    }
}

/**
 * 运行Web JSX脚本
 * @param {string} jsxPath - JSX脚本路径
 */
function runWebJsx(jsxPath) {
    var webPath = jsxPath.replace('.jsx', '.js');
    
    $.ajaxSetup({
        cache: false
    });
    
    $.get({
        url: webPath,
        success: function(data) {
            sendScriptNr(data);
        },
        error: function(xhr, status, error) {
            showTipsBar('加载脚本失败：' + H5IMG.error);
        }
    });
}

/**
 * 打开淘宝店铺页面
 */
function addWebPageOpen() {
    window.__adobe_cep__.util.openURLInDefaultBrowser('https://shop127601045.taobao.com/?spm=a1z10.1-c.0.0.30676cfcPZdhFx');
}

/**
 * 打开QQ联系方式
 */
function callMeQQ() {
    window.__adobe_cep__.util.openURLInDefaultBrowser('tencent://message/?uin=127601045');
}

/**
 * 打开CEP应用网页
 */
function cepAppWebPage() {
    window.__adobe_cep__.util.openURLInDefaultBrowser('http://localhost:3000');
}

/**
 * 打开博客页面
 */
function addWebBlog() {
    window.__adobe_cep__.util.openURLInDefaultBrowser('https://blog.turingcoocin.online');
}

/**
 * 检查文件或目录是否存在
 * @param {string} path - 文件或目录路径
 * @returns {boolean} 存在返回true，不存在返回false
 */
function PathExists(path) {
    return window.__adobe_cep__.fs.stat(path).err != window.__adobe_cep__.fs.NO_ERROR;
}

/**
 * 刷新当前页面
 */
function freshPage() {
    location.reload();
}

/**
 * 创建目录
 * @param {string} dirPath - 要创建的目录路径
 */
function MKdir(dirPath) {
    csInterface.evalScript('new Folder("' + dirPath + '").create()', function(result) {
        // 目录创建完成回调
    });
}

/**
 * 获取Adobe应用程序名称
 * @returns {string} 应用程序ID
 */
function getAdobeAppName() {
    return csInterface.getApplicationID();
}

/**
 * 获取Adobe应用程序版本
 * @returns {string} 应用程序主版本号
 */
function getAdobeAppVS() {
    return JSON.parse(window.__adobe_cep__.getApplications()).appVersion.split('.')[0];
}

/**
 * 设置CEP扩展名称
 * @param {string} name - 扩展名称
 */
function setCEPName(name) {
    csInterface.setWindowTitle(name);
}

/**
 * 获取插件完整名称
 * @returns {string} 插件完整名称
 */
function getAddonName() {
    return window.__adobe_cep__.getExtensionID();
}

/**
 * 获取插件简化名称（最后一段）
 * @returns {string} 插件简化名称
 */
function getAddonNameHz() {
    var fullName = window.__adobe_cep__.getExtensionID().split('.');
    return fullName[fullName.length - 1];
}

/**
 * 获取DGSoftware主目录路径
 * @returns {string} DGSoftware目录路径
 */
function getDGSoftwareMePath() {
    var userDataPath = csInterface.getSystemPath(SystemPath.USER_DATA).replace(/\\/g, '/') + '/DGSoftware/' + getAddonName();
    
    if (!PathExists(userDataPath)) {
        MKdir(userDataPath);
    }
    
    return userDataPath;
}

/**
 * 获取当前应用程序的用户数据目录
 * @returns {string} 当前应用程序目录路径
 */
function getCurAppMePath() {
    var appPath = getDGSoftwareMePath() + '/' + getAdobeAppName();
    
    if (!PathExists(appPath)) {
        MKdir(appPath);
    }
    
    return appPath;
}

/**
 * 获取临时JSX文件路径
 * @returns {string} 临时JSX目录路径
 */
function getTempJsxPath() {
    return getDGSoftwareMePath() + '/tempJsx';
}

/**
 * 获取列表数据存储路径
 * @returns {string} 列表数据目录路径
 */
function getListPath() {
    return getCurAppMePath() + '/list';
}

/**
 * 获取用户数据存储路径
 * @returns {string} 用户数据目录路径
 */
function getUserPath() {
    return getCurAppMePath() + '/user';
}

/**
 * 获取云端数据存储路径
 * @returns {string} 云端数据目录路径
 */
function getCloudPath() {
    return getCurAppMePath() + '/cloud';
}

/**
 * 写入文件内容（UTF-8编码）
 * @param {string} filePath - 文件路径
 * @param {string} content - 文件内容
 */
function writeFileMe(filePath, content) {
    var encodedContent = cep.encoding.converters.utf8_to_b64(content);
    window.__adobe_cep__.fs.writeFile(filePath, encodedContent, cep.encoding.Base64);
}

/**
 * 读取文件内容（UTF-8解码）
 * @param {string} filePath - 文件路径
 * @returns {string} 文件内容
 */
function readFileMe(filePath) {
    // 如果文件不存在，创建空文件
    if (!PathExists(filePath)) {
        writeFileMe(filePath, '\r');
    }
    
    var result = window.__adobe_cep__.fs.readFile(filePath, cep.encoding.Base64);
    
    if (result.err === 0) {
        var encodedData = result.data;
        var decodedContent = cep.encoding.converters.b64_to_utf8(encodedData);
        return decodedContent;
    }
    
    return '';
}