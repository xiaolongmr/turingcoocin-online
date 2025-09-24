/*
 * 图层居中
 * 功能：将选中的图层居中对齐
 * 作者：云乐脚本坞
 */

// 检查是否有打开的文档
if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    
    if (doc.activeLayer.kind == LayerKind.NORMAL || doc.activeLayer.kind == LayerKind.TEXT) {
        try {
            // 获取文档尺寸
            var docWidth = doc.width.as("px");
            var docHeight = doc.height.as("px");
            
            // 获取图层边界
            var bounds = doc.activeLayer.bounds;
            var layerWidth = bounds[2].as("px") - bounds[0].as("px");
            var layerHeight = bounds[3].as("px") - bounds[1].as("px");
            
            // 计算居中位置
            var newX = (docWidth - layerWidth) / 2;
            var newY = (docHeight - layerHeight) / 2;
            
            // 计算偏移量
            var deltaX = newX - bounds[0].as("px");
            var deltaY = newY - bounds[1].as("px");
            
            // 移动图层
            doc.activeLayer.translate(UnitValue(deltaX, "px"), UnitValue(deltaY, "px"));
            
            alert("图层已居中！");
            
        } catch (e) {
            alert("图层居中失败：" + e.message);
        }
    } else {
        alert("请选择一个普通图层或文本图层！");
    }
}