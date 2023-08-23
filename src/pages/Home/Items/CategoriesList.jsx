import React from 'react'
import { categoriesList } from '../../../utils/constants/index'

export const CategoriesList = ({ categorySelected, setCategorySelected }) => {
  return (
    <div className='flex flex-row overflow-x-auto xl:overflow-x-hidden xl:flex-col w-full justify-start xl:justify-center items-start'>
    {
        categoriesList.map(item => (
        <div key={item.value} onClick={() => setCategorySelected(item.value)} className={`${categorySelected === item.value ? 'bg-amber-300' : 'hover:bg-yellow-50'} justify-center flex-row p-4 mx-1 xl:mx-0 pl-0 w-full py-2 rounded-full border-2 ps-5 border-gray-100 font-medium text-sm flex items-center gap-2 my-1 `}>
            <img src={item.icon} alt='' width={23} className='ml-4' />
            <div className={`${item.value.length > 10 ? 'w-[140px]' : 'w-auto pr-8' }`}>{item.value}</div>
        </div>
        ))
    }
    </div>
  )
}
