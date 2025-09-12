import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart';

function Header(props) {
    const { totalPrice } = useCart();

    return (
        <header className="header">
            <Link to="/">
                <div className="headerLeft">
                    <img width={40} height={40} src="/img/logo.png" alt="logo" />
                    <div className="headerInfo">
                        <h3>React Sneakers</h3>
                        <p>Магазин лучших кросовок</p>
                    </div>
                </div>
            </Link>
            <ul className="headerRight">
                <li onClick={props.onClickCart}>
                    <img width={18} height={18} src="/img/cart.svg" alt="Корзина"></img>
                </li>
                <span>{totalPrice} руб.</span>
                <li>
                    <Link to="favorites"><img src="/img/heart.svg" alt="Избранное"></img></Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="img/user.svg" alt="Пользователь" />
                    </Link>
                </li>
            </ul>
        </header>
    );
}



export default Header;