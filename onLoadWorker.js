window.onload=function() {
    const usernameId = document.getElementById('usernameId');
    const passwordId = document.getElementById('passwordId');
    const loginId = document.getElementById("loginId");
    if (usernameId && passwordId && loginId) {
        usernameId.value = "admin";
        passwordId.value = "admin";
        loginId.click();
    }
}