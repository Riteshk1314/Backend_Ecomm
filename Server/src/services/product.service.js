const category= require('../models/category.model');
const product=require('../models/product.model');


async function createProduct(productData){
    let topLevel=await category.findOne({name:productData.parentCategory});
    if (!topLevel){
        topLevel=await category.create({name:productData.parentCategory, level:1});
    }

    let secondLevel=await category.findOne({name:productData.secondLevelCategory, parentCategory:topLevel._id});
    if(!secondLevel){
        secondLevel=await category.create({name:productData.secondLevelCategory, parentCategory:topLevel._id, level:2});
    }
    let thirdLevel=await category.findOne({name:productData.thirdLevelCategory, parentCategory:secondLevel._id});
    if(!thirdLevel){
        thirdLevel=await category.create({name:productData.thirdLevelCategory, parentCategory:secondLevel._id, level:3});
    }
    let newProduct=await product.create({
        name:productData.name,
        description:productData.description,
        price:productData.price,
        discountedPrice:productData.discountedPrice,
        stock:productData.stock,
        category:thirdLevel._id,
        images:productData.images,
        sizes:productData.sizes,
        brand:productData.brand,
        image:productData.image,
    })
    return await newProduct.save(
    );
};
async function findProductById(productId){
    try{
        const product=await product.findById(productId).populate('category').exec();
        if(!product){
            throw new Error('Product not found',productId);
        }
        return product;
    }
    catch(error){
        throw new Error(error);
    }
}
async function findProductByCategory(category){
    try{
        const products=await product.find({category:category});
        if(!products){
            throw new Error('Product not found',category);
        }
        return products;
    }
    catch(error){
        throw new Error(error);
    }
}
async function findProductByBrand(brand){
    try{
        const products=await product.find({brand:brand});
        if(!products){
            throw new Error('Product not found',brand);
        }
        return products;
    }
    catch(error){
        throw new Error(error);
    }
}
async function findProductBySize(size){
    try{
        const products=await product.find({sizes:size});
        if(!products){
            throw new Error('Product not found',size);
        }
        return products;
    }
    catch(error){
        throw new Error(error);
    }
}
async function findProductByPrice(price){
    try{
        const products=await product.find({price:price});
        if(!products){
            throw new Error('Product not found',price);
        }
        return products;
    }
    catch(error){
        throw new Error(error);
    }
}
async function findProductByDiscountedPrice(discountedPrice){
    try{
        const products=await product.find({discountedPrice:discountedPrice});
        if(!products){
            throw new Error('Product not found',discountedPrice);
        }
        return products;
    }
    catch(error){
        throw new Error(error);
    }
}
async function deleteProduct(productId){
    try{
        const product=await product.findProductById(productId);
        if(!product){
            throw new Error('Product not found',productId);
        }
        return product.delete();
    }
    catch(error){
        throw new Error(error);
    }
}
async function updateProduct(productId,productData){
    try{
        const product=await product.findProductByIdAndUpdate(productId,productData);
        return product.save();
    }
    catch(error){
        throw new Error(error);
    }
}
    