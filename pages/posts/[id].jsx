import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRecoilState } from "recoil";
import { modal } from "../../globalStates/atom";

import Sidebar from "../../components/sidebar/Sidebar";
import Widgets from "../../components/widgets/Widgets";
import Header from "../../components/feed/Header";
import Post from "../../components/feed/posts/Post";
import CommentsModal from "../../components/modal/CommentsModal";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";


const PostPage = ({ news, randomUsers }) => {

  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen]= useRecoilState(modal);

  const [post, setPost] = useState(null);

  //get the current post
  useEffect(() => {
    onSnapshot(doc(db, "posts", id), ((snapshot) => setPost(snapshot)))
  }, [db, id])


  return (
    <>
      <Head>
        <title>Post</title>
        <meta
          name="post page"
          content="Post page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        {/**SIDEBAR */}
        <section className="hidden sm:block  flex-col p-2 xl:items-start fixed h-full xl:ml-24     ">
          <Sidebar />
        </section>

        {/**POST SECTION */}
        <section className="sm:ml-[100px] xl:ml-[450px]  border-r border-l border-gray-200">
          <Header title={"Sparrow"} isHome={false} />
          {post !== null &&  <Post post={post} id={id}/>}
         
        </section>

        {/**WIDGETS */}
        <section className="hidden md:inline ml-8 space-y-5 p-2">
          <Widgets news={news.articles} randomUsers={randomUsers.results} />
        </section>
         {/**MODAL */}
         {isOpen && <CommentsModal/>}
      </main>
    </>
  )
}

export default PostPage;

//Widget´s news section
export async function getServerSideProps() {
  const news = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json")
    .then((res) => res.json());

  //Widget´s who to follow section
  const randomUsers = await fetch("https://randomuser.me/api/?results=50&inc=name,login,picture").then((res) => res.json());

  return {
    props: {
      news,
      randomUsers
    }
  }
}