const Article = require("../models/article");
const Category = require("../models/category");
const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const [numArticles, numBrands, numCategories] = await Promise.all([
    Article.countDocuments().exec(),
    Brand.countDocuments().exec(),
    Category.countDocuments().exec(),
  ]);
  res.render("index", {
    title: "Inventory from Store",
    numArticles: numArticles,
    numBrands: numBrands,
    numCategories: numCategories,
  });
});

exports.list = asyncHandler(async (req, res, next) => {
  const list = await Article.find({}, "name ").sort({ name: 1 }).exec();
  res.render("article_list", {
    title: "Articles",
    article_list: list,
  });
});

exports.detail = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id)
    .populate("brand")
    .populate("category")
    .exec();
  console.log(article);

  res.render("article_detail", {
    title: "Article",
    article: article,
  });
});

exports.create_get = asyncHandler(async (req, res, next) => {
  const [allBrands, allCategories] = await Promise.all([
    Brand.find().sort({ name: 1 }).exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);
  res.render("article_form", {
    title: "Create new article",
    brands: allBrands,
    categories: allCategories,
  });
});

exports.create_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },
  // Validate and sanitize the name field.
  body("name", "Name too short or too long")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("description", "Description too short or too long")
    .trim()
    .optional({ values: "falsy" })
    .isLength({ min: 3, max: 500 })
    .isAlpha(),
  body("price")
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage("Number is too long")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("description", "Description too short or too long")
    .trim()
    .optional({ values: "falsy" })
    .isLength({ min: 3, max: 500 })
    .isAlpha(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const article = new Article({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      _id: req.params.id,
    });
    console.log(article);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      const [allBrands, allCategories] = await Promise.all([
        Brand.find().sort({ name: 1 }).exec(),
        Category.find().sort({ name: 1 }).exec(),
      ]);
      res.render("article_form", {
        title: "Create new article",
        brands: allBrands,
        categories: allCategories,
        article: article,
        errors: errors.array(req),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if article with same name already exists.
      const articleExists = await Article.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (articleExists) {
        // article exists, redirect to its detail page.
        res.redirect(articleExists.url);
      } else {
        await article.save();
        // New article saved. Redirect to article detail page.
        res.redirect(article.url);
      }
    }
  }),
];

exports.delete_get = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id).exec();

  if (article === null) {
    // No results.
    res.redirect("/catalog/articles");
  } else {
    res.render("article_delete", {
      title: "Delete Article",
      article: article,
    });
  }
});

exports.delete_post = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id).exec();

  if (article !== null) {
    await Article.findByIdAndDelete(req.body.articleid);
  }
  res.redirect("/catalog/articles");
});

exports.update_get = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id).exec();
  if (article === null) {
    // No results.
    const err = new Error("article not found");
    err.status = 404;
    return next(err);
  }
  const [allBrands, allCategories] = await Promise.all([
    Brand.find().sort({ name: 1 }).exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);
  res.render("article_form", {
    title: "Update Article",
    article: article,
    brands: allBrands,
    categories: allCategories,
  });
});

// Handle Author update on POST.
exports.update_post = [
  body("name", "Name too short or too long")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("brand", "Must be alphanumeric")
    .optional({ values: "falsy" })
    .isLength({ min: 3, max: 100 })
    .withMessage("Name too short or too long")
    .isAlphanumeric()
    .escape(),
  body("price", "Must be a number").trim().isNumeric().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log("errors", errors);
    const article = new Article({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      console.log("an error");
      const [allBrands, allCategories] = await Promise.all([
        Brand.find().sort({ name: 1 }).exec(),
        Category.find().sort({ name: 1 }).exec(),
      ]);
      res.render("article_form", {
        title: "Update Article",
        article: article,
        brands: allBrands,
        categories: allCategories,
        errors: errors.array(req),
      });
      return;
    } else {
      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        article,
        {}
      );
      res.redirect(updatedArticle.url);
    }
  }),
];
