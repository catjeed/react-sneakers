import React from 'react';
import styles from './Card.module.scss';

function Card({ id, title, price, imageUrl, onPlus, onFavorite, favorited = false, added = false}) {
  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const handleCLickPlus = () => {
    onPlus({ id, title, price, imageUrl });
    setIsAdded(!isAdded);
  };

  const handleCLickFavorite = () => {
    onFavorite({ id, title, price, imageUrl });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <img
        className='button favorite'
        onClick={handleCLickFavorite}
        src={
          isFavorite ? '../images/pink-heart.svg' : '../images/white-heart.svg'
        }
        alt='favorite'
        width={32}
        height={32}
      />
      <img src={imageUrl} alt={title} width={133} height={112} />
      <h5>{title}</h5>
      <div className='d-flex justify-between align-center'>
        <div className='price d-flex flex-column'>
          <span className='text-uppercase'>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className='button'
          width={32}
          height={32}
          onClick={handleCLickPlus}
          src={isAdded ? '../images/green-check.svg' : '../images/plus.svg'}
          alt='plus'
        />
      </div>
    </div>
  );
}

export default Card;
