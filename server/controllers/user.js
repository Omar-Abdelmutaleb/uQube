import createError from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
  // Bkarn el id ele fel URL parameters bel id ele gai mel verifyToken req.user; jwt user id
  if (req.params.id === req.user.id) {
    try {
      // Mst5dm el query findByIdandUpdate w bt5od el parameter id w b3d keda bst5dm $set de query fe mongodb bt-replace ele fel req.body b nazeero fel model y3ny ana kateb name w email msln bas htro7 $set t-update el etnen dol bs!
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          // Kan fe 8alta hena kont m5leha $set: res.body lazem tb2a req.body
          $set: req.body,
        },
        { new: true }
      ); // new: true de ht5lee el res yrg3 el updated user men gherha msh hyrg3 fel request laken hy-get updated fel database
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your own account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted!");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only delete your own account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    next(createError(404, "User not found!"));
  }
};
export const subscribe = async (req, res, next) => {
  try {
    // Ana hena 3mlt findById lel id bta3y el account ele logged in w 3mlt el $push method eni a-add el id bt3 el user ele 3mltlo subs, f5let el subscribedUsers 3ndi t-add req.params.id user, ele hwa el channel ele 3agbtni.
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription Successful");
  } catch (err) {
    next(createError(404, "User not found!"));
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscription Successful");
  } catch (err) {
    next(createError(404, "User not found!"));
  }
};
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      // lw est5dmt push keda kol ama ados like hy-duplicate el id laken addToSet de btt2kd el awl el id da mwgod wala la2 w lw mwgod msh bt-duplicate
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("Video has been liked!");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("Video has been disliked!");
  } catch (err) {
    next(err);
  }
};
