import React from 'react';
import Info from '../Info';
import Card from '../Card';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://655e0fb09f1e1093c59a71b9.mockapi.io/orders'
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка получения заказов', error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="title-search d-flex justify-between mb-30">
        <h1>Мои покупки</h1>
      </div>
      {orders.length > 0 ? (
        <div className="cards">
          {orders.map((item, index) => (
            <Card key={index} loading={isLoading} {...item} />
          ))}
        </div>
      ) : (
        <Info
          title={'У вас нет заказов '}
          description={'Оформите хотя бы один заказ'}
          imageUrl={'/react-sneakers/images/cryFace.png'}
          imageAlt={'плачущий смайлик'}
          imageSize={70}
        />
      )}
    </div>
  );
}

export default Orders;
