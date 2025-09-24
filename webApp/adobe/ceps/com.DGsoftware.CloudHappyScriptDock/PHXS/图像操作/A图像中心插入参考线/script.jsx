/*
 * 图像中心插入参考线
 * 功能：在当前文档的图像中心插入水平和垂直参考线
 * 作者：云乐脚本坞
 */

// 检查是否有打开的文档
if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    
    // 获取文档尺寸
    var width = doc.width.as("px");
    var height = doc.height.as("px");
    
    // 计算中心点
    var centerX = width / 2;
    var centerY = height / 2;
    
    // 添加垂直参考线（在水平中心）
    doc.guides.add(Direction.VERTICAL, UnitValue(centerX, "px"));
    
    // 添加水平参考线（在垂直中心）
    doc.guides.add(Direction.HORIZONTAL, UnitValue(centerY, "px"));
    
    alert("图像中心参考线插入完成！");
}