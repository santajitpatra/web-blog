const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    body: {
      type: "string",
      required: true,
    },
    coverImageURL: {
      type: "string",
        required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);


const Blog = model("blog", blogSchema);

module.exports = Blog;
