/**
 * The Code Map - State Management Module
 * Centralized state management for the application
 */

const AppState = {
  // Current navigation state
  currentCategory: 'all',
  currentSubcategory: null,
  
  // Search state
  searchQuery: '',
  
  // User data (persisted)
  favorites: [],
  customLinks: [],
  
  // UI state
  theme: 'dark',
  language: 'en',
  sidebarCollapsed: false,
  expandedCategories: new Set(),
  
  // Modal state
  editingLinkId: null,
  
  /**
   * Initialize state from localStorage
   */
  init() {
    this.favorites = this.parseJSON(localStorage.getItem('favorites'), []);
    this.customLinks = this.parseJSON(localStorage.getItem('customLinks'), []);
    this.theme = localStorage.getItem('theme') || 'dark';
    this.language = localStorage.getItem('language') || 'en';
  },
  
  /**
   * Safe JSON parse helper
   */
  parseJSON(str, defaultValue) {
    try {
      return str ? JSON.parse(str) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  /**
   * Persist state to localStorage
   */
  persist(key, value) {
    const storageKey = key === 'favorites' || key === 'customLinks' ? key : key;
    if (typeof value === 'object') {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } else {
      localStorage.setItem(storageKey, value);
    }
  },
  
  /**
   * Update state and optionally persist
   */
  set(key, value, shouldPersist = false) {
    this[key] = value;
    if (shouldPersist) {
      this.persist(key, value);
    }
  },
  
  /**
   * Toggle favorite
   */
  toggleFavorite(linkName) {
    const index = this.favorites.indexOf(linkName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(linkName);
    }
    this.persist('favorites', this.favorites);
    return this.favorites.includes(linkName);
  },
  
  /**
   * Add custom link
   */
  addCustomLink(link) {
    this.customLinks.push(link);
    this.persist('customLinks', this.customLinks);
  },
  
  /**
   * Update custom link
   */
  updateCustomLink(linkId, updates) {
    const index = this.customLinks.findIndex(l => l.id === linkId);
    if (index > -1) {
      this.customLinks[index] = { ...this.customLinks[index], ...updates };
      this.persist('customLinks', this.customLinks);
      return true;
    }
    return false;
  },
  
  /**
   * Delete custom link
   */
  deleteCustomLink(linkId) {
    this.customLinks = this.customLinks.filter(l => l.id !== linkId);
    this.persist('customLinks', this.customLinks);
  },
  
  /**
   * Toggle category expansion
   */
  toggleCategoryExpansion(categoryId) {
    if (this.expandedCategories.has(categoryId)) {
      this.expandedCategories.delete(categoryId);
      return false;
    } else {
      this.expandedCategories.add(categoryId);
      return true;
    }
  },
  
  /**
   * Generate unique ID
   */
  generateId() {
    return 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
};

// Initialize state on load
AppState.init();

// Export for use in other modules
window.AppState = AppState;
