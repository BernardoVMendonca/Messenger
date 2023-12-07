const { WebSocket, OPEN, Server } = require("ws");

const wss = new Server({ host: "179.233.125.209", port: 44001 });

// WebSocket handling
let messages = [];
wss.on("connection", (ws) => {
    ws.send(JSON.stringify(
        {
            firstConnection: true, messages: messages
        }
    ))
    console.log("Nova conexão WebSocket");
    // Evento de mensagem WebSocket
    console.log("messages: ",messages.length);


    ws.on("message", (package) => {
        console.log(`(server) Recebido: ${package}`);
        
        messages.push(package.toString());
        wss.clients.forEach((client) => {
            if (client.readyState === OPEN) {
                client.send(package.toString());
            }
        });
        // Enviar mensagem de volta para o cliente WebSocket
    });
});
