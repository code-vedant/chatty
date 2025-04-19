
import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = []

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
