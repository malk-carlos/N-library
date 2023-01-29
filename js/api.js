/*スプレッドシート送受信 */

//宣言
let jsonObj, flag = false,userdata,namedata;
let mode, key1, key2, key3, key4, key5, key6, key7, key8, key9, key10, key11, key12, key13, key14, key15, key16, key17, key18, key19, key20;
const apiurl = 'https://script.google.com/macros/s/AKfycbyOBgvJG2v2xqtAHXU_wmFixyYxRHEPsyykDd5disH6zVmxMY4SUE6QcwGn9fOkGA1e/exec'

function send(mode, key1, key2, key3, key4, key5, key6, key7, key8, key9, key10, key11, key12, key13, key14, key15, key16, key17, key18, key19, key20) {
        xhr = new XMLHttpRequest()
        xhr.open('POST', apiurl, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        const request = "mode=" + mode + "&key1=" + key1 + "&key2=" + key2 + "&key3=" + key3 + "&key4=" + key4 + "&key5=" + key5 + "&key6=" + key6 + "&key7=" + key7 + "&key8=" + key8 + "&key9=" + key9 + "&key10=" + key10 + "&key11=" + key11 + "&key12=" + key12 + "&key13=" + key13 + "&key14=" + key14 + "&key15=" + key15 + "&key16=" + key16 + "&key17=" + key17 + "&key18=" + key18 + "&key19=" + key19 + "&key20=" + key20
        xhr.send(request);

        xhr.onreadystatechange = function () {
                // readyState XMLHttpRequest の状態 4: リクエストが終了して準備が完了
                // status httpステータス
                if (xhr.readyState == 4 && xhr.status == 200) {
                        // jsonをオブジェクトに変更
                        jsonObj = JSON.parse(xhr.responseText);

                        //デバック用　削除予定
                        //console.log(jsonObj)
                        //各モードリクエスト後の処理
                        if (jsonObj == "complete") {
                                document.cookie = 'Admin="abcdefghijklmnopqrstuvwxyz0"; max-age=3600;';//86400
                                window.location.href = "./admin.html"

                        }
                        if (jsonObj == "noadmindata") {
                                document.cookie = 'Admin=; max-age=86400;';//86400
                        }
                        if (mode == "register") {
                                if (jsonObj == "success!!") {
                                        Swal.fire({
                                                position: 'top-end',
                                                icon: 'success',
                                                title: '登録完了',
                                                html:
                                                        '<img class="alertImg" src="' + document.img.src + '"><div class="alertTitle">' + Data[0].onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content + '</div>' +
                                                        Data[0].onix.DescriptiveDetail.Contributor[0].PersonName.content,
                                                showConfirmButton: false,
                                                timer: 1500
                                        })
                                        //book_autocomplete(document.getElementById('keyview').value)
                                } else if (jsonObj == "changed") {
                                        Swal.fire({
                                                position: 'top-end',
                                                icon: 'info',
                                                title: '追加完了',
                                                html:
                                                        '<img class="alertImg" src="' + document.img.src + '"><div class="alertTitle">' + Data[0].onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content + '</div>' +
                                                        Data[0].onix.DescriptiveDetail.Contributor[0].PersonName.content,
                                                showConfirmButton: false,
                                                timer: 1500
                                        })
                                } else {
                                        Swal.fire({
                                                position: 'top-end',
                                                icon: 'error',
                                                title: '失敗',
                                                html:
                                                        '登録に失敗しました。何度も発生する場合は「手動登録を行う」もしくは「システム管理者にお問合せ」をしてください。',
                                                showConfirmButton: false,
                                                timer: 1500
                                        })
                                        //book_autocomplete(document.getElementById('keyview').value)
                                }
                                flags = "off"
                        } else if (mode == "delete") {
                                if (jsonObj == "deleted") {
                                        alert("削除しました")
                                } else {
                                        alert("失敗しました")
                                }
                        } else if (mode == "book_num") {
                                return book_data(jsonObj)
                        } else if (mode == "book_cheak") {
                                send("reserv_cheak",cheak().sub,true)
                                test(jsonObj)
                        } else if (mode == "db_cheak") {
                                db_cheak(jsonObj)
                        } else if (mode == "LendingData") {
                                console.log(jsonObj)
                                mydata(jsonObj)
                        } else if (mode == "AllLendingdata") {
                                reservationdata = jsonObj
                                return
                        } else if (mode == "index_search") {
                                index_search(jsonObj)
                        } else if (mode == "reserve") {
                                reserve(jsonObj,key4)
                        } else if (mode == "user_cheak") {
                                if (jsonObj[0] == 'notmatch') {
                                        Swal.fire({
                                                position: 'top-end',
                                                icon: 'question',
                                                title: 'アカウントが見つかりません',
                                                html: '不明',
                                                showConfirmButton: false,
                                                timer: 1500
                                        })
                                } else {
                                        userdata = jsonObj[0]
                                        namedata = jsonObj[1]
                                        if (userdata < 3) {
                                                console.log(namedata)

                                        } else {
                                                Swal.fire({
                                                        position: 'top-end',
                                                        icon: 'warning',
                                                        title: '貸出可能上限に達しています',
                                                        html: '返却してください',
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                })

                                        }
                                }

                                return
                        } else if(mode=="reserv_cheak"){
                                userdata = jsonObj[0]
                                namedata = jsonObj[1]

                                if(key2==true) {
                                        limit()
                                }
                        }

                        return (jsonObj)
                } else if (mode == "log") {
                        systems()
                }
        }
}

function book_data(books) {
        bookdata = books
        send("AllLendingdata")
        return books
}