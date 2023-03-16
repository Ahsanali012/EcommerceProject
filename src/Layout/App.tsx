import { createTheme, CssBaseline, Typography } from "@material-ui/core";
import Container from "@mui/material/Container";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useState } from "react";
import Catalog from "../Features/Catalog/Catalog";
import ProductDetailsPage from "../Features/Catalog/ProductDetails";
import ContactPage from "../Features/Contact/ContactPage";
import HomePage from "../Features/Home/HomePage";
import ServerError from "../Errors/ServerError";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import AboutPage from "../Features/About/AboutPage";
import NotFound from "../Errors/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasketPage from "../Features/Basket/BasketPage";
import CheckOutPage from "../Features/CheckOut/CheckOutPage";


import LoadingComponent from "./LoadingComponent";
import { useAppDispatch, useAppSelector } from "../Store/ConfigureStore";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const buyerId = getCookie("buyerId");
  //   if (buyerId) {
  //     agent.Basket.get()
  //       .then((basket) => setBasket(basket))
  //       .catch((error) => console.log(error))
  //       .finally(() => setLoading(false));
  //   }
  // }, [setBasket]);

  // const { basket, status } = useAppSelector((state) => state.basket);

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (!basket) dispatch(fetchBasket());
  // }, [basket, dispatch]);

  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initializing App" />;
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-center" hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/checkOut" element={<CheckOutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
