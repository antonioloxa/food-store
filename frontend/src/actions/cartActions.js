import Axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants'

const addToCart = (id, qty) => async (dispatch, getState) => {
	try {
		const product = (await Axios.get(`/api/products/${id}`)).data
		const item = {
			name: product.name,
			qty: qty,
			image: product.image,
			price: product.price,
			countInStock: product.countInStock,
			product: product._id,
		}
		// DISPATCH AND SAVE TO LOCAL STORAGE
		dispatch({ type: CART_ADD_ITEM, payload: item })
		localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
	} catch (error) {
		console.log(error)
	}
}

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id
	})
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	})
	localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	})
	localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export default addToCart
