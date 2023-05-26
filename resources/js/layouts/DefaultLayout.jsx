import React from 'react';
import AppHeader from "~components/AppHeader";
import AppContent from "~components/AppContent";

const DefaultLayout = () => {
    return (
        <div>
            <header className="app-header">
                <section>
                    <AppHeader/>
                </section>
            </header>
            <div className='main main-content'>
                <section className='login-bar'>
                    <AppContent/>
                </section>
            </div>
        </div>
    )
}
export default DefaultLayout
