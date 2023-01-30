import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createError from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    // Hena ana b-hash el password b3d keda b-create el User b3d keda b3mlo query save() bas keda da el registeration endpoint

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();

    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    // Da el login endpoint implementation
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError("404", "User not found!"));
    // req.body.password hwa el pw ele ana md5lo fel input text
    // 2ama el user.password hwa el pw el fe3ly lel account ele b7awl a-log into fa bakarn el etnen bb3d
    const passwordIsCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsCorrect)
      return next(createError("403", "Wrong Credentials!"));

    // JSONWEBTOKEN 3ashan bas a7fz el session w at7km fel authorization
    const token = jwt.sign(
      { id: user._id, exp: Math.floor(Date.now() / 1000) + 50 * 60 },
      process.env.SECRET_KEY
    );
    // Hena 3mlt destruction lel user 3ashan 2ma a-return el user y-return men gher el PW for sake of security y3ny
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, exp: Math.floor(Date.now() / 1000) + 5 * 60 },
        process.env.SECRET_KEY
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
        const newUser = new User({
            ...req.body,
            fromGoogle: true
        })
        const savedUser = await newUser.save()
        const token = jwt.sign(
            { id: savedUser._id, exp: Math.floor(Date.now() / 1000) + 5 * 60 },
            process.env.SECRET_KEY
          );
          res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json(savedUser._doc);
    }
  } catch (error) {
      next(error)
  }
};
