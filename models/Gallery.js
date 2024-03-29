const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
  img: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
