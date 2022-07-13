import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import {setupStore} from "store/Store";
import {Provider} from "react-redux";

const container = document.getElementById("main");
const root = createRoot(container);
const store = setupStore()

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>);
