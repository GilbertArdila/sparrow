import React from 'react'

const Search = () => {
    return (
        <div className='w-full max-w-[250px]   sticky z-50 top-2  px-3'>
            <div className='flex items-center p-3 rounded-full relative  '>
                {/**search icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 z-50 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                <input type="text" className='absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 bg-gray-100 focus:bg-white focus:shadow-lg focus:ring-0 ' placeholder='search tweet' />
            </div>
        </div>
    )
}

export default Search;