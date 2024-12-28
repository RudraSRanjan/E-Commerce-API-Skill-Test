import ProductRepository from "./product.repository.js";


export default class ProductController{

    constructor()
    {
        //Create a new instance of ProductRepository
        this.productRepository= new ProductRepository();
    }

    async addNewProduct(req,res)
    {
        try {
            const {name,quantity}= req.body;
            

            const newProduct= await this.productRepository.addProduct(name,quantity);
            console.log(newProduct);
            return res.status(200).json({data: {
                product:{
                   
                    name:newProduct.name,
                    quantity:newProduct.quantity
                }
            }}
        )
        } catch (error) {
            console.log(error);
            return res.status(400).send("Could not add product");
        }
    }

    async getAllProducts(req,res)
    {
        try {
            const products= await this.productRepository.getAll();
            return res.status(200).json({data: {
                products
            }});
            
        } catch (error) {
            console.log(error);
            return res.status(400).send("No Products in database");
        }
    }

    async delete(req,res)
    {
        try {
            const {id}= req.params;
            const deletedProduct= await this.productRepository.deleteProduct(id);
            if(!deletedProduct)
            {
                return res.status(400).json( {
                    message: "Product Not Found"
                });  
            }
            else{
                return res.status(200).json({data: {
                    message: "Product deleted Successfully"
                }}); 
            }
            
        } catch (error) {
            return res.status(400).send("Could not delete Product");
        }
    }

    async updateProduct(req,res,next)
    {
        try {
            const productID= req.params.id;
            //Converting query parameter from string to a number in base 10
            const quantity= parseInt(req.query.number,10);

            const updateProducts= await this.productRepository.quantityUpdate(productID, quantity);
            return res.status(200).json({data: {
                product:{
                    id: updateProducts.id,
                    name:updateProducts.name,
                    quantity:updateProducts.quantity
                }
            },
            
                message: "Product Updated Successfully"
            })
            
        } catch (error) {
            return res.status(400).send("Could not update Product");
        }
    }
}