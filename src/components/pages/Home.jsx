import Card from '../Card';

function Home({
  searchValue,
  onChangeSearchInput,
  setSearchValue,
  items,
  cartItems,
  favorites,
  onAddToCart,
  onAddFavorite,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => onAddToCart(obj)} // добавить в корзину
        onFavorite={(obj) => onAddFavorite(obj)} // добавить в закладки
        added={cartItems.some((obj) => Number(obj.id) === Number(item.id))} //проверяет наличие в корзине и ставит плюс (если есть)
        favorited={favorites.some((obj) => Number(obj.id) === Number(item.id))} //проверяет наличие в закладках и ставит лайк (если есть)
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className='content p-40'>
      <div className='title-search d-flex justify-between mb-30'>
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}{' '}
          {/* Меняет заголовк в зависимости от запроса в поиске  */}
        </h1>
        <div className='search-block'>
          <img src='../images/search.svg' alt='search' className='pl-10' />
          <input
            onChange={onChangeSearchInput}
            type='text'
            placeholder='Поиск...'
            value={searchValue}
          />
          {searchValue && (
            <img
              onClick={() => {
                setSearchValue('');
              }}
              className='clearBtn removeBtn'
              width={20}
              height={20}
              src='../images/close.svg'
              alt='clear'
            />
          )}
        </div>
      </div>
      <div className='cards'>{renderItems()}</div>
    </div>
  );
}

export default Home;
