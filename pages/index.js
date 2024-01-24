import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";

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
      <main className="flex min-h-screen max-w-7xl mx-auto ">
        {/**SIDEBAR */}
        <Sidebar />
        {/**FEED SECTION */}
        {/**WIDGETS */}
        {/**MODAL */}
      </main>
    </>
  );
}
