import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DefaultLayout from "~layouts/DefaultLayout";

export default function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultLayout />} />
            </Routes>
        </BrowserRouter>
    );
}
