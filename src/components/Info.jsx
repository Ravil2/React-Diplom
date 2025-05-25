/* reusable component */

import React, { useContext } from 'react'
import AppContext from '../context'

const Info = ({ title, description, image }) => {
  const { setCartOpened } = useContext(AppContext)

  return (
    <div className="overlay">
      <div className="overlay__right-side">
        <h2 className="overlay__title">
          Корзина
          <img
            // onClick={onClickCart}
            onClick={() => setCartOpened(false)}
            className="overlay__btn-remove removeBtn"
            src="img/btn-remove.svg"
            alt="Btn-remove"
          />
        </h2>

        <div className="overlay__emptyCartImg">
          <img width={120} height={120} src={image} alt="emptyCart" />
        </div>
        <h3 className="overlay__emptyTitle">{title}</h3>
        <p className="overlay__emptyText">{description}</p>
        <button
          onClick={() => setCartOpened(false)}
          className="overlay__emptyBtn greenBtn"
        >
          <img src="img/back-arrow.svg" alt="backArrow" />
          Вернутья назад
        </button>
      </div>
    </div>
  )
}

export default Info
