import Card from '../Card';
import React from 'react';
import AppContext from '../../context';
import Info from '../Info';

function Favorites() {
  const {favorites, onAddFavorite, onAddToCart} = React.useContext(AppContext);

  return (
    <div className='content p-40'>
      <div className='title-search d-flex justify-between mb-30'>
        <h1>Мои закладки</h1>
      </div>
      {favorites.length > 0 ? (
        <div className='cards'>
          {favorites.map((item) => (
            <Card
              key={item.id}
              favorited={true}
              onFavorite={(obj) => onAddFavorite(obj)} // добавить в закладки
              onPlus={(obj) => onAddToCart(obj)} // добавить в корзину
              {...item}
            />
          ))}
        </div>
      ) : (
        <Info 
        title={"Закладок нет"}
        description={"Вы ничего не добавляли в закладки"}
        imageUrl={'../images/sadFace.png'}
        imageAlt={'грустный смайлик'}
        imageSize={70}
        />
      )}
    </div>
  );
}

export default Favorites;
