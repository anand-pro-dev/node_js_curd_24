import Product from "../model/productModel.js";
import upload from "../middleware/uploads.js";


// Get All details
const product_details = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get All products
const product_all = async (req, res) => {

    try {
        const product = await Product.find();
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//  Create a new product
const product_create = async (req, res) => {

    // console.log(req.body);

    upload(req, res, async (err) => {
        try {

            const { title, price, details } = req.body;
            const image = req.file ? req.file.filename : null;

            let errorMessage = '';
            if (!title) errorMessage += 'Name is required. ';

            // Add more validation if needed

            if (errorMessage) {
                return res.status(400).json({ message: errorMessage.trim() });
            }

            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${image}`;

            const product = new Product({ title, price, image: imageUrl, details });
            const savedProduct = await product.save();
            res.json({ status: true, data: savedProduct });

        } catch (error) {
            res.status(400).json({ status: false, error: error.message });
        }
    });

};




// // Update a product
const product_update = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: false, error: err.message });
        }

        try {
            const { title, price, details } = req.body;
            const image = req.file ? req.file.filename : null;

            let productUpdate = { title, price, details };
            if (image) {
                const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${image}`;
                productUpdate.image = imageUrl;
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                productUpdate,
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({ status: false, error: "Product not found" });
            }

            res.json({ status: true, data: updatedProduct });

        } catch (error) {
            res.status(400).json({ status: false, error: error.message });
        }
    });
};


// Get All products
// const product_update = async (req, res) => {
//     try {
//         details: req.body.details

//         const updatedProduct = await Product.findByIdAndUpdate({ _id: req.params.id },
//             product,
//             { new: true });

//         const product = {
//             title: req.body.title,
//             price: req.body.price,
//             image: req.body.image.Product,

//         };


//         if (!updatedProduct) {
//             return res.status(404).json({ status: false, error: "Product not found" });
//         }

//         res.json(updatedProduct);


//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };



// // Update a product
// const product_update = async (req, res) => {
//     try {
//         const { title, price, details } = req.body;
//         const image = req.body.image.Product;

//         const updatedProduct = await Product.findByIdAndUpdate(
//             req.params.id,
//             { title, price, image, details },
//             { new: true }
//         );

//         if (!updatedProduct) {
//             return res.status(404).json({ status: false, error: "Product not found" });
//         }

//         res.json({ status: true, data: updatedProduct });
//     } catch (error) {
//         res.status(400).json({ status: false, error: error.message });
//     }
// };


// delete products
const product_delete = async (req, res) => {
    try {

        const removeProduct = await Product.findByIdAndDelete(req.params.id);
        res.json(removeProduct);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete all products
// const product_delete_all = async (req, res) => {
//     const { title, price, image, details } = req.body;
//     try {
//         await Product.deleteMany({});
//         res.json({ status: true, message: "All products deleted successfully" });
//     } catch (error) {
//         res.status(400).json({ status: false, error: error.message });
//     }
// };


// Delete all products
const product_delete_all = async (req, res) => {
    try {
        const count = await Product.countDocuments();

        if (count === 0) {
            return res.status(404).json({ status: false, message: "There are no products to delete" });
        }

        await Product.deleteMany({});
        res.json({ status: true, message: "All products deleted successfully" });
    } catch (error) {
        res.status(400).json({ status: false, error: error.message });
    }
}

export {
    product_all,
    product_create,
    product_details,
    product_update,
    product_delete,
    product_delete_all
};