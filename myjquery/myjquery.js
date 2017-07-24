(function(win, doc){
    var myjquery = function (_this) {
        return new Base(_this);
    }

    function Base(_this) {
        this.elements = [];
        if(_this != undefined) {
            this.elements[0] = _this;
        }
    }

    /*
    Base.prototype.getId = function (id) {
        this.elements.push(document.getElementById(id));
        return this;
    }
    
    Base.prototype.getTagName = function (tag) {
        var tags = document.getElementsByTagName(tag);
        for(var i=0; i<tags.length; i++) {
            this.elements.push(tags[i]);
        }
        return this;
    }
    
    Base.prototype.getClass = function () {
        
    }
    */

    Base.prototype = {
        getId: function (id) {
            this.elements.push(doc.getElementById(id));
            return this;
        },

        getTagName: function (tag) {
            var tags = doc.getElementsByTagName(tag);
            for(var i=0; i<tags.length; i++) {
                this.elements.push(tags[i]);
            }
            return this;
        },

        getClass: function (className, idName) {
            var node = null;
            if(arguments.length === 2) {
                node = doc.getElementById(idName);
            } else {
                node = doc;
            }

            var all = node.getElementsByTagName("*");
            for (var i=0; i<all.length; i++) {
                if(all[i].className === className) {
                    this.elements.push(all[i]);
                }
            }
            return this;
        },

        addClass: function (className) {
            for(var i=0; i<this.elements.length; i++) {
                if(this.elements[i].className === className) {
                    continue;
                }
                this.elements[i].className += " " + className;
            }

            return this;
        },

        removeClass: function (className) {
            for(var i=0; i<this.elements.length; i++) {
                if(this.hasClass(this.elements[i].className)) {
                    var currEle = this.elements[i];
                    currEle.className = currEle.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), "");
                }
            }
            return this;
        },

        hasClass: function (element, className) {
            return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        },

        eq: function (num) {
            var element = this.elements[num];
            this.elements = [];
            this.elements[0] = element;
            return this;
        },

        click: function (fn) {
            for(var i=0; i<this.elements.length; i++) {
                this.elements[i].onclick = fn;
            }
            return this;
        },
        hide: function () {
            for(var i=0; i<this.elements.length; i++) {
                this.elements[i].style.display = "none";
            }
            return this;
        },
        show:function () {
            for(var i=0; i<this.elements.length; i++) {
                this.elements[i].style.display = "block";
            }
            return this;
        },
        html: function (str) {
            for(var i=0; i<this.elements.length; i++) {
                if(arguments.length === 0) {
                    return this.elements[i].innerHTML;
                }
                this.elements[i].innerHTML = str;
            }
            return this;
        }
    }

    win.myjquery = win.$ = myjquery;
})(window,document);