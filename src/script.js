import Amplify, { API, graphqlOperation } from "@aws-amplify/api";
import awsConfig from "./aws-exports";

import { createGif } from "./graphql/mutations";
import { listGifs } from "./graphql/queries";

Amplify.configure(awsConfig);

const createNewGif = async (e) => {
  e.preventDefault(); // don't refresh the page after form submit

  const gif = {
    // grab the value of the `altText` field
    altText: document.getElementById("altText").value,
    // grab the value of the `url` field
    url: document.getElementById("url").value,
  };

  try {
    const newGif = await API.graphql(
      graphqlOperation(createGif, { input: gif })
    );
    console.log(newGif);
    // Reset the form (make the fields blank again)
    document.getElementById("create-form").reset();
  } catch (error) {
    console.error(error);
  }
  console.log(gif);
};

const getGifs = async () => {
  // select the container element
  const container = document.querySelector(".container");
  // reset its current contents
  container.innerHTML = "";
  // make a request to get all our gifs
  const gifs = await API.graphql(graphqlOperation(listGifs));
  // loop through our gifs and
  gifs.data.listGifs.items.map((gif) => {
    // create a new image element
    const img = document.createElement("img");
    // add the src attribute to the img
    img.setAttribute("src", gif.url);
    // add the alt attribute to the img
    img.setAttribute("alt", gif.altText);
    // add the image to the container
    document.querySelector(".container").appendChild(img);
  });
};

// run this function on page load
getGifs();

// grabs the form and submits the gif
document.getElementById("create-form").addEventListener("submit", createNewGif);
