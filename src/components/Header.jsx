import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Header = ({ onClickCart }) => {
  const { totalPrice } = useCart();

  return (
    <header className="header">
      <div className="header__info">
        <Link to="/">
          <img
            className="header__logo"
            width={40}
            height={40}
            src="https://slimages.macysassets.com/is/image/MCY/products/3/optimized/28291803_fpx.tif?fmt=webp&qlt=55,0&resMode=sharp2&op_usm=1.75,0.3,2,0&wid=1000"
            alt="sneaker logo"
          />
        </Link>
        <div className="header__description">
          <h3 className="header__title">React Shop</h3>
          <p className="header__text">Лучшие кроссовки в городе</p>
        </div>
      </div>

      <nav className="header__nav">
        <ul className="header__list">
          <li onClick={onClickCart} className="header__item">
            <img width={18} height={18} src="img/cart.svg" alt="Корзина" />
            <span className="header__span">{totalPrice} тг.</span>
          </li>
          <li className="header__item">
            <Link to="favorites">
              <img src="img/heart-logo.svg" alt="Закладки" />
            </Link>
          </li>
          <li className="header__item">
            <Link to="orders">
              <img src="img/user.svg" alt="Пользователь" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
