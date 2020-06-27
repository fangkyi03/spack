import { r as react } from '../../../../../common/index-6b0d8c85.js';
import { f as filterProps, c as clsx } from '../../../../../common/isPlatformSpecifyProp-d285582e.js';

// https://github.com/facebook/react/blob/master/packages/react-dom/src/shared/CSSProperty.js
/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    // SVG-related properties
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true,
};
/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}
/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
var _loop_1 = function (prop) {
    prefixes.forEach(function (prefix) {
        isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
    });
};
for (var prop in isUnitlessNumber) {
    _loop_1(prop);
}

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
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var vendorPrefixes = ['webkit', 'moz', 'ms', 'o'];
var transformReactStyleKey = function (key) {
    // css3 var
    if (key === null || key === void 0 ? void 0 : key.startsWith('--')) {
        return key;
    }
    var styleValue = key.replace(/\.?([A-Z]+)/g, function (_x, y) {
        return '-' + y.toLowerCase();
    });
    // vendor prefix
    if (styleValue === null || styleValue === void 0 ? void 0 : styleValue.startsWith('-')) {
        var firstWord_1 = styleValue.split('-').filter(function (s) { return s; })[0];
        styleValue = styleValue.replace(/^-/, '');
        if (vendorPrefixes.find(function (prefix) { return prefix === firstWord_1; })) {
            styleValue = '-' + styleValue;
        }
    }
    return styleValue;
};
var transformPx = function (value) {
    if (typeof value !== 'string') {
        return value;
    }
    return value.replace(/\b(\d+(\.\d+)?)px\b/g, function (match, x) {
        var targetUnit = 'rem';
        var size = Number(x / 100);
        return size % 1 === 0 ? size + targetUnit : size.toFixed(2) + targetUnit;
    });
};
var plainStyle = function (style) {
    if (!style) {
        return '';
    }
    return Object.keys(style)
        .reduce(function (acc, key) {
        var value = style[key];
        if (!Number.isNaN(Number(value)) && !isUnitlessNumber[key]) {
            value = value + 'rpx';
        }
        return __spread(acc, [transformReactStyleKey(key) + ":" + (__REMAX_PX2RPX__ ? transformPx(value) : value) + ";"]);
    }, [])
        .join('\n');
};

var clsxId = 0;
var generateClassName = function () { return "remax-placeholder-style-" + clsxId++; };
function useWebPlaceholderStyle(css) {
    var className = react.useRef(generateClassName());
    react.useEffect(function () {
        var styleContent = "." + className.current + "::placeholder {\n    " + plainStyle(css) + "\n  }";
        var style = window.document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(styleContent));
        var head = window.document.head || window.document.getElementsByTagName('head')[0];
        head.appendChild(style);
        return function () {
            head.removeChild(style);
        };
    }, [css]);
    return [className.current];
}

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
var __read$1 = (undefined && undefined.__read) || function (o, n) {
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
var Input = function (props) {
    var _a = filterProps(props), password = _a.password, type = _a.type, onConfirm = _a.onConfirm, onKeyPress = _a.onKeyPress, placeholderStyle = _a.placeholderStyle, className = _a.className, restProps = __rest(_a, ["password", "type", "onConfirm", "onKeyPress", "placeholderStyle", "className"]);
    var _b = __read$1(useWebPlaceholderStyle(placeholderStyle), 1), placeholderStyleClassName = _b[0];
    var inputType = password ? 'password' : type;
    function handleKeyPress(e) {
        if (e.key === 'Enter' && typeof onConfirm === 'function') {
            onConfirm(e);
        }
        if (typeof onKeyPress === 'function') {
            onKeyPress(e);
        }
    }
    return (react.createElement("input", __assign({}, restProps, { type: inputType, onKeyPress: handleKeyPress, className: clsx('remax-input', className, placeholderStyleClassName) })));
};
Input.defaultProps = {
    onChange: function () { return void 0; },
};

export default Input;
