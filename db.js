import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("db connected successfully"));

const laptopSchema = new mongoose.Schema({
  systemId:{ type: String, required: true, unique:true},
  laptopName: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 3,
  }, // "laptopName":"HP EliteBook", "assignedTo":"Anand Vish", "ownedBy":"Company", "accessories":"", "remark":""
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
  empId : { type: String, required: true, trim: true, unique: true },
  remark: { type: String, default: "None" },
});

const laptopHistory = new mongoose.Schema({
  laptopId: { type: mongoose.Schema.Types.ObjectId, ref: "Laptops" },
  assignHistory: [
    {
      type: String,
    },
  ],
});

laptopSchema.pre("save", function (next){
  if(this.ownerName.length === 0) this.ownerName = "Panorama";
  next()
})

const Laptops = mongoose.model("Laptops", laptopSchema);
const History = mongoose.model("History", laptopHistory);

export { Laptops, History };
