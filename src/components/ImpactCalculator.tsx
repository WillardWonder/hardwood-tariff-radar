import { useState } from 'react';
import { dataParser } from '../services/dataParser';

export const ImpactCalculator = () => {
  const [revenue, setRevenue] = useState(45);
  const [exportPct, setExportPct] = useState(35);
  const [chinaPct, setChinaPct] = useState(60);
  const [headcount, setHeadcount] = useState(185);

  const impact = dataParser.calculateCompanyImpact(revenue, exportPct, chinaPct, headcount);

  return (
    <div className="impact-calculator">
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">
            <span>🏭</span>
            Company Impact Calculator
          </h2>
        </div>

        <div className="input-grid">
          <div className="input-group">
            <label className="input-label">Annual Revenue ($M)</label>
            <input
              type="number"
              className="input-field"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Export Mix (%)</label>
            <input
              type="number"
              className="input-field"
              value={exportPct}
              onChange={(e) => setExportPct(Number(e.target.value))}
              min="0"
              max="100"
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">China Exposure (%)</label>
            <input
              type="number"
              className="input-field"
              value={chinaPct}
              onChange={(e) => setChinaPct(Number(e.target.value))}
              min="0"
              max="100"
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Total Employees</label>
            <input
              type="number"
              className="input-field"
              value={headcount}
              onChange={(e) => setHeadcount(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="stats-grid" style={{ marginTop: '2rem' }}>
          <div className="stat-card">
            <div className="stat-label">Revenue at Risk (Scenario C)</div>
            <div className="stat-value">${impact.revenueAtRisk.toFixed(2)}M</div>
            <div className="stat-change negative">
              ↓ {((impact.revenueAtRisk / impact.revenue) * 100).toFixed(1)}% of total
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-label">Jobs at Risk</div>
            <div className="stat-value">{impact.jobsAtRisk}</div>
            <div className="stat-change negative">
              ⚠️ {((impact.jobsAtRisk / impact.headcount) * 100).toFixed(0)}% of workforce
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-label">Expected Revenue (Weighted)</div>
            <div className="stat-value">${impact.expectedRevenue.toFixed(1)}M</div>
            <div className="stat-change warning">
              ↓ {(((impact.revenue - impact.expectedRevenue) / impact.revenue) * 100).toFixed(1)}% decline
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-label">Expected Jobs Impact</div>
            <div className="stat-value">{impact.expectedJobs}</div>
            <div className="stat-change warning">Probability-weighted</div>
          </div>
        </div>

        <div className="troy-quote">
          <div className="quote-icon">📌</div>
          <div className="quote-content">
            <strong>Troy Brown Key Message:</strong>
            <p>
              We have stopped reinvesting in our mills because we cannot predict whether our export 
              markets will exist in 90 days. That is not a business decision—that is policy uncertainty 
              destroying American manufacturing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
