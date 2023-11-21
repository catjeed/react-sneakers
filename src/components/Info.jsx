import React from 'react';
import styles from './Drawer/Drawer.module.scss';
import AppContext from '../context.js';
import { Link } from 'react-router-dom';

function Info({ title, description, imageUrl, imageAlt, imageSize }) {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className={styles.info}>
      <img
        className='mb-20'
        width={imageSize}
        height={imageSize}
        src={imageUrl}
        alt={imageAlt}
      />
      <h2>{title}</h2>
      <p className='mt-10 opacity-6 text-center'>{description}</p>
      <Link to='/'>
        <button
          onClick={() => setCartOpened(false)}
          className={styles.greenButton}
        >
          <img className='arrow' src='./images/arrow.svg' alt='arrow' />
          Вернуться назад
        </button>
      </Link>
    </div>
  );
}

export default Info;
