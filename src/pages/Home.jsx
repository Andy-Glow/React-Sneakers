import React from 'react';
import Card from '../components/Card';


function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
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