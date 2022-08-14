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
