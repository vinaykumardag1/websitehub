const User = require("../models/User");

module.exports.api = async (req, res) => {
    try {
        const getData = await User.find({});
        res.status(200).send(getData);
    } catch (error) {
        res.status(500).send({ message: "Error fetching data", error });
    }
};

module.exports.api_category = async (req, res) => {
    try {
        const category = req.params.category;
        const getData = await User.find({ category });
        res.status(200).send(getData);
    } catch (error) {
        res.status(500).send({ message: "Error fetching data by category", error });
    }
};
