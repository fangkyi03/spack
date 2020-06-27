import { r as react } from '../../../../../common/index-6b0d8c85.js';
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
var Label = function (props) { return react.createElement("label", __assign({}, filterProps(props))); };

export default Label;
