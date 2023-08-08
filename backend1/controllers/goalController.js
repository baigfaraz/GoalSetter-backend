const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const admin = require("../config/firebase-config");

// @desc get goals
// @routes GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = await admin.auth().verifyIdToken(token);

  const goals = await Goal.find({ userId: decoded.uid });
  // const goals = 'Todos'
  res.status(200).json(goals);
});

// @desc set goals
// @routes POST /api/goals
//@access private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add some text. Thankyou!");
  }

  const token = req.headers.authorization.split(" ")[1];
  const decoded = await admin.auth().verifyIdToken(token);

  const goal = await Goal.create({
    text: req.body.text,
    userId: decoded.uid,
    createdAt: new Date(),
  });
  res.status(201).json(goal);
});

// @desc delete goals
// @routes Delete /api/goals
//@access private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  await Goal.deleteOne({ _id: goal._id });
  res
    .status(200)
    .json({ msg: `Successfully deleted goal with id ${req.params.id}` });
});


// @desc UPDATE goals
// @routes PUT /api/goals
//@access private
const updateGoals = asyncHandler(async (req, res) => {
  // const goal = await Goal.findById(req.params.id);
  // if (!goal) {
  //   res.status(400);
  //   throw new Error("Goal not Found!");
  // }

  // const user = await User.findById(req.user.id);

  // // check for user
  // if (!user) {
  //   res.status(401);
  //   throw new Error("User not found!");
  // }

  // //Make sure the logged user  matches the goal user
  // if (goal.user.toString() !== user.id) {
  //   res.status(401);
  //   throw new Error("UnAuthorized user!");
  // }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

module.exports = { getGoals, setGoals, deleteGoals  , updateGoals};
