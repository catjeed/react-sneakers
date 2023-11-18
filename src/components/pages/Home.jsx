import Card from '../Card';

function Home({
  searchValue,
  onChangeSearchInput,
  setSearchValue,
  items,
  onAddToCart,
  onAddFavorite,
}) {
  return (
    <div className='content p-40'>
      <div className='title-search d-flex justify-between mb-30'>
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
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
      <div className='cards'>
        {items
          .filter((item) => item.title.toLowerCase().includes(searchValue))
          .map((item, index) => (
            <Card
              key={index}
              onPlus={(obj) => onAddToCart(obj)}
              onFavorite={(obj) => onAddFavorite(obj)}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
