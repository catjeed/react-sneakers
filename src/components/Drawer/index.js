import styles from './Drawer.module.scss';
import Info from '../Info';
import React from 'react';
import axios from 'axios';
import { useCart } from '../../hooks/useCart';

function Drawer({ onClose, onRemove, items = [], opened }) {
  //закрывает корзину при клике вне ее
  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains(styles.overlay)) onClose();
  };
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('http://localhost:3001/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('http://localhost:3001/cart/' + item.id);
        setCartItems([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Ошибка при создании заказа', error);
    }
    setIsOrderComplete(true);
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}
    >
      <div className={styles.drawer}>
        <h2 className='title mb-30 d-flex justify-between '>
          Корзина
          <img
            onClick={onClose}
            className='removeBtn'
            width={32}
            height={32}
            src='../images/close.svg'
            alt='close'
          />
        </h2>
        {items.length > 0 ? (
          <div className='cartWithItems d-flex flex-column flex'>
            <div className='items'>
              {items.map((obj) => (
                <div key={obj.id} className='cartItem'>
                  <img
                    className='m-20'
                    src={obj.imageUrl}
                    alt={obj.title}
                    width={70}
                    height={70}
                  />
                  <div className='cartItemInfo'>
                    <p>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <button className='removeBtn'>
                    <img
                      onClick={() => onRemove(obj.id)}
                      width={32}
                      height={32}
                      src='../images/close.svg'
                      alt='remove'
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className='cartTotalBlock'>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice * 0.05)} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className='greenButton'
              >
                Оформить заказ <img src='./images/arrow.svg' alt='arrow' />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
            }
            imageSize={120}
            imageUrl={
              isOrderComplete ? './images/order.png' : './images/empty-box.png'
            }
            imageAlt={isOrderComplete ? 'заказ оформлен' : 'пустая коробка'}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
