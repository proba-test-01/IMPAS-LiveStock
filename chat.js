const activeUsersList = document.getElementById('active-users');
const chatWindow = document.getElementById('chat-window');
const chatWithSpan = document.getElementById('chat-with');
const chatMessagesDiv = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');
const closeChatBtn = document.getElementById('close-chat-btn');

let chatWithUser = null;

function loadActiveUsers() {
  getUsers(users => {
    activeUsersList.innerHTML = '';
    for (const [code, user] of Object.entries(users)) {
      if (user.name !== currentUser.name) {
        const li = document.createElement('li');
        li.textContent = user.name;
        li.dataset.code = code;
        li.addEventListener('click', () => openChat(code, user.name));
        activeUsersList.appendChild(li);
      }
    }
  });
}

function openChat(code, name) {
  chatWithUser = { code, name };
  chatWithSpan.textContent = name;
  chatWindow.style.display = 'block';
  loadChatMessages();
}

sendChatBtn.addEventListener('click', () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  const timestamp = Date.now();
  const messageData = {
    from: currentUser.code,
    to: chatWithUser.code,
    message: msg,
    timestamp
  };
  saveChatMessage(messageData);
  chatInput.value = '';
});

closeChatBtn.addEventListener('click', () => {
  chatWindow.style.display = 'none';
  chatMessagesDiv.innerHTML = '';
  chatWithUser = null;
});

function loadChatMessages() {
  if (!chatWithUser) return;
  db.ref('chats').orderByChild('timestamp').on('value', snapshot => {
    chatMessagesDiv.innerHTML = '';
    const chats = snapshot.val() || {};
    for (const [key, chat] of Object.entries(chats)) {
      if (
        (chat.from === currentUser.code && chat.to === chatWithUser.code) ||
        (chat.to === currentUser.code && chat.from === chatWithUser.code)
      ) {
        const p = document.createElement('p');
        p.textContent = `${chat.from === currentUser.code ? 'Аз' : chatWithUser.name}: ${chat.message}`;
        chatMessagesDiv.appendChild(p);
      }
    }
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
  });
}

function saveChatMessage(msgData) {
  db.ref('chats').push(msgData);
}
