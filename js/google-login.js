/*初期設定*/
let loginData, adminData
/*初期設定ここまで*/

/*adminログインアクセス処理*/
function toAdmin() {
    console.warn("==toAdmin()開始==")
    $("#overlay").fadeIn(300);//待機画面開始
    //呼び出し元解析
    try {
        console.log('呼び出し元: ', cheak.caller.name)
    } catch { console.log('呼び出し元: ', "解析不能"); }

    let loginData = cheak()
    send("admin_cheak", new Date().toLocaleString(), ((document.cookie + ';').match('IP=([^¥S;]*)') || [])[1], loginData.email, platform.name, platform.version, platform.os.toString(), navigator.userAgent, "", encodeURIComponent(loginData.name), encodeURIComponent(loginData.sub))
    console.warn("==toAdmin()ここまで==")
}
/*adminログインアクセス処理ここまで*/

/*ログイン状態チェック（ユーザーデータ取得）*/
function cheak() {
    console.warn("==cheak()開始==")
    //呼び出し元解析
    try {
        console.log('呼び出し元: ', cheak.caller.name)
    } catch { console.log('呼び出し元: ', "解析不能"); }

    //cookie照会処理
    const sessionid = Cookies.get('sessionID');
    if (sessionid) {
        loginData = JSON.parse(sessionid)
    }
    console.warn("==cheak()ここまで==")
    return loginData

}
/*ログイン状態チェック（ユーザーデータ取得）ここまで*/

/*adminログイン状態チェック*/
function admin_cheak() {
    console.warn("==admin_cheak()開始==")
    //呼び出し元解析
    try {
        console.log('呼び出し元: ', cheak.caller.name)
    } catch { console.log('呼び出し元: ', "解析不能"); }
    //cookie照会処理
    const sessionid = Cookies.get('Admin');
    $("#overlay").fadeOut(300);
    if (!sessionid) {
        if (localStorage.getItem('debug')) {
            Swal.fire("デバッグモード", "一時停止中").then((result) => {
                window.location.href = "./error.html?E3"
            })
        } else {
            window.location.href = "./error.html?E3"
        }
    }
    console.warn("==admin_cheak()ここまで==")
}
/*adminログイン状態チェックここまで*/

/*ログアウト処理*/
function logout() {
    console.warn("===logout()開始===")
    //Cookie削除
    Cookies.set('sessionID', "");
    Cookies.set('Admin', "");
    window.location.href = "./index.html"
    console.warn("===logout()ここまで===")
}
/*ログアウト処理ここまで*/


/*ログイン処理*/
function systems() {
    console.warn("===system()開始===")
    //呼び出し元解析
    try {
        console.log('呼び出し元: ', cheak.caller.name)
    } catch { console.log('呼び出し元: ', "解析不能"); }

    try {
        let sessionid = Cookies.get('sessionID')
        //cookieにログイン情報を照会
        loginData = JSON.parse(sessionid)

        //アカウントがnnn.ed.jpかどうか
        if (loginData.hd !== "nnn.ed.jp" || loginData.hd !== "nnn.ac.jp" || loginData.hd !== "nagito.work") {
            //ログ出力
            //モード,日付,IPアドレス,メールアドレス,利用ブラウザ,利用ブラウザバージョン,OS名,ユーザーエージェント,エラー情報(NotSupportAccount)
            send("log", new Date().toLocaleString(), ((document.cookie + ';').match('IP=([^¥S;]*)') || [])[1], loginData.email, platform.name, platform.version, platform.os.toString(), navigator.userAgent, "NotSupportAccount", "", "")
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
            send("log", new Date().toLocaleString(), ((document.cookie + ';').match('IP=([^¥S;]*)') || [])[1], "", platform.name, platform.version, platform.os.toString(), navigator.userAgent, "LoginUrlError", "", "")
            setTimeout(() => {
                window.location.href = "./error.html?E2"
            }, 1000);


        }
    }
    console.warn("===system()ここまで===")
}
/*ログイン処理ここまで*/

