/**
 * The Code Map - Application Logic
 * With i18n support
 */

(function() {
  'use strict';

  // ============================================
  // Internationalization (i18n)
  // ============================================
  const i18n = {
    en: {
      langName: 'English',
      // Sidebar
      allResources: 'All Resources',
      myFavorites: 'My Favorites',
      
      // Header
      links: 'links',
      searchPlaceholder: '🔍 Search resources...',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      
      // Custom Links
      customLinks: 'Custom Links',
      add: '+ Add',
      more: '⋮ More',
      
      // Modal
      addCustomLink: 'Add Custom Link',
      editLink: 'Edit Link',
      name: 'Name',
      url: 'URL',
      icon: 'Icon',
      note: 'Note',
      cancel: 'Cancel',
      save: 'Save',
      close: 'Close',
      required: '*',
      
      // Export/Import
      exportImportLinks: 'Export/Import Links',
      exportLinks: '📤 Export Links',
      importLinks: '📥 Import Links',
      currentCustomLinks: 'Current custom links',
      exportSuccess: '✅ Export successful!',
      importSuccess: '✅ Import successful!',
      importFailed: '❌ Import failed:',
      invalidBackupFormat: 'Invalid backup file format',
      
      // Messages
      noMatchingResources: 'No matching resources found',
      noResources: 'No resources',
      confirmDelete: 'Are you sure you want to delete this link?',
      
      // Tooltips
      toggleSidebar: 'Toggle sidebar',
      returnTop: 'Return to top',
      edit: 'Edit',
      delete: 'Delete',
      
      // Category translations
      categories: {
        ai: 'AI',
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database',
        devops: 'DevOps',
        learn: 'Learn',
        community: 'Community',
        design: 'Design',
        tools: 'Tools'
      },
      
      // Subcategory translations
      subcategories: {
        chat: 'Chat',
        image: 'Image',
        video: 'Video',
        audio: 'Audio',
        coding: 'Coding',
        platform: 'Platform',
        gateway: 'Gateway',
        agent: 'Agent',
        react: 'React',
        vue: 'Vue',
        angular: 'Angular',
        'css-frameworks': 'CSS',
        javascript: 'JavaScript',
        others: 'Others',
        python: 'Python',
        java: 'Java',
        go: 'Go',
        rust: 'Rust',
        php: 'PHP',
        'c-family': 'C/C++/C#',
        ruby: 'Ruby',
        swift: 'Swift',
        sql: 'SQL',
        nosql: 'NoSQL',
        orm: 'ORM',
        docker: 'Docker & K8s',
        cicd: 'CI/CD',
        deploy: 'Deploy',
        tools_devops: 'Tools',
        books: 'Books',
        free: 'Free',
        paid: 'Paid',
        practice: 'Practice',
        github: 'GitHub',
        forums: 'Forums',
        blogs: 'Blogs',
        'free-assets': 'Free Assets',
        inspiration: 'Inspiration',
        colors: 'Colors',
        premium: 'Premium',
        ide: 'IDE',
        'api-tools': 'API Tools',
        design_tools: 'Design Tools',
        utilities: 'Utilities',
        'package-managers': 'Package Managers',
        'image-tools': 'Image Tools',
        fun: 'Fun',
        'ai-adult': 'AI Adult'
      }
    },
    
    zh: {
      langName: '中文',
      // Sidebar
      allResources: '全部资源',
      myFavorites: '我的收藏',
      
      // Header
      links: '个链接',
      searchPlaceholder: '🔍 搜索资源...',
      darkMode: '深色模式',
      lightMode: '浅色模式',
      
      // Custom Links
      customLinks: '自定义链接',
      add: '+ 添加',
      more: '⋮ 更多',
      
      // Modal
      addCustomLink: '添加自定义链接',
      editLink: '编辑链接',
      name: '名称',
      url: '链接',
      icon: '图标',
      note: '备注',
      cancel: '取消',
      save: '保存',
      close: '关闭',
      required: '*',
      
      // Export/Import
      exportImportLinks: '导出/导入链接',
      exportLinks: '📤 导出链接',
      importLinks: '📥 导入链接',
      currentCustomLinks: '当前有',
      exportSuccess: '✅ 导出成功！',
      importSuccess: '✅ 导入成功！',
      importFailed: '❌ 导入失败：',
      invalidBackupFormat: '无效的备份文件格式',
      
      // Messages
      noMatchingResources: '未找到匹配的资源',
      noResources: '暂无资源',
      confirmDelete: '确定要删除这个链接吗？',
      
      // Tooltips
      toggleSidebar: '收起/展开侧边栏',
      returnTop: '返回顶部',
      edit: '编辑',
      delete: '删除',
      
      // Category translations
      categories: {
        ai: 'AI',
        frontend: '前端',
        backend: '后端',
        database: '数据库',
        devops: '运维',
        learn: '学习',
        community: '社区',
        design: '设计',
        tools: '工具'
      },
      
      // Subcategory translations
      subcategories: {
        chat: '聊天',
        image: '图像',
        video: '视频',
        audio: '音频',
        coding: '编程',
        platform: '平台',
        gateway: '网关',
        agent: 'Agent',
        react: 'React',
        vue: 'Vue',
        angular: 'Angular',
        'css-frameworks': 'CSS',
        javascript: 'JavaScript',
        others: '其他',
        python: 'Python',
        java: 'Java',
        go: 'Go',
        rust: 'Rust',
        php: 'PHP',
        'c-family': 'C/C++/C#',
        ruby: 'Ruby',
        swift: 'Swift',
        sql: 'SQL',
        nosql: 'NoSQL',
        orm: 'ORM',
        docker: 'Docker & K8s',
        cicd: 'CI/CD',
        deploy: '部署',
        tools_devops: '工具',
        books: '书籍',
        free: '免费',
        paid: '付费',
        practice: '练习',
        github: 'GitHub',
        forums: '论坛',
        blogs: '博客',
        'free-assets': '免费素材',
        inspiration: '灵感',
        colors: '配色',
        premium: '付费素材',
        ide: 'IDE',
        'api-tools': 'API 工具',
        design_tools: '设计工具',
        utilities: '实用工具',
        'package-managers': '包管理',
        'image-tools': '图片工具',
        fun: '趣味',
        'ai-adult': 'AI 成人'
      }
    },
    
    ja: {
      langName: '日本語',
      // Sidebar
      allResources: 'すべてのリソース',
      myFavorites: 'お気に入り',
      
      // Header
      links: 'リンク',
      searchPlaceholder: '🔍 リソースを検索...',
      darkMode: 'ダークモード',
      lightMode: 'ライトモード',
      
      // Custom Links
      customLinks: 'カスタムリンク',
      add: '+ 追加',
      more: '⋮ その他',
      
      // Modal
      addCustomLink: 'カスタムリンクを追加',
      editLink: 'リンクを編集',
      name: '名前',
      url: 'URL',
      icon: 'アイコン',
      note: 'メモ',
      cancel: 'キャンセル',
      save: '保存',
      close: '閉じる',
      required: '*',
      
      // Export/Import
      exportImportLinks: 'リンクのエクスポート/インポート',
      exportLinks: '📤 リンクをエクスポート',
      importLinks: '📥 リンクをインポート',
      currentCustomLinks: '現在のカスタムリンク',
      exportSuccess: '✅ エクスポート成功！',
      importSuccess: '✅ インポート成功！',
      importFailed: '❌ インポート失敗：',
      invalidBackupFormat: '無効なバックアップファイル形式',
      
      // Messages
      noMatchingResources: '一致するリソースが見つかりません',
      noResources: 'リソースなし',
      confirmDelete: 'このリンクを削除してもよろしいですか？',
      
      // Tooltips
      toggleSidebar: 'サイドバーを切り替え',
      returnTop: 'トップに戻る',
      edit: '編集',
      delete: '削除',
      
      // Category translations
      categories: {
        ai: 'AI',
        frontend: 'フロントエンド',
        backend: 'バックエンド',
        database: 'データベース',
        devops: 'DevOps',
        learn: '学習',
        community: 'コミュニティ',
        design: 'デザイン',
        tools: 'ツール'
      },
      
      // Subcategory translations
      subcategories: {
        chat: 'チャット',
        image: '画像',
        video: '動画',
        audio: '音声',
        coding: 'コーディング',
        platform: 'プラットフォーム',
        gateway: 'ゲートウェイ',
        agent: 'エージェント',
        react: 'React',
        vue: 'Vue',
        angular: 'Angular',
        'css-frameworks': 'CSS',
        javascript: 'JavaScript',
        others: 'その他',
        python: 'Python',
        java: 'Java',
        go: 'Go',
        rust: 'Rust',
        php: 'PHP',
        'c-family': 'C/C++/C#',
        ruby: 'Ruby',
        swift: 'Swift',
        sql: 'SQL',
        nosql: 'NoSQL',
        orm: 'ORM',
        docker: 'Docker & K8s',
        cicd: 'CI/CD',
        deploy: 'デプロイ',
        tools_devops: 'ツール',
        books: '書籍',
        free: '無料',
        paid: '有料',
        practice: '練習',
        github: 'GitHub',
        forums: 'フォーラム',
        blogs: 'ブログ',
        'free-assets': '無料素材',
        inspiration: 'インスピレーション',
        colors: '配色',
        premium: '有料素材',
        ide: 'IDE',
        'api-tools': 'APIツール',
        design_tools: 'デザインツール',
        utilities: 'ユーティリティ',
        'package-managers': 'パッケージマネージャー',
        'image-tools': '画像ツール',
        fun: '楽しい',
        'ai-adult': 'AIアダルト'
      }
    },
    
    ko: {
      langName: '한국어',
      // Sidebar
      allResources: '모든 리소스',
      myFavorites: '내 즐겨찾기',
      
      // Header
      links: '개 링크',
      searchPlaceholder: '🔍 리소스 검색...',
      darkMode: '다크 모드',
      lightMode: '라이트 모드',
      
      // Custom Links
      customLinks: '커스텀 링크',
      add: '+ 추가',
      more: '⋮ 더보기',
      
      // Modal
      addCustomLink: '커스텀 링크 추가',
      editLink: '링크 편집',
      name: '이름',
      url: 'URL',
      icon: '아이콘',
      note: '메모',
      cancel: '취소',
      save: '저장',
      close: '닫기',
      required: '*',
      
      // Export/Import
      exportImportLinks: '링크 내보내기/ 가져오기',
      exportLinks: '📤 링크 내보내기',
      importLinks: '📥 링크 가져오기',
      currentCustomLinks: '현재 커스텀 링크',
      exportSuccess: '✅ 내보내기 성공!',
      importSuccess: '✅ 가져오기 성공!',
      importFailed: '❌ 가져오기 실패:',
      invalidBackupFormat: '잘못된 백업 파일 형식',
      
      // Messages
      noMatchingResources: '일치하는 리소스 없음',
      noResources: '리소스 없음',
      confirmDelete: '이 링크를 삭제하시겠습니까?',
      
      // Tooltips
      toggleSidebar: '사이드바 토글',
      returnTop: '맨 위로',
      edit: '편집',
      delete: '삭제',
      
      // Category translations
      categories: {
        ai: 'AI',
        frontend: '프론트엔드',
        backend: '백엔드',
        database: '데이터베이스',
        devops: 'DevOps',
        learn: '학습',
        community: '커뮤니티',
        design: '디자인',
        tools: '도구'
      },
      
      // Subcategory translations
      subcategories: {
        chat: '채팅',
        image: '이미지',
        video: '비디오',
        audio: '오디오',
        coding: '코딩',
        platform: '플랫폼',
        gateway: '게이트웨이',
        agent: '에이전트',
        react: 'React',
        vue: 'Vue',
        angular: 'Angular',
        'css-frameworks': 'CSS',
        javascript: 'JavaScript',
        others: '기타',
        python: 'Python',
        java: 'Java',
        go: 'Go',
        rust: 'Rust',
        php: 'PHP',
        'c-family': 'C/C++/C#',
        ruby: 'Ruby',
        swift: 'Swift',
        sql: 'SQL',
        nosql: 'NoSQL',
        orm: 'ORM',
        docker: 'Docker & K8s',
        cicd: 'CI/CD',
        deploy: '배포',
        tools_devops: '도구',
        books: '책',
        free: '무료',
        paid: '유료',
        practice: '연습',
        github: 'GitHub',
        forums: '포럼',
        blogs: '블로그',
        'free-assets': '무료 자료',
        inspiration: '인스피레이션',
        colors: '색상',
        premium: '유료 자료',
        ide: 'IDE',
        'api-tools': 'API 도구',
        design_tools: '디자인 도구',
        utilities: '유틸리티',
        'package-managers': '패키지 관리자',
        'image-tools': '이미지 도구',
        fun: '재미',
        'ai-adult': 'AI 성인'
      }
    },
    
    es: {
      langName: 'Español',
      // Sidebar
      allResources: 'Todos los recursos',
      myFavorites: 'Mis favoritos',
      
      // Header
      links: 'enlaces',
      searchPlaceholder: '🔍 Buscar recursos...',
      darkMode: 'Modo oscuro',
      lightMode: 'Modo claro',
      
      // Custom Links
      customLinks: 'Enlaces personalizados',
      add: '+ Agregar',
      more: '⋮ Más',
      
      // Modal
      addCustomLink: 'Agregar enlace personalizado',
      editLink: 'Editar enlace',
      name: 'Nombre',
      url: 'URL',
      icon: 'Icono',
      note: 'Nota',
      cancel: 'Cancelar',
      save: 'Guardar',
      close: 'Cerrar',
      required: '*',
      
      // Export/Import
      exportImportLinks: 'Exportar/Importar enlaces',
      exportLinks: '📤 Exportar enlaces',
      importLinks: '📥 Importar enlaces',
      currentCustomLinks: 'Enlaces personalizados actuales',
      exportSuccess: '✅ Exportación exitosa!',
      importSuccess: '✅ Importación exitosa!',
      importFailed: '❌ Importación fallida:',
      invalidBackupFormat: 'Formato de archivo de backup inválido',
      
      // Messages
      noMatchingResources: 'No se encontraron recursos',
      noResources: 'Sin recursos',
      confirmDelete: '¿Está seguro de eliminar este enlace?',
      
      // Tooltips
      toggleSidebar: 'Alternar sidebar',
      returnTop: 'Volver arriba',
      edit: 'Editar',
      delete: 'Eliminar',
      
      // Category translations
      categories: {
        ai: 'AI',
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Base de datos',
        devops: 'DevOps',
        learn: 'Aprender',
        community: 'Comunidad',
        design: 'Diseño',
        tools: 'Herramientas'
      },
      
      // Subcategory translations
      subcategories: {
        chat: 'Chat',
        image: 'Imagen',
        video: 'Video',
        audio: 'Audio',
        coding: 'Codificación',
        platform: 'Plataforma',
        gateway: 'Gateway',
        agent: 'Agente',
        react: 'React',
        vue: 'Vue',
        angular: 'Angular',
        'css-frameworks': 'CSS',
        javascript: 'JavaScript',
        others: 'Otros',
        python: 'Python',
        java: 'Java',
        go: 'Go',
        rust: 'Rust',
        php: 'PHP',
        'c-family': 'C/C++/C#',
        ruby: 'Ruby',
        swift: 'Swift',
        sql: 'SQL',
        nosql: 'NoSQL',
        orm: 'ORM',
        docker: 'Docker & K8s',
        cicd: 'CI/CD',
        deploy: 'Desplegar',
        tools_devops: 'Herramientas',
        books: 'Libros',
        free: 'Gratis',
        paid: 'Pago',
        practice: 'Práctica',
        github: 'GitHub',
        forums: 'Foros',
        blogs: 'Blogs',
        'free-assets': 'Assets gratis',
        inspiration: 'Inspiración',
        colors: 'Colores',
        premium: 'Premium',
        ide: 'IDE',
        'api-tools': 'Herramientas API',
        design_tools: 'Herramientas de diseño',
        utilities: 'Utilidades',
        'package-managers': 'Gestores de paquetes',
        'image-tools': 'Herramientas de imagen',
        fun: 'Divertido',
        'ai-adult': 'AI Adulto'
      }
    },
    
    fr: {
      langName: 'Français',
      // Sidebar
      allResources: 'Toutes les ressources',
      myFavorites: 'Mes favoris',
      
      // Header
      links: 'liens',
      searchPlaceholder: '🔍 Rechercher des ressources...',
      darkMode: 'Mode sombre',
      lightMode: 'Mode clair',
      
      // Custom Links
      customLinks: 'Liens personnalisés',
      add: '+ Ajouter',
      more: '⋮ Plus',
      
      // Modal
      addCustomLink: 'Ajouter un lien personnalisé',
      editLink: 'Modifier le lien',
      name: 'Nom',
      url: 'URL',
      icon: 'Icône',
      note: 'Note',
      cancel: 'Annuler',
      save: 'Enregistrer',
      close: 'Fermer',
      required: '*',
      
      // Export/Import
      exportImportLinks: 'Exporter/Importer des liens',
      exportLinks: '📤 Exporter les liens',
      importLinks: '📥 Importer les liens',
      currentCustomLinks: 'Liens personnalisés actuels',
      exportSuccess: '✅ Exportation réussie!',
      importSuccess: '✅ Importation réussie!',
      importFailed: '❌ Importation échouée:',
      invalidBackupFormat: 'Format de fichier de sauvegarde invalide',
      
      // Messages
      noMatchingResources: 'Aucune ressource trouvée',
      noResources: 'Pas de ressources',
      confirmDelete: 'Voulez-vous vraiment supprimer ce lien?',
      
      // Tooltips
      toggleSidebar: 'Basculer la barre latérale',
      returnTop: 'Retour au début',
      edit: 'Modifier',
      delete: 'Supprimer',
      
      // Category translations
      categories: {
        ai: 'AI',
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Base de données',
        devops: 'DevOps',
        learn: 'Apprendre',
        community: 'Communauté',
        design: 'Design',
        tools: 'Outils'
      },
      
      // Subcategory translations
      subcategories: {
        chat: 'Chat',
        image: 'Image',
        video: 'Vidéo',
        audio: 'Audio',
        coding: 'Codage',
        platform: 'Plateforme',
        gateway: 'Passerelle',
        agent: 'Agent',
        react: 'React',
        vue: 'Vue',
        angular: 'Angular',
        'css-frameworks': 'CSS',
        javascript: 'JavaScript',
        others: 'Autres',
        python: 'Python',
        java: 'Java',
        go: 'Go',
        rust: 'Rust',
        php: 'PHP',
        'c-family': 'C/C++/C#',
        ruby: 'Ruby',
        swift: 'Swift',
        sql: 'SQL',
        nosql: 'NoSQL',
        orm: 'ORM',
        docker: 'Docker & K8s',
        cicd: 'CI/CD',
        deploy: 'Déployer',
        tools_devops: 'Outils',
        books: 'Livres',
        free: 'Gratuit',
        paid: 'Payant',
        practice: 'Pratique',
        github: 'GitHub',
        forums: 'Forums',
        blogs: 'Blogs',
        'free-assets': 'Assets gratuits',
        inspiration: 'Inspiration',
        colors: 'Couleurs',
        premium: 'Premium',
        ide: 'IDE',
        'api-tools': 'Outils API',
        design_tools: 'Outils de design',
        utilities: 'Utilitaires',
        'package-managers': 'Gestionnaires de paquets',
        'image-tools': 'Outils d\'image',
        fun: 'Fun',
        'ai-adult': 'AI Adulte'
      }
    }
  };

  // ============================================
  // State Management
  // ============================================
  const state = {
    currentCategory: 'all',
    currentSubcategory: null,
    searchQuery: '',
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    customLinks: JSON.parse(localStorage.getItem('customLinks') || '[]'),
    theme: localStorage.getItem('theme') || 'dark',
    language: localStorage.getItem('language') || 'en',
    sidebarCollapsed: false,
    expandedCategories: new Set(),
    editingLinkId: null
  };

  // ============================================
  // Helper: Get translated text
  // ============================================
  function t(key) {
    const keys = key.split('.');
    let value = i18n[state.language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }

  // ============================================
  // DOM Elements
  // ============================================
  const elements = {
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
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

  // ============================================
  // Helper: Get categories as array
  // ============================================
  function getCategories() {
    return Object.entries(LINKS_DATA).map(([id, data]) => ({
      id,
      ...data
    }));
  }

  // ============================================
  // Initialize
  // ============================================
  function init() {
    applyTheme(state.theme);
    applyLanguage(state.language);
    renderSidebar();
    renderCollapsedNav();
    renderLinks();
    bindEvents();
    bindModalEvents();
    updateLinkCount();
  }

  // ============================================
  // Language Management
  // ============================================
  function applyLanguage(lang) {
    state.language = lang;
    localStorage.setItem('language', lang);
    
    // Update language dropdown
    if (elements.languageSwitcher && elements.langDropdownText) {
      // Update dropdown button text
      const langData = i18n[lang];
      if (langData && langData.langName) {
        elements.langDropdownText.textContent = langData.langName;
      }
      
      // Update active state in dropdown menu
      const langOptions = elements.languageSwitcher.querySelectorAll('.lang-option');
      langOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
      });
      
      // Close dropdown
      elements.languageSwitcher.classList.remove('open');
      if (elements.langDropdownMenu) {
        elements.langDropdownMenu.classList.remove('open');
      }
    }
    
    // Update search placeholder
    elements.searchInput.placeholder = t('searchPlaceholder');
    
    // Update theme text
    if (state.theme === 'light') {
      elements.themeText.textContent = t('lightMode');
    } else {
      elements.themeText.textContent = t('darkMode');
    }
    
    // Update return top button
    elements.returnTop.title = t('returnTop');
    
    // Update modal labels
    updateModalLabels();
    
    // Re-render content
    renderSidebar();
    renderCollapsedNav();
    renderLinks();
  }

  function updateModalLabels() {
    // Update form labels
    const nameLabel = document.querySelector('label[for="linkName"]');
    const urlLabel = document.querySelector('label[for="linkUrl"]');
    const iconLabel = document.querySelector('label[for="linkIcon"]');
    const noteLabel = document.querySelector('label[for="linkNote"]');
    
    if (nameLabel) nameLabel.innerHTML = `${t('name')} <span class="required">${t('required')}</span>`;
    if (urlLabel) urlLabel.innerHTML = `${t('url')} <span class="required">${t('required')}</span>`;
    if (iconLabel) iconLabel.textContent = t('icon');
    if (noteLabel) noteLabel.textContent = t('note');
    
    // Update buttons
    elements.modalCancel.textContent = t('cancel');
    elements.modalSave.textContent = t('save');
    elements.modalClose.title = t('close');
    
    // Update export/import
    const exportImportTitle = document.getElementById('exportImportTitle');
    if (exportImportTitle) exportImportTitle.textContent = t('exportImportLinks');
    elements.exportBtn.textContent = t('exportLinks');
    elements.importBtn.textContent = t('importLinks');
    elements.exportImportClose.title = t('close');
  }

  function changeLanguage(lang) {
    applyLanguage(lang);
  }

  // ============================================
  // Theme Management
  // ============================================
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('theme', theme);
    
    if (theme === 'light') {
      elements.themeIcon.textContent = '☀️';
      elements.themeText.textContent = t('lightMode');
    } else {
      elements.themeIcon.textContent = '🌙';
      elements.themeText.textContent = t('darkMode');
    }
  }

  function toggleTheme() {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  // ============================================
  // Collapsed Nav Rendering (icons in toggle bar)
  // ============================================
  function renderCollapsedNav() {
    const toggleBar = elements.sidebarToggleBar;
    
    // Toggle button
    let html = `
      <button class="sidebar-toggle-btn" id="sidebarToggle" title="${t('toggleSidebar')}">
        ◀
      </button>
    `;
    
    // Category icons (only show when collapsed)
    if (state.sidebarCollapsed) {
      html += `<div class="collapsed-category-icons">`;
      
      // All resources
      html += `
        <button class="category-icon-btn ${state.currentCategory === 'all' ? 'active' : ''}" 
                onclick="window.app.selectCategory('all')" title="${t('allResources')}">
          🌐
        </button>
      `;
      
      // Favorites
      html += `
        <button class="category-icon-btn ${state.currentCategory === 'favorites' ? 'active' : ''}" 
                onclick="window.app.selectCategory('favorites')" title="${t('myFavorites')}">
          ⭐
        </button>
      `;
      
      // Categories
      const categories = getCategories();
      categories.forEach(category => {
        const catName = t(`categories.${category.id}`) || category.name;
        html += `
          <button class="category-icon-btn ${state.currentCategory === category.id ? 'active' : ''}" 
                  onclick="window.app.selectCategory('${category.id}')" title="${catName}">
            ${category.icon}
          </button>
        `;
      });
      
      html += `</div>`;
    }
    
    toggleBar.innerHTML = html;
    
    // Re-bind toggle event since we recreated the button
    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
  }

  // ============================================
  // Sidebar Rendering
  // ============================================
  function renderSidebar() {
    const totalFavorites = state.favorites.length + state.customLinks.length;
    
    let html = `
      <div class="category-item ${state.currentCategory === 'all' ? 'active' : ''}" data-category="all">
        <div class="category-header" onclick="window.app.selectCategory('all')">
          <span class="category-icon">🌐</span>
          <span class="category-name">${t('allResources')}</span>
        </div>
      </div>
      <div class="category-item ${state.currentCategory === 'favorites' ? 'active' : ''}" data-category="favorites">
        <div class="category-header" onclick="window.app.selectCategory('favorites')">
          <span class="category-icon">⭐</span>
          <span class="category-name">${t('myFavorites')}</span>
          <span class="category-arrow" style="margin-left: auto; font-size: 12px; color: var(--text-muted);">${totalFavorites}</span>
        </div>
      </div>
    `;

    // Render categories
    const categories = getCategories();
    categories.forEach(category => {
      const isExpanded = state.expandedCategories.has(category.id);
      const isActive = state.currentCategory === category.id;
      const catName = t(`categories.${category.id}`) || category.name;
      
      html += `
        <div class="category-item ${isExpanded ? 'expanded' : ''} ${isActive ? 'active' : ''}" data-category="${category.id}">
          <div class="category-header" onclick="window.app.toggleCategory('${category.id}')">
            <span class="category-icon">${category.icon}</span>
            <span class="category-name">${catName}</span>
            <span class="category-arrow">▶</span>
          </div>
          <ul class="subcategory-list">
      `;

      // Render subcategories
      if (category.subcategories) {
        const subcats = Object.entries(category.subcategories).map(([subId, subData]) => ({
          id: subId,
          ...subData
        }));
        
        subcats.forEach(sub => {
          const subIsActive = state.currentCategory === category.id && state.currentSubcategory === sub.id;
          const subName = t(`subcategories.${sub.id}`) || sub.name;
          html += `
            <li class="${subIsActive ? 'active' : ''}" onclick="window.app.selectSubcategory('${category.id}', '${sub.id}')">
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

    elements.sidebarNav.innerHTML = html;
  }

  // ============================================
  // Links Rendering
  // ============================================
  function renderLinks() {
    // Remove existing custom links bar
    const existingBar = document.querySelector('.custom-links-bar');
    if (existingBar) existingBar.remove();
    
    let links = [];
    let title = t('allResources');
    let groupedLinks = null;

    // Get links based on current selection
    if (state.currentCategory === 'all') {
      title = t('allResources');
      const categories = getCategories();
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
    } else if (state.currentCategory === 'favorites') {
      title = t('myFavorites');
      
      // Add custom links bar
      const customBar = document.createElement('div');
      customBar.className = 'custom-links-bar';
      customBar.innerHTML = `
        <span class="bar-title">📌 ${t('customLinks')} (${state.customLinks.length})</span>
        <div class="bar-actions">
          <button class="btn btn-primary btn-sm" onclick="window.app.openAddModal()">${t('add')}</button>
          <button class="btn btn-secondary btn-sm" onclick="window.app.openExportImportModal()">${t('more')}</button>
        </div>
      `;
      elements.contentGrid.parentElement.insertBefore(customBar, elements.contentGrid);
      
      // Get favorites from predefined links
      const categories = getCategories();
      categories.forEach(cat => {
        if (cat.subcategories) {
          const subcats = Object.entries(cat.subcategories).map(([subId, subData]) => ({
            id: subId,
            ...subData
          }));
          subcats.forEach(sub => {
            if (sub.items) {
              sub.items.forEach(link => {
                if (state.favorites.includes(link.name)) {
                  links.push({...link, category: cat.name, subcategory: sub.name});
                }
              });
            }
          });
        }
      });
      
      // Add custom links
      state.customLinks.forEach(link => {
        links.push({
          ...link,
          isCustom: true,
          category: state.language === 'en' ? 'Custom' : '自定义',
          subcategory: state.language === 'en' ? 'My Links' : '我的链接'
        });
      });
    } else {
      const category = LINKS_DATA[state.currentCategory];
      if (category) {
        title = t(`categories.${state.currentCategory}`) || category.name;
        if (state.currentSubcategory && category.subcategories) {
          const subcategory = category.subcategories[state.currentSubcategory];
          if (subcategory) {
            title = t(`subcategories.${state.currentSubcategory}`) || subcategory.name;
            links = (subcategory.items || []).map(link => ({...link, category: category.name, subcategory: subcategory.name}));
          }
        } else {
          // Group links by subcategory for this category
          if (category.subcategories) {
            groupedLinks = {};
            const subcats = Object.entries(category.subcategories).map(([subId, subData]) => ({
              id: subId,
              ...subData
            }));
            subcats.forEach(sub => {
              if (sub.items && sub.items.length > 0) {
                groupedLinks[sub.id] = {
                  name: t(`subcategories.${sub.id}`) || sub.name,
                  icon: sub.icon || '📁',
                  items: sub.items.map(link => ({...link, category: category.name, subcategory: sub.name}))
                };
              }
            });
          }
        }
      }
    }

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      if (groupedLinks) {
        const filteredGroups = {};
        Object.entries(groupedLinks).forEach(([subId, subData]) => {
          const filteredItems = subData.items.filter(link =>
            link.name.toLowerCase().includes(query) ||
            (link.title && link.title.toLowerCase().includes(query))
          );
          if (filteredItems.length > 0) {
            filteredGroups[subId] = {...subData, items: filteredItems};
          }
        });
        groupedLinks = filteredGroups;
      } else {
        links = links.filter(link => 
          link.name.toLowerCase().includes(query) ||
          (link.title && link.title.toLowerCase().includes(query))
        );
      }
      title = state.language === 'en' ? `Search: "${state.searchQuery}"` : `搜索: "${state.searchQuery}"`;
    }

    elements.currentCategory.textContent = title;
    
    // Render links grid
    if (groupedLinks) {
      const groupEntries = Object.entries(groupedLinks);
      if (groupEntries.length === 0) {
        elements.contentGrid.innerHTML = `
          <div class="empty-state">
            <span>📭</span>
            <p>${state.searchQuery ? t('noMatchingResources') : t('noResources')}</p>
          </div>
        `;
      } else {
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
            const isFavorite = state.favorites.includes(link.name);
            html += `
              <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-card" style="animation-delay: ${delayIndex * 0.03}s">
                <div class="link-card-icon">${link.icon || '🔗'}</div>
                <div class="link-card-name">${link.name}</div>
                <span class="link-card-favorite ${isFavorite ? 'active' : ''}" onclick="event.preventDefault(); event.stopPropagation(); window.app.toggleFavorite('${link.name.replace(/'/g, "\\'")}')">${isFavorite ? '★' : '☆'}</span>
              </a>
            `;
            delayIndex++;
            totalLinks++;
          });
          
          html += `
              </div>
            </div>
          `;
        });
        
        elements.contentGrid.innerHTML = html;
        updateLinkCount(totalLinks);
      }
    } else {
      if (links.length === 0) {
        elements.contentGrid.innerHTML = `
          <div class="empty-state">
            <span>📭</span>
            <p>${state.searchQuery ? t('noMatchingResources') : t('noResources')}</p>
          </div>
        `;
      } else {
        elements.contentGrid.innerHTML = links.map((link, index) => {
          const isFavorite = state.favorites.includes(link.name);
          const isCustom = link.isCustom;
          
          if (isCustom) {
            return `
              <div class="link-card custom-link" style="animation-delay: ${index * 0.03}s">
                <div class="link-card-actions">
                  <button onclick="window.app.openEditModal('${link.id}')" title="${t('edit')}">✏️</button>
                  <button class="delete" onclick="window.app.deleteCustomLink('${link.id}')" title="${t('delete')}">🗑️</button>
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
              <span class="link-card-favorite ${isFavorite ? 'active' : ''}" onclick="event.preventDefault(); event.stopPropagation(); window.app.toggleFavorite('${link.name.replace(/'/g, "\\'")}')">${isFavorite ? '★' : '☆'}</span>
            </a>
          `;
        }).join('');
        updateLinkCount(links.length);
      }
    }
  }

  // ============================================
  // Category Selection
  // ============================================
  function selectCategory(categoryId) {
    state.currentCategory = categoryId;
    state.currentSubcategory = null;
    
    if (categoryId !== 'all' && categoryId !== 'favorites') {
      state.expandedCategories.add(categoryId);
    }
    
    renderSidebar();
    renderCollapsedNav();
    renderLinks();
    
    if (window.innerWidth <= 768) {
      closeMobileSidebar();
    }
  }

  function selectSubcategory(categoryId, subcategoryId) {
    state.currentCategory = categoryId;
    state.currentSubcategory = subcategoryId;
    state.expandedCategories.add(categoryId);
    
    renderSidebar();
    renderCollapsedNav();
    renderLinks();
    
    if (window.innerWidth <= 768) {
      closeMobileSidebar();
    }
  }

  function toggleCategory(categoryId) {
    if (state.expandedCategories.has(categoryId)) {
      state.expandedCategories.delete(categoryId);
    } else {
      state.expandedCategories.add(categoryId);
    }
    
    state.currentCategory = categoryId;
    state.currentSubcategory = null;
    
    renderSidebar();
    renderCollapsedNav();
    renderLinks();
  }

  // ============================================
  // Favorites Management
  // ============================================
  function toggleFavorite(linkName) {
    const index = state.favorites.indexOf(linkName);
    if (index > -1) {
      state.favorites.splice(index, 1);
    } else {
      state.favorites.push(linkName);
    }
    
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    renderLinks();
    renderSidebar();
    renderCollapsedNav();
  }

  // ============================================
  // Custom Links Management
  // ============================================
  function generateId() {
    return 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  function openAddModal() {
    state.editingLinkId = null;
    elements.modalTitle.textContent = t('addCustomLink');
    elements.linkName.value = '';
    elements.linkUrl.value = '';
    elements.linkIcon.value = '';
    elements.linkNote.value = '';
    elements.modalOverlay.classList.add('active');
    elements.linkName.focus();
  }

  function openEditModal(linkId) {
    const link = state.customLinks.find(l => l.id === linkId);
    if (!link) return;
    
    state.editingLinkId = linkId;
    elements.modalTitle.textContent = t('editLink');
    elements.linkName.value = link.name;
    elements.linkUrl.value = link.url;
    elements.linkIcon.value = link.icon || '';
    elements.linkNote.value = link.note || '';
    elements.modalOverlay.classList.add('active');
    elements.linkName.focus();
  }

  function closeModal() {
    elements.modalOverlay.classList.remove('active');
    state.editingLinkId = null;
  }

  function saveCustomLink() {
    const name = elements.linkName.value.trim();
    const url = elements.linkUrl.value.trim();
    const icon = elements.linkIcon.value.trim() || '🔗';
    const note = elements.linkNote.value.trim();
    
    // Validation
    if (!name) {
      elements.linkName.classList.add('error');
      elements.linkName.focus();
      return;
    }
    elements.linkName.classList.remove('error');
    
    if (!url) {
      elements.linkUrl.classList.add('error');
      elements.linkUrl.focus();
      return;
    }
    elements.linkUrl.classList.remove('error');
    
    // Validate URL format
    try {
      new URL(url);
    } catch {
      elements.linkUrl.classList.add('error');
      elements.linkUrl.focus();
      return;
    }
    elements.linkUrl.classList.remove('error');
    
    if (state.editingLinkId) {
      // Edit existing
      const index = state.customLinks.findIndex(l => l.id === state.editingLinkId);
      if (index > -1) {
        state.customLinks[index] = {
          ...state.customLinks[index],
          name,
          url,
          icon,
          note,
          updatedAt: new Date().toISOString()
        };
      }
    } else {
      // Add new
      state.customLinks.push({
        id: generateId(),
        name,
        url,
        icon,
        note,
        createdAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem('customLinks', JSON.stringify(state.customLinks));
    closeModal();
    renderLinks();
    renderSidebar();
  }

  function deleteCustomLink(linkId) {
    if (!confirm(t('confirmDelete'))) return;
    
    state.customLinks = state.customLinks.filter(l => l.id !== linkId);
    localStorage.setItem('customLinks', JSON.stringify(state.customLinks));
    renderLinks();
    renderSidebar();
  }

  // ============================================
  // Export/Import
  // ============================================
  function openExportImportModal() {
    elements.exportImportOverlay.classList.add('active');
    elements.exportImportInfo.textContent = state.language === 'en' 
      ? `${t('currentCustomLinks')}: ${state.customLinks.length}`
      : `${t('currentCustomLinks')} ${state.customLinks.length} 个自定义链接`;
    elements.exportImportInfo.className = 'export-import-info';
  }

  function closeExportImportModal() {
    elements.exportImportOverlay.classList.remove('active');
  }

  function exportLinks() {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      customLinks: state.customLinks,
      favorites: state.favorites
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
    
    elements.exportImportInfo.textContent = t('exportSuccess');
    elements.exportImportInfo.className = 'export-import-info success';
  }

  function importLinks(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const data = JSON.parse(event.target.result);
        
        if (!data.customLinks && !data.favorites) {
          throw new Error(t('invalidBackupFormat'));
        }
        
        // Import custom links (merge)
        if (data.customLinks && Array.isArray(data.customLinks)) {
          const existingIds = new Set(state.customLinks.map(l => l.id));
          const newLinks = data.customLinks.filter(l => !existingIds.has(l.id));
          state.customLinks = [...state.customLinks, ...newLinks];
          localStorage.setItem('customLinks', JSON.stringify(state.customLinks));
        }
        
        // Import favorites (merge)
        if (data.favorites && Array.isArray(data.favorites)) {
          const existingFavorites = new Set(state.favorites);
          data.favorites.forEach(f => {
            if (!existingFavorites.has(f)) {
              state.favorites.push(f);
            }
          });
          localStorage.setItem('favorites', JSON.stringify(state.favorites));
        }
        
        elements.exportImportInfo.textContent = t('importSuccess');
        elements.exportImportInfo.className = 'export-import-info success';
        
        renderLinks();
        renderSidebar();
      } catch (err) {
        elements.exportImportInfo.textContent = t('importFailed') + ' ' + err.message;
        elements.exportImportInfo.className = 'export-import-info error';
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset file input
  }

  // ============================================
  // Sidebar Toggle
  // ============================================
  function toggleSidebar() {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    elements.sidebar.classList.toggle('collapsed', state.sidebarCollapsed);
    elements.sidebarToggleBar.classList.toggle('collapsed-nav', state.sidebarCollapsed);
    renderCollapsedNav();
  }

  function openMobileSidebar() {
    elements.sidebar.classList.add('mobile-open');
    elements.sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileSidebar() {
    elements.sidebar.classList.remove('mobile-open');
    elements.sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ============================================
  // Search
  // ============================================
  function handleSearch(e) {
    state.searchQuery = e.target.value.trim();
    renderLinks();
  }

  // ============================================
  // Utility Functions
  // ============================================
  function updateLinkCount(count) {
    if (count !== undefined) {
      elements.linkCount.textContent = `${count} ${t('links')}`;
    } else {
      let total = 0;
      const categories = getCategories();
      categories.forEach(cat => {
        if (cat.subcategories) {
          const subcats = Object.entries(cat.subcategories);
          subcats.forEach(([, subData]) => {
            total += (subData.items || []).length;
          });
        }
      });
      elements.linkCount.textContent = `${total} ${t('links')}`;
    }
  }

  function handleScroll() {
    const grid = elements.contentGrid;
    if (grid.scrollTop > 200) {
      elements.returnTop.classList.add('visible');
    } else {
      elements.returnTop.classList.remove('visible');
    }
  }

  function scrollToTop() {
    elements.contentGrid.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ============================================
  // Event Bindings
  // ============================================
  function bindEvents() {
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);

    // Sidebar toggle
    elements.sidebarToggle.addEventListener('click', toggleSidebar);

    // Mobile menu
    elements.mobileMenuBtn.addEventListener('click', openMobileSidebar);
    elements.sidebarOverlay.addEventListener('click', closeMobileSidebar);

    // Search
    elements.searchInput.addEventListener('input', handleSearch);

    // Return to top
    elements.returnTop.addEventListener('click', scrollToTop);
    elements.contentGrid.addEventListener('scroll', handleScroll);

    // Language dropdown
    if (elements.langDropdownBtn) {
      elements.langDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.languageSwitcher.classList.toggle('open');
        elements.langDropdownMenu.classList.toggle('open');
      });
    }
    
    // Language options in dropdown
    if (elements.languageSwitcher) {
      const langOptions = elements.languageSwitcher.querySelectorAll('.lang-option');
      langOptions.forEach(option => {
        option.addEventListener('click', () => {
          const lang = option.dataset.lang;
          changeLanguage(lang);
        });
      });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (elements.languageSwitcher && !elements.languageSwitcher.contains(e.target)) {
        elements.languageSwitcher.classList.remove('open');
        if (elements.langDropdownMenu) {
          elements.langDropdownMenu.classList.remove('open');
        }
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        elements.searchInput.focus();
      }
      // Escape to close modals
      if (e.key === 'Escape') {
        closeModal();
        closeExportImportModal();
        closeMobileSidebar();
      }
    });
  }

  // ============================================
  // Modal Event Bindings
  // ============================================
  function bindModalEvents() {
    // Custom link modal
    elements.modalClose.addEventListener('click', closeModal);
    elements.modalCancel.addEventListener('click', closeModal);
    elements.modalSave.addEventListener('click', saveCustomLink);
    elements.modalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.modalOverlay) closeModal();
    });
    
    // Export/Import modal
    elements.exportImportClose.addEventListener('click', closeExportImportModal);
    elements.exportBtn.addEventListener('click', exportLinks);
    elements.importBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', importLinks);
    elements.exportImportOverlay.addEventListener('click', (e) => {
      if (e.target === elements.exportImportOverlay) closeExportImportModal();
    });
  }

  // ============================================
  // Public API
  // ============================================
  window.app = {
    selectCategory,
    selectSubcategory,
    toggleCategory,
    toggleFavorite,
    openAddModal,
    openEditModal,
    deleteCustomLink,
    openExportImportModal,
    changeLanguage
  };

  // ============================================
  // Start Application
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
