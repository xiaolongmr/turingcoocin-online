/*
 * 一键另存JPG到桌面
 * 功能：将当前文档另存为JPG格式到桌面
 * 作者：云乐脚本坞
 */

// 检查是否有打开的文档
if (app.documents.length == 0) {
    alert("请先打开一个文档！");
} else {
    var doc = app.activeDocument;
    
    // 获取桌面路径
    var desktopFolder = Folder.desktop;
    
    // 生成文件名（使用文档名称，去掉扩展名）
    var fileName = doc.name.replace(/\.[^\.]+$/, "");
    var saveFile = new File(desktopFolder + "/" + fileName + ".jpg");
    
    // 设置JPG保存选项
    var jpgOptions = new JPEGSaveOptions();
    jpgOptions.quality = 10; // 最高质量
    jpgOptions.embedColorProfile = true;
    jpgOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgOptions.matte = MatteType.NONE;
    
    try {
        // 另存为JPG
        doc.saveAs(saveFile, jpgOptions, true, Extension.LOWERCASE);
        alert("文件已成功保存到桌面：" + saveFile.name);
    } catch (e) {
        alert("保存失败：" + e.message);
    }
}