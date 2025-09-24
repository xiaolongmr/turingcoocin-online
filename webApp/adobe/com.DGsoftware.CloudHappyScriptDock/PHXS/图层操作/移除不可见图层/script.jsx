/*
 * 移除不可见图层
 * 功能：移除当前文档中未使用的图层
 * 作者：云乐脚本坞
 */

if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    var removedCount = 0;
    
    try {
        function removeInvisibleLayers(layerSet) {
            var layers = layerSet.layers;
            
            for (var i = layers.length - 1; i >= 0; i--) {
                var layer = layers[i];
                
                if (layer.typename == "LayerSet") {
                    removeInvisibleLayers(layer);
                } else if (!layer.visible) {
                    layer.remove();
                    removedCount++;
                }
            }
        }
        
        removeInvisibleLayers(doc);
        
        if (removedCount > 0) {
            alert("已移除 " + removedCount + " 个不可见图层！");
        } else {
            alert("没有找到不可见图层！");
        }
        
    } catch (e) {
        alert("移除不可见图层失败：" + e.message);
    }
}
