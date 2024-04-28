import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import Checkout from "./pages/Checkout";
import BuyingSteps from "./pages/BuyingSteps";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FindTicketContextProvider from "./store/findTicketContext";
import AuthContextProvider from "./store/authContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/flights",
        element: <Flights />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/guide",
        element: <BuyingSteps />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
    ],
  },
]);
function App() {
  return (
    <AuthContextProvider>
      <FindTicketContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </FindTicketContextProvider>
    </AuthContextProvider>
  );
}

export default App;
