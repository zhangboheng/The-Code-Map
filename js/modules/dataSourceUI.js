/**
 * The Code Map - Data Source UI Module
 * Handles the data source settings modal and synchronization UI
 */

const DataSourceUI = {
  // Current configuration
  currentSource: 'local',
  currentMethod: 'raw',
  
  /**
   * Initialize the data source UI
   */
  init() {
    this.bindEvents();
    this.updateStatus();
    
    // Listen for data loader events
    if (window.DataLoader) {
      // Update status when data is loaded
      const originalLoad = DataLoader.loadLinks.bind(DataLoader);
      DataLoader.loadLinks = async (...args) => {
        const result = await originalLoad(...args);
        this.updateStatus();
        return result;
      };
    }
  },
  
  /**
   * Bind event listeners
   */
  bindEvents() {
    // Open modal
    const dataSourceBtn = document.getElementById('dataSourceBtn');
    if (dataSourceBtn) {
      dataSourceBtn.addEventListener('click', () => this.openModal());
    }
    
    // Close modal
    const closeBtn = document.getElementById('dataSourceClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }
    
    // Close on overlay click
    const overlay = document.getElementById('dataSourceOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeModal();
        }
      });
    }
    
    // Source selection
    document.querySelectorAll('.source-option').forEach(option => {
      option.addEventListener('click', () => {
        const source = option.dataset.source;
        this.selectSource(source);
      });
    });
    
    // Method selection
    document.querySelectorAll('.method-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const method = btn.dataset.method;
        this.selectMethod(method);
      });
    });
    
    // Clear cache button
    const clearCacheBtn = document.getElementById('clearCacheBtn');
    if (clearCacheBtn) {
      clearCacheBtn.addEventListener('click', () => this.clearCache());
    }
    
    // Sync data button
    const syncDataBtn = document.getElementById('syncDataBtn');
    if (syncDataBtn) {
      syncDataBtn.addEventListener('click', () => this.syncData());
    }
  },
  
  /**
   * Open the modal
   */
  openModal() {
    const overlay = document.getElementById('dataSourceOverlay');
    if (overlay) {
      overlay.classList.add('active');
      this.updateStatus();
      this.loadSavedConfig();
    }
  },
  
  /**
   * Close the modal
   */
  closeModal() {
    const overlay = document.getElementById('dataSourceOverlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  },
  
  /**
   * Select data source
   * @param {string} source - 'local' or 'github'
   */
  selectSource(source) {
    this.currentSource = source;
    
    // Update UI
    document.querySelectorAll('.source-option').forEach(option => {
      option.classList.toggle('active', option.dataset.source === source);
    });
    
    // Show/hide GitHub config
    const githubConfig = document.getElementById('githubConfig');
    if (githubConfig) {
      githubConfig.classList.toggle('active', source === 'github');
    }
    
    // Show rate limit info for GitHub
    const rateLimitInfo = document.getElementById('rateLimitInfo');
    if (rateLimitInfo) {
      rateLimitInfo.style.display = source === 'github' ? 'flex' : 'none';
    }
    
    // Update status indicator
    this.updateStatusIndicator();
  },
  
  /**
   * Select GitHub method
   * @param {string} method - 'raw', 'api', or 'gist'
   */
  selectMethod(method) {
    this.currentMethod = method;
    
    // Update UI
    document.querySelectorAll('.method-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.method === method);
    });
    
    // Show/hide config inputs
    const rawUrlConfig = document.getElementById('rawUrlConfig');
    const apiConfig = document.getElementById('apiConfig');
    const apiConfig2 = document.getElementById('apiConfig2');
    const gistConfig = document.getElementById('gistConfig');
    
    if (rawUrlConfig) rawUrlConfig.style.display = method === 'raw' ? 'block' : 'none';
    if (apiConfig) apiConfig.style.display = method === 'api' ? 'block' : 'none';
    if (apiConfig2) apiConfig2.style.display = method === 'api' ? 'block' : 'none';
    if (gistConfig) gistConfig.style.display = method === 'gist' ? 'block' : 'none';
  },
  
  /**
   * Load saved configuration
   */
  loadSavedConfig() {
    try {
      const saved = localStorage.getItem('dataSourceConfig');
      if (saved) {
        const config = JSON.parse(saved);
        
        // Restore source selection
        if (config.primarySource) {
          this.selectSource(config.primarySource);
        }
        
        // Restore GitHub config
        if (config.github) {
          if (config.github.rawFileUrl) {
            const input = document.getElementById('githubRawUrl');
            if (input) input.value = config.github.rawFileUrl;
          }
          if (config.github.owner) {
            const input = document.getElementById('githubOwner');
            if (input) input.value = config.github.owner;
          }
          if (config.github.repo) {
            const input = document.getElementById('githubRepo');
            if (input) input.value = config.github.repo;
          }
          if (config.github.gistId) {
            const input = document.getElementById('githubGistId');
            if (input) input.value = config.github.gistId;
          }
          if (config.github.token) {
            const input = document.getElementById('githubTokenInput');
            if (input) input.value = config.github.token;
          }
          
          // Determine method from config
          if (config.github.rawFileUrl) {
            this.selectMethod('raw');
          } else if (config.github.gistId) {
            this.selectMethod('gist');
          } else if (config.github.owner && config.github.repo) {
            this.selectMethod('api');
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load saved config:', error);
    }
  },
  
  /**
   * Save configuration
   */
  saveConfig() {
    const config = {
      primarySource: this.currentSource,
      github: {}
    };
    
    // Get GitHub config based on method
    if (this.currentMethod === 'raw') {
      const rawUrl = document.getElementById('githubRawUrl');
      if (rawUrl && rawUrl.value) {
        config.github.rawFileUrl = rawUrl.value;
      }
    } else if (this.currentMethod === 'api') {
      const owner = document.getElementById('githubOwner');
      const repo = document.getElementById('githubRepo');
      if (owner && owner.value) config.github.owner = owner.value;
      if (repo && repo.value) config.github.repo = repo.value;
    } else if (this.currentMethod === 'gist') {
      const gistId = document.getElementById('githubGistId');
      if (gistId && gistId.value) {
        config.github.gistId = gistId.value;
      }
    }
    
    // Token (for all methods)
    const token = document.getElementById('githubTokenInput');
    if (token && token.value) {
      config.github.token = token.value;
    }
    
    // Save to localStorage
    localStorage.setItem('dataSourceConfig', JSON.stringify(config));
    
    // Apply to DataLoader
    if (window.DataLoader) {
      DataLoader.configure(config);
    }
    
    return config;
  },
  
  /**
   * Clear cache
   */
  async clearCache() {
    if (window.DataLoader) {
      DataLoader.clearCache();
      DataLoader.clearBackup();
      this.showMessage(I18n.t('cacheCleared'), 'success');
      this.updateStatus();
    }
  },
  
  /**
   * Sync data from source
   */
  async syncData() {
    const syncBtn = document.getElementById('syncDataBtn');
    const syncBtnText = document.getElementById('syncBtnText');
    
    if (!window.DataLoader) {
      this.showMessage('DataLoader not loaded', 'error');
      return;
    }
    
    // Show loading state
    if (syncBtn) syncBtn.disabled = true;
    if (syncBtnText) {
      syncBtnText.innerHTML = `<span class="sync-spinner"></span> ${I18n.t('syncing')}`;
    }
    
    try {
      // Save config first
      const config = this.saveConfig();
      
      // Force reload
      const data = await DataLoader.loadLinks(true);
      
      if (data && Object.keys(data).length > 0) {
        this.showMessage(I18n.t('syncSuccess'), 'success');
        
        // Trigger re-render if render module exists
        if (window.Render) {
          Render.renderAll();
        }
        
        this.updateStatus();
      } else {
        this.showMessage('Data is empty, please check configuration', 'error');
      }
    } catch (error) {
      console.error('Sync failed:', error);
      this.showMessage(`${I18n.t('syncFailed')} ${error.message}`, 'error');
    } finally {
      // Reset button state
      if (syncBtn) syncBtn.disabled = false;
      if (syncBtnText) {
        syncBtnText.textContent = I18n.t('syncData');
      }
    }
  },
  
  /**
   * Show message in modal
   * @param {string} message - Message text
   * @param {string} type - 'success', 'error', or 'info'
   */
  showMessage(message, type = 'info') {
    const msgEl = document.getElementById('syncMessage');
    if (msgEl) {
      msgEl.textContent = message;
      msgEl.className = `sync-message active ${type}`;
      
      // Auto hide after 3 seconds
      setTimeout(() => {
        msgEl.classList.remove('active');
      }, 3000);
    }
  },
  
  /**
   * Update status display
   */
  async updateStatus() {
    if (!window.DataLoader) return;
    
    const status = DataLoader.getStatus();
    
    // Update cache status
    const cacheStatus = document.getElementById('cacheStatus');
    if (cacheStatus) {
      const isValid = status.localCacheValid || status.githubCacheValid;
      cacheStatus.className = `status-dot ${isValid ? 'valid' : 'invalid'}`;
    }
    
    // Update backup status
    const backupStatus = document.getElementById('backupStatus');
    if (backupStatus) {
      backupStatus.className = `status-dot ${status.hasBackup ? 'valid' : 'invalid'}`;
    }
    
    // Update rate limit for GitHub
    if (status.primarySource === 'github') {
      await this.updateRateLimit();
    }
    
    // Update status indicator in header
    this.updateStatusIndicator();
  },
  
  /**
   * Update rate limit display
   */
  async updateRateLimit() {
    if (!window.DataLoader) return;
    
    try {
      const rateLimit = await DataLoader.checkRateLimit();
      if (!rateLimit) return;
      
      const rateLimitInfo = document.getElementById('rateLimitInfo');
      const rateLimitBar = document.getElementById('rateLimitBar');
      const rateLimitText = document.getElementById('rateLimitText');
      
      if (rateLimitInfo) {
        rateLimitInfo.style.display = 'flex';
      }
      
      if (rateLimitBar) {
        const percentage = (rateLimit.remaining / rateLimit.limit) * 100;
        rateLimitBar.style.width = `${percentage}%`;
        
        // Color based on remaining
        rateLimitBar.className = 'rate-limit-bar-fill';
        if (percentage < 20) {
          rateLimitBar.classList.add('danger');
        } else if (percentage < 50) {
          rateLimitBar.classList.add('warning');
        }
      }
      
      if (rateLimitText) {
        rateLimitText.textContent = `${rateLimit.remaining}/${rateLimit.limit}`;
      }
    } catch (error) {
      console.warn('Failed to update rate limit:', error);
    }
  },
  
  /**
   * Update status indicator in header
   */
  updateStatusIndicator() {
    const statusDot = document.getElementById('dataSourceStatus');
    if (!statusDot) return;
    
    if (!window.DataLoader) {
      statusDot.className = 'status-dot error';
      return;
    }
    
    const status = DataLoader.getStatus();
    
    if (status.primarySource === 'local') {
      statusDot.className = 'status-dot local';
    } else if (status.primarySource === 'github') {
      const isValid = status.githubCacheValid;
      statusDot.className = `status-dot ${isValid ? 'github' : 'offline'}`;
    }
  }
};

// Export for use in other modules
window.DataSourceUI = DataSourceUI;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  DataSourceUI.init();
});
