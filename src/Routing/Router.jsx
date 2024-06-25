import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import Analytics from '../Pages/Analytics/Analytics';
import Setting from '../Pages/Setting/Setting';

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Setting />} />
            </Routes>
        </>
    )
}

export default Router