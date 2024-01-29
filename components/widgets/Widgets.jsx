import { useState } from 'react'
import Search from './Search';
import News from './News';

const Widgets = ({ news }) => {
  const [articleNumber, setArticleNumber] = useState(3);
  return (
    <>
      <Search />
      {/**News section */}
      <div className="text-gray-700 space-y-3 bg-blue-100 rounded-xl pt-2 w-full  xl:mx-auto px-3">
        <h4 className="font-bold text-xl px-4">What´s happening</h4>
        {news.slice(0, articleNumber).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button onClick={()=>setArticleNumber(articleNumber + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >Show more
        </button>
      </div>

    </>
  )
}

export default Widgets;