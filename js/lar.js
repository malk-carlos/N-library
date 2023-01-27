//初期設定
let texts, system_mode, bookdata, reservationdata, userdata, userid
document.addEventListener('keypress', keypress_ivent);
document.addEventListener('keyup', keyup_ivent);

//キーイベント
function keyup_ivent(e) {
    if (e.key == "Backspace") {
        texts = ""
        document.getElementById("keyview").innerHTML = texts
    }
    return;
}

function keypress_ivent(e) {
    //いずれかのキーが押された時の処理
    if (e.key != 'Enter') {
        if (texts) {
            texts = texts + e.key
        } else {
            texts = e.key
        }
    } else if (e.key == "Enter") {
        scan(texts)
        texts = ""
    }
    document.getElementById("keyview").innerHTML = texts
    return false;
}

//スキャン処理
function scan(texts) {
    switch (texts) {
        case "LENDING":
            system_mode = "lending"
            userdata = undefined
            send("book_num")
            break;
        case "RETRUN0":
            system_mode = "retrun"
            userdata = undefined
            send("book_num")
            break;

        default:
            if (!system_mode == "") {
                if (system_mode == "retrun") {
                    console.log(" hennkyakusyori")
                    send("retrun", userid, texts, new Date().toLocaleString())
                    Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: '返却処理が完了',
                                            html: '完了しました',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                    return
                } else if (system_mode == "lending") {
                    if (userdata < 3 && texts.length != 21) {
                        //貸出処理
                        for (let i = 1; i < bookdata.length; i++) {
                            if (bookdata[i][0] == texts) {
                                if (bookdata[i][22] == "許可") {
                                    if (bookdata[i][21] != 0) {
                                        //貸出許可
                                        console.log("許可確認")
                                        //userid,isbn,yoyaku,kasidasi,hennkyaku,status,bagou,taitoru,gazou,namae
                                        send("lending", userid, texts, new Date().toLocaleString())
                                        bookdata[i][21]--
                                        userdata++
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: '貸出処理が完了',
                                            html: '完了しました',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })

                                    } else {
                                        console.log(bookdata[i][19])
                                        if (bookdata[i][19] > 0) {
                                            for (let q = 0; q < reservationdata.length; q++) {
                                                console.log(reservationdata[q][5], reservationdata[q][0], userid)
                                                if (reservationdata[q][5] == "予約中" && reservationdata[q][0] == userid) {
                                                    send("lending2", userid, texts, new Date().toLocaleString())
                                                    bookdata[i][21]--
                                                    userdata++
                                                    Swal.fire({
                                                        position: 'top-end',
                                                        icon: 'success',
                                                        title: '予約された本の貸出処理が完了',
                                                        html: '完了しました',
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    })
                                                    return
                                                }
                                            }
                                        }
                                        //在庫なし
                                        console.log("在庫なし")
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'error',
                                            title: '貸出可能な本ではありません',
                                            html: '貸出中の本がスキャンされました',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    }

                                } else {
                                    //貸出禁止
                                    console.log("禁止")
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'error',
                                        title: '貸出禁止のため貸出できません',
                                        html: '貸出できませんでした',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                                return
                            }
                        }
                        //bookdataなし
                        console.log("なかった")
                        Swal.fire({
                            position: 'top-end',
                            icon: 'question',
                            title: '登録されていない本です',
                            html: '貸出できませんでした',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    } else if (userdata > 2 && texts.length != 21) {
                        //上限に達した
                        alert("上限に達しました")
                        Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            title: '貸出可能上限に達しました',
                            html: 'スキャンしてください',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    } else if (texts.length == 21) {
                        //会員IDを読み取った時
                        userdata = ""
                        userid = texts
                        send("user_cheak", texts)

                    } else {
                        //IDをスキャン
                        Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            title: 'ユーザーIDをスキャンしてください',
                            html: 'スキャンしてください',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
                break;
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: '貸出・返却モードを選択してください',
                    html: '選択してください',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
    }
}

//ページ読み込み後　DBへ蔵書DBの照会
window.onload = function () {
    admin_cheak()
    send("book_num")
    console.log("読み込み完了")
}

