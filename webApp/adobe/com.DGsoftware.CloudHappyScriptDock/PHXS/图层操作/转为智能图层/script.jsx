/*
 * 转为智能图层
 * 功能：将选中的图层批量转为智能图层
 * 作者：云乐脚本坞
 */

if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    
    if (doc.activeLayer.kind == LayerKind.NORMAL || doc.activeLayer.kind == LayerKind.TEXT) {
        try {
            // 转换为智能对象
            var desc = new ActionDescriptor();
            executeAction(stringIDToTypeID("newPlacedLayer"), desc, DialogModes.NO);
            
            alert("图层已转为智能图层！");
            
        } catch (e) {
            alert("转换智能图层失败：" + e.message);
        }
    } else {
        alert("请选择一个普通图层或文本图层！");
    }
}