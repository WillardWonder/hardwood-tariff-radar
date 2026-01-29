import React from 'react';
import { TariffData, HTSCode } from '../types/tariff.types';

interface CurrentStatusProps {
  tariffData: TariffData;
  htsBreakdown: HTSCode[];
  daysUntil: number;
}

export const CurrentStatus: React.FC<CurrentStatusProps> = ({ 
  tariffData, 
  htsBreakdown, 
  daysUntil 
}) => {
  return (
    <div className="current-status">
      <div className="alert-banner critical">
        <div className="alert-icon">⚠️</div>
        <div className="alert-content">
          <strong>CRITICAL: November 10, 2026 - Reciprocal Tariff Extension Expires</strong>
          <p>
            Current 10% US-China reciprocal tariff expires in <strong>{daysUntil} days</strong>. 
            Without extension, rate could revert to 145%. Total effective rate currently{' '}
            <strong>{tariffData.effectiveTotal}</strong> (stacked tariffs).
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Current Effective Tariff</div>
          <div className="stat-value">{tariffData.effectiveTotal}</div>
          <div className="stat-change">
            <span className="source-badge verified">✓ AUTO-VERIFIED</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Reciprocal Rate</div>
          <div className="stat-value">{tariffData.reciprocal}%</div>
          <div className="stat-change">Expires Nov 10, 2026</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Section 301</div>
          <div className="stat-value">{tariffData.section301}%</div>
          <div className="stat-change">Pre-existing</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Fentanyl Tariff</div>
          <div className="stat-value">{tariffData.fentanyl}%</div>
          <div className="stat-change">Reduced from 20%</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">
            <span>📋</span>
            Tariff Breakdown by HTS Code
          </h2>
          <div className="source-badge">
            <span>📡</span>
            <span>UPDATED {new Date(tariffData.lastUpdated).toLocaleTimeString()}</span>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>HTS Code</th>
              <th>Product Description</th>
              <th>Reciprocal</th>
              <th>Fentanyl</th>
              <th>Section 301</th>
              <th>Total Effective</th>
            </tr>
          </thead>
          <tbody>
            {htsBreakdown.map((hts) => (
              <tr key={hts.code}>
                <td><strong>{hts.code}</strong></td>
                <td>{hts.description}</td>
                <td>{hts.reciprocal}%</td>
                <td>{hts.fentanyl}%</td>
                <td>{hts.section301}%</td>
                <td><strong>{hts.total}%</strong></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cvd-notice">
          <strong>*CVD = Countervailing Duty</strong>
          <p>
            Commerce Department issued preliminary affirmative CVD determination on hardwood 
            plywood from China (Jan 22, 2026). Additional duties pending final determination.
          </p>
        </div>
      </div>
    </div>
  );
};
