const router = require("express").Router();
const Product = require("../Models/Product.js");

// Get All Product
router.get("/", async (req, res) => {
  const searchTerm = req.query.search;
  try {
    let products;
    if (searchTerm) {
      const all = await Product.find();
      products = all.filter((product) =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create Product
router.post("/", async (req, res) => {
  const newProduct = new Product({
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
  });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
