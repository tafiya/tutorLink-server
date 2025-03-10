import { model, Schema } from "mongoose";

const BlogSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true },
        date: { type: String, required: true },
        title: { type: String, required: true },
        detail: { type: String, required: true },
        image: { type: String, required: true },
        about: { type: String, required: true },
      },
    {
      timestamps: true,
    }
  );
  
  const Blog = model('blogs', BlogSchema);
  export default Blog;