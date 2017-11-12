const bg = 'http://lorempixel.com/1360/768/';
const $bg = document.querySelector('#blur-bg > div');
const $main = document.querySelector('main');

const setBlur = function(element, value) {
    element.style.filter = `blur(${value}px)`;
};
const setBg = function(element, url) {
    element.style.backgroundImage = `url("${url}")`;
};

setBg($bg, bg);

const scrollize = new Scrollize([
    {
        maxValue: 15,
        minScroll: (window.innerHeight * (1/4)),
        maxScroll: (window.innerHeight * (2/3)),
        effect: 'blur',
        element: $bg,
    },
    {
        maxValue: 1,
        maxScroll: (window.innerHeight * (1/3)),
        element: $main,
        effect: 'style',
        effectParams: {
            style: 'opacity',
            unity: '',
        }
    },
    {
        minScroll: (window.innerHeight * 3),
        maxScroll: (window.innerHeight * 4),
        minValue: 1,
        maxValue: 0.5,
        element: $main,
        method: (value, element) => {
            element.style.transform = `scaleX(${value})`;
        },
    },
]);