// var password,name;

// if(document.location == "http://localhost:5000/"){
//     password = prompt('Password');
//     name = prompt('Username');
//     document.location.href = 'http://localhost:5000/yo.html';
// }


// if(document.location == "http://localhost:5000/yo.html"){
//     console.log('yes uder the yo page now!');
//     const list = document.getElementById('list');

//     if(list){
//         console.log('yes got something : ',`${name}, ${password}`);
//         let ele1 = document.createElement('P');
//         let ele2 = document.createElement('P');
//         ele1.innerText = name;
//         ele2.innerText = password;
//         list.appendChild(ele1);
//         // ele.innerText = password;
//         list.appendChild(ele2);
//     }
//     else{
//         console.log('no list ele has found!');
//     }
// }



// let name = prompt('Username');
// let password = prompt('Password');

// document.location.href = "http://localhost:5000/yo.html";

// console.log(`${name} and ${password}`);


    // const message = 'this is a msg';
    // const html = Mustache.render(msgTemplate,{message});
    // divi.insertAdjacentHTML('beforeend',html);

// const msgTemplate = document.getElementById('msg-template').innerHTML;
// const divi = document.getElementById('divi');
// const html = Mustache.render(msgTemplate,{name});
// divi.insertAdjacentHTML('beforeend',html);


//------------------------CHAT-ROOM---------------------------------

console.log('yas under the room!');
const username = prompt('Enter Username');
const key = prompt('Enter the room key');

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
    document.location.href = "https://stark-river-19581.herokuapp.com//room";
})

// socket.on('username-already-taken',(data)=>{
//     alert(`sorry, username: ${data.username} is already taken`);
//     document.location.href = "http://localhost:5000/room";
// })

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




// if(document.location.href == "http://localhost:5000/admin.html"){


//     console.log('Under the admin section page!');

//     const clear_btn = document.getElementById('clear-char');
//     clear_btn.addEventListener('click',()=>{
//         socket.emit('clear-chat');
//     })

//     // let admin_key = prompt('Enter Admin Key');
//     // if(admin_key!=null){
//     //     socket.emit('admin-login',({admin_key}));
//     // }

// }