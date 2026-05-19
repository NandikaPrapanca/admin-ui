import "./App.css";
import SignInPage from "./Pages/SignIn";
import SignUpPage from "./Pages/SignUp";
import ErrorPage from "./Pages/Error";
import DashboardPage from "./Pages/dashboard";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <DashboardPage/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/login",
      element: <SignInPage/>
    },
    {
      path: "/register",
      element: <SignUpPage/>
    },
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;