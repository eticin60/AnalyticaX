// Maintenance and Offline Detection
(function() {
  // Check for maintenance mode
  async function checkMaintenance() {
    try {
      const res = await fetch(`${window.API_BASE || 'https://analyticax-production.up.railway.app'}/api/maintenance/status`);
      const data = await res.json();
      if(data.maintenance === true) {
        window.location.href = "maintenance.html";
        return true;
      }
    } catch(err) {
      // If API is down, might be maintenance
      console.log("Maintenance check failed:", err);
    }
    return false;
  }
  
  // Check for offline
  function checkOffline() {
    if(!navigator.onLine) {
      window.location.href = "offline.html";
      return true;
    }
    return false;
  }
  
  // Listen for online/offline events
  window.addEventListener("offline", () => {
    window.location.href = "offline.html";
  });
  
  window.addEventListener("online", () => {
    // Reload if we're on offline page
    if(window.location.pathname.includes("offline.html")) {
      window.location.href = "index.html";
    }
  });
  
  // Initial checks
  if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if(!checkOffline()) {
        checkMaintenance();
      }
    });
  } else {
    if(!checkOffline()) {
      checkMaintenance();
    }
  }
})();

