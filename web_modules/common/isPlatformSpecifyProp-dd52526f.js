var isPlatformSpecifyProp = function (prop) { return prop.match(/^(ali|wechat|toutiao)-/); };
function filterProps(props) {
    return Object.keys(props).reduce(function (acc, cur) {
        var prop = cur;
        if (isPlatformSpecifyProp(prop)) {
            return acc;
        }
        acc[prop] = props[cur];
        return acc;
    }, {});
}

export { filterProps as f };
