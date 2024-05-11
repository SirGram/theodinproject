const express = require("express");

const router = express.Router();

const article_controller = require('../controllers/article_controller')
const brand_controller = require('../controllers/brand_controller')
const category_controller = require('../controllers/category_controller')

router.get("/", article_controller.index);

router.get("/brands", brand_controller.list);
router.get("/brand/create", brand_controller.create_get);
router.post("/brand/create", brand_controller.create_post);
router.get("/brand/:id/update", brand_controller.update_get);
router.post("/brand/:id/update", brand_controller.update_post); 
router.get("/brand/:id/delete", brand_controller.delete_get);
router.post("/brand/:id/delete", brand_controller.delete_post);
router.get("/brand/:id", brand_controller.detail);

router.get("/articles", article_controller.list);
router.get("/article/create", article_controller.create_get);
router.post("/article/create", article_controller.create_post);
router.get("/article/:id/update", article_controller.update_get);
router.post("/article/:id/update", article_controller.update_post); 
router.get("/article/:id/delete", article_controller.delete_get);
router.post("/article/:id/delete", article_controller.delete_post);
router.get("/article/:id", article_controller.detail);

router.get("/categories", category_controller.list);
router.get("/category/create", category_controller.create_get);
router.post("/category/create", category_controller.create_post);
router.get("/category/:id/update", category_controller.update_get);
router.post("/category/:id/update", category_controller.update_post); 
router.get("/category/:id/delete", category_controller.delete_get);
router.post("/category/:id/delete", category_controller.delete_post);
router.get("/category/:id", category_controller.detail);




module.exports = router
