// @prepros-prepend ./vendor/swiper.js
// 无法知道广告平台是否加载广告成功（采用定时扫描）
var t_img;
var isLoad = true;
// 加载完成=>回调
isImgLoad(function() {
    console.log("广告图片已经加载完成，可以进行高度处理了");
});
// 判断图片加载情况
function isImgLoad(callback) {
    // 查找所有图(ADOS)，迭代处理
    // 为获取到元素（添加一个容器）
    $("#ados img").each(function() {
        // 找到为0就将isLoad设为false，并退出each
        if (this.height === 0) {
            isLoad = false;
            return false;
        }
    });
    // 为true，没有发现为0的。加载完毕
    if (isLoad) {
        clearTimeout(t_img);
        callback();
        // 没有加载完成的图，将调用定时器递归
    } else {
        isLoad = true;
        t_img = setTimeout(function() {
            isImgLoad(callback);
        }, 500); // 500毫秒就扫描一次，可调整
    }
}