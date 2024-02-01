import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
const Logo = () => {
  const { data: session } = useSession();
  return (

    <Image className='object-contain ' src="/image3.png" alt='sparrow logo' width={"50"} height={"50"}
      onClick={session ? signOut : signIn} />
  )
}

export default Logo;