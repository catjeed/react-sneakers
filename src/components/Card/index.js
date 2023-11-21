import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

function Card({
  id,
  title,
  price,
  imageUrl,
  onPlus,
  onFavorite,
  loading = false,
}) {
  const { isItemAdded, isItemLiked } = React.useContext(AppContext);
  // const [isAdded, setIsAdded] = React.useState(added);
  // const [isFavorite, setIsFavorite] = React.useState(favorited);

  const handleCLickPlus = () => {
    onPlus({ id, title, price, imageUrl });
  };

  const handleCLickFavorite = () => {
    onFavorite({ id, title, price, imageUrl });
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={0}
          width={160}
          height={251}
          viewBox='0 0 160 254'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='165' rx='3' ry='3' width='158' height='15' />
          <rect x='0' y='227' rx='8' ry='8' width='85' height='30' />
          <rect x='125' y='220' rx='8' ry='8' width='33' height='33' />
          <rect x='0' y='0' rx='10' ry='10' width='160' height='140' />
          <rect x='0' y='182' rx='3' ry='3' width='95' height='15' />
        </ContentLoader>
      ) : (
        <>
          <img
            className='button favorite'
            onClick={handleCLickFavorite}
            src={
              isItemLiked(id)
                ? '../images/pink-heart.svg'
                : '../images/white-heart.svg'
            }
            alt='favorite'
            width={32}
            height={32}
          />
          <img src={imageUrl} alt={title} width='100%' height={135} />
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
              src={isItemAdded(id) ? '../images/green-check.svg' : '../images/plus.svg'}
              alt='plus'
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
