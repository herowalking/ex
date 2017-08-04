this.createjs = this.createjs || {};

this.createjs.Preload = (function(root, factory){
    return factory.call(root);  //进行时，现在调用factory函数，并且里面的this指的是root
})(window, function () {
    function Preload(stage, callback) {
        createjs.Container.call(this);
        this.canvas = stage.canvas;
        this.callback = callback;
        this.update();
    }

    //改变原型链，让Preload继承Container
    Preload.prototype = Object.create(createjs.Container.prototype);
    Preload.prototype.update = function () {
        this.bounds();  //初始化宽高
        this.addChild(this.drawBackground());  //绘制背景
        this.addChild(this.drawTriangle());  //绘制三角形
        this.addChild(this.drawAnimate());  //绘制三角形动画
        this.addChild(this.drawProgress());  //绘制进度文本
        this.addChild(this.drawText());  //绘制图片文本
        this.preload();
    }

    //计算出当前组件的全屏宽高
    Preload.prototype.bounds = function () {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.mainX = this.width/2;
        this.mainY = this.height/2;
    }
    Preload.prototype.drawBackground = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill("#e2e2e2").rect(0,0,this.width,this.height);
        return bg;
    }
    Preload.prototype.drawTriangle = function () {
        var triangle = new createjs.Shape();
        var g = triangle.graphics;
        var mx = this.mainX;
        var my = this.mainY;
        g.clear();
        g.setStrokeStyle(2).beginStroke("#000");
        g.moveTo(mx, my - 200);
        g.lineTo(mx + 150, my + 50);
        g.lineTo(mx - 150, my + 50);
        g.closePath();
        return triangle;
    }
    Preload.prototype.drawAnimate = function () {
        var movie = new createjs.MovieClip(null, 0, true);
        var star = new createjs.Shape();
        star.graphics.beginFill("#e2e2e2").drawPloyStar(0,0,10,10,2,5);
        movie.timeline.addTween(
            createjs.Tween.get(star)
                .to({x:this.mainX, y:this.mainY - 200}, 0)
                .to({x:this.mainX+150, y:this.mainY+50}, 20)
                .to({x:this.mainX-150, y:this..mainY+50}, 20)
                .to({x:this.mainX, y:this.mainY - 200}, 20)
        );
        return movie;
    }
    Preload.drawProgress = function () {
        
    }

});