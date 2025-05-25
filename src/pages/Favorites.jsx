import { useContext } from 'react'
import AppContext from '../context'
import CardItem from '../components/card/CardItem'
import Empty from '../components/Empty'
import { Link } from 'react-router-dom'

/* этот компонент будет делать ререндеринг, каждый раз когда будут изменяться состояния, которые мы вытащили из контекста */

const Favorites = () => {
  const { favorites, onAddtoFavoriteHandler } = useContext(AppContext)

  return (
    <>
      {favorites.length > 0 ? (
        <footer className="footer">
          <div className="footer__search-block orders__container">
            <Link to="/">
              <img className="exitBtn" src="img/exit.png" alt="exitBtn" />
            </Link>

            <h1 className="footer__title orders__heading">Мои закладки</h1>
          </div>
          <div className="grid">
            {favorites.map((item) => (
              <CardItem
                key={item.id}
                onFavorite={() => onAddtoFavoriteHandler(item)}
                favorited={true}
                {...item}
              />
            ))}
          </div>
        </footer>
      ) : (
        <Empty
          title="Закладок нет :("
          text="Вы ничего не добавляли в закладки"
          img={'img/nofav.png'}
        />
      )}
    </>
  )
}

export default Favorites
