import axios from 'axios';

const COMTRADE_BASE = 'https://comtradeapi.un.org/public/v1';

export interface ComtradeParams {
  reporterCode?: number;
  partnerCode?: number;
  cmdCode?: string;
  flowCode?: string;
  period?: string;
}

export class ComtradeAPI {
  
  async getTradeData(params: ComtradeParams): Promise<any> {
    try {
      const response = await axios.get(`${COMTRADE_BASE}/getDA`, {
        params: {
          reporterCode: params.reporterCode || 842, // USA
          partnerCode: params.partnerCode || 156, // China
          cmdCode: params.cmdCode || '44',
          flowCode: params.flowCode || 'M',
          ...params
        },
        timeout: 15000
      });

      return response.data;
    } catch (error) {
      console.error('Comtrade getDA failed:', error);
      throw error;
    }
  }

  async getTariffLine(reporter: number, partner: number, cmdCode: string): Promise<any> {
    try {
      const response = await axios.get(`${COMTRADE_BASE}/getTariffline`, {
        params: {
          reporter,
          partner,
          cmdCode
        },
        timeout: 15000
      });

      return response.data;
    } catch (error) {
      console.error('Comtrade getTariffline failed:', error);
      throw error;
    }
  }

  async getMetadata(): Promise<any> {
    try {
      const response = await axios.get(`${COMTRADE_BASE}/getMetadata`, {
        timeout: 10000
      });

      return response.data;
    } catch (error) {
      console.error('Comtrade metadata failed:', error);
      throw error;
    }
  }

  async getHSCodes(): Promise<any> {
    try {
      // Get HS codes for wood products (Chapter 44)
      const response = await axios.get(`${COMTRADE_BASE}/getHS`, {
        params: {
          classification: 'HS',
          code: '44'
        },
        timeout: 10000
      });

      return response.data;
    } catch (error) {
      console.error('HS codes fetch failed:', error);
      return null;
    }
  }

  // Specific hardwood product codes
  getHardwoodCodes(): string[] {
    return [
      '4407', // Wood sawn or chipped lengthwise
      '4408', // Sheets for veneering
      '4409', // Wood continuously shaped
      '4412', // Plywood, veneered panels
      '4418', // Builders' joinery and carpentry
    ];
  }

  async getUSChinaHardwoodTrade(): Promise<any> {
    try {
      const codes = this.getHardwoodCodes();
      const results = await Promise.all(
        codes.map(code => this.getTradeData({
          reporterCode: 842,
          partnerCode: 156,
          cmdCode: code,
          flowCode: 'M' // Imports
        }))
      );

      return {
        codes,
        data: results,
        fetchedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('US-China hardwood trade fetch failed:', error);
      return null;
    }
  }
}

export const comtradeAPI = new ComtradeAPI();
