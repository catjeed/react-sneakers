import React from 'react';
import Card from './components/Card';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get('https://655545c663cafc694fe79d60.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get('https://655545c663cafc694fe79d60.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://655545c663cafc694fe79d60.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className='wrapper clear'>
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} />
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
                  key={index}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onPlus={(obj) => onAddToCart(obj)}
                  onFavorite={() => console.log('кликнул на сердце')}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
