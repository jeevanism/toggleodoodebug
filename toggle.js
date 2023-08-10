console.log("extension loaded"); // Log a message indicating that the extension is loaded

document.addEventListener("DOMContentLoaded", function () {
  // Execute when the DOM content of the popup is loaded

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Query for the active tab in the current window

    console.log(tabs, "number of tabs"); // Log the list of tabs and the number of tabs

    if (tabs.length > 0) {
      // Check if there's at least one active tab
      const activeTab = tabs[0]; // Get the first active tab
      const url = new URL(activeTab.url); // Create a URL object from the tab's URL
      // Now execute your toggle logic using the activeTab
      console.log("current Odoo url", url.href); // Log the current Odoo URL

      if (url.href.includes("debug=")) {
        // Check if the URL already contains debug= (regardless of its value)
        if (url.search.includes("debug=1")) {
          // Check if debug=1 is present in the search
          url.search = url.search.replace("debug=1", "debug=0"); // Replace debug=1 with debug=0 in the URL search
          console.log("updated url", url.href); // Log the updated URL
        } else if (url.search.includes("debug=0")) {
          // Check if debug=0 is present in the search
          url.search = url.search.replace("debug=0", "debug=1"); // Replace debug=0 with debug=1 in the URL search
          console.log("updated url", url.href); // Log the updated URL
        }
      } else {
        url.search += (url.search ? '&' : '?') + "debug=1"; // Add ?debug=1 to the URL search
        console.log("updated url", url.href); // Log the updated URL
      }
      console.log("New URL:", url.href); // Log the final new URL
      

      // Update the tab to reload the URL
      chrome.tabs.update(activeTab.id, { url: url.href }); // Update the tab's URL to the new URL
    }
  });
});
