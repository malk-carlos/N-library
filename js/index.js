/*初期設定*/
console.log("＝＝＝初期設定＝＝＝")

//ログインセッション確認
if (cheak()) {  //ログイン確認済み
    console.log("Cookieログイン情報確認済み")
    if (localStorage.getItem('debug') == 1) {
        Swal.fire("デバックモード","一時停止中").then((result) => {
            systems()
        })}
} else { //再ログイン必要
    console.log("Cookieログイン情報が見当たりません")
}
console.log("＝＝＝初期設定ここまで＝＝＝")

window.addEventListener('load', function() {
    if(localStorage.getItem('debug') == 1){
        let element = document.querySelector('body');;
        element.insertAdjacentHTML('afterbegin', '<h1>デバッグモード</h1>');
    }
})

/*初期設定ここまで*/


/*Googleログイン認証後処理*/
function handleCredentialResponse(response) {
    console.log("＝＝＝Googleログイン処理後開始＝＝＝")
    console.log("sessionID",JSON.stringify(jwt_decode(response.credential)))
    Cookies.set('sessionID', (JSON.stringify(jwt_decode(response.credential))), { expires: 1 }); //Cookie設定（有効期限1日）
    if (localStorage.getItem('agree') == 1) {//利用規約同意確認
        console.log("規約同意済み")
        systems() //systems起動
    } else {//初回利用
        console.log("初回利用")
        Swal.fire({
            title: '<strong>HTML <u>example</u></strong>',
            icon: 'info',
            html:
                'You can use <b>bold text</b>, ' +
                '<a href="//sweetalert2.github.io">links</a> ' +
                'and other HTML tags',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: '同意します',
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: '同意しません'
        }).then((result) => {
            if (result.dismiss == "cancel") {
                console.log("同意不可")
                logout()
            } else {
                console.log("同意")
                localStorage.setItem('agree', 1);
                if (localStorage.getItem('debug') == 1) {
                    Swal.fire("デバックモード","一時停止中").then((result) => {
                        systems()
                    })
                }
            }
        })
    }
    console.log("＝＝＝Googleログイン処理後ここまで＝＝＝")
}
/*Googleログイン認証後処理ここまで*/


/*リキャプチャ判定後*/
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
/*リキャプチャ判定後ここまで*/

/*デバックアラート表示*/
function debugalert() {
    Swal.fire({
        title: '開発者用モード',
        text: 'キャンセルボタンを押してお戻りください',
        showCancelButton: true,
        showConfirmButton: true,
        showDenyButton: true,
        denyButtonText: 'キャンセル',
        confirmButtonText: 'キャンセル',
        cancelButtonText: 'キャンセル',
        footer: `<div onclick="debug()">　　　　　　　</div>`
    })
}
/*デバックアラート表示ここまで*/

/*デバックモード*/
function debug() {
    console.log("＝＝＝デバック開始＝＝＝")
    if(localStorage.getItem('debug') == 1){
        console.log("デバックモードオフ")
        localStorage.removeItem('debug') //デバックモードOFF)
    }else{
    localStorage.removeItem('agree')
    localStorage.setItem('debug', 1);
    console.log("利用規約初期化....デバックモードオン")}
    Swal.close()
    console.log("＝＝＝デバック開始ここまで＝＝＝")
}
/*デバックモードここまで*/