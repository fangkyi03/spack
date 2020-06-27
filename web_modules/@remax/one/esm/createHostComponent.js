import { r as react } from '../../../common/index-6b0d8c85.js';

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

function formatDisplayName(name) {
    return name
        .replace(/-(.)/g, function ($1) {
        return $1.toUpperCase();
    })
        .replace(/-/g, '')
        .replace(/^(.)/, function ($1) {
        return $1.toUpperCase();
    });
}

var __assign$1 = (undefined && undefined.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};

var __assign$2 = (undefined && undefined.__assign) || function () {
    __assign$2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$2.apply(this, arguments);
};
function createTarget(target, detail) {
    return {
        id: target.id,
        offsetLeft: target.offsetLeft,
        offsetTop: target.offsetTop,
        dataset: target.targetDataset || target.dataset,
        value: detail === null || detail === void 0 ? void 0 : detail.value,
    };
}
function createCurrentTarget(currentTarget) {
    return {
        id: currentTarget.id,
        offsetLeft: currentTarget.offsetLeft,
        offsetTop: currentTarget.offsetTop,
        dataset: currentTarget.dataset,
    };
}
var createTapEvent = function (originalEvent) { return ({
    type: originalEvent.type,
    stopPropagation: originalEvent.stopPropagation,
    target: createTarget(originalEvent.target, originalEvent.detail),
    currentTarget: createCurrentTarget(originalEvent.currentTarget),
    originalEvent: originalEvent,
}); };
var createTouchEvent = function (originalEvent) { return ({
    type: originalEvent.type,
    target: createTarget(originalEvent.target, originalEvent.detail),
    currentTarget: createCurrentTarget(originalEvent.currentTarget),
    touches: originalEvent.touches,
    changedTouches: originalEvent.touches,
    originalEvent: originalEvent,
}); };
var createImageEvent = function (originalEvent) { return ({
    type: originalEvent.type,
    target: createTarget(originalEvent.target, originalEvent.detail),
    currentTarget: createCurrentTarget(originalEvent.currentTarget),
    originalEvent: originalEvent,
}); };
function createCallback(fn, eventCreator) {
    if (typeof fn !== 'function') {
        return undefined;
    }
    return function (originalEvent) { return fn(eventCreator(originalEvent)); };
}
var createInputEvent = function (originalEvent) { return ({
    type: originalEvent.type,
    target: createTarget(originalEvent.target, originalEvent.detail),
    currentTarget: createCurrentTarget(originalEvent.currentTarget),
    originalEvent: originalEvent,
}); };
var createFormEvent = function (originalEvent) { return ({
    type: originalEvent.type,
    target: createTarget(originalEvent.target, originalEvent.detail),
    currentTarget: createCurrentTarget(originalEvent.currentTarget),
    originalEvent: originalEvent,
}); };
function createHostComponent(name, defaults) {
    var Component = function (props, ref) {
        var inputProps = __assign$2({}, props);
        if (props.onLongTap) {
            inputProps.onLongTap = createCallback(inputProps.onLongTap, createTapEvent);
        }
        if (inputProps.onTap) {
            inputProps.onTap = createCallback(inputProps.onTap, createTapEvent);
        }
        if (inputProps.onTouchStart) {
            inputProps.onTouchStart = createCallback(inputProps.onTouchStart, createTouchEvent);
        }
        if (inputProps.onTouchMove) {
            inputProps.onTouchMove = createCallback(inputProps.onTouchMove, createTouchEvent);
        }
        if (inputProps.onTouchEnd) {
            inputProps.onTouchEnd = createCallback(inputProps.onTouchEnd, createTouchEvent);
        }
        if (inputProps.onTouchCancel) {
            inputProps.onTouchCancel = createCallback(inputProps.onTouchCancel, createTouchEvent);
        }
        if (inputProps.onChange) {
            inputProps.onChange = createCallback(inputProps.onChange, createInputEvent);
        }
        if (inputProps.onInput) {
            inputProps.onInput = createCallback(inputProps.onInput, createInputEvent);
        }
        if (inputProps.onConfirm) {
            inputProps.onConfirm = createCallback(inputProps.onConfirm, createInputEvent);
        }
        if (inputProps.onFocus) {
            inputProps.onFocus = createCallback(inputProps.onFocus, createInputEvent);
        }
        if (inputProps.onBlur) {
            inputProps.onBlur = createCallback(inputProps.onBlur, createInputEvent);
        }
        if (inputProps.onSubmit) {
            inputProps.onSubmit = createCallback(inputProps.onSubmit, createFormEvent);
        }
        if (inputProps.onReset) {
            inputProps.onReset = createCallback(inputProps.onReset, createFormEvent);
        }
        if (name === 'image') {
            if (inputProps.onLoad) {
                inputProps.onLoad = createCallback(props.onLoad, createImageEvent);
            }
            if (inputProps.onError) {
                inputProps.onError = createCallback(props.onError, createImageEvent);
            }
        }
        return react.createElement(name, __assign$2(__assign$2({}, inputProps), { ref: ref }));
    };
    {
        Component.displayName = formatDisplayName(name);
    }
    return react.forwardRef(Component);
}

export default createHostComponent;
export { createCallback, createCurrentTarget, createFormEvent, createImageEvent, createInputEvent, createTapEvent, createTarget, createTouchEvent };
