import Category from "../models/Category.js";

// ADD CATEGORY
export const addCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Name and type are required" });
    }

    const category = await Category.create({
      user: req.user._id,
      name,
      type,
    });

    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Category already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// GET CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      user: req.user._id,
    }).sort({ name: 1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await category.deleteOne();
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
