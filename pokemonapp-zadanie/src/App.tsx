import React, {useEffect} from 'react';
import Background from "./Components/Background";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./Sections/Navbar";
import Search from "./Pages/Search";
import Compare from "./Pages/Compare";
import Pokemon from "./Pages/Pokemon";
import Footer from "./Sections/Footer";
import "./scss/index.scss"
import {toast, ToastContainer, ToastOptions} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {clearToasts} from "./app/slices/AppSlice";
import Home from "./Pages/Home";


function App() {

    const {toasts} = useAppSelector(({app})=> app);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (toasts.length) {
            const toastOptions: ToastOptions = {
                position: "bottom-right",
                autoClose: 2000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            };
            toasts.forEach((message: string) => {
                toast(message, toastOptions);
            });
            dispatch(clearToasts());
        }
    }, [toasts, dispatch]);
  return (
      <div className="main-container">
        <Background />
        <BrowserRouter>
          <div className="app">
            <Navbar />
            <Routes>
                <Route element={<Home/>} path={"/table"}/>
                <Route element={<Search/>} path={"/search"}/>
              <Route element={<Compare/>} path={"/compare"}/>
              <Route element={<Pokemon/>} path={"/pokemon/:id"}/>
              <Route element={<Navigate to="/pokemon/1"/>} path="*"/>

            </Routes>
            <Footer />
              <ToastContainer/>
          </div>
        </BrowserRouter>

      </div>
  );
}

export default App;
