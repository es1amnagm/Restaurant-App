import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/register';
function App() {
  
  const route=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/Register",
      element:<Register/>
    }
  ])

  return (
    <>
     <RouterProvider router={route}/>
     
     
    </>
  )
}

export default App
