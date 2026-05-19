/**
 * The Code Map - Internationalization (i18n) Module
 * Multi-language support for the application
 */

const I18n = {
  // Translation data for all languages
  translations: {
    en: {
      langName: 'English',
      langIcon: '🇺🇸',
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
      
      // Data Source UI
      dataSource: 'Data Source',
      dataSourceSettings: 'Data Source Settings',
      localData: 'Local Data',
      localDataDesc: 'Use local JSON file, fast and stable',
      githubDataSource: 'GitHub Data Source',
      githubDataSourceDesc: 'Sync data from GitHub repository',
      githubConfig: 'GitHub Configuration',
      rawFileUrl: 'Raw File URL',
      repoOwner: 'Repository Owner',
      repoName: 'Repository Name',
      gistId: 'Gist ID',
      githubToken: 'GitHub Token (optional)',
      githubTokenPlaceholder: 'ghp_xxxx to increase API limits',
      statusInfo: 'Status Information',
      cacheStatus: 'Cache Status',
      offlineBackup: 'Offline Backup',
      apiLimit: 'API Limit',
      clearCache: 'Clear Cache',
      syncData: 'Sync Data',
      syncing: 'Syncing...',
      syncSuccess: 'Sync successful!',
      syncFailed: 'Sync failed:',
      cacheCleared: 'Cache cleared',
      
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
      langIcon: '🇨🇳',
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
      
      // Data Source UI
      dataSource: '数据源',
      dataSourceSettings: '数据源设置',
      localData: '本地数据',
      localDataDesc: '使用本地 JSON 文件，快速稳定',
      githubDataSource: 'GitHub 数据源',
      githubDataSourceDesc: '从 GitHub 仓库同步数据',
      githubConfig: 'GitHub 配置',
      rawFileUrl: 'Raw 文件 URL',
      repoOwner: '仓库所有者',
      repoName: '仓库名称',
      gistId: 'Gist ID',
      githubToken: 'GitHub Token (可选)',
      githubTokenPlaceholder: 'ghp_xxxx 提高API限制',
      statusInfo: '状态信息',
      cacheStatus: '缓存状态',
      offlineBackup: '离线备份',
      apiLimit: 'API 限制',
      clearCache: '清除缓存',
      syncData: '同步数据',
      syncing: '同步中...',
      syncSuccess: '同步成功！',
      syncFailed: '同步失败：',
      cacheCleared: '缓存已清除',
      
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
      langIcon: '🇯🇵',
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
      
      // Data Source UI
      dataSource: 'データソース',
      dataSourceSettings: 'データソース設定',
      localData: 'ローカルデータ',
      localDataDesc: 'ローカルJSONファイルを使用、高速で安定',
      githubDataSource: 'GitHub データソース',
      githubDataSourceDesc: 'GitHubリポジトリからデータを同期',
      githubConfig: 'GitHub 設定',
      rawFileUrl: 'Raw ファイル URL',
      repoOwner: 'リポジトリ所有者',
      repoName: 'リポジトリ名',
      gistId: 'Gist ID',
      githubToken: 'GitHub トークン (オプション)',
      githubTokenPlaceholder: 'ghp_xxxx API制限を増やす',
      statusInfo: 'ステータス情報',
      cacheStatus: 'キャッシュステータス',
      offlineBackup: 'オフラインバックアップ',
      apiLimit: 'API 制限',
      clearCache: 'キャッシュをクリア',
      syncData: 'データを同期',
      syncing: '同期中...',
      syncSuccess: '同期成功！',
      syncFailed: '同期失敗：',
      cacheCleared: 'キャッシュをクリアしました',
      
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
      langIcon: '🇰🇷',
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
      
      // Data Source UI
      dataSource: '데이터 소스',
      dataSourceSettings: '데이터 소스 설정',
      localData: '로컬 데이터',
      localDataDesc: '로컬 JSON 파일 사용, 빠르고 안정적',
      githubDataSource: 'GitHub 데이터 소스',
      githubDataSourceDesc: 'GitHub 저장소에서 데이터 동기화',
      githubConfig: 'GitHub 설정',
      rawFileUrl: 'Raw 파일 URL',
      repoOwner: '저장소 소유자',
      repoName: '저장소 이름',
      gistId: 'Gist ID',
      githubToken: 'GitHub 토큰 (선택)',
      githubTokenPlaceholder: 'ghp_xxxx API 제한 증가',
      statusInfo: '상태 정보',
      cacheStatus: '캐시 상태',
      offlineBackup: '오프라인 백업',
      apiLimit: 'API 제한',
      clearCache: '캐시 지우기',
      syncData: '데이터 동기화',
      syncing: '동기화 중...',
      syncSuccess: '동기화 성공!',
      syncFailed: '동기화 실패:',
      cacheCleared: '캐시 지워짐',
      
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
      langIcon: '🇪🇸',
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
      
      // Data Source UI
      dataSource: 'Fuente de datos',
      dataSourceSettings: 'Configuración de fuente de datos',
      localData: 'Datos locales',
      localDataDesc: 'Usar archivo JSON local, rápido y estable',
      githubDataSource: 'Fuente de datos GitHub',
      githubDataSourceDesc: 'Sincronizar datos desde repositorio GitHub',
      githubConfig: 'Configuración GitHub',
      rawFileUrl: 'URL del archivo Raw',
      repoOwner: 'Propietario del repositorio',
      repoName: 'Nombre del repositorio',
      gistId: 'Gist ID',
      githubToken: 'Token de GitHub (opcional)',
      githubTokenPlaceholder: 'ghp_xxxx aumentar límites API',
      statusInfo: 'Información de estado',
      cacheStatus: 'Estado de caché',
      offlineBackup: 'Respaldo sin conexión',
      apiLimit: 'Límite de API',
      clearCache: 'Limpiar caché',
      syncData: 'Sincronizar datos',
      syncing: 'Sincronizando...',
      syncSuccess: '¡Sincronización exitosa!',
      syncFailed: 'Sincronización fallida:',
      cacheCleared: 'Caché limpiado',
      
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
      langIcon: '🇫🇷',
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
      
      // Data Source UI
      dataSource: 'Source de données',
      dataSourceSettings: 'Paramètres de source de données',
      localData: 'Données locales',
      localDataDesc: 'Utiliser fichier JSON local, rapide et stable',
      githubDataSource: 'Source de données GitHub',
      githubDataSourceDesc: 'Synchroniser les données depuis GitHub',
      githubConfig: 'Configuration GitHub',
      rawFileUrl: 'URL du fichier Raw',
      repoOwner: 'Propriétaire du dépôt',
      repoName: 'Nom du dépôt',
      gistId: 'Gist ID',
      githubToken: 'Token GitHub (optionnel)',
      githubTokenPlaceholder: 'ghp_xxxx augmenter limites API',
      statusInfo: 'Informations de statut',
      cacheStatus: 'État du cache',
      offlineBackup: 'Sauvegarde hors ligne',
      apiLimit: 'Limite API',
      clearCache: 'Effacer le cache',
      syncData: 'Synchroniser',
      syncing: 'Synchronisation...',
      syncSuccess: 'Synchronisation réussie!',
      syncFailed: 'Synchronisation échouée:',
      cacheCleared: 'Cache effacé',
      
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
  },
  
  /**
   * Get translated text for current language
   * @param {string} key - Translation key (supports dot notation)
   * @param {string} lang - Language code (defaults to current language)
   * @returns {string} - Translated text or key if not found
   */
  t(key, lang = null) {
    const language = lang || AppState.language;
    const keys = key.split('.');
    let value = this.translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  },
  
  /**
   * Get all available languages
   * @returns {Array} - Array of language objects {code, name, icon}
   */
  getAvailableLanguages() {
    return Object.entries(this.translations).map(([code, data]) => ({
      code,
      name: data.langName,
      icon: data.langIcon
    }));
  },
  
  /**
   * Check if a language is available
   * @param {string} lang - Language code
   * @returns {boolean}
   */
  isLanguageAvailable(lang) {
    return this.translations.hasOwnProperty(lang);
  }
};

// Export for use in other modules
window.I18n = I18n;
