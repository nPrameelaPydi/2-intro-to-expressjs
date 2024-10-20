const express = require("express");
//console.log(express);

//instance of our express applicaton
const app = express() //creates an new express application saving in variable app
//console.log(app); //app is an object

const PORT = 3000; //similar to http modules .listen() method


//cannot GET / - by default web client asks for the base route / from the server using an HTTP GET request
//cannot and method name - connected to server, but may be cannot reach url... route

//right now server doing nothing, its alive but nothing, ...
/////////////////////////
//Express routes have the following structure:
//app.method(path, handler)
//app is the instance of Express.
//method is the HTTP request method, in lowercase (GET, POST, DELETE, etc.).
//path is the URL path on the server.
//handler is a callback func, the function executed when the route is matched.
//this callback function or (handler) is called when a request is made to that path using the method mentioned whatever inplace of method,.. very similar to event listener call back function...
//req - is an object that contains all the information about the requests that re incoming, res object helps us to respond something back to client
///////////////////////
//this handler will run only when a GET request made at localhost:3000/
//specific logic to specific routes

app.get('/', (req, res) => {
    res.send(`A ${req.method} request was made at ${req.url}`);
})
//now we have a route handler, A GET request was made at /
//function can be defined some where else
//const baseRouteHandler = (req, res) => {
//}
//app.get("/", baseRouteHandler);
app.get('/express', (req, res) => {
    res.send(`<h2 style="color: blue;">Creating routes with Express is simple</h2>
`);
})
// because its just text/html, it can also parse html tags

//Notice that the previous example does not include a response status, headers, or an end-call. All of these properties (and more) have default or automatic values set by either Node or Express, so that we do not need to include them in every route we create.
//That said, the request and response objects provided to Express are the same ones provided to Node; therefore, you can continue to do anything with those objects that you previously could! Express adds to Node; it does not take away from it.
//n o d e + Express
app.get('/user', (req, res) => {
    res.send(`Received a GET request for user`);
})
app.post('/user', (req, res) => {
    res
        .status(201)
        .send({
            message: "User has been created",
            body: {
                username: "John Doe",
                email: "test@test.com"
            }
        });
})

//Route Paths: An additional layer of flexibility, Express routes can utilize route paths to match patterns of routes using reg-ex
app.get("/ab?cd", (req, res) => {
    res.send('ab?cd - means b optional');
})

// +  matches - efgh, effffffgh... etc
app.get('/ef+gh', (req, res) => {
    res.send("ef+gh")
})
//* matches ijkl, ij34%^ERkl... j is inclusive
app.get('/ij*kl', (req, res) => {
    res.send("ijkl")//anything after j matches
})

//() - grp things together
app.get("/lm(nop)?kl", (req, res) => {
    res.send("lknopmn")
})

//regEx
//app.get(/a/, (req, res) => {
//    res.send("Theres a in the path")//if a in the path it matches,
//})

////**order** of these requests matters, express takes the first req that encouters with
////the most specific the path is that should be placed top up in the folder

//matches butterfly, draggonfly...etc
app.get(/.*fly$/, (req, res) => {
    res.send("Matches fly at the end of the word in the path")
})

//Route parameters are named segments of a URL, preceeded by a colon
//these named parameters are used to cache certain values, specified at their position in the url
//these values are cached in req.params object, with thw name of the parameter as the key

//for a routepath: /users/:userID/profile/:data
//and a request URL: http://localhost:3000/users/42/profile/43110
//req.params contains: {userID: '42', data: '43110'}
//anything preceeding with colon: is route parameter
app.get("/greeting/:name", (req, res) => {
    res.send(`this is the params: ${req.params.name} `)
})
//mostly for updates or put req's

app.get("/flights/:from/:to", (req, res) => {
    res.send(`Flights from ${req.params.from} to ${req.params.to}`);
})

//app.get("/flights/:from/:to", (req, res) => {
//    res.send(`Flight coming from ${req.params.from} and going to ${req.params.to}`)
//})

//chainable route handlers can help reduce redundancy and typos, ensures all related routes contained in a single location for maintainance
//used when we ve same path with diff http methods
app.route('/learner')
    .get((req, res) => { res.send(`get a random learner`); })
    .post((req, res) => { res.send(`Add a learner`); })
    .put((req, res) => { res.send(`update learner's info`); })







app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})

//const fs = require("fs")


/////////// Section 3 - sending content with express //////

////fs -file system module
////mdn fs module - google search
////inorder to create custom engine

//// serve static files from the styles directory
//app.use(express.static("./styles"));//statically serve styles folder


//// define the template engine
//app.engine("perscholas", (filePath, options, callback) => {
//    fs.readFile(filePath, (err, content) => {
//        if (err) return callback(err);

//        // Here, we take the content of the template file,
//        // convert it to a string, and replace sections of
//        // it with the values being passed to the engine.
//        const rendered = content
//            .toString()
//            .replaceAll("#title#", `${options.title}`)
//            .replace("#content#", `${options.content}`);
//        return callback(null, rendered);
//    });
//});

//app.set("views", "./views"); // specify the views directory
//app.set("view engine", "perscholas"); // register the template engine

//app.get("/view-test", (req, res) => {
//    const options = {
//        title: "Rendering Views with Express",
//        content:
//            "Here, we've created a basic template engine using <code>app.engine()</code> \
//      and the <code>fs</code> module, then used <code>res.render</code> to \
//      render this page using custom content within the template.<br><br> \
//      Generally, you won't want to create your own view engines, \
//      but it important to understand how they work behind the scenes. \
//      For a look at some popular view engines, check out the documentation for \
//      <a href='https://pugjs.org/api/getting-started.html'>Pug</a>, \
//      <a href='https://www.npmjs.com/package/mustache'>Mustache</a>, or \
//      <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
//      More complete front-end libraries like React, Angular, and Vue \
//      also have Express integrations.",
//    };

//    res.render("index", options);
//});






//////////////////////////////////////////////////////

////fwd slash is a base url
////req obj contains all info abt request info
////this will only run for a specific req, here its GET request at localhost:3000/. Express looks at 2 things, the method and the url
//app.get("/", (req, res) => {
//    //console.log(`A ${req.method} request was made at ${req.url}`)
//    res.send(`A ${req.method} request was made at ${req.url}`)
//})
//app.get("/express", (req, res) => {
//    res.send("<h1>Creating routes with Express is simple!</h1>")//it going to parse html..
//})

//app.get("/user", (req, res) => {
//    //console.log("Received a GET request for user ")
//    res.send("Received a GET request for user")
//})

//app.get("/user", (req, res) => {
//    //res.status(201).send("User has been created"); //custom status code
//    res
//        .status(201)
//        .send({
//            message: "User has been created",
//            body: {
//                username: "john",
//                email: "test@test.com"
//            }
//        });

//})

////Route path flexibility
//app.get("/ab?cd", (req, res) => {
//    res.send("ab?cd")//letter b optional
//})
//app.get("/colou?r", (req, res) => {
//    res.send("colou?r")//letter u optional
//})

//// +  matches - efgh, effffffgh... etc
//app.get('/ef+gh', (req, res) => {
//    res.send("ef+gh")
//})
////* matches ijkl, ij34%^ERkl... j is inclusive
//app.get('/ij*kl', (req, res) => {
//    res.send("ijkl")//anything after j matches
//})

////() - grp things together
////not clear what it matches ...
//app.get("lm(nop)kl", (req, res) => {
//    res.send("lmnop")
//})

////regEx
//app.get(/a/, (req, res) => {
//    res.send("Theres a in the path")//if a in the path it matches,
//})

////**order** of these requests matters, express takes the first req that encouters with
////the most specific the path is that should be placed up in the folder

////matches butterfly, draggonfly...etc
//app.get(/.*fly$/, (req, res) => {
//    res.send("Matches fly at the end of the word in the path")
//})



////Route parameters
////anything preceding with : is route parameter

////for a routepath: /users/:userID/profile/:data
////and a request URL: http://localhost:3000/users/42/profile/43110
//app.get("/greeting/:name", (req, res) => {
//    res.send(`this is the params: ${req.params.name} `)
//})


//app.get("/flights/:from-:to", (req, res) => {
//    res.send(`Flight coming from ${req.params.from} and going to ${req.params.to}`)
//})

////Chainable route handlers
////using app.route - reduce redundancy and types, making code more conscise
//app.route('/learner')
//    .get((req, res) => {
//        res.send('Get a random learner')
//    })
//    .post((req, res) => {
//        res.send("Add a Learner");
//    })
//    .put((req, res) => {
//        res.send("Update the Learner's info")
//    })





















//app.listen(PORT, () => {
//    console.log(`Server is running on port: ${PORT}. You better go catch it`)
//})



