import createError from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
  // 3araft userId l kol video w 5aleto req.user.id ele hwa id el account ele logged in ele gai mel jwt req.user (verifyToken.js) 3ashan h7tago b3d keda fel update eni at2kd en el id ele logged in hwa hwa el id ele 3amel create lel video dah fa keda a2dr a-update feh.
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    // Kan fe error hena Cannot set headers after they are sent to the client
    // 7alo eny kont katb res.send(200) el sa7 res.status(200)
    // El error means that you're already in the Body or Finished state, but some function tried to set a header or statusCode.
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video is not found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateVideo);
    } else {
      return next(createError(403, "You can only update your own videos!"));
    }
  } catch (err) {
    next(err);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    if (req.user.id === video.userId) {
      const video = await Video.findByIdAndDelete(req.params.id);
      if (!video) return next(createError(404, "Video is not found!"));
      res.status(200).json("Video has been deleted successfully!");
    } else {
      return next(createError(403, "You can only delete your own videos!"));
    }
  } catch (err) {
    next(err);
  }
};
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video is not found!"));
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const randomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const trendVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    if (!videos) return next(createError(404, "Video is not found!"));
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    if (!video) return next(createError(404, "Video is not found!"));

    res.status(200).json("Views have increased!");
  } catch (err) {
    next(err);
  }
};

// EL route da k2nk btshof el subscribed channels bt3t el account bta3k
// for me msln: FreeCodeCamp, littleMix ..etc
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers; // Ele ana 3amlehom subscribe

    const list = await Promise.all(
        subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId }); 
        /*
        "subscribedUsers": [
        "638f28b440f0b09b65003664",
        "638f500b58a04c6ad033bdbc"
        ]
        Ben-loop fel array b map() w lma bala2y ID menhom == ID bta3 video b-return el video da
        */ 
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  try {
    const tags = req.query.tags.split(",")
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    if (!videos) return next(createError(404, "Video is not found!"));
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(20)
    if (!videos) return next(createError(404, "Video is not found!"));
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};