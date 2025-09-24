/*
 * 移除空图层组
 * 功能：移除文档中所有空的图层组
 * 作者：云乐脚本坞
 */

// 检查是否有打开的文档
if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    var removedCount = 0;
    
    try {
        // 递归函数检查并删除空图层组
        function removeEmptyLayerSets(layerSet) {
            var layers = layerSet.layers;
            
            // 从后往前遍历，避免删除时索引变化的问题
            for (var i = layers.length - 1; i >= 0; i--) {
                var layer = layers[i];
                
                if (layer.typename == "LayerSet") {
                    // 如果是图层组，递归检查
                    removeEmptyLayerSets(layer);
                    
                    // 检查图层组是否为空
                    if (layer.layers.length == 0) {
                        layer.remove();
                        removedCount++;
                    }
                }
            }
        }
        
        // 从文档根级别开始检查
        removeEmptyLayerSets(doc);
        
        if (removedCount > 0) {
            alert("已移除 " + removedCount + " 个空图层组！");
        } else {
            alert("没有找到空图层组！");
        }
        
    } catch (e) {
        alert("移除空图层组失败：" + e.message);
    }
}