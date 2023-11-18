import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('http://localhost:3001/items').then((res) => {
      setItems(res.data);
    });
    axios.get('http://localhost:3001/cart').then((res) => {
      setCartItems(res.data);
    });
    axios.get('http://localhost:3001/favorites').then((res) => {
      setFavorites(res.data);
    });
  }, []);
  const onAddToCart = (obj) => {
    if (cartItems.find((cartObj) => cartObj.id === obj.id)) {
      axios.delete(`http://localhost:3001/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios
        .post('http://localhost:3001/cart', obj)
        .catch((err) => console.log(err));
      setCartItems((prev) => [...prev, obj]);
    }
  };
  const onAddFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
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
      console.log('Не удалось добавить в закладки', error);
    }
  };
  const onRemoveItem = (id) => {
    axios
      .delete(`http://localhost:3001/cart/${id}`)
      .catch((err) => console.log(err));
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className='wrapper clear'>
      {cartOpened && (
        <Drawer
          items={cartItems}
          onRemove={onRemoveItem}
          onClose={() => setCartOpened(false)}
        />
      )}
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
                onAddToCart={onAddToCart}
                onAddFavorite={onAddFavorite}
              />
            }
          />
          <Route
            path='/favorites'
            element={
              <Favorites items={favorites} onAddFavorite={onAddFavorite} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
