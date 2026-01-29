import { TariffData, HTSCode, ScenarioData } from '../types/tariff.types';

export class DataParser {
  
  parseTariffData(rawData: any): TariffData {
    return {
      reciprocal: rawData.reciprocal || 10,
      fentanyl: rawData.fentanyl || 10,
      section301: rawData.section301 || '25-30',
      section232: rawData.section232 || 0,
      effectiveTotal: this.calculateEffectiveTotal(rawData),
      lastUpdated: new Date(rawData.lastUpdated || Date.now()),
      sources: rawData.sources || []
    };
  }

  calculateEffectiveTotal(data: any): string {
    const reciprocal = data.reciprocal || 10;
    const fentanyl = data.fentanyl || 10;
    const section232 = data.section232 || 0;
    
    const section301Range = (data.section301 || '25-30').split('-');
    const min = reciprocal + fentanyl + section232 + parseInt(section301Range[0]);
    const max = reciprocal + fentanyl + section232 + parseInt(section301Range[1] || section301Range[0]);
    
    return min === max ? `${min}%` : `${min}-${max}%`;
  }

  getHTSBreakdown(tariffData: TariffData): HTSCode[] {
    return [
      {
        code: '4407.11-19',
        description: 'Coniferous Wood (Sawn/Sliced)',
        reciprocal: tariffData.reciprocal,
        fentanyl: tariffData.fentanyl,
        section301: 25,
        total: tariffData.reciprocal + tariffData.fentanyl + 25
      },
      {
        code: '4407.21-29',
        description: 'Tropical Wood (Sawn/Sliced)',
        reciprocal: tariffData.reciprocal,
        fentanyl: tariffData.fentanyl,
        section301: 25,
        total: tariffData.reciprocal + tariffData.fentanyl + 25
      },
      {
        code: '4407.91-99',
        description: 'Other Wood (Hardwoods)',
        reciprocal: tariffData.reciprocal,
        fentanyl: tariffData.fentanyl,
        section301: 27.5, // Average of 25-30
        total: tariffData.reciprocal + tariffData.fentanyl + 27.5
      },
      {
        code: '4408.10-90',
        description: 'Veneer Sheets',
        reciprocal: tariffData.reciprocal,
        fentanyl: tariffData.fentanyl,
        section301: 25,
        total: tariffData.reciprocal + tariffData.fentanyl + 25
      },
      {
        code: '4412.31-34',
        description: 'Hardwood Plywood',
        reciprocal: tariffData.reciprocal,
        fentanyl: tariffData.fentanyl,
        section301: 25,
        total: tariffData.reciprocal + tariffData.fentanyl + 25
      }
    ];
  }

  getScenarios(): ScenarioData[] {
    return [
      {
        id: 'A',
        name: 'Status Quo Extension',
        probability: 50,
        description: '10% reciprocal rate extended beyond Nov 10, 2026. Current ~45-50% effective rate maintained.',
        priceImpact: '0% to -3%',
        volumeImpact: 'Stable',
        jobsImpact: 'Minimal'
      },
      {
        id: 'B',
        name: 'Section 232 Addition',
        probability: 25,
        description: 'Commerce adds hardwoods to Section 232. New 10-25% tariff stacks (total: 55-75%).',
        priceImpact: '-15% to -20%',
        volumeImpact: '-40% to -50%',
        jobsImpact: '-1,500 to -2,500'
      },
      {
        id: 'C',
        name: 'Reciprocal Reversion',
        probability: 25,
        description: 'Reciprocal rate reverts to 145%. Total effective 180-185%. Trade collapse.',
        priceImpact: '-30% to -40%',
        volumeImpact: '-95% to -98%',
        jobsImpact: '-4,000 to -6,000'
      }
    ];
  }

  calculateCompanyImpact(
    revenue: number,
    exportPct: number,
    chinaPct: number,
    headcount: number
  ) {
    const chinaRevenue = revenue * (exportPct / 100) * (chinaPct / 100);
    
    // Scenario C: -90% volume
    const revenueAtRisk = chinaRevenue * 0.9;
    
    // Probability-weighted: 50% * 0% + 25% * -15% + 25% * -35% = -12.5% avg
    const expectedRevenue = revenue * 0.947; // 5.3% decline
    
    // Jobs proportional to revenue
    const jobsAtRisk = Math.round(headcount * (revenueAtRisk / revenue));
    const expectedJobs = Math.round(headcount * 0.053);
    
    return {
      revenue,
      exportPct,
      chinaPct,
      headcount,
      revenueAtRisk,
      jobsAtRisk,
      expectedRevenue,
      expectedJobs
    };
  }
}

export const dataParser = new DataParser();
