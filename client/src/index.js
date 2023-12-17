import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingUp from './view/SingUP/SingUp';
import Login from './view/Login/Login';
import Home from './view/Home/Home';
import Transaction from './view/Transaction/Transaction';
import Graph from './view/Graph/Graph';
import SetUpCash from './view/SetUpCash/SetUpCash';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/singup',
    element: <SingUp />
  },
  
  {
    path: '/transaction',
    element: <Transaction />
  },
   {
    path: '/graph',
    element: <Graph />
  },
   {
    path: '/setupcash',
    element: < SetUpCash/>
  },


])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);



