import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import './App.css';
import LicenseTable from './LicenseTable.js';

function App() {
  const licenses = [
    {
      domain: "https://eduspark.world",
      description: "Basics of STEM Collection",
      package: "Basics of STEM Collection",
      status: "Active"
    },
    {
      domain: "https://www.w3schools.com",
      description: "Human Body",
      package: "Basics of STEM Collection - Updated",
      status: "Inactive"
    },
    {
      domain: "https://app.gather.town",
      description: "Basics of STEM Collection",
      package: "Basics of STEM Collection",
      status: "Active"
    },
    {
      domain: "https://aisl-academy.com",
      description: "Asia International School Limited (AISL)",
      package: "Basics of STEM Collection",
      status: "Active"
    },
    {
      domain: "https://studio.aisl-academy.com",
      description: "Asia International School Limited (AISL)",
      package: "Basics of STEM Collection",
      status: "Active"
    },
    {
      domain: "https://lms.dreamtimelearningsystem.com",
      description: "Dreamtime Learning",
      package: "Basics of STEM Collection",
      status: "Active"
    },
    {
      domain: "https://hologo.world",
      description: "Katbook 1",
      package: "Human Body",
      status: "Active"
    },
    {
      domain: "https://katbook.com",
      description: "Katbook 2",
      package: "Basics of STEM Collection",
      status: "Inactive"
    }
  ];

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div className="main-content"> {/* Add this div */}
          <Routes>
            <Route path="/licenses" element={<LicenseTable licenses={licenses} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
