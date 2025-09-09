import { Link } from 'react-router-dom'

function Header(props) {
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
                    <img src="/img/cart.svg" alt="Корзина"></img>
                </li>
                <span>1205 руб.</span>
                <li>
                    <Link to="favorites"><img src="/img/heart.svg" alt="Избранное"></img></Link>
                </li>
                <li>
                    <img src="/img/user.svg" alt="Личный кабинет"></img>
                </li>
            </ul>
        </header>
    );
}



export default Header;