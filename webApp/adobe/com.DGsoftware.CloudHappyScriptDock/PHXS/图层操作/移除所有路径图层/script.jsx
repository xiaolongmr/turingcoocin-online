/*
 * 移除所有路径图层
 * 功能：移除文档中所有路径图层
 * 作者：云乐脚本坞
 */

if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    var removedCount = 0;
    
    try {
        var pathItems = doc.pathItems;
        
        for (var i = pathItems.length - 1; i >= 0; i--) {
            pathItems[i].remove();
            removedCount++;
        }
        
        if (removedCount > 0) {
            alert("已移除 " + removedCount + " 个路径图层！");
        } else {
            alert("没有找到路径图层！");
        }
        
    } catch (e) {
        alert("移除路径图层失败：" + e.message);
    }
}
