import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import Checkout from "./pages/Checkout";
import BuyingSteps from "./pages/BuyingSteps";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FindTicketContextProvider from "./store/FindTicketContext";
import AuthContextProvider from "./store/AuthContext.jsx";
import TicketBuyingProcessProvider from "./store/TicketBuyingProcess";
import Insurance from "./pages/Insurance.jsx";
import FindInsuranceContextProvider from "./store/FindInsuranceContext.jsx";
import UserDashBoard from "./pages/UserDashBoard.jsx";
import UserTickets from "./components/dashBoard/UserTickets.jsx";
import UserSupport from "./components/dashBoard/UserSupport.jsx";
import UserWallet from "./components/dashBoard/UserWallet.jsx";
import UserInformation from "./components/dashBoard/UserInformation.jsx";
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
        path: "/insurance",
        element: <Insurance />,
      },
      {
        path: "/dashBoard",
        element: <UserDashBoard />,
        children: [
          { path: "userInformation", element: <UserInformation /> },
          { path: "userTickets", element: <UserTickets /> },
          { path: "userSupport", element: <UserSupport /> },
          { path: "userWallet", element: <UserWallet /> },
        ],
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
        <FindInsuranceContextProvider>
          <TicketBuyingProcessProvider>
            <RouterProvider router={router}></RouterProvider>
          </TicketBuyingProcessProvider>
        </FindInsuranceContextProvider>
      </FindTicketContextProvider>
    </AuthContextProvider>
  );
}

export default App;
