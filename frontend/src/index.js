import React from 'react';
import ReactDOM from 'react-dom/client';
import{
      createBrowserRouter,
      createRoutesFromElements,
      Route,
      RouterProvider} from 'react-router-dom';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}> 
      <Route index={true} path="/" element={<HomeScreen/>}/>
    </Route>
  )
)
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
