import mongoose from "mongoose";

const EmployeeProfileSchema = new mongoose.Schema({
  profilePic: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  hireDate: { type: Date },
  workedFor: { type: String },
  location: { type: String },
  employmentType: { type: String },
  manager: { type: String },
  employeeId: { type: String, required: true },
  status: { type: String },
  gender: { type: String },
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  socialStatus: { type: String },
  dob: { type: Date },
  age: { type: Number },
  addressLine1: { type: String },
  addressLine2: { type: String },
  addressLine3: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
});

const EmployeeProfile = mongoose.model("EmployeeProfile", EmployeeProfileSchema);

export default EmployeeProfile;
