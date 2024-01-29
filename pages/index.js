import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed.jsx";
import Widgets from "../components/widgets/Widgets.jsx";

export default function Home({news}) {
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
          <Widgets news={news.articles}/>
        </section>
        
        {/**MODAL */}
      </main>
    </>
  );
}

//fetching the Widget´s news
export async function getServerSideProps(){
  const news = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json")
  .then((res) => res.json())

  return{
    props:{
      news
    }
  }
}