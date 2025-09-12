import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites() {
    const { favorites, onAddToFavorite, onAddToCart } = React.useContext(AppContext);

    return (
        <div className="content">
            <div className="all-sneakers-search">
                <h1>Мои закладки</h1>
            </div>

            <div className="sneakers">
                {favorites.map((item, index) => (
                    <Card
                        key={`${item.id}-${index}-${Date.now()}`} // Уникальный ключ
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        favorited={true}
                        onFavorite={onAddToFavorite}
                        onPlus={onAddToCart}
                        loading={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default Favorites;