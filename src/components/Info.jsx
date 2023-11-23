import React from 'react';
import { Link } from 'react-router-dom';

function Info({ title, description, imageUrl, imageAlt, imageSize }) {
  return (
    <div className="info">
      <img className="mb-20" height={imageSize} src={imageUrl} alt={imageAlt} />
      <h2>{title}</h2>
      <p className="mt-10 opacity-6 text-center">{description}</p>
      <Link to="/react-sneakers/">
        <button className="greenButton">
          <img
            className="arrow"
            src="/react-sneakers/images/arrow.svg"
            alt="arrow"
          />
          Вернуться назад
        </button>
      </Link>
    </div>
  );
}

export default Info;
