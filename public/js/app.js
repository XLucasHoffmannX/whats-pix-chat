const socket = io();
const msgText = document.querySelector('#msg');
const btnSend = document.querySelector('#send');
const chatBox = document.querySelector('.dis_main');
const displayMsg = document.querySelector('.message');

let name;
do {
    name = prompt('Insira um nome de usuário')
} while (!name)

document.querySelector('.username').textContent = name;

msgText.focus();

btnSend.addEventListener('click', (e) => {
    e.preventDefault();
    sendMsg(msgText.value);
    msgText.value = '';
    msgText.focus();
    chatBox.scrollTop = chatBox.scrollHeight;
})

const sendMsg = message => {
    let msg = {
        user: name,
        message: message.trim()
    }

    display(msg, 'you-message')

    socket.emit('sendMessage', msg)
}

socket.on('sendToAll', msg => {
    display(msg, 'other-message');
    chatBox.scrollTop = chatBox.scrollHeight;
})

const display = (msg, type) => {
    const msgDiv = document.createElement('div');
    let className = type;
    msgDiv.classList.add(className, 'message-row');
    let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});    
    let innerText = `
    <div class="message-title">
        <span>${msg.user}</span>
    </div>
    <div class="message-text">
        ${msg.message}
    </div>
    <div class="message-time">
        ${time}
    </div>
    `;

    msgDiv.innerHTML = innerText;
    displayMsg.appendChild(msgDiv);
}

console.log('atualizado 00:22 de 21 de março de 2021')