let ws = new WebSocket("ws://localhost:8090/ws"); 
let messages = document.getElementsByName('messages');
let nick = document.getElementById("nick");
let start = document.getElementById("start");
let exit = document.getElementById("exit");
let topName = document.getElementById("topName");


let msgToSend = {
    nickName: null,
    body: null,
};

nick.addEventListener('change', function () {
    msgToSend.nickName = nick.value
});

start.addEventListener("click", function (event) {
    topName.innerHTML = nick.value;
    ws.send(JSON.stringify(msgToSend));
    
    topName.style.visibility = "visible";
    exit.style.visibility = "visible";
    nick.style.visibility = "hidden";
    start.style.visibility = "hidden";

});

document.forms.publish.addEventListener('keydown', function (event) {
    if (event.code == 'Enter' || event.code == 'NumpadEnter') {
        event.preventDefault();
        msgToSend.body = this.elements.message.value;
        ws.send(JSON.stringify(msgToSend));
        this.elements.message.value = '';
        msgToSend.body = null;

    }
});

//ws.onopen = function () {
  //  ws.send(
    //    JSON.stringify({
      //      test: "hi webS!",            
       // })
    //);

//};

ws.onmessage = function (event) {
    console.log(JSON.parse(event.data));
    let incomingMessage = JSON.parse(event.data);
    showMessage(incomingMessage);
};

function showMessage(message) {
    console.log(message);
    let msgConteiner = document.createElement('div');
    msgConteiner.classList.add('msgConteinerInChat');
    let userNameInChat = document.createElement('div');
    userNameInChat.classList.add('userNameInChat');
    let msgInChat = document.createElement('div');
    msgInChat = document.createElement('div');
    msgInChat.classList.add("msgInChat");
    
    userNameInChat.innerHTML = `${message.nickName}: `;
    msgInChat.innerHTML = `${message.body}: `;

    //внеш ид для пользователя

    msgConteiner.append(userNameInChat);
    msgConteiner.append(msgInChat);
    messages.append(msgConteiner);
}