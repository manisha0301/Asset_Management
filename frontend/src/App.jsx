import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import AssetList from './AssetList';
import AssetSubCategories from './AssetSubCategories';
import AssetRequestList from './AssetRequestList';
import AssetIssueList from './AssetIssue';
import AssetStatus from './AssetStatus';

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderMainContent = () => {
    if (currentPage === 'asset') {
      return <AssetList />;
    } else if (currentPage === 'asset-sub-categories') {
      return <AssetSubCategories />;  
    }
    else if (currentPage === 'asset-request') {
      return <AssetRequestList />;  
    }
    else if (currentPage === 'asset-issue') {
      return <AssetIssueList />;  
    }
    else if (currentPage === 'asset-status') {
      return <AssetStatus />;  
    }
    return (
      <MainContent 
        setSidebarVisible={setSidebarVisible} 
        sidebarVisible={sidebarVisible}
        currentPage={currentPage}
      />
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        sidebarVisible={sidebarVisible} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex-1 flex flex-col">
        
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" 
                  onClick={() => setSidebarVisible(!sidebarVisible)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                  <option>Select Language</option>
                </select>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            </div>
          </header>
        {renderMainContent()}
      </div>
    </div>
  );
}