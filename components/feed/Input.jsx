import Image from "next/image";


const Input = () => {
    return (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
            <img src="https://avatars.githubusercontent.com/u/88728941?v=4" alt="user image"  className="rounded-full cursor-pointer hover:brightness-95 w-11 h-11" />
            <div className="w-full divide-y divide-gray-200">
                <div className="">
                    <textarea rows="2" placeholder="What´s happening?" className="w-full focus:ring-0 border-none text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 border-b "></textarea>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                    <div className="flex items-center">
                         {/**Photo icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    {/**Emoji icon */}

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                    </svg>
                    </div>
                   <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold hover:brightness-95 shadow-md disabled:opacity-50">Twitter</button>

                </div>
                
            </div>
        </div>
    )
}

export default Input;