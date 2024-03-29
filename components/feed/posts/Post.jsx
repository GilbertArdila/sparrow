/* eslint-disable @next/next/no-img-element */
import Moment from 'react-moment';
import { useRouter } from 'next/router';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase"
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';
import { modal, postUser, postId } from '../../../globalStates/atom';
import { useRecoilState } from 'recoil';


const Post = ({ post,id }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);


  //recoil state to open the modal
  const [open, setOpen] = useRecoilState(modal);
  //recoil state to set the post user's data
  const [userData, setUserData] = useRecoilState(postUser);
  const [actualPostId, setActualPostId] = useRecoilState(postId);


  //get the posts´likes
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts", post.id, "likes"), (snapshot) => setLikes(snapshot.docs))
  }, [db])

  //get the posts´comments
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "comments"), (snapshot) => setComments(snapshot.docs))
  }, [])

  //check if user has liked the post
  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
  }, [likes])


  //like post function
  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid))
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          username: session?.user.username
        })
      }
    } else {
      signIn()
    }
  }

  //delete post function
  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", id));
      if (post?.data()?.image) {
        await deleteObject(ref(storage, `posts/${id}/image`));
      }
        router.push("/");
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">

      {/**user image */}
      <div className="flex  h-full w-16 justify-center pt-2">
        <img src={post?.data()?.userImage} alt={post?.data()?.userName} className="rounded-full min-w-11 min-h-11 " />
      </div>

      {/**posts right side*/}
      <div className="w-full p-2">

        {/**header */}
        <div className="flex justify-between items-center">

          {/**name and userName */}
          <div className="flex space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data()?.name}</h4>
            <span className="text-sm sm:text-[15px]">@{post?.data()?.userName}-</span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment></span>
          </div>

          {/**dots icon */}

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>

        </div>

        {/**postText */}
        <span className="text-[15px] sm:text-[16px] text-gray-800 italic font-semibold cursor-pointer" onClick={()=>router.push(`/posts/${id}`)}>{post?.data()?.text}</span>


        {/**post image */}
        {post.data()?.image && (
          <img src={post?.data()?.image} alt={post?.data()?.text} className="rounded-2xl mr-2 mt-3 object-content  w-full cursor-pointer"  onClick={()=>router.push(`/posts/${id}`)} />
        )}



        {/**tweet buttons */}
        <div className="flex items-center  justify-between text-gray-500 p-2">


          <>
            
                {/**chat icon */}
                <div className='flex  items-center justify-center space-x-1'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-9 h-9 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2"
                    onClick={() => {
                      if (!session) {
                        signIn();
                      } else {
                        setOpen(!open);
                        setUserData(post.data());
                        setActualPostId(id);
                      }

                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                  {comments.length > 0 && <span>{comments.length}</span>}
                </div>
              

          </>




          {/**trash icon only if user is the post´s owner */}
          {session?.user.uid === post?.data()?.id && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
              className="w-9 h-9 hoverEffect hover:bg-red-100 hover:text-red-600 p-2"
              onClick={deletePost}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          )}


          {/**like icon depends on likes */}
          <div className='flex items-center space-x-1'>
            {hasLiked ? (

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600" onClick={likePost}>
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>



            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 hoverEffect hover:bg-red-100 hover:text-red-500 p-2" onClick={likePost}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>

            )}
            {/**post´s likes number */}
            {likes.length > 0 && (<span>{likes.length}</span>)}

          </div>

          {/**share icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg>

          {/**chart icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
        </div>
      </div>



    </div>
  )
}

export default Post;