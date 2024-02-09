import React from 'react'

const Comments = ({comment, id}) => {
  return (
    <div className='flex space-x-3 items-center px-6 py-2 w-full'>
        <img src={comment.userImage} alt={comment.userName} className="rounded-full w-8 h-8 " />
        <span className='flex-1'>@{comment.userName}</span>
        <span>{comment.comment}</span>
    </div>
  )
}

export default Comments;