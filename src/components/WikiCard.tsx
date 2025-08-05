import React from 'react';
import { WikiSearchResult } from '../services/WikiService';

interface WikiCardProps {
  article: WikiSearchResult;
  onClick?: (article: WikiSearchResult) => void;
}

export const WikiCard: React.FC<WikiCardProps> = ({ article, onClick }) => {
  // Function to safely render HTML from Wikipedia snippets
  const createMarkup = () => ({ __html: article.snippet });

  const handleClick = () => {
    if (onClick) {
      onClick(article);
    } else if (article.fullurl) {
      window.open(article.fullurl, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <div
      className="wiki-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      }}
    >
      <h3 className="wiki-card__title">{article.title}</h3>
      <div 
        className="wiki-card__snippet"
        dangerouslySetInnerHTML={createMarkup()}
      />
      <div className="wiki-card__footer">
        <span className="wiki-card__page-id">ID: {article.pageid}</span>
        {article.fullurl && (
          <a
            href={article.fullurl}
            className="wiki-card__link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Read More
          </a>
        )}
      </div>
    </div>
  );
};

// Default styles for the WikiCard
const styles = `
.wiki-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  background-color: #ffffff;
  max-width: 400px;
}

.wiki-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.wiki-card:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.wiki-card__title {
  margin: 0 0 12px 0;
  font-size: 1.25rem;
  color: #333;
}

.wiki-card__snippet {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
}

.wiki-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  font-size: 0.75rem;
}

.wiki-card__page-id {
  color: #999;
}

.wiki-card__link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.wiki-card__link:hover {
  text-decoration: underline;
}
`;

// Insert styles into the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
