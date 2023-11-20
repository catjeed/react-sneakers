import Card from '../Card';
import styles from '../Drawer/Drawer.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

function Favorites({ items, onClose, onAddFavorite }) {
  return (
    <div className='content p-40'>
      <div className='title-search d-flex justify-between mb-30'>
        <h1>Мои закладки</h1>
      </div>
      {items.length > 0 ? (
        <div className='cards'>
          {items.map((item) => (
            <Card
              key={item.id}
              favorited={true}
              onFavorite={onAddFavorite}
              {...item}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyFavorites}>
          <div className={styles.empty}>
            <img
            className={styles.sadFace}
              width={70}
              height={70}
              src='../images/sadFace.png'
              alt='грустный смайлик'
            />
            <h2>Закладок нет </h2>
            <p>Вы ничего не добавляли в закладки</p>
            <Link to='/'>
              <button onClick={onClose} className={styles.greenButton}>
                <img className='arrow' src='./images/arrow.svg' alt='arrow' />
                Вернуться назад
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;
