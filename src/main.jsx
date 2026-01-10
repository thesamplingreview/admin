import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import config from './config/app.js';

// Log startup info
console.log('🚀 Admin Portal Starting...');
console.log('📋 Environment:', {
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD,
  apiUrl: config.apiUrl,
});

// Expose test function to window for browser console
if (import.meta.env.DEV) {
  window.testApiConnection = async () => {
    console.log('🧪 Testing API Connection...');
    console.log('API URL:', config.apiUrl);
    console.log('─'.repeat(50));
    
    if (!config.apiUrl) {
      const result = { success: false, error: 'API URL not configured' };
      console.error('❌ API URL is not configured!');
      console.log('─'.repeat(50));
      console.log('📊 Test Result:', result);
      return result;
    }
    
    let result = null;
    
    // Test 1: Ping endpoint (root level)
    try {
      console.log('📡 Test 1: Testing /ping endpoint...');
      // Remove trailing slashes and /v1 if present, then add /ping
      let baseUrl = config.apiUrl.replace(/\/+$/, ''); // Remove trailing slashes
      if (baseUrl.endsWith('/v1')) {
        baseUrl = baseUrl.slice(0, -3); // Remove /v1
      }
      const pingUrl = `${baseUrl}/ping`;
      console.log('   URL:', pingUrl);
      
      const pingResponse = await fetch(pingUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const pingData = await pingResponse.json();
      console.log('   Status:', pingResponse.status, pingResponse.statusText);
      console.log('   Response:', pingData);
      
      if (pingResponse.ok) {
        result = { 
          success: true, 
          status: pingResponse.status, 
          data: pingData,
          endpoint: '/ping',
          url: pingUrl,
        };
        console.log('✅ Ping test PASSED');
        console.log('─'.repeat(50));
        console.log('📊 Test Result:', result);
        return result;
      } else {
        console.log('⚠️ Ping returned non-OK status, trying next test...');
      }
    } catch (error) {
      console.error('❌ Ping Failed:', error.message);
      console.error('   Error code:', error.code || 'N/A');
      console.error('   Error name:', error.name || 'N/A');
      // Continue to next test
    }
    
    // Test 2: Try a simple auth endpoint (OPTIONS or HEAD request)
    try {
      console.log('📡 Test 2: Testing /v1/auth/login endpoint (CORS preflight)...');
      const authUrl = `${config.apiUrl}/v1/auth/login`;
      console.log('   URL:', authUrl);
      
      const authResponse = await fetch(authUrl, {
        method: 'OPTIONS',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('   Status:', authResponse.status, authResponse.statusText);
      console.log('   CORS Headers:', Object.fromEntries(authResponse.headers.entries()));
      
      result = { 
        success: authResponse.status < 500, 
        status: authResponse.status,
        endpoint: '/v1/auth/login',
        note: authResponse.status < 500 
          ? 'Endpoint exists (CORS preflight successful)' 
          : 'Server error or endpoint not found',
        url: authUrl,
      };
      
      if (result.success) {
        console.log('✅ CORS preflight test PASSED');
      } else {
        console.log('⚠️ CORS preflight returned error status');
      }
    } catch (error) {
      console.error('❌ Auth Endpoint Test Failed:', error.message);
      console.error('   Error code:', error.code || 'N/A');
      console.error('   Error name:', error.name || 'N/A');
      result = { 
        success: false, 
        error: error.message,
        code: error.code,
      };
    }
    
    console.log('─'.repeat(50));
    console.log('📊 Final Test Result:', result);
    console.log('─'.repeat(50));
    
    if (result.success) {
      console.log('✅ API connection test: SUCCESS');
    } else {
      console.log('❌ API connection test: FAILED');
      console.log('💡 Check the error details above for troubleshooting');
    }
    
    return result;
  };
  
  console.log('💡 Tip: Run window.testApiConnection() in the console to test API connectivity');
  console.log('💡 Or use: await window.testApiConnection() to see the result directly');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
