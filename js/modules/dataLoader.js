/**
 * The Code Map - Data Loader Module
 * Handles loading and caching of links data from multiple sources
 * Supports: Local JSON, GitHub API, GitHub Raw Files
 */

const DataLoader = {
  // Cache for loaded data
  cache: {
    links: null,
    lastFetch: null,
    githubData: null,
    githubLastFetch: null
  },
  
  // Cache duration (5 minutes for local, 15 minutes for GitHub)
  CACHE_DURATION: 5 * 60 * 1000,
  GITHUB_CACHE_DURATION: 15 * 60 * 1000,
  
  // Data source configuration
  config: {
    // Primary source: local JSON file
    primarySource: 'local',
    
    // GitHub configuration (can be customized)
    github: {
      // Option 1: Raw file from GitHub repository
      rawFileUrl: null, // e.g., 'https://raw.githubusercontent.com/user/repo/main/data/links.json'
      
      // Option 2: GitHub API (for more control)
      apiBaseUrl: 'https://api.github.com',
      owner: null,      // GitHub repository owner
      repo: null,       // Repository name
      branch: 'main',   // Branch name
      dataPath: 'data/links.json', // Path to data file
      
      // Option 3: GitHub Gist (for simple data storage)
      gistId: null,     // Gist ID if using Gist
      
      // Authentication (optional, increases rate limit)
      token: null       // GitHub personal access token
    },
    
    // Fallback behavior
    fallbackToLocal: true,
    offlineMode: false
  },
  
  /**
   * Configure data sources
   * @param {Object} options - Configuration options
   */
  configure(options) {
    if (options.primarySource) {
      this.config.primarySource = options.primarySource;
    }
    
    if (options.github) {
      Object.assign(this.config.github, options.github);
    }
    
    if (options.fallbackToLocal !== undefined) {
      this.config.fallbackToLocal = options.fallbackToLocal;
    }
    
    console.log('DataLoader configured:', this.config);
  },
  
  /**
   * Check if cache is valid
   * @param {string} type - Cache type ('local' or 'github')
   */
  isCacheValid(type = 'local') {
    if (type === 'github') {
      if (!this.cache.githubData || !this.cache.githubLastFetch) return false;
      return Date.now() - this.cache.githubLastFetch < this.GITHUB_CACHE_DURATION;
    }
    
    if (!this.cache.links || !this.cache.lastFetch) return false;
    return Date.now() - this.cache.lastFetch < this.CACHE_DURATION;
  },
  
  /**
   * Load links data from configured source
   * @param {boolean} forceReload - Force reload from server
   * @returns {Promise<Object>} Links data
   */
  async loadLinks(forceReload = false) {
    const source = this.config.primarySource;
    
    // Try primary source first
    if (source === 'github') {
      try {
        const githubData = await this.loadFromGitHub(forceReload);
        if (githubData) {
          window.LINKS_DATA = githubData;
          return githubData;
        }
      } catch (error) {
        console.warn('GitHub source failed:', error.message);
        
        // Fallback to local if configured
        if (this.config.fallbackToLocal) {
          console.log('Falling back to local data source');
          return await this.loadFromLocal(forceReload);
        }
        
        // Return cached GitHub data if available
        if (this.cache.githubData) {
          console.warn('Using cached GitHub data');
          window.LINKS_DATA = this.cache.githubData;
          return this.cache.githubData;
        }
        
        throw error;
      }
    }
    
    // Default: load from local
    return await this.loadFromLocal(forceReload);
  },
  
  /**
   * Load data from local JSON file
   * @param {boolean} forceReload - Force reload
   * @returns {Promise<Object>} Links data
   */
  async loadFromLocal(forceReload = false) {
    if (!forceReload && this.isCacheValid('local')) {
      return this.cache.links;
    }
    
    try {
      const response = await fetch('data/links.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update cache
      this.cache.links = data;
      this.cache.lastFetch = Date.now();
      
      // Update global LINKS_DATA
      window.LINKS_DATA = data;
      
      return data;
    } catch (error) {
      console.error('Failed to load local data:', error);
      
      // Return cached data if available
      if (this.cache.links) {
        console.warn('Using cached local data');
        window.LINKS_DATA = this.cache.links;
        return this.cache.links;
      }
      
      // Try to load from localStorage backup
      const backup = this.loadFromLocalStorage();
      if (backup) {
        console.warn('Using localStorage backup');
        window.LINKS_DATA = backup;
        return backup;
      }
      
      return {};
    }
  },
  
  /**
   * Load data from GitHub
   * @param {boolean} forceReload - Force reload
   * @returns {Promise<Object>} Links data
   */
  async loadFromGitHub(forceReload = false) {
    if (!forceReload && this.isCacheValid('github')) {
      return this.cache.githubData;
    }
    
    const github = this.config.github;
    
    // Method 1: Raw file URL (simplest, no auth needed)
    if (github.rawFileUrl) {
      return await this.loadFromGitHubRaw(github.rawFileUrl, forceReload);
    }
    
    // Method 2: GitHub Gist
    if (github.gistId) {
      return await this.loadFromGitHubGist(github.gistId, forceReload);
    }
    
    // Method 3: GitHub API (requires owner and repo)
    if (github.owner && github.repo) {
      return await this.loadFromGitHubAPI(forceReload);
    }
    
    throw new Error('GitHub configuration incomplete. Need rawFileUrl, gistId, or owner+repo.');
  },
  
  /**
   * Load from GitHub raw file URL
   * @param {string} url - Raw file URL
   * @param {boolean} forceReload - Force reload
   * @returns {Promise<Object>} Links data
   */
  async loadFromGitHubRaw(url, forceReload = false) {
    if (!forceReload && this.isCacheValid('github')) {
      return this.cache.githubData;
    }
    
    try {
      // Add timestamp to bypass CDN cache
      const cacheBuster = forceReload ? `?t=${Date.now()}` : '';
      const response = await fetch(url + cacheBuster);
      
      if (!response.ok) {
        throw new Error(`GitHub raw file error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update cache
      this.cache.githubData = data;
      this.cache.githubLastFetch = Date.now();
      
      // Save to localStorage for offline access
      this.saveToLocalStorage(data);
      
      return data;
    } catch (error) {
      console.error('Failed to load from GitHub raw:', error);
      throw error;
    }
  },
  
  /**
   * Load from GitHub API (with authentication support)
   * @param {boolean} forceReload - Force reload
   * @returns {Promise<Object>} Links data
   */
  async loadFromGitHubAPI(forceReload = false) {
    if (!forceReload && this.isCacheValid('github')) {
      return this.cache.githubData;
    }
    
    const github = this.config.github;
    const url = `${github.apiBaseUrl}/repos/${github.owner}/${github.repo}/contents/${github.dataPath}?ref=${github.branch}`;
    
    const headers = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    // Add authentication if token provided
    if (github.token) {
      headers['Authorization'] = `token ${github.token}`;
    }
    
    try {
      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Consider adding a token.');
        }
        throw new Error(`GitHub API error! status: ${response.status}`);
      }
      
      const fileData = await response.json();
      
      // Decode base64 content
      const content = atob(fileData.content);
      const data = JSON.parse(content);
      
      // Update cache
      this.cache.githubData = data;
      this.cache.githubLastFetch = Date.now();
      
      // Save to localStorage for offline access
      this.saveToLocalStorage(data);
      
      return data;
    } catch (error) {
      console.error('Failed to load from GitHub API:', error);
      throw error;
    }
  },
  
  /**
   * Load from GitHub Gist
   * @param {string} gistId - Gist ID
   * @param {boolean} forceReload - Force reload
   * @returns {Promise<Object>} Links data
   */
  async loadFromGitHubGist(gistId, forceReload = false) {
    if (!forceReload && this.isCacheValid('github')) {
      return this.cache.githubData;
    }
    
    const github = this.config.github;
    const url = `${github.apiBaseUrl}/gists/${gistId}`;
    
    const headers = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (github.token) {
      headers['Authorization'] = `token ${github.token}`;
    }
    
    try {
      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        throw new Error(`GitHub Gist error! status: ${response.status}`);
      }
      
      const gistData = await response.json();
      
      // Find the links.json file in the gist
      const file = gistData.files['links.json'] || Object.values(gistData.files)[0];
      
      if (!file) {
        throw new Error('No links.json file found in gist');
      }
      
      const data = JSON.parse(file.content);
      
      // Update cache
      this.cache.githubData = data;
      this.cache.githubLastFetch = Date.now();
      
      // Save to localStorage for offline access
      this.saveToLocalStorage(data);
      
      return data;
    } catch (error) {
      console.error('Failed to load from GitHub Gist:', error);
      throw error;
    }
  },
  
  /**
   * Save data to localStorage for offline access
   * @param {Object} data - Links data
   */
  saveToLocalStorage(data) {
    try {
      const backup = {
        data,
        timestamp: Date.now(),
        source: this.config.primarySource
      };
      localStorage.setItem('linksDataBackup', JSON.stringify(backup));
      console.log('Data saved to localStorage backup');
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },
  
  /**
   * Load data from localStorage backup
   * @returns {Object|null} Links data or null
   */
  loadFromLocalStorage() {
    try {
      const backup = localStorage.getItem('linksDataBackup');
      if (!backup) return null;
      
      const parsed = JSON.parse(backup);
      
      // Check if backup is recent (within 24 hours)
      const BACKUP_MAX_AGE = 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp > BACKUP_MAX_AGE) {
        console.warn('localStorage backup is too old');
        return null;
      }
      
      return parsed.data;
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
      return null;
    }
  },
  
  /**
   * Check GitHub API rate limit status
   * @returns {Promise<Object>} Rate limit info
   */
  async checkRateLimit() {
    const url = 'https://api.github.com/rate_limit';
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      return {
        limit: data.rate.limit,
        remaining: data.rate.remaining,
        reset: new Date(data.rate.reset * 1000),
        isLimited: data.rate.remaining === 0
      };
    } catch (error) {
      console.error('Failed to check rate limit:', error);
      return null;
    }
  },
  
  /**
   * Get all categories
   * @returns {Promise<Array>} Array of categories
   */
  async getCategories() {
    const data = await this.loadLinks();
    return Object.entries(data).map(([id, category]) => ({
      id,
      ...category
    }));
  },
  
  /**
   * Get a specific category by ID
   * @param {string} categoryId - Category ID
   * @returns {Promise<Object|null>} Category data or null
   */
  async getCategory(categoryId) {
    const data = await this.loadLinks();
    return data[categoryId] || null;
  },
  
  /**
   * Get subcategory from a category
   * @param {string} categoryId - Category ID
   * @param {string} subcategoryId - Subcategory ID
   * @returns {Promise<Object|null>} Subcategory data or null
   */
  async getSubcategory(categoryId, subcategoryId) {
    const category = await this.getCategory(categoryId);
    if (!category || !category.subcategories) return null;
    return category.subcategories[subcategoryId] || null;
  },
  
  /**
   * Search links across all categories
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching links
   */
  async searchLinks(query) {
    const data = await this.loadLinks();
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    Object.entries(data).forEach(([catId, category]) => {
      if (category.subcategories) {
        Object.entries(category.subcategories).forEach(([subId, subcategory]) => {
          if (subcategory.items) {
            subcategory.items.forEach(item => {
              if (
                item.name.toLowerCase().includes(lowerQuery) ||
                (item.title && item.title.toLowerCase().includes(lowerQuery))
              ) {
                results.push({
                  ...item,
                  categoryId: catId,
                  categoryName: category.name,
                  subcategoryId: subId,
                  subcategoryName: subcategory.name
                });
              }
            });
          }
        });
      }
    });
    
    return results;
  },
  
  /**
   * Get total link count
   * @returns {Promise<number>} Total number of links
   */
  async getTotalCount() {
    const data = await this.loadLinks();
    let count = 0;
    
    Object.values(data).forEach(category => {
      if (category.subcategories) {
        Object.values(category.subcategories).forEach(subcategory => {
          if (subcategory.items) {
            count += subcategory.items.length;
          }
        });
      }
    });
    
    return count;
  },
  
  /**
   * Clear all caches
   */
  clearCache() {
    this.cache = {
      links: null,
      lastFetch: null,
      githubData: null,
      githubLastFetch: null
    };
    console.log('All caches cleared');
  },
  
  /**
   * Clear localStorage backup
   */
  clearBackup() {
    localStorage.removeItem('linksDataBackup');
    console.log('localStorage backup cleared');
  },
  
  /**
   * Force refresh from source
   * @returns {Promise<Object>} Fresh data
   */
  async refresh() {
    this.clearCache();
    return await this.loadLinks(true);
  },
  
  /**
   * Preload data
   */
  async preload() {
    try {
      await this.loadLinks();
      console.log('Data preloaded successfully');
    } catch (error) {
      console.error('Failed to preload data:', error);
    }
  },
  
  /**
   * Get data source status
   * @returns {Object} Status information
   */
  getStatus() {
    return {
      primarySource: this.config.primarySource,
      localCacheValid: this.isCacheValid('local'),
      githubCacheValid: this.isCacheValid('github'),
      hasBackup: !!localStorage.getItem('linksDataBackup'),
      githubConfig: {
        hasRawUrl: !!this.config.github.rawFileUrl,
        hasGistId: !!this.config.github.gistId,
        hasRepo: !!this.config.github.owner && !!this.config.github.repo,
        hasToken: !!this.config.github.token
      }
    };
  }
};

// Export for use in other modules
window.DataLoader = DataLoader;
