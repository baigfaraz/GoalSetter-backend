const express = require("express");
const router = express.Router();
const { getGoals, setGoals , deleteGoals , updateGoals} = require("../controllers/goalController");

// Get request
router.get("/", getGoals);

// post request
router.post("/", setGoals);

// Put request
router.put('/:id', updateGoals)

// Delete goals
router.delete("/:id", deleteGoals);

module.exports = router;
