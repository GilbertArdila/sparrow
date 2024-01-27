import Post from "./Post";

const posts = [
    {
        id:"1",
        name:"random",
        userName:"userRandom",
        userImage:"https://avatars.githubusercontent.com/u/88728941?v=4",
        image:"https://images.unsplash.com/photo-1682686581413-0a0ec9bb35bb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
        text:"wow!!!!!!",
        timestamp:"2 hours ago"
    },
    {
        id:"2",
        name:"random",
        userName:"userRandom",
        userImage:"https://avatars.githubusercontent.com/u/88728941?v=4",
        image:"https://images.unsplash.com/photo-1687716005788-3a31b81f70f8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
        text:"wow!!!!!!",
        timestamp:"2 days ago"
    },
]
const Posts = () => {
  return (
    <div>
        {posts.map((post)=>(
            <Post key={post.id} post={post}/>
        ))}
    </div>
  )
}

export default Posts;