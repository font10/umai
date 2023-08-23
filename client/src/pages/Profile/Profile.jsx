import React from 'react'
import { profile, instagram, facebook, twitter } from '../../utils/images/index'
import { useStateContext } from '../../context/userContext'
import { MyRecipes } from './MyRecipes'

export const Profile = () => {
  const { username } = useStateContext()

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-row justify-center items-center gap-3'>
        <div>
          <img src={profile} alt='pic of user' width={100} />
        </div>
        <div>
          <h1 className='text-2xl'>{username}</h1>
          <span className='font-medium'>España</span>
          <div className='flex flex-wrap gap-3 mt-3'>
            <img src={instagram} alt='pic of ig' width={20} />
            <img src={facebook} alt='pic of fc' width={20} />
            <img src={twitter} alt='pic of tw' width={20} />
          </div>
        </div>

      </div>
      <div>
        <MyRecipes />
      </div>
    </div>
  )
}
