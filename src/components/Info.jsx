import React from 'react';
import AppContext from '../context.js';

function Info({ title, description, imageUrl, imageAlt, imageSize }) {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className='info'>
      <img className='mb-20' height={imageSize} src={imageUrl} alt={imageAlt} />
      <h2>{title}</h2>
      <p className='mt-10 opacity-6 text-center'>{description}</p>
      <button onClick={() => setCartOpened(false)} className='greenButton'>
        <img className='arrow' src='./images/arrow.svg' alt='arrow' />
        Вернуться назад
      </button>
    </div>
  );
}

export default Info;
