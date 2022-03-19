import fetch from 'node-fetch';

const url = "https://api.giphy.com/v1/gifs/search?api_key=c7wt1bUOrn2bVUYP1DpTvbVHFvUuUqAe&q=animal";

async function fetchingData(url) {
    const response = await fetch(url);
    const data =await response.json();
    console.log(data)
}

fetchingData(url);

