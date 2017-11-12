class Scrollize {
    constructor(events = []) {
        this.events = [];
        events.forEach(event => this.add(event));
        window.addEventListener('scroll', () => this._listener());
    }
    effect(props) {
        const {
            effect,
            element,
            value,
            effectParams = {},
        } = props;
        switch(effect) {
            case 'blur':
                element.style.filter = ` blur(${value}px)`; break;
            case 'style':
                const {
                    style,
                    unity = 'px',
                } = effectParams;
                element.style[style] = `${value}${unity}`;
                break;
            case 'log':
                console.log(value); break;
        }
    }
    add(event) {
        const events = this.events;
        return events.push(event);
    }
    getValue(props) {
        const calc = function (X, Xmin, Xmax, Ymin, Ymax) {
            return ((X - Xmin) * (Ymax - Ymin) / (Xmax - Xmin)) + Ymin;
        };
        const {
            innerHeight,
            pageYOffset,
        } = window;
        const {
            minValue = 0,
            maxValue = 100,
            minScroll = 0,
            maxScroll = innerHeight,
        } = props;
        return (pageYOffset <= minScroll) ? minValue
             : (pageYOffset >= maxScroll) ? maxValue
             : calc(pageYOffset, minScroll, maxScroll, minValue, maxValue);
    }
    _listener() {
        const events = this.events;
        events.forEach((props) => {
            const {
                method,
                effect = null,
                effectParams,
                element,
                ...params
            } = props;
            const value = this.getValue(params);
            if (effect) {
                return this.effect({
                    effect,
                    effectParams,
                    element,
                    value,
                })
            }
            method(value, element);
        });
    }
}