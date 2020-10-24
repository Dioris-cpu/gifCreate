import Amplify, {API, graphqlOperation} from '@aws-amplify/api'
import awsConfig from './aws-exports' 
// import {createGif} from './graphql/mutations '

Amplify.configure(awsConfig)

const createNewGif = (e) => {
    e.preventDefault()
     
    // object grabs the text and url
     const gif = {
         altText: document.getElementById('altText').value,
         url: document.getElementById('url').value
         
     }
     console.log(gif)
}
// grabs the form and submits the gif 
document.getElementById('create-form').addEventListener('submit', createNewGif)
