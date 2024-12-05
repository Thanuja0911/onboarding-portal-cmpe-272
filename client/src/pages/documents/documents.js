import React, { useState } from "react";
import axios from "axios";
import "./document.css";
import SideBar from "../../components/sidebar/SideBar";

const Document = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const API_URL = "http://localhost:3000/api/documents";

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
      setUploadedFiles([...uploadedFiles, response.data]);
      setSelectedFile(null); // Reset file input
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div class="doc-bg">
    <SideBar/>
    <div className="document-container">
      <h2>Upload Documents</h2>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} className="upload-button">
          Upload
        </button>
      </div>
      <div className="uploaded-files">
        <h3>Uploaded Files</h3>
        {console.log(uploadedFiles)}
        <ul>
          {uploadedFiles.map((file, index) => (
            
            <li key={index}>
              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                {file.fileName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Document;
