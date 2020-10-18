import { Avatar, Button } from '@material-ui/core';
import React,{useEffect, useState} from 'react'
import './Post.css';
import {db} from './firebase';
import firebase from 'firebase';
function Post({username,user,postId,caption,imageUrl}) {
   
    const [Comments, setComments] = useState([])
    const [Comment, setComment] = useState('')
    useEffect(() => {
         let unsubscribe;
         if(postId){
             unsubscribe=db
             .collection("post")
             .doc(postId)
             .collection("comments")
             .orderBy('timestamp','desc')
             .onSnapshot((snapshot)=>{
                 setComments(snapshot.docs.map((doc) => doc.data()));
             });
         }

         return () => {
             unsubscribe();
         };
     }, [postId]);
   
   
     const postComment=(event)=>{
         event.preventDefault();

         db.collection("post").doc(postId).collection("comments").add({
             text:Comment,
             username:user.displayName,
             timestamp:firebase.firestore.FieldValue.serverTimestamp()
         });
         setComment('');

     }
   
   
   
   
   
   
   
   
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avtar"
                    alt='user_image'
                    src="/static/images/avtar/1.png">
                </Avatar>
    <h3>{username}</h3>
            </div>
          {/*  header -> avtar+username  */}  
           
       




          <img    alt="avtar"  className="post__image" src={imageUrl}/>
           {/*  image  */}

        


    <h4 className="post__text"><strong>{username}</strong>  {caption}</h4>
         {/*  username+caption  */}

     <div className="post__comments">
         {Comments.map((comment)=>(
              <p>
                  
              <strong>{comment.username}</strong> {comment.text}
              </p>
         ))}
         
     </div>
   



   
    <form className="post__commentBox">
        <input
        className="post__input"
        type="text"
        placeholder="add Commnebt"
        value={Comment}
        onChange={(e)=>setComment(e.target.value)}
         />

          <Button  
          className="post__button"
          disabled={!Comment}
          type="submit"
          onClick={postComment}
          >
        Post
          </Button>

    </form>


        </div>
    )
}

export default Post
