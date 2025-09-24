/*
 * 重命名图层
 * 功能：批量重命名图层
 * 作者：云乐脚本坞
 */

if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    
    try {
        var newName = prompt("请输入新的图层名称：", doc.activeLayer.name);
        
        if (newName != null && newName != "") {
            doc.activeLayer.name = newName;
            alert("图层已重命名为：" + newName);
        } else {
            alert("重命名已取消！");
        }
        
    } catch (e) {
        alert("重命名图层失败：" + e.message);
    }
}