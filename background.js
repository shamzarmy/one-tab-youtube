chrome.tabs.onCreated.addListener(function (newTab) {
  chrome.tabs.query({}, function (tabs) {
    const youtubeTabs = tabs.filter(tab => 
      tab.url && tab.url.includes('youtube.com/watch')
    );

    if (youtubeTabs.length > 1) {
      // Close the newest tab (could also be newTab.id)
      chrome.tabs.remove(newTab.id);
    }
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url && changeInfo.url.includes('youtube.com/watch')) {
    chrome.tabs.query({}, function (tabs) {
      const youtubeTabs = tabs.filter(t =>
        t.id !== tabId && t.url && t.url.includes('youtube.com/watch')
      );

      if (youtubeTabs.length > 0) {
        // Close the newer one (this one)
        chrome.tabs.remove(tabId);
      }
    });
  }
});
