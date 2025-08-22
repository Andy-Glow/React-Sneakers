

function Header() {
    return (
        <header className="header">
            <div className="headerLeft">
                <img width={40} height={40} src="/img/logo.png" alt="logo" />
                <div className="headerInfo">
                    <h3>React Sneakers</h3>
                    <p>Магазин лучших кросовок</p>
                </div>
            </div>
            <ul className="headerRight">
                <li>
                    <img src="/img/cart.svg" alt="cart icon"></img>
                </li>
                <span>1205 руб.</span>
                <li>
                    <img src="/img/user.svg" alt="user icon"></img>
                </li>
            </ul>
        </header>
    );
}



export default Header;