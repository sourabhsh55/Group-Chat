// to make and add the document into the db

            // async function findusers(d){
            //     let fake_msg = new Msg(d);
            //     fake_msg.save();
            //     let users = await Msg.find();
            //     // console.log(users);
            //     return users;
            // }

            // findusers();

// to delete the document based upon condition or all documents under the model(db)

            // let deleteAll = async ()=>{
            //     await Msg.deleteMany({});
            // }

            // deleteAll();

            //   ---(or)---

            // Msg.deleteMany({},(error,result)=>{
            //     if(error){
            //         console.log('Delete-Error : ',error);
            //     }
            //     else{
            //         console.log('Delete-Error : ',result);
            //     }
            // });