import { WikiService } from './WikiService';

describe('WikiService', () => {
  let wikiService: WikiService;

  beforeEach(() => {
    wikiService = new WikiService();
  });

  it('should fetch articles based on search term', async () => {
    const searchTerm = 'TypeScript programming language';
    const results = await wikiService.searchArticles(searchTerm);

    // Basic validation of the response structure
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);

    // Validate the first result has all required properties
    const firstResult = results[0];
    expect(firstResult).toHaveProperty('pageid');
    expect(firstResult).toHaveProperty('title');
    expect(firstResult).toHaveProperty('snippet');
    expect(firstResult).toHaveProperty('fullurl');

    // Verify that the results are related to TypeScript
    const titlesAndSnippets = results.map(r => 
      (r.title + ' ' + r.snippet).toLowerCase()
    );
    expect(
      titlesAndSnippets.some(text => 
        text.includes('typescript') || text.includes('programming')
      )
    ).toBe(true);
  }, 10000); // Increased timeout for real API call

  it('should handle errors gracefully', async () => {
    // Test with an invalid search term (empty string)
    await expect(wikiService.searchArticles('')).rejects.toThrow();
  });
});
