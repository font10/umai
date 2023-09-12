import React, { useState } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import logo from '../../assets/tiramisu.png'
import { route } from '../../models/route.model'

export const Navbar = () => {
  let Links = [
    { name: "Home", path: route.root.path },
    { name: "Create", path: route.create.path },
    { name: "Profile", path: route.profile.path },
  ];
  const [open, setOpen] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"])

  const logout = () => {
    removeCookie('access_token')
  }

  return (
    <div className="shadow-none w-full top-0 left-0 bg-wave h-[80px]" style={{ height: 130 }}>
      <div className='md:flex items-center justify-between py-4 md:px-10 px-7'>
        <Link to={route.root.path} className='font-semibold text-xl cursor-pointer flex flex-row items-center font-poppins
      text-gray-800'>
          <span className='text-indigo-600 mr-1'>
            <img src={logo} alt="" width={40} />
          </span>
          Umai
        </Link>

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          <HiOutlineMenu name={open ? 'close' : 'menu'} />
        </div>

        <ul className={`z-10 md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#fffced] md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-16 ' : 'top-[-490px]'}`}>
          {
            Links.map((link) => (
              <li key={link.name} className='md:ml-8 text-lg font-medium md:my-0 my-7'>
                <Link to={link.path} className='text-gray-800 hover:text-amber-400 duration-300 text-md font-bahnschrift font-semibold'>{link.name}</Link>
              </li>
            ))
          }
          { !cookies.access_token ? (<Link to={route.login.path} className='bg-amber-400 px-5 py-2 rounded-md text-white font-medium text-md ml-5 font-bahnschrift'>Login/Register</Link>) : <Link to={route.login.path} onClick={logout} className='bg-amber-400 px-5 py-2 rounded-md text-white font-medium text-md ml-5'>Logout</Link> }
        </ul>
      </div>
    </div>
  )
}
