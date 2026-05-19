/**
 * The Code Map - Enhanced Search Module
 * Handles search and filtering logic with fuzzy matching, history, and suggestions
 */

const Search = {
  // Search history (persisted)
  history: [],
  maxHistorySize: 10,
  
  // Search suggestions cache
  suggestionsCache: null,
  
  // Fuzzy search configuration
  fuzzyConfig: {
    threshold: 0.4, // Match threshold (0-1, lower = stricter)
    minMatchLength: 2,
    maxResults: 50
  },
  
  /**
   * Initialize search module
   */
  init() {
    this.loadHistory();
  },
  
  /**
   * Load search history from localStorage
   */
  loadHistory() {
    try {
      const saved = localStorage.getItem('searchHistory');
      this.history = saved ? JSON.parse(saved) : [];
    } catch {
      this.history = [];
    }
  },
  
  /**
   * Save search history to localStorage
   */
  saveHistory() {
    try {
      localStorage.setItem('searchHistory', JSON.stringify(this.history));
    } catch (e) {
      console.warn('Failed to save search history:', e);
    }
  },
  
  /**
   * Add query to search history
   * @param {string} query - Search query
   */
  addToHistory(query) {
    if (!query || query.trim().length < 2) return;
    
    query = query.trim();
    
    // Remove if already exists (will be added to front)
    this.history = this.history.filter(h => h.toLowerCase() !== query.toLowerCase());
    
    // Add to front
    this.history.unshift(query);
    
    // Limit size
    if (this.history.length > this.maxHistorySize) {
      this.history = this.history.slice(0, this.maxHistorySize);
    }
    
    this.saveHistory();
  },
  
  /**
   * Clear search history
   */
  clearHistory() {
    this.history = [];
    this.saveHistory();
  },
  
  /**
   * Get search history
   * @returns {Array} Search history
   */
  getHistory() {
    return [...this.history];
  },
  
  /**
   * Calculate Levenshtein distance between two strings
   * @param {string} a - First string
   * @param {string} b - Second string
   * @returns {number} Distance
   */
  levenshteinDistance(a, b) {
    const matrix = [];
    
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  },
  
  /**
   * Calculate fuzzy match score
   * @param {string} text - Text to search in
   * @param {string} query - Search query
   * @returns {number} Match score (0-1, higher = better match)
   */
  fuzzyScore(text, query) {
    if (!text || !query) return 0;
    
    text = text.toLowerCase();
    query = query.toLowerCase();
    
    // Exact match
    if (text === query) return 1;
    
    // Contains match
    if (text.includes(query)) {
      return 0.9 - (text.length - query.length) / text.length * 0.1;
    }
    
    // Check for word starts matching (e.g., "gh" matches "GitHub")
    const words = text.split(/\s+/);
    let wordMatchScore = 0;
    
    for (const word of words) {
      if (word.startsWith(query)) {
        wordMatchScore = Math.max(wordMatchScore, 0.8);
      }
    }
    
    // Check for acronym match (e.g., "ai" matches "Artificial Intelligence")
    const acronym = words.map(w => w.charAt(0)).join('');
    if (acronym.includes(query)) {
      wordMatchScore = Math.max(wordMatchScore, 0.7);
    }
    
    // Fuzzy character matching
    let queryIndex = 0;
    let lastMatchIndex = -1;
    let consecutiveMatches = 0;
    let totalMatches = 0;
    
    for (let i = 0; i < text.length && queryIndex < query.length; i++) {
      if (text[i] === query[queryIndex]) {
        totalMatches++;
        if (lastMatchIndex === i - 1) {
          consecutiveMatches++;
        }
        lastMatchIndex = i;
        queryIndex++;
      }
    }
    
    if (queryIndex === query.length) {
      const coverage = totalMatches / query.length;
      const consecBonus = consecutiveMatches / query.length * 0.3;
      const fuzzyScore = 0.5 * coverage + consecBonus;
      return Math.max(wordMatchScore, fuzzyScore);
    }
    
    // Use Levenshtein distance for partial matches
    const distance = this.levenshteinDistance(text.slice(0, query.length + 3), query);
    const maxLen = Math.max(text.length, query.length);
    const similarity = 1 - distance / maxLen;
    
    return Math.max(0, similarity * 0.4);
  },
  
  /**
   * Fuzzy search in links
   * @param {Array} links - Array of link objects
   * @param {string} query - Search query
   * @returns {Array} - Filtered and scored links
   */
  fuzzySearch(links, query) {
    if (!query || query.trim() === '') {
      return links;
    }
    
    const searchTerm = query.trim();
    const results = [];
    
    for (const link of links) {
      let bestScore = 0;
      let matchField = '';
      
      // Score by name (highest priority)
      if (link.name) {
        const score = this.fuzzyScore(link.name, searchTerm);
        if (score > bestScore) {
          bestScore = score;
          matchField = 'name';
        }
      }
      
      // Score by title/description
      if (link.title) {
        const score = this.fuzzyScore(link.title, searchTerm) * 0.9;
        if (score > bestScore) {
          bestScore = score;
          matchField = 'title';
        }
      }
      
      // Score by URL
      if (link.url) {
        const urlText = link.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
        const score = this.fuzzyScore(urlText, searchTerm) * 0.7;
        if (score > bestScore) {
          bestScore = score;
          matchField = 'url';
        }
      }
      
      // Score by tags
      if (link.tags && Array.isArray(link.tags)) {
        for (const tag of link.tags) {
          const score = this.fuzzyScore(tag, searchTerm) * 0.85;
          if (score > bestScore) {
            bestScore = score;
            matchField = 'tag';
          }
        }
      }
      
      // Score by category name (if available)
      if (link.categoryName) {
        const score = this.fuzzyScore(link.categoryName, searchTerm) * 0.6;
        if (score > bestScore) {
          bestScore = score;
          matchField = 'category';
        }
      }
      
      if (bestScore >= this.fuzzyConfig.threshold) {
        results.push({
          ...link,
          _searchScore: bestScore,
          _matchField: matchField
        });
      }
    }
    
    // Sort by score (descending)
    results.sort((a, b) => b._searchScore - a._searchScore);
    
    // Limit results
    return results.slice(0, this.fuzzyConfig.maxResults);
  },
  
  /**
   * Filter links by search query (with fuzzy matching)
   * @param {Array} links - Array of link objects
   * @param {string} query - Search query
   * @returns {Array} - Filtered links
   */
  filterLinks(links, query) {
    return this.fuzzySearch(links, query);
  },
  
  /**
   * Filter links by tags
   * @param {Array} links - Array of link objects
   * @param {Array} tags - Array of tags to filter by
   * @returns {Array} - Filtered links
   */
  filterByTags(links, tags) {
    if (!tags || tags.length === 0) {
      return links;
    }
    
    return links.filter(link => {
      if (!link.tags || !Array.isArray(link.tags)) {
        return false;
      }
      return tags.some(tag => link.tags.includes(tag));
    });
  },
  
  /**
   * Filter links by region
   * @param {Array} links - Array of link objects
   * @param {string} region - Region code (usa, cn, eu, jp, tw)
   * @returns {Array} - Filtered links
   */
  filterByRegion(links, region) {
    if (!region) {
      return links;
    }
    
    return links.filter(link => link.region === region);
  },
  
  /**
   * Filter links by pricing
   * @param {Array} links - Array of link objects
   * @param {string} pricing - Pricing type (free, paid, freemium)
   * @returns {Array} - Filtered links
   */
  filterByPricing(links, pricing) {
    if (!pricing) {
      return links;
    }
    
    return links.filter(link => link.pricing === pricing);
  },
  
  /**
   * Sort links by different criteria
   * @param {Array} links - Array of link objects
   * @param {string} sortBy - Sort criteria (name, popularity, addedAt, relevance)
   * @param {string} order - Sort order (asc, desc)
   * @returns {Array} - Sorted links
   */
  sortLinks(links, sortBy = 'name', order = 'asc') {
    const sorted = [...links].sort((a, b) => {
      let valueA, valueB;
      
      switch (sortBy) {
        case 'name':
          valueA = (a.name || '').toLowerCase();
          valueB = (b.name || '').toLowerCase();
          break;
        case 'popularity':
          valueA = a.popularity || 0;
          valueB = b.popularity || 0;
          break;
        case 'addedAt':
          valueA = new Date(a.addedAt || 0).getTime();
          valueB = new Date(b.addedAt || 0).getTime();
          break;
        case 'relevance':
          valueA = a._searchScore || 0;
          valueB = b._searchScore || 0;
          break;
        default:
          valueA = (a.name || '').toLowerCase();
          valueB = (b.name || '').toLowerCase();
      }
      
      if (order === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
    
    return sorted;
  },
  
  /**
   * Parse search query for advanced search
   * Supports: #tag, region:xxx, pricing:xxx
   * @param {string} query - Raw search query
   * @returns {Object} - Parsed search object {text, tags, region, pricing}
   */
  parseQuery(query) {
    const result = {
      text: '',
      tags: [],
      region: null,
      pricing: null
    };
    
    if (!query) return result;
    
    // Extract tags (#tag)
    const tagMatches = query.match(/#(\w+)/g);
    if (tagMatches) {
      result.tags = tagMatches.map(t => t.substring(1).toLowerCase());
      query = query.replace(/#\w+/g, '').trim();
    }
    
    // Extract region (region:xxx)
    const regionMatch = query.match(/region:(\w+)/i);
    if (regionMatch) {
      result.region = regionMatch[1].toLowerCase();
      query = query.replace(/region:\w+/i, '').trim();
    }
    
    // Extract pricing (pricing:xxx)
    const pricingMatch = query.match(/pricing:(\w+)/i);
    if (pricingMatch) {
      result.pricing = pricingMatch[1].toLowerCase();
      query = query.replace(/pricing:\w+/i, '').trim();
    }
    
    result.text = query.trim();
    return result;
  },
  
  /**
   * Advanced search with parsed query
   * @param {Array} links - Array of link objects
   * @param {string} query - Raw search query
   * @returns {Array} - Filtered and sorted links
   */
  advancedSearch(links, query) {
    const parsed = this.parseQuery(query);
    
    let results = links;
    
    // Filter by text (with fuzzy matching)
    if (parsed.text) {
      results = this.fuzzySearch(results, parsed.text);
    }
    
    // Filter by tags
    if (parsed.tags.length > 0) {
      results = this.filterByTags(results, parsed.tags);
    }
    
    // Filter by region
    if (parsed.region) {
      results = this.filterByRegion(results, parsed.region);
    }
    
    // Filter by pricing
    if (parsed.pricing) {
      results = this.filterByPricing(results, parsed.pricing);
    }
    
    // Sort by relevance if text search was performed
    if (parsed.text && results.length > 0 && results[0]._searchScore !== undefined) {
      results = this.sortLinks(results, 'relevance', 'desc');
    }
    
    return results;
  },
  
  /**
   * Generate search suggestions based on links data
   * @param {Array} links - All links
   * @param {string} query - Current query
   * @returns {Array} - Suggestions
   */
  getSuggestions(links, query) {
    if (!query || query.length < 2) {
      return this.getHistory().slice(0, 5);
    }
    
    const suggestions = new Set();
    const lowerQuery = query.toLowerCase();
    
    // Add matching names
    for (const link of links) {
      if (link.name && link.name.toLowerCase().includes(lowerQuery)) {
        suggestions.add(link.name);
      }
      
      // Add matching tags
      if (link.tags) {
        for (const tag of link.tags) {
          if (tag.toLowerCase().includes(lowerQuery)) {
            suggestions.add(`#${tag}`);
          }
        }
      }
    }
    
    // Add matching history items
    for (const item of this.history) {
      if (item.toLowerCase().includes(lowerQuery)) {
        suggestions.add(item);
      }
    }
    
    return Array.from(suggestions).slice(0, 8);
  },
  
  /**
   * Highlight search match in text
   * @param {string} text - Original text
   * @param {string} query - Search query
   * @returns {string} - HTML with highlighted matches
   */
  highlightMatch(text, query) {
    if (!text || !query) return text;
    
    const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  },
  
  /**
   * Escape regex special characters
   * @param {string} str - String to escape
   * @returns {string} - Escaped string
   */
  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },
  
  /**
   * Extract all unique tags from links
   * @param {Array} links - All links
   * @returns {Array} - Unique tags sorted by frequency
   */
  extractTags(links) {
    const tagCounts = {};
    
    for (const link of links) {
      if (link.tags && Array.isArray(link.tags)) {
        for (const tag of link.tags) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      }
    }
    
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  },
  
  /**
   * Get quick filter options
   * @param {Array} links - All links
   * @returns {Object} - Filter options {regions, pricings, tags}
   */
  getFilterOptions(links) {
    const regions = new Set();
    const pricings = new Set();
    const tags = new Set();
    
    for (const link of links) {
      if (link.region) regions.add(link.region);
      if (link.pricing) pricings.add(link.pricing);
      if (link.tags) link.tags.forEach(t => tags.add(t));
    }
    
    return {
      regions: Array.from(regions).sort(),
      pricings: Array.from(pricings).sort(),
      tags: Array.from(tags).sort()
    };
  }
};

// Initialize on load
Search.init();

// Export for use in other modules
window.Search = Search;
