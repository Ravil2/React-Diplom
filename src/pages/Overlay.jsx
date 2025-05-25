import axios from 'axios'
import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import Info from '../components/Info'
import { urls } from '../utils/urls'

const Overlay = ({ onClickCart, deleteFromCart }) => {
  /* кастомный хук */
  const { cartItems, setCartItems, totalPrice } = useCart()
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      // загружаем на сервер товары из корзины
      const { data } = await axios.post(urls.ORDERS, {
        items: cartItems,
      })
      setOrderId(data.id)
      setIsOrderComplete(true)
      // удаляем все элементы, которые есть в корзине c сервера
      cartItems.map((obj) => axios.delete(`${urls.CART}/${obj.id}`))
      // отчищаем локально
      setCartItems([])
    } catch (error) {
      alert('Ошибка при создании заказа :(')
    }
    setIsLoading(false)
  }
  return (
    <>
      {cartItems.length > 0 ? (
        <div className="overlay">
          <div className="overlay__right-side">
            <h2 className="overlay__title">
              Корзина
              <img
                onClick={onClickCart}
                className="overlay__btn-remove removeBtn"
                src="img/btn-remove.svg"
                alt="Btn-remove"
              />
            </h2>
            <div className="overlay__cart-Items">
              {cartItems.map((item) => (
                <div className="overlay__cart-Item" key={item.id}>
                  <img
                    width={70}
                    height={70}
                    src={item.imageUrl}
                    alt="overlayimg"
                    className="overlay__img"
                  />
                  <div className="overlay__desc">
                    <p className="overlay__text">{item.title}</p>
                    <b className="overlay__b">{item.price} тг.</b>
                  </div>
                  <img
                    onClick={() => deleteFromCart(item.id)}
                    className="overlay__btn-remove removeBtn"
                    src="img/btn-remove.svg"
                    alt="Btn-remove"
                  />
                </div>
              ))}
            </div>

            <ul className="overlay__list">
              <li className="overlay__item">
                <span className="overlay__list-text">Итого:</span>
                <div></div>
                <b className="overlay__b">{totalPrice} тг.</b>
              </li>
              <li className="overlay__item">
                <span className="overlay__list-text">Налог 5%:</span>
                <div></div>
                <b className="overlay__b">
                  {Math.ceil(totalPrice * 0.05)} тг.
                </b>
              </li>
            </ul>
            <button
              disabled={isLoading}
              onClick={onClickOrder}
              className="overlay__btn greenBtn"
            >
              Оформить заказ
              <img src="img/arrow.svg" alt="Arrow" />
            </button>
          </div>
        </div>
      ) : (
        <Info
          title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
          description={
            isOrderComplete
              ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке`
              : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
          }
          image={
            isOrderComplete ? 'img/complete-order.png' : 'img/empty-cart.jpg'
          }
        />
      )}
    </>
  )
}

export default Overlay
