import mongoose from "mongoose";
import app from "./app";

const DB = process.env.MONGODB_URI;
const connect = async () => {
  try {
    await mongoose.connect(DB!, {
      dbName: "task",
    });
    console.log("Connected to Database");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
