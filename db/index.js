import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("db connected successfully"));

const adminSchema = new mongoose.Schema({
  email: {  type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: { type: String, required: true, minLength: 6 },
})


/**
 * Account Schema
 * @module models/historySchema
 * @requires mongoose
 */


const laptopHistory = new mongoose.Schema({
  systemId: { type: String, required: true },
  laptopName: { type: String, required: true },
  empId: { type: String, required: true },
  assignedTo: { type: String, required: true },
  fromDate:{type: String, required: true},
  toDate:{type: String, required: true},
  accessories : [
    {
      type: String,
      default: "None"
    },
  ],
});


  /**
 * Account Schema
 * @module models/laptopSchema
 * @requires mongoose
 */


const laptopSchema = new mongoose.Schema({
  systemId:{ type: String, required: true},
  laptopName: {
    type: String,
    required: true,
    minLength: 3,
  }, 
  date:{type: String, required: true},
  ownedBy: { type: String, required: true, default :"Company" },
  ownerName: { type: String, default:"Panorama" },
  accessories : [
    {
      type: String,
      default: "None"
    },
  ],
  assignedTo: { type: String, required: true, minLength: 2, trim: true, default: "N/A", required: true },
  empId : { type: String, required: true, trim: true },
  remark: { type: String, default: "None" },
  history: [laptopHistory]
});



laptopSchema.pre("save", function (next){
  if(this.ownerName.length === 0) this.ownerName = "Panorama";
  next()
})

const Admin = mongoose.model("Admin", adminSchema);
const Laptops = mongoose.model("Laptops", laptopSchema);
// const History = mongoose.model("History", laptopHistory);

export { Laptops, Admin };


// history :- laptop history - username, userId, accessories, date