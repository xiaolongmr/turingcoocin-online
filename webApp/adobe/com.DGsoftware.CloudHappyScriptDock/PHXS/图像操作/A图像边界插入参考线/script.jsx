/*
 * 图像边界插入参考线
 * 功能：在当前文档的图像边界插入参考线
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
    
    // 添加左边界参考线
    doc.guides.add(Direction.VERTICAL, UnitValue(0, "px"));
    
    // 添加右边界参考线
    doc.guides.add(Direction.VERTICAL, UnitValue(width, "px"));
    
    // 添加上边界参考线
    doc.guides.add(Direction.HORIZONTAL, UnitValue(0, "px"));
    
    // 添加下边界参考线
    doc.guides.add(Direction.HORIZONTAL, UnitValue(height, "px"));
    
    alert("图像边界参考线插入完成！");
}