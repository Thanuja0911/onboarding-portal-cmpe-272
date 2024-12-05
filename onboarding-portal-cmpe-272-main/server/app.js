import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import { config } from "dotenv";
import bodyParser from 'body-parser';

import fs from 'fs';
import util from 'util';
import { uploadFile, getFileStream} from './s3upload/s3.js';
import multer from 'multer';
import employeeRoutes from "./employeeprofile/EmployeeRoutes.js";
import landingPageRoutes from "./LandingPage/landingPage.route.js"
import documentRoutes from "./uploads/uploadfile.route.js"

//const { uploadFile, getFileStream } = require('./server/s3upload/s3')

const unlinkFile = util.promisify(fs.unlink)

const upload = multer({ dest: 'uploads/' })
config();

const port = Number(process.env.PORT);
const uri = String(process.env.MONGO_URI);
const connectOptions =  {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
}


const app = express();


app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("files"));
app.use("/files", express.static("files"));
import employee from "./employee/employee.route.js"
app.use('/api/users/', employee)

// Import user route and create user route middelware
import user from "./users/user.route.js"
app.use('/api/users/', user)

app.use('/api/landing-page',landingPageRoutes)

// employee route
// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.use('/api/employees', employeeRoutes);



app.use("/api/documents", documentRoutes);


/*
app.get("*", (req, res) => {
  messager(res, 404, "route not found");
  });
  */
  try {
    await mongoose.connect(process.env.MONGO_URI, connectOptions);
    console.log('Connected to MongoDB')
  } catch(err) {
    console.error(err);
  }
  app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
  );
//  mongoose.connection.once("open", () => {
//      console.log("Connected to MongoDB successfully...", uri, port);
 
//    }
//  );
  