import mongoose from "mongoose";

const { Schema, model } = mongoose;

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "el campo title es requerido"],
    },
    description: {
      type: String,
      required: [true, "el campo description es requerido"],
    },
    date: {
      type: Date,
    },
    category: {
      type: String,
      required: [true, "el campo description es requerido"],
    },
  },
  { timestamps: true }
);

export const notesModel = model("notes", notesSchema);
