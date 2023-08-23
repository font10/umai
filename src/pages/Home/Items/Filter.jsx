import React from 'react'
import { AiOutlineSearch } from '../../../utils/icons/index'

export const Filter = ({ search, setSearch }) => {
  return (
    <div className='w-full md:w-9/12 xl:w-10/12 mt-5 ml-8 xl:ml-16 2xl:ml-0 sm:mt-2'>
        <div className="absolute top-50 translate-middle-y px-3">
        <AiOutlineSearch size={20} className='text-gray-400 mt-3.5 ml-2 sm:ml-0' />
        </div>
        <input
        type="text"
        className="block w-full text-[16px] font-normal border-2 border-gray-200 rounded-lg p-2 ps-12 bg-white focus:border-gray-500 focus:outline-amber-300"
        name="search"
        id="search"
        placeholder='Search recipes...'
        required
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        />
    </div>
  )
}
