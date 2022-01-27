import React from 'react';

const AdminNavbar = (props) => {
    const navButtonList = [
        {
            class: 'icon-notification-bell',
            value: 'notification',
        },
        {
            class: 'icon-notification-bell',
            value: 'notification',
        },
        {
            class: 'icon-notification-bell',
            value: 'notification',
        },
        {
            class: 'icon-notification-bell',
            value: 'notification',
        },
    ];
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
                {navButtonList.map((button, index) => {
                    return (
                        <button type='button' className='navbar-button' key={index}>
                            <i className={button.class} />
                        </button>
                    );
                })}
            </div>
        </div>
    )
};

export default AdminNavbar;