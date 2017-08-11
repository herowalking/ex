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
        star.graphics.beginFill("#e2e2e2").drawPolyStar(0,0,10,10,2,5);
        movie.timeline.addTween(
            createjs.Tween.get(star)
                .to({x:this.mainX, y:this.mainY-200}, 0)
                .to({x:this.mainX+150, y:this.mainY+50}, 20)
                .to({x:this.mainX-150, y:this.mainY+50}, 20)
                .to({x:this.mainX, y:this.mainY-200}, 20)
        );
        return movie;
    }
    Preload.prototype.drawProgress = function () {
        var progress = new createjs.Text('0%', '30px Arial', '#000');
        progress.textAlign = 'center';
        progress.textBaseline = 'bottom';
        progress.x = this.mainX;
        progress.y = this.mainY;
        return progress;
    }
    Preload.prototype.drawText = function () {
        var text = new createjs.Bitmap('images/loadings.png');
        text.scaleX = text.scaleY = 1.2;
        text.x = this.mainX - 150;
        text.y = this.mainY + 150;
        return text;
    }
    Preload.prototype.preload = function () {
        this.queue = new createjs.LoadQueue();
        this.queue.installPlugin(createjs.Sound);
        if(this.callback) {
            this.queue.on('complete', this.callback, this);
        }
        this.queue.loadFile({id:'sound', src:'sounds/bg.mp3'});
        this.queue.loadManifest([
            {id:'img0', src:'images/_8_1.png'},
            {id:'img1', src:'images/3f3710c6-a7fc-4873-9833-1bae21e50a47.jpg'}
        ]);
    }
    Preload.prototype.playSound = function (key) {
        createjs.Sound.play(key);
    }
    Preload.prototype.getResult = function (key) {
        return this.queue.getResult(key);
    }
    return Preload;
});