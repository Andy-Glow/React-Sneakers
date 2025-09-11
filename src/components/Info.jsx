import React from 'react';
import AppContext from '../context';

const Info = ({ image, title, description }) => {
    const { setCartOpened} = React.useContext(AppContext);

    return (
        <div className="cartEmpty">
            <img className="cartEmptyImage" width="120px" height="120px" src={image} alt="Empty cart img" />
            <h2>{title}</h2>
            <p className="cartParag">{description}</p>
            <button onClick={() => setCartOpened(false)} className="greenButton">
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>
    )
}

export default Info;
