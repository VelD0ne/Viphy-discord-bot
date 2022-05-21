const fetch = require("node-fetch");
const { api_key } = require("../config.json");

module.exports.gifContainer = new Map();

const componentsReducer = (accum, key, index, array) => {
    return (accum +=
        key + "=" + components[key] + (index !== array.length - 1 ? "&" : ""));
};

module.exports.getData = async (query) => {
    components = {
        limit: 10,
        api_key,
        q: query,
    };
    const url = `https://api.giphy.com/v1/gifs/search?${Object.keys(
        components
    ).reduce(componentsReducer, "")}`;
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
};
