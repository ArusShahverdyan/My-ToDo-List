
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { configureStore } from '@reduxjs/toolkit';
 import { useSelector } from 'react-redux'; 
import NavBar from './components/navBar/NavBar';
import {routes} from './routes';
import Loader from './components/loader/Loader';




function App() {
 
  const showLoading = useSelector((state) => state.loader.isLoading);
  return (
    <BrowserRouter>
    <main>
      <NavBar />
     
      { showLoading && <Loader />}
        <Routes>  
        {
          routes.map(page =>(
            <Route 
            key={page.path}
            path={page.path} 
            element={page.element} 
            />
            ))
        }
        
        </Routes>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        
    </main>
  </BrowserRouter>
 
  );
}

export default App;