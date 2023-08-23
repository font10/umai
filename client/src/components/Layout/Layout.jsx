import React from 'react'
import { Navbar } from '../Navbar/Navbar';
export const Layout = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen'>      
        <Navbar />
        
        <div className="flex-1 mx-auto max-w-[1440px] w-full justify-center">
            {children}
        </div>
    </div>
    );
}