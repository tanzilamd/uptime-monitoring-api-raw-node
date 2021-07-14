// dependencies
const { StringDecoder } = require('string_decoder');
const url = require('url');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // request handling
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headerObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headerObject,
    };

    const decoder = new StringDecoder();
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payLoad) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payLoad = typeof payLoad === 'object' ? payLoad : '';

        const payLoadString = JSON.stringify(payLoad);
        // return the final response
        res.writeHead(statusCode);
        res.end(payLoadString);
    });

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        console.log(realData);

        res.end('Hello World!');
    });

    // response handle
};

module.exports = handler;
