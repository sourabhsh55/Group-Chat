const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const { Msg } = require('./model');
require("dotenv").config();

const app = express();

const server = http.createServer(app);
const io = socket(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/',express.static(__dirname + '/public'));


mongoose.connect(`${process.env.MONGODB}`,{ useUnifiedTopology: true ,useNewUrlParser: true} )
 .then(()=>console.log('connected to mongodb'))
 .catch((err)=>console.log('~ERROR : ',err));

 app.get('/admin',(req,res)=>{
    let path = __dirname + "/public" + "/admin.html";
    res.sendFile(path);
})

const ADMIN_KEY = process.env.ADMIN_KEY;
let ROOM_KEY = 1;

app.get('/',(req,res)=>{
    let path = __dirname + "/public" + "/index.html";
    res.sendFile(path);
})

app.post('/',async(req,res)=>{
    console.log(req.body);
    if(req.body.delete_check_box=='yes'){
        console.log('yes check box is present')
        await deleteAll();
    }
    let admin_key = req.body.admin_key;
    if(admin_key == ADMIN_KEY){
        ROOM_KEY = req.body.room_key;
        let path = __dirname + "/public" + "/index.html";
        res.sendFile(path);
    }
    else{
        res.send('You have entered wrong admin key, Go back to home page and try again');
    }
})

app.get('/room',(req,res)=>{
    let path = __dirname + "/public" + "/room.html";
    res.sendFile(path);
})


let deleteAll = async ()=>{
    await Msg.deleteMany({});
    console.log('all the data has been deleted');
}

// deleteAll(); // to delete the documents under db.

var counter = 0;

const socket_call = async () => {
    io.on('connection',socket=>{

        // Log all the messages on the screen 
        socket.on('login',async (data)=>{
            let given_key = data.key;
            if(given_key != ROOM_KEY){
                socket.emit('wrong-key');
            }
            else{
                await Msg.find().then((result)=>{
                    let len = result.length;
                    if(len!=0){
                        let curr_count = result[len-1].count + 1;
                        counter = curr_count;
                    }
                    else{
                        counter = 0;
                    }
                    console.log('curr_count : ',counter);
                    socket.emit('message-log',(result));
                }).catch((err)=>{
                    console.log('##ERROR : ',err);
                })
            }
        })

        // add a new message
        socket.on('add-message',async (data)=>{
            data.count = counter;
            console.log('DATA : ',data);
            counter++;
            let new_data = new Msg(data);
            new_data.save().then(()=>{
                console.log('yes msg has been logged');
                io.emit('messaging',(data));
            }).catch((err)=>{
                console.log('error while logging msg : ',err);
            })
        })

        // clear all the chats
        socket.on('clear-chat',()=>{
            deleteAll();
        })

        // user disconnected
        // socket.on('disconnect',()=>{
        //     io.emit('Dmsg','User has left the chat');
        // })
})
};


socket_call();   // calling the socket.io function



// making server listen/live

let port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log('server is running!');
})
