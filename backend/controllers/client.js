import client from "../models/client.js";


const registerClient = async (req, res) => {
  if (!req.body.name || !req.body.email ||!req.body.password )
    return res.status(400).send("incomplete data");

  const existingClient = await client.findOne({ name: req.body.name });
  if (existingClient) return res.status(400).send("the client already exist");

  const clientSchema = new client({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    dbStatus: true,
  });

  const result = await clientSchema.save();
  if (!result) return res.status(400).send("failed to register client");

  return res.status(200).send({ result});

};

const listClient = async (req,res) => {
  const clientSchema = await client.find();
  if(!clientSchema ||clientSchema.length == 0) return res.status(400).send("Emply client list")
  return res.status(200).send({clientSchema})
};

const findClient = async (req, res) => {
  const clientId = await client.findById({ _id: req.params["_id"] });
  return !clientId
    ? res.status(400).send("no search results")
    : res.status(200).send({ clientId });
};

const deleteClient = async (req , res) => {
  const clientDelete = await client.findByIdAndDelete({ _id: req.params["_id"] });

  return !clientDelete
    ? res.status(400).send("client not found")
    : res.status(200).send("client deleted");
};

const updateClient = async (req, res) => {
  if (!req.body.name || !req.body.email ||!req.body.password )
    return res.status(400).send("incomplete data");

  const existingClient = await client.findOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (existingClient) return res.status(400).send("the client already exist");

  const clientUpdate = await client.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  return !clientUpdate
    ? res.status(400).send("error editing client")
    : res.status(200).send({ clientUpdate });
};

export default {registerClient, listClient, findClient, updateClient, deleteClient};