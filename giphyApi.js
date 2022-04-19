const fetch = require("node-fetch");

exports.Gifs = class Gifs {
	constructor(query) {
		this.data = this.getData(query);
	}

	async getData(query) {
		const url = "https://api.giphy.com/v1/gifs/search?limit=10&api_key=c7wt1bUOrn2bVUYP1DpTvbVHFvUuUqAe&q=" + query;
		const response = await fetch(url);
		const {data} = await response.json();
		return data;
	}

	async getGifArray() {
		const data = await this.data;
		const gifArray = data.map(elem => elem.images.original.url);
		return gifArray; 
	}
}

