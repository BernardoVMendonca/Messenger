const {WebSocket, OPEN, Server} = require("ws");

const wss = new Server({host: "10.64.64.4", port: 44001});

// WebSocket handling
wss.on("connection", (ws) => {
  //   console.log("Nova conexão WebSocket");

  // Evento de mensagem WebSocket
  ws.on("message", (message) => {
    console.log(`Recebido: ${message}`);

    wss.clients.forEach((client) => {
      if (client.readyState === OPEN) {
        client.send(message.toString());
      }
    });
    // Enviar mensagem de volta para o cliente WebSocket
  });
});
