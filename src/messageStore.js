// Armazenamento de mensagens persistido em arquivo JSON
const fs = require('fs');
const path = require('path');

class MessageStore {
  constructor(filePath, limit = 200) {
    this.filePath = filePath;
    this.limit = limit; // máximo de mensagens mantidas
    this.messages = [];
    this._load();
  }

  _load() {
    try {
      fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
      if (fs.existsSync(this.filePath)) {
        this.messages = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
      } else {
        this._save();
      }
    } catch (err) {
      console.error('Erro ao carregar mensagens:', err.message);
      this.messages = [];
    }
  }

  _save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.messages, null, 2));
  }

  add(user, text) {
    const message = { user, text, timestamp: new Date().toISOString() };
    this.messages.push(message);
    if (this.messages.length > this.limit) {
      this.messages = this.messages.slice(-this.limit);
    }
    this._save();
    return message;
  }

  getAll() {
    return this.messages;
  }
}

module.exports = MessageStore;
