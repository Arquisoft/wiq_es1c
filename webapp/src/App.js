import React from 'react';

import router from './routers/AppRouter';
import { RouterProvider } from 'react-router-dom';
import MenuAppBar from './components/nav/Nav';


function App() {



  return (
    <>
    <RouterProvider router={ router } />
    <MenuAppBar/>
  u
    </>
  );
}

export default App;
