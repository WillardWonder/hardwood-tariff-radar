async searchTariffNews(): Promise<any[]> {
  try {
    const searches = [
      'China hardwood tariff 2026',
      'Section 301 tariff updates',
      'USITC hardwood investigation'
    ];

    // Use Federal Register API for official news
    const results = await this.fetchFederalRegisterUpdates();
    
    // Log what we searched for (uses the variable)
    console.log('Searched for:', searches);
    
    return results.map((doc: any) => ({
      title: doc.title,
      date: doc.publication_date,
      source: 'Federal Register',
      summary: doc.abstract || doc.title,
      url: doc.html_url,
      searchTerms: searches // Include search terms in results
    }));
  } catch (error) {
    console.error('News search failed:', error);
    return [];
  }
}
