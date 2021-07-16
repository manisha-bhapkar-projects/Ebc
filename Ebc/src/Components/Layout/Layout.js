import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="main-content">
                <Sidebar />
                <div className="page-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;