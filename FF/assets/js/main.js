
var lptn;
(function (lptn) {
    var Clip = util.Clip;
    var $win = $(window);
    lptn.conf = {
        transitionDuration: 1.8,
        pause: false,
        margin: 0
    };
    var preload = [
        { src: 'assets/img/common/ff_bg.png' },
        { src: 'assets/img/common/ribbon.png' }
    ];
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            _super.apply(this, arguments);
        }
        Sprite.prototype.setup = function (tag, data) {
            this._data = data;
            this._currentFrame = 0;
            this._totalFrames = this._data.frames;
            this.$view = $('<' + tag + '/>').css({
                'width': data.size.w,
                'height': data.size.h,
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'background-image': 'url(' + data.src + ')',
                'background-position': '0 0'
            });
            return this;
        };
        Sprite.prototype.frame = function (num) {
            this._currentFrame = num % this._totalFrames;
            var py = (-this._data.size.h * this._currentFrame) + 'px';
            this.$view.css({
                'background-position': '0 ' + py
            });
            return this;
        };
        Sprite.prototype.nextFrame = function () {
            if (this._currentFrame < this._totalFrames - 1) {
                this.frame(this._currentFrame + 1);
            }
            else if (this._currentFrame == this._totalFrames - 1 && this._frameLoop) {
                this.frame(0);
            }
            return this;
        };
        Sprite.prototype.dispose = function () {
            this.$view = null;
            this._data = null;
        };
        return Sprite;
    })(Clip);
    
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            _super.apply(this, arguments);
        }
        Loading.prototype._setup = function (data) {
            this.$view = $('#loading');
            this._sprite = new Sprite();
            this._sprite.setup('p', data);
            this._sprite.appendTo(this.$view.empty());
            this._sprite.loop(true).play(50);
            TweenMax.to(this.$view, 0.3, { opacity: 1 });
        };
       /* Loading.prototype.init = function () {
            var _this = this;
            var imgdata = { src: 'assets/img/common/loading_sprite.png', size: { w: 310, h: 270 }, frames: 30 };
            var img = new Image();
            img.onload = function () {
                imgdata.data = img;
                _this._setup(imgdata);
            };
            img.src = imgdata.src;
            return this;
        };*/
        Loading.prototype.disappear = function () {
            var _this = this;
            setTimeout(function () {
                TweenMax.to(_this.$view, 2, { bezier: [
                    { left: '-=100', top: '+=100' },
                    { left: '+=150', top: 0 },
                    { left: '-=250', top: -300, scale: 0.5 },
                    { left: '+=150', top: -500 }
                ], ease: Cubic.easeInOut, onUpdate: function () {
                }, onComplete: function () {
                    _this._sprite.stop();
                } });
                TweenMax.to('#cover', 0.6, { autoAlpha: 0, delay: 1, onComplete: function () {
                    $(this).remove();
                } });
            }, 1000);
            return this;
        };
        Loading.instance = new Loading();
        return Loading;
    })(util.View);
    var Detail = (function (_super) {
        __extends(Detail, _super);
        function Detail(controller) {
            _super.call(this);
        }
        Detail.prototype._init = function () {
            var _this = this;
            var self = this;
            this._nocescroll = this.$view.niceScroll({
                cursorwidth: '8px',
                cursorcolor: '#666',
                cursorborder: '0px solid #fff',
                mousescrollstep: 4,
                scrollspeed: 30,
                zindex: 200,
                autohidemode: false,
                preservenativescrolling: true,
                horizrailenabled: false
            });
            $win.resize(function () {
                if (!_this._open) {
                    return;
                }
                _this.$frame.y(($win.height() - _this._size[_this._id] - 120) / 2 | 0);
            });
        };
        Detail.prototype.change = function (id) {
            var _this = this;
            if (id == this._id) {
                return;
            }
            TweenMax.to([this.$con.eq(this._id), this.$page.eq(this._id)], 0.3, { opacity: 0, display: 'none' });
            TweenMax.to([this.$con.eq(id), this.$page.eq(id)], 0.4, { opacity: 1, display: 'block', delay: 0.5 });
            TweenMax.to(this.$in, 0.3, { height: this._size[id], ease: Cubic.easeInOut, delay: 0.3, onComplete: function () {
                _this._nocescroll.resize();
                _this._nocescroll.show();
            } });
            this._id = id;
            this._nocescroll.doScrollTop(0, 1);
            this._controller.change(id + 2, true);
            return this;
        };
        Detail.prototype.setup = function (id) {
            this._id = id;
            this.$in.h(this._height[id]);
            var margin = -Math.max(600 - $win.width() / 2, 0);
            var marginLeft = this._margin[id] + margin;
            TweenLite.set(this.$frame, { transformOrigin: '0 0', scale: this._scale[id], top: this._pos[id] + lptn.conf.margin + 16, marginLeft: marginLeft });
            this.$con.deactive();
            this.$page.deactive();
            return this;
        };
        Detail.prototype.appear = function () {
            var _this = this;
            if (this._open) {
                return;
            }
            var $con = this.$con.eq(this._id);
            var margin = -Math.max(600 - $win.width() / 2, 0) - 522;
            TweenMax.to(this.$view, 0.3, { opacity: 1, display: 'block' });
            TweenMax.to(this.$frame, 1, { scale: 1, ease: Expo.easeInOut });
            TweenMax.to(this.$frame, 0.8, { top: ($win.height() - this._size[this._id] - 120) / 2 | 0, marginLeft: margin, ease: Cubic.easeInOut, delay: .2 });
            TweenMax.to(this.$in, 0.9, { width: 940, height: this._size[this._id], ease: Strong.easeInOut, delay: .1 });
            TweenMax.to(this.$bar, 0.9, { width: 940, ease: Strong.easeInOut, delay: .1 });
            TweenMax.set($con, { y: 100, opacity: 0 });
            TweenMax.to($con, 0.5, { y: 0, opacity: 1, display: 'block', delay: .7, ease: Cubic.easeOut });
            TweenMax.delayedCall(1, function () {
                _this._open = true;
                _this._nocescroll.resize();
                TweenMax.to([_this.$view.find('.close'), _this.$page.eq(_this._id)], 0.4, { opacity: 1, display: 'block' });
                $win.on('resize.detailframe', function () {
                    var margin = -Math.max(600 - $win.width() / 2, 0) - 522;
                    _this.$frame.css('marginLeft', margin);
                });
            });
            return this;
        };
        Detail.prototype.disappear = function () {
            if (!this._open) {
                return;
            }
            this._open = false;
            var scale = this._scale[this._id];
            var top = this._pos[this._id] + lptn.conf.margin + 16;
            var height = this._height[this._id];
            var margin = -Math.max(600 - $win.width() / 2, 0);
            var marginLeft = this._margin[this._id] + margin;
            TweenMax.to([this.$con.eq(this._id), this.$page.eq(this._id)], 0.26, { opacity: 0, display: 'none' });
            TweenMax.to(this.$in, 0.6, { width: 640, height: height, ease: Cubic.easeInOut });
            TweenMax.to(this.$bar, 0.6, { width: 604, ease: Cubic.easeInOut });
            TweenMax.to(this.$frame, 1, { scale: scale, top: top, marginLeft: marginLeft, ease: Cubic.easeInOut });
            TweenMax.to([this.$view.find('.close'), this.$page.eq(this._id)], 0.2, { opacity: 0, display: 'none' });
            TweenMax.to(this.$view, 0.2, { opacity: 0, display: 'none', delay: 0.9 });
            $win.off('resize.detailframe');
            return this;
        };
        return Detail;
    })(util.View);
    var Navigation = (function (_super) {
        __extends(Navigation, _super);
        function Navigation(controller) {
            _super.call(this);
            this._controller = controller;
            this.$view = $('#nav');
            this._$btn = this.$view.find('a');
            this._initEvent();
        }
        Navigation.prototype._initEvent = function () {
            var self = this;
            this._$btn.on({
                mouseover: function () {
                    TweenMax.to($(this).next(), 0.3, { left: 52, autoAlpha: 1, ease: Cubic.easeOut });
                },
                mouseout: function () {
                    TweenMax.to($(this).next(), 0.2, { left: 45, autoAlpha: 0 });
                },
                click: function () {
                    if (lptn.conf.pause) {
                        return;
                    }
                    if (self._current != this.rel) {
                        self._controller.change(this.rel - 0);
                    }
                }
            });
        };
        Navigation.prototype.change = function (id) {
            this._$btn.removeClass('on');
            this._$btn.eq(id).addClass('on');
            this._current = id;
            return this;
        };
        Navigation.prototype.start = function () {
            return this;
        };
        return Navigation;
    })(util.View);
    var ContentButton = (function () {
        function ContentButton(controller) {
            this._controller = controller;
            this._$button = $('.button');
            this._$stick = this._$button.find('.stick');
            this._$kira = this._$button.find('.kira');
            this._initEvent();
            this.start();
        }
        ContentButton.prototype._initEvent = function () {
            var _this = this;
            
        };
        ContentButton.prototype.start = function () {
            var _this = this;
            if (this._running) {
                return;
            }
            this._running = true;
            if (!this._tween) {
                this._tween = TweenMax.to(this._$stick, 2, { y: -8, yoyo: true, repeat: -1, ease: Sine.easeInOut });
            }
            else {
                this._tween.resume();
            }
            clearInterval(this._timer);
            this._timer = setInterval(function () {
                _this._$kira.alpha(0.7 + Math.random() * 0.3);
            }, 40);
            return this;
        };
        /*ContentButton.prototype.stop = function () {
            if (!this._running) {
                return;
            }
            this._running = false;
            clearInterval(this._timer);
            this._tween.pause();
            return this;
        };*/
        /*ContentButton.prototype.reset = function (id) {
            var _this = this;
            var $stick = this._$stick.eq(id);
            TweenMax.set($stick, { left: 500, top: -600, opacity: 0 });
            TweenMax.to($stick, 1, { bezier: [{ left: -250, top: -80 }, { left: 26, top: 5 }], opacity: 1, delay: 1, ease: Strong.easeOut });
            TweenMax.to(this._$button.alpha(0), 0.3, { opacity: 1, delay: 0.9 });
            TweenMax.delayedCall(2, function () {
                lptn.conf.pause = false;
                _this.start();
            });
            return this;
        };*/
        return ContentButton;
    })();
    var ContentController = (function (_super) {
        __extends(ContentController, _super);
        function ContentController() {
            _super.call(this);
            this._position = [
                { x: 0, y: 0 },
                { x: -680, y: -1466 + 50 - 20 },
                { x: 680, y: -2716 + 50 - 70 },
                { x: -680, y: -3957 + 50 - 80 },
                { x: 680, y: -4557 + 50 - 80 },
            ];
            this._init();
            this._initButtonEvent();
            this._initScrollEvent();
        }
        ContentController.prototype._init = function () {
            ContentController.instance = this;
            this._detail = new Detail(this);
            this._navi = new Navigation(this);
            this._button = new ContentButton(this);
            this._running = false;
            this._page = 0;
            this.$stage = $('#stage');
            this.$ff_bg = $('#ff_bg');
            this._scenes = [];
            this._scenes.push(new Scene('section.scene-top'));
            this._scenes.push(new Scene('section.scene01'));
            this._scenes.push(new Scene('section.scene02'));
            this._scenes.push(new Scene('section.scene03'));
        };
        /*ContentController.prototype.closeDetail = function (id) {
            this._detail.disappear();
            this._button.reset(id);
        };*/
        ContentController.prototype._initButtonEvent = function () {
            var self = this;            
        };
        ContentController.prototype.change = function (next, isDetail) {
            var _this = this;
            var pos = this._position[next];
            if (!pos) {
                return;
            }
            if (next == this._page) {
                return;
            }
            var now = this._page;
            var dir = (next < now) ? -1 : 1;
            var dist = Math.abs(next - now) * 0.5;
            var time = lptn.conf.transitionDuration;
            lptn.conf.pause = this._running = true;
            this._page = next;
            this._navi.change(this._page);
            TweenMax.to(this.$ff_bg, time, { y: pos.y, ease: Sine.easeInOut });
            var ratio = 1.3;
            TweenMax.to(this.$stage, time, { y: (pos.y * ratio) | 0, ease: Sine.easeInOut });
            TweenMax.to([this.$stage, this.$ff_bg], time, { x: pos.x, ease: Cubic.easeInOut, onComplete: function () {
                _this._running = false;
                if (!isDetail) {
                    lptn.conf.pause = false;
                }
            } });
            if (this._scenes[now]) {
                this._scenes[now].hide(dir + dist, time);
            }
            if (this._scenes[next]) {
                this._scenes[next].show(dir + dist, time);
            }
            this._track(next);
        };
        ContentController.prototype._initScrollEvent = function () {
            var _this = this;
            var max = this._position.length - 1;
            var _scroll = function (delta) {
                if (lptn.conf.pause) {
                    return;
                }
                if (!_this._running) {
                    if (delta < 0) {
                        if (_this._page < max) {
                            _this.change(_this._page + 1);
                        }
                    }
                    else if (delta > 0) {
                        if (_this._page > 0) {
                            _this.change(_this._page - 1);
                        }
                    }
                }
            };
            if (/firefox/.test(navigator.userAgent.toLowerCase())) {
                window.addEventListener('DOMMouseScroll', function (e) {
                    _scroll(-e.detail);
                }, false);
            }
            else {
                $win.mousewheel(_.throttle(function (e) {
                    _scroll(e.originalEvent.wheelDelta);
                }, 5));
            }
        };
        ContentController.prototype._track = function (page) {
            ScrollEvent.track(page);
        };
        ContentController.instance = null;
        return ContentController;
    })(util.View);
    var ScrollEvent = (function () {
        function ScrollEvent() {
        }
        ScrollEvent.track = function (page) {
            if (ScrollEvent.TAG[page]) {
                GATag.track(window, ScrollEvent.TAG[page]);
                ScrollEvent.TAG[page] = null;
            }
        };
       
        return ScrollEvent;
    })();
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(id) {
            _super.call(this);
            if (id) {
                this._id = id;
                this.$view = $(id);
                this._$objects = this.$view.find('.objects');
                this._$title = this.$view.find('.title, .button');
                this._$item = this.$view.find('.items, .movie');
            }
        }
        Scene.prototype.show = function (dir, time) {
            var _this = this;
            if (!this.$view) {
                return;
            }
            if (!this._sway) {
                this._sway = [];
                if (!/scene07/.test(this._id)) {
                    _.each(this._$objects.find('img'), function (o) {
                        _this._setSway(o);
                    });
                }
            }
            TweenMax.set(this._$objects, { y: 100 * dir, display: 'block' });
            TweenMax.to(this._$objects, time, { y: 0, ease: Sine.easeInOut });
            TweenMax.set(this._$title, { y: 400 * dir, display: 'block' });
            TweenMax.to(this._$title, time, { y: 0, ease: Sine.easeInOut });
            if (this._$item.length) {
                TweenMax.set(this._$item, { y: 250 * dir });
                TweenMax.to(this._$item, time, { y: 0, ease: Sine.easeInOut });
            }
            TweenMax.delayedCall(time + 0.01, function () {
                _this.sway(true);
            });
            return this;
        };
        Scene.prototype.hide = function (dir, time) {
            var _this = this;
            if (!this.$view) {
                return;
            }
            this.sway(false);
            if (this._$item.length) {
                TweenMax.to(this._$item, time, { y: -dir * 250, ease: Sine.easeInOut });
            }
            TweenMax.to(this._$objects, time, { y: -dir * 100, ease: Sine.easeInOut });
            TweenMax.to(this._$title, time, { y: -dir * 400, ease: Sine.easeInOut, onComplete: function () {
                _this._$title.none();
                _this._$objects.none();
            } });
        };
        Scene.prototype._setSway = function ($obj) {
            var tw = TweenMax.to($obj, 4, { y: _.random(10) + 3, x: _.random(5) + 2, yoyo: true, repeat: -1, ease: Sine.easeInOut });
            this._sway.push(tw);
        };
        Scene.prototype.sway = function (run) {
            _.each(this._sway, function (tw) {
                if (run) {
                    tw.resume();
                }
                else {
                    tw.pause();
                }
            });
        };
        return Scene;
    })(util.View);
    var TopSection = (function (_super) {
        __extends(TopSection, _super);
        function TopSection() {
            _super.call(this);
            this.$view = $('#content section').eq(0);
            this._sway = [];
            this._initKemuri();
        }
        TopSection.prototype._initKemuri = function () {
            var _this = this;
            var imgdata = [
                { src: 'assets/img/top/kemuri_blue.png', size: { w: 360, h: 360 }, frames: 54 },
                { src: 'assets/img/top/kemuri_red.png', size: { w: 360, h: 360 }, frames: 54 },
            ];
            new util.ImageAssets().setup(imgdata).exec().done(function (assets) {
                _this._kemuri00 = new Sprite().setup('p', assets.getAt(0));
                _this._kemuri01 = new Sprite().setup('p', assets.getAt(1));
            });
        };
        /*第一屏動態出現時間*/
        TopSection.prototype.appear = function () {
            var _this = this;
            new util.Serial().func(function () {
                _this._showObject();
            }).wait(1500).func(function () {
                _this._showLogo();
            }).wait(500).func(function () {
                _this._showTitle();
            }).exec();
            return this;
        };
        TopSection.prototype._showObject = function () {
            var self = this;
            var $v = this.$view, $ob00 = $v.find('.obj00'), $ob01 = $v.find('.obj01'), $ob02 = $v.find('.obj02'), $ob03 = $v.find('.obj03'), $ob04 = $v.find('.obj04'), $ob05 = $v.find('.obj05'), $fu00 = $v.find('.fru00'), $fu01 = $v.find('.fru01'), $steam = $v.find('.objects .steam');
            TweenMax.set([$ob00, $ob01, $ob02, $ob03, $ob04, $ob05], { top: '+=300' });
            TweenMax.to([$ob00, $ob05], 1, { top: '-=300', opacity: 1, ease: Expo.easeOut });
            TweenMax.to([$ob01, $ob04], 1, { top: '-=300', opacity: 1, ease: Expo.easeOut, delay: 0.1 });
            TweenMax.to([$ob02, $ob03], 1, { top: '-=300', opacity: 1, ease: Expo.easeOut, delay: 0.2 });
            
            TweenMax.set([$fu00, $fu01], { scale: 0.9 });
            TweenMax.to([$fu00, $fu01], 1, { opacity: 1, scale: 1, ease: Back.easeOut, delay: 1, onComplete: function () {
                var tw1 = TweenMax.to($fu00, 4, { y: 20, x: _.random(3), yoyo: true, repeat: -1, ease: Sine.easeInOut });
                var tw2 = TweenMax.to($fu01, 6, { y: 10, x: _.random(3), yoyo: true, repeat: -1, ease: Sine.easeInOut });
                self._sway.push(tw1);
                self._sway.push(tw2);
            } });
        };
        /*TopSection.prototype._showStick = function () {
            var _this = this;
            var $ff_bg = this.$view.find('.ff_bg img');
            var $stick = this.$view.find('.stick');
            var $img = $stick.find('img');
            this.$kira = this.$view.find('img.kira').remove().active();
            var $sec = $('section').eq(0);
            var values = [
                { x: 200, y: 204 },
                { x: 444, y: 338 },
                { x: 743, y: 380 },
                { x: 893, y: 244 },
                { x: 780, y: 120 },
                { x: 503, y: 135 },
                { x: 388, y: 316 },
                { x: 590, y: 490 },
                { x: 1003, y: 431 },
                { x: 1149, y: 113 },
                { x: 959, y: -402 }
            ];
            TweenMax.staggerTo($ff_bg, 0.6, { opacity: 1, delay: 0.4 }, 0.1);
            TweenMax.to($img, 0.6, { opacity: 1 });
            TweenMax.to($stick, 2, { bezier: { curviness: 1, values: values, autoRotate: false }, ease: Power1.easeInOut, onUpdate: function () {
                var pos = $stick.position();
                if (Math.random() < 0.8) {
                    _createKira(pos, _this.$kira.eq(_.random(0, 2)).clone());
                }
            }, onComplete: function () {
                var tw = TweenMax.to($ff_bg.filter(':odd'), 0.1, { opacity: 0.9, yoyo: true, repeat: -1, ease: Sine.easeInOut });
                _this._sway.push(tw);
            } });
            function _createKira(pos, kira) {
                kira.appendTo($sec);
                var top = pos.top + (Math.random() - 0.5) * 5;
                var left = pos.left - 10;
                TweenMax.set(kira, { left: left, top: top, scale: Math.random() + 0.5, rotate: Math.random() * 180 });
                TweenMax.to(kira, _.random(1, 1.5), { autoAlpha: 0, top: top + _.random(10, 30), onComplete: function () {
                    kira.remove();
                } });
            }
        };*/
        TopSection.prototype._showLogo = function () {
            var $logo = this.$view.find('.logo p');
            var $ribbon = this.$view.find('.logo h1');
            TweenMax.set($logo, { scale: 0.8 });
            TweenMax.to($logo, 0.4, { scale: 1, opacity: 1, ease: Back.easeInOut });
            TweenMax.to($ribbon, 0.5, { width: 520, ease: Cubic.easeInOut });
            $logo.find('img').on({
                mouseover: function () {
                    TweenMax.to(this, 0.3, { scale: 1.1, ease: Back.easeOut });
                },
                mouseout: function () {
                    TweenMax.to(this, 0.2, { scale: 1 });
                }
            });
        };
        TopSection.prototype._showTitle = function () {
            var $img = this.$view.find('.copy img');
            var $new = this.$view.find('.new');
            TweenMax.set($img, { scale: 0.6 });
            TweenMax.staggerTo($img, 0.4, { scale: 1, opacity: 1, ease: Back.easeOut }, 0.065);
            TweenMax.to($new, 0.4, { top: 160, opacity: 1, ease: Back.easeOut, delay: 1 });
        };
        
        
        return TopSection;
    })(util.View);
    var ResizeController = (function () {
        function ResizeController() {
            var $stage = $('#stage');
            var $body = $('body');
            var $footer = $('#footer');
            var margin = 0;
            var conH = 768;
            $win.resize(_.throttle(function () {
                var winH = $win.height();
                var winW = $win.width();
                lptn.conf.margin = (winH - conH) / 2;
                if (lptn.conf.margin > 0) {
                    lptn.conf.margin = (lptn.conf.margin * 0.4) | 0;
                }
                else {
                    lptn.conf.margin = (lptn.conf.margin * 1.4) | 0;
                }
                $stage.css('margin-top', lptn.conf.margin);
                var pos = Math.min(-200, lptn.conf.margin - 200) | 0;
                $body.css('background-position', 'center ' + pos + 'px');
                var fx = (winW - 1360) / 2;
                $footer.width(winW - 20).x(-fx);
                $footer.y(winH - lptn.conf.margin - 30);
            }, 30)).trigger('resize');
        }
        return ResizeController;
    })();
    var AppMain = (function (_super) {
        __extends(AppMain, _super);
        function AppMain() {
            _super.apply(this, arguments);
        }
        AppMain.prototype.init = function () {
        };
        AppMain.prototype.ready = function () {
            Loading.instance.init();
            new ResizeController();
        };
        AppMain.prototype.load = function () {
            new util.Serial().queue(function (next) {
                new util.ImageAssets().setup(preload).done(function () {
                    $('#ff_bg').append(preload[0].data);
                    next();
                }).exec();
            }).func(function () {
                Loading.instance.disappear();
            }).wait(600).func(function () {
                new TopSection().appear();
            }).wait(2600).func(function () {
                new ContentController();
            }).exec();
        };
        return AppMain;
    })(util.AppMain);
    lptn.AppMain = AppMain;
})(lptn || (lptn = {}));
new lptn.AppMain();


  
// window.console = {};
// window.console.log = function (i) {
//     return;
// };

