import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import AppContext from "./context";
import Header from "./components/Header";
import Overlay from "./pages/Overlay";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AuthPage from "./pages/AuthPage"; // твой новый компонент
import { urls } from "./utils/urls";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("currentUser"));

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [itemsIsLoading, setItemsIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuth) return; // если не авторизован — не грузим данные
    (async () => {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get(urls.CART),
            axios.get(urls.FAVORITES),
            axios.get(urls.ITEMS),
          ]);

        setItemsIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных!");
        console.error(error);
      }
    })();
  }, [isAuth]); // загрузка данных при авторизации

  const onAddtoCartHandler = async (obj) => {
    try {
      if (cartItems.some((item) => item.id === obj.id)) {
        setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
        await axios.delete(`${urls.CART}/${obj.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        await axios.post(urls.CART, obj);
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину!");
      console.error(error);
    }
  };

  const onAddtoFavoriteHandler = (obj) => {
    try {
      if (favorites.some((favObj) => favObj.id === obj.id)) {
        axios.delete(`${urls.FAVORITES}/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        axios.post(urls.FAVORITES, obj);
        setFavorites((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранные");
      console.error(error);
    }
  };

  const deletefromCartHandler = (id) => {
    try {
      axios.delete(`${urls.CART}/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };

  const searchItemsHandler = items.filter((item) =>
    item.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  const isItemAdded = (id) => cartItems.some((obj) => obj.id === id);

  const onLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuth(false);
  };

  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddtoFavoriteHandler,
        onAddtoCartHandler,
        setCartItems,
        setCartOpened,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <div className="container">
            {cartOpened && (
              <Overlay
                deleteFromCart={deletefromCartHandler}
                cartItems={cartItems}
                onClickCart={() => setCartOpened(!cartOpened)}
              />
            )}

            <Header
              onClickCart={() => setCartOpened(!cartOpened)}
              onLogout={onLogout}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    items={items}
                    cartItems={cartItems}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    searchItemsHandler={searchItemsHandler}
                    onAddtoFavoriteHandler={onAddtoFavoriteHandler}
                    onAddtoCartHandler={onAddtoCartHandler}
                    itemsIsLoading={itemsIsLoading}
                  />
                }
              />
              <Route path="favorites" element={<Favorites />} />
              <Route path="orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
