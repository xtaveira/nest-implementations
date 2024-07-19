document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:3000')

    socket.on('connect',() => {
        console.log('Conectado ao servidor')
    })

    socket.on('msgToClient', (message, clientId) => {
        console.log('Mensagem recebida ', message, 'do cliente ', clientId)
        const messages = document.getElementById('messages')
        const messageElement = document.createElement('li')
        messageElement.classList.add('messageCard')
        messageElement.textContent = `Client ${clientId}
        Message: ${message}`
        messages.appendChild(messageElement)
    })

    socket.on('oldMessages', (messages) => {
        console.log('Mensagens recebidas ', messages)
        const messagesList = document.getElementById('messages')
        messages.map((message) => {
        const messageElement = document.createElement('li')
        messageElement.classList.add('messageCard')
        messageElement.textContent = `Client ${message.clientId}
        Message: ${message.text}`
        messagesList.appendChild(messageElement)
        })
        
    } )

    document.getElementById('sendButton').addEventListener('click',() => {
        const messageInput = document.getElementById('messageInput')
        const message = messageInput.value;
        socket.emit('msgToServer', message)
        messageInput.value = ''
    })
})