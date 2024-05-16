let Product = require('../model/product');
var multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });
// Récupérer tous les Products (GET)
function getProducts(req, res){
    var aggregateQuery=Product.aggregate();
    Product.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) ||20,
        },
        (err, products) =>{
        if(err){
            res.status(500).send(err);
            return;
        }
        res.send(products);
      return;
    }
        );

		
        
       
    }

// Récupérer un Product par son id (GET)
/*function getProduct(req, res){
    let ProductId = req.params.id;

    Product.findOne({id: ProductId}, (err, Product) =>{
        if(err){res.send(err)}
        res.json(Product);
    })
}*/
function getProduct(req, res){
    let ProductTitle = req.params.title;
    const query={ $text: { $search: ProductTitle } };
    const regex = new RegExp(query, 'i'); // 'i' flag makes the search case-insensitive
    
    Product.find({title: regex}, (err, Product) =>{
        if(err){res.send(err)}
    
        res.json(Product);
    })
}

// Ajout d'un Product (POST)
/*function postProduct(req, res){
    const Products = new Product({
    title :req.body.title,
    desc : req.body.desc,
    img  :req.body.img,
    price : req.body.price,
    categorie : req.body.categorie})
    

    console.log("POST Product reçu :");
    console.log(Products)

    Products.save( (err) => {
        if(err){
            res.send('cant post Product ', err);
        }
        res.json({ message: `${Product.title} saved!`})
    })
}

// Update d'un Product (PUT)
function updateProduct(req, res) {
    console.log("UPDATE recu Product : ");
    console.log(req.body);
    Product.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, Product) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', Product)
    });

}

// suppression d'un Product (DELETE)
function deleteProduct(req, res) {

    Product.findByIdAndRemove(req.params.id, (err, Product) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${Product.title} deleted`});
    })
}*/



module.exports = {getProduct, getProducts,getProduct };
