chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: contentScriptFunc,
    args: ['action'],
  });
});

chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({active: true}, function(tabs) {
        if (command === "login") {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: contentScriptFunc
            });
        } else if (command === "jira-copy") {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: copyJiraName
            });
        }
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

function copyJiraName(name) {
    const text = "textContent" in document.body ? "textContent" : "innerText";
    const keyElement = document.querySelectorAll('[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]')[0][text];
    const nameElement = document.querySelectorAll('[data-testid="issue.views.issue-base.foundation.summary.heading"]')[0][text];
    if (keyElement && nameElement) {
        navigator.clipboard.writeText(keyElement + '. ' + nameElement);
    }
}
