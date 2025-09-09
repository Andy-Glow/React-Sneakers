import Card from '../components/Card';


function Home({ items, searchValue, setSearchValue, onAddToFavorite, onChangeSearchInput, onAddToCart, cartItems }) {
    return (
        <div>
            <div className="content">
                <div className="all-sneakers-search">
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                    <div className="search-block">
                        <img src="/img/search.svg" alt="Search" />
                        {searchValue && <img onClick={() => setSearchValue('')} className="clear cartItemBtn" src="/img/btn-remove.svg" alt="Clear" />}
                        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..."></input>
                    </div>
                </div>

                <div className="sneakers">
                    {
                        items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
                            <Card
                                key={index}
                                onFavorite={(obj) => onAddToFavorite(obj)}
                                onPlus={(obj) => onAddToCart(obj)}
                                added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
                                {...item}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Home;