// const ID_WRAP = "gjLoadingWrap";
// const VIEW = '<article id="gjLoadingWrap">' +
//     '<div id="gjLoading">' +
//     '<div class="gj-top"></div>' +
//     '<div class="gj-middle">' +
//     '<i></i>' +
//     '<i></i>' +
//     '<i></i>' +
//     '</div>' +
//     '<div class="gj-bottom">loading...</div>' +
//     '</div>' +
//     '</article>';
let loadingHash = {};

const startLoading = (key) => {
    if (loadingHash[key]) {
        return true;
    } else {
        if (!isLoading()) {
            start();
        }
        loadingHash[key] = true;
    }
};

const endLoading = (key) => {
    delete loadingHash[key];
    if (!isLoading()) {
        end();
    }
};

const start = () => {
    // const element = document.getElementById(ID_WRAP);
    if (!element) {
        // document.body.innerHTML += VIEW;
    }
};

const end = () => {
    // const element = document.getElementById(ID_WRAP);
    if (element) {
        // element.parentNode.removeChild(element);
    }
};

const isLoading = () => {
    return Object.keys(loadingHash).length;
};

export {
    startLoading,
    endLoading
};