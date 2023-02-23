import { response } from "../helpers/response.js";
import { notesModel } from "../models/notes.model.js";

const notesCtrl = {};

notesCtrl.create = async (req, reply) => {
  try {
    const data = await notesModel.create({ ...req.body, date: Date.now() });

    response(reply, 201, true, data, "note create");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

notesCtrl.listAll = async (req, reply) => {
  try {
    const data = await notesModel.find();
    response(reply, 200, true, data, "note list");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

notesCtrl.listById = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = await notesModel.findById(id);
    if (!data) {
      return response(reply, 404, false, "", "note not found");
    }
    response(reply, 200, true, data, "note found");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

notesCtrl.delete = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = await notesModel.findById(id);
    if (!data) {
      return response(reply, 404, false, "", "note not found");
    }

    await data.deleteOne();
    response(reply, 200, true, "", "note deleted");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

notesCtrl.update = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = await notesModel.findById(id);
    if (!data) {
      return response(reply, 404, false, "", "note not found");
    }

    await data.updateOne(req.body);
    response(reply, 200, true, "", "note update");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default notesCtrl;
