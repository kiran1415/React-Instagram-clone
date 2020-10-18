import { Button } from '@material-ui/core';
import React ,{useState} from 'react'
import firebase from "firebase"
import {db,storage} from "./firebase"
import './ImageUpload.css'



function ImageUpload({username}) {
   const [image,setImage]=useState(null);
   const [progress, setprogress] = useState(0);
   const [caption, setcaption] = useState('');


   const handleChange = (e) => {
       if(e.target.files[0]){
           setImage(e.target.files[0]);
       }
   };

   const handelUpload = () =>{
       const uploadTask=storage.ref(`images/${image.name}`).put(image);
       uploadTask.on(
           "state_changed",
           (snapshot) => {
               const progress=Math.round(
                   (snapshot.bytesTransferred/snapshot.totalBytes)*100

               );
               setprogress(progress);
           },


           (error) => {
               console.log(error);
               alert(error.message);
           },
           () => {
               storage
               .ref("images")
               .child(image.name)
               .getDownloadURL()
                .then(url=>{
                    db.collection("post").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        imageUrl:url,
                        username:username
                    });

                    setprogress(0);
                    setcaption("");
                    setImage(null);
                });
           }
       );
  
   };




    return (
        <div className="imageupload">
    <progress className="imageupload__progress" value={progress}  max="100"/>
    <input type="text"   placeholder="enter a caption...."  onChange={event=>setcaption(event.target.value)}   value={caption} />
    <input type="file"  onChange={handleChange}/>
    <Button onClick={handelUpload}>Upload</Button>





        </div>
    )
}

export default ImageUpload

            