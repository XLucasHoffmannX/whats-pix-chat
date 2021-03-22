const socket = io();
const msgText = document.querySelector('#msg');
const btnSend = document.querySelector('#send');
const chatBox = document.querySelector('.dis_main');
const displayMsg = document.querySelector('.message');
const userEntry = document.querySelector('.userEntry');
const userInput = document.querySelector('#userChat');

const displayContent = document.querySelector('.display');
const userNameDisplay = document.querySelector('.userName_display')
const loaderDisplay = document.querySelector('.load');
const formUser = document.querySelector('.userChatForm');
const entryBtn = document.querySelector('#entry');
const userChatInput = document.querySelector('#userChat');
const errorMessage = document.querySelector('.erroUser');
const usersGroup = document.querySelector('.users_group');

function displayNone() {
    displayContent.style.display = 'none';
    loaderDisplay.style.display = 'none';
    errorMessage.style.display = 'none';
}

displayNone();

userChatInput.focus();

entryBtn.addEventListener('click', () => {
    const inputUser = userChatInput.value;
    if (inputUser.length === 0) {
        errorMessage.style.display = '';
        setTimeout(() => { errorMessage.style.display = 'none'; }, 1300)
    } else {

        let name = inputUser;
        formUser.style.display = 'none';
        loaderDisplay.style.display = '';
        setTimeout(() => {
            userNameDisplay.style.display = 'none';
            displayContent.style.display = 'flex';
        }, 2000)
        document.querySelector('.username').textContent = name;

        msgText.focus();

        btnSend.addEventListener('click', (e) => {
            e.preventDefault();
            const msgTextValue = msgText.value;
            if (msgTextValue.length > 0) {
                sendMsg(msgText.value);
            }
            msgText.value = '';
            msgText.focus();
            chatBox.scrollTop = chatBox.scrollHeight;
        })

        socket.on('usersA', users => {
            console.log(users)
            for (users of user) {
                console.log(user)
            }
        })

        let msg = {
            user: name
        }

        const sendMsg = (message, verify) => {
            msg.message = message.trim();

            if (verify) {
                displayEntry(msg)
            } else {
                display(msg, 'you-message')
            }

            socket.emit('sendMessage', msg)
        }

        let cont = 0;
        socket.on('sendToAll', (msg, user) => {
            display(msg, 'other-message');
            chatBox.scrollTop = chatBox.scrollHeight;
            if (user) {
                let audio = new Audio('../mp3/ping.mp3')
                audio.play();
            }
        })


        const displayEntry = (msg) => {
            userEntry.innerHTML = `<span>Você entrou na sala como ${msg.user}!</span>`
        }

        const display = (msg, type, verify) => {
            if (verify) {
                displayEntry();
            }
            const msgDiv = document.createElement('div');
            let className = type;
            msgDiv.classList.add(className, 'message-row');
            let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

        if (name) {
            sendMsg(`<b style="color: #12554c; background:#00BFA5 "> 👉 ${msg.user} entrou na sala, de boas vindas 👋👋 ! 👈 </b>`, true)
        }

        console.log('atualizado 16:54 de 21 de março de 2021');
        usersGroup.innerText += `(${msg.user})`;
    }
})