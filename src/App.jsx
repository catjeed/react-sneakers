import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import AppContext from './context';
import Orders from './components/pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // дает время на загрузку корзины/закладок, чтобы изменить состояние кнопок при наличии
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get(`https://655545c663cafc694fe79d60.mockapi.io/cart`),
            axios.get(`https://655e0fb09f1e1093c59a71b9.mockapi.io/favorites`),
            axios.get(`https://655545c663cafc694fe79d60.mockapi.io/items`),
          ]);

        setIsLoading(false);
        setFavorites(favoritesResponse.data);
        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error('Ошибка при запросе данных', error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      ); // проверяет наличие объекта в корзине
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://655545c663cafc694fe79d60.mockapi.io/cart/${findItem.id}`
        ); // отправляет запрос на удаление (если нашел)
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          `https://655545c663cafc694fe79d60.mockapi.io/cart`,
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.error('Не удалось добавить в корзину', error);
    }
  };

  const onAddFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        await axios.delete(
          `https://655e0fb09f1e1093c59a71b9.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          'https://655e0fb09f1e1093c59a71b9.mockapi.io/favorites',
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error('Не удалось добавить в закладки', error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios
        .delete(`https://655545c663cafc694fe79d60.mockapi.io/cart/${id}`)
        .catch((err) => console.log(err));
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      console.error('Не удалось удалить товар из корзины', error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isItemLiked = (id) => {
    return favorites.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        onAddToCart,
        onAddFavorite,
        isItemAdded,
        isItemLiked,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onRemove={onRemoveItem}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />
        <div className="container">
          <Header onCartClick={() => setCartOpened(true)} />
          <Routes>
            <Route
              path="/react-sneakers/"
              element={
                <Home
                  searchValue={searchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  setSearchValue={setSearchValue}
                  items={items}
                  cartItems={cartItems}
                  favorites={favorites}
                  onAddToCart={onAddToCart}
                  onAddFavorite={onAddFavorite}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="/react-sneakers/favorites" element={<Favorites />} />
            <Route path="/react-sneakers/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
