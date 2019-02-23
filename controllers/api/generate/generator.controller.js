const fs = require("fs");

// Load Customer model
const Customer = require("../../../models/Customer");
const Order = require("../../../models/Order");
const User = require("../../../models/User");
const Product = require("../../../models/Product");
const StoreItem = require("../../../models/StoreItem");
const Task = require("../../../models/Task");

const customers_set = require("../../../datasets/customers");
const users_set = require("../../../datasets/users");

module.exports = {
  seedCustomers: seedCustomers,
  seedOrders: seedOrders,
  seedUsers: seedUsers,
  seedProducts: seedProducts,
  seedStore: seedStore,
  seedTasks: seedTasks
};

/**
 * Seed the database
 */

// seed customers
function seedCustomers(req, res) {
  Customer.deleteMany({}, () => {
    for (customer of customers_set) {
      let newCustomer = new Customer(customer);
      newCustomer.save();
    }
  });

  // seeded!
  res.send("Customers seeded!");
}

// seed customers
function seedUsers(req, res) {
  User.deleteMany({}, () => {
    for (user of users_set) {
      let newUser = new User(user);
      newUser.save();
    }
  });

  // seeded!
  res.send("Users seeded!");
}

// seed orders
function seedOrders(req, res) {
  let ordrs;
  fs.readFile("datasets/orders_dataset.json", "utf8", function(err, data) {
    if (err) throw err;
    ordrs = JSON.parse(data);

    Order.deleteMany({}, () => {
      for (order of ordrs) {
        let newOrder = new Order(order);
        newOrder.save();
      }
    });
  });

  // seeded!
  res.send("Orders seeded!");
}

// seed products
function seedProducts(req, res) {
  let products = JSON.parse(fs.readFileSync("datasets/products.json", "utf8"));
  let textures = JSON.parse(fs.readFileSync("datasets/textures.json", "utf8"));
  let tn = JSON.parse(fs.readFileSync("datasets/texture_names.json", "utf8"));
  let pg = JSON.parse(fs.readFileSync("datasets/product_groups.json", "utf8"));

  let texture_names = {};
  for (t of tn) {
    texture_names[t.cNumb] = t.cName;
  }

  let groups = {};
  for (g of pg) {
    groups[g.mUnic] = g._name;
  }

  Product.deleteMany({}, () => {
    for (pr of products) {
      // измерение продукта
      let mesur;
      if (pr.aTypM === 1 || pr.aTypM === 3) {
        mesur = "molding";
      } else if (pr.aTypM === 2 || pr.aTypM === 4) {
        mesur = "piece";
      } else if (pr.aTypM === 5) {
        mesur = "quadrature";
      }

      // текстуры
      let texs = textures.filter(item => item.aNumb === pr.aNumb);

      let texture_array = [];
      for (tex of texs) {
        if (texture_names[tex.clNum] !== undefined) {
          texture_array.push(texture_names[tex.clNum]);
        }
      }

      let product = {
        _id: pr._id,
        vendor_code: pr.aNumb,
        name: pr.aName,
        group: groups[pr.mUnic],
        mesure: mesur,
        textures: texture_array,
        see_for_store: true,
        see_for_picker: true,
        is_active: true,
        about:
          "Amet voluptate dolore tempor occaecat aliqua laborum ex ad nostrud commodo. Ipsum sit consectetur ad duis ipsum. Laborum in cillum ullamco sunt consectetur ex dolor et. Veniam incididunt aute consequat excepteur cillum aliqua tempor labore eu sint ea duis eiusmod voluptate."
      };

      let newProduct = new Product(product);
      newProduct.save();
    }
  });

  // seeded!
  res.send("Produts seeded!");
}

// seed store
function seedStore(req, res) {
  let store_set = JSON.parse(fs.readFileSync("datasets/store.json", "utf8"));
  let tn = JSON.parse(fs.readFileSync("datasets/texture_names.json", "utf8"));
  let pg = JSON.parse(fs.readFileSync("datasets/product_groups.json", "utf8"));

  let texture_names = {};
  for (t of tn) {
    texture_names[t.cNumb] = t.cName;
  }

  let groups = {};
  for (g of pg) {
    groups[g.mUnic] = g._name;
  }

  StoreItem.deleteMany({}, () => {
    for (pr of store_set) {
      // измерение продукта
      let mesur;
      if (pr.aTypM === 1 || pr.aTypM === 3) {
        mesur = "molding";
      } else if (pr.aTypM === 2 || pr.aTypM === 4) {
        mesur = "piece";
      } else if (pr.aTypM === 5) {
        mesur = "quadrature";
      }

      let storeitem = {
        _id: pr._id,
        vendor_code: pr.aNumb,
        name: pr.aName,
        group: groups[pr.mUnic],
        mesure: mesur,
        texture: texture_names[pr.clNum],
        quantity: pr.aQtyR,
        price: pr.aPrc1,
        loss: pr._loss,
        minlim: pr._minlim,
        is_active: true,
        about:
          "Amet voluptate dolore tempor occaecat aliqua laborum ex ad nostrud commodo. Ipsum sit consectetur ad duis ipsum. Laborum in cillum ullamco sunt consectetur ex dolor et. Veniam incididunt aute consequat excepteur cillum aliqua tempor labore eu sint ea duis eiusmod voluptate."
      };

      let newStoreItem = new StoreItem(storeitem);
      newStoreItem.save();
    }
  });

  res.send("Store seeded!");
}

// seed tasks
function seedTasks(req, res) {
  let tasks;
  fs.readFile("datasets/tasks.json", "utf8", function(err, data) {
    if (err) throw err;
    tasks = JSON.parse(data);

    Task.deleteMany({}, () => {
      for (task of tasks) {
        let newTask = new Task(task);
        newTask.save();
      }
    });
  });

  // seeded!
  res.send("Tasks seeded!");
}
