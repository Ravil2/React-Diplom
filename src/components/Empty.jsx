import React from 'react'
import { Link } from 'react-router-dom'

const Empty = ({ title, text, img }) => {
  return (
    <div className="empty">
      <img className="empty__img" src={img} alt="" />
      <h1 className="empty__heading">{title}</h1>
      <p className="empty__text">{text}</p>

      <Link to="/">
        <button className="empty__button overlay__emptyBtn greenBtn">
          <img src="img/back-arrow.svg" alt="backArrow" />
          Вернуться назад
        </button>
      </Link>
    </div>
  )
}

export default Empty
