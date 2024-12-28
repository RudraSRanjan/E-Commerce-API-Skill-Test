import mongoose from "mongoose";
import {productSchema} from "../../Schema/product.schema.js";
import { countSchema } from "../../Schema/counter.schema.js";



//Creating count and product model from respective schemas
const ProductModel= mongoose.model("Product",productSchema);
const CountModel= mongoose.model("Counter",countSchema);


//Create productRepository Class to implement all functions

class ProductRepository{

    
    //Function to add a new product
    async addProduct(name,quantity)
    {
        try {
            //Using countModel we increase the count of ID and use customized ID
            const count= await CountModel.findOneAndUpdate(
                {
                    name:"productID"
                },
                {
                    
                    $inc:{value:1}
                },
                //Create a new counter if it doesn't exists
                {
                    new:true,upsert:true
                }
            )



        //Creating new product
        
        const newProduct= new ProductModel({
            //Using customized ID value while creating a product
            _id: count.value,
            name:name,
            quantity:quantity
        });
         await newProduct.save();
         return newProduct;
            
        } catch (error) {
            console.log(error);
        }

    }


    //Function to get all Products
    async getAll()
    {
        try {
         // get all products from database using find() method   
        const products= await ProductModel.find();
        return products; //returns array of all products
            

        } catch (error) {
            console.log(error);
        }
    }

    //Create a function to delete a product
    async deleteProduct(productID)
    {
        try {
            
            
            //Deleting a product from id
            const deleteProduct= await ProductModel.deleteOne({_id:productID});

            //returning the delete product count
            return deleteProduct.deletedCount;
            
        } catch (error) {
            console.log(error);
        }
    }

    //Create a function to update quantity of product
    async quantityUpdate(productID, quantity)
    {
        try {

            //Find product by ID
        const product= await ProductModel.findById({_id: productID});

        if(!product)
        {
            return null; //Product not found
        }
        else
        {
            //Used findByIdAndUpdate so that can return updated product details 
            const updatedProduct= await ProductModel.findByIdAndUpdate(
                {_id: productID},
                {$inc:{quantity:quantity}},
                {new:true}
                );
               
                return updatedProduct;

        }
            
        } catch (error) {
            
            console.log(error);
        }
        
    }
}

export default ProductRepository;