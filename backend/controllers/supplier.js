import supplier from "../models/supplier.js";
import client from "./client.js";

const registerSupplier = async (req, res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("incomplete data");

  const existingSupplier = await supplier.findOne({ name: req.body.name });
  if (existingSupplier)
    return res.status(400).send("the supplier already exist");

  const supplierSchema = new supplier({
    name: req.body.name,
    address: req.body.address,
    dbStatus: true,
  });

  const result = await supplierSchema.save();
  if (!result) return res.status(400).send("failed to register supplier");

  return res.status(200).send({ result });
};

const listSupplier = async (req, res) => {
  const supplierSchema = await supplier.find();
  if (!supplierSchema || supplierSchema.length == 0)
    return res.status(400).send("Emply supplier list");
  return res.status(200).send({ supplierSchema });
};

const findSupplier = async (req, res) => {
  const supplierId = await supplier.findById({ _id: req.params["_id"] });
  return !supplierId
    ? res.status(400).send("no search results")
    : res.status(200).send({ supplierId });
};

const deleteSupplier = async (req , res) => {
  const supplierDelete = await supplier.findByIdAndDelete({ _id: req.params["_id"] });

  return !supplierDelete
    ? res.status(400).send("supplier not found")
    : res.status(200).send("supplier deleted");
};

const updateSupplier = async (req, res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("incomplete data");

  const existingSupplier = await supplier.findOne({
    name: req.body.name,
    address: req.body.address,
    dbStatus: true,
  });
  if (existingSupplier) return res.status(400).send("the Supplier already exist");

  const supplierUpdate = await supplier.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  return !supplierUpdate
    ? res.status(400).send("error editing client")
    : res.status(200).send({ supplierUpdate });
};

export default { registerSupplier, listSupplier, findSupplier, updateSupplier, deleteSupplier };
