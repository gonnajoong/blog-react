import TRANSLATE from '../pages/admin/constants/translate';

const translate = (category, key) => {
    return TRANSLATE[category][key] ? TRANSLATE[category][key] : key;
};

export {
    translate,
}

export default {
    translate: translate
}