let loginData

function cheak(){
    //cookie照会処理
    const sessionid = cookieVal('sessionID');
    function cookieVal(key) { return ((document.cookie + ';').match(key + '=([^¥S;]*)') || [])[1]; }
    if(sessionid){
        loginData = JSON.parse(sessionid)
    }
    return loginData
}

function logout(){
    //Cookie削除
    document.cookie = "sessionID=; max-age=0";window.location.href = "./index.html"
}

function systems() {
    try {
        const sessionid = cookieVal('sessionID');
        function cookieVal(key) { return ((document.cookie + ';').match(key + '=([^¥S;]*)') || [])[1]; }

        //cookieにログイン情報を照会
        loginData = JSON.parse(sessionid)

        //アカウントがnnn.ed.jpかどうか
        if (loginData.hd !== "nnn.ed.jp") {
            //ログ出力
            //モード,日付,IPアドレス,メールアドレス,利用ブラウザ,利用ブラウザバージョン,OS名,ユーザーエージェント,エラー情報(NotSupportAccount)
            send("log",new Date().toLocaleString(), ((document.cookie + ';').match('IP=([^¥S;]*)') || [])[1], loginData.email, platform.name, platform.version, platform.os.toString(), navigator.userAgent, "NotSupportAccount")
            //エラー発生
            throw "対応していないアカウント"
        }

        //↓削除予定　JWTのデバッグ出力
        console.log(loginData)

        //ログ出力
        //モード,日付,IPアドレス,メールアドレス,利用ブラウザ,利用ブラウザバージョン,OS名,ユーザーエージェント,エラー情報(なし)
        send("log",new Date().toLocaleString(), ((document.cookie + ';').match('IP=([^¥S;]*)') || [])[1], loginData.email, platform.name, platform.version, platform.os.toString(), navigator.userAgent, "")



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
            send("log",new Date().toLocaleString(), ((document.cookie + ';').match('IP=([^¥S;]*)') || [])[1], "", platform.name, platform.version, platform.os.toString(), navigator.userAgent, "LoginUrlError")
            setTimeout(() => {
            window.location.href = "./error.html?E2"
            }, 1000);


        }
    }
}