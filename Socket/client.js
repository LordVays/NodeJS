const socket = io('http://127.0.0.1:8888');
const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const nicknameInput = document.getElementById('nickname-input');
const joinButton = document.getElementById('join-button');
const messagesContainer = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

let nickname = '';


const handleJoin = () => {

    const enteredNickname = nicknameInput.value.trim();

    if (enteredNickname) {

        nickname = enteredNickname;

        socket.emit('register', nickname);

        loginScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
        messageInput.focus();

    }

};

joinButton.addEventListener('click', handleJoin);

nicknameInput.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {

        handleJoin();

    }

});

messageForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const messageText = messageInput.value.trim();

    if (messageText) {

        socket.emit('message', messageText);
        messageInput.value = '';

    }

});

const scrollToBottom = () => {

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

};

const addChatMessage = (msg) => {

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if (msg.sender === nickname) {

        messageDiv.classList.add('mine');

    } else {

        messageDiv.classList.add('other');

    }

    const formattedTime = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    messageDiv.innerHTML = `
        <div class="meta">${msg.sender} <span>${msg.time}</span></div>
        <div class="text">${msg.text}</div>
    `;

    messagesContainer.appendChild(messageDiv);

    scrollToBottom();

};

const addSystemMessage = (text) => {

    const messageDiv = document.createElement('div');

    messageDiv.classList.add('message', 'system');
    messageDiv.innerHTML = `<div class="text">${text}</div>`;
    messagesContainer.appendChild(messageDiv);

    scrollToBottom();

};


socket.on('connect', () => {

    console.log('Успешно подключено к серверу!');

});

socket.on('message', (msg) => {

    addChatMessage(msg);

});

socket.on('user connected', (systemMessage) => {

    addSystemMessage(systemMessage);

});

socket.on('user disconnected', (systemMessage) => {

    addSystemMessage(systemMessage);

});

socket.on('disconnect', () => {

    addSystemMessage('Вы были отключены от сервера.');
    
});