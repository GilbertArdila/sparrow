import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed.jsx";
import Widgets from "../components/widgets/Widgets.jsx";
import Modal from "../components/modal/CommentsModal.jsx";

import { useRecoilState } from "recoil";
import { modal } from "../globalStates/atom.js";


export default function Home({news,randomUsers}) {
  const [isOpen, setIsOpen]= useRecoilState(modal);
  return (
    <>
      <Head>
        <title>Sparrow app</title>
        <meta
          name="description"
          content="this is a Twitter clone only for educational purposes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        {/**SIDEBAR */}
        <section className="hidden sm:block  flex-col p-2 xl:items-start fixed h-full xl:ml-24     ">
          <Sidebar  />
        </section>
                
        {/**FEED SECTION */}
        <section className="sm:ml-[100px] xl:ml-[450px]  border-r border-l border-gray-200">
           <Feed />
        </section>
       
        {/**WIDGETS */}
        <section className="hidden md:inline ml-8 space-y-5 p-2">
          <Widgets news={news.articles} randomUsers={randomUsers.results}/>
        </section>
        
        {/**MODAL */}
        {isOpen && <Modal/>}
        
      </main>
    </>
  );
}

//Widget´s news section
export async function getServerSideProps(){
  const news = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json")
  .then((res) => res.json());

  //Widget´s who to follow section
  const randomUsers = await fetch("https://randomuser.me/api/?results=50&inc=name,login,picture").then((res)=>res.json());

  return{
    props:{
      news,
      randomUsers
    }
  }
}