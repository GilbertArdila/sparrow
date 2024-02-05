import { useState } from 'react'
import Search from './Search';
import News from './News';
import Users from './Users';
import { AnimatePresence,motion } from 'framer-motion';

const Widgets = ({ news, randomUsers }) => {
  const [articleNumber, setArticleNumber] = useState(3);
  const [userNumber, setUserNumber] = useState(3);

  return (
    <>
      <Search />
      {/**News section */}
      <div className="widgetsSection">
        <h4 className="widgetTitle">What´s happening</h4>
        <AnimatePresence>
           {news.slice(0, articleNumber).map((article) => (
            <motion.div key={article.title} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}}>
              <News key={article.title} article={article} />
            </motion.div> 
          
        ))}
        </AnimatePresence>
       
        <button onClick={() => setArticleNumber(articleNumber + 3)}
          className="widgetButton"
        >Show more
        </button>
      </div>

      {/**Users section */}
      <div className="widgetsSection sticky top-16">
        <h4 className='widgetTitle'>Who to follow</h4>
        <AnimatePresence>
        {randomUsers.slice(0, userNumber).map((user) => (
          <motion.div key={user.login.username} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}}>
            <Users key={user.login.username} user={user} />
          </motion.div>
          
        ))}
         </AnimatePresence>
        <button onClick={() => setUserNumber(userNumber + 3)} className="widgetButton">Show more</button>
      </div>
    </>
  )
}

export default Widgets;