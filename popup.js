document.getElementById('filter').addEventListener('click', () => {
    const language = document.getElementById('language').value;
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: "filter", language: language}, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log(response ? response.status : "No response");
        }
      });
    });
  });