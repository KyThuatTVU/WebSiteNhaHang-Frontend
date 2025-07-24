// Configuration file - Cấu hình tập trung cho toàn bộ ứng dụng
class AppConfig {
    constructor() {
        this.init();
    }

    init() {
        // Detect environment and set API URL accordingly
        this.detectEnvironment();
        this.setAPIUrl();
        
        console.log('🔧 App Config initialized:', {
            environment: this.environment,
            apiUrl: this.API_BASE_URL,
            isProduction: this.isProduction,
            isDevelopment: this.isDevelopment
        });
    }

    detectEnvironment() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        const port = window.location.port;

        // Determine environment based on hostname
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            this.environment = 'development';
            this.isDevelopment = true;
            this.isProduction = false;
        } else {
            this.environment = 'production';
            this.isDevelopment = false;
            this.isProduction = true;
        }

        // Store environment info
        this.hostname = hostname;
        this.protocol = protocol;
        this.port = port;
    }

    setAPIUrl() {
        if (this.isDevelopment) {
            // Development environment - use localhost
            this.API_BASE_URL = 'http://localhost:3000/api';
            this.BASE_URL = 'http://localhost:3000';
        } else {
            // Production environment - use Vercel backend URL
            this.API_BASE_URL = 'https://web-site-nha-hang-back-end.vercel.app/api';
            this.BASE_URL = 'https://web-site-nha-hang-back-end.vercel.app';
        }

        // Make it globally available
        window.API_BASE_URL = this.API_BASE_URL;
        window.BASE_URL = this.BASE_URL;
    }

    // Get API URL for specific endpoint
    getApiUrl(endpoint = '') {
        if (endpoint.startsWith('/')) {
            endpoint = endpoint.substring(1);
        }
        return `${this.API_BASE_URL}${endpoint ? '/' + endpoint : ''}`;
    }

    // Get full URL for assets
    getAssetUrl(path = '') {
        if (path.startsWith('/')) {
            path = path.substring(1);
        }
        return `${this.BASE_URL}${path ? '/' + path : ''}`;
    }

    // Get image URL with fallback
    getImageUrl(imagePath) {
        if (!imagePath) {
            return this.getPlaceholderImage();
        }

        // If already a full URL, return as is
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }

        // If relative path, convert to full URL
        if (imagePath.startsWith('images/') || imagePath.startsWith('/images/')) {
            return `${this.BASE_URL}/${imagePath}`;
        }

        // If just filename, add full path
        return `${this.BASE_URL}/images/${imagePath}`;
    }

    // Get placeholder image
    getPlaceholderImage() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Iw6xuaCDhuqNuaDwvdGV4dD4KICA8L3N2Zz4K';
    }

    // Test API connection
    async testConnection() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(this.getApiUrl('health'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.success === true;

        } catch (error) {
            console.error('❌ API connection test failed:', error.message);
            return false;
        }
    }

    // Get environment-specific settings
    getSettings() {
        return {
            environment: this.environment,
            apiUrl: this.API_BASE_URL,
            baseUrl: this.BASE_URL,
            isDevelopment: this.isDevelopment,
            isProduction: this.isProduction,
            cacheTimeout: this.isDevelopment ? 1000 : 300000, // 1s dev, 5min prod
            enableDebugLogs: this.isDevelopment,
            enableServiceWorker: this.isProduction
        };
    }
}

// Initialize configuration
const appConfig = new AppConfig();

// Export for global use
window.appConfig = appConfig;
window.AppConfig = AppConfig;

// Legacy compatibility
if (!window.API_BASE_URL) {
    window.API_BASE_URL = appConfig.API_BASE_URL;
}

console.log('✅ App configuration loaded successfully');
