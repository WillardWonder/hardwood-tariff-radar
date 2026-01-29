import React from 'react';
import { ScenarioData } from '../types/tariff.types';

interface ScenarioCardsProps {
  scenarios: ScenarioData[];
}

export const ScenarioCards: React.FC<ScenarioCardsProps> = ({ scenarios }) => {
  const getScenarioClass = (id: string) => {
    if (id === 'A') return 'scenario-good';
    if (id === 'B') return 'scenario-medium';
    return 'scenario-bad';
  };

  return (
    <div className="scenarios-section">
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">Probability-Weighted Forecast Scenarios</h2>
        </div>

        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className={`scenario-card ${getScenarioClass(scenario.id)}`}>
              <div className="scenario-header">
                <div className="scenario-label">SCENARIO {scenario.id}</div>
                <div className="probability-badge">{scenario.probability}%</div>
              </div>
              
              <h3 className="scenario-title">{scenario.name}</h3>
              
              <p className="scenario-description">{scenario.description}</p>
              
              <div className="impact-metrics">
                <div className="metric-row">
                  <span className="metric-label">Price Impact</span>
                  <span className="metric-value">{scenario.priceImpact}</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Volume Impact</span>
                  <span className="metric-value">{scenario.volumeImpact}</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Jobs Impact</span>
                  <span className="metric-value">{scenario.jobsImpact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
