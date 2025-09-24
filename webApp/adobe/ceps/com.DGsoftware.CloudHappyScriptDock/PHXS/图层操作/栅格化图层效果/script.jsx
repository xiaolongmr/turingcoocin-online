/*
 * 栅格化图层效果
 * 功能：将所有带效果的图层栅格化为普通图层
 * 作者：云乐脚本坞
 */

if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    var processedCount = 0;
    
    try {
        function rasterizeLayerEffects(layerSet) {
            var layers = layerSet.layers;
            
            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i];
                
                if (layer.typename == "LayerSet") {
                    rasterizeLayerEffects(layer);
                } else if (layer.kind == LayerKind.NORMAL) {
                    // 检查图层是否有效果
                    try {
                        if (layer.layerEffects) {
                            doc.activeLayer = layer;
                            // 栅格化图层样式
                            executeAction(stringIDToTypeID("rasterizeLayer"), undefined, DialogModes.NO);
                            processedCount++;
                        }
                    } catch (e) {
                        // 忽略没有效果的图层
                    }
                }
            }
        }
        
        rasterizeLayerEffects(doc);
        
        if (processedCount > 0) {
            alert("已栅格化 " + processedCount + " 个带效果的图层！");
        } else {
            alert("没有找到带效果的图层！");
        }
        
    } catch (e) {
        alert("栅格化图层效果失败：" + e.message);
    }
}