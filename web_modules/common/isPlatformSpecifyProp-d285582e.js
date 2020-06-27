function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

function clsx () {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x;
			}
		}
	}
	return str;
}

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

export { clsx as c, filterProps as f };
