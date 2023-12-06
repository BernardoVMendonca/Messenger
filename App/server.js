const express = require("express");
const cors = require("cors");
const { PubSub } = require("@google-cloud/pubsub");

const app = express();
const port = 19006;

const projectId = "mystical-timing-407306"; // Substitua pelo ID do seu projeto no Google Cloud
const topicName = "messenger"; // Substitua pelo nome do seu tópico

const pubSubClient = new PubSub({ projectId });

app.use(cors());

app.get("/negotiate", async (req, res) => {
  let id = req.query.id;
  //   console.log(`id/`, id);
  if (!id) {
    res.status(400).send("missing user id");
    return;
  }

  const topic = pubSubClient.topic(topicName);
  const data = JSON.stringify({ userId: id });
  const messageId = await topic.publish(Buffer.from(data));
  console.log('Message published:', messageId);


  res.json({
    url: `wss://127.0.0.1:19006/negotiable?messageId=${messageId}`,
  });
});

app.use(express.static("public"));

const server = app.listen(port, () => console.log("server started"));

server.on("connection", (request, socket, head) => {
  console.log("WebSocket connection established");
});
