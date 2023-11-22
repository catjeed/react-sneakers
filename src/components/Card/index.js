import React from 'react';
import styles from './Card.module.scss';
import AppContext from '../../context';
import { CardLoader } from '../CardLoader';

function Card({
  id,
  parentId,
  title,
  price,
  imageUrl,
  onPlus,
  onFavorite,
  loading = false,
}) {
  const { isItemAdded, isItemLiked } = React.useContext(AppContext);
  const itemObj = { id, parentId: id, title, price, imageUrl };

  const handleCLickPlus = () => {
    onPlus(itemObj);
  };

  const handleCLickFavorite = () => {
    onFavorite(itemObj);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <CardLoader />
      ) : (
        <>
          {onFavorite && (
            <img
              className="button favorite"
              onClick={handleCLickFavorite}
              src={
                isItemLiked(id)
                  ? '/react-sneakers/images/pink-heart.svg'
                  : '/react-sneakers/images/white-heart.svg'
              }
              alt="favorite"
              width={32}
              height={32}
            />
          )}
          <img src={imageUrl} alt={title} width="100%" height={135} />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="price d-flex flex-column">
              <span className="text-uppercase">Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className="button"
                width={32}
                height={32}
                onClick={handleCLickPlus}
                src={
                  isItemAdded(id)
                    ? '/react-sneakers/images/green-check.svg'
                    : '/react-sneakers/images/plus.svg'
                }
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
