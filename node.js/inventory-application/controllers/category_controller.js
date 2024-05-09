const Article = require("../models/article");
const Category = require("../models/category");
const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.list = asyncHandler(async (req, res, next) => {
  const list = await Category.find()
    .sort({ name: 1 })
    .exec();
  res.render("category_list", {
    title: "Categories",
    category_list: list,
  });
});

exports.detail = asyncHandler(async (req, res, next) => {
  const [category, articles] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Article.find({ category: req.params.id }).exec(),
  ]);

  res.render("category_detail", {
    title: "Category",
    category: category,
    articles: articles,
  });
});

exports.create_get = (req, res, next) => {
  res.render("category_form", { title: "Create new category" });
};

exports.create_post = [
  // Validate and sanitize the name field.
  body("name", "Name too short or too long")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("date", "Description too too long")
    .trim()  
    .isLength({ max:500})
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description, 
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save()
        res.redirect(category.url);
      }
    }
  }),
];

exports.delete_get = asyncHandler(async (req, res, next) => {
  const [category, allArticlesByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Article.find({ category: req.params.id }, "name description").exec(),
  ]);

  if (category === null) {
    // No results.
    res.redirect("/catalog/categories");
  } else {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      brand_articles: allArticlesByCategory,
    });
  }
});

exports.delete_post = asyncHandler(async (req, res, next) => {
  const [category, allArticlesByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Article.find({ category: req.params.id }, "name description").exec(),
  ]);

  if (allArticlesByCategory.length > 0) {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      category_articles: allArticlesByCategory,
    });
    return;
  } else {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/catalog/categories");
  }
});

exports.update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  if (category === null) {
    // No results.
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }
  res.render("category_form", {
    title: "Update Category",
    category: category,
  });
});

// Handle Author update on POST.
exports.update_post = [
  body("name", "Name too short or too long")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("description", "Description too short or too long")
    .trim()
    .isLength({ min: 3, max: 500 })
    .toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log("errors", errors);
    const category = new Category({
      name: req.body.name,
      description: req.body.description
    });

    if (!errors.isEmpty()) {
      console.log("an error");
      res.render("category_form", {
        title: "Update Category",
        category:category,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {}
      );
      res.redirect(updatedCategory.url);
    }
  }),
];
