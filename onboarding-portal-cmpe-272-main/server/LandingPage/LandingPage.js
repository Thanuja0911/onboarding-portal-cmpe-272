import mongoose from 'mongoose';

const LandingPageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profilePic: { type: String, default: '' },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  hireDate: { type: Date, required: true },
  workedFor: { type: String },
  location: { type: String },
  employmentType: { type: String },
  manager: { type: String },
  employeeId: { type: String },
  status: { type: String },
  gender: { type: String },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
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

export default mongoose.model('LandingPage', LandingPageSchema);
