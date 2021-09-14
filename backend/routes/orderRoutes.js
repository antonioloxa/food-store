import express from 'express'
const router = express.Router()
import { addOrderItems, 
        getMyOrders, 
        getOrderById, 
        updateOrderToPaid,
        updateOrderToDelivered,
        getOrders,
    } from '../controllers/orderController.js'
import { protect, admin } from '../middleWare/authMiddleware.js'

router.route('/myorders').get(protect, getMyOrders)
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)



export default router 

