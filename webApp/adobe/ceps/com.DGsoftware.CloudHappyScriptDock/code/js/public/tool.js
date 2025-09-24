/**
 * 解密后的工具函数文件
 * 原文件：tool.js
 * 解密时间：2025年1月24日
 */

// 工具函数集合
var ToolUtils = {
    
    /**
     * 字符串处理工具
     */
    string: {
        /**
         * 去除字符串首尾空格
         * @param {string} str - 输入字符串
         * @returns {string} 处理后的字符串
         */
        trim: function(str) {
            if (typeof str !== "string") return "";
            return str.replace(/^\s+|\s+$/g, "");
        },
        
        /**
         * 判断字符串是否为空
         * @param {string} str - 输入字符串
         * @returns {boolean} 是否为空
         */
        isEmpty: function(str) {
            return !str || this.trim(str).length === 0;
        },
        
        /**
         * 字符串格式化
         * @param {string} template - 模板字符串
         * @param {...any} args - 参数
         * @returns {string} 格式化后的字符串
         */
        format: function(template) {
            var args = Array.prototype.slice.call(arguments, 1);
            return template.replace(/\{(\d+)\}/g, function(match, index) {
                return args[index] !== undefined ? args[index] : match;
            });
        },
        
        /**
         * 生成随机字符串
         * @param {number} length - 字符串长度
         * @returns {string} 随机字符串
         */
        random: function(length) {
            length = length || 8;
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var result = "";
            for (var i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }
    },
    
    /**
     * 数组处理工具
     */
    array: {
        /**
         * 判断是否为数组
         * @param {any} obj - 待判断对象
         * @returns {boolean} 是否为数组
         */
        isArray: function(obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        },
        
        /**
         * 数组去重
         * @param {Array} arr - 输入数组
         * @returns {Array} 去重后的数组
         */
        unique: function(arr) {
            if (!this.isArray(arr)) return [];
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                if (result.indexOf(arr[i]) === -1) {
                    result.push(arr[i]);
                }
            }
            return result;
        },
        
        /**
         * 数组分块
         * @param {Array} arr - 输入数组
         * @param {number} size - 块大小
         * @returns {Array} 分块后的数组
         */
        chunk: function(arr, size) {
            if (!this.isArray(arr) || size <= 0) return [];
            var result = [];
            for (var i = 0; i < arr.length; i += size) {
                result.push(arr.slice(i, i + size));
            }
            return result;
        }
    },
    
    /**
     * 对象处理工具
     */
    object: {
        /**
         * 深度克隆对象
         * @param {any} obj - 待克隆对象
         * @returns {any} 克隆后的对象
         */
        deepClone: function(obj) {
            if (obj === null || typeof obj !== "object") return obj;
            if (obj instanceof Date) return new Date(obj.getTime());
            if (obj instanceof Array) {
                var arr = [];
                for (var i = 0; i < obj.length; i++) {
                    arr[i] = this.deepClone(obj[i]);
                }
                return arr;
            }
            var cloned = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    cloned[key] = this.deepClone(obj[key]);
                }
            }
            return cloned;
        },
        
        /**
         * 合并对象
         * @param {Object} target - 目标对象
         * @param {...Object} sources - 源对象
         * @returns {Object} 合并后的对象
         */
        extend: function(target) {
            if (!target) target = {};
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                if (source) {
                    for (var key in source) {
                        if (source.hasOwnProperty(key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        }
    },
    
    /**
     * DOM操作工具
     */
    dom: {
        /**
         * 根据ID获取元素
         * @param {string} id - 元素ID
         * @returns {Element|null} DOM元素
         */
        getElementById: function(id) {
            return document.getElementById(id);
        },
        
        /**
         * 根据类名获取元素
         * @param {string} className - 类名
         * @returns {NodeList} DOM元素列表
         */
        getElementsByClassName: function(className) {
            return document.getElementsByClassName(className);
        },
        
        /**
         * 添加CSS类
         * @param {Element} element - DOM元素
         * @param {string} className - 类名
         */
        addClass: function(element, className) {
            if (element && className) {
                if (element.classList) {
                    element.classList.add(className);
                } else {
                    var classes = element.className.split(" ");
                    if (classes.indexOf(className) === -1) {
                        classes.push(className);
                        element.className = classes.join(" ");
                    }
                }
            }
        },
        
        /**
         * 移除CSS类
         * @param {Element} element - DOM元素
         * @param {string} className - 类名
         */
        removeClass: function(element, className) {
            if (element && className) {
                if (element.classList) {
                    element.classList.remove(className);
                } else {
                    var classes = element.className.split(" ");
                    var index = classes.indexOf(className);
                    if (index !== -1) {
                        classes.splice(index, 1);
                        element.className = classes.join(" ");
                    }
                }
            }
        }
    },
    
    /**
     * 事件处理工具
     */
    event: {
        /**
         * 添加事件监听器
         * @param {Element} element - DOM元素
         * @param {string} event - 事件类型
         * @param {Function} handler - 事件处理函数
         */
        on: function(element, event, handler) {
            if (element && event && handler) {
                if (element.addEventListener) {
                    element.addEventListener(event, handler, false);
                } else if (element.attachEvent) {
                    element.attachEvent("on" + event, handler);
                }
            }
        },
        
        /**
         * 移除事件监听器
         * @param {Element} element - DOM元素
         * @param {string} event - 事件类型
         * @param {Function} handler - 事件处理函数
         */
        off: function(element, event, handler) {
            if (element && event && handler) {
                if (element.removeEventListener) {
                    element.removeEventListener(event, handler, false);
                } else if (element.detachEvent) {
                    element.detachEvent("on" + event, handler);
                }
            }
        }
    }
};

// 导出工具对象（如果使用模块系统）
if (typeof module !== "undefined" && module.exports) {
    module.exports = ToolUtils;
}