var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    qs = require('querystring'),
    mime = require('mime'),
    path = require('path'),
    database = require('./database.json'),
    port = process.env.PORT || 2000, // !!!!!2000
    host = process.env.HOST || '0.0.0.0',
    server;

    // add isWebPage or localhost

server = new http.Server(function(req, res) {
    var urlParsed = url.parse(req.url, true),
        requestOrigin = req.headers.origin,
        reqBody = '',
        filePath = false,
        absPath,
        parsedData,
        json;

    if (requestOrigin) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    }

    if (urlParsed.pathname == '/submit') {
        req.on('data', function(data) {
            reqBody += data.toString();
            parsedData = qs.parse(reqBody);
            parsedData.id = 'A' + Math.floor(Math.random()*1000);
                // Add request-data to database
            database.requests.push(parsedData);
            fs.writeFile('database.json', JSON.stringify(database));
            json = JSON.stringify(parsedData);

            res.statusCode = 200;
            res.end(json);
            console.log(database);
        });
        req.on('error', function(err) {
            console.log(err);
        });
    } else if (urlParsed.pathname == '/onload') {
        json = JSON.stringify(database);

        res.statusCode = 200;
        res.end(json);
    } else if (urlParsed.pathname == '/remove') {
        req.on('data', function (data) {
            reqBody += data.toString();
            for (var i = 0; i < database.requests.length; i++) {
                if (database.requests[i].id == reqBody) {
                    database.requests.splice(i, 1);
                    fs.writeFile('database.json', JSON.stringify(database));
                }
            }

        res.statusCode = 200;
        res.end('The request has been removed from database!');
        });
    } else if (req.url == '/') {
        filePath = "../index.html";
        absPath = filePath;     // or = "./" + filePath
        serverLoadContent(res, absPath);
    } else {
        filePath = "../" + req.url;
        absPath = "./" + filePath;
        serverLoadContent(res, absPath);
    }

    function sendPage(response, filePath, fileContents) {
        response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
        response.end(fileContents);
    }
    function serverLoadContent(response, absPath) {
        fs.readFile(absPath, function(err, data) {
            sendPage(response, absPath, data);
        });
    }

});

server.listen(port, host, function() { // may be additional / needed ??? or without https://
    console.log('Server running at ' + host + ':' + port);
    console.log(server)
});

