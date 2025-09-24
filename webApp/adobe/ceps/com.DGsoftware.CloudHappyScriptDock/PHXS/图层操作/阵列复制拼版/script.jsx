/*
 * 阵列复制拼版
 * 功能：将选中图层进行阵列复制拼版
 * 作者：云乐脚本坞
 */

if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    
    try {
        var rows = parseInt(prompt("请输入行数：", "2"));
        var cols = parseInt(prompt("请输入列数：", "2"));
        var spacing = parseInt(prompt("请输入间距（像素）：", "10"));
        
        if (isNaN(rows) || isNaN(cols) || isNaN(spacing)) {
            alert("请输入有效的数字！");
            return;
        }
        
        var originalLayer = doc.activeLayer;
        var bounds = originalLayer.bounds;
        var layerWidth = bounds[2] - bounds[0];
        var layerHeight = bounds[3] - bounds[1];
        
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (i == 0 && j == 0) continue; // 跳过原始图层
                
                var duplicatedLayer = originalLayer.duplicate();
                duplicatedLayer.translate(j * (layerWidth + spacing), i * (layerHeight + spacing));
            }
        }
        
        alert("阵列复制完成！共创建了 " + (rows * cols - 1) + " 个副本。");
        
    } catch (e) {
        alert("阵列复制失败：" + e.message);
    }
}