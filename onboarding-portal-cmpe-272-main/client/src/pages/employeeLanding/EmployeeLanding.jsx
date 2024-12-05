import React, { useState } from "react";
import axios from "axios";
import "./EmployeeLanding.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../components/sidebar/SideBar";

const EmployeeLanding = () => {
  const [employeeDetails, setEmployeeDetails] = useState({
    profilePic: null,
    email: "",
    phoneNumber: "",
    hireDate: "",
    workedFor: "",
    location: "",
    employmentType: "",
    manager: "",
    employeeId: "",
    status: "",
    gender: "",
    firstName: "",
    middleName: "",
    lastName: "",
    socialStatus: "",
    dob: "",
    age: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEmployeeDetails((prevDetails) => ({
          ...prevDetails,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/employees", employeeDetails);
      console.log("Employee details saved!", response.data);
      alert("Employee details saved successfully!");
    } catch (error) {
      console.error("Error saving employee details:", error);
      alert("Failed to save employee details. Please try again.");
    }
  };

  return (
    <div>
      <SideBar/>
    <div className="employee-landing-container">
      
      {/* Sidebar */}
      <aside className="employee-sidebar">
        <div className="profile-section">
          {employeeDetails.profilePic ? (
            <img
              src={employeeDetails.profilePic}
              alt="Profile"
              className="profile-pic"
            />
          ) : (
            <div className="placeholder-pic">Upload a Profile Picture</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="upload-input"
          />
        </div>
        <div className="contact-section">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={employeeDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={employeeDetails.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="sidebar-info">
          <h4>Hire Information</h4>
          <p>
            Started On:
            <input
              type="date"
              name="hireDate"
              value={employeeDetails.hireDate}
              onChange={handleInputChange}
              className="date-input"
            />
          </p>
          <p>
            Worked For:
            <input
              type="text"
              name="workedFor"
              placeholder="e.g., 10 years, 2 months"
              value={employeeDetails.workedFor}
              onChange={handleInputChange}
            />
          </p>
          <h4>Occupation Information</h4>
          <p>
            Location:
            <input
              type="text"
              name="location"
              placeholder="Enter Location"
              value={employeeDetails.location}
              onChange={handleInputChange}
            />
          </p>
          <p>
            Employment Type:
            <select
              name="employmentType"
              value={employeeDetails.employmentType}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Employment Type
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </p>
          <h4>Manager</h4>
          <p>
            <input
              type="text"
              name="manager"
              placeholder="Enter Manager's Name"
              value={employeeDetails.manager}
              onChange={handleInputChange}
            />
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="employee-content">
        <h2>Personal</h2>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={employeeDetails.employeeId}
                onChange={handleInputChange}
                placeholder="Enter Employee ID"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={employeeDetails.status}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={employeeDetails.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
            </div>
            <div className="form-group">
              <label>Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={employeeDetails.middleName}
                onChange={handleInputChange}
                placeholder="Middle Name"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={employeeDetails.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={employeeDetails.gender}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Social Status</label>
              <input
                type="text"
                name="socialStatus"
                value={employeeDetails.socialStatus}
                onChange={handleInputChange}
                placeholder="Enter Social Status"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={employeeDetails.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="text"
                name="age"
                value={employeeDetails.age}
                onChange={handleInputChange}
                placeholder="Enter Age"
              />
            </div>
          </div>
          <h3>Address</h3>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="addressLine1"
                placeholder="Street 1"
                value={employeeDetails.addressLine1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="addressLine2"
                placeholder="Street 2"
                value={employeeDetails.addressLine2}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="addressLine3"
                placeholder="Street 3"
                value={employeeDetails.addressLine3}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <h3>City</h3>
            <div className="form-group">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={employeeDetails.city}
                onChange={handleInputChange}
              />
            </div>
            <h3>State</h3>
            <div className="form-group">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={employeeDetails.state}
                onChange={handleInputChange}
              />
            </div>
            <h3>PostalCode</h3>
            <div className="form-group">
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={employeeDetails.postalCode}
                onChange={handleInputChange}
              />
            </div>
            <h3>Country</h3>
          <div className="form-group">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={employeeDetails.country}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="save-button-container">
          <button className="save-button" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} /> Save
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EmployeeLanding;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./EmployeeLanding.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSave } from "@fortawesome/free-solid-svg-icons";

// const EmployeeLanding = () => {
//   const [employeeDetails, setEmployeeDetails] = useState({
//     profilePic: null,
//     email: "",
//     phoneNumber: "",
//     hireDate: "",
//     workedFor: "",
//     location: "",
//     employmentType: "",
//     manager: "",
//     employeeId: "",
//     status: "",
//     gender: "",
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     socialStatus: "",
//     dob: "",
//     age: "",
//     addressLine1: "",
//     addressLine2: "",
//     addressLine3: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const userId = localStorage.getItem("userId"); // Fetch this dynamically, e.g., from localStorage or auth context
//   const API_URL = `http://localhost:3000/api/employees`;

//   // Fetch employee details on page load
//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_URL}/${userId}`);
//         setEmployeeDetails(response.data || employeeDetails); // Populate form with backend data
//       } catch (error) {
//         console.error("Error fetching employee details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetails();
//   }, [userId]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   // Handle file input changes
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setEmployeeDetails((prevDetails) => ({
//           ...prevDetails,
//           profilePic: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Save employee details to backend
//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       const payload = { userId, ...employeeDetails };
//       const response = await axios.post(API_URL, payload);
//       setEmployeeDetails(response.data); // Update form with saved data
//       alert("Details saved successfully!");
//     } catch (error) {
//       console.error("Error saving employee details:", error);
//       alert("Failed to save details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="employee-landing-container">
//       <aside className="employee-sidebar">
//         <div className="profile-section">
//           {employeeDetails.profilePic ? (
//             <img
//               src={employeeDetails.profilePic}
//               alt="Profile"
//               className="profile-pic"
//             />
//           ) : (
//             <div className="placeholder-pic">Upload a Profile Picture</div>
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="upload-input"
//           />
//         </div>
//         <div className="contact-section">
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter Email"
//               value={employeeDetails.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Phone Number</label>
//             <input
//               type="tel"
//               name="phoneNumber"
//               placeholder="Enter Phone Number"
//               value={employeeDetails.phoneNumber}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-row">
//   <div className="form-group">
//     <label>Date of Birth</label>
//     <input
//       type="date"
//       name="dob"
//       value={employeeDetails.dob}
//       onChange={handleInputChange}
//     />
//   </div>
//   <div className="form-group">
//     <label>Social Status</label>
//     <input
//       type="text"
//       name="socialStatus"
//       placeholder="Enter Social Status"
//       value={employeeDetails.socialStatus}
//       onChange={handleInputChange}
//     />
//   </div>
//   </div>
//         </div>
//         <div className="sidebar-info">
//           <h4>Hire Information</h4>
//           <p>
//             Started On:
//             <input
//               type="date"
//               name="hireDate"
//               value={employeeDetails.hireDate}
//               onChange={handleInputChange}
//               className="date-input"
//             />
//           </p>
//           <p>
//             Worked For:
//             <input
//               type="text"
//               name="workedFor"
//               placeholder="e.g., 10 years, 2 months"
//               value={employeeDetails.workedFor}
//               onChange={handleInputChange}
//             />
//           </p>
//           <h4>Occupation Information</h4>
//           <p>
//             Location:
//             <input
//               type="text"
//               name="location"
//               placeholder="Enter Location"
//               value={employeeDetails.location}
//               onChange={handleInputChange}
//             />
//           </p>
//           <p>
//             Employment Type:
//             <select
//               name="employmentType"
//               value={employeeDetails.employmentType}
//               onChange={handleInputChange}
//             >
//               <option value="" disabled>
//                 Select Employment Type
//               </option>
//               <option value="Full-time">Full-time</option>
//               <option value="Part-time">Part-time</option>
//             </select>
//           </p>
//           <h4>Manager</h4>
//           <p>
//             <input
//               type="text"
//               name="manager"
//               placeholder="Enter Manager's Name"
//               value={employeeDetails.manager}
//               onChange={handleInputChange}
//             />
//           </p>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="employee-content">
//         <h2>Personal</h2>
//         <div className="form-section">
//           <h3>Basic Information</h3>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Employee ID</label>
//               <input
//                 type="text"
//                 name="employeeId"
//                 value={employeeDetails.employeeId}
//                 onChange={handleInputChange}
//                 placeholder="Enter Employee ID"
//               />
//             </div>
//             <div className="form-group">
//               <label>Status</label>
//               <select
//                 name="status"
//                 value={employeeDetails.status}
//                 onChange={handleInputChange}
//               >
//                 <option value="" disabled>
//                   Select Status
//                 </option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={employeeDetails.firstName}
//                 onChange={handleInputChange}
//                 placeholder="First Name"
//               />
//             </div>
//             <div className="form-group">
//               <label>Middle Name</label>
//               <input
//                 type="text"
//                 name="middleName"
//                 value={employeeDetails.middleName}
//                 onChange={handleInputChange}
//                 placeholder="Middle Name"
//               />
//             </div>
//             <div className="form-group">
//               <label>Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={employeeDetails.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Last Name"
//               />
//             </div>
//           </div>
//           <h3>Address</h3>
//           <div className="form-row">
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="addressLine1"
//                 placeholder="Street 1"
//                 value={employeeDetails.addressLine1}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="addressLine2"
//                 placeholder="Street 2"
//                 value={employeeDetails.addressLine2}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group">
//     <input
//       type="text"
//       name="addressLine3"
//       placeholder="Street 3"
//       value={employeeDetails.addressLine3}
//       onChange={handleInputChange}
//     />
//   </div>
//   </div>
//   <h3>City</h3>
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={employeeDetails.city}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <h3>State</h3>
//             <div className="form-group">
//     <input
//       type="text"
//       name="state"
//       placeholder="State"
//       value={employeeDetails.state}
//       onChange={handleInputChange}
//     />
//   </div>
//   <h3>Postal Code</h3>
//   <div className="form-group">
//     <input
//       type="text"
//       name="postalCode"
//       placeholder="Postal Code"
//       value={employeeDetails.postalCode}
//       onChange={handleInputChange}
//     />
//   </div>
//   <h3>Country</h3>
//   <div className="form-group">
//     <input
//       type="text"
//       name="country"
//       placeholder="Country"
//       value={employeeDetails.country}
//       onChange={handleInputChange}
//     />
//   </div>
          
//         </div>
//         <div className="save-button-container">
//           <button className="save-button" onClick={handleSave}>
//             <FontAwesomeIcon icon={faSave} /> Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeLanding;

