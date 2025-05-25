import ContentLoader from 'react-content-loader'
import { useState } from 'react'
import { useContext } from 'react'
import AppContext from '../../context'
import styles from './Card.module.scss'

const CardItem = ({
  id,
  title,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
  added = false,
}) => {
  const { isItemAdded } = useContext(AppContext)

  /* состояние для изменения картинки */
  const [isFavorite, setIsFavorite] = useState(favorited)

  const onClickPlus = () => {
    /* вызвается метод, который в пропсах */
    onPlus()
  }

  const onClickFavorite = () => {
    /* вызвается метод, который в пропсах */
    onFavorite()
    setIsFavorite(!isFavorite)
  }

  return (
    <div>
      <div className={styles.grid__item}>
        {loading ? (
          <ContentLoader
            speed={2}
            width={160}
            height={265}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
            <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            {onFavorite && (
              <div className={styles.grid__favorite}>
                <img
                  onClick={onClickFavorite}
                  src={
                    isFavorite
                      ? '/img/heart-liked.svg'
                      : '/img/heart-unliked.svg'
                  }
                  alt="Unliked"
                />
              </div>
            )}
            <img width={158} height={135} src={imageUrl} alt="sneaker" />
            <p className={styles.grid__text}>{title}</p>
            <div className={styles.grid__bottom}>
              <div className={styles.grid__price}>
                <span className={styles.grid__span}>Цена:</span>
                <b className={styles.grid__b}>{price} тг.</b>
              </div>
              {onPlus && (
                <img
                  className={styles.grid__plusBtn}
                  width={40}
                  height={40}
                  onClick={onClickPlus}
                  src={
                    isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'
                  }
                  alt="plus"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CardItem
