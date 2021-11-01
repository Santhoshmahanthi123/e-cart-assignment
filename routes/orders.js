const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");
router.post("/orders/create", ordersController.createOrder);
router.get("/orders/list", ordersController.getOrders);
router.get("/orders/search", ordersController.getSpecificOrder);
router.put("/orders/update", ordersController.updateOrder);
router.delete("/orders/delete", ordersController.removeSpecificOrder);
module.exports = router;