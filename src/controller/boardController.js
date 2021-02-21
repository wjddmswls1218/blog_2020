import Post from "../models/Post";
import PostType from "../models/PostType";
import { globalController } from "./globalController";
import mongoose from "mongoose";
import middlewares from "../common/middlewares";

const detailController = async (req, res) => {
  try {
    const postData = await Post.findOne({ _id: req.params.id });

    const devMode = middlewares.checkDevMode();

    res.render("screens/boardDetail", { postData, devMode });
  } catch (e) {
    console.log(e);
    res.render("screens/home");
  }
};

const boardWriteController = (req, res) => {
  const type = req.params.type;

  res.render("screens/boardWrite", { type });
};

const boardWriteDbController = async (req, res) => {
  console.log(req.body.title);
  console.log(req.body.desc);
  console.log(req.body.type);

  let searchType = "";

  if (req.body.type === "javascript") {
    searchType = "JS";
  }
  try {
    const type = await PostType.findOne({ typeName: searchType });

    const currentTime = new Date().toString();
    const allPost = await Post.find();
    const postNo = allPost.length + 1;

    const newPostTypeId = mongoose.Types.ObjectId(type._id);

    const result = await Post.create({
      title: req.body.title,
      description: req.body.desc,
      author: `관리자`,
      hit: 0,
      postType: newPostTypeId,
      createdAt: currentTime,
      lastUpdatedAt: currentTime,
      isDelete: false,
      no: postNo,
    });

    console.log("✅");
    console.log(result);
    console.log("✅");
  } catch (e) {
    console.log(e);
  }

  globalController.javascriptController(req, res);
};

const deleteBoardController = async (req, res) => {
  try {
    const result = await Post.updateOne(
      { _id: req.body.id },
      {
        $set: {
          isDelete: true,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }

  globalController.javascriptController(req, res);
};

export const boardController = {
  detailController,
  boardWriteController,
  boardWriteDbController,
  deleteBoardController,
};
