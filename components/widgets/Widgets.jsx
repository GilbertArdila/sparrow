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
      <div className="widgetsSection">
        <h4 className="widgetTitle">What´s happening</h4>
        {news.slice(0, articleNumber).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button onClick={() => setArticleNumber(articleNumber + 3)}
          className="widgetButton"
        >Show more
        </button>
      </div>

      {/**Users section */}
      <div className="widgetsSection sticky top-16">
        <h4 className='widgetTitle'>Who to follow</h4>
        {randomUsers.slice(0, userNumber).map((user) => (
          <Users key={user.login.username} user={user} />
        ))}
        <button onClick={() => setUserNumber(userNumber + 3)} className="widgetButton">Show more</button>
      </div>
    </>
  )
}

export default Widgets;