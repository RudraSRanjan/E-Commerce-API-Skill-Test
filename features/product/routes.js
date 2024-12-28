import express from "express";
import ProductController from "./product.controller.js";

//Create router to handle requests
const productRouter= express.Router();

const productController= new ProductController();

productRouter.post("/create",(req,res,next)=>{
    productController.addNewProduct(req,res,next)
});

productRouter.get("/",(req,res,next)=>{
    productController.getAllProducts(req,res,next)
});

productRouter.delete("/:id",(req,res,next)=>{
    productController.delete(req,res,next)
});

productRouter.post("/:id/update_quantity",(req,res,next)=>{
    productController.updateProduct(req,res,next)
});

export default productRouter;