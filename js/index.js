//ログインセッション確認
if (cheak()) {
    //ログイン確認済み
    systems()
} else {
    //再ログイン必要
}
localStorage.removeItem('debug')



//Googleログイン認証後
function handleCredentialResponse(response) {
    Cookies.set('sessionID', (JSON.stringify(jwt_decode(response.credential))), { expires: 1 }); //Cookie設定（有効期限1日）
    if(localStorage.getItem('agree')==1){
        systems() //systems起動
    }else{
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
            cancelButtonAriaLabel: 'T同意しません'
          }).then((result) => {
            if(result.dismiss == "cancel"){
                logout()
            }else{
                localStorage.setItem('agree', 1);
                systems()
            }
          })
    }
    
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

function debugalert(){
    Swal.fire({
        title: '開発者用モード',
        text: 'キャンセルボタンを押してお戻りください',
        showCancelButton: true,
        showConfirmButton:true,
        showDenyButton: true,
        denyButtonText:'キャンセル',
        confirmButtonText:'キャンセル',        
        cancelButtonText: 'キャンセル',
        footer: `<div onclick="debug()">　　　　　　　</div>`
      })
}

function debug(){
    Swal.close()
    localStorage.removeItem('agree')
    localStorage.setItem('debug', 1);
    console.log("ok")
}
