# Chat em Tempo Real (Node.js + WebSockets)

Aplicação web de chat em tempo real onde vários usuários se conectam e trocam mensagens instantaneamente.

## Funcionalidades

- Servidor HTTP que serve a interface do usuário (`public/index.html`)
- Comunicação em tempo real via WebSockets (biblioteca `ws`)
- Módulo para gerenciar as conexões WebSocket (`src/websocketManager.js`)
- Armazenamento das mensagens persistido em arquivo JSON (`data/messages.json`)
- Histórico enviado automaticamente a quem entra no chat

## Estrutura do projeto

```
├── server.js                 # Servidor HTTP + inicialização do WebSocket
├── src/
│   ├── websocketManager.js   # Gerenciamento das conexões WebSocket
│   └── messageStore.js       # Persistência das mensagens em JSON
├── public/
│   └── index.html            # Interface do chat
├── data/
│   └── messages.json         # Criado automaticamente na primeira execução
└── package.json
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior (inclui o npm)

## Como instalar as dependências

No terminal, dentro da pasta do projeto:

```bash
npm install
```

## Como executar o servidor

```bash
npm start
```

Você verá a mensagem: `Servidor rodando em http://localhost:3000`

Para usar outra porta:

```bash
# Linux / macOS
PORT=4000 npm start

# Windows (PowerShell)
$env:PORT=4000; npm start
```

## Como acessar a aplicação no navegador

1. Abra o navegador e acesse **http://localhost:3000**
2. Digite o seu nome e uma mensagem, e clique em **Enviar**
3. Para testar com múltiplos usuários, abra a mesma URL em outra aba ou janela (ou em outro dispositivo da mesma rede usando `http://IP-DA-SUA-MAQUINA:3000`)

As mensagens ficam salvas em `data/messages.json` e reaparecem mesmo após reiniciar o servidor.
