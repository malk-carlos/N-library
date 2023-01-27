//ログインセッション確認
if (cheak()) {
    //ログイン確認済み
    systems()
} else {
    //再ログイン必要
}

//Googleログイン認証後
function handleCredentialResponse(response) {
    Cookies.set('sessionID', (JSON.stringify(jwt_decode(response.credential))), { expires: 1 }); //Cookie設定（有効期限1日）
    systems() //systems起動
}


//リキャプチャ判定後
function testa() {
    //Googleログイン認証初期設定
    google.accounts.id.initialize({
        client_id: "727467662943-93kq0n9ngaod4rbdqi070sgh78b1si54.apps.googleusercontent.com",//ID
        callback: handleCredentialResponse //コールバック関数
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "filled_blue", size: "large", shape: "pill" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog

    //1秒後ボタン切り替え
    setTimeout(() => {
        document.getElementById("recapucha").style.display = "none"
        document.getElementById("buttonDiv").style.display = "block"
    }, 1000);
}