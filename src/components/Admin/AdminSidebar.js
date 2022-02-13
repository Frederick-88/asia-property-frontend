import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/logo.png";

const AdminSidebar = (props) => {
    const [activeButton, setActiveButton] = useState("dashboard");
    const sidebarButtonList = [
        {
            class: 'icon-statistic',
            name: 'Dashboard',
            value: 'dashboard',
        },
        {
            class: 'icon-property',
            name: 'Listings',
            value: 'listings',
        },
        {
            class: 'icon-team',
            name: 'Users',
            value: 'users',
        },
        {
            class: 'icon-agent',
            name: 'Agents',
            value: 'agents',
        },
        {
            class: 'icon-money',
            name: 'Revenues',
            value: 'revenues',
        },
        {
            class: 'icon-settings-solid',
            name: 'Settings',
            value: 'settings',
        },
    ];

  // ----------------------
  //  < ---- Methods ---- >
  // ----------------------
    const isActiveButton = (button) => {
        return button === activeButton ? 'button--active' : '';
    }
    const selectButton = (button) => {
        setActiveButton(button);
    }

    return (
        <div className='admin-sidebar'>
            <div className="sidebar__content">
                <div className='sidebar__logo'>
                <Link to="/admin" className="sidebar__logo">
                    <img className='logo' src={Logo} alt="logo"/>
                    <h4 className="logo-title">Asia Property</h4>
                </Link>
                </div>

                <div className='sidebar__user-profile'>
                    <img className='profile-image' src="https://pbs.twimg.com/media/FJYRgy6acAYzXgj.jpg" alt="logo"/>
                    <h4 className='profile-title'>Frederick</h4>
                    <p className='profile-role'>Admin</p>
                </div>

                <div className='sidebar__button-list'>
                    {sidebarButtonList.map((button, index) => {
                        return (
                            <button 
                                type='button' 
                                className={'sidebar-button ' + isActiveButton(button.value)} 
                                key={index}
                                onClick={() => selectButton(button.value)}
                            >
                                <i className={'button-icon ' + button.class} />
                                <p className="button-text">{button.name}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="sidebar__reminder-box">
                <div className="sidebar__reminder-content">
                    <i className="icon-shift" />
                    <i className="content-icon icon-history" />
                    <h4 className="title">History Available</h4>
                    <p className="subtitle">Check your weekly transaction reports</p>
                </div>
            </div>
        </div>
    )
};

export default AdminSidebar;