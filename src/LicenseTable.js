import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './LicenseTable.css';

const LicenseTable = ({ licenses }) => {
  const [licensesState, setLicensesState] = useState(licenses);
  const [currentLicense, setCurrentLicense] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isWhiteOverlayVisible, setIsWhiteOverlayVisible] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (index) => {
    setCurrentLicense({ ...licensesState[index], status: licensesState[index].status === 'Active' });
    setIsWhiteOverlayVisible(true);
  };

  const handleSave = (updatedLicense) => {
    const updatedLicenses = licensesState.map((license) =>
      license.domain === updatedLicense.domain ? updatedLicense : license
    );
    setLicensesState(updatedLicenses);
    setIsWhiteOverlayVisible(false);
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

  const handleStatusToggle = () => {
    setCurrentLicense((prev) => ({
      ...prev,
      status: !prev.status,
    }));
  };

  const handleOverlaySave = () => {
    if (currentLicense) {
      handleSave({
        ...currentLicense,
        status: currentLicense.status ? 'Active' : 'Inactive',
      });
    }
  };

  const handleCreate = () => {
    setCurrentLicense({ domain: '', description: '', package: '', status: false });
    setIsCreating(true);
    setIsWhiteOverlayVisible(true);
  };

  const handleCreateSave = () => {
    if (currentLicense) {
      setLicensesState([...licensesState, { ...currentLicense, status: currentLicense.status ? 'Active' : 'Inactive' }]);
      setIsCreating(false);
      setIsWhiteOverlayVisible(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLicenses = licensesState.filter(license =>
    license.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="license-table">
      <h2>Licenses</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search licenses..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="create-license-container">
        <button onClick={handleCreate} className="create-license-button">New License</button>
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
          {filteredLicenses.map((license, index) => (
            <tr key={index}>
              <td>{license.domain}</td>
              <td>{license.description}</td>
              <td>{license.package}</td>
              <td>{license.status}</td>
              <td>
                <button onClick={() => toggleOverlay(index)} className="menu-button">•••</button>
                {activeIndex === index && (
                  <div className="overlay">
                    <button className="action-button" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="action-button" onClick={() => handleDownload(index)}>Download</button>
                    <button className="action-button" onClick={() => handleDelete(index)}>Delete</button>
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
      {isWhiteOverlayVisible && currentLicense && (
  <div className="white-overlay">
    <button className="close-button" onClick={() => setIsWhiteOverlayVisible(false)}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
    <h3 style={{ color: 'black' }}>{isCreating ? "Create New License" : "Edit License Details"}</h3>
    <label>
      Domain 
      <input 
        type="text" 
        name="domain" 
        value={currentLicense.domain} 
        onChange={handleChange} 
        disabled={!isCreating}
      />
    </label>
    <label>
      Description 
      <input type="text" name="description" value={currentLicense.description} onChange={handleChange} />
    </label>
    <label>
      Select the package of the domain 
      <input type="text" name="package" value={currentLicense.package} onChange={handleChange} />
    </label>
    <label>Status: 
      <label className="toggle-switch">
        <input type="checkbox" checked={currentLicense.status} onChange={handleStatusToggle} />
        <span className="slider" />
      </label>
    </label>
    <button className="save-button" onClick={isCreating ? handleCreateSave : handleOverlaySave}>Save</button>
  </div>
)}

    </div>
  );
};

export default LicenseTable;