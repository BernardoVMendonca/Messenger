const express = require("express");
const { WebPubSubServiceClient } = require("@azure/web-pubsub");
const { WebPubSubEventHandler } = require("@azure/web-pubsub-express");

const app = express();
const hubName = "sample_chat";
const port = 8080;

let connectionString = "Endpoint=https://menssenger.webpubsub.azure.com;AccessKey=CorDpoPLnzEQUDa3PlWmAvZ0UJxLJq2I4ILk3R6akuQ=;Version=1.0;";
// process.env.WebPubSubConnectionString || process.argv[2];
let serviceClient = new WebPubSubServiceClient(connectionString, hubName);
let handler = new WebPubSubEventHandler(hubName, {
    path: '/eventhandler',
    onConnected: async req => {
        console.log(`${req.context.userId} connected`);
    }
});

app.use(handler.getMiddleware());
// let handler = new WebPubSubEventHandler(hubName, {
//     path: "/eventhandler",
//     handleConnect: (req, res) => {
//         console.log(JSON.stringify(req));
//         return {};
//       },
//     onConnected: async (req) => {
//         console.log(JSON.stringify(req));
//         console.log(`${req.context.userId} connected`);
//         await serviceClient.sendToAll({
//             type: "system",
//             message: `${req.context.userId} joined`,
//         });
//     },
//     handleUserEvent: async (req, res) => {
//         console.log(req);
//         if (req.context.eventName === "message") {
//             await serviceClient.sendToAll({
//                 from: req.context.userId,
//                 message: req.data,
//             });
//         }
//         res.success();
//     },
// });

app.get("/negotiate", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    let id = req.query.id;
    if (!id) {
        res.status(400).send("missing user id");
        return;
    }
    let token = await serviceClient.getClientAccessToken({ userId: id });
    res.json({
        url: token.url,
    });
});

app.use(express.static("public"));
module.exports = app.listen(port, () => console.log(`Event handler listening at http://localhost:${port}${handler.path}`));