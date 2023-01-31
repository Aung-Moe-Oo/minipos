const router = require("express").Router();

// Login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.status(200).json("Success");
  } else {
    res.status(400).json("Wrong Credential");
  }
});

module.exports = router;
