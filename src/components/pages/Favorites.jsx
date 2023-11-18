import Card from "../Card";

function Favorites({items, onAddFavorite}) {
  return (
    <div className='content p-40'>
      <div className='title-search d-flex justify-between mb-30'>
        <h1>Мои закладки</h1>
      </div>
      <div className='cards'>
      {items
          .map((item, index) => (
            <Card
              key={index}
              favorited={true}
              onFavorite={onAddFavorite}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Favorites;
