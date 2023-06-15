const http = require("http")
// dummy data for CRUD Operations
const Users = [{
        name: "bhushan",
        age: 23
    },
    {
        name: "bhushan 1",
        age: 21
    },
    {
        name: "bhushan 2",
        age: 20
    },
    {
      name: "bhushan 5",
      age: 20
  }
]

const server = http.createServer(function(request, response) {
    const paths = request.url.split("/");
    // GET Request  /users
    if (request.method === "GET" && paths[1] === "users" && paths.length === 2) {
        response.write(JSON.stringify(Users));

    // get particular data based on index   /users/1 - bhushan 1
    } else if (request.method === "GET" && paths[1] === "users" && paths[2]) {
        const idx = paths[2];
        const user = Users[idx];
        if (user) {
            response.write(JSON.stringify(user));
        } else {
            response.statusCode = 404;
            response.write("User not found ");
        }

        // POST Request
    } else if (request.method === "POST" && paths[1] === "users") {
        let data = "";
        request.on("data", function(chunk) {
            data += chunk;
        });
        request.on("end", function() {
            const obj = JSON.parse(data.toString());
            Users.push(obj);
        });
        response.statusCode = 201;
        response.write("User data created.");
        // PUT Request
    } else if (request.method === "PUT" && paths[1] === "users" && paths[2]) {
        const idx = paths[2];
        const user = Users[idx];
        if (user) {
            let data = "";
            request.on("data", function(chunk) {
                data += chunk;
            });
            request.on("end", function() {
                const obj = JSON.parse(data.toString());
                Users[idx] = obj;
                response.write("User data updated.");
            });
        } else {
            response.statusCode = 404;
            response.write("Not Found");
        }
        // DELETE Request
    } else if (request.method === "DELETE" && paths[1] === "users" && paths[2]) {
        const idx = paths[2];
        const user = Users[idx];
        if (user) {
            Users.splice(idx, 1);
            response.write("User data deleted.");
        } else {
            response.statusCode = 404;
            response.write("User not found");
        }
    } else {
        response.statusCode = 404;
        response.write("URL not found");
    }
    response.end();
})

// listening on port 3000
server.listen(3000, function() {
    console.log("server is running on port number 3000")
})