/*
 * 插入文件名
 * 功能：在当前文档底部的中间插入当前文件名
 * 作者：云乐脚本坞
 */

// 检查是否有打开的文档
if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    
    try {
        // 获取文档信息
        var fileName = doc.name.replace(/\.[^\.]+$/, ""); // 去掉扩展名
        var docWidth = doc.width.as("px");
        var docHeight = doc.height.as("px");
        
        // 创建文本图层
        var textLayer = doc.artLayers.add();
        textLayer.kind = LayerKind.TEXT;
        textLayer.name = "文件名";
        
        var textItem = textLayer.textItem;
        textItem.contents = fileName;
        
        // 设置文本属性
        textItem.font = "Arial";
        textItem.size = UnitValue(24, "px");
        textItem.color = new SolidColor();
        textItem.color.rgb.red = 0;
        textItem.color.rgb.green = 0;
        textItem.color.rgb.blue = 0;
        
        // 设置文本位置（底部居中）
        textItem.position = [UnitValue(docWidth/2, "px"), UnitValue(docHeight - 50, "px")];
        textItem.justification = Justification.CENTER;
        
        alert("文件名已插入到文档底部！");
        
    } catch (e) {
        alert("插入文件名失败：" + e.message);
    }
}