import React from 'react'
import './Header.css'
import Search from './Search/Search'

const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <div className="header-inner">
                    <div className="logo">Movies List</div>
                    <Search />
                </div>
            </div>
        </div>
    )
}

export default Header