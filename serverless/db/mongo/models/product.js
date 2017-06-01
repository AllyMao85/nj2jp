/* eslint-disable no-use-before-define, no-console */
import { Promise as bbPromise } from 'bluebird';
import productSchema from '../schemas/productSchema';

export default (db) => {
  productSchema.statics.findProductsByFlavor = flavor =>
  new Promise((resolve, reject) => {
    Product.find({ flavor })
    .exec()
    .then((dbProducts) => {
      console.log(`
        Found ${dbProducts.length} product(s) with Flavor: ${flavor}!
      `);
      resolve(dbProducts);
    })
    .catch((error) => {
      reject({
        problem: `Could not find any products with flavor ${flavor}.

        Mongo Error = ${error}`,
      });
    });
  });

  productSchema.statics.findProductByIdAndDelete = _id =>
  new Promise((resolve, reject) => {
    Product.findByIdAndRemove(_id)
    .exec()
    .then(resolve)
    .catch(error => reject({
      problem: `Could not create a delete product with _id:${_id}.  Verify the id is valid.
      Mongoose Error = ${error}`,
    }));
  });

  productSchema.statics.createProduct = product =>
  new Promise((resolve, reject) => {
    bbPromise.fromCallback(cb => Product.create({ product }, cb))
    .then((newProduct) => {
      console.log('\n//mongo/model/product.js\n @ createProduct RESOLVE\n', newProduct);
      resolve(newProduct);
    })
    .catch((error) => {
      console.log('\n//mongo/model/product.js\n @ createProduct REJECT\n', error);
      reject({
        problem: `Could not create a new product with this product object: ${JSON.stringify({ product }, null, 2)}
        Mongoose Error = ${error}`,
      });
    });
  });

  productSchema.statics.findProductById = _id =>
  new Promise((resolve, reject) => {
    Product.findById(_id)
    .exec()
    .then((dbProduct) => {
      console.log('\n//mongo/model/product.js\n @ findProductById RESOLVE\n', dbProduct);
      resolve(dbProduct);
    })
    .catch((error) => {
      console.log('\n//mongo/model/product.js\n @ findProductById REJECT\n', error);
      reject({
        problem: `Could not find the product with id ${_id}.  Are you sure that product exists?
        Mongo Error = ${error}`,
      });
    });
  });

  productSchema.statics.findProductAndUpdate = (_id, productObj) =>
  new Promise((resolve, reject) => {
    const newProductObj = {};
    Object.keys(productObj)
    .map((key) => {
      if (key === 'images') {
        const imageKeys = [];
        const imageObjs = [];
        productObj.images.forEach((imageObj, i) => {
          imageKeys.push(`product.images[${i}]`);
          imageObjs.push(imageObj);
        });
        return imageKeys.map((newKey, i) => ({
          [newKey]: imageObjs[i],
        }));
      }
      const newKey = `product.${key}`;
      const value = productObj[key];
      return ({
        [newKey]: value,
      });
    })
    .forEach((object) => {
      const key = Object.keys(object)[0];
      newProductObj[key] = object[key];
    });

    console.log('\nnewProductObj: ', newProductObj);

    Product.findByIdAndUpdate(_id, { $set: newProductObj }, { new: true })
    .exec()
    .then((updatedProduct) => {
      console.log('\n//mongo/model/product.js\n @ findByIdAndUpdate RESOLVE\n', updatedProduct);
      resolve(updatedProduct);
    })
    .catch((error) => {
      console.log('\n//mongo/model/product.js\n @ findByIdAndUpdate REJECT\n', error);
      reject({
        problem: `Could not find the product with id ${_id}. Are you sure that product exists?
        Mongo Error = ${error}`,
      });
    });
  });

  productSchema.statics.getPopularProducts = qty =>
  new Promise((resolve, reject) => {
    console.log('\n//mongo/models/product.js @ getPopularProducts');
    Product.find({})
    .exec()
    .then((dbProducts) => {
      console.log('\n//mongo/model/products.js\n @ getPopularProducts: ', dbProducts.slice(0, qty));
      resolve(dbProducts.slice(0, qty));
    })
    .catch(error =>
      reject({
        problem: `Could not fetch the ${qty} products you requested.
        Mongo Error = ${error}`,
      }),
    );
  });

  const Product = db.model('Product', productSchema);
  return Product;
};
