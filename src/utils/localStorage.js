export function getItem(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.log(e);
    }
}

export function setItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
}



