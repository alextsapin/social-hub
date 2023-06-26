import React, { ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';
import { Profile } from '../pages/Profile/Profile';
import { Header } from '../widgets/Header/Header';

import './css/App.scss';

const App = (): ReactElement => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />}>
                    <Route path=":id" element={<Profile />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
