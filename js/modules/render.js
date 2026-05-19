/**
 * The Code Map - Render Module
 * Handles all DOM rendering operations
 */

const Render = {
  // DOM element cache
  elements: {},
  
  /**
   * Initialize element cache
   */
  initElements() {
    this.elements = {
      sidebar: document.getElementById('sidebar'),
      sidebarToggleBar: document.getElementById('sidebarToggleBar'),
      sidebarNav: document.getElementById('sidebarNav'),
      sidebarOverlay: document.getElementById('sidebarOverlay'),
      searchInput: document.getElementById('searchInput'),
      contentGrid: document.getElementById('contentGrid'),
      currentCategory: document.getElementById('currentCategory'),
      linkCount: document.getElementById('linkCount'),
      themeToggle: document.getElementById('themeToggle'),
      themeIcon: document.getElementById('themeIcon'),
      themeText: document.getElementById('themeText'),
      returnTop: document.getElementById('returnTop'),
      mobileMenuBtn: document.getElementById('mobileMenuBtn'),
      languageSwitcher: document.getElementById('languageSwitcher'),
      langDropdownBtn: document.getElementById('langDropdownBtn'),
      langDropdownMenu: document.getElementById('langDropdownMenu'),
      langDropdownText: document.getElementById('langDropdownText'),
      // Modal elements
      modalOverlay: document.getElementById('modalOverlay'),
      modalTitle: document.getElementById('modalTitle'),
      modalClose: document.getElementById('modalClose'),
      modalCancel: document.getElementById('modalCancel'),
      modalSave: document.getElementById('modalSave'),
      linkName: document.getElementById('linkName'),
      linkUrl: document.getElementById('linkUrl'),
      linkIcon: document.getElementById('linkIcon'),
      linkNote: document.getElementById('linkNote'),
      // Export/Import modal
      exportImportOverlay: document.getElementById('exportImportOverlay'),
      exportImportClose: document.getElementById('exportImportClose'),
      exportBtn: document.getElementById('exportBtn'),
      importBtn: document.getElementById('importBtn'),
      importFile: document.getElementById('importFile'),
      exportImportInfo: document.getElementById('exportImportInfo')
    };
  },
  
  /**
   * Get categories as array
   */
  getCategories() {
    return Object.entries(LINKS_DATA).map(([id, data]) => ({
      id,
      ...data
    }));
  },
  
  /**
   * Render sidebar navigation
   */
  renderSidebar() {
    const totalFavorites = AppState.favorites.length + AppState.customLinks.length;
    
    let html = `
      <div class="category-item ${AppState.currentCategory === 'all' ? 'active' : ''}" data-category="all">
        <div class="category-header" onclick="App.selectCategory('all')">
          <span class="category-icon">🌐</span>
          <span class="category-name">${I18n.t('allResources')}</span>
        </div>
      </div>
      <div class="category-item ${AppState.currentCategory === 'favorites' ? 'active' : ''}" data-category="favorites">
        <div class="category-header" onclick="App.selectCategory('favorites')">
          <span class="category-icon">⭐</span>
          <span class="category-name">${I18n.t('myFavorites')}</span>
          <span class="category-arrow" style="margin-left: auto; font-size: 12px; color: var(--text-muted);">${totalFavorites}</span>
        </div>
      </div>
    `;

    const categories = this.getCategories();
    categories.forEach(category => {
      const isExpanded = AppState.expandedCategories.has(category.id);
      const isActive = AppState.currentCategory === category.id;
      const catName = I18n.t(`categories.${category.id}`) || category.name;
      
      html += `
        <div class="category-item ${isExpanded ? 'expanded' : ''} ${isActive ? 'active' : ''}" data-category="${category.id}">
          <div class="category-header" onclick="App.toggleCategory('${category.id}')">
            <span class="category-icon">${category.icon}</span>
            <span class="category-name">${catName}</span>
            <span class="category-arrow">▶</span>
          </div>
          <ul class="subcategory-list">
      `;

      if (category.subcategories) {
        const subcats = Object.entries(category.subcategories).map(([subId, subData]) => ({
          id: subId,
          ...subData
        }));
        
        subcats.forEach(sub => {
          const subIsActive = AppState.currentCategory === category.id && AppState.currentSubcategory === sub.id;
          const subName = I18n.t(`subcategories.${sub.id}`) || sub.name;
          html += `
            <li class="${subIsActive ? 'active' : ''}" onclick="App.selectSubcategory('${category.id}', '${sub.id}')">
              <span class="sub-icon">${sub.icon || '📁'}</span>
              ${subName}
            </li>
          `;
        });
      }

      html += `
          </ul>
        </div>
      `;
    });

    this.elements.sidebarNav.innerHTML = html;
  },
  
  /**
   * Render collapsed navigation (icons in toggle bar)
   */
  renderCollapsedNav() {
    const toggleBar = this.elements.sidebarToggleBar;
    
    let html = `
      <button class="sidebar-toggle-btn" id="sidebarToggle" title="${I18n.t('toggleSidebar')}">
        ◀
      </button>
    `;
    
    if (AppState.sidebarCollapsed) {
      html += `<div class="collapsed-category-icons">`;
      
      // All resources
      html += `
        <button class="category-icon-btn ${AppState.currentCategory === 'all' ? 'active' : ''}" 
                onclick="App.selectCategory('all')" title="${I18n.t('allResources')}">
          🌐
        </button>
      `;
      
      // Favorites
      html += `
        <button class="category-icon-btn ${AppState.currentCategory === 'favorites' ? 'active' : ''}" 
                onclick="App.selectCategory('favorites')" title="${I18n.t('myFavorites')}">
          ⭐
        </button>
      `;
      
      // Categories
      const categories = this.getCategories();
      categories.forEach(category => {
        const catName = I18n.t(`categories.${category.id}`) || category.name;
        html += `
          <button class="category-icon-btn ${AppState.currentCategory === category.id ? 'active' : ''}" 
                  onclick="App.selectCategory('${category.id}')" title="${catName}">
            ${category.icon}
          </button>
        `;
      });
      
      html += `</div>`;
    }
    
    toggleBar.innerHTML = html;
  },
  
  /**
   * Render links grid
   */
  renderLinks() {
    // Remove existing custom links bar
    const existingBar = document.querySelector('.custom-links-bar');
    if (existingBar) existingBar.remove();
    
    let links = [];
    let title = I18n.t('allResources');
    let groupedLinks = null;

    // Get links based on current selection
    if (AppState.currentCategory === 'all') {
      title = I18n.t('allResources');
      const categories = this.getCategories();
      categories.forEach(cat => {
        if (cat.subcategories) {
          const subcats = Object.entries(cat.subcategories).map(([subId, subData]) => ({
            id: subId,
            ...subData
          }));
          subcats.forEach(sub => {
            if (sub.items) {
              links = links.concat(sub.items.map(link => ({...link, category: cat.name, subcategory: sub.name})));
            }
          });
        }
      });
    } else if (AppState.currentCategory === 'favorites') {
      title = I18n.t('myFavorites');
      
      // Add custom links bar
      const customBar = document.createElement('div');
      customBar.className = 'custom-links-bar';
      customBar.innerHTML = `
        <span class="bar-title">📌 ${I18n.t('customLinks')} (${AppState.customLinks.length})</span>
        <div class="bar-actions">
          <button class="btn btn-primary btn-sm" onclick="App.openAddModal()">${I18n.t('add')}</button>
          <button class="btn btn-secondary btn-sm" onclick="App.openExportImportModal()">${I18n.t('more')}</button>
        </div>
      `;
      this.elements.contentGrid.parentElement.insertBefore(customBar, this.elements.contentGrid);
      
      // Get favorites from predefined links
      const categories = this.getCategories();
      categories.forEach(cat => {
        if (cat.subcategories) {
          const subcats = Object.entries(cat.subcategories).map(([subId, subData]) => ({
            id: subId,
            ...subData
          }));
          subcats.forEach(sub => {
            if (sub.items) {
              sub.items.forEach(link => {
                if (AppState.favorites.includes(link.name)) {
                  links.push({...link, category: cat.name, subcategory: sub.name});
                }
              });
            }
          });
        }
      });
      
      // Add custom links
      AppState.customLinks.forEach(link => {
        links.push({
          ...link,
          isCustom: true,
          category: AppState.language === 'en' ? 'Custom' : '自定义',
          subcategory: AppState.language === 'en' ? 'My Links' : '我的链接'
        });
      });
    } else {
      const category = LINKS_DATA[AppState.currentCategory];
      if (category) {
        title = I18n.t(`categories.${AppState.currentCategory}`) || category.name;
        if (AppState.currentSubcategory && category.subcategories) {
          const subcategory = category.subcategories[AppState.currentSubcategory];
          if (subcategory) {
            title = I18n.t(`subcategories.${AppState.currentSubcategory}`) || subcategory.name;
            links = (subcategory.items || []).map(link => ({...link, category: category.name, subcategory: subcategory.name}));
          }
        } else {
          // Group links by subcategory
          if (category.subcategories) {
            groupedLinks = {};
            const subcats = Object.entries(category.subcategories).map(([subId, subData]) => ({
              id: subId,
              ...subData
            }));
            subcats.forEach(sub => {
              if (sub.items && sub.items.length > 0) {
                groupedLinks[sub.id] = {
                  name: I18n.t(`subcategories.${sub.id}`) || sub.name,
                  icon: sub.icon || '📁',
                  items: sub.items.map(link => ({...link, category: category.name, subcategory: sub.name}))
                };
              }
            });
          }
        }
      }
    }

    // Apply search filter with enhanced fuzzy search
    if (AppState.searchQuery) {
      if (groupedLinks) {
        // Flatten grouped links for search
        let allLinks = [];
        Object.entries(groupedLinks).forEach(([subId, subData]) => {
          allLinks = allLinks.concat(subData.items.map(link => ({
            ...link,
            subcategoryId: subId,
            subcategoryName: subData.name
          })));
        });
        
        // Use advanced search
        const filteredLinks = Search.advancedSearch(allLinks, AppState.searchQuery);
        
        // Re-group filtered links
        const filteredGroups = {};
        filteredLinks.forEach(link => {
          if (!filteredGroups[link.subcategoryId]) {
            const subData = groupedLinks[link.subcategoryId];
            filteredGroups[link.subcategoryId] = {
              name: subData.name,
              icon: subData.icon,
              items: []
            };
          }
          filteredGroups[link.subcategoryId].items.push(link);
        });
        groupedLinks = filteredGroups;
      } else {
        // Use advanced search for flat links
        links = Search.advancedSearch(links, AppState.searchQuery);
      }
      title = AppState.language === 'en' ? `Search: "${AppState.searchQuery}"` : `搜索: "${AppState.searchQuery}"`;
    }

    this.elements.currentCategory.textContent = title;
    
    // Render links grid
    if (groupedLinks) {
      this.renderGroupedLinks(groupedLinks);
    } else {
      this.renderFlatLinks(links);
    }
  },
  
  /**
   * Render grouped links (by subcategory)
   */
  renderGroupedLinks(groupedLinks) {
    const groupEntries = Object.entries(groupedLinks);
    if (groupEntries.length === 0) {
      this.elements.contentGrid.innerHTML = `
        <div class="empty-state">
          <span>📭</span>
          <p>${AppState.searchQuery ? I18n.t('noMatchingResources') : I18n.t('noResources')}</p>
        </div>
      `;
      return;
    }
    
    let html = '';
    let totalLinks = 0;
    let delayIndex = 0;
    
    groupEntries.forEach(([subId, subData]) => {
      html += `
        <div class="subcategory-section">
          <h3 class="subcategory-title">
            <span class="subcategory-title-icon">${subData.icon}</span>
            <span class="subcategory-title-name">${subData.name}</span>
            <span class="subcategory-title-count">${subData.items.length}</span>
          </h3>
          <div class="subcategory-grid">
      `;
      
      subData.items.forEach(link => {
        const isFavorite = AppState.favorites.includes(link.name);
        html += this.renderLinkCard(link, delayIndex, isFavorite);
        delayIndex++;
        totalLinks++;
      });
      
      html += `
              </div>
            </div>
          `;
    });
    
    this.elements.contentGrid.innerHTML = html;
    this.updateLinkCount(totalLinks);
  },
  
  /**
   * Render flat links list
   */
  renderFlatLinks(links) {
    if (links.length === 0) {
      this.elements.contentGrid.innerHTML = `
        <div class="empty-state">
          <span>📭</span>
          <p>${AppState.searchQuery ? I18n.t('noMatchingResources') : I18n.t('noResources')}</p>
        </div>
      `;
      return;
    }
    
    this.elements.contentGrid.innerHTML = links.map((link, index) => {
      const isFavorite = AppState.favorites.includes(link.name);
      return this.renderLinkCard(link, index, isFavorite);
    }).join('');
    this.updateLinkCount(links.length);
  },
  
  /**
   * Render a single link card
   */
  renderLinkCard(link, index, isFavorite) {
    const isCustom = link.isCustom;
    
    if (isCustom) {
      return `
        <div class="link-card custom-link" style="animation-delay: ${index * 0.03}s">
          <div class="link-card-actions">
            <button onclick="App.openEditModal('${link.id}')" title="${I18n.t('edit')}">✏️</button>
            <button class="delete" onclick="App.deleteCustomLink('${link.id}')" title="${I18n.t('delete')}">🗑️</button>
          </div>
          <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit; display: contents;">
            <div class="link-card-icon">${link.icon || '🔗'}</div>
            <div class="link-card-name">${link.name}</div>
          </a>
        </div>
      `;
    }
    
    return `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-card" style="animation-delay: ${index * 0.03}s">
        <div class="link-card-icon">${link.icon || '🔗'}</div>
        <div class="link-card-name">${link.name}</div>
        <span class="link-card-favorite ${isFavorite ? 'active' : ''}" onclick="event.preventDefault(); event.stopPropagation(); App.toggleFavorite('${link.name.replace(/'/g, "\\'")}')">${isFavorite ? '★' : '☆'}</span>
      </a>
    `;
  },
  
  /**
   * Update link count display
   */
  updateLinkCount(count) {
    if (count !== undefined) {
      this.elements.linkCount.textContent = `${count} ${I18n.t('links')}`;
    } else {
      let total = 0;
      const categories = this.getCategories();
      categories.forEach(cat => {
        if (cat.subcategories) {
          const subcats = Object.entries(cat.subcategories);
          subcats.forEach(([, subData]) => {
            total += (subData.items || []).length;
          });
        }
      });
      this.elements.linkCount.textContent = `${total} ${I18n.t('links')}`;
    }
  },
  
  /**
   * Apply theme
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    AppState.theme = theme;
    localStorage.setItem('theme', theme);
    
    if (theme === 'light') {
      this.elements.themeIcon.textContent = '☀️';
      this.elements.themeText.textContent = I18n.t('lightMode');
    } else {
      this.elements.themeIcon.textContent = '🌙';
      this.elements.themeText.textContent = I18n.t('darkMode');
    }
  },
  
  /**
   * Apply language
   */
  applyLanguage(lang) {
    AppState.language = lang;
    localStorage.setItem('language', lang);
    
    // Update language dropdown
    if (this.elements.languageSwitcher && this.elements.langDropdownText) {
      const langData = I18n.translations[lang];
      if (langData && langData.langName) {
        this.elements.langDropdownText.textContent = langData.langName;
      }
      
      const langOptions = this.elements.languageSwitcher.querySelectorAll('.lang-option');
      langOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
      });
      
      this.elements.languageSwitcher.classList.remove('open');
      if (this.elements.langDropdownMenu) {
        this.elements.langDropdownMenu.classList.remove('open');
      }
    }
    
    // Update search placeholder
    this.elements.searchInput.placeholder = I18n.t('searchPlaceholder');
    
    // Update theme text
    if (AppState.theme === 'light') {
      this.elements.themeText.textContent = I18n.t('lightMode');
    } else {
      this.elements.themeText.textContent = I18n.t('darkMode');
    }
    
    // Update return top button
    this.elements.returnTop.title = I18n.t('returnTop');
    
    // Re-render content
    this.renderSidebar();
    this.renderCollapsedNav();
    this.renderLinks();
  }
};

// Export for use in other modules
window.Render = Render;
