/*
 * 释放智能图层
 * 功能：释放智能图层内容
 * 作者：云乐脚本坞
 */

if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    
    if (doc.activeLayer.kind == LayerKind.SMARTOBJECT) {
        try {
            // 释放智能对象
            var desc = new ActionDescriptor();
            executeAction(stringIDToTypeID("placedLayerReplaceContents"), desc, DialogModes.NO);
            
            alert("智能图层已释放！");
            
        } catch (e) {
            alert("释放智能图层失败：" + e.message);
        }
    } else {
        alert("请选择一个智能图层！");
    }
}