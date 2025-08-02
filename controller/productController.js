const { Product } = require('../model/product.js');


async function getAllproduct(req, res) {
    const products = await Product.findAll();

    return res.json(products);
}

async function getProduct(req, res) {
    const code = parseInt(req.params.code);
    const product = await Product.findAll({
        where:{
            code : code
        }
    });

    return res.json(product);
}

async function registerProduct(req, res) {
    const { name, code, price, category, expire_date, status, amount } = req.body;

    if (status < 0 || status > 2) {
        return res.status(400).json({"message": "Status not avilible"});
    }

    const exit_code = await Product.findAll({
        where: {
            code: code
        }
    })

    if(exit_code == []){
        return res.status(400).json({"message": "Cannot create same product"});
    }

    await Product.create({
        name: name,
        code: code,
        price: price,
        category: category,
        expire_date: expire_date,
        status: status,
        amount: amount,
        create_at: (new Date).toString(),
        update_at: (new Date).toString()
    })

    return res.json({"message": "Success"})
}

async function deleteProduct(req, res) {
    const code = req.params.code;

    if (!code || code == null){
        return res.status(400).json({"message":"no product with that code"});
    }


    const avilibleProduct = await Product.findOne({
        where:{
            code: code
        }
    })

    if(!avilibleProduct){
        return res.status(400).json({"message":"no product with that code"});
    }

    await Product.destroy({
        where:{
            code: code
        }
    })

    return res.json({"message": "Success"})
}

async function updateProduct(req, res) {
    const codepa = req.params.code;

    if (!codepa || codepa == null){
        return res.status(400).json({"message":"no code"});
    }

    const { name, code, price, category, expire_date, status, amount} = req.body;

    const product = await Product.findOne({
        where:{
            code: codepa
        }
    })

    if (status < 0 || status > 2) {
        return res.status(400).json({"message": "Status not avilible"});
    }

    if(!product){
        return res.status(400).json({"message":"no product with that code"});
    }

    if(name){
        await product.update({
            name: name
        })
    }
    if(price){
        await product.update({
            price: price
        })
    }
    if(category){
        await product.update({
            category: category
        })
    }
    if(expire_date){
        await product.update({
            expire_date: expire_date
        })
    }
    if(status){
        await product.update({
            status: status
        })
    }
    if(amount){
        await product.update({
            amount: amount
        })
    }

    return res.json({"message": "Success"})

    
}

module.exports = {
    getAllproduct,
    getProduct,
    registerProduct,
    deleteProduct,
    updateProduct
}