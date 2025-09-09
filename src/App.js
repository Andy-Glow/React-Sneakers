import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { Route, Routes } from 'react-router-dom';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://0096d6fd049a0897.mokky.dev/cart');
      const favoritesResponse = await axios.get('https://0096d6fd049a0897.mokky.dev/favorites');
      const itemsResponse = await axios.get('https://0096d6fd049a0897.mokky.dev/items');

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData()
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://0096d6fd049a0897.mokky.dev/cart', obj);
      setCartItems(prev => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    axios.delete(`https://0096d6fd049a0897.mokky.dev/cart/${id}`);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://0096d6fd049a0897.mokky.dev/favorites/${obj.id}`);
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));  опционально
      } else {
        const { data } = await axios.post('https://0096d6fd049a0897.mokky.dev/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route path="/" element={
          <Home items={items} searchValue={searchValue} setSearchValue={setSearchValue}
            onAddToFavorite={onAddToFavorite} onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart} cartItems={cartItems}
          />} />
        <Route path="/favorites" element={
          <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
        } />
        <Route path="/orders" />
      </Routes>

    </div>
  );
};

export default App;
