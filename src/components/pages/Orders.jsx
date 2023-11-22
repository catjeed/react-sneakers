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
      <div className="cards">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
