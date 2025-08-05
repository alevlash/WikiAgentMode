import axios from 'axios';

export interface WikiSearchResult {
  pageid: number;
  title: string;
  snippet: string;
  fullurl?: string;
}

export class WikiService {
  private readonly baseUrl = 'https://en.wikipedia.org/w/api.php';

  /**
   * Searches for Wikipedia articles based on a search term
   * @param searchTerm The term to search for
   * @returns Array of search results containing page information
   */
  async searchArticles(searchTerm: string): Promise<WikiSearchResult[]> {
    const params = {
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: searchTerm,
      utf8: '1',
      srlimit: 10,
      origin: '*',
    };

    try {
      const response = await axios.get(this.baseUrl, { params });
      const searchResults = response.data.query.search;

      // Get additional info for each article (like full URL)
      const titles = searchResults.map((result: any) => result.title).join('|');
      const infoParams = {
        action: 'query',
        format: 'json',
        titles,
        prop: 'info',
        inprop: 'url',
        origin: '*',
      };

      const infoResponse = await axios.get(this.baseUrl, { params: infoParams });
      const pages = infoResponse.data.query.pages;

      return searchResults.map((result: any) => ({
        pageid: result.pageid,
        title: result.title,
        snippet: result.snippet,
        fullurl: pages[result.pageid]?.fullurl
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch Wikipedia articles: ${error.message}`);
      }
      throw error;
    }
  }
}
