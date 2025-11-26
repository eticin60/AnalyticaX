/**
 * AnalyticaX API Configuration
 * Copyright (c) 2025 AnalyticaX. All rights reserved.
 * 
 * This file automatically detects the environment and sets the correct API base URL.
 * - Production: https://analyticax.com.tr
 * - Development: http://localhost:5000
 */

(function() {
  'use strict';
  
  // Detect environment
  const isProduction = window.location.hostname === 'analyticax.com.tr' || 
                       (window.location.hostname !== 'localhost' && 
                        window.location.hostname !== '127.0.0.1' &&
                        !window.location.hostname.startsWith('192.168.') &&
                        !window.location.hostname.startsWith('10.') &&
                        window.location.protocol === 'https:');
  
  // Set API base URL
  window.API_BASE = isProduction 
    ? 'https://analyticax.com.tr' 
    : 'http://localhost:5000';
  
  // Log for debugging (always log in production too for troubleshooting)
  console.log('🔧 API Base URL:', window.API_BASE, '| Hostname:', window.location.hostname, '| Protocol:', window.location.protocol);
})();

