/* eslint-disable @next/next/no-img-element */
import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import { modal, postUser, postId } from '../../globalStates/atom';
import { useSession } from 'next-auth/react';
import Moment from 'react-moment';
import { useRef, useState } from 'react';



const CommentsModal = () => {

  const [openModal, setOpenModal] = useRecoilState(modal);
  const [actualPostUser, setActualPostUser] = useRecoilState(postUser);
  const [actualPostId, setActualPostId] = useRecoilState(postId);


  const { data: session } = useSession();
  const [inputData, setInputData] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const imageFilePicker = useRef(null);



  //close  modal function
  const closeModal = () => {
    setOpenModal(false);
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

//send comment function
async function sendComment() {
  

 
}

  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        className='max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2  rounded-xl shadow-md'
        contentLabel="Comments Modal"
      >
        <div className='p-1'>
          <div className='border-b border-gray-200 py-2 px-1.5'>
            <div className='hoverEffect w-9 h-9 flex items-center justify-center'>
              {/**close icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 lg:min-h-7 lg:min-w-7 text-gray-500" onClick={() => setOpenModal(false)}>
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/**post user's information */}
          <div className='p-2 flex items-center space-x-1 relative'>
            {/**this span is the connector line between both pictures */}
            <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300' />
            
            <img src={actualPostUser?.userImage} alt={actualPostUser?.userName} className="rounded-full w-11 h-11 " />
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{actualPostUser?.name}</h4>
            <span className="text-sm sm:text-[15px]">@{actualPostUser?.userName}-</span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{actualPostUser.timestamp?.toDate()}</Moment></span>
          </div>
           <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2'>{actualPostUser?.text}</p>

            {/**user´s data */}
            <div className="flex  p-3 space-x-3">
              {/**profile image */}
              <img
                src={session?.user.image}
                alt={session?.user.name}
                className="rounded-full w-11 h-11 object-contain cursor-pointer hover:brightness-95" />

                {/**input and icons */}
              <div className="w-full divide-y divide-gray-200">
                <div >
                  <textarea
                    rows="2"
                    placeholder="Write your reply"
                    className="w-full focus:ring-0 border-none text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 border-b "
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                      {/**icons */}
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
                        onClick={sendComment}
                      >Reply</button>
                    

                </div>

              </div>
            </div>
          

        </div>


      </Modal>
    </div>
  )
}

export default CommentsModal;