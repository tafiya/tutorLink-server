import Blog from "./blog.model";

// get all Subjects data
const getALLBlogsFromDB = async () => {
      const result  = Blog.find()
      return result;
};
export const blogServices={

    getALLBlogsFromDB,

}