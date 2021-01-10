# Group-Chat

## Run localy:-
    1) Clone repo
        $ mkdir Group-chat
        $ cd Group-Chat
        $ git clone https://github.com/sourabhsh55/Group-Chat.git

    2) Setup MongoDB database.
        Download and Install it from mongodb.com

    3) Create .env file in the backend folder
        ** Add following lines to that file.
        ADMIN_KEY=_number_
        MONGODB=mongodb://127.0.0.1/_choose_name_

    4) Run server
        $ node server.js

## API routes:-

    - /room   : Chatting page
    - /admin  : Admin control pannel

## How to Use:-

- User need to enter his/her name first.

- User should know the correct room key and enter it through the prompt.

- User can send any string, number, alphanumeric characters and emoticons.

## Features:-

    - All messages will be saved unless until admin deletes them all.

    - User's name will be present before the message.

    - Admin can change the room key.