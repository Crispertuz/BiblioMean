import mongoose from "mongoose";
import moment from "moment";

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  password:String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const client = mongoose.model("client", clientSchema);

export default client;