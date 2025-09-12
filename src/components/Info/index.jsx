import React from 'react';
import AppContext from '../../context';
import styles from './Info.module.scss';

const Info = ({ image, title, description }) => {
    const { setCartOpened} = React.useContext(AppContext);

    return (
        <div className={styles.cartEmpty}>
            <img className={styles.cartEmptyImage} width="120px" height="120px" src={image} alt="Empty cart img" />
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>
    )
}

export default Info;
