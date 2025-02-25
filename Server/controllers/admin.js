const Data=require("../models/Data")
module.exports.admin=async(req,res)=>{
    const existingUser = await Data.findOne(
        {
             name: req.body.name,
             url:req.body.url,
             category:req.body.category,

         }
    );
    if (existingUser) {
      res.send("website is already existed");
      res.redirect("/admin")
    }
    const userData = new Data(req.body);
    userData.save()
        .then(() => res.redirect("/admin"))
        .catch(err => res.status(400).send('Error saving data: ' + err));
}
module.exports.dataupdate = async (req, res) => {
  try {
    const { name, url, desc, category } = req.body;
    const { id } = req.params;
    const updatedData = await Data.findByIdAndUpdate(
      id,
      { name, url, desc, category },
      { new: true, runValidators: true } 
    );
    if (!updatedData) {
      return res.status(404).json({ message: "Data not found!" });
    }
    res.status(200).json({ message: "Data updated successfully!",data: updatedData,});
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Internal Server Error",error: error.message,});
  }
};

module.exports.datadelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }
    const deletedData = await Data.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ message: "Data not found!" });
    }
    res.status(200).json({message: "Data deleted successfully!",data: deletedData,});
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};