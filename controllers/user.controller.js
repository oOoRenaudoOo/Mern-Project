const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

// tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

// infos utilisateur (Id dans l'url)
module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Id unknnow" + err);
  }).select("-password");
};

// mis a jour bio utilisateur
module.exports.userUpdate = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown " + req.params.id);
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.userDelete = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown " + req.params.id);
  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown " + req.params.id);
  if (!ObjectId.isValid(req.body.idToFollow))
    return res.status(400).send("Id unknown " + req.body.idToFollow);

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).send(docs))
      .catch((err) => res.status(400).json(err));

    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).send(docs))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown " + req.params.id);
  if (!ObjectId.isValid(req.body.idToUnfollow))
    return res.status(400).send("Id unknown " + req.body.idToUnfollow);

  try {
    // del to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).send(docs))
      .catch((err) => res.status(400).json(err));

    // del to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).send(docs))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
