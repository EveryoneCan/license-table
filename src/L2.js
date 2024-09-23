import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './L2.css';

const LicenseTable = ({ licenses }) => {
  const [licensesState, setLicensesState] = useState(licenses);
  const [currentLicense, setCurrentLicense] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isGreenOverlayVisible, setIsGreenOverlayVisible] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (index) => {
    setCurrentLicense(licensesState[index]);
    setIsGreenOverlayVisible(true);
  };

  const handleSave = (updatedLicense) => {
    const updatedLicenses = licensesState.map((license) =>
      license.domain === updatedLicense.domain ? updatedLicense : license
    );
    setLicensesState(updatedLicenses);
    setIsGreenOverlayVisible(false);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this license?")) {
      const updatedLicenses = licensesState.filter((_, i) => i !== index);
      setLicensesState(updatedLicenses);
    }
  };

  const handleDownload = (index) => {
    const license = licensesState[index];
    const data = [
      ["Domain", "Description", "Package", "Status"],
      [license.domain, license.description, license.package, license.status]
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "License Data");
    XLSX.writeFile(wb, `${license.domain}_license.xlsx`);
  };

  const toggleOverlay = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentLicense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOverlaySave = () => {
    if (currentLicense) {
      handleSave(currentLicense);
    }
  };

  const handleCreate = () => {
    setCurrentLicense({ domain: '', description: '', package: '', status: '' });
    setIsCreating(true);
    setIsGreenOverlayVisible(true);
  };

  const handleCreateSave = () => {
    if (currentLicense) {
      setLicensesState([...licensesState, currentLicense]);
      setIsCreating(false);
      setIsGreenOverlayVisible(false);
    }
  };

  return (
    <div className="license-table">
      <h2>Licenses</h2>
      <div className="create-license-container">
        <button onClick={handleCreate} className="create-license-button">Create a License</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Description</th>
            <th>Package</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {licensesState.map((license, index) => (
            <tr key={index}>
              <td>{license.domain}</td>
              <td>{license.description}</td>
              <td>{license.package}</td>
              <td>{license.status}</td>
              <td>
                <button onClick={() => toggleOverlay(index)} className="menu-button">•••</button>
                {activeIndex === index && (
                  <div className="overlay">
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDownload(index)}>Download</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                    <button className="close-button" onClick={() => toggleOverlay(index)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isGreenOverlayVisible && currentLicense && (
        <div className="green-overlay">
          <h3>{isCreating ? "Create New License" : "Edit License Details"}</h3>
          <label>
            Domain:
            <input 
              type="text" 
              name="domain" 
              value={currentLicense.domain} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Description:
            <input 
              type="text" 
              name="description" 
              value={currentLicense.description} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Package:
            <input 
              type="text" 
              name="package" 
              value={currentLicense.package} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Status:
            <input 
              type="text" 
              name="status" 
              value={currentLicense.status} 
              onChange={handleChange} 
            />
          </label>
          <button onClick={isCreating ? handleCreateSave : handleOverlaySave}>
            {isCreating ? "Create" : "Save"}
          </button>
          <button onClick={() => setIsGreenOverlayVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default LicenseTable;
