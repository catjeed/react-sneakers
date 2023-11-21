import styles from './Drawer.module.scss';
import Info from '../Info';
import React from 'react';
import AppContext from '../../context';
import axios from 'axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
  //закрывает корзину при клике вне ее
  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains(styles.overlay)) onClose();
  };

  const { cartItems, setCartItems } = React.useContext(AppContext);

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
      console.log('Ошибка при создании заказа', error);
    }
    setIsOrderComplete(true);
  };

  return (
    <div onClick={handleOverlayClick} className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className='title mb-30 d-flex justify-between '>
          Корзина
          <img
            onClick={onClose}
            className={styles.removeBtn}
            width={32}
            height={32}
            src='../images/close.svg'
            alt='close'
          />
        </h2>
        {items.length > 0 ? (
          <div className='cartWithItems d-flex flex-column flex'>
            <div className={styles.items}>
              {items.map((obj) => (
                <div key={obj.id} className={styles.cartItem}>
                  <img
                    className='m-20'
                    src={obj.imageUrl}
                    alt={obj.title}
                    width={70}
                    height={70}
                  />
                  <div className={styles.cartItemInfo}>
                    <p>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <button className={styles.removeBtn}>
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
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className={styles.greenButton}
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
