/**
 * CEP 环境模拟器
 * 用于在浏览器环境中模拟 Adobe CEP 扩展的运行环境
 * 解决 CSInterface 和相关 API 在浏览器中不可用的问题
 */

(function() {
    'use strict';
    
    // 检查是否在 CEP 环境中运行
    if (typeof window.__adobe_cep__ !== 'undefined') {
        // 在真实的 CEP 环境中，不需要模拟
        return;
    }
    
    // 创建模拟的 __adobe_cep__ 对象
    window.__adobe_cep__ = {
        getExtensionId: function() {
            return 'com.DGsoftware.CloudHappyScriptDock';
        },
        
        getHostEnvironment: function() {
            return JSON.stringify({
                appName: 'PHXS',
                appVersion: '24.0.0',
                appLocale: 'zh_CN',
                appUILocale: 'zh_CN',
                appId: 'PHXS',
                isAppOnline: true,
                appSkinInfo: {
                    panelBackgroundColor: {
                        color: {
                            red: 50,
                            green: 50,
                            blue: 50,
                            alpha: 255
                        }
                    },
                    appBarBackgroundColor: {
                        color: {
                            red: 40,
                            green: 40,
                            blue: 40,
                            alpha: 255
                        }
                    }
                }
            });
        },
        
        getCurrentApiVersion: function() {
            return '9.0.0';
        },
        
        // 添加缺失的方法
        resizeContent: function(width, height) {
            console.log('CEP Simulator: __adobe_cep__.resizeContent called with', width, height);
            if (width && height) {
                document.body.style.width = width + 'px';
                document.body.style.height = height + 'px';
            }
        },
        
        addEventListener: function(type, listener, obj) {
            console.log('CEP Simulator: __adobe_cep__.addEventListener called with type:', type);
            // 直接处理事件监听，避免无限递归
            if (!window._cepEventListeners) {
                window._cepEventListeners = {};
            }
            if (!window._cepEventListeners[type]) {
                window._cepEventListeners[type] = [];
            }
            window._cepEventListeners[type].push(listener);
        },
        
        removeEventListener: function(type, listener, obj) {
            console.log('CEP Simulator: __adobe_cep__.removeEventListener called with type:', type);
            if (window._cepEventListeners && window._cepEventListeners[type]) {
                var index = window._cepEventListeners[type].indexOf(listener);
                if (index > -1) {
                    window._cepEventListeners[type].splice(index, 1);
                }
            }
        },
        
        dispatchEvent: function(event) {
            console.log('CEP Simulator: __adobe_cep__.dispatchEvent called with event:', event);
            // 直接处理事件分发，避免无限递归
            if (window._cepEventListeners && window._cepEventListeners[event.type]) {
                window._cepEventListeners[event.type].forEach(function(listener) {
                    try {
                        listener(event);
                    } catch (e) {
                        console.error('CEP Simulator: Error in event listener:', e);
                    }
                });
            }
        },
        
        getExtensionID: function() {
            // 注意大小写，有些代码使用 getExtensionID 而不是 getExtensionId
            return 'com.DGsoftware.CloudHappyScriptDock';
        },
        
        getSystemPath: function(pathType) {
            console.log('CEP Simulator: __adobe_cep__.getSystemPath called with', pathType);
            var paths = {
                'userData': '/Users/username/AppData/Roaming',
                'commonFiles': '/Program Files/Common Files',
                'myDocuments': '/Users/username/Documents',
                'application': '/Applications/Adobe Photoshop 2023'
            };
            return paths[pathType] || '/default/path';
        },
        
        evalScript: function(script, callback) {
            console.log('CEP Simulator: __adobe_cep__.evalScript called with script:', script);
            if (callback) {
                setTimeout(function() {
                    callback('CEP Simulator: Script execution simulated');
                }, 100);
            }
        },
        
        getApplicationSkinInfo: function() {
            return JSON.stringify({
                panelBackgroundColor: {
                    color: {
                        red: 50,
                        green: 50,
                        blue: 50,
                        alpha: 255
                    }
                },
                appBarBackgroundColor: {
                    color: {
                        red: 40,
                        green: 40,
                        blue: 40,
                        alpha: 255
                    }
                }
            });
        },
        
        // 添加文件系统模拟
        fs: {
            NO_ERROR: 0,
            ERR_UNKNOWN: 1,
            ERR_INVALID_PARAMS: 2,
            ERR_NOT_FOUND: 3,
            ERR_CANT_READ: 4,
            ERR_UNSUPPORTED_ENCODING: 5,
            ERR_CANT_WRITE: 6,
            ERR_OUT_OF_SPACE: 7,
            ERR_NOT_FILE: 8,
            ERR_NOT_DIRECTORY: 9,
            
            stat: function(path) {
                console.log('CEP Simulator: fs.stat called with path:', path);
                // 模拟文件存在检查
                return {
                    err: this.NO_ERROR,
                    data: {
                        isFile: function() { return true; },
                        isDirectory: function() { return false; },
                        size: 1024,
                        mtime: new Date()
                    }
                };
            },
            
            readFile: function(path, encoding) {
                console.log('CEP Simulator: fs.readFile called with path:', path);
                return {
                    err: this.NO_ERROR,
                    data: 'CEP Simulator: Mock file content'
                };
            },
            
            writeFile: function(path, data, encoding) {
                console.log('CEP Simulator: fs.writeFile called with path:', path);
                return {
                    err: this.NO_ERROR
                };
            }
        },
        
        // 添加工具方法模拟
        util: {
            openURLInDefaultBrowser: function(url) {
                console.log('CEP Simulator: Opening URL in browser:', url);
                window.open(url, '_blank');
            }
        }
    };
    
    // 创建模拟的 CSInterface 类
    window.CSInterface = function() {
        this.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());
        this.extensionId = window.__adobe_cep__.getExtensionId();
        this._eventListeners = {};
    };
    
    // 立即创建全局 CSInterface 实例，确保 __adobe_cep__ 方法可以使用
    window.csInterface = new CSInterface();
    
    // CSInterface 原型方法
    CSInterface.prototype = {
        // 获取主机环境信息
        getHostEnvironment: function() {
            return window.__adobe_cep__.getHostEnvironment();
        },
        
        // 获取主机能力
        getHostCapabilities: function() {
            return JSON.stringify({
                EXTENDED_PANEL_MENU: true,
                EXTENDED_PANEL_ICONS: true,
                DELEGATE_APE_ENGINE: false,
                SUPPORT_HTML_EXTENSIONS: true,
                DISABLE_FLASH_EXTENSIONS: false
            });
        },
        
        // 获取扩展ID
        getExtensionId: function() {
            return this.extensionId;
        },
        
        // 调整内容大小（模拟）
        resizeContent: function(width, height) {
            console.log('CEP Simulator: resizeContent called with', width, height);
            // 在浏览器中可以调整窗口大小或容器大小
            if (width && height) {
                document.body.style.width = width + 'px';
                document.body.style.height = height + 'px';
            }
        },
        
        // 获取系统路径（模拟）
        getSystemPath: function(pathType) {
            console.log('CEP Simulator: getSystemPath called with', pathType);
            // 返回模拟路径
            var paths = {
                'userData': '/Users/username/AppData/Roaming',
                'commonFiles': '/Program Files/Common Files',
                'myDocuments': '/Users/username/Documents',
                'application': '/Applications/Adobe Photoshop 2023'
            };
            return paths[pathType] || '/default/path';
        },
        
        // 执行脚本（模拟）
        evalScript: function(script, callback) {
            console.log('CEP Simulator: evalScript called with script:', script);
            // 在浏览器环境中，我们不能执行 JSX 脚本
            // 但可以模拟返回结果
            if (callback) {
                setTimeout(function() {
                    callback('CEP Simulator: Script execution simulated');
                }, 100);
            }
        },
        
        // 添加事件监听器（模拟）
        addEventListener: function(type, listener, obj) {
            console.log('CEP Simulator: addEventListener called with type:', type);
            // 创建自定义事件系统
            if (!this._eventListeners[type]) {
                this._eventListeners[type] = [];
            }
            this._eventListeners[type].push({
                listener: listener,
                obj: obj
            });
        },
        
        // 移除事件监听器（模拟）
        removeEventListener: function(type, listener, obj) {
            console.log('CEP Simulator: removeEventListener called with type:', type);
            if (this._eventListeners && this._eventListeners[type]) {
                this._eventListeners[type] = this._eventListeners[type].filter(function(item) {
                    return item.listener !== listener;
                });
            }
        },
        
        // 分发事件（模拟）
        dispatchEvent: function(event) {
            console.log('CEP Simulator: dispatchEvent called with event:', event);
            if (this._eventListeners && this._eventListeners[event.type]) {
                this._eventListeners[event.type].forEach(function(item) {
                    try {
                        item.listener.call(item.obj, event);
                    } catch (e) {
                        console.error('CEP Simulator: Error in event listener:', e);
                    }
                });
            }
        },
        
        // 获取扩展根路径（模拟）
        getExtensionRootPath: function() {
            return '/webApp/adobe/ceps/com.DGsoftware.CloudHappyScriptDock/';
        },
        
        // 获取应用皮肤信息（模拟）
        getApplicationSkinInfo: function() {
            return JSON.stringify({
                panelBackgroundColor: {
                    color: {
                        red: 50,
                        green: 50,
                        blue: 50,
                        alpha: 255
                    }
                },
                appBarBackgroundColor: {
                    color: {
                        red: 40,
                        green: 40,
                        blue: 40,
                        alpha: 255
                    }
                }
            });
        }
    };
    
    // 创建模拟的 CSEvent 类
    window.CSEvent = function(type, scope, appId, extensionId) {
        this.type = type;
        this.scope = scope || 'GLOBAL';
        this.appId = appId || 'PHXS';
        this.extensionId = extensionId || 'com.DGsoftware.CloudHappyScriptDock';
        this.data = '';
    };
    
    // 创建模拟的应用皮肤信息，确保在 themeManager 初始化前就存在
    window.appSkinInfo = {
        panelBackgroundColor: {
            color: {
                red: 50,
                green: 50,
                blue: 50,
                alpha: 255
            }
        },
        appBarBackgroundColor: {
            color: {
                red: 40,
                green: 40,
                blue: 40,
                alpha: 255
            }
        }
    };
    
    // 创建模拟的主题管理器
    if (typeof window.themeManager === 'undefined') {
        window.themeManager = {
            init: function() {
                console.log('CEP Simulator: themeManager.init called');
                // 模拟主题初始化
                document.body.classList.add('hostElt');
                
                // 触发主题变化事件
                var themeEvent = new CSEvent('com.adobe.csxs.events.ThemeColorChanged');
                themeEvent.data = JSON.stringify(window.appSkinInfo);
                
                // 延迟触发事件，确保监听器已注册
                setTimeout(function() {
                    if (window.__adobe_cep__ && window.__adobe_cep__.dispatchEvent) {
                        window.__adobe_cep__.dispatchEvent(themeEvent);
                    }
                }, 100);
            },
            
            getCurrentTheme: function() {
                return window.appSkinInfo || {
                    panelBackgroundColor: {
                        color: {
                            red: 50,
                            green: 50,
                            blue: 50,
                            alpha: 255
                        }
                    }
                };
            }
        };
    }
    
    // 创建全局 AppConfig 对象（如果不存在）
    if (typeof window.AppConfig === 'undefined') {
        window.AppConfig = {
            // 服务器基础URL
            serverBaseUrl: 'http://localhost:3000',
            version: "1.0.0",
            name: "CloudHappyScriptDock",
            debug: true,
            
            // 获取基础URL
            getBaseUrl: function() {
                return window.location.origin + '/webApp/adobe/com.DGsoftware.CloudHappyScriptDock/PHXS/';
            },
            
            // 获取服务器URL
            getServerUrl: function() {
                return window.location.origin;
            },
            
            // 将相对路径转换为完整URL
            relativePathToUrl: function(relativePath) {
                if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
                    return relativePath;
                }
                
                // 移除开头的斜杠
                if (relativePath.startsWith('/')) {
                    relativePath = relativePath.substring(1);
                }
                
                return this.getBaseUrl() + relativePath;
            },
            
            // 获取扩展根路径
            getExtensionPath: function() {
                return this.getBaseUrl();
            },
            
            // 构建脚本URL
            buildScriptUrl: function(scriptFolder, scriptName) {
                // 构建脚本的完整URL路径
                return this.getBaseUrl() + scriptFolder + '/' + scriptName;
            },
            
            // 将URL转换为相对路径
            urlToRelativePath: function(url) {
                var baseUrl = this.getBaseUrl();
                if (url.startsWith(baseUrl)) {
                    return url.substring(baseUrl.length);
                }
                return url;
            }
        };
    }
    
    // 模拟一些常用的 CEP 常量
    window.SystemPath = {
        USER_DATA: 'userData',
        COMMON_FILES: 'commonFiles',
        MY_DOCUMENTS: 'myDocuments',
        APPLICATION: 'application'
    };
    
    // 模拟 CEP 版本信息
    window.CEPVersion = {
        major: 9,
        minor: 0,
        micro: 0
    };
    
    console.log('CEP Simulator: 模拟环境已初始化');
    console.log('CEP Simulator: 扩展ID:', window.__adobe_cep__.getExtensionId());
    console.log('CEP Simulator: 主机环境:', window.__adobe_cep__.getHostEnvironment());
    
})();