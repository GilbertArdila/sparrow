import { useSession, signIn } from "next-auth/react";

import Menu from "./Menu";
import Logo from "./Logo";
import Button from "./Button";
import MiniProfile from "./MiniProfile";

const Sidebar = () => {
  const { data: session } = useSession();
  console.log(session)
  return (
    <>
      {/**Logo */}
      <div className="hoverEffect p-0 xl:p-1 hover:bg-blue-100">
        <Logo />
      </div>

      {/**Menu */}
      <Menu />
      {session ? (
        <>
          {/**Button */}
          <Button />
          {/**Mini-profile */}
          <MiniProfile />
        </>
      ) : <button
        onClick={signIn}
        className='w-56 h-12 rounded-full bg-blue-400 text-white font-bold p-2 shadow-md  hoverEffect hover:brightness-95 text-lg hidden xl:inline'>Sign-in</button>}
    </>
  )
}

export default Sidebar;



