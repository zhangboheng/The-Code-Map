/**
 * The Code Map - Main Application Entry
 * Refactored with modular architecture
 */

(function() {
  'use strict';

  // ============================================
  // Application Controller
  // ============================================
  const App = {
    // Search state
    searchState: {
      selectedIndex: -1,
      isShowingSuggestions: false
    },
    
    /**
     * Initialize the application
     */
    async init() {
      // Initialize render elements
      Render.initElements();
      
      // Apply saved theme and language
      Render.applyTheme(AppState.theme);
      Render.applyLanguage(AppState.language);
      
      // Try to load fresh data from JSON (falls back to cached/static data)
      try {
        await DataLoader.loadLinks();
      } catch (error) {
        console.warn('Using static data fallback:', error.message);
      }
      
      // Initial render
      Render.renderSidebar();
      Render.renderCollapsedNav();
      Render.renderLinks();
      
      // Bind events
      this.bindEvents();
      this.bindModalEvents();
      this.bindSearchEvents();
      
      // Update link count
      Render.updateLinkCount();
    },

    // ============================================
    // Category Selection
    // ============================================
    selectCategory(categoryId) {
      AppState.currentCategory = categoryId;
      AppState.currentSubcategory = null;
      
      if (categoryId !== 'all' && categoryId !== 'favorites') {
        AppState.expandedCategories.add(categoryId);
      }
      
      Render.renderSidebar();
      Render.renderCollapsedNav();
      Render.renderLinks();
      
      if (window.innerWidth <= 768) {
        this.closeMobileSidebar();
      }
    },

    selectSubcategory(categoryId, subcategoryId) {
      AppState.currentCategory = categoryId;
      AppState.currentSubcategory = subcategoryId;
      AppState.expandedCategories.add(categoryId);
      
      Render.renderSidebar();
      Render.renderCollapsedNav();
      Render.renderLinks();
      
      if (window.innerWidth <= 768) {
        this.closeMobileSidebar();
      }
    },

    toggleCategory(categoryId) {
      AppState.toggleCategoryExpansion(categoryId);
      AppState.currentCategory = categoryId;
      AppState.currentSubcategory = null;
      
      Render.renderSidebar();
      Render.renderCollapsedNav();
      Render.renderLinks();
    },

    // ============================================
    // Favorites Management
    // ============================================
    toggleFavorite(linkName) {
      AppState.toggleFavorite(linkName);
      Render.renderLinks();
      Render.renderSidebar();
      Render.renderCollapsedNav();
    },

    // ============================================
    // Custom Links Management
    // ============================================
    openAddModal() {
      AppState.editingLinkId = null;
      Render.elements.modalTitle.textContent = I18n.t('addCustomLink');
      Render.elements.linkName.value = '';
      Render.elements.linkUrl.value = '';
      Render.elements.linkIcon.value = '';
      Render.elements.linkNote.value = '';
      Render.elements.modalOverlay.classList.add('active');
      Render.elements.linkName.focus();
    },

    openEditModal(linkId) {
      const link = AppState.customLinks.find(l => l.id === linkId);
      if (!link) return;
      
      AppState.editingLinkId = linkId;
      Render.elements.modalTitle.textContent = I18n.t('editLink');
      Render.elements.linkName.value = link.name;
      Render.elements.linkUrl.value = link.url;
      Render.elements.linkIcon.value = link.icon || '';
      Render.elements.linkNote.value = link.note || '';
      Render.elements.modalOverlay.classList.add('active');
      Render.elements.linkName.focus();
    },

    closeModal() {
      Render.elements.modalOverlay.classList.remove('active');
      AppState.editingLinkId = null;
    },

    saveCustomLink() {
      const name = Render.elements.linkName.value.trim();
      const url = Render.elements.linkUrl.value.trim();
      const icon = Render.elements.linkIcon.value.trim() || '🔗';
      const note = Render.elements.linkNote.value.trim();
      
      // Validation
      if (!name) {
        Render.elements.linkName.classList.add('error');
        Render.elements.linkName.focus();
        return;
      }
      Render.elements.linkName.classList.remove('error');
      
      if (!url) {
        Render.elements.linkUrl.classList.add('error');
        Render.elements.linkUrl.focus();
        return;
      }
      Render.elements.linkUrl.classList.remove('error');
      
      // Validate URL format
      try {
        new URL(url);
      } catch {
        Render.elements.linkUrl.classList.add('error');
        Render.elements.linkUrl.focus();
        return;
      }
      Render.elements.linkUrl.classList.remove('error');
      
      if (AppState.editingLinkId) {
        // Edit existing
        AppState.updateCustomLink(AppState.editingLinkId, {
          name,
          url,
          icon,
          note,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Add new
        AppState.addCustomLink({
          id: AppState.generateId(),
          name,
          url,
          icon,
          note,
          createdAt: new Date().toISOString()
        });
      }
      
      this.closeModal();
      Render.renderLinks();
      Render.renderSidebar();
    },

    deleteCustomLink(linkId) {
      if (!confirm(I18n.t('confirmDelete'))) return;
      
      AppState.deleteCustomLink(linkId);
      Render.renderLinks();
      Render.renderSidebar();
    },

    // ============================================
    // Export/Import
    // ============================================
    openExportImportModal() {
      Render.elements.exportImportOverlay.classList.add('active');
      Render.elements.exportImportInfo.textContent = AppState.language === 'en' 
        ? `${I18n.t('currentCustomLinks')}: ${AppState.customLinks.length}`
        : `${I18n.t('currentCustomLinks')} ${AppState.customLinks.length} 个自定义链接`;
      Render.elements.exportImportInfo.className = 'export-import-info';
    },

    closeExportImportModal() {
      Render.elements.exportImportOverlay.classList.remove('active');
    },

    exportLinks() {
      const data = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        customLinks: AppState.customLinks,
        favorites: AppState.favorites
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code-map-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      Render.elements.exportImportInfo.textContent = I18n.t('exportSuccess');
      Render.elements.exportImportInfo.className = 'export-import-info success';
    },

    importLinks(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          
          if (!data.customLinks && !data.favorites) {
            throw new Error(I18n.t('invalidBackupFormat'));
          }
          
          // Import custom links (merge)
          if (data.customLinks && Array.isArray(data.customLinks)) {
            const existingIds = new Set(AppState.customLinks.map(l => l.id));
            const newLinks = data.customLinks.filter(l => !existingIds.has(l.id));
            AppState.customLinks = [...AppState.customLinks, ...newLinks];
            AppState.persist('customLinks', AppState.customLinks);
          }
          
          // Import favorites (merge)
          if (data.favorites && Array.isArray(data.favorites)) {
            const existingFavorites = new Set(AppState.favorites);
            data.favorites.forEach(f => {
              if (!existingFavorites.has(f)) {
                AppState.favorites.push(f);
              }
            });
            AppState.persist('favorites', AppState.favorites);
          }
          
          Render.elements.exportImportInfo.textContent = I18n.t('importSuccess');
          Render.elements.exportImportInfo.className = 'export-import-info success';
          
          Render.renderLinks();
          Render.renderSidebar();
        } catch (err) {
          Render.elements.exportImportInfo.textContent = I18n.t('importFailed') + ' ' + err.message;
          Render.elements.exportImportInfo.className = 'export-import-info error';
        }
      };
      reader.readAsText(file);
      e.target.value = ''; // Reset file input
    },

    // ============================================
    // Sidebar Toggle
    // ============================================
    toggleSidebar() {
      AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
      Render.elements.sidebar.classList.toggle('collapsed', AppState.sidebarCollapsed);
      Render.elements.sidebarToggleBar.classList.toggle('collapsed-nav', AppState.sidebarCollapsed);
      Render.renderCollapsedNav();
    },

    openMobileSidebar() {
      Render.elements.sidebar.classList.add('mobile-open');
      Render.elements.sidebarOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    closeMobileSidebar() {
      Render.elements.sidebar.classList.remove('mobile-open');
      Render.elements.sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    },

    // ============================================
    // Search
    // ============================================
    handleSearch(e) {
      AppState.searchQuery = e.target.value.trim();
      Render.renderLinks();
    },

    // ============================================
    // Theme
    // ============================================
    toggleTheme() {
      const newTheme = AppState.theme === 'dark' ? 'light' : 'dark';
      Render.applyTheme(newTheme);
    },

    // ============================================
    // Language
    // ============================================
    changeLanguage(lang) {
      if (I18n.isLanguageAvailable(lang)) {
        Render.applyLanguage(lang);
      }
    },

    // ============================================
    // Utility
    // ============================================
    handleScroll() {
      const grid = Render.elements.contentGrid;
      if (grid.scrollTop > 200) {
        Render.elements.returnTop.classList.add('visible');
      } else {
        Render.elements.returnTop.classList.remove('visible');
      }
    },

    scrollToTop() {
      Render.elements.contentGrid.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    // ============================================
    // Event Bindings
    // ============================================
    bindEvents() {
      // Theme toggle
      Render.elements.themeToggle.addEventListener('click', () => this.toggleTheme());

      // Sidebar toggle - using event delegation since button is re-rendered
      Render.elements.sidebarToggleBar.addEventListener('click', (e) => {
        if (e.target.closest('.sidebar-toggle-btn')) {
          this.toggleSidebar();
        }
      });

      // Mobile menu
      Render.elements.mobileMenuBtn.addEventListener('click', () => this.openMobileSidebar());
      Render.elements.sidebarOverlay.addEventListener('click', () => this.closeMobileSidebar());

      // Search
      Render.elements.searchInput.addEventListener('input', (e) => this.handleSearch(e));

      // Return to top
      Render.elements.returnTop.addEventListener('click', () => this.scrollToTop());
      Render.elements.contentGrid.addEventListener('scroll', () => this.handleScroll());

      // Language dropdown
      if (Render.elements.langDropdownBtn) {
        Render.elements.langDropdownBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          Render.elements.languageSwitcher.classList.toggle('open');
          Render.elements.langDropdownMenu.classList.toggle('open');
        });
      }
      
      // Language options in dropdown
      if (Render.elements.languageSwitcher) {
        const langOptions = Render.elements.languageSwitcher.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
          option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            this.changeLanguage(lang);
          });
        });
      }
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (Render.elements.languageSwitcher && !Render.elements.languageSwitcher.contains(e.target)) {
          Render.elements.languageSwitcher.classList.remove('open');
          if (Render.elements.langDropdownMenu) {
            Render.elements.langDropdownMenu.classList.remove('open');
          }
        }
      });

      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          Render.elements.searchInput.focus();
        }
        // Escape to close modals
        if (e.key === 'Escape') {
          this.closeModal();
          this.closeExportImportModal();
          this.closeMobileSidebar();
        }
      });
    },

    // ============================================
    // Modal Event Bindings
    // ============================================
    bindModalEvents() {
      // Custom link modal
      Render.elements.modalClose.addEventListener('click', () => this.closeModal());
      Render.elements.modalCancel.addEventListener('click', () => this.closeModal());
      Render.elements.modalSave.addEventListener('click', () => this.saveCustomLink());
      Render.elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === Render.elements.modalOverlay) this.closeModal();
      });
      
      // Export/Import modal
      Render.elements.exportImportClose.addEventListener('click', () => this.closeExportImportModal());
      Render.elements.exportBtn.addEventListener('click', () => this.exportLinks());
      Render.elements.importBtn.addEventListener('click', () => Render.elements.importFile.click());
      Render.elements.importFile.addEventListener('change', (e) => this.importLinks(e));
      Render.elements.exportImportOverlay.addEventListener('click', (e) => {
        if (e.target === Render.elements.exportImportOverlay) this.closeExportImportModal();
      });
    },
    
    // ============================================
    // Search Event Bindings
    // ============================================
    bindSearchEvents() {
      const searchInput = Render.elements.searchInput;
      const suggestionsEl = document.getElementById('searchSuggestions');
      
      if (!suggestionsEl) return;
      
      // Show suggestions on focus
      searchInput.addEventListener('focus', () => {
        this.showSearchSuggestions('');
      });
      
      // Update suggestions on input
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        AppState.searchQuery = query;
        this.showSearchSuggestions(query);
        Render.renderLinks();
      });
      
      // Handle keyboard navigation in suggestions
      searchInput.addEventListener('keydown', (e) => {
        if (!this.searchState.isShowingSuggestions) return;
        
        const items = suggestionsEl.querySelectorAll('.search-suggestion-item');
        
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            this.searchState.selectedIndex = Math.min(
              this.searchState.selectedIndex + 1,
              items.length - 1
            );
            this.updateSuggestionSelection(items);
            break;
            
          case 'ArrowUp':
            e.preventDefault();
            this.searchState.selectedIndex = Math.max(
              this.searchState.selectedIndex - 1,
              -1
            );
            this.updateSuggestionSelection(items);
            break;
            
          case 'Enter':
            e.preventDefault();
            if (this.searchState.selectedIndex >= 0 && items[this.searchState.selectedIndex]) {
              const text = items[this.searchState.selectedIndex].dataset.text;
              searchInput.value = text;
              AppState.searchQuery = text;
              Search.addToHistory(text);
              this.hideSearchSuggestions();
              Render.renderLinks();
            }
            break;
            
          case 'Escape':
            this.hideSearchSuggestions();
            break;
        }
      });
      
      // Hide suggestions on blur (with delay for click handling)
      searchInput.addEventListener('blur', () => {
        setTimeout(() => this.hideSearchSuggestions(), 200);
      });
      
      // Click on suggestion
      suggestionsEl.addEventListener('click', (e) => {
        const item = e.target.closest('.search-suggestion-item');
        if (item && item.dataset.text) {
          const text = item.dataset.text;
          searchInput.value = text;
          AppState.searchQuery = text;
          Search.addToHistory(text);
          this.hideSearchSuggestions();
          Render.renderLinks();
        }
      });
      
      // Clear history button
      suggestionsEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('search-history-clear')) {
          Search.clearHistory();
          this.showSearchSuggestions('');
        }
      });
    },
    
    /**
     * Show search suggestions
     * @param {string} query - Current search query
     */
    showSearchSuggestions(query) {
      const suggestionsEl = document.getElementById('searchSuggestions');
      if (!suggestionsEl) return;
      
      // Get all links for suggestions
      const allLinks = this.getAllLinks();
      const suggestions = Search.getSuggestions(allLinks, query);
      const history = Search.getHistory();
      
      let html = '';
      
      // Show history if no query
      if (!query && history.length > 0) {
        html += `
          <div class="search-history-header">
            <span>🕐 ${I18n.t('searchHistory') || 'Search History'}</span>
            <span class="search-history-clear">${I18n.t('clear') || 'Clear'}</span>
          </div>
        `;
        history.forEach(item => {
          html += `
            <div class="search-suggestion-item" data-text="${item}">
              <span class="search-suggestion-icon">🕐</span>
              <span class="search-suggestion-text">${item}</span>
              <span class="search-suggestion-type">${I18n.t('history') || 'History'}</span>
            </div>
          `;
        });
      }
      
      // Show matching suggestions
      if (suggestions.length > 0) {
        suggestions.forEach(item => {
          const isTag = item.startsWith('#');
          const icon = isTag ? '🏷️' : '🔗';
          const type = isTag ? (I18n.t('tag') || 'Tag') : (I18n.t('link') || 'Link');
          html += `
            <div class="search-suggestion-item" data-text="${item}">
              <span class="search-suggestion-icon">${icon}</span>
              <span class="search-suggestion-text">${Search.highlightMatch(item, query)}</span>
              <span class="search-suggestion-type">${type}</span>
            </div>
          `;
        });
      }
      
      // No results
      if (!html) {
        html = `
          <div class="search-suggestion-item" style="justify-content: center; color: var(--text-muted);">
            <span>${I18n.t('noSuggestions') || 'No suggestions'}</span>
          </div>
        `;
      }
      
      suggestionsEl.innerHTML = html;
      suggestionsEl.classList.add('active');
      this.searchState.isShowingSuggestions = true;
      this.searchState.selectedIndex = -1;
    },
    
    /**
     * Hide search suggestions
     */
    hideSearchSuggestions() {
      const suggestionsEl = document.getElementById('searchSuggestions');
      if (suggestionsEl) {
        suggestionsEl.classList.remove('active');
        suggestionsEl.innerHTML = '';
      }
      this.searchState.isShowingSuggestions = false;
      this.searchState.selectedIndex = -1;
    },
    
    /**
     * Update suggestion selection visual
     * @param {NodeList} items - Suggestion items
     */
    updateSuggestionSelection(items) {
      items.forEach((item, index) => {
        item.classList.toggle('selected', index === this.searchState.selectedIndex);
      });
      
      // Update input value if navigating
      if (this.searchState.selectedIndex >= 0 && items[this.searchState.selectedIndex]) {
        Render.elements.searchInput.value = items[this.searchState.selectedIndex].dataset.text;
      }
    },
    
    /**
     * Get all links for search
     * @returns {Array} All links
     */
    getAllLinks() {
      const links = [];
      const data = window.LINKS_DATA || {};
      
      Object.entries(data).forEach(([catId, category]) => {
        if (category.subcategories) {
          Object.entries(category.subcategories).forEach(([subId, subcategory]) => {
            if (subcategory.items) {
              subcategory.items.forEach(item => {
                links.push({
                  ...item,
                  categoryId: catId,
                  categoryName: category.name,
                  subcategoryId: subId,
                  subcategoryName: subcategory.name
                });
              });
            }
          });
        }
      });
      
      // Add custom links
      AppState.customLinks.forEach(link => {
        links.push({
          ...link,
          isCustom: true
        });
      });
      
      return links;
    }
  };

  // ============================================
  // Public API
  // ============================================
  window.App = {
    selectCategory: (id) => App.selectCategory(id),
    selectSubcategory: (catId, subId) => App.selectSubcategory(catId, subId),
    toggleCategory: (id) => App.toggleCategory(id),
    toggleFavorite: (name) => App.toggleFavorite(name),
    openAddModal: () => App.openAddModal(),
    openEditModal: (id) => App.openEditModal(id),
    deleteCustomLink: (id) => App.deleteCustomLink(id),
    openExportImportModal: () => App.openExportImportModal(),
    changeLanguage: (lang) => App.changeLanguage(lang)
  };

  // ============================================
  // Start Application
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }

})();
