/*初期設定*/
let loginData, adminData
/*初期設定ここまで*/

/*adminログインアクセス処理*/
function toAdmin() {
    console.log("===toAdmin()開始===")
    $("#overlay").fadeIn(300);//待機画面開始
    const adminCheak = admin();
    if (adminCheak) {//adminかどうか
        if (localStorage.getItem('debug') == 1) {
            Swal.fire("デバックモード", "一時停止中").then((result) => {
                window.location.href = "./admin.html";
            })
        } else {
            window.location.href = "./admin.html";
        }
    } else {
        $("#overlay").fadeOut(300);//待機画面終了
    }
    console.log("===toAdmin()ここまで===")
}
/*adminログインアクセス処理ここまで*/

/*admin情報問い合わせ */
function admin() {
    console.log("===admin()開始===")
    let loginData = cheak()
    send("admin_cheak", new Date().toLocaleString(), ((document.cookie + ';').match('IP=([^¥S;]*)') || [])[1], loginData.email, platform.name, platform.version, platform.os.toString(), navigator.userAgent, "", encodeURIComponent(loginData.name), encodeURIComponent(loginData.sub))
    console.log("===admin()ここまで===")
}
/*admin情報問い合わせここまで*/


/*ログイン状態チェック（ユーザーデータ取得）*/
function cheak() {
    console.log("===cheak()開始===")
    //cookie照会処理
    const sessionid = Cookies.get('sessionID');
    if (sessionid) {
        loginData = JSON.parse(sessionid)
    }
    console.log("===cheak()ここまで===")
    return loginData

}
/*ログイン状態チェック（ユーザーデータ取得）ここまで*/

/*adminログイン状態チェック*/
function admin_cheak() {
    console.log("===admin_cheak()開始===")
    //cookie照会処理
    const sessionid = Cookies.get('Admin');
    $("#overlay").fadeOut(300);
    if (!sessionid) {
        if (localStorage.getItem('debug') == 1) {
            Swal.fire("デバックモード", "一時停止中").then((result) => {
                window.location.href = "./error.html?E3"
            })
        } else {
            window.location.href = "./error.html?E3"
        }
    }
    console.log("===admin_cheak()ここまで===")
}
/*adminログイン状態チェックここまで*/

/*ログアウト処理*/
function logout() {
    console.log("===logout()開始===")
    //Cookie削除
    Cookies.set('sessionID', "");
    Cookies.set('Admin', "");
    if (localStorage.getItem('debug') == 1) {
        Swal.fire("デバックモード", "一時停止中").then((result) => {
        window.location.href = "./index.html"
        })
    } else {
        window.location.href = "./index.html"
    }
    console.log("===logout()ここまで===")
}
/*ログアウト処理ここまで*/


/*ログイン処理*/
function systems() {
    console.log("===system()開始===")
    try {
        let sessionid = Cookies.get('sessionID')
        //cookieにログイン情報を照会
        loginData = JSON.parse(sessionid)

        //アカウントがnnn.ed.jpかどうか
        if (loginData.hd !== "nnn.ed.jp") {
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
    console.log("===system()ここまで===")
}
/*ログイン処理ここまで*/

