import Post from "../models/Post";
import PostType from "../models/PostType";
import dotenv from "dotenv";
dotenv.config();
import middlewares from "../common/middlewares";

const homeController = (req, res) => {
  res.render("screens/home");
};

const contactController = (req, res) => {
  res.render("screens/contact");
};
const javascriptController = async (req, res) => {
  try {
    const dataResult = await Post.find({ isDelete: false }).populate({
      path: "PostType",
      model: PostType,
    });

    const devMode = middlewares.checkDevMode();

    res.render("screens/javascript", { dataResult, devMode });
  } catch (e) {
    console.log(e);
    res.render("screens/home");
  }
};

const boardwriteController = (req, res) => {
  res.render("screens/boardWrite");
};

const mongodbController = async (req, res) => {
  try {
    const dbDataResult = await Post.find({ isDelete: false }).populate({
      path: `Post`,
      model: PostType,
    });

    res.render("srceens/mongodb", { dbDataResult });
  } catch (e) {
    console.log(e);
    res.render("screens/hone");
  }
};

export const globalController = {
  homeController,
  contactController,
  javascriptController,
  boardwriteController,
  mongodbController,
};
