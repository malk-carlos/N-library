let loginData,adminData

function toAdmin() {
    const inPass = window.prompt("管理者用パスワードを入力", "");
    const pass = "Amagasaki2022";

    if (inPass == pass) {
        admin();
    } else {
        alert("パスワードが違います");
    }
}

function admin() {
    let loginData = cheak()
    send("admin_cheak", new Date().toLocaleString(), ((document.cookie + ';').match('IP=([^¥S;]*)') || [])[1], loginData.email, platform.name, platform.version, platform.os.toString(), navigator.userAgent, "", encodeURIComponent(loginData.name), encodeURIComponent(loginData.sub))
}

function cheak() {
    //cookie照会処理
    const sessionid = cookieVal('sessionID');
    function cookieVal(key) { return Cookies.get('sessionID'); }
    if (sessionid) {
        loginData = JSON.parse(sessionid)
    }
    return loginData
}
function admin_cheak(){
    //cookie照会処理
    const sessionid = cookieVal('Admin');
    function cookieVal(key) { return Cookies.get('sessionID'); }
    if (sessionid) {
        adminData = JSON.parse(sessionid)
    }

    if(!adminData){
        window.location.href = "/error.html?E3"
    }
}

function logout() {
    //Cookie削除
    document.cookie = "sessionID=; max-age=0"; window.location.href = "./index.html"
}

function systems() {
    try {
        let sessionid = cookieVal('sessionID');
        function cookieVal(key) { return Cookies.get('sessionID') }        

        //cookieにログイン情報を照会
        loginData = JSON.parse(sessionid)

        //アカウントがnnn.ed.jpかどうか
        if (loginData.hd !== "nnn.ed.jp") {
            //ログ出力
            //モード,日付,IPアドレス,メールアドレス,利用ブラウザ,利用ブラウザバージョン,OS名,ユーザーエージェント,エラー情報(NotSupportAccount)
            send("log", new Date().toLocaleString(), ((document.cookie + ';').match('IP=([^¥S;]*)') || [])[1], loginData.email, platform.name, platform.version, platform.os.toString(), navigator.userAgent, "NotSupportAccount","","")
            //エラー発生
            throw "対応していないアカウント"
        }

        //↓削除予定　JWTのデバッグ出力
        console.log(loginData)

        //ログ出力
        //モード,日付,IPアドレス,メールアドレス,利用ブラウザ,利用ブラウザバージョン,OS名,ユーザーエージェント,エラー情報(なし)
        send("log", new Date().toLocaleString(), ((document.cookie + ';').match('IP=([^¥S;]*)') || [])[1], loginData.email, platform.name, platform.version, platform.os.toString(), navigator.userAgent, "", encodeURIComponent(loginData.name), encodeURIComponent(loginData.sub))
        setTimeout(() => {
            window.location.href = "./mypage.html"
        }, 1000);


        //URLバーpath削除
        //        history.replaceState('', '', new URL(window.location.href).pathname);

    } catch (e) {
        if (e == "対応していないアカウント") {
            //エラーページへ移行
            //nnn.ed.jp以外のアカウントログイン
            setTimeout(() => {
                window.location.href = "./error.html?E1"
            }, 1000);
        } else {
            //正しくないアクセス
            //エラーページへ移行
            //ログ出力
            //モード,日付,IPアドレス,メールアドレス,利用ブラウザ,利用ブラウザバージョン,OS名,ユーザーエージェント,エラー情報(LoginUrlError)
            send("log", new Date().toLocaleString(), ((document.cookie + ';').match('IP=([^¥S;]*)') || [])[1], "", platform.name, platform.version, platform.os.toString(), navigator.userAgent, "LoginUrlError","","")
            setTimeout(() => {
                window.location.href = "./error.html?E2"
            }, 1000);


        }
    }
}