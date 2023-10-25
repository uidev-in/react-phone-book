import React from 'react'
import Search from "../Search/Search"
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
                <img src="https://www.gstatic.com/images/branding/product/2x/contacts_2022_48dp.png" className="mr-3 h-6 sm:h-9" alt="" />
                <span className="self-center text-xl font-semibold whitespace-nowrap ">Contacts</span>
            </Link>
            <div className="flex items-center  lg:order-2">
                <Link to="/create" className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ">
                  Add Contact</Link>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
               <Search/>
            </div>
        </div>
    </nav>
</header>
  )
}
