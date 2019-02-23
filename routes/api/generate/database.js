const express = require("express"),
  router = express.Router(),
  generatorController = require("../../../controllers/api/generate/generator.controller");

const {
  seedCustomers,
  seedOrders,
  seedUsers,
  seedProducts
} = generatorController;

router.post("/seed_users", seedUsers);
router.post("/seed_customers", seedCustomers);
router.post("/seed_orders", seedOrders);
router.post("/seed_products", seedProducts);
module.exports = router;
