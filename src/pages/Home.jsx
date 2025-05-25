import CardItem from '../components/card/CardItem'
import { useContext } from 'react'
import AppContext from '../context'
import { fakeArray } from '../utils/fakeArray'

const Home = ({
  inputValue,
  setInputValue,
  searchItemsHandler,
  onAddtoFavoriteHandler,
  onAddtoCartHandler,
  itemsIsLoading,
}) => {
  const { isItemAdded } = useContext(AppContext)

  const renderItems = () => {
    return (itemsIsLoading ? fakeArray : searchItemsHandler).map(
      (item, index) => (
        <CardItem
          key={item.id}
          onFavorite={() => onAddtoFavoriteHandler(item)}
          onPlus={() => onAddtoCartHandler(item)}
          loading={itemsIsLoading}
          added={isItemAdded(item && item.id)}
          {...item}
        />
      )
    )
  }

  return (
    <footer className="footer">
      <div className="footer__search-block">
        <h1 className="footer__title">
          {inputValue ? `Поиск по запросу: ${inputValue}` : 'Все кроссовки'}
        </h1>
        <div className="form">
          <img className="form__img" src="/img/search.svg" alt="Search" />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="form__input"
            type="search"
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="grid">{renderItems()}</div>
    </footer>
  )
}

export default Home
