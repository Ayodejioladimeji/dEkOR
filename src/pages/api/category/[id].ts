import connectDB from "../utils/connectDB";
import Category from "../models/categoryModel";
import auth from "../middleware/auth";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      await updateCategory(req, res);
      break;
    case "DELETE":
      await deleteCategory(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const updateCategory = async (req, res) => {
  try {
     // check if its the admin that is creating the category
    const check = await auth(req, res);
    if (check?.role === "user")
      return res.status(401).json({ message: "Authentication is not valid" });

    const { name, image } = req.body;
    const {id} = req.query

    await Category.findOneAndUpdate({_id: id}, {
        name,
        image
    })
   
    res.json({ message: "Category updated successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
        // check if its the admin that is creating the category
    const check = await auth(req, res);
    if (check?.role === "user")
      return res.status(401).json({ message: "Authentication is not valid" });

      const {id} = req.query

    await Category.findByIdAndDelete(id)
    res.json({ message: "Category deleted successfully!" });
  } catch (error) {
    return res?.status(500).json({ message: error.message });
  }
};
