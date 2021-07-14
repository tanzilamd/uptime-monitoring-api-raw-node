/*
 * Title : Uptime Monitoring Application
 * Description :
 * Author : Tanzil Ahmed
 * Date : 13/07/2021
 *
 */
const http = require('http');

const { handleReqRes } = require('./helpers/handleReqRes');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 3000,
};

// Create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port no ${app.config.port}`);
    });
};

// handle request response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
