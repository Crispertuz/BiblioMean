import mongoose from "mongoose";
import moment from "moment";

const supplierSchema = new mongoose.Schema({
  name: String,
  address: String,
  registerDate: { type: Date, default: Date.now },
});

const supplier = mongoose.model("supplier", supplierSchema);

export default supplier;