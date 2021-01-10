

//------------------------CHAT-ROOM---------------------------------

console.log('yasss under the room!');
const username = prompt('Enter Username');
const key = prompt(`Enter Room Key (default is 1)`);

const logs = document.getElementById('logs');
if(logs){
    console.log('logs is present');
}
else{
    console.log('logs is not present');
}



const socket = io();
socket.emit('login',{username:username,key:key});

socket.on('wrong-key',()=>{
    alert('sorry, you have entered wrong password!');
    document.location.href = "https://stark-river-19581.herokuapp.com/room";
})


socket.on('message-log',async (data)=>{
    for(let i=0;i<data.length;i++){
        let ele = document.createElement('P');
        let u_name = 'You';
        if(data[i].username!=username){
            u_name = data[i].username;
        }
        ele.innerText += `[${u_name}]: ${data[i].message}`;
        logs.appendChild(ele);
    }
})


function scroll(){
    message_box.scrollIntoView(false);
}

const btn = document.getElementById('send-btn');
const message_box = document.getElementById('message-box');
message_box.focus();

scroll();

btn.addEventListener('click',()=>{
    message_data = {
        count: 0,
        username:username,
        message:message_box.value
    };
    if(message_box.value.length>0){
        socket.emit('add-message',(message_data));
        message_box.value = '';
        message_box.focus();
    }
})

socket.on('messaging',(data)=>{
    console.log('received data : ',data);
    let message_ele = document.createElement('P');
    let u_name = 'You';
    if(data.username!=username){
        u_name = data.username;
    }
    console.log(`[${u_name}]: ${data.message}`);
    message_ele.innerText += `[${u_name}]: ${data.message}`;
    logs.appendChild(message_ele);
})