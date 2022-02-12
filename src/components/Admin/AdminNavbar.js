import React from 'react';

const AdminNavbar = (props) => {
    const navIcons = ['icon-notification-line', 'icon-message', 'icon-gift', 'icon-user']
    const handleSearchInput = (event) => {
        let { value } = event.currentTarget;
        // setSearchQueryInput(value);
        console.log('search value', value);
    };

    return (
        <div className='admin-navbar'>
            <div className='navbar__search-bar'>
                <i className="icon-search search-icon" />
                <input
                    className="search-input"
                    placeholder="Search"
                    onChange={(event) => handleSearchInput(event)}
                />
            </div>

            <div className='navbar__button-list'>
                {navIcons.map((iconClass, index) => {
                    return (
                        <button type='button' className='navbar-button' key={index}>
                            <i className={iconClass} />
                        </button>
                    );
                })}
            </div>
        </div>
    )
};

export default AdminNavbar;