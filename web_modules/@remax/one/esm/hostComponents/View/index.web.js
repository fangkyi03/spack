import { r as react } from '../../../../../common/index-6b0d8c85.js';
import { c as clsx } from '../../../../../common/clsx.m-34a62c8b.js';
import { f as filterProps } from '../../../../../common/isPlatformSpecifyProp-dd52526f.js';
import { u as useWebTouch } from '../../../../../common/useWebTouch-1d19f4d0.js';

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
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var View = function (props) {
    var _a;
    var _b = filterProps(props), hoverClassName = _b.hoverClassName, hoverStartTime = _b.hoverStartTime, hoverStayTime = _b.hoverStayTime, className = _b.className, onTouchStart = _b.onTouchStart, onTouchMove = _b.onTouchMove, onTouchEnd = _b.onTouchEnd, onTouchCancel = _b.onTouchCancel, onTap = _b.onTap, onLongTap = _b.onLongTap, restProps = __rest(_b, ["hoverClassName", "hoverStartTime", "hoverStayTime", "className", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel", "onTap", "onLongTap"]);
    var _c = __read(useWebTouch({
        hoverDelay: hoverStartTime,
        hoverDuration: hoverStayTime,
        onLongTap: onLongTap,
        onTouchStart: onTouchStart,
        onTouchMove: onTouchMove,
        onTouchEnd: onTouchEnd,
        onTouchCancel: onTouchCancel,
    }), 5), touching = _c[0], handleTouchStart = _c[1], handleTouchMove = _c[2], handleTouchEnd = _c[3], handleTouchCancel = _c[4];
    return (react.createElement("div", __assign({}, restProps, { onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, onTouchCancel: handleTouchCancel, className: clsx(className, (_a = {}, _a[hoverClassName || ''] = touching, _a)), onClick: onTap })));
};
View.defaultProps = {
    hoverStayTime: 400,
    hoverStartTime: 50,
};

export default View;
