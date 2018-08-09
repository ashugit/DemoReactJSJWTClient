/**
 * 
 */
class Persistence {

    constructor() {

    }
    /**
     * 
     * @param {*} key 
     * @param {*} value 
     */
    store(key, value) {
        if (localStorage) {
            localStorage.setItem(key, value);
        }
    }
    /**
     * 
     * @param {*} key 
     */
    get(key) {
        let value = '';
        if (localStorage) {
            value = localStorage.getItem(key);
        }else {
            value = '';
        }

        return value;
    }

}

export {Persistence};
