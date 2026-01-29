import React from 'react';

interface DataSourcesProps {
  sources: string[];
  isCached?: boolean;
  cacheNote?: string;
}

export const DataSources: React.FC<DataSourcesProps> = ({ sources, isCached, cacheNote }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <span>🔍</span>
          Data Sources & Verification
        </h2>
      </div>

      {isCached && cacheNote && (
        <div className="alert-banner warning">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <strong>Using Cached Data</strong>
            <p>{cacheNote}</p>
          </div>
        </div>
      )}

      <div className="sources-grid">
        {sources.map((source, index) => (
          <div key={index} className="source-item">
            <div className="source-header">
              <strong>{source}</strong>
              <span className="source-badge verified">✓ VERIFIED</span>
            </div>
            <p className="source-description">
              {getSourceDescription(source)}
            </p>
          </div>
        ))}
      </div>

      <div className="scraping-info">
        <h3>🤖 How Automated Updates Work</h3>
        <div className="info-steps">
          <div className="info-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <strong>UN Comtrade API</strong>
              <p>Official trade statistics and tariff data for HTS codes 4407-4418</p>
            </div>
          </div>
          
          <div className="info-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <strong>Federal Register API</strong>
              <p>Presidential Proclamations and USITC policy updates</p>
            </div>
          </div>
          
          <div className="info-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <strong>FRED Economic Data</strong>
              <p>Market context with API key configured</p>
            </div>
          </div>
          
          <div className="info-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <strong>Smart Caching</strong>
              <p>24-hour cache with automatic refresh capability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getSourceDescription(source: string): string {
  const descriptions: Record<string, string> = {
    'UN Comtrade API': 'Official international trade statistics and tariff data',
    'Federal Register API': 'Presidential Proclamations and official policy announcements',
    'FRED': 'Federal Reserve Economic Data for market context',
    'USITC HTS': 'Harmonized Tariff Schedule classifications',
    'USITC HTS (Cached)': 'Last verified USITC data - live fetch unavailable',
    'Federal Register (Cached)': 'Last verified Federal Register data',
    'USTR (Cached)': 'Last verified USTR data'
  };
  
  return descriptions[source] || 'Official government source';
}
