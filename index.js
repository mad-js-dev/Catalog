const express = require('express');
var bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
const path = require('path');
const baseData = require("./baseData.json");
const cors = require('cors');

const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let settings;
MongoClient.connect("mongodb://localhost:27017/erp", {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
    console.log(err, db);
    if (err || !db) {
        return callback(err);
    }

    dbConnection = db.db("erp");
    console.log("Successfully connected to MongoDB.");
    dbConnection
        .collection("settings")
        .find().toArray(function (err, resultSettings) {
            console.log(err, resultSettings)
        })
    return setup();
});

let dbConnection
client.connect("mongodb://localhost:27017", function (err, db) {
    console.log(err, db);
    if (err || !db) {
        return callback(err);
    }

    dbConnection = db.db("erp");
    console.log("Successfully connected to MongoDB.");
    dbConnection
        .collection("settings")
        .find().toArray(function (err, resultSettings) {
            console.log(err, resultSettings)
        })
    return setup();
});

function setup() {
    //If db empty load basic data (datastore schema)
    dbConnection
        .collection("settings")
        .find({}).limit(100)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching settings!");
            } else {
                dbConnection.collection("settings").deleteMany({})
                dbConnection.collection("settings").insertMany(baseData.settings)
                .then( () => {
                    dbConnection
                        .collection("settings")
                        .find().toArray(function (err, resultSettings) {
                            console.log("Settings loaded")
                        })
                })

                dbConnection.collection("products").deleteMany({})
            }
        });
}

const app = express();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = process.env.PORT || 80;

app.use(cors())

app.use(express.static(path.join(__dirname, "web-build")));

app.get('/api/createProduct', async (req, res) => {
    dbConnection
    .collection("products")
    .insertOne({
        name: "New product", 
        image: "https://cdn2.thecatapi.com/images/ab2.jpg",
        lastEdit: Date.now()
    })
    .then(editRes => {
        console.log('Item created', editRes);
        res.json(editRes);
    }) 
})

app.post('/api/readProduct', jsonParser, async (req, res) => {

    console.log(req.body._id)

    dbConnection
    .collection("products")
    .findOne(ObjectId(req.body._id))
    .then(result => {
        //console.log('Item readed', result)
        res.json(result);
    })  
})

app.post('/api/updateProduct', jsonParser, async (req, res) => {
    console.log('updateProduct', req.body)

    dbConnection
    .collection("products", req.body)
    .updateOne(
        {_id: ObjectId(req.body._id)}, 
        { $set: req.body.set}
    )
    .then(editRes => {
        console.log(editRes)
        res.json(editRes);
    })   
})

app.post('/api/removeProduct', jsonParser, async (req, res) => {
    dbConnection
    .collection("products")
    .deleteOne(
        {_id: ObjectId(req.body._id)}, 
    )
    .then(editRes => {
        res.json(editRes);
    })
})

app.post('/api/getProductSchema', jsonParser, async (req, res) => {
    const settingIds = req.body.settingIds.map((id) => {
        return id
    })
    const query = await movies.find({ _id: { $in: settingIds} })
    .toArray(function (err, result) {
        if (err) {
            res.status(400).send("Error fetching schema!");
        } else {
            //console.log('Item readed', result)
            res.json(result);
        }
    });
    /*dbConnection
        .collection("settings")
        .find({ _id: { $in: settingIds} })
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching schema!");
            } else {
                //console.log('Item readed', result)
                res.json(result);
            }
        });*/
})

app.post('/api/searchProducts', jsonParser, async (req, res) => {  
    console.log(req.body)
    let query = {}
    let or = []
    
    /*
        if(req.body.searchText) {
            query = { $or: [{"name": { $regex : req.body.searchText} } ] }
        }
    */
    if(Object.keys(req.body).length > 0) {
        
        console.log(query)
        dbConnection
        .collection("settings")
        .find({"propertyType": "text"})
        .toArray(function (err, result) {
            if (err) {
                console.log('Err:', err)
            } else {
                //console.log('Props:', result)
            }
            /*
            result.map((elem) => {
                console.log('--', elem)
                query.$or.push({ [elem.name]: { $regex : req.body.searchText} })
            })*/
            console.log(query)
            Object.keys(req.body).forEach(function(key, val) {
                console.log(key, val)
                let orValue = {}
                orValue[key] = req.body[key]
                if(val != 'null' || val != -1) {
                    or.push(orValue)
                }
            });
            query = { $and: or }
            console.log(query)
            dbConnection
                .collection("products")
                .find(query).limit(100)
                .toArray(function (err, result) {
                    //console.log(result, err)
                    if (err) {
                    res.status(400).send("Error fetching listings!");
                    } else {
                    res.json(result);
                    }
                });
        });
    } else {
        //Default query
        dbConnection
            .collection("products")
            .find(query).limit(100)
            .toArray(function (err, result) {
                console.log(result, err)
                if (err) {
                res.status(400).send("Error fetching listings!");
                } else {
                res.json(result);
                }
            });
    }

    console.log(query.$or)
    
    
})

app.get('/api/readSettings', async (req, res) => {
    dbConnection
        .collection("settings")
        .find({}).limit(100)
        .toArray(function (err, result) {
            if (err) {
              res.status(400).send("Error fetching listings!");
            } else {
              res.json(result);
            }
        });
})

app.get('/api/createSettings', async (req, res) => {
    
})

app.post('/api/updateSettings', jsonParser, async (req, res) => {
    console.log('updateSettings', req.body)
    /*
    dbConnection
    .collection("settings")
    .find({_id: parseInt(req.body._id)})
    .toArray(function (err, result) {
        if (err) {
          console.log(err)
          res.status(400).send("Error fetching listings!");
        } else {
          console.log(result)
          res.json(result);
        }
    });*/
    switch(req.body.type) {
        case "name":
            console.log("name", req.body)

        break;
         case "editListItem":
            dbConnection
                .collection("settings", req.body)
                .updateOne(
                    {_id: parseInt(req.body._id), "list._id": req.body.listIndex}, 
                    { $set: {"list.$.name": req.body.name}}
                )   
                .then(editRes => {
                    console.log(editRes);
                    dbConnection
                        .collection("settings")
                        .find({})
                        .toArray(function (err, result) {
                            if (err) {
                            console.log(err)
                            res.status(400).send("Error fetching listings!");
                            } else {
                                //console.log(result)
                                res.json(result)
                            }
                        });            
                })
                .catch(err => console.warn(err));
        break;
        case "removeListItem":
            console.log("removeListItem", req.body)
            dbConnection
                .collection("settings")
                .find({_id: parseInt(req.body._id)})
                .toArray(function (err, result) {
                    if (err) {
                      console.log(err)
                      res.status(400).send("Error fetching listings!");
                    } else {
                        query = {...result}
                        console.log(query)
                    }
                });

        break;
        case "addListItem":
            console.log("addListItem", req.body)
            let query = null
            dbConnection
                .collection("settings")
                .find({_id: parseInt(req.body._id)})
                .toArray(function (err, result) {
                    if (err) {
                      console.log(err)
                      res.status(400).send("Error fetching listings!");
                    } else {
                        query = {...result}
                        let idCounter = 0;
                        query[0].list.forEach((val) => {
                            if(idCounter <= val._id) { idCounter = val._id }
                        })
                        idCounter++
                        console.log(query)
                        query[0].list.unshift({
                            "_id": idCounter, 
                            "name": req.body.name, 
                            "value":  idCounter
                        })
                        console.log(query[0].list)
                        dbConnection
                            .collection("settings", req.body)
                            .updateOne(
                                {_id: parseInt(req.body._id)}, 
                                { $set: {"list": query[0].list}}
                            )
                            .then(editRes => {
                                console.log(editRes);
                            });
                    }
                });
            
        break;
    }
    
})

app.get('/api/deleteSettings', async (req, res) => {
    
})

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, "web-build", "index.html"))
})





async function run() {
    try {
      const database = client.db("erp");
      settings = database.collection("settings");
      // Query for a movie that has the title 'The Room'
      const query = {};
      const options = {};
      const res = await settings.findOne(query, options);
      // since this method returns the matched document, not a cursor, print it directly
      console.log(res);
      app.listen(port, () => console.log('server is running at port ' + port));
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);