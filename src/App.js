import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import AppContext from './context';
import Profile from './components/pages/Orders';

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
            axios.get('http://localhost:3001/cart'),
            axios.get('http://localhost:3001/favorites'),
            axios.get('http://localhost:3001/items'),
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

  const onAddToCart = (obj) => {
    try {
      // проверяет наличие объекта в корзине
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
        axios.delete(`http://localhost:3001/cart/${obj.id}`); // отправляет запрос на удаление (если нашел)
      } else {
        //если не нашел совпадений по айди
        axios.post('http://localhost:3001/cart', obj); //  добавляет в корзину
        setCartItems((prev) => [...prev, obj]); // перед этим добавив предыдущие товары из массива
      }
    } catch (error) {
      console.error('Не удалось добавить в корзину', error);
    }
  };

  const onAddFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          'http://localhost:3001/favorites',
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
        .delete(`http://localhost:3001/cart/${id}`)
        .catch((err) => console.log(err));
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Не удалось удалить товар из корзины', error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
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
      <div className='wrapper clear'>
        <Drawer
          items={cartItems}
          onRemove={onRemoveItem}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />
        <div className='container'>
          <Header onCartClick={() => setCartOpened(true)} />
          <Routes>
            <Route
              path='/'
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
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
