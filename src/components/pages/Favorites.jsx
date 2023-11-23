import Card from '../Card';
import React from 'react';
import AppContext from '../../context';
import Info from '../Info';

function Favorites() {
  const { favorites, onAddFavorite, onAddToCart } =
    React.useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="title-search d-flex justify-between mb-30">
        <h1>Мои закладки</h1>
      </div>
      {favorites.length > 0 ? (
        <div className="cards">
          {favorites.map((item, index) => (
            <Card
              key={index}
              favorited={true}
              onPlus={(obj) => onAddToCart(obj)}
              onRemove={(obj) => onAddFavorite(obj)}
              {...item}
            />
          ))}
        </div>
      ) : (
        <Info
          title={'Закладок нет'}
          description={'Вы ничего не добавляли в закладки'}
          imageUrl={'/react-sneakers/images/sadFace.png'}
          imageAlt={'грустный смайлик'}
          imageSize={70}
        />
      )}
    </div>
  );
}

export default Favorites;
