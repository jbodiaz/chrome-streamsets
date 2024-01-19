chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: contentScriptFunc,
    args: ['action'],
  });
});

chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({active: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: contentScriptFunc
        });
    });
});

function contentScriptFunc(name) {
    const usernameId = document.getElementById('usernameId');
    const passwordId = document.getElementById('passwordId');
    const loginId = document.getElementById("loginId");
    if (usernameId && passwordId && loginId) {
      usernameId.value = "admin";
      passwordId.value = "admin";
      loginId.click();
    }
}
