import React from "react";
import CardItem from "../components/card/CardItem";
import axios from "axios";
import Empty from "../components/Empty";
import { Link, useNavigate } from "react-router-dom";
import { fakeArray } from "../utils/fakeArray";
import { urls } from "../utils/urls";

const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(urls.ORDERS);
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.log(error);
      }
    })();
  }, []);

  const removeOrdersHandler = async () => {
    try {
      const { data } = await axios.get(urls.ORDERS);
      data.map((obj) => axios.delete(`${urls.ORDERS}/${obj.id}`));
      setOrders([]);
    } catch (error) {
      console.log(error);
    }
  };

  // Получаем имя пользователя из localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userName = currentUser?.username || "Гость";

  const logoutHandler = () => {
    localStorage.removeItem("currentUser");
    navigate("/"); // редирект на главную (AuthPage должен отработать)
    window.location.reload(); // перезагрузка, чтобы сбросить состояние
  };

  return (
    <>
      <div
        className="orders__header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          padding: 15,
          borderBottom: '1px solid #fff'
        }}
      >
        <h2>Здравствуйте, {userName}</h2>
        <button
          onClick={logoutHandler}
          style={{
            backgroundColor: "#ff4d4f",
            border: "none",
            color: "white",
            padding: "8px 16px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Выйти
        </button>
      </div>

      {orders.length ? (
        <footer className="footer">
          <div className="footer__search-block orders__container">
            <Link to="/">
              <img className="exitBtn" src="img/exit.png" alt="exitBtn" />
            </Link>
            <h1 className="footer__title orders__heading">
              Мои покупки
              <img
                onClick={removeOrdersHandler}
                className="orders__img overlay__btn-remove removeBtn"
                src="img/btn-remove.svg"
                alt="Btn-remove"
              />
            </h1>
          </div>
          <div className="grid">
            {(isLoading ? fakeArray : orders).map((item) => (
              <CardItem key={item.id} loading={isLoading} {...item} />
            ))}
          </div>
        </footer>
      ) : (
        <Empty
          img="/img/noorders.png"
          title={"У вас нет заказов"}
          text="Оформите хотя бы один заказ"
        />
      )}
    </>
  );
};

export default Orders;
