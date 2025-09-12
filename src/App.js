import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import { Route, Routes } from 'react-router-dom';
import AppContext from './context'



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
  async function fetchData() {
    try {
      const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
        axios.get('https://0096d6fd049a0897.mokky.dev/cart'),
        axios.get('https://0096d6fd049a0897.mokky.dev/favorites'),
        axios.get('https://0096d6fd049a0897.mokky.dev/items'),
      ]);
      const itemsWithId = itemsResponse.data.map((item, index) => ({
        ...item,
        id: item.id || `item-${index}-${Date.now()}`
      }));

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsWithId);
    } catch (error) {
      alert('Ошибка при запросе данных ;(');
      console.error(error);
    }
  }

  fetchData();
}, []);

  const onAddToCart = async (obj) => {
  try {
    if (isItemAdded(obj.id)) {
      const findItem = cartItems.find((item) => item.parentId === obj.id);
      setCartItems((prev) => prev.filter((item) => item.id !== findItem.id));
      await axios.delete(`https://0096d6fd049a0897.mokky.dev/cart/${findItem.id}`);
    } else {
      const { data } = await axios.post('https://0096d6fd049a0897.mokky.dev/cart', {
        ...obj,
        parentId: obj.id
      });
      setCartItems((prev) => [...prev, data]);
    }
  } catch (error) {
    alert('Ошибка при добавлении в корзину');
    console.error(error);
  }
};

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://0096d6fd049a0897.mokky.dev/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
  try {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === obj.id || fav.parentId === obj.id);
    
    if (isAlreadyFavorite) {
      const findFavorite = favorites.find((fav) => fav.id === obj.id || fav.parentId === obj.id);
      await axios.delete(`https://0096d6fd049a0897.mokky.dev/favorites/${findFavorite.id}`);
      setFavorites((prev) => prev.filter((item) => item.id !== findFavorite.id));
    } else {
      const { data } = await axios.post('https://0096d6fd049a0897.mokky.dev/favorites', {
        ...obj,
        parentId: obj.id
      });
      setFavorites((prev) => [...prev, data]);
    }
  } catch (error) {
    alert('Не удалось добавить в фавориты');
    console.error(error);
  }
};

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
  return cartItems.some((item) => item.parentId === id);
};

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded, // эта функция должна быть здесь
        isLoading,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />}

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />} />
          <Route path="/favorites" element={
            <Favorites />
          } />
          <Route path="/orders" element={
            <Orders />} />
        </Routes>

      </div>
    </AppContext.Provider>
  );
};

export default App;
