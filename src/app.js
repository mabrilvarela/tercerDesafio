const express = requiere("express");
const app = express();
const PUERTO = 8080;

const ProductManager = requiere("../src/controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");

app.get("/api/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();

        if(limit) {
            res.json(products.slice(0, limit));
        } else {
                res.json(products)
            }    
        } catch (error) {
        console.log("Ocurrió un error al obtener los productos", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

app.get("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        const product = await productManager.getProductById(parseInt(id));
        if(!product) {
            res.json({
                error: "Producto no encontrado"
            });
        } else {
            res.json(product)
        }
    } catch (error) {
        console.log("Ocurrió un error al obtener el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

app.put("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;
    const actualProduct = req.body;

    try {
        await productManager.updateProduct(parseInt(id), actualProduct);
        res.json({message: "Producto actualizado"})
    } catch (error) {
        console.log("Ocurrió un error al actualizar el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

app.listen(PUERTO);