
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux'; 
import NavBar from './components/navBar/NavBar';
import {routes} from './rotes';

export const store = configureStore({
  reducer: {},
})



function App() {
  const isLoading = useSelector()
  return (
    <Provider store={store}>
    <BrowserRouter>
    <main>
      <NavBar />
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
  </Provider>
  );
}

export default App;