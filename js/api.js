/*スプレッドシート送受信 */

//宣言
let jsonObj,bookDB,logDB,userDatas,rentStatus,delStatus, flag = false, userdata, namedata;
let mode, key1, key2, key3, key4, key5, key6, key7, key8, key9, key10, key11, key12, key13, key14, key15, key16, key17, key18, key19, key20;
const apiurl = 'https://script.google.com/macros/s/AKfycbyOBgvJG2v2xqtAHXU_wmFixyYxRHEPsyykDd5disH6zVmxMY4SUE6QcwGn9fOkGA1e/exec'

function send(mode, key1, key2, key3, key4, key5, key6, key7, key8, key9, key10, key11, key12, key13, key14, key15, key16, key17, key18, key19, key20) {
        $("#overlay").fadeIn(300);
        xhr = new XMLHttpRequest()
        xhr.open('POST', apiurl, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        const request = "mode=" + mode + "&key1=" + key1 + "&key2=" + key2 + "&key3=" + key3 + "&key4=" + key4 + "&key5=" + key5 + "&key6=" + key6 + "&key7=" + key7 + "&key8=" + key8 + "&key9=" + key9 + "&key10=" + key10 + "&key11=" + key11 + "&key12=" + key12 + "&key13=" + key13 + "&key14=" + key14 + "&key15=" + key15 + "&key16=" + key16 + "&key17=" + key17 + "&key18=" + key18 + "&key19=" + key19 + "&key20=" + key20
        xhr.send(request);

        xhr.onreadystatechange = function () {
                // readyState XMLHttpRequest の状態 4: リクエストが終了して準備が完了
                // status httpステータス
                if (xhr.readyState == 2) {
                        $("#overlay").fadeIn(300);
                } else if (xhr.readyState == 4 && xhr.status == 200) {
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
                                bookDB = jsonObj
                                return book_data(bookDB)
                        } else if (mode == "book_cheak") {
                                bookDB = jsonObj
                                if(key1 == "flag"){
                                        console.log("a")
                                        test(bookDB)
                                } else {
                                        send("reserv_cheak", cheak().sub, true)
                                        test(bookDB)
                                }
                        } else if (mode == "admin_book_cheak") {
                                bookDB = jsonObj
                                test(bookDB)
                                send("AllLendingdata")
                        } else if (mode == "searching") {
                                bookDB = jsonObj
                                if (key2 == "/library.html") {
                                        console.log("lib-search",bookDB)
                                        search(key1,bookDB);
                                } else {
                                        search_move(key1);
                                }
                        } else if (mode == "db_cheak") {
                                bookDB = jsonObj
                                db_cheak(bookDB)
                        } else if (mode == "LendingData") {
                                logDB = jsonObj
                                console.log(logDB)
                                if(key2 != true){
                                        mydata(logDB)
                                }
                        } else if (mode == "AllLendingdata") {
                                reservationdata = jsonObj
                                alllending(reservationdata)
                                return
                        } else if (mode == "index_search") {
                                bookDB = jsonObj
                                index_search(bookDB)
                        } else if (mode == "reserve") {
                                rentStatus = jsonObj
                                reserve(rentStatus, key4)
                        } else if (mode == "resavedel") {
                                delStatus = jsonObj
                                if(key6){
                                        if(delStatus =="予約削除完了")
                                        Swal.fire(
                                                '取り消し完了',
                                                '予約を取り消しました！',
                                                'success'
                                            )
                                            $(`.reload${key6}`).remove();
                                }
                                return delStatus 
                        }else if (mode == "lendingdel") {
                                        if(jsonObj == "貸出削除完了"){
                                                Swal.fire(
                                                        '取り消し完了',
                                                        '貸出を取り消しました！',
                                                        'success'
                                                    )
                                                    $(`.reload${key6}`).remove();
                                        }
                        } else if (mode == "user_cheak") {
                                userDatas = jsonObj
                                if (userDatas[0] == 'notmatch') {
                                        Swal.fire({
                                                position: 'top-end',
                                                icon: 'question',
                                                title: 'アカウントが見つかりません',
                                                html: '不明',
                                                showConfirmButton: false,
                                                timer: 1500
                                        })
                                } else {
                                        userdata = userDatas[0]
                                        namedata = userDatas[1]
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

                        } else if (mode == "reserv_cheak") {
                                userDatas = jsonObj
                                userdata = userDatas[0]
                                namedata = userDatas[1]

                                if (key2 == true) {
                                        //貸出予約履歴照会
                                        send("LendingData", cheak().sub)
                                }
                        } else if (mode == "retrun"|| mode=="retrun2") {
                                if (jsonObj == "完了") {
                                        console.log(jsonObj)
                                        Swal.fire({
                                                position: 'top-end',
                                                icon: 'success',
                                                title: '返却処理が完了',
                                                html: '完了しました',
                                                showConfirmButton: false,
                                                timer: 1500
                                        })
                                } else if(jsonObj =="貸出記録なし"){
                                        Swal.fire({
                                                position: 'top-end',
                                                icon: 'warning',
                                                title: '貸出履歴がありません',
                                                html: '貸出情報がありません',
                                                showConfirmButton: false,
                                                timer: 1500
                                        })
                                }else{
                                        Swal.fire({
                                                icon: 'warning',
                                                title: '貸出情報が複数あります。',
                                                html: '<div id="test"></div>',
                                                showConfirmButton: false,
                                        })

                                        const $row = $(`<div id='row' class='book-row'>${jsonObj[0][7]}</div>`) // 全てのデータ要素
                                        for(let i =0;i<jsonObj.length;i++){
                                                const $div = $(`<div class='data' id='data${i}'></div>`) // データ要素
                                                const $cover = $(`<div class='datas'>${jsonObj[i][9]}</div>`) // 名前
                                                const $tess = $(`<div class='datas'>${jsonObj[i][6]}</div>`) // 処理番号
                                                const $divs = $(`<button class='datas' id="return_button" onclick='send("retrun2"," ${jsonObj[i][0]}","${jsonObj[i][1]}"," ${new Date().toLocaleString()}","${jsonObj[i][6]}")'>返却</div>`) // ボタン
                                                
                                                $div.append($cover).append($tess).append($divs);
                                                $row.append($div)
                                                $("#test").append($row);
                                        }
                                        

                        
                                        
                                }
                        }
                        return (jsonObj)
                } else if (mode == "log") {
                        if (localStorage.getItem('debug') == 1) {
                                Swal.fire("デバックモード", "一時停止中").then((result) => {
                                        systems()
                                })
                        }
                }
                if (mode != "book_cheak" && mode != "reserv_cheak" && mode != "book_num" && mode!="admin_book_cheak") {
                        $("#overlay").fadeOut(300);
                }
        }
}

function book_data(books) {
        bookdata = books
        send("AllLendingdata")
        return books
}