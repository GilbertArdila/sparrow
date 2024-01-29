import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed.jsx";
import Widgets from "../components/widgets/Widgets.jsx";

export default function Home() {
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
        <div className="hidden sm:block     ">
          <Sidebar  />
        </div>
                
        {/**FEED SECTION */}
        <div className="sm:ml-[100px] xl:ml-[450px]  border-r border-l border-gray-200">
           <Feed />
        </div>
       
        {/**WIDGETS */}
        <div className="hidden md:block min-w-48 w-auto ">
          <Widgets/>
        </div>
        
        {/**MODAL */}
      </main>
    </>
  );
}
