const socket = io()
let username;
let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message_area');
do{
    username=prompt('Please enter ur name:')
}while(!username)

textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user:username,
        message:message.trim()
     
    }
    // append
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()


// send to server
socket.emit('message',msg)


}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>

    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)

}
// recieve msg
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})


function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}


