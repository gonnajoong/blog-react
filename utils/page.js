const offset = (page, size) => {
    return (page - 1) * size;
};

const page = (offset, size) => {
    return (offset / size) + 1;
};

export {
    offset,
    page
};

export default {
    offset: offset,
    page: page
};