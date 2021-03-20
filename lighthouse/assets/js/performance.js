(function (callback) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        callback();
    } else {
      document.addEventListener("readystatechange", function() {
        if (document.readyState === "complete") {
          callback();
        }
      });
    }
  })(function perf() { /* the document is now complete. */
  
    var data = {
      url: window.location.href,
      dcl: 0,
      load: 0,
      fcp: 0,
      lcp: 0,
      cls: 0,
      fid: 0
    };
  
    var fcpObserver = new PerformanceObserver(function handleFCP(entryList) {
      var entries = entryList.getEntries() || [];
      entries.forEach(function(entry) {
        if (entry.name === "first-contentful-paint") {
          data.fcp = entry.startTime;
          console.log("Recorded FCP Performance: " + data.fcp);
        }
      });
    }).observe({ type: "paint", buffered: true });
  
    var lcpObserver = new PerformanceObserver(function handleLCP(entryList) {
      var entries = entryList.getEntries() || [];
      entries.forEach(function(entry) {
        if (entry.startTime > data.lcp) {
          data.lcp = entry.startTime;
          console.log("Recorded LCP Performance: " + data.lcp);
        }
      });
    }).observe({ type: "largest-contentful-paint", buffered: true });
  
    var clsObserver = new PerformanceObserver(function handleCLS(entryList) {
      var entries = entryList.getEntries() || [];
      entries.forEach(function(entry) {
        if (!entry.hadRecentInput) {
          data.cls += entry.value;
          console.log("Increased CLS Performance: " + data.cls);
        }
      });
    }).observe({ type: "layout-shift", buffered: true });
  
    var fidObserver = new PerformanceObserver(function handleFID(entryList) {
      var entries = entryList.getEntries() || [];
      entries.forEach(function(entry) {
        data.fid = entry.processingStart - entry.startTime;
        console.log("Recorded FID Performance: " + data.fid);
      });
    }).observe({ type: "first-input", buffered: true });
  
    window.addEventListener("beforeunload", function() {
      var navEntry = performance.getEntriesByType("navigation")[0];
      data.dcl = navEntry.domContentLoadedEventStart;
      data.load = navEntry.loadEventStart;
  
      var payload = JSON.stringify(data);
      navigator.sendBeacon("/api/performance", payload);
      console.log("Sending performance:", payload);
    });
  
  });
  