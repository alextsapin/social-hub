/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy, ReactElement, Suspense, LazyExoticComponent, FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';
import { Footer } from '../widgets/Footer/Footer';
import { Header } from '../widgets/Header/Header';
import Preloader from '../widgets/Preloader/Preloader';

import './css/App.scss';

const Profile: LazyExoticComponent<FC> = lazy(async () => {
    const module = await import('../pages/Profile/Profile');

    return { default: module.default };
});

const App = (): ReactElement => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/profile"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Profile />
                        </Suspense>
                    }
                >
                    <Route path=":id" element={<Profile />} />
                </Route>
            </Routes>
            <Footer />
        </>
    );
};

export default App;
