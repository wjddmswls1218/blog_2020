import Post from "../models/Post";
import PostType from "../models/PostType";
import { globalController } from "../controller/globalController";
import mongoose from "mongoose";

const mongodbWriteController = (req, res) => {
  const type = req.params.type;

  res.render("screens/mongodbWrite", { type });
};

export const mongodbController = {
  mongodbWriteController,
};
