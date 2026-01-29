import React, { useState, useEffect } from 'react';
import { CurrentStatus } from './CurrentStatus';
import { ScenarioCards } from './ScenarioCards';
import { ImpactCalculator } from './ImpactCalculator';
import { DataSources } from './DataSources';
import { tariffScraper } from '../services/tariffScraper';
import { dataParser } from '../services/dataParser';
import { TariffData } from '../types/tariff.types';

export const TariffDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tariffData, setTariffData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const rawData = await tariffScraper.fetchCurrentTariffs();
      setTariffData(rawData);
    } catch (error) {
      console.error('Failed to load tariff data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="loading-overlay active">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Fetching Live Tariff Data</h2>
          <p>Querying USITC, Federal Register, and USTR...</p>
        </div>
      </div>
    );
  }

  if (!tariffData) {
    return (
      <div className="error-state">
        <h2>Failed to Load Data</h2>
        <button onClick={loadData}>Retry</button>
      </div>
    );
  }

  const parsedData = dataParser.parseTariffData(tariffData);
  const htsBreakdown = dataParser.getHTSBreakdown(parsedData);
  const scenarios = dataParser.getScenarios();
  const daysUntil = tariffScraper.calculateDaysUntil('2026-11-10');

  return (
    <div className="dashboard-container">
      <header className="radar-header">
        <div className="header-content">
          <div className="logo-area">
            <div className="radar-logo">
              TR
              <div className="live-pulse"></div>
            </div>
            <div className="logo-text">
              <h1>Hardwood Tariff Radar Live</h1>
              <div className="tagline">Auto-Updating Intelligence • Real-Time Data</div>
            </div>
          </div>
          
          <div className="header-actions">
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>Last updated: {new Date(tariffData.lastUpdated).toLocaleString()}</span>
            </div>
            
            <button 
              className="refresh-btn" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <span className={`refresh-icon ${refreshing ? 'spinning' : ''}`}>🔄</span>
              <span>Refresh Now</span>
            </button>
          </div>
        </div>
      </header>

      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => setActiveTab('current')}
        >
          <span className="tab-icon">📊</span>
          <span>Current Status</span>
        </button>
        
        <button 
          className={`nav-tab ${activeTab === 'scenarios' ? 'active' : ''}`}
          onClick={() => setActiveTab('scenarios')}
        >
          <span className="tab-icon">🎯</span>
          <span>Scenarios</span>
        </button>
        
        <button 
          className={`nav-tab ${activeTab === 'impact' ? 'active' : ''}`}
          onClick={() => setActiveTab('impact')}
        >
          <span className="tab-icon">💰</span>
          <span>Impact Calculator</span>
        </button>
        
        <button 
          className={`nav-tab ${activeTab === 'sources' ? 'active' : ''}`}
          onClick={() => setActiveTab('sources')}
        >
          <span className="tab-icon">🔍</span>
          <span>Data Sources</span>
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'current' && (
          <CurrentStatus 
            tariffData={parsedData} 
            htsBreakdown={htsBreakdown}
            daysUntil={daysUntil}
          />
        )}
        
        {activeTab === 'scenarios' && (
          <ScenarioCards scenarios={scenarios} />
        )}
        
        {activeTab === 'impact' && (
          <ImpactCalculator />
        )}
        
        {activeTab === 'sources' && (
          <DataSources 
            sources={tariffData.sources}
            isCached={tariffData.isCached}
            cacheNote={tariffData.cacheNote}
          />
        )}
      </div>
    </div>
  );
};
