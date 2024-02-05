import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import Post from "./Post";
import { db } from "../../../firebase";
import { AnimatePresence, motion } from "framer-motion";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
     const unsubscribe = onSnapshot(query(collection(db,"posts")), orderBy("timestamp","desc"),(snapshot)=>{setPosts(snapshot.docs)})
    },[])

   


  return (
    <div>
      <AnimatePresence>
        {posts.map((post)=>(
          <motion.div key={post.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}}>
            <Post key={post.id} post={post}/>
          </motion.div>
            
        ))}
      </AnimatePresence>
        
    </div>
  )
}

export default Posts;