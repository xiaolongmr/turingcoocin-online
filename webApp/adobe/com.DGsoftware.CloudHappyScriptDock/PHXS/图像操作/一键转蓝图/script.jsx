/*
 * 一键转蓝图
 * 功能：将任何图片转成蓝图模式，图文行业常用工具
 * 作者：云乐脚本坞
 */

// 检查是否有打开的文档
if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    
    try {
        // 合并所有可见图层
        doc.mergeVisibleLayers();
        
        // 转换为灰度模式
        if (doc.mode != DocumentMode.GRAYSCALE) {
            doc.changeMode(ChangeMode.GRAYSCALE);
        }
        
        // 反相
        doc.activeLayer.invert();
        
        // 转换为RGB模式以便应用颜色
        if (doc.mode != DocumentMode.RGB) {
            doc.changeMode(ChangeMode.RGB);
        }
        
        // 创建色彩平衡调整图层来添加蓝色调
        var colorBalanceLayer = doc.artLayers.add();
        colorBalanceLayer.name = "蓝图效果";
        colorBalanceLayer.blendMode = BlendMode.MULTIPLY;
        
        // 应用蓝色填充
        var blue = new SolidColor();
        blue.rgb.red = 0;
        blue.rgb.green = 100;
        blue.rgb.blue = 255;
        
        doc.selection.selectAll();
        doc.selection.fill(blue);
        doc.selection.deselect();
        
        // 调整不透明度
        colorBalanceLayer.opacity = 70;
        
        alert("蓝图效果应用完成！");
        
    } catch (e) {
        alert("转换失败：" + e.message);
    }
}