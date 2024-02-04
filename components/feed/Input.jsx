/* eslint-disable @next/next/no-img-element */
import { useSession, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";



const Input = () => {
    const { data: session } = useSession();

    const [inputData, setInputData] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageFilePicker = useRef(null);

    //send post to db function
    async function sendPost() {
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, "posts"), {
            id: session.user.uid,
            text: inputData,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
            name: session.user.name,
            userName: session.user.username
        });
        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        //add image url to db
        if (imageFile) {
            await uploadString(imageRef, imageFile, "data_url")
                .then(async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    //upload post with image url
                    await updateDoc(doc(db, "posts", docRef.id), {
                        image: downloadURL

                    })
                })
        };
        setInputData("");
        setImageFile(null);
        setLoading(false);
    }

    //get and store image url function
    const addImageFile = (e) => {

        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setImageFile(readerEvent.target.result)
        }
    }


    return (
        <>
            {/**show only if there are session */}
            {session && (
                <div className="flex border-b border-gray-200 p-3 space-x-3">
                    {/**profile section */}
                    <img
                        onClick={signOut}
                        src={session?.user.image}
                        alt={session?.user.name}
                        className="rounded-full w-11 h-11 object-contain cursor-pointer hover:brightness-95" />
                    <div className="w-full divide-y divide-gray-200">
                        <div >
                            <textarea
                                rows="2"
                                placeholder="What´s happening?"
                                className="w-full focus:ring-0 border-none text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 border-b "
                                value={inputData}
                                onChange={(e) => setInputData(e.target.value)}></textarea>
                        </div>

                        {/**show upload file */}
                        {imageFile && (
                            <div className="relative">
                                {/**X icon to delete chosen file */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute w-6 h-6 text-red-600 cursor-pointer left-11 top-2 shadow-md shadow-red-600 rounded-full" onClick={() => setImageFile(null)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                                <img src={imageFile} alt="post image" className={`w-[80%] mx-auto object-contain rounded-md ${loading && 'animate-pulse'}`}
                                />
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-2.5">
                            {/**if is not loading show this */}
                            {!loading && (
                                <>
                                    <div className="flex items-center">

                                        {/**Photo icon and file input */}
                                        <div className="" onClick={() => imageFilePicker.current.click()}>
                                            {inputData.trim() && (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 hoverEffect p-2 text-sky-500 ${inputData.trim() ? 'hover:bg-sky-100' : 'hover:bg-red-200'} ${imageFile ? 'bg-green-300' : null}`}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                    </svg>
                                                    <input type="file" hidden ref={imageFilePicker} onChange={addImageFile} />
                                                </>
                                            )}
                                        </div>

                                        {/**Emoji icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                        </svg>
                                    </div>
                                    
                                    {/**send post button */}
                                    <button
                                        disabled={!inputData.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold hover:brightness-95 shadow-md disabled:opacity-50"
                                        onClick={sendPost}
                                    >Twitter</button>
                                </>
                            )}


                        </div>

                    </div>
                </div>
            )}
        </>
    )

}


export default Input;