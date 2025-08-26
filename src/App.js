import React from 'react';
import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://68adbec6a0b85b2f2cf47f24.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then(json => {
        setItems(json);
      });
  }, []);

    const onAddToCart = (obj) => {
      setCartItems(prev => [...prev, obj]);
    }

  return (
    <div className="wrapper">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content">
        <div className="all-sneakers-search">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск ..."></input>
          </div>
        </div>

        <div className="sneakers">
          {
            items.map((item) => (
              <Card
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => alert('Добавили в закладки')}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
