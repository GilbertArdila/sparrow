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
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-1 min-h-screen max-w-7xl mx-auto ">
        {/**SIDEBAR */}
        <div className="hidden sm:block sm:col-span-1  md:max-w-auto col-start-1 col-end-2 row-start-1 row-end-2 ">
          <Sidebar  />
        </div>
                
        {/**FEED SECTION */}
        <div className="col-span-3 sm:col-span-2 col-start-1 col-end-4 sm:col-start-2 sm:col-end-3 row-start-1 row-end-2  md:col-span-2  border-r border-l border-gray-200">
           <Feed />
        </div>
       
        {/**WIDGETS */}
        <div className="hidden md:block md:col-span-1 col-start-3 col-end-4 row-start-1 row-end-2 min-w-[300px] ">
          <Widgets/>
        </div>
        
        {/**MODAL */}
      </main>
    </>
  );
}
