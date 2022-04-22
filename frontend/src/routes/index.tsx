import React from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "../components/screens/login"
import ItemScreen from '../components/screens/item';

import NotFoundScreen from "../components/screens/notFound/notFoundLayout";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginScreen />}>
                    <Route index element={<LoginScreen />} />
                </Route>
                <Route path="/item" element={<ItemScreen />}>
                    <Route index element={<ItemScreen />} />
                </Route>
                <Route path="*" element={<NotFoundScreen />}>
                    <Route index element={<NotFoundScreen />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


export default AppRouter;
