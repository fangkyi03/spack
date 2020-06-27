import { r as react } from '../../../../../common/index-6b0d8c85.js';
import { c as clsx } from '../../../../../common/clsx.m-34a62c8b.js';
import { f as filterProps } from '../../../../../common/isPlatformSpecifyProp-dd52526f.js';

var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var Text = function (props) {
    var _a = filterProps(props), onTap = _a.onTap, onTouchStart = _a.onTouchStart, onTouchMove = _a.onTouchMove, onTouchEnd = _a.onTouchEnd, onTouchCancel = _a.onTouchCancel, className = _a.className, selectable = _a.selectable, restProps = __rest(_a, ["onTap", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel", "className", "selectable"]);
    var hoveringRef = react.useRef(false);
    function handleTouchStart(e) {
        hoveringRef.current = true;
        if (typeof onTouchStart === 'function') {
            return onTouchStart(e);
        }
    }
    function handleTouchMove(e) {
        hoveringRef.current = false;
        if (typeof onTouchMove === 'function') {
            return onTouchMove(e);
        }
    }
    function handleTouchEnd(e) {
        hoveringRef.current = false;
        if (typeof onTouchEnd === 'function') {
            return onTouchEnd(e);
        }
    }
    function handleTouchCancel(e) {
        hoveringRef.current = false;
        if (typeof onTouchCancel === 'function') {
            return onTouchCancel(e);
        }
    }
    return (react.createElement("span", __assign({}, restProps, { className: clsx(className, {
            'remax-text-selectable': selectable,
        }), onClick: onTap, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, onTouchCancel: handleTouchCancel })));
};

export default Text;
