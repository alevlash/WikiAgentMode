import React, { useState } from 'react';
import { WikiService, WikiSearchResult } from '../services/WikiService';
import { WikiCard } from './WikiCard';

interface WikiListProps {
  wikiService?: WikiService;
}

export const WikiList: React.FC<WikiListProps> = ({ 
  wikiService = new WikiService() 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<WikiSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await wikiService.searchArticles(searchTerm);
      setArticles(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="wiki-list">
      <div className="wiki-list__search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter search term..."
          className="wiki-list__search-input"
          aria-label="Search Wikipedia articles"
          disabled={isLoading}
        />
        <button
          onClick={handleSearch}
          className="wiki-list__search-button"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="wiki-list__error" role="alert">
          {error}
        </div>
      )}

      <div className="wiki-list__grid">
        {articles.map((article) => (
          <WikiCard
            key={article.pageid}
            article={article}
          />
        ))}
      </div>

      {!error && articles.length === 0 && !isLoading && (
        <div className="wiki-list__empty">
          Enter a search term and click Search to find Wikipedia articles
        </div>
      )}
    </div>
  );
};

// Default styles for the WikiList
const styles = `
.wiki-list {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.wiki-list__search {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.wiki-list__search-input {
  flex: 1;
  padding: 8px 16px;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  transition: border-color 0.2s ease;
}

.wiki-list__search-input:focus {
  outline: none;
  border-color: #007bff;
}

.wiki-list__search-button {
  padding: 8px 24px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.wiki-list__search-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.wiki-list__search-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.wiki-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.wiki-list__error {
  padding: 12px;
  margin-bottom: 20px;
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.wiki-list__empty {
  text-align: center;
  color: #666;
  padding: 40px;
  font-size: 1.1rem;
}

@media (max-width: 600px) {
  .wiki-list__search {
    flex-direction: column;
  }

  .wiki-list__search-button {
    width: 100%;
  }
}
`;

// Insert styles into the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
