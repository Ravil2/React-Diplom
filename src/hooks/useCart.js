/* это Кастомный хук */
import { useContext } from 'react'
import AppContext from '../context'

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext)
  const totalPrice = cartItems.reduce((acc, el) => (acc = acc + el.price), 0)

  /* массив лучше тем, что можно задавать любые имена при деструктуризации */
  return { cartItems, setCartItems, totalPrice }
}
