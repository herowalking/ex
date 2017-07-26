this.createjs = this.createjs || {};  //初始化
this.createjs.fullScreen = (function (root, factory) {
    return factory.bind(root);  //将来时，将来factory函数被调用的时候，它里面的this指的是root
})(window, function (view, callback, args) {
    if(!view || !(view instanceof HTMLCanvasElement)) throw new Error("view必须为canvas实例");
    this.onresize = function (e) {
        view.width = window.innerWidth;
        view.height = window.innerHeight;
    }
    this.onload = function (e) {
        this.onresize(e);

        if(!createjs.Stage) throw new Error("必须引入createjs easeljs模块");
        var stage = new createjs.Stage(view);
        args = args || {};
        createjs.Ticker.setFPS(args.fps || createjs.Ticker.getFPS());
        createjs.Ticker.on("tick", args.tick || stage);
        callback && callback(stage);
    }
});