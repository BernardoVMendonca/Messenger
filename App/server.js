const express = require('express');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');

const app = express();
const hubName = 'Sample_ChatApp';
const port = 8080;

let serviceClient = new WebPubSubServiceClient("Endpoint=https://menssenger.webpubsub.azure.com;AccessKey=CorDpoPLnzEQUDa3PlWmAvZ0UJxLJq2I4ILk3R6akuQ=;Version=1.0;", hubName);



app.get('/negotiate', async (req, res) => {
    let id = req.query.id;
    console.log(`id/`, id)
    if (!id) {
        res.status(400).send('missing user id');
        return;
    }
    let token = await serviceClient.getClientAccessToken({ userId: id });
    res.json({
        url: token.url
    });
});

app.use(express.static('public'));
app.listen(port, () => console.log('server started'));
