// Módulo que gerencia as conexões WebSocket
const { WebSocket } = require('ws');

class ConnectionManager {
  constructor(wss, store) {
    this.wss = wss;
    this.store = store;
    this.wss.on('connection', (socket) => this._onConnection(socket));
  }

  _onConnection(socket) {
    // Envia o histórico ao novo cliente
    this._send(socket, { type: 'history', messages: this.store.getAll() });
    this._broadcastUserCount();

    socket.on('message', (raw) => {
      let data;
      try {
        data = JSON.parse(raw.toString());
      } catch {
        return;
      }

      const user = String(data.user || '').trim().slice(0, 30);
      const text = String(data.text || '').trim().slice(0, 500);
      if (!user || !text) return;

      const message = this.store.add(user, text);
      this._broadcast({ type: 'message', message });
    });

    socket.on('close', () => this._broadcastUserCount());
  }

  _send(socket, payload) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    }
  }

  _broadcast(payload) {
    this.wss.clients.forEach((client) => this._send(client, payload));
  }

  _broadcastUserCount() {
    this._broadcast({ type: 'users', count: this.wss.clients.size });
  }
}

module.exports = ConnectionManager;
