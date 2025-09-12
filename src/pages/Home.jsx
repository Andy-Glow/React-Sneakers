import React from 'react';
import Card from '../components/Card';
import AppContext from '../context'; // Добавьте импорт контекста

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const { favorites } = React.useContext(AppContext); // Добавьте эту строку

  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    if (isLoading) {
      return [...Array(8)].map((_, index) => (
        <Card
          key={`loading-${index}-${Date.now()}`}
          loading={true}
        />
      ));
    }

    return filtredItems.map((item, index) => (
      <Card
        key={`${item.id}-${index}-${Date.now()}`} // Уникальный ключ
        id={item.id}
        title={item.title}
        price={item.price}
        imageUrl={item.imageUrl}
        onFavorite={onAddToFavorite}
        onPlus={onAddToCart}
        loading={false}
        favorited={favorites.some(fav =>
          fav.id === item.id ||
          fav.parentId === item.id
        )}
      />
    ));
  };

  return (
    <div className="content">
      <div className="all-sneakers-search">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img onClick={() => setSearchValue('')}
              className="clear cartItemBtn"
              src="/img/btn-remove.svg" alt="Clear" />
          )}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..."></input>
        </div>
      </div>

      <div className="sneakers">{renderItems()}</div>
    </div>
  );
}

export default Home;