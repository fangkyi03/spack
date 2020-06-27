import { r as react } from './index-6b0d8c85.js';

var LONG_TAP_DURATION = 350;

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
function useWebTouch(_a) {
    var hoverDuration = _a.hoverDuration, hoverDelay = _a.hoverDelay, onLongTap = _a.onLongTap, onTouchCancel = _a.onTouchCancel, onTouchEnd = _a.onTouchEnd, onTouchMove = _a.onTouchMove, onTouchStart = _a.onTouchStart;
    var _b = __read(react.useState(false), 2), touching = _b[0], setTouching = _b[1];
    var hoveringRef = react.useRef(false);
    var timers = react.useRef([]);
    function executeTimeout(callback, time) {
        var timer = setTimeout(function () {
            callback();
            timers.current.filter(function (t) { return t !== timer; });
        }, time);
        timers.current.push(timer);
    }
    react.useEffect(function () { return function () {
        timers.current.forEach(function (t) { return clearTimeout(t); });
    }; }, []);
    function handleTouchStart(e) {
        hoveringRef.current = true;
        executeTimeout(function () {
            if (hoveringRef.current) {
                setTouching(true);
            }
        }, hoverDelay);
        executeTimeout(function () {
            if (hoveringRef.current && typeof onLongTap === 'function') {
                onLongTap(e);
            }
        }, LONG_TAP_DURATION);
        if (typeof onTouchStart === 'function') {
            return onTouchStart(e);
        }
    }
    function handleTouchMove(e) {
        hoveringRef.current = false;
        executeTimeout(function () {
            if (touching) {
                setTouching(false);
            }
        }, hoverDuration);
        if (typeof onTouchMove === 'function') {
            return onTouchMove(e);
        }
    }
    function handleTouchEnd(e) {
        hoveringRef.current = false;
        executeTimeout(function () {
            if (touching) {
                setTouching(false);
            }
        }, hoverDuration);
        if (typeof onTouchEnd === 'function') {
            return onTouchEnd(e);
        }
    }
    function handleTouchCancel(e) {
        hoveringRef.current = false;
        executeTimeout(function () {
            if (touching) {
                setTouching(false);
            }
        }, hoverDuration);
        if (typeof onTouchCancel === 'function') {
            return onTouchCancel(e);
        }
    }
    return [touching, handleTouchStart, handleTouchMove, handleTouchEnd, handleTouchCancel];
}

export { useWebTouch as u };
