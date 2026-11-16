import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = () => {
  const [fileData, setFileData] = useState({
    fileName: "",
    categoryName: "",
    fileDescription: "",
    fileDate: "",
    files: [],
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  // ✅ Backend se files load karna
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("https://www.jagatjit.com/api/files");
      setUploadedFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
      
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFileData({
      ...fileData,
      files: Array.from(e.target.files), // ✅ Multiple files support
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fileName", fileData.fileName);
    formData.append("categoryName", fileData.categoryName);
    formData.append("fileDescription", fileData.fileDescription);
    formData.append("fileDate", fileData.fileDate);

    fileData.files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await axios.post("https://www.jagatjit.com/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedFiles((prevFiles) => [...prevFiles, ...response.data]);
      setFileData({
        fileName: "",
        categoryName: "",
        fileDescription: "",
        fileDate: "",
        files: [],
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://www.jagatjit.com/api/files/${id}`);
      setUploadedFiles(uploadedFiles.filter((file) => file._id !== id));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <section className="file-upload">
      <div className="container mt-5">
        <h3>File Upload</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">File Name</label>
            <input
              type="text"
              className="form-control"
              name="fileName"
              value={fileData.fileName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              name="categoryName"
              value={fileData.categoryName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">File Description</label>
            <textarea
              className="form-control"
              name="fileDescription"
              value={fileData.fileDescription}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">File Date</label>
            <input
              type="date"
              className="form-control"
              name="fileDate"
              value={fileData.fileDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">File Upload</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              multiple
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Upload File</button>
        </form>

        {uploadedFiles.length > 0 && (
          <div className="mt-5">
            <h4>Uploaded Files</h4>
            <div className="row">
              {uploadedFiles.map((file) => (
                <div className="col-xl-4 col-lg-4 col-md-6 col-12" key={file._id}>
                  <div className="card mb-4 p-3">
                    <div className="card-body">
                      <h5 className="card-title">{file.fileName}</h5>
                      <p className="card-text">Category: {file.categoryName}</p>
                      <p className="card-text">Date: {file.fileDate}</p>
                      <a
                        href={`https://www.jagatjit.com/api${file.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success me-2"
                      >
                        View Document
                      </a>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(file._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FileUpload;
