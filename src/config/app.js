const config = {
  // request
  url: import.meta.env.VITE_URL,
  webUrl: import.meta.env.VITE_WEB_URL,
  apiUrl: import.meta.env.VITE_API_URL,
  // formatter
  formatDate: 'd MMM yyyy',
  formatTime: 'HH:mm',
  formatDateTime: 'd MMM yyyy, HH:mm',
  // roles accessible
  loginableRoleIds: [2, 3, 4, 9],
};

// Log configuration on startup
console.log('🔧 Admin Portal Configuration:', {
  VITE_URL: config.url,
  VITE_WEB_URL: config.webUrl,
  VITE_API_URL: config.apiUrl,
  'API URL Status': config.apiUrl ? '✅ Configured' : '❌ Missing',
});

if (!config.apiUrl) {
  console.error('❌ VITE_API_URL is not set! API requests will fail.');
}

export default config;
