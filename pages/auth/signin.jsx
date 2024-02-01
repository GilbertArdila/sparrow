import {getProviders, signIn} from "next-auth/react";

const signin = ({providers}) => {
  return (
    <div className="flex flex-col  items-center w-screen h-screen border-4  border-blue-300">
        <div className="my-10">
            <h1 className="font-bold">Welcome to the Sparrow authentication page</h1>
        </div>
        <div className="flex justify-center items-center md:space-x-10">
             <img src="/image1.png" alt="sparrow logo" className="hidden md:inline-flex rotate-6 object-cover md:w-44 md:h-80" />
        <div >
            {Object.values(providers).map((provider)=>(
                <div className="flex flex-col items-center bg-blue-200 p-6 rounded-xl hover:bg-blue-300" key={provider.name}>
                    <img src="/image2.png" alt="sparrow logo" className="w-36 object-cover" />
                    <p className="text-center text-sm italic my-10">This app is only for learning purposes</p>
                    <button 
                    className="bg-red-300 rounded-lg p-3 text-white hover:bg-red-500"
                    onClick={()=> signIn(provider.id, {callbackUrl:"/"})}
                    >Sing with {provider.name}</button>
                </div>
            ))}
        </div>
        </div>
       
    </div>
  )
}

export default signin;

export async function getServerSideProps(){
    const providers = await getProviders()
    return {
        props:{
            providers
        }    }
}