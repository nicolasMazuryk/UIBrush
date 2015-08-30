var http = require('http'),
    url = require('url'),
    qs = require('querystring'),
    database = require('./database.json'),

    server = new http.Server(function(req, res) {
        var urlParsed = url.parse(req.url, true),
            requestOrigin = req.headers.origin,
            reqBody = '',
            parsedData,
            json;

        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

        if (urlParsed.pathname == '/submit') {
            req.on('data', function(data) {
                reqBody += data.toString();
                parsedData = qs.parse(reqBody);
                parsedData.id = 'A' + Math.floor(Math.random()*1000);
                // add request to database
                database.requests.push(parsedData);
                json = JSON.stringify(parsedData);

                res.statusCode = 200;
                res.end(json);
                console.log(database);
            });
            req.on('error', function(err) {
                console.log(err);
            });
        } else if (urlParsed.pathname == '/onload') {
            res.statusCode = 200;
            json = JSON.stringify(database);
            res.end(json);
        } else if (urlParsed.pathname == '/remove') {
            req.on('data', function (data) {
                reqBody += data.toString();
                for (var i = 0; i < database.requests.length; i++) {
                    if (database.requests[i].id == reqBody) {
                        database.requests.splice(i, 1);
                    }
                }
                res.statusCode = 200;
                res.end('The request has been removed from database.');
            });

        } else {
            res.statusCode = 404;
            res.end('Can\'t reach the server');
        }

    });

server.listen(2000, 'localhost', function() {
    console.log('Server running at http://localhost:2000');
});

