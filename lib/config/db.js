import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb+srv://anshumansinha:Pass2001@cluster0.tgei7xv.mongodb.net/Patnaitesdb?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.error("Failed to connect MongoDB", error);
    process.exit(1);
  }
};
