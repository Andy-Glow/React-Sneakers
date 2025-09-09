import Card from '../components/Card';


function Favorites({ items, onAddToFavorite, onAddToCart }) {
    return (
        <div>
            <div className="content">
                <div className="all-sneakers-search">
                    <h1>Мои закладки</h1>
                </div>

                <div className="sneakers">
                    {
                        items.map((item) => (
                            <Card
                                key={item.id}
                                favorited={true}
                                onFavorite={onAddToFavorite}
                                onPlus={(obj) => onAddToCart(obj)}
                                {...item}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Favorites;