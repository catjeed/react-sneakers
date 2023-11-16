import React from 'react';

function Header(props) {
  return (
    <header className='d-flex justify-between align-center p-40'>
      <div className='d-flex align-center'>
        <img
          width={40}
          height={40}
          className='mr-10'
          src='../images/logo.svg'
          alt='logo'
        />
        <div className='headerInfo'>
          <h3 className='text-uppercase'>React Sneakers</h3>
          <p className='opacity-5'>Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className='d-flex'>
        <li className='mr-30 d-flex align-center' onClick={props.onCartClick}>
          <img
            height={18}
            width={18}
            className='mr-10'
            src='../images/cart.svg'
            alt='cart'
          />
          <span>1205 руб.</span>
        </li>
        <li className='mr-30 d-flex align-center'>
          <img src='../images/heart.svg' alt='user' className='mr-10' />
          <span>Закладки</span>
        </li>
        <li className='mr-30 d-flex align-center'>
          <img src='../images/user.svg' alt='user' className='mr-10' />
          <span>Профиль</span>
        </li>
      </ul>
    </header>
  );
}

export default Header;
