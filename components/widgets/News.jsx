import React from 'react'

const News = ({article}) => {
  return (
    <a href={article.url} target='_blank'>
        <div className='widgetDiv justify-between  space-x-1  '>
            <div className='space-y-0.5'>
              <h6 className='text-sm font-bold '>{article.title}</h6>
              <p className='text-xsm font-medium text-gray-500'>{article.source.name}</p>
            </div>
            <img src={article.urlToImage} alt={article.title} className=' rounded-xl object-cover' width={"70"} />
        </div>
    </a>
  )
}

export default News;