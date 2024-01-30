import { useState } from 'react'
import Search from './Search';
import News from './News';
import Users from './Users';

const Widgets = ({ news, randomUsers }) => {
  const [articleNumber, setArticleNumber] = useState(3);
  const [userNumber, setUserNumber] = useState(3);

  return (
    <>
      <Search />
      {/**News section */}
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-full  xl:mx-auto px-3">
        <h4 className="font-bold text-xl px-4">What´s happening</h4>
        {news.slice(0, articleNumber).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button onClick={() => setArticleNumber(articleNumber + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >Show more
        </button>
      </div>

      {/**Users section */}
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-full  xl:mx-auto px-3 sticky top-16">
        <h4 className='font-bold text-xl  px-4'>Who to follow</h4>
        {randomUsers.slice(0, userNumber).map((user) => (
          <Users key={user.login.username} user={user} />
        ))}
        <button onClick={() => setUserNumber(userNumber + 3)} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">Show more</button>
      </div>
    </>
  )
}

export default Widgets;