import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useCart } from '../../hooks/useCart';

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className="d-flex align-center">
          <img
            width={40}
            height={40}
            className="mr-10"
            src="/react-sneakers/images/logo.svg"
            alt="logo"
          />
          <div className="headerInfo">
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин уникальных кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 d-flex align-center" onClick={props.onCartClick}>
          <img
            height={18}
            width={18}
            className="mr-10"
            src="/react-sneakers/images/cart.svg"
            alt="cart"
          />
          <span>{totalPrice} руб.</span>
        </li>
        <Link to="/favorites">
          <li className="mr-30 d-flex align-center">
            <img
              src="/react-sneakers/images/heart.svg"
              alt="user"
              className="mr-10"
            />
            <span>Закладки</span>
          </li>
        </Link>
        <Link to="/orders">
          <li className="mr-30 d-flex align-center">
            <img
              src="/react-sneakers/images/user.svg"
              alt="user"
              className="mr-10"
            />
            <span>Профиль</span>
          </li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
