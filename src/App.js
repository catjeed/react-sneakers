import React from 'react';
import Route from 'react-router-dom'
import Card from './components/Card';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';

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
  }, []);

  const onAddToCart = (obj) => {
    axios
      .post('http://localhost:3001/cart', obj)
      .catch((err) => console.log(err));
    setCartItems((prev) => [...prev, obj]);
  };

  const onAddFavorite = (obj) => {
    axios
      .post('http://localhost:3001/favorites', obj)
      .catch((err) => console.log(err));
    setFavorites((prev) => [...prev, obj]);
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
        <div className='content p-40'>
          <div className='title-search d-flex justify-between mb-30'>
            <h1>
              {searchValue
                ? `Поиск по запросу: "${searchValue}"`
                : 'Все кроссовки'}
            </h1>
            <div className='search-block'>
              <img src='../images/search.svg' alt='search' className='pl-10' />
              <input
                onChange={onChangeSearchInput}
                type='text'
                placeholder='Поиск...'
                value={searchValue}
              />
              {searchValue && (
                <img
                  onClick={() => {
                    setSearchValue('');
                  }}
                  className='clearBtn removeBtn'
                  width={20}
                  height={20}
                  src='../images/close.svg'
                  alt='clear'
                />
              )}
            </div>
          </div>
          <div className='cards'>
            {items
              .filter((item) => item.title.toLowerCase().includes(searchValue))
              .map((item, index) => (
                <Card
                  key={index + 1}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onPlus={(obj) => onAddToCart(obj)}
                  onFavorite={(obj) => onAddFavorite(obj)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
