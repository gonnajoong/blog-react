const scroll = (isScroll) => {
    document.body.style['overflow-y'] = (isScroll ? 'auto' : 'hidden');
    document.body.style['-ms-overflow-y'] = (isScroll ? 'auto' : 'hidden');
};

const isHiddenScroll = () => {
    return document.body.style['overflow-y'] === 'hidden' || document.body.style['-ms-overflow-y'] === 'hidden';
};

export {
    scroll,
    isHiddenScroll
};