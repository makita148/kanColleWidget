/* jshint indent: 4 */

var widgetPages = widgetPages || {};

(function() {
    'use strict';

    var View = widgetPages.View = function(){};
    View.prototype._delimiterPrefix = "{{";
    View.prototype._delimiterSuffix = "}}";
    View.prototype._eventSeparator = " ";
    View.prototype._defaultEvents = {};
    View.prototype.$el = null;

    View.prototype.apply = function(params) {
        params = params || {};
        var htmlString = this.tpl;
        for (var key in params) {
            var delimiter = this._delimiterPrefix + key + this._delimiterSuffix;
            // とりまここでエスケープ
            var value = String(params[key]).replace(/</g,"&lt").replace(/>/g,"&gt");
            htmlString = htmlString.split(delimiter).join(value);
        }
        this.$el = $(htmlString);
        this.__applyAttrs();
        return this;
    };
    View.prototype.__applyAttrs = function() {
        this.attrs = this.attrs || {};
        this.$el.attr(this.attrs);
        return this;
    };

    View.prototype._render = function() {
        this.events = this.events || this._defaultEvents;
        return this.bindEvent();
    };

    View.prototype.bindEvent = function() {
        // にゃんぱすーฅ(๑'Δ'๑)
        var self = this;
        for (var i in self.events) {
            var _evName_selector = i.split(self._eventSeparator);
            var evName = _evName_selector[0];
            var selector = _evName_selector[1];
            //console.log(evName, selector);
            this.$el.delegate(selector, evName, function(ev){
                self[self.events[i]](ev, self);
            });
        }
        return self;
    };
})();
