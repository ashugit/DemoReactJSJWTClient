export default  (() => {
    let config = {};
    if (process.env.NODE_ENV === 'production') {
        config = {
            BASE: 'http://localhost:5000' 
        };
    } else {
        config = {
            BASE: 'http://localhost:5000'
        };
    }
    return config;
})();
