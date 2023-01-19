//ログインセッション確認
if (cheak()) {
    //ログイン確認済み
    systems()
} else {
    //再ログイン必要
}

function handleCredentialResponse(response) {
    document.cookie = 'sessionID=' + (JSON.stringify(jwt_decode(response.credential))) + '; max-age=86400;';//86400
    systems()
}
function testa() {
    google.accounts.id.initialize({
        client_id: "727467662943-93kq0n9ngaod4rbdqi070sgh78b1si54.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog

    setTimeout(() => {
        document.getElementById("recapucha").style.display = "none"
        document.getElementById("buttonDiv").style.display = "block"
    }, 1000);

}