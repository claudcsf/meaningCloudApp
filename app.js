//----------------- Import Zone ----------------------//
const express    = require('express');

// This is the module "fetch", this module works with promises and is useful to the requests
// to APIs.
const fetch      = require('node-fetch'); 

// This is module works to read information from the html, because
// the backend need translate the data into something it understands
const bodyParser = require('body-parser');



//--------------------- Configuration Zone --------------------// 

// Here we config Environment Variables
require('dotenv').config();

// Here we define an instance of express.
const app = express();

// Here say to the express instance that use the EJs module, that it must look inside the folder
// named "view", inside of this folder EJs is able to use the files .ejs and render them
app.set('view engine', 'ejs');

// We config the Body parser module
app.use(bodyParser.urlencoded({extended: true}));

// We say to the instance of express that we have statics files, like .css or .js
app.use(express.static("public"));



//---------------------------------- Routes --------------------------------//

// We define the principal route, and we say that we going to render the .ejs file called "home"
// and into this file, we give a object with 2 properties, the first propertie is the response of 
// the API but start having a null, because we don't have a response yet. The second propertie called
// "responseIsExist" is only used for a conditional sentence in the "home.ejs" file.
app.get("/",function(req,res){
    res.render("home",{response : null, responseIsExist: false});
});

// Here is the key of all the backend, we have the "POST" method in the "home.ejs" that is able
// to send us a information with the form. Then, first we create a variable called "promise", that
// is created with "fetch()", then we must give to the function, the link responsable to send 
// the API's request. That link is construct with the "API_KEY" (saved in the .env file), and the
// others fields required for the API, like "url" (or "txt", in the api documentation they mention other).
// Then, we must say to the promise what to do, with the first ".then" we say to the promise "transform the 
// response in a json format". With the second "then" we say to the promise "Okey now you must charge the 'home.ejs' file
// and give it the response called 'contenido' and the conditional in true"
app.post("/",function(req,res){

    let promise = fetch(`https://api.meaningcloud.com/class-2.0?key=${process.env.API_KEY}&url=${req.body.input}&model=IPTC_en`)
    .then(promesaFetch => promesaFetch.json())
    .then(content => res.render("home",{response : content, responseIsExist: true}));

})



//--------------------------Server Listening------------------------------//

// This is the zone responsible for keeping the server on, this zone always must be the last.
// at least for the good practices.
app.listen(3000,() => {
    console.log("The app is running in the 3000 channel")
})

