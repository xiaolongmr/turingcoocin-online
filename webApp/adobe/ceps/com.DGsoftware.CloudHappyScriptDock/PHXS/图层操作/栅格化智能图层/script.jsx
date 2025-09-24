/*
 * 栅格化智能图层
 * 功能：栅格化智能图层
 * 作者：云乐脚本坞
 */

if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    
    if (doc.activeLayer.kind == LayerKind.SMARTOBJECT) {
        try {
            doc.activeLayer.rasterize(RasterizeType.ENTIRELAYER);
            alert("智能图层已栅格化！");
        } catch (e) {
            alert("栅格化失败：" + e.message);
        }
    } else {
        alert("请选择一个智能图层！");
    }
}