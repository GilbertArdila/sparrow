

const Users = ({ user }) => {
    return (
        <div className='widgetDiv cursor-pointer' key={user.login.username}>
            <img src={user.picture.thumbnail} alt={user.login.username} className='rounded-full' width={40} />
            <div className='truncate ml-4 leading-5'>
                <h4 className='font-bold hover:underline text-[14px] truncate '>{user.login.username}</h4>
                <h5 className='text-[13px] text-gray-500 truncate'>{user.name.first + " " + user.name.last}</h5>
            </div>
            <button className='ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold'>Follow</button>
        </div>
    )
}

export default Users;