import { Schema, model, models } from "mongoose";

// Create Schema for Articles
const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9-]+$/.test(v);
        },
        message: (props) => `${props.value} contains invalid characters!`,
      },
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 40,
    },

    author: {
      type: String,
      default: "Anonymous",
    },

    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically lowercase slug before saving
articleSchema.pre("save", function (next) {
  this.slug = this.slug.toLowerCase();
  next();
});

// create model
const ArticleModel = models.Article || model("Article", articleSchema);
export default ArticleModel;
