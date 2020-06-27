import { r as react } from '../../common/index-6b0d8c85.js';
import createHostComponent, { createCallback, createInputEvent } from './esm/createHostComponent.js';

var Button = createHostComponent('button');

var Form = createHostComponent('form');

var Image = createHostComponent('image');

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: '',
            // 阿里
            controlled: false,
        };
        _this.handleInput = function (e) {
            var controlled = _this.state.controlled;
            if (!controlled) {
                _this.setState({ value: e.target.value });
            }
            if (typeof _this.props.onInput === 'function') {
                return _this.props.onInput(e);
            }
            // 微信
            // 注意，微信要对 input 受控，必须要在 onInput 方法返回值
            return controlled ? _this.props.value : e.target.value;
        };
        var controlled = props.value !== undefined;
        var value = controlled ? props.value : props.defaultValue;
        _this.state = {
            value: value,
            controlled: controlled,
        };
        return _this;
    }
    Input.prototype.componentDidUpdate = function () {
        if (this.props.value !== undefined && this.props.value !== this.state.value) {
            this.setState({ value: this.props.value });
        }
    };
    Input.prototype.render = function () {
        var inputProps = __assign(__assign({}, this.props), { onInput: createCallback(this.handleInput, createInputEvent) });
        if (inputProps.onConfirm) {
            inputProps.onConfirm = createCallback(this.props.onConfirm, createInputEvent);
        }
        if (inputProps.onFocus) {
            inputProps.onFocus = createCallback(this.props.onFocus, createInputEvent);
        }
        if (inputProps.onBlur) {
            inputProps.onBlur = createCallback(this.props.onBlur, createInputEvent);
        }
        return react.createElement('input', __assign(__assign({}, inputProps), this.state));
    };
    // 平台独有的属性默认值写在这
    Input.defaultProps = {
        'toutiao-selection-end': 999,
        'toutiao-selection-start': 999,
        'wechat-placeholder-class': 'input-placeholder',
        'wechat-cursor-spacing': 0,
        'wechat-confirm-type': 'done',
        'wechat-confirm-hold': false,
        'wechat-selection-end': -1,
        'wechat-selection-start': -1,
        'wechat-adjust-position': true,
        'wechat-hold-keyboard': false,
    };
    return Input;
}(react.Component));

var index = createHostComponent('label');

var index$1 = createHostComponent('navigator');

var Text = createHostComponent('text');

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Textarea = /** @class */ (function (_super) {
    __extends$1(Textarea, _super);
    function Textarea(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: '',
            // 阿里
            controlled: false,
        };
        _this.handleInput = function (e) {
            var controlled = _this.state.controlled;
            if (!controlled) {
                _this.setState({ value: e.target.value });
            }
            if (typeof _this.props.onInput === 'function') {
                return _this.props.onInput(e);
            }
            // 微信
            // 注意，微信要对 input 受控，必须要在 onInput 方法返回值
            return controlled ? _this.props.value : e.target.value;
        };
        var controlled = props.value !== undefined;
        var value = controlled ? props.value : props.defaultValue;
        _this.state = {
            value: value,
            controlled: controlled,
        };
        return _this;
    }
    Textarea.prototype.componentDidUpdate = function () {
        if (this.props.value !== undefined && this.props.value !== this.state.value) {
            this.setState({ value: this.props.value });
        }
    };
    Textarea.prototype.render = function () {
        var inputProps = __assign$1(__assign$1({}, this.props), { onInput: createCallback(this.handleInput, createInputEvent) });
        if (inputProps.onConfirm) {
            inputProps.onConfirm = createCallback(this.props.onConfirm, createInputEvent);
        }
        if (inputProps.onFocus) {
            inputProps.onFocus = createCallback(this.props.onFocus, createInputEvent);
        }
        if (inputProps.onBlur) {
            inputProps.onBlur = createCallback(this.props.onBlur, createInputEvent);
        }
        return react.createElement('textarea', __assign$1(__assign$1({}, inputProps), this.state));
    };
    Textarea.defaultProps = {
        'toutiao-selection-end': 999,
        'toutiao-selection-start': 999,
        'wechat-selection-end': -1,
        'wechat-selection-start': -1,
        'wechat-fixed': false,
        'wechat-placeholder-class': 'textarea-placeholder',
        'wechat-cursor-spacing': 0,
        'wechat-cursor': -1,
        'wechat-show-confirm-bar': true,
        'wechat-adjust-position': true,
        'wechat-hold-keyboard': false,
        'wechat-disable-default-padding': false,
    };
    return Textarea;
}(react.Component));

var View = createHostComponent('view');

var WebView = createHostComponent('web-view');

export { Button, Form, Image, Input, index as Label, index$1 as Navigator, Text, Textarea, View, WebView };
