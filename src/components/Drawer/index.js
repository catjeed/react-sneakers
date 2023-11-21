import styles from './Drawer.module.scss';
import Info from '../Info';

function Drawer({ onClose, onRemove, items = [] }) {
  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains(styles.overlay)) onClose();
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
              <button className={styles.greenButton}>
                Оформить заказ <img src='./images/arrow.svg' alt='arrow' />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={'Корзина пустая'}
            description={
              'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
            }
            ImageSize={120}
            imageUrl={'./images/empty-box.png'}
            imageAlt={'пустая коробка'}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
