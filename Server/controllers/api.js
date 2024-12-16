const Data = require("../models/Data");

module.exports.api = async (req, res) => {
    try {
        const getData = await Data.find({});
        res.status(200).send(getData);
    } catch (error) {
        res.status(500).send({ message: "Error fetching data", error });
    }
};

module.exports.api_category = async (req, res) => {
    try {
        const category = req.params.category;
        const getData = await Data.find({ category });
        res.status(200).send(getData);
    } catch (error) {
        res.status(500).send({ message: "Error fetching data by category", error });
    }
};
// module.exports.api_limit=async(req,res)=>{
//     const limit = parseInt(req.body.limit) || 10;
//   try {
//     const products = await Data.find().limit(limit);
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }