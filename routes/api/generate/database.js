const express = require("express"),
  router = express.Router(),
  generatorController = require("../../../controllers/api/generate/generator.controller");

const {
  seedCustomers,
  seedOrders,
  seedUsers,
  seedProducts,
  seedStore,
  seedTasks
} = generatorController;

router.post("/seed_users", seedUsers);
router.post("/seed_customers", seedCustomers);
router.post("/seed_orders", seedOrders);
router.post("/seed_products", seedProducts);
router.post("/seed_store", seedStore);
router.post("/seed_tasks", seedTasks);

module.exports = router;
