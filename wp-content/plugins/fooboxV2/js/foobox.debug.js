/**!
 * FooBox - A jQuery plugin for responsive lightboxes with social sharing
 * @version 2.0.0
 * @link http://fooplugins.com/plugins/foobox-jquery
 * @copyright Steven Usher & Brad Vincent 2013
 * @license Released under the MIT license.
 * You are free to use FooBox jQuery in personal projects (excluding WordPress plugins and themes) as long as this copyright header is left intact.
 * Restriction 1: you may not create a WordPress plugin that bundles FooBox jQuery (rather use http://fooplugins.com/plugins/foobox).
 * Restriction 2: you may only bundle FooBox jQuery within a WordPress theme if you have a developer license.
 */
(function($, window, console, undefined) {
    if ($ && window) {
        window.FooBox = {
            defaults: {
                affiliate: {
                    enabled: !0,
                    prefix: "Powered by ",
                    url: "http://fooplugins.com/plugins/foobox/"
                },
                closeOnOverlayClick: !0,
                containerCssClass: "fbx-instance",
                countMessage: "item %index of %total",
                error: "Could not load the item",
                excludes: ".fbx-link, .nofoobox",
                externalSelector: "a[data-foobox],input[data-foobox]",
                fitToScreen: !1,
                hideScrollbars: !0,
                loadDelay: 0,
                loaderTimeout: 650,
                modalClass: "",
                preload: !1,
                rel: "foobox",
                resizeSpeed: 300,
                selector: "a",
                showButtons: !0,
                showCount: !0,
                strings: {
                    close: "Close",
                    next: "Next",
                    prev: "Previous"
                },
                style: "fbx-rounded",
                theme: "fbx-light",
                transitionInSpeed: 200,
                transitionOutSpeed: 200
            },
            version: "2.0.0",
            instances: [],
            ready: function(func) {
                /in/.test(document.readyState) ? setTimeout("FooBox.ready(" + func + ")", 9) : func();
            }
        }, FooBox.format = function() {
            var i, reg, s = arguments[0];
            for (i = 0; arguments.length - 1 > i; i++) reg = RegExp("\\{" + i + "\\}", "gm"), 
            s = s.replace(reg, arguments[i + 1]);
            return s;
        }, FooBox.browser = {
            isIE: !1,
            version: 0,
            css: null,
            check: function() {
                -1 !== navigator.appVersion.indexOf("MSIE") && (FooBox.browser.isIE = !0, FooBox.browser.version = parseFloat(navigator.appVersion.split("MSIE")[1]), 
                FooBox.browser.css = FooBox.format("fbx-ie fbx-ie{0}", FooBox.browser.version));
            }
        }, FooBox.browser.check(), console || (console = {}), console.log = console.log || function() {}, 
        console.warn = console.warn || function() {}, console.error = console.error || function() {}, 
        console.info = console.info || function() {};
        var Debug = {
            write: function() {
                console.log(FooBox.format.apply(Debug, arguments));
            },
            error: function() {
                1 === arguments.length && arguments[0] instanceof Error ? console.error(arguments[0]) : console.error(FooBox.format.apply(Debug, arguments));
            }
        };
        jQuery.Event.prototype.fb = {
            instance: null,
            modal: null,
            options: null,
            handled: !1
        }, FooBox.raise = function(instance, event, args) {
            args = args || {};
            var e = $.Event(event);
            return e.fb = {}, e.fb.instance = instance, e.fb.modal = instance.modal.element, 
            e.fb.options = instance.options, e.fb.handled = !1, $.extend(!0, e.fb, args), instance.element.trigger(e), 
            e;
        }, FooBox.options = {
            isMultipart: function(name, separator) {
                return "string" == typeof name && name.length > 0 && -1 !== name.indexOf(separator);
            },
            hasProperties: function(obj) {
                if ("object" != typeof obj) return !1;
                var prop;
                for (prop in obj) if (obj.hasOwnProperty(prop)) return !0;
                return !1;
            },
            get: function(obj, name) {
                if (FooBox.options.isMultipart(name, ".")) {
                    var propName = name.substring(0, name.indexOf(".")), remainder = name.substring(name.indexOf(".") + 1);
                    return obj[propName] = obj[propName] || {}, FooBox.options.get(obj[propName], remainder);
                }
                return obj[name];
            },
            set: function(obj, name, value) {
                if (FooBox.options.isMultipart(name, ".")) {
                    var propName = name.substring(0, name.indexOf(".")), remainder = name.substring(name.indexOf(".") + 1);
                    obj[propName] = obj[propName] || {}, FooBox.options.set(obj[propName], remainder, value);
                } else obj[name] = value;
            },
            merge: function(base, object1, objectN) {
                var i, args = Array.prototype.slice.call(arguments);
                for (base = args.shift(), object1 = args.shift(), FooBox.options._merge(base, object1), 
                i = 0; args.length > i; i++) objectN = args[i], FooBox.options._merge(base, objectN);
                return base;
            },
            _merge: function(base, changes) {
                var prop;
                for (prop in changes) changes.hasOwnProperty(prop) && (FooBox.options.hasProperties(changes[prop]) && !$.isArray(changes[prop]) ? (base[prop] = base[prop] || {}, 
                FooBox.options._merge(base[prop], changes[prop])) : $.isArray(changes[prop]) ? (base[prop] = [], 
                $.extend(!0, base[prop], changes[prop])) : base[prop] = changes[prop]);
            }
        }, FooBox.addons = {
            registered: [],
            validate: function(addon) {
                return $.isFunction(addon) ? !0 : (Debug.error('Expected type "function", received type "{0}".', typeof addon), 
                !1);
            },
            register: function(addon, defaults) {
                return FooBox.addons.validate(addon) ? (FooBox.addons.registered.push(addon), "object" == typeof defaults && $.extend(!0, FooBox.defaults, defaults), 
                !0) : (Debug.error("Failed to register the addon."), !1);
            },
            load: function(instance) {
                var registered, i, loaded = [];
                for (i = 0; FooBox.addons.registered.length > i; i++) try {
                    registered = FooBox.addons.registered[i], loaded.push(new registered(instance));
                } catch (err) {
                    Debug.error(err);
                }
                return loaded;
            },
            call: function(instance, method) {
                var addon, args = Array.prototype.slice.call(arguments);
                instance = args.shift(), method = args.shift();
                for (var i = 0; instance.addons.length > i; i++) try {
                    if (addon = instance.addons[i], !$.isFunction(addon[method])) continue;
                    addon[method].apply(addon, args);
                } catch (err) {
                    Debug.error(err);
                }
            }
        }, FooBox.handlers = {
            registered: [],
            validate: function(handler) {
                if (!$.isFunction(handler)) return Debug.error('Expected type "function", received type "{0}".', typeof handler), 
                !1;
                var test = new handler();
                return $.isFunction(test.handles) ? $.isFunction(test.defaults) ? $.isFunction(test.parse) ? $.isFunction(test.load) ? $.isFunction(test.getSize) ? $.isFunction(test.hasChanged) ? $.isFunction(test.preload) ? !0 : (Debug.error('The required "preload" method is not implemented.'), 
                !1) : (Debug.error('The required "hasChanged" method is not implemented.'), !1) : (Debug.error('The required "getSize" method is not implemented.'), 
                !1) : (Debug.error('The required "load" method is not implemented.'), !1) : (Debug.error('The required "parse" method is not implemented.'), 
                !1) : (Debug.error('The required "defaults" method is not implemented.'), !1) : (Debug.error('The required "handles" method is not implemented.'), 
                !1);
            },
            register: function(handler, defaults) {
                return FooBox.handlers.validate(handler) ? (FooBox.handlers.registered.push(handler), 
                "object" == typeof defaults && $.extend(!0, FooBox.defaults, defaults), !0) : (Debug.error("Failed to register the handler."), 
                !1);
            },
            load: function(instance) {
                for (var registered, loaded = [], i = 0; FooBox.handlers.registered.length > i; i++) try {
                    registered = FooBox.handlers.registered[i], loaded.push(new registered(instance));
                } catch (err) {
                    Debug.error(err);
                }
                return loaded;
            },
            call: function(instance, method) {
                var handler, args = Array.prototype.slice.call(arguments);
                instance = args.shift(), method = args.shift();
                for (var i = 0; instance.handlers.length > i; i++) try {
                    if (handler = instance.handlers[i], !$.isFunction(handler[method])) continue;
                    handler[method].apply(handler, args);
                } catch (err) {
                    Debug.error(err);
                }
            },
            get: function(instance, type) {
                var i;
                for (i = 0; instance.handlers.length > i; i++) if (instance.handlers[i].type == type) return instance.handlers[i];
                return null;
            }
        }, FooBox.Item = function(type, element, handler) {
            this.type = type, this.element = element instanceof jQuery ? element : $(element), 
            this.handler = handler, this.width = null, this.height = null, this.url = null, 
            this.title = null, this.description = null, this.content = null, this.placeholder = null, 
            this.selector = null, this.image = null, this.deeplink = null, this.video_id = null, 
            this.video_type = null, this.video_url = null, this.video_valid = null, this.preloaded = !1, 
            this.error = !1, this.fullscreen = !1, this.overflow = !1, this.captions = !1, this.social = !1;
        }, FooBox.Size = function(width, height) {
            this.width = "number" == typeof width ? width : parseInt(width, 0), this.height = "number" == typeof height ? height : parseInt(height, 0);
        }, FooBox.Timer = function() {
            this.id = null, this.busy = !1;
            var _this = this;
            this.start = function(func, milliseconds, thisArg) {
                thisArg = thisArg || func, _this.stop(), _this.id = setTimeout(function() {
                    func.call(thisArg), _this.id = null, _this.busy = !1;
                }, milliseconds), _this.busy = !0;
            }, this.stop = function() {
                null !== _this.id && _this.busy !== !1 && (clearTimeout(_this.id), _this.id = null, 
                _this.busy = !1);
            };
        }, $.fn.foobox = function() {
            var arg2, arg3, args = Array.prototype.slice.call(arguments), arg1 = args.shift();
            if (arg1 === undefined || "object" == typeof arg1) return this.each(function() {
                var fbx = $(this).data("foobox_instance");
                fbx instanceof FooBox.Instance ? fbx.reinit(arg1) : (fbx = new FooBox.Instance(), 
                fbx.init(this, arg1), $(this).data("foobox_instance", fbx));
            });
            if ("string" == typeof arg1 && "option" !== arg1.toLowerCase()) return "init" === arg1 ? this : this.each(function() {
                var fbx = $(this).data("foobox_instance");
                return fbx instanceof FooBox.Instance ? ($.isFunction(fbx[arg1]) && fbx[arg1].apply(fbx, args), 
                !0) : !0;
            });
            if ("string" == typeof arg1 && "option" === arg1.toLowerCase()) {
                var isSet, isMultiSet, isGet, result = [];
                return arg2 = args.shift(), arg3 = args.shift(), isGet = "string" == typeof arg2 && arg3 === undefined, 
                isSet = "string" == typeof arg2 && arg3 !== undefined, isMultiSet = "object" == typeof arg2 && arg3 === undefined, 
                this.each(function() {
                    var fbx = $(this).data("foobox_instance");
                    return fbx instanceof FooBox.Instance ? (fbx.options ? (isGet && result.push(FooBox.options.get(fbx.options, arg2)), 
                    isSet && FooBox.options.set(fbx.options, arg2, arg3), isMultiSet && FooBox.options.merge(fbx.options, arg2), 
                    (isSet || isMultiSet) && fbx.reinit(fbx.options)) : isGet && result.push(undefined), 
                    !0) : !0;
                }), isGet ? 1 >= result.length ? result.shift() : result : this;
            }
            return this;
        }, FooBox.Modal = function(instance) {
            this.FooBox = instance, this.element = null, this.loaderTimeout = new FooBox.Timer(), 
            this._first = !1;
            var _this = this;
            this.init = function(element, options) {
                _this.setup.html(), _this.setup.options(options), _this.setup.bind();
            }, this.reinit = function(options) {
                _this.setup.options(options);
            }, this.setup = {
                html: function() {
                    if (!(_this.element instanceof jQuery)) {
                        _this.element = $('<div class="fbx-modal"></div>'), _this.element.append('<div class="fbx-inner-spacer"></div>');
                        var $stage = $('<div class="fbx-stage"></div>');
                        $stage.append('<div class="fbx-item-current"></div>'), $stage.append('<div class="fbx-item-next"></div>');
                        var $inner = $('<div class="fbx-inner"></div>');
                        $inner.append($stage), $inner.append('<a href="#prev" class="fbx-prev fbx-btn-transition"></a>'), 
                        $inner.append('<div class="fbx-credit"><a target="_blank" href=""><em></em><span> FooBox</span></a></div>'), 
                        $inner.append('<span class="fbx-count" />'), $inner.append('<a href="#next" class="fbx-next fbx-btn-transition"></a>'), 
                        $inner.append('<a href="#close" class="fbx-close fbx-btn-transition"></a>'), _this.element.append('<div class="fbx-loader"><div></div></div>'), 
                        _this.element.append($inner), _this.FooBox.raise("foobox.setupHtml"), $("body").append(_this.element);
                    }
                },
                options: function(options) {
                    var display;
                    _this.element.removeClass().addClass("fbx-modal").addClass(_this.FooBox.element.data("style") || options.style).addClass(_this.FooBox.element.data("theme") || options.theme).addClass(options.modalClass), 
                    FooBox.browser.isIE && 9 > FooBox.browser.version && _this.element.addClass(FooBox.browser.css), 
                    display = options.affiliate.enabled ? "" : "none", _this.element.find(".fbx-credit").css("display", display), 
                    options.affiliate.enabled && (_this.element.find(".fbx-credit > a").attr("href", options.affiliate.url), 
                    _this.element.find(".fbx-credit > a > em").text(options.affiliate.prefix)), display = options.showCount && _this.FooBox.items.multiple() ? "" : "none", 
                    _this.element.find(".fbx-count").css("display", display), display = options.showButtons && _this.FooBox.items.multiple() ? "" : "none", 
                    _this.element.find(".fbx-prev, .fbx-next").css("display", display), _this.element.find(".fbx-close").attr("title", options.strings.close), 
                    _this.element.find(".fbx-prev").attr("title", options.strings.prev), _this.element.find(".fbx-next").attr("title", options.strings.next), 
                    _this.FooBox.raise("foobox.setupOptions");
                },
                bind: function() {
                    _this.element.unbind("click.foobox").bind("click.foobox", function(e) {
                        $(e.target).is(".fbx-modal") && 1 == _this.FooBox.options.closeOnOverlayClick && _this.close();
                    }).find(".fbx-close").unbind("click.foobox").bind("click.foobox", function(e) {
                        return e.preventDefault(), _this.close(), !1;
                    }).end().find(".fbx-prev").unbind("click.foobox").bind("click.foobox", function(e) {
                        return e.preventDefault(), _this.prev(), !1;
                    }).end().find(".fbx-next").unbind("click.foobox").bind("click.foobox", function(e) {
                        return e.preventDefault(), _this.next(), !1;
                    });
                }
            }, this.prioritize = function() {
                FooBox.instances.length > 1 && _this.element.nextAll(".fbx-modal:last").after(_this.element);
            }, this.preload = function() {
                if (1 == _this.FooBox.options.preload) {
                    var prev = _this.FooBox.items.prev();
                    prev.handler.preload(prev);
                    var next = _this.FooBox.items.next();
                    next.handler.preload(next);
                }
            }, this.show = function(first) {
                function handleError(err) {
                    _this.loaderTimeout.stop(), _this.element.find(".fbx-loader").hide(), Debug.error(err);
                    var evt = _this.FooBox.raise("foobox.onError", {
                        error: err
                    });
                    if (1 != evt.fb.handled) {
                        var error = _this.FooBox.items.error(item.index);
                        null != error && _this.show(first);
                    }
                }
                first = first || !1, _this._first = first, $("body").addClass("fbx-active"), _this.FooBox.options.hideScrollbars && $("html, body").css("overflow", "hidden");
                var item = _this.FooBox.items.current();
                1 == item.error ? _this.element.addClass("fbx-error") : _this.element.removeClass("fbx-error"), 
                _this.element.is(":visible") || (_this.prioritize(), _this.FooBox.raise("foobox.beforeShow", {
                    item: item
                }), _this.element.find(".fbx-inner").hide().css({
                    width: "100px",
                    height: "100px",
                    "margin-top": "-50px",
                    "margin-left": "-50px"
                }).end().show(), _this.FooBox.raise("foobox.afterShow", {
                    item: item
                }));
                var current = _this.element.find(".fbx-item-current"), next = _this.element.find(".fbx-item-next");
                next.hide().css("opacity", "0"), _this.element.find(".fbx-count").text(_this.FooBox.options.countMessage.replace("%index", "" + (_this.FooBox.items.indexes.current + 1)).replace("%total", "" + _this.FooBox.items.array.length));
                var blevt = _this.FooBox.raise("foobox.beforeLoad", {
                    item: item
                });
                if (1 != blevt.fb.handled) {
                    if (item.handler.hasChanged(item)) {
                        var i = item.index;
                        item = item.handler.parse(item.element), _this.FooBox.items.array[i] = item;
                    }
                    _this.preload(), _this.loaderTimeout.start(function() {
                        _this.element.addClass("fbx-loading").find(".fbx-loader").show();
                    }, _this.FooBox.options.loaderTimeout), setTimeout(function() {
                        item.handler.load(item, next, function(size) {
                            _this.transitionOut(current, function() {
                                _this.resize(size, function(resized) {
                                    1 == item.overflow && (resized.width < .8 * item.width || resized.height < .8 * item.height) ? next.find(".fbx-item").css({
                                        width: item.width,
                                        height: item.height
                                    }) : next.find(".fbx-item").css({
                                        width: "",
                                        height: ""
                                    }), _this.loaderTimeout.stop(), _this.element.removeClass("fbx-loading").find(".fbx-loader").hide(), 
                                    _this.element.find(".fbx-inner").show(), next.show(), _this.transitionIn(next, function() {
                                        next.add(current).toggleClass("fbx-item-next fbx-item-current"), 1 == item.overflow ? next.add(current).css("overflow", "") : next.add(current).css("overflow", "hidden"), 
                                        current.empty(), _this.FooBox.raise("foobox.afterLoad", {
                                            item: item
                                        });
                                    }, handleError);
                                }, handleError);
                            }, handleError);
                        }, handleError);
                    }, _this.FooBox.options.loadDelay);
                }
            }, this.resize = function(size, success, error) {
                function finish(width, height) {
                    _this.FooBox.raise("foobox.afterResize", {
                        modal: _this.element,
                        item: item
                    }), $.isFunction(success) && success(new FooBox.Size(width, height));
                }
                try {
                    if (!_this.element.is(":visible")) return;
                    if (0 === size.width || 0 === size.height) return $.isFunction(error) && error(FooBox.format("Invalid size supplied. Width = {0}, Height = {1}", size.width, size.height)), 
                    undefined;
                    var item = _this.FooBox.items.current();
                    _this.FooBox.raise("foobox.beforeResize", {
                        modal: _this.element,
                        item: item
                    });
                    var $inner = _this.element.find(".fbx-inner"), $spacer = _this.element.find(".fbx-inner-spacer"), buttons = _this.FooBox.options.showButtons && _this.FooBox.items.multiple(), mpt = parseInt($spacer.css("padding-top"), 0), mpb = parseInt($spacer.css("padding-bottom"), 0), mpl = parseInt($spacer.css("padding-left"), 0), mpr = parseInt($spacer.css("padding-right"), 0), ibt = parseInt($inner.css("border-top-width"), 0), ibb = parseInt($inner.css("border-bottom-width"), 0), ibl = parseInt($inner.css("border-left-width"), 0), ibr = parseInt($inner.css("border-right-width"), 0), padding = parseInt($inner.css("padding-left"), 0), ch = parseInt($inner.css("height"), 0), cw = parseInt($inner.css("width"), 0), vdiff = (buttons ? mpt + mpb : 2 * mpt) + 2 * padding + ibt + ibb, hdiff = mpl + mpr + 2 * padding + ibl + ibr, mh = _this.element.height() - vdiff, mw = _this.element.width() - hdiff, ratio = mw / size.width;
                    size.height * ratio > mh && (ratio = mh / size.height);
                    var ih = size.height, iw = size.width;
                    if ((_this.FooBox.options.fitToScreen === !0 || size.height > mh || size.width > mw) && (ih = Math.floor(size.height * ratio), 
                    iw = Math.floor(size.width * ratio)), 100 > ih && (ih = 100), 100 > iw && (iw = 100), 
                    ih !== ch || iw !== cw) {
                        var mt = -(ih / 2 + padding + (ibt + ibb) / 2 + (buttons ? mpb - mpt : 0)), ml = -(iw / 2 + padding + (ibl + ibr) / 2);
                        $inner.animate({
                            height: ih,
                            width: iw,
                            "margin-top": mt,
                            "margin-left": ml
                        }, _this.FooBox.options.resizeSpeed, function() {
                            finish(iw, ih);
                        });
                    } else finish(cw, ch);
                } catch (err) {
                    $.isFunction(error) && error(err);
                }
            }, this.transitionOut = function(current, success, error) {
                try {
                    current.animate({
                        opacity: 0
                    }, current.is(":visible") ? _this.FooBox.options.transitionOutSpeed : 0, function() {
                        $.isFunction(success) && success();
                    });
                } catch (err) {
                    $.isFunction(error) && error(err);
                }
            }, this.transitionIn = function(next, success, error) {
                try {
                    next.animate({
                        opacity: 1
                    }, _this.FooBox.options.transitionInSpeed, function() {
                        $.isFunction(success) && success();
                    });
                } catch (err) {
                    $.isFunction(error) && error(err);
                }
            }, this.close = function() {
                _this.element.hide(), _this.FooBox.options.hideScrollbars && $("html, body").css("overflow", ""), 
                $("body").removeClass("fbx-active"), _this.FooBox.raise("foobox.close"), _this.element.find(".fbx-item-current, .fbx-item-next").empty();
            }, this.prev = function(type) {
                if (_this.FooBox.items.indexes.set(_this.FooBox.items.indexes.prev), "string" == typeof type) for (var item = _this.FooBox.items.current(); item.type != type; ) _this.FooBox.items.indexes.set(_this.FooBox.items.indexes.prev), 
                item = _this.FooBox.items.current();
                _this.show(!1), _this.FooBox.raise("foobox.previous");
            }, this.next = function(type) {
                if (_this.FooBox.items.indexes.set(_this.FooBox.items.indexes.next), "string" == typeof type) for (var item = _this.FooBox.items.current(); item.type != type; ) _this.FooBox.items.indexes.set(_this.FooBox.items.indexes.next), 
                item = _this.FooBox.items.current();
                _this.show(!1), _this.FooBox.raise("foobox.next");
            };
        }, FooBox.Instance = function() {
            this.id = FooBox.instances.push(this), this.element = null, this.options = $.extend(!0, {}, FooBox.defaults), 
            this.addons = FooBox.addons.load(this), this.handlers = FooBox.handlers.load(this), 
            this.modal = new FooBox.Modal(this);
            var _this = this;
            this.raise = function(event, args) {
                return FooBox.raise(_this, event, args);
            }, this.init = function(element, options) {
                _this.element = element instanceof jQuery ? element : $(element), _this.options = FooBox.options.merge(_this.options, options || {}), 
                FooBox.addons.call(_this, "preinit", _this.element, _this.options), _this.setup.bind(), 
                _this.items.init(), _this.modal.init(element, _this.options), FooBox.handlers.call(_this, "init", _this.element, _this.options), 
                _this.options.containerCssClass && _this.element.addClass(_this.options.containerCssClass), 
                _this.raise("foobox.initialized");
            }, this.reinit = function(options) {
                _this.options = FooBox.options.merge(_this.options, options || {}), _this.setup.bind(), 
                _this.items.init(), _this.modal.reinit(_this.options), FooBox.handlers.call(_this, "reinit", _this.options), 
                _this.raise("foobox.reinitialized");
            }, this.setup = {
                bind: function() {
                    var fbx = $(_this.element).data("foobox_instance");
                    fbx instanceof FooBox.Instance || $(_this.element).data("foobox_instance", _this), 
                    $(_this.options.externalSelector).unbind("click.foobox").bind("click.foobox", function(e) {
                        e.preventDefault();
                        var selector = $(this).data("foobox"), target = $(selector);
                        return fbx = target.data("foobox_instance"), target.length > 0 && fbx instanceof FooBox.Instance && fbx.modal instanceof FooBox.Modal && fbx.modal.show(!0), 
                        !1;
                    });
                }
            }, this.items = {
                array: [],
                indexes: {
                    prev: -1,
                    current: 0,
                    next: 1,
                    direction: "*",
                    set: function(current) {
                        var now = _this.items.indexes.current;
                        current = current || 0, current = current > _this.items.array.length - 1 ? 0 : 0 > current ? _this.items.array.length - 1 : current;
                        var prev = current - 1, next = current + 1;
                        _this.items.indexes.current = current, _this.items.indexes.prev = 0 > prev ? _this.items.array.length - 1 : prev, 
                        _this.items.indexes.next = next > _this.items.array.length - 1 ? 0 : next, _this.items.indexes.direction = _this.items.indexes._direction(now, current, _this.items.array.length - 1);
                    },
                    _direction: function(previous, current, max) {
                        return 0 == current && previous == max ? ">" : current == max && 0 == previous ? "<" : current > previous ? ">" : previous > current ? "<" : "*";
                    }
                },
                new_array: function() {
                    var item, e, checked = [], index = 0;
                    if ($.isArray(_this.options.items)) for (var i = 0; _this.options.items.length > i; i++) {
                        item = _this.options.items[i];
                        for (var j = 0; _this.handlers.length > j; j++) if (_this.handlers[j].type == item.type) {
                            item.index = index, item.handler = _this.handlers[j], item.handler.defaults(item), 
                            e = _this.raise("foobox.parseItem", {
                                element: null,
                                item: item
                            }), checked.push(e.fb.item), index++;
                            break;
                        }
                    }
                    return checked;
                },
                init: function() {
                    _this.items.array = _this.items.new_array(), _this.items.array.length > 0 || _this.element.is(_this.options.selector) && _this.items.add(_this.element) ? _this.element.unbind("click.foobox").bind("click.foobox", _this.items.clicked) : _this.element.find(_this.options.selector).not(_this.options.excludes).unbind("click.foobox").filter(function() {
                        return _this.items.add(this);
                    }).bind("click.foobox", _this.items.clicked), _this.items.rel(_this.element);
                },
                rel: function(element) {
                    element = element instanceof jQuery ? element : $(element);
                    var rel = element.attr("rel"), len = "string" == typeof _this.options.rel ? _this.options.rel.length : 0;
                    rel && rel.length >= len && rel.substr(0, len) == _this.options.rel && $('[rel="' + rel + '"]').not(_this.options.excludes).not(element).unbind("click.foobox").filter(function() {
                        return _this.items.add(this);
                    }).bind("click.foobox", _this.items.clicked);
                },
                indexOf: function(item, prop) {
                    if (!item) return -1;
                    prop = prop || "url";
                    var i;
                    for (i = 0; _this.items.array.length > i; i++) if (_this.items.array[i][prop] == item[prop]) return i;
                    return -1;
                },
                add: function(element) {
                    element = element instanceof jQuery ? element : $(element);
                    var item = _this.items.parse(element);
                    if (null === item) return !1;
                    var base = element.get(0), index = _this.items.indexOf(item);
                    -1 != index ? (item = _this.items.array[index], base.index = item.index) : base.index = item.index = _this.items.array.push(item) - 1;
                    var fbx = element.data("foobox_instance");
                    return fbx instanceof jQuery || element.data("foobox_instance", _this), !0;
                },
                get: function(element) {
                    element = element instanceof jQuery ? element : $(element);
                    var item = null, index = element.get(0).index;
                    return index && index > 0 && _this.items.array.length - 1 >= index && (item = _this.items.array[index]), 
                    item;
                },
                parse: function(element) {
                    element = element instanceof jQuery ? element : $(element);
                    for (var item, e, i = 0; _this.handlers.length > i; i++) if (_this.handlers[i].handles(element, _this.element)) {
                        item = _this.handlers[i].parse(element), e = _this.raise("foobox.parseItem", {
                            element: element,
                            item: item
                        });
                        break;
                    }
                    return e !== undefined && e.fb.item ? e.fb.item : null;
                },
                error: function(index) {
                    if (_this.items.array.length > index && 1 == _this.items.array[index].error) return _this.items.array[index];
                    var $element, error, handler = FooBox.handlers.get(_this, "html"), isSelector = !1;
                    if (null == handler) return null;
                    if (null !== _this.options.error.match(/^#/i) && $(_this.options.error).length > 0) $element = $(_this.options.error), 
                    isSelector = !0; else {
                        var html = FooBox.format('<div class="fbx-error-msg" data-width="240" data-height="240"><span></span><p>{0}</p></div>', _this.options.error);
                        $element = $(html);
                    }
                    return error = new FooBox.Item(handler.type, $element.get(0), handler), error.selector = 1 == isSelector ? _this.options.error : null, 
                    error.index = index, error.error = !0, error.title = $element.data("title") || null, 
                    error.description = $element.data("description") || null, error.width = $element.data("width") || null, 
                    error.height = $element.data("height") || null, error.content = 1 == isSelector ? null : $element, 
                    error.fullscreen = !0, _this.items.array[index] = error, error;
                },
                current: function() {
                    return _this.items.array[_this.items.indexes.current];
                },
                prev: function() {
                    return _this.items.array[_this.items.indexes.prev];
                },
                next: function() {
                    return _this.items.array[_this.items.indexes.next];
                },
                multiple: function() {
                    return _this.items.array.length > 1;
                },
                clicked: function(e) {
                    return e.preventDefault(), _this.items.indexes.set(this.index), _this.modal.show(!0), 
                    !1;
                }
            };
        }, FooBox.open = function(options) {
            var element = document.createElement("a");
            $(element).foobox(options);
            var fbx = $(element).data("foobox_instance");
            return fbx.modal.show(!0), fbx;
        };
    }
})(jQuery, window, window.console), function($, FooBox) {
    var defaults = {
        captions: {
            animation: "slide",
            enabled: !0,
            descSource: "find",
            hoverDelay: 300,
            maxHeight: .4,
            onlyShowOnHover: !1,
            overrideDesc: !1,
            overrideTitle: !1,
            prettify: !1,
            titleSource: "image_find"
        },
        strings: {
            caption_close: "Close Caption"
        }
    };
    FooBox.Captions = function(instance) {
        this.FooBox = instance, this.timers = {
            hover: new FooBox.Timer()
        };
        var _this = this;
        this.preinit = function(element) {
            element.unbind({
                "foobox.initialized foobox.reinitialized": _this.handlers.initialized,
                "foobox.setupHtml": _this.handlers.setupHtml,
                "foobox.setupOptions": _this.handlers.setupOptions,
                "foobox.parseItem": _this.handlers.parseItem,
                "foobox.onError": _this.handlers.onError
            }).bind({
                "foobox.initialized foobox.reinitialized": _this.handlers.initialized,
                "foobox.setupHtml": _this.handlers.setupHtml,
                "foobox.setupOptions": _this.handlers.setupOptions,
                "foobox.parseItem": _this.handlers.parseItem,
                "foobox.onError": _this.handlers.onError
            });
        }, this.handlers = {
            initialized: function(e) {
                e.fb.instance.element.unbind({
                    "foobox.beforeLoad": _this.handlers.beforeLoad,
                    "foobox.afterLoad": _this.handlers.afterLoad,
                    "foobox.afterResize": _this.handlers.afterResize
                }), e.fb.modal.undelegate("mouseenter.captions mouseleave.captions").find(".fbx-item-current, .fbx-item-next").unbind("click.captions"), 
                e.fb.options.captions.enabled === !0 && (e.fb.instance.element.bind({
                    "foobox.beforeLoad": _this.handlers.beforeLoad,
                    "foobox.afterLoad": _this.handlers.afterLoad,
                    "foobox.afterResize": _this.handlers.afterResize
                }), e.fb.modal.find(".fbx-item-current, .fbx-item-next").bind("click.captions", _this.handlers.toggleCaptions), 
                e.fb.options.captions.onlyShowOnHover === !0 && (e.fb.instance.element.unbind({
                    "foobox.beforeLoad": _this.handlers.beforeLoad,
                    "foobox.afterLoad": _this.handlers.afterLoad
                }), e.fb.modal.delegate(".fbx-inner:not(:has(.fbx-item-error))", "mouseenter.captions", _this.handlers.mouseenter).delegate(".fbx-inner:not(:has(.fbx-item-error))", "mouseleave.captions", _this.handlers.mouseleave)));
            },
            toggleCaptions: function() {
                0 == $(this).has(".fbx-item-error").length && (_this.FooBox.modal.element.find(".fbx-caption").is(":visible") ? (_this.FooBox.modal.element.addClass("fbx-captions-hidden"), 
                _this.hide()) : (_this.FooBox.modal.element.removeClass("fbx-captions-hidden"), 
                _this.show()));
            },
            mouseenter: function(e) {
                return e.preventDefault(), _this.timers.hover.start(function() {
                    _this.show();
                }, _this.FooBox.options.captions.hoverDelay), !1;
            },
            mouseleave: function(e) {
                return e.preventDefault(), _this.timers.hover.start(function() {
                    _this.hide();
                }, _this.FooBox.options.captions.hoverDelay), !1;
            },
            setupHtml: function(e) {
                e.fb.modal.find(".fbx-stage").append('<div class="fbx-caption"></div>');
            },
            setupOptions: function(e) {
                var display = e.fb.options.captions.enabled ? "" : "none";
                e.fb.modal.find(".fbx-caption").css("display", display).bind("click.captions", function() {
                    return e.preventDefault(), !1;
                });
            },
            beforeLoad: function() {
                _this.hide();
            },
            afterLoad: function() {
                _this.show();
            },
            afterResize: function() {
                _this.checkHeight();
            },
            onError: function() {
                _this.hide();
            },
            parseItem: function(e) {
                var opts = e.fb.options.captions;
                if (e.fb.item.captions && 0 != opts.enabled) {
                    var title, desc, caption = "";
                    if (null != e.fb.element) {
                        var tSrc = $(e.fb.element).data("titleSource") || $(e.fb.instance.element).data("titleSource") || opts.titleSource, dSrc = $(e.fb.element).data("descSource") || $(e.fb.instance.element).data("descSource") || opts.descSource;
                        title = e.fb.element.data("title") || _this.text(e.fb.element, tSrc), desc = e.fb.element.data("description") || _this.text(e.fb.element, dSrc);
                    } else title = e.fb.item.title, desc = e.fb.item.description;
                    title && title == desc && (desc = null), caption = "string" == typeof title && title.length > 0 ? FooBox.format('<div class="fbx-caption-title">{0}</div>', title) : caption, 
                    caption = "string" == typeof desc && desc.length > 0 ? caption + FooBox.format('<div class="fbx-caption-desc">{0}</div>', desc) : caption, 
                    e.fb.item.title = title, e.fb.item.description = desc, e.fb.item.caption = caption, 
                    e.fb.instance.raise("foobox.createCaption", {
                        element: e.fb.element,
                        item: e.fb.item
                    });
                }
            }
        }, this.text = function(element, source) {
            var result;
            switch (source) {
              case "find":
                result = $.trim(element.attr("title")) || $.trim(element.find("img:first").attr("title")) || $.trim(element.find("img:first").attr("alt"));
                break;

              case "image_find":
                result = $.trim(element.find("img:first").attr("title") || element.find("img:first").attr("alt"));
                break;

              case "image":
                result = $.trim(element.find("img:first").attr("title"));
                break;

              case "image_alt":
                result = $.trim(element.find("img:first").attr("alt"));
                break;

              case "anchor":
                result = $.trim(element.attr("title"));
                break;

              default:
                result = null;
            }
            return _this.FooBox.options.captions.prettify && (result = _this.prettifier(result)), 
            result;
        }, this.hide = function() {
            var item = _this.FooBox.items.current(), $caption = _this.FooBox.modal.element.find(".fbx-caption");
            if (!_this.FooBox.options.captions.enabled || !item.captions || "string" != typeof item.caption || 0 == item.caption.length) return $caption.css("display", "none"), 
            void 0;
            switch (_this.FooBox.options.captions.animation) {
              case "fade":
                $caption.stop(!0, !0).fadeOut(400);
                break;

              case "slide":
                $caption.stop(!0, !0).slideUp(400);
                break;

              default:
                $caption.css("display", "none");
            }
        }, this.show = function() {
            var item = _this.FooBox.items.current(), $caption = _this.FooBox.modal.element.find(".fbx-caption");
            if (!_this.FooBox.options.captions.enabled || !item.captions || "string" != typeof item.caption || 0 == item.caption.length || _this.FooBox.modal.element.hasClass("fbx-captions-hidden")) return $caption.css("display", "none"), 
            void 0;
            switch ($caption.html(item.caption), $caption.find('a[href^="#"]').filter(function() {
                var identifier = $(this).attr("href"), target = $(identifier), fbx = target.data("foobox_instance");
                return target.length > 0 && fbx instanceof FooBox.Instance ? ($(this).data("hrefTarget", target.get(0)), 
                !0) : !1;
            }).unbind("click.captions").bind("click.captions", function(e) {
                e.preventDefault();
                var target = $(this).data("hrefTarget"), fbx = $(target).data("foobox_instance");
                return fbx instanceof FooBox.Instance && (_this.FooBox.modal.close(), fbx.items.indexes.set(target.index), 
                fbx.modal.show()), !1;
            }), $('<a href="#caption_close" title="' + _this.FooBox.options.strings.caption_close + '" class="fbx-caption-close">&times;</a>').bind("click.captions", function(e) {
                return e.preventDefault(), _this.FooBox.modal.element.addClass("fbx-captions-hidden"), 
                _this.hide(), !1;
            }).prependTo($caption), _this.checkHeight(), _this.FooBox.options.captions.animation) {
              case "fade":
                $caption.stop(!0, !0).fadeIn(400);
                break;

              case "slide":
                $caption.stop(!0, !0).slideDown(400);
                break;

              default:
                $caption.css("display", "");
            }
        }, this.checkHeight = function() {
            var modal = _this.FooBox.modal.element, item = _this.FooBox.items.current();
            if (_this.FooBox.options.captions.enabled && item.captions) {
                var $caption = modal.find(".fbx-caption"), $desc = $caption.find(".fbx-caption-desc");
                $desc.length > 0 && $caption.outerHeight(!0) > modal.find(".fbx-inner").height() * _this.FooBox.options.captions.maxHeight ? $desc.hide() : $desc.show();
            }
        }, this.prettifier = function(text) {
            return "string" != typeof text ? null : (text = text.replace(/\s*-\d+/g, "").replace(/\s*_\d+/g, "").replace(/-/g, " ").replace(/_/g, " "), 
            text = text.replace(/\w\S*/g, function(txt) {
                return -1 != txt.indexOf("#") ? txt : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }));
        };
    }, FooBox.addons.register(FooBox.Captions, defaults);
}(jQuery, window.FooBox), function($, FooBox) {
    var defaults = {
        deeplinking: {
            enabled: !0,
            prefix: "foobox"
        }
    };
    FooBox.DeepLinking = function(instance) {
        this.FooBox = instance;
        var _this = this;
        this.preinit = function(element) {
            element.unbind("foobox.initialized foobox.reinitialized", _this.handlers.initialized).bind("foobox.initialized foobox.reinitialized", _this.handlers.initialized);
        }, this.handlers = {
            initialized: function(e) {
                if (e.fb.instance.element.unbind({
                    "foobox.afterLoad": _this.handlers.afterLoad,
                    "foobox.close": _this.handlers.close
                }), e.fb.options.deeplinking.enabled === !0) {
                    e.fb.instance.element.bind({
                        "foobox.afterLoad": _this.handlers.afterLoad,
                        "foobox.close": _this.handlers.close
                    });
                    var hash = _this.hash.get();
                    if (hash && _this.FooBox.id == hash.id) {
                        var item = _this.FooBox.items.array[hash.index];
                        _this.FooBox.raise("foobox.hasHash", {
                            item: item
                        }), setTimeout(function() {
                            $(item.element).click();
                        }, 50);
                    }
                }
            },
            afterLoad: function() {
                _this.hash.set();
            },
            close: function() {
                _this.hash.clear();
            }
        }, this.hash = {
            get: function() {
                if (-1 === location.hash.indexOf("#" + _this.FooBox.options.deeplinking.prefix)) return null;
                var hash = location.hash;
                "/" == hash.substr(-1) && (hash = hash.substr(0, hash.length - 1));
                var regex = hash.match(/\/([^\/]+)\/?([^\/]+)?$/), index = regex[1], name = regex[2], actual = -1;
                "string" == typeof name && $.each(_this.FooBox.items.array, function(i, item) {
                    return item.deeplink && item.deeplink === name ? (actual = i, !1) : !0;
                }), -1 == actual && (actual = index);
                var id = hash.substring(0, hash.indexOf("/"));
                return id = id.replace("#" + _this.FooBox.options.deeplinking.prefix + "-", ""), 
                {
                    id: id,
                    index: actual
                };
            },
            set: function() {
                var item = _this.FooBox.items.current(), hash = _this.FooBox.options.deeplinking.prefix + "-" + _this.FooBox.id + "/" + item.index, deeplink = item.deeplink;
                deeplink && (hash += "/" + deeplink), window.location.replace(("" + window.location).split("#")[0] + "#" + hash);
            },
            clear: function() {
                window.location.replace(("" + window.location).split("#")[0] + "#/");
            }
        };
    }, FooBox.addons.register(FooBox.DeepLinking, defaults);
}(jQuery, window.FooBox), function($, FooBox) {
    FooBox.Events = function(instance) {
        this.FooBox = instance;
        var _this = this;
        this.preinit = function(element) {
            element.unbind({
                "foobox.afterLoad": _this.handlers.foobox_image_onload,
                "foobox.beforeLoad": _this.handlers.foobox_image_custom_caption
            }).bind({
                "foobox.afterLoad": _this.handlers.foobox_image_onload,
                "foobox.beforeLoad": _this.handlers.foobox_image_custom_caption
            });
        }, this.raise = function(eventName, args) {
            args = args || {};
            var e = $.Event(eventName);
            return $.extend(!0, e, args), _this.FooBox.element.trigger(e), e;
        }, this.handlers = {
            foobox_image_onload: function(e) {
                "image" == e.fb.item.type && _this.raise("foobox_image_onload", {
                    thumb: {
                        jq: e.fb.item.element,
                        target: e.fb.item.url
                    }
                });
            },
            foobox_image_custom_caption: function(e) {
                var ne = _this.raise("foobox_image_custom_caption", {
                    thumb: e.fb.item.element,
                    title: e.fb.item.title,
                    desc: e.fb.item.description,
                    handled: !1
                });
                if (1 == ne.handled) {
                    e.fb.item.title = ne.title, e.fb.item.description = ne.desc;
                    var caption = "string" == typeof e.fb.item.title && e.fb.item.title.length > 0 ? FooBox.format('<div class="fbx-caption-title">{0}</div>', e.fb.item.title) : "";
                    caption = "string" == typeof e.fb.item.description && e.fb.item.description.length > 0 ? caption + FooBox.format('<div class="fbx-caption-desc">{0}</div>', e.fb.item.description) : caption, 
                    e.fb.item.caption = caption;
                }
            }
        };
    }, FooBox.addons.register(FooBox.Events);
}(jQuery, window.FooBox), function($, FooBox) {
    var defaults = {
        fullscreen: {
            enabled: !1,
            force: !1,
            useAPI: !0
        },
        strings: {
            fullscreen: "Fullscreen",
            minimize: "Minimize"
        }
    };
    FooBox.Fullscreen = function(instance) {
        this.FooBox = instance;
        var _this = this, _closeOnOverlayClick = !1;
        this.preinit = function(element) {
            element.unbind({
                "foobox.initialized foobox.reinitialized": _this.handlers.initialized,
                "foobox.setupHtml": _this.handlers.setupHtml,
                "foobox.setupOptions": _this.handlers.setupOptions,
                "foobox.close": _this.handlers.onClose,
                "foobox.keydown": _this.handlers.onKeydown
            }).bind({
                "foobox.initialized foobox.reinitialized": _this.handlers.initialized,
                "foobox.setupHtml": _this.handlers.setupHtml,
                "foobox.setupOptions": _this.handlers.setupOptions,
                "foobox.close": _this.handlers.onClose,
                "foobox.keydown": _this.handlers.onKeydown
            });
        }, this.handlers = {
            initialized: function(e) {
                e.fb.instance.element.unbind({
                    "foobox.afterShow": _this.handlers.afterShow,
                    "foobox.beforeLoad": _this.handlers.beforeLoad
                }), e.fb.modal.find(".fbx-fullscreen-toggle").unbind("click.foobox", _this.handlers.onClick), 
                $(document).unbind("webkitfullscreenchange mozfullscreenchange fullscreenchange", _this.handlers.onFullscreenChange).bind("webkitfullscreenchange mozfullscreenchange fullscreenchange", _this.handlers.onFullscreenChange), 
                e.fb.options.fullscreen.enabled === !0 && (e.fb.instance.element.bind({
                    "foobox.beforeLoad": _this.handlers.beforeLoad
                }), e.fb.modal.find(".fbx-fullscreen-toggle").bind("click.foobox", _this.handlers.onClick)), 
                e.fb.instance.element.bind({
                    "foobox.afterShow": _this.handlers.afterShow
                });
            },
            setupHtml: function(e) {
                e.fb.modal.find(".fbx-inner").append('<a href="#fullscreen" title="' + _this.FooBox.options.strings.fullscreen + '" class="fbx-fullscreen-toggle fbx-btn-transition"></a>');
            },
            setupOptions: function(e) {
                1 == e.fb.options.fullscreen.enabled ? e.fb.modal.addClass("fbx-fullscreen") : e.fb.modal.removeClass("fbx-fullscreen"), 
                1 == e.fb.options.fullscreen.force && e.fb.modal.find(".fbx-fullscreen-toggle").hide();
            },
            afterShow: function(e) {
                e.fb.options.fullscreen.force === !0 && (_this.FooBox.modal.element.addClass("fbx-fullscreen"), 
                _this.fullscreen.launch());
            },
            beforeLoad: function(e) {
                if (e.fb.modal.hasClass("fbx-fullscreen-mode") && 1 != e.fb.item.fullscreen) switch (e.fb.handled = !0, 
                e.fb.instance.items.indexes.direction) {
                  case "<":
                    e.fb.instance.modal.prev();
                    break;

                  default:
                    e.fb.instance.modal.next();
                } else 1 != e.fb.item.fullscreen ? e.fb.modal.removeClass("fbx-fullscreen").find(".fbx-fullscreen-toggle").hide() : e.fb.modal.addClass("fbx-fullscreen").find(".fbx-fullscreen-toggle").show();
            },
            onClick: function(e) {
                return e.preventDefault(), _this.FooBox.modal.element.hasClass("fbx-fullscreen-mode") ? _this.fullscreen.cancel() : _this.fullscreen.launch(), 
                !1;
            },
            onClose: function() {
                _this.fullscreen.cancel();
            },
            onKeydown: function(e) {
                e.fb.modal.hasClass("fbx-fullscreen-mode") && 27 == e.fb.keyCode && (_this.fullscreen.cancel(), 
                1 == e.fb.options.fullscreen.force && e.fb.instance.modal.close());
            },
            onFullscreenChange: function() {
                document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen ? _this.fullscreen.apply() : _this.fullscreen.remove();
            }
        }, this.fullscreen = {
            launch: function() {
                if (_this.FooBox.options.fullscreen.useAPI === !0 && _this.FooBox.options.fullscreen.force === !1) {
                    var modal = _this.FooBox.modal.element.get(0);
                    modal.requestFullScreen ? modal.requestFullScreen() : modal.mozRequestFullScreen ? modal.mozRequestFullScreen() : modal.webkitRequestFullScreen ? modal.webkitRequestFullScreen() : _this.fullscreen.apply();
                } else _this.fullscreen.apply();
            },
            cancel: function() {
                _this.FooBox.modal.element.hasClass("fbx-fullscreen-mode") && (_this.FooBox.options.fullscreen.useAPI === !0 && _this.FooBox.options.fullscreen.force === !1 ? document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : _this.fullscreen.remove() : _this.fullscreen.remove());
            },
            apply: function() {
                var item = _this.FooBox.items.current();
                item && (_closeOnOverlayClick = _this.FooBox.options.closeOnOverlayClick, _this.FooBox.options.closeOnOverlayClick = !1, 
                _this.FooBox.modal.element.addClass("fbx-fullscreen-mode").find(".fbx-fullscreen-toggle").attr("title", _this.FooBox.options.strings.minimize), 
                _this.FooBox.modal.resize(item.handler.getSize(item))), _this.FooBox.raise("foobox.fullscreenEnabled");
            },
            remove: function() {
                var item = _this.FooBox.items.current();
                item && (_this.FooBox.options.closeOnOverlayClick = _closeOnOverlayClick, _this.FooBox.modal.element.removeClass("fbx-fullscreen-mode").find(".fbx-fullscreen-toggle").attr("title", _this.FooBox.options.strings.fullscreen), 
                _this.FooBox.modal.resize(item.handler.getSize(item))), _this.FooBox.raise("foobox.fullscreenDisabled");
            }
        };
    }, FooBox.addons.register(FooBox.Fullscreen, defaults);
}(jQuery, window.FooBox), function($, FooBox) {
    FooBox.Keyboard = function(instance) {
        this.FooBox = instance;
        var _this = this;
        this.preinit = function(element) {
            element.unbind("foobox.initialized foobox.reinitialized", _this.handlers.initialized).bind("foobox.initialized foobox.reinitialized", _this.handlers.initialized);
        }, this.handlers = {
            initialized: function() {
                $(document).unbind("keydown.foobox", _this.handlers.onKeydown).bind("keydown.foobox", _this.handlers.onKeydown);
            },
            onKeydown: function(e) {
                var modal = _this.FooBox.modal;
                if (!modal.element.is(":visible")) return !0;
                var key = e.which;
                return modal.element.hasClass("fbx-fullscreen-mode") || 27 !== key ? _this.FooBox.items.multiple() && 37 === key ? modal.prev() : _this.FooBox.items.multiple() && 39 === key && modal.next() : modal.close(), 
                _this.FooBox.raise("foobox.keydown", {
                    keyCode: key
                }), !0;
            }
        };
    }, FooBox.addons.register(FooBox.Keyboard);
}(jQuery, window.FooBox), function($, FooBox) {
    var defaults = {
        hideNavOnMobile: !1,
        resizeTimeout: 300,
        breakpoints: {
            phone: 480,
            tablet: 1024
        }
    };
    FooBox.BPInfo = function(breakpoints) {
        this.width = window.innerWidth || (document.body ? document.body.offsetWidth : 0), 
        this.height = window.innerHeight || (document.body ? document.body.offsetHeight : 0), 
        this.orientation = this.width > this.height ? "fbx-landscape" : "fbx-portrait";
        var breakpoint, current = null;
        if ($.isArray(breakpoints)) for (var i = 0; breakpoints.length > i; i++) if (breakpoint = breakpoints[i], 
        breakpoint && breakpoint.width && this.width <= breakpoint.width) {
            current = breakpoint;
            break;
        }
        this.breakpoint = null == current ? "fbx-desktop" : current.name;
    }, FooBox.Responsive = function(instance) {
        this.FooBox = instance, this.breakpoint = {
            values: [],
            names: ""
        }, this.timers = {
            resize: new FooBox.Timer()
        };
        var _this = this;
        this.preinit = function(element) {
            element.unbind("foobox.initialized foobox.reinitialized", _this.handlers.initialized).bind("foobox.initialized foobox.reinitialized", _this.handlers.initialized);
        }, this.handlers = {
            initialized: function() {
                _this.setup.breakpoints(), _this.style(), $(window).unbind("resize.foobox", _this.handlers.resize).bind("resize.foobox", _this.handlers.resize);
            },
            resize: function() {
                _this.timers.resize.start(function() {
                    if (_this.style(), _this.FooBox.modal.element.is(":visible")) {
                        var item = _this.FooBox.items.current(), size = item.handler.getSize(item);
                        _this.FooBox.modal.resize(size);
                    }
                }, _this.FooBox.options.resizeTimeout);
            }
        }, this.setup = {
            breakpoints: function() {
                _this.breakpoint.values = [], _this.breakpoint.names = "";
                for (var name in _this.FooBox.options.breakpoints) _this.breakpoint.values.push({
                    name: _this.fixName(name),
                    width: _this.FooBox.options.breakpoints[name]
                }), _this.breakpoint.names += _this.fixName(name) + " ";
                _this.breakpoint.values.sort(function(a, b) {
                    return a.width - b.width;
                });
            }
        }, this.fixName = function(name) {
            return /^fbx-[a-zA-Z0-9]/.test(name) ? name : "fbx-" + name;
        }, this.style = function() {
            var info = new FooBox.BPInfo(_this.breakpoint.values), modal = _this.FooBox.modal.element;
            modal.removeClass(_this.breakpoint.names).removeClass("fbx-desktop fbx-landscape fbx-portrait").addClass(info.breakpoint).addClass(info.orientation), 
            _this.FooBox.options.hideNavOnMobile === !0 ? modal.addClass("fbx-no-nav") : modal.removeClass("fbx-no-nav");
        };
    }, FooBox.addons.register(FooBox.Responsive, defaults);
}(jQuery, window.FooBox), function($, FooBox) {
    var defaults = {
        slideshow: {
            autostart: !1,
            enabled: !0,
            imagesOnly: !1,
            mousestopTimeout: 300,
            timeout: 6e3,
            sensitivity: 130,
            skipErrors: !1
        },
        strings: {
            play: "Play",
            pause: "Pause"
        }
    };
    FooBox.Slideshow = function(instance) {
        this.FooBox = instance, this.autostart = !1, this.running = !1, this.paused = 0, 
        this.remaining = 0, this.timers = {
            mousestop: new FooBox.Timer()
        };
        var _this = this, start = null;
        this.preinit = function(element, options) {
            _this.autostart = options.slideshow.autostart, element.unbind({
                "foobox.initialized foobox.reinitialized": _this.handlers.initialized,
                "foobox.setupHtml": _this.handlers.setupHtml,
                "foobox.setupOptions": _this.handlers.setupOptions,
                "foobox.onError": _this.handlers.onError
            }).bind({
                "foobox.initialized foobox.reinitialized": _this.handlers.initialized,
                "foobox.setupHtml": _this.handlers.setupHtml,
                "foobox.setupOptions": _this.handlers.setupOptions,
                "foobox.onError": _this.handlers.onError
            });
        }, this.handlers = {
            initialized: function(e) {
                e.fb.instance.element.unbind({
                    "foobox.beforeLoad": _this.handlers.beforeLoad,
                    "foobox.afterLoad": _this.handlers.afterLoad,
                    "foobox.close": _this.handlers.onClose,
                    "foobox.previous foobox.next": _this.handlers.onChange,
                    "foobox.keydown": _this.handlers.onKeydown,
                    "foobox.fullscreenEnabled": _this.handlers.fullscreenEnabled,
                    "foobox.fullscreenDisabled": _this.handlers.fullscreenDisabled
                }), e.fb.modal.undelegate("click.slideshow").unbind("mousemove.foobox").find(".fbx-play, .fbx-pause").unbind("mouseenter.foobox mouseleave.foobox"), 
                e.fb.options.slideshow.enabled === !0 && e.fb.instance.items.multiple() && (e.fb.instance.element.bind({
                    "foobox.beforeLoad": _this.handlers.beforeLoad,
                    "foobox.afterLoad": _this.handlers.afterLoad,
                    "foobox.close": _this.handlers.onClose,
                    "foobox.previous foobox.next": _this.handlers.onChange,
                    "foobox.keydown": _this.handlers.onKeydown,
                    "foobox.fullscreenEnabled": _this.handlers.fullscreenEnabled,
                    "foobox.fullscreenDisabled": _this.handlers.fullscreenDisabled
                }), e.fb.modal.delegate(".fbx-play", "click.slideshow", _this.handlers.playClicked).delegate(".fbx-pause", "click.slideshow", _this.handlers.pauseClicked), 
                e.fb.modal.hasClass("fbx-playpause-center") && e.fb.modal.bind("mousemove.foobox", _this.handlers.mousemove).find(".fbx-play, .fbx-pause").bind("mouseenter.foobox", _this.handlers.mouseenter).bind("mouseleave.foobox", _this.handlers.mouseleave));
            },
            setupHtml: function(e) {
                e.fb.options.slideshow.enabled === !0 && e.fb.modal.find(".fbx-inner").append('<div class="fbx-progress"></div>').append('<a href="#playpause" class="fbx-play fbx-btn-transition"></a>');
            },
            setupOptions: function(e) {
                if (e.fb.options.slideshow.enabled === !0) {
                    var display = 1 == e.fb.options.showButtons && e.fb.instance.items.multiple() ? "" : "none";
                    e.fb.modal.addClass("fbx-slideshow").find(".fbx-progress, .fbx-play, .fbx-pause").css("display", display), 
                    e.fb.modal.find(".fbx-play").attr("title", e.fb.options.strings.play), e.fb.modal.find(".fbx-pause").attr("title", e.fb.options.strings.pause);
                }
            },
            beforeLoad: function(e) {
                var display = 1 == e.fb.options.showButtons && e.fb.instance.items.multiple() ? "" : "none";
                e.fb.modal.hasClass("fbx-fullscreen-mode") || e.fb.modal.find(".fbx-play, .fbx-pause").css("display", display), 
                start = null, _this.timers.mousestop.stop();
            },
            afterLoad: function() {
                1 == _this.autostart && _this.start();
            },
            onError: function(e) {
                if (e.fb.options.slideshow.skipErrors === !0 && e.fb.instance.modal._first === !1) switch (e.fb.handled = !0, 
                e.fb.instance.items.indexes.direction) {
                  case "<":
                    e.fb.instance.modal.prev(e.fb.options.slideshow.imagesOnly === !0 ? "image" : null);
                    break;

                  default:
                    e.fb.instance.modal.next(e.fb.options.slideshow.imagesOnly === !0 ? "image" : null);
                } else 1 == _this.autostart && _this.start();
            },
            onClose: function() {
                _this.stop(!1);
            },
            onChange: function() {
                _this.stop(1 == _this.autostart || 1 == _this.running);
            },
            onKeydown: function(e) {
                return 32 != e.fb.keyCode ? !0 : (e.preventDefault(), 1 == _this.running ? _this.pause() : _this.start(), 
                !1);
            },
            fullscreenEnabled: function(e) {
                e.fb.modal.hasClass("fbx-fullscreen-mode") && e.fb.modal.hasClass("fbx-playpause-center") && _this.timers.mousestop.start(function() {
                    start = null, e.fb.modal.find(".fbx-play, .fbx-pause").fadeOut("fast");
                }, _this.FooBox.options.slideshow.mousestopTimeout);
            },
            fullscreenDisabled: function(e) {
                var display = 1 == e.fb.options.showButtons && e.fb.instance.items.multiple() ? "" : "none";
                !e.fb.modal.hasClass("fbx-fullscreen-mode") && e.fb.modal.hasClass("fbx-playpause-center") && (e.fb.modal.find(".fbx-play, .fbx-pause").removeClass("fbx-active").css("display", display), 
                start = null, _this.timers.mousestop.stop());
            },
            playClicked: function(e) {
                return e.preventDefault(), _this.start(), !1;
            },
            pauseClicked: function(e) {
                return e.preventDefault(), _this.pause(), !1;
            },
            mousemove: function(e) {
                var s = _this.FooBox.options.slideshow.sensitivity, m = _this.FooBox.modal.element;
                if (m.hasClass("fbx-fullscreen-mode") && !m.hasClass("fbx-loading") && !m.hasClass("fbx-error") && !m.hasClass("fbx-playpause-active") && m.hasClass("fbx-playpause-center")) if (null == start) start = {}, 
                start.X = e.pageX, start.Y = e.pageY; else if (start.X - e.pageX >= s || start.Y - e.pageY >= s || -s >= start.X - e.pageX || -s >= start.Y - e.pageY) {
                    var playpause = m.find(".fbx-play, .fbx-pause");
                    playpause.is(":visible") || playpause.fadeIn("fast"), _this.timers.mousestop.start(function() {
                        start = null, playpause.fadeOut("fast");
                    }, _this.FooBox.options.slideshow.mousestopTimeout);
                }
            },
            mouseenter: function() {
                var m = _this.FooBox.modal.element;
                m.hasClass("fbx-fullscreen-mode") && !m.hasClass("fbx-error") && m.hasClass("fbx-playpause-center") && (m.addClass("fbx-playpause-active"), 
                start = null, _this.timers.mousestop.stop());
            },
            mouseleave: function() {
                var m = _this.FooBox.modal.element;
                m.hasClass("fbx-fullscreen-mode") && !m.hasClass("fbx-error") && m.hasClass("fbx-playpause-center") && (m.removeClass("fbx-playpause-active"), 
                _this.timers.mousestop.start(function() {
                    start = null, m.find(".fbx-play, .fbx-pause").fadeOut("fast");
                }, _this.FooBox.options.slideshow.mousestopTimeout));
            }
        }, this.start = function() {
            _this.remaining = 1 > _this.remaining ? _this.FooBox.options.slideshow.timeout : _this.remaining, 
            _this.autostart = !1, _this.running = !0, _this.FooBox.modal.element.find(".fbx-progress").css("width", _this.paused + "%").show().animate({
                width: "100%"
            }, _this.remaining, "linear", function() {
                _this.paused = 0, _this.remaining = _this.FooBox.options.slideshow.timeout, _this.autostart = !0, 
                _this.FooBox.modal.next(_this.FooBox.options.slideshow.imagesOnly === !0 ? "image" : null);
            }), _this.FooBox.modal.element.find(".fbx-play").attr("title", _this.FooBox.options.strings.pause).toggleClass("fbx-play fbx-pause"), 
            _this.FooBox.raise("foobox.slideshowStart");
        }, this.stop = function(autostart) {
            _this.paused = 0, _this.FooBox.modal.element.find(".fbx-progress").stop().hide().css("width", "0%"), 
            _this.running = !1, _this.autostart = autostart, _this.remaining = _this.FooBox.options.slideshow.timeout, 
            autostart || _this.FooBox.modal.element.find(".fbx-pause").attr("title", _this.FooBox.options.strings.play).toggleClass("fbx-play fbx-pause"), 
            _this.FooBox.raise("foobox.slideshowStop");
        }, this.pause = function() {
            var p = _this.FooBox.modal.element.find(".fbx-progress"), pw = p.stop().css("width"), pos = p.css("position"), cw = "fixed" == pos ? _this.FooBox.modal.element.css("width") : _this.FooBox.modal.element.find(".fbx-inner").css("width");
            _this.running = !1, _this.paused = 100 * (parseInt(pw, 0) / parseInt(cw, 0)), _this.remaining = _this.FooBox.options.slideshow.timeout - _this.FooBox.options.slideshow.timeout * (_this.paused / 100), 
            _this.FooBox.modal.element.find(".fbx-pause").attr("title", _this.FooBox.options.strings.play).toggleClass("fbx-play fbx-pause"), 
            _this.FooBox.raise("foobox.slideshowPause");
        };
    }, FooBox.addons.register(FooBox.Slideshow, defaults);
}(jQuery, window.FooBox), function($, FooBox) {
    var defaults = {
        social: {
            animation: "fade",
            enabled: !1,
            position: "fbx-top",
            onlyShowOnHover: !1,
            hoverDelay: 300,
            links: [ {
                css: "fbx-facebook",
                supports: [ "image", "video" ],
                title: "Facebook",
                url: "http://www.facebook.com/sharer.php?s=100&p[url]={url}&p[images][0]={img}&p[title]={title}&p[summary]={desc}"
            }, {
                css: "fbx-google-plus",
                supports: [ "image", "video" ],
                title: "Google+",
                url: "https://plus.google.com/share?url={url-ne}"
            }, {
                css: "fbx-twitter",
                supports: [ "image", "video" ],
                title: "Twitter",
                url: "https://twitter.com/share?url={url}&text={title}",
                titleSource: "pageTitle",
                titleCustom: "Custom Tweet Text!"
            }, {
                css: "fbx-pinterest",
                supports: [ "image" ],
                title: "Pinterest",
                url: "https://pinterest.com/pin/create/bookmarklet/?media={img}&url={url}&title={title}&is_video=false&description={desc}"
            }, {
                css: "fbx-linkedin",
                supports: [ "image", "video" ],
                title: "LinkedIn",
                url: "http://www.linkedin.com/shareArticle?url={url}&title={title}"
            }, {
                css: "fbx-buffer",
                supports: [ "image", "video" ],
                title: "Buffer",
                url: "#"
            }, {
                css: "fbx-download",
                supports: [ "image" ],
                title: "Download",
                url: "#"
            }, {
                css: "fbx-email",
                supports: [ "image", "video" ],
                title: "Email",
                url: "mailto:"
            } ]
        }
    };
    FooBox.Social = function(instance) {
        this.FooBox = instance, this.timers = {
            hover: new FooBox.Timer()
        };
        var _this = this;
        this.preinit = function(element) {
            element.unbind({
                "foobox.initialized foobox.reinitialized": _this.handlers.initialized,
                "foobox.setupHtml": _this.handlers.setupHtml,
                "foobox.setupOptions": _this.handlers.setupOptions,
                "foobox.onError": _this.handlers.onError
            }).bind({
                "foobox.initialized foobox.reinitialized": _this.handlers.initialized,
                "foobox.setupHtml": _this.handlers.setupHtml,
                "foobox.setupOptions": _this.handlers.setupOptions,
                "foobox.onError": _this.handlers.onError
            });
        }, this.handlers = {
            initialized: function(e) {
                e.fb.instance.element.unbind({
                    "foobox.beforeLoad": _this.handlers.beforeLoad,
                    "foobox.afterLoad": _this.handlers.afterLoad
                }), e.fb.modal.undelegate("mouseenter.social mouseleave.social").find(".fbx-item-current, .fbx-item-next").unbind("click.social"), 
                e.fb.options.social.enabled === !0 && (e.fb.instance.element.bind({
                    "foobox.beforeLoad": _this.handlers.beforeLoad,
                    "foobox.afterLoad": _this.handlers.afterLoad
                }), e.fb.modal.find(".fbx-item-current, .fbx-item-next").bind("click.social", _this.handlers.toggleSocial), 
                e.fb.options.social.onlyShowOnHover === !0 && (e.fb.instance.element.unbind({
                    "foobox.beforeLoad": _this.handlers.beforeLoad,
                    "foobox.afterLoad": _this.handlers.afterLoad
                }), e.fb.modal.delegate(".fbx-inner:not(:has(.fbx-item-error))", "mouseenter.social", _this.handlers.mouseenter).delegate(".fbx-inner:not(:has(.fbx-item-error))", "mouseleave.social", _this.handlers.mouseleave)));
            },
            toggleSocial: function() {
                0 == $(this).has(".fbx-item-error").length && (_this.FooBox.modal.element.find(".fbx-social").is(":visible") ? (_this.FooBox.modal.element.addClass("fbx-social-hidden"), 
                _this.hide()) : (_this.FooBox.modal.element.removeClass("fbx-social-hidden"), _this.show()));
            },
            mouseenter: function(e) {
                return e.preventDefault(), _this.timers.hover.start(function() {
                    _this.show();
                }, _this.FooBox.options.social.hoverDelay), !1;
            },
            mouseleave: function(e) {
                return e.preventDefault(), _this.timers.hover.start(function() {
                    _this.hide();
                }, _this.FooBox.options.social.hoverDelay), !1;
            },
            setupHtml: function(e) {
                for (var $social = $('<div class="fbx-social"></div>'), i = 0; e.fb.options.social.links.length > i; i++) {
                    var link = e.fb.options.social.links[i];
                    $social.append('<a href="' + link.url + '" rel="nofollow" target="_blank" class="' + link.css + '" title="' + link.title + '"></a>');
                }
                e.fb.modal.find(".fbx-inner").append($social);
            },
            setupOptions: function(e) {
                e.fb.modal.find(".fbx-social").addClass(e.fb.options.social.position).css("display", "none");
            },
            beforeLoad: function(e) {
                1 != e.fb.options.social.onlyShowOnHover && _this.FooBox.modal.element.find(".fbx-social").hide();
            },
            afterLoad: function(e) {
                if (0 == e.fb.modal.find(".fbx-item-error").length && !$(e.fb.item.element).hasClass("no-social")) for (var i = 0; e.fb.options.social.links.length > i; i++) {
                    var link = e.fb.options.social.links[i], $button = e.fb.modal.find("." + link.css);
                    if ($button.length > 0) {
                        -1 !== $.inArray(e.fb.item.type, link.supports) ? $button.show() : $button.hide();
                        var url = link.url;
                        if (-1 != url.indexOf("{url-ne}") && (url = url.replace(/{url-ne}/g, location.href)), 
                        -1 != url.indexOf("{url}") && (url = url.replace(/{url}/g, encodeURIComponent(location.href))), 
                        -1 != url.indexOf("{img-ne}") && (url = url.replace(/{img-ne}/g, e.fb.item.url)), 
                        -1 != url.indexOf("{img}")) {
                            var img = decodeURIComponent(e.fb.item.url);
                            url = url.replace(/{img}/g, encodeURIComponent(img));
                        }
                        if (-1 != url.indexOf("{title}")) {
                            var title = e.fb.item.title || "";
                            title = "caption" == link.titleSource ? e.fb.item.title + (e.fb.item.description ? " - " + e.fb.item.description : "") : "h1" == link.titleSource ? $("h1:first").text() : "custom" == link.titleSource ? link.titleCustom : document.title + (e.fb.item.title ? " - " + e.fb.item.title : ""), 
                            title = title.replace(/(<([^>]+)>)/gi, ""), url = url.replace(/{title}/g, encodeURIComponent(title));
                        }
                        if (-1 != url.indexOf("{desc}")) {
                            var desc = e.fb.item.description || "";
                            desc = desc.replace(/(<([^>]+)>)/gi, ""), url = url.replace(/{desc}/g, encodeURIComponent(desc));
                        }
                        $button.attr("href", url);
                    }
                }
                1 != e.fb.options.social.onlyShowOnHover && _this.show();
            },
            onError: function(e) {
                e.fb.modal.find(".fbx-social").css("display", "none");
            }
        }, this.hide = function() {
            var item = _this.FooBox.items.current(), $social = _this.FooBox.modal.element.find(".fbx-social");
            if (!_this.FooBox.options.social.enabled || !item.social) return $social.css("display", "none"), 
            void 0;
            switch (_this.FooBox.options.social.animation) {
              case "fade":
                $social.stop(!0, !0).fadeOut(600);
                break;

              case "slide":
                $social.stop(!0, !0).slideUp(400);
                break;

              default:
                $social.css("display", "none");
            }
        }, this.show = function() {
            var item = _this.FooBox.items.current(), $social = _this.FooBox.modal.element.find(".fbx-social");
            if (!_this.FooBox.options.social.enabled || !item.social || _this.FooBox.modal.element.hasClass("fbx-social-hidden")) return $social.css("display", "none"), 
            void 0;
            switch (_this.FooBox.options.social.animation) {
              case "fade":
                $social.stop(!0, !0).fadeIn(600);
                break;

              case "slide":
                $social.stop(!0, !0).slideDown(400);
                break;

              default:
                $social.css("display", "");
            }
        };
    }, FooBox.addons.register(FooBox.Social, defaults);
}(jQuery, window.FooBox), function($, FooBox) {
    var defaults = {
        swipe: {
            enabled: !0,
            min: 80
        }
    };
    FooBox.Swipe = function(instance) {
        this.FooBox = instance, this.isMoving = !1;
        var startX, _this = this;
        this.preinit = function(element) {
            element.unbind("foobox.initialized foobox.reinitialized", _this.handlers.initialized).bind("foobox.initialized foobox.reinitialized", _this.handlers.initialized);
        }, this.handlers = {
            initialized: function(e) {
                var $inner = e.fb.modal.find(".fbx-inner").unbind({
                    touchstart: _this.handlers.onTouchStart,
                    touchmove: _this.handlers.onTouchMove
                });
                e.fb.options.swipe.enabled === !0 && $inner.bind("touchstart", _this.handlers.onTouchStart);
            },
            onTouchStart: function(e) {
                var touches = e.originalEvent.touches || e.touches;
                1 == touches.length && (startX = touches[0].pageX, _this.isMoving = !0, _this.FooBox.modal.element.find(".fbx-inner").bind("touchmove", _this.handlers.onTouchMove));
            },
            onTouchMove: function(e) {
                if (e.preventDefault(), !_this.isMoving) return !1;
                var touches = e.originalEvent.touches || e.touches, x = touches[0].pageX, dx = startX - x;
                return Math.abs(dx) >= _this.FooBox.options.swipe.min && (_this.cancelTouch(), dx > 0 ? (_this.FooBox.raise("foobox.swipeRight"), 
                _this.FooBox.modal.prev()) : (_this.FooBox.raise("foobox.swipeLeft"), _this.FooBox.modal.next())), 
                !1;
            }
        }, this.cancelTouch = function() {
            _this.FooBox.modal.element.find(".fbx-inner").unbind("touchmove", _this.handlers.onTouchMove), 
            startX = null, _this.isMoving = !1;
        };
    }, FooBox.addons.register(FooBox.Swipe, defaults);
}(jQuery, window.FooBox), function($, FooBox) {
    var defaults = {
        wordpress: {
            enabled: !1
        }
    };
    FooBox.Wordpress = function(instance) {
        this.FooBox = instance;
        var _this = this;
        this.preinit = function(element) {
            element.unbind("foobox.initialized foobox.reinitialized", _this.handlers.initialized).bind("foobox.initialized foobox.reinitialized", _this.handlers.initialized);
        }, this.handlers = {
            initialized: function(e) {
                e.fb.instance.element.unbind("foobox.createCaption", _this.handlers.onCreateCaption), 
                e.fb.options.wordpress.enabled === !0 && e.fb.instance.element.bind("foobox.createCaption", _this.handlers.onCreateCaption);
            },
            onCreateCaption: function(e) {
                var opt = e.fb.options;
                1 == opt.wordpress.enabled && (e.fb.element.hasClass("gallery") ? (opt.captions.overrideTitle === !1 && (e.fb.item.title = e.fb.element.attr("title")), 
                opt.captions.overrideDesc === !1 && (e.fb.item.description = e.fb.element.closest(".gallery-item").find(".wp-caption-text:first").html() || "")) : e.fb.element.hasClass("wp-caption") ? (opt.captions.overrideTitle === !1 && (e.fb.item.title = e.fb.element.find("img").attr("title")), 
                opt.captions.overrideDesc === !1 && (e.fb.item.description = e.fb.element.find(".wp-caption-text:first").html() || "")) : e.fb.element.hasClass("tiled-gallery") && (opt.captions.overrideTitle === !1 && (e.fb.item.title = e.fb.element.parents(".tiled-gallery-item:first").find(".tiled-gallery-caption").html() || e.fb.element.find("img").data("image-title") || e.fb.element.find("img").attr("title") || ""), 
                opt.captions.overrideDesc === !1 && (e.fb.item.description = e.fb.element.find("img").data("image-description") || "")), 
                e.fb.item.caption = "string" == typeof e.fb.item.title && e.fb.item.title.length > 0 ? FooBox.format('<div class="fbx-caption-title">{0}</div>', e.fb.item.title) : "", 
                e.fb.item.caption = "string" == typeof e.fb.item.description && e.fb.item.description.length > 0 ? e.fb.item.caption + FooBox.format('<div class="fbx-caption-desc">{0}</div>', e.fb.item.description) : e.fb.item.caption);
            }
        };
    }, FooBox.addons.register(FooBox.Wordpress, defaults);
}(jQuery, window.FooBox), function($, FooBox) {
    var defaults = {
        html: {
            attr: "href",
            overflow: !0,
            findSelector: function(foobox, element) {
                if (!element) return "";
                var attr = element.attr(foobox.options.html.attr);
                return "string" == typeof attr ? element.attr(foobox.options.html.attr) : "";
            }
        }
    };
    FooBox.HtmlHandler = function(instance) {
        this.FooBox = instance, this.type = "html", this.regex = /^#/i;
        var _this = this;
        this.init = function(element) {
            element.unbind("foobox.close", _this.handlers.onClose).bind("foobox.close", _this.handlers.onClose);
        }, this.handlers = {
            onClose: function() {
                var i, item;
                for (i = 0; _this.FooBox.items.array.length > i; i++) item = _this.FooBox.items.array[i], 
                item.type == _this.type && item.content instanceof jQuery && 0 == item.error && $(item.selector).length > 0 && ($(item.selector).append(item.content.children()), 
                item.content = null);
            }
        }, this.handles = function(element) {
            var selector = _this.FooBox.options.html.findSelector(_this.FooBox, element), handle = "foobox" === $(element).attr("target") && "string" == typeof selector && null != selector.match(_this.regex) && ($(selector).length > 0 || 1 == $(element).data("ajax")), e = _this.FooBox.raise("foobox.handlesHtml", {
                element: element,
                handle: handle
            });
            return e.fb.handle;
        }, this.defaults = function(item) {
            item.fullscreen = item.fullscreen || !1, item.overflow = item.overflow || _this.FooBox.options.html.overflow;
        }, this.parse = function(element) {
            var item = new FooBox.Item(_this.type, element, this);
            _this.defaults(item), item.url = item.selector = _this.FooBox.options.html.findSelector(_this.FooBox, element) || null, 
            _this.getSize(item);
            var $target = null != item.selector ? $(item.selector) : null;
            return null != $target && $target.length > 0 ? (item.width = $target.data("width") || element.data("width") || item.width || null, 
            item.height = $target.data("height") || element.data("height") || item.height || null, 
            item.title = $target.data("title") || element.data("title") || item.title || null, 
            item.description = $target.data("description") || element.data("description") || item.description || null) : (item.width = element.data("width") || item.width || null, 
            item.height = element.data("height") || item.height || null, item.title = element.data("title") || item.title || null, 
            item.description = element.data("description") || item.description || null), item.deeplink = item.selector.replace("#", ""), 
            item.overflow = element.data("overflow") || item.overflow, item;
        }, this.load = function(item, container, success, error) {
            try {
                var $html = $("<div/>").addClass("fbx-item");
                if (1 == item.error ? $html.addClass("fbx-item-error") : $html.addClass("fbx-item-html"), 
                null == item.content && "string" == typeof item.selector) {
                    if (0 == $(item.selector).length) {
                        var e = _this.FooBox.raise("foobox.loadHtml", {
                            container: $html,
                            selector: item.selector,
                            success: function() {
                                item.content = e.fb.container, container.empty().append(item.content), $.isFunction(success) && success(_this.getSize(item));
                            },
                            error: function(err) {
                                err = err || "Unable to load HTML.", $.isFunction(error) && error(err);
                            }
                        });
                        return;
                    }
                    var $content = $(item.selector);
                    $content.length > 0 && (item.content = $html.append($content.children()));
                }
                item.content instanceof jQuery ? (container.empty().append(item.content), $.isFunction(success) && success(_this.getSize(item))) : $.isFunction(error) && error("No valid HTML found to display.");
            } catch (err) {
                $.isFunction(error) && error(err);
            }
        }, this.preload = function() {}, this.getSize = function(item) {
            if ((null == item.width || null == item.height || 0 == item.width || 0 == item.height) && "string" == typeof item.selector) {
                var $clone;
                "string" == typeof item.selector && $(item.selector).length > 0 ? $clone = $(item.selector).clone() : item.content instanceof jQuery && ($clone = item.content.clone()), 
                $clone instanceof jQuery && ($clone.css({
                    position: "absolute",
                    visibility: "hidden",
                    display: "block",
                    top: -1e4,
                    left: -1e4
                }).appendTo("body"), "number" == typeof item.width && item.width > 0 ? $clone.width(item.width) : item.width = $clone.outerWidth(!0), 
                item.height = "number" == typeof item.height && item.height > 0 ? item.height : $clone.outerHeight(!0), 
                $clone.remove());
            }
            return null != item.width && null != item.height ? new FooBox.Size(item.width, item.height) : new FooBox.Size(0, 0);
        }, this.hasChanged = function() {
            return !1;
        };
    }, FooBox.handlers.register(FooBox.HtmlHandler, defaults);
}(jQuery, window.FooBox), function($, FooBox) {
    var defaults = {
        iframe: {
            attr: "href",
            findUrl: function(foobox, element) {
                if (!element) return "";
                var attr = element.attr(foobox.options.iframe.attr);
                return "string" == typeof attr ? element.attr(foobox.options.iframe.attr) : "";
            }
        }
    };
    FooBox.IframeHandler = function(instance) {
        this.FooBox = instance, this.type = "iframe", this.regex = /^https?/i;
        var _this = this;
        this.handles = function(element) {
            var href = _this.FooBox.options.iframe.findUrl(_this.FooBox, element), handle = "foobox" === $(element).attr("target") && "string" == typeof href && null != href.match(_this.regex), e = _this.FooBox.raise("foobox.handlesIframe", {
                element: element,
                handle: handle
            });
            return e.fb.handle;
        }, this.defaults = function(item) {
            item.fullscreen = item.fullscreen || !0;
        }, this.parse = function(element) {
            var item = new FooBox.Item(_this.type, element, this);
            return _this.defaults(item), item.url = _this.FooBox.options.iframe.findUrl(_this.FooBox, element) || null, 
            item.width = element.data("width") || item.width || null, item.height = element.data("height") || item.height || null, 
            item.title = element.data("title") || item.title || null, item.description = element.data("description") || item.description || null, 
            item;
        }, this.load = function(item, container, success, error) {
            try {
                var $html = $("<iframe />").addClass("fbx-item fbx-item-iframe").attr("src", item.url);
                container.empty().append($html), $.isFunction(success) && success(_this.getSize(item));
            } catch (err) {
                $.isFunction(error) && error(err);
            }
        }, this.preload = function() {}, this.getSize = function(item) {
            return (null == item.width || null == item.height) && (item.width = (window.innerWidth || (document.body ? document.body.offsetWidth : 0)) / .8, 
            item.height = (window.innerHeight || (document.body ? document.body.offsetHeight : 0)) / .8), 
            null != item.width && null != item.height ? new FooBox.Size(item.width, item.height) : new FooBox.Size(0, 0);
        }, this.hasChanged = function() {
            return !1;
        };
    }, FooBox.handlers.register(FooBox.IframeHandler, defaults);
}(jQuery, window.FooBox), function($, FooBox) {
    var defaults = {
        images: {
            noRightClick: !1,
            attr: "href",
            overflow: !1,
            findUrl: function(foobox, element) {
                if (!element) return "";
                var attr = element.attr(foobox.options.images.attr);
                return "string" == typeof attr ? element.attr(foobox.options.images.attr) : "";
            }
        }
    };
    FooBox.ImageHandler = function(instance) {
        this.FooBox = instance, this.type = "image", this.regex = /\.(jpg|jpeg|png|gif|bmp)/i;
        var _this = this;
        this.handles = function(element) {
            var url = _this.FooBox.options.images.findUrl(_this.FooBox, element), handle = "string" == typeof url && null != url.match(_this.regex), e = _this.FooBox.raise("foobox.handlesImage", {
                element: element,
                handle: handle
            });
            return e.fb.handle;
        }, this.defaults = function(item) {
            item.fullscreen = item.fullscreen || !0, item.captions = item.captions || !0, item.social = item.social || !0, 
            item.overflow = item.overflow || _this.FooBox.options.images.overflow;
        }, this.parse = function(element) {
            var item = new FooBox.Item(_this.type, element, this);
            return _this.defaults(item), item.url = _this.FooBox.options.images.findUrl(_this.FooBox, element) || null, 
            item.width = element.data("width") || item.width || null, item.height = element.data("height") || item.height || null, 
            item.title = element.data("title") || item.title || null, item.description = element.data("description") || item.description || null, 
            item.overflow = element.data("overflow") || item.overflow || !1, item.image = null, 
            item.url.match(/.*\/(.*)$/) && (item.deeplink = item.url.match(/.*\/(.*)$/)[1]), 
            item;
        }, this.load = function(item, container, success, error) {
            var _load = function() {
                var $img = $(item.image).addClass("fbx-item fbx-item-image");
                _this.FooBox.options.images.noRightClick && $img.bind("contextmenu", function(e) {
                    return e.preventDefault(), !1;
                }), container.empty().append($img), $.isFunction(success) && success(_this.getSize(item));
            };
            item.image && null !== item.image ? _load() : (item.image = new Image(), item.image.onload = function() {
                item.image.onload = item.image.onerror = null, item.height = item.image.height, 
                item.width = item.image.width, _load();
            }, item.image.onerror = function() {
                item.image.onload = item.image.onerror = null, item.image = null, $.isFunction(error) && error("An error occurred attempting to load the image.");
            }, item.image.src = item.url);
        }, this.preload = function(item) {
            if (1 != item.preloaded) {
                var image = new Image();
                image.src = item.url, item.preloaded = !0;
            }
        }, this.getSize = function(item) {
            return null != item.width && null != item.height ? new FooBox.Size(item.width, item.height) : new FooBox.Size(0, 0);
        }, this.hasChanged = function(item) {
            if (item.element instanceof jQuery) {
                var actual = _this.FooBox.options.images.findUrl(_this.FooBox, item.element);
                return item.url != actual;
            }
            return !1;
        };
    }, FooBox.handlers.register(FooBox.ImageHandler, defaults);
}(jQuery, window.FooBox), function($, FooBox) {
    var defaults = {
        videos: {
            attr: "href",
            findUrl: function(foobox, element) {
                if (!element) return "";
                var attr = element.attr(foobox.options.videos.attr);
                return "string" == typeof attr ? element.attr(foobox.options.videos.attr) : "";
            },
            autoPlay: !1,
            defaultWidth: 640,
            defaultHeight: 385,
            showCaptions: !1
        }
    };
    FooBox.VideoHandler = function(instance) {
        this.FooBox = instance, this.type = "video", this.regex = /(youtube\.com\/watch|youtu\.be|vimeo\.com)/i;
        var _this = this;
        this.handles = function(element) {
            var url = _this.FooBox.options.videos.findUrl(_this.FooBox, element), handle = "string" == typeof url && null != url.match(_this.regex), e = _this.FooBox.raise("foobox.handlesVideo", {
                element: element,
                handle: handle
            });
            return e.fb.handle;
        }, this.defaults = function(item) {
            item.width = item.width || _this.FooBox.options.videos.defaultWidth, item.height = item.height || _this.FooBox.options.videos.defaultHeight, 
            item.fullscreen = item.fullscreen || !0, item.social = item.social || !0, item.captions = item.captions || _this.FooBox.options.videos.showCaptions;
        }, this.parse = function(element) {
            var item = new FooBox.Item(_this.type, element, this);
            return _this.defaults(item), item.url = _this.FooBox.options.videos.findUrl(_this.FooBox, element) || null, 
            item.width = element.data("width") || item.width || null, item.height = element.data("height") || item.height || null, 
            item.title = element.data("title") || item.title || null, item.description = element.data("description") || item.description || null, 
            item;
        }, this.load = function(item, container, success, error) {
            try {
                var url = item.url;
                if (url.match("http://(www.)?youtube|youtu.be") ? (item.video_id = url.match("embed") ? url.split(/embed\//)[1].split('"')[0] : url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0], 
                item.deeplink = item.video_id, item.video_type = "youtube", item.video_url = "http://www.youtube.com/embed/" + item.video_id, 
                item.video_url += _this.getUrlVar("rel", url) ? "?rel=" + _this.getUrlVar("rel", url) : "?rel=0", 
                _this.FooBox.options.videos.autoPlay && (item.video_url += "&autoplay=1"), item.video_valid = !0) : url.match("http://(player.)?vimeo.com") && (item.video_type = "vimeo", 
                item.video_id = url.split(/video\/|http:\/\/vimeo\.com\//)[1].split(/[?&]/)[0], 
                item.deeplink = item.video_id, item.video_url = "http://player.vimeo.com/video/" + item.video_id, 
                _this.FooBox.options.videos.autoPlay && (item.video_url += "&autoplay=1"), item.video_valid = !0), 
                item.video_valid === !0) {
                    var $html = $('<iframe webkitAllowFullScreen mozallowfullscreen allowFullScreen style="width:100%; height:100%" frameborder="no" />').attr("src", item.video_url).addClass("fbx-item fbx-item-video");
                    container.empty().append($html), $.isFunction(success) && success(_this.getSize(item));
                } else $.isFunction(error) && error("The video [" + item.url + "] is not supported");
            } catch (err) {
                $.isFunction(error) && error(err);
            }
        }, this.preload = function() {}, this.getSize = function(item) {
            return (null == item.width || null == item.height) && (item.width = _this.FooBox.options.videos.defaultWidth, 
            item.height = _this.FooBox.options.videos.defaultHeight), null != item.width && null != item.height ? new FooBox.Size(item.width, item.height) : new FooBox.Size(0, 0);
        }, this.hasChanged = function() {
            return !1;
        }, this.getUrlVar = function(name, url) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(url);
            return null == results ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };
    }, FooBox.handlers.register(FooBox.VideoHandler, defaults);
}(jQuery, window.FooBox);