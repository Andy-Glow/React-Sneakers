import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('/cart/' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('Ошибка при создании заказа :(');
        }
        setIsLoading(false);
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className={styles.drawerHeader}>
                    Корзина<img onClick={onClose} className={styles.cartItemBtn} src="/img/btn-remove.svg" alt="Close" />
                </h2>

                {items.length > 0 ?
                    (<div className={styles.fullCart}>
                        <div className={styles.items}>
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem">
                                    <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                                    <div className="cartItemInfo">
                                        <p>{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className="cartItemBtn" src="/img/btn-remove.svg" alt="Remove" />
                                </div>
                            ))}
                        </div>
                        <div className={styles.cartTotalBlock}>
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div className={styles.dashedLine}></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div className={styles.dashedLine}></div>
                                    <b>{(totalPrice / 100) * 5} руб.</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
                                Оформить заказ
                                <img src="/img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </div>)
                    :
                    (<Info
                        title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
                        description={
                            isOrderComplete
                                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                        }
                        image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
                    />)
                }
            </div>
        </div>
    );
}

export default Drawer;

/* <div className="cartEmpty">
    <img className="cartEmptyImage" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Empty cart img" />
    <h2>Корзина пуста</h2>
    <p className="cartParag">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
    <button onClick={onClose} className="greenButton">
        <img src="/img/arrow.svg" alt="Arrow" />
        Вернуться назад
    </button>
</div> */