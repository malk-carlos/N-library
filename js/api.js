/*スプレッドシート送受信 */

//宣言
let jsonObj, flag = false;
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
                                window.location.href = "./admin.html"
                        }
                        if (mode == "register") {
                                if (jsonObj == "success!!") {
                                        alert("成功しました")
                                        book_autocomplete(document.getElementById('keyview').value)
                                } else if (jsonObj == "changed") {
                                        alert("更新しました")
                                        window.location.reload
                                } else {
                                        alert("失敗しました。")
                                        book_autocomplete(document.getElementById('keyview').value)
                                }
                                window.location.reload
                        } else if (mode == "delete") {
                                if (jsonObj == "deleted") {
                                        alert("削除しました")
                                } else {
                                        alert("失敗しました")
                                }
                        } else if (mode == "book_num") {
                                okk(jsonObj, key1)
                        } else if (mode == "book_cheak") {
                                test(jsonObj)
                        } else if (mode == "db_cheak") {
                                db_cheak(jsonObj)
                        } else if (mode = "LendingData") {
                                console.log(jsonObj)
                                mydata(jsonObj)
                        }
                } else if (mode == "log") {
                        systems()
                } 
        }
}

function okk(jsonObj, isbn) {
        //DB検索
        for (i = 1; i < jsonObj.length; i++) {
                if (jsonObj[i][0] == isbn) {
                        //変更ボタン出現
                        document.getElementById("changes_button").style.display = "block";
                        document.getElementById("deletes_button").style.display = "block";
                        //DB登録数を表示
                        document.getElementById("number").value = jsonObj[i][21]
                        return
                }
        }
        //新規登録登録「1」
        document.getElementById("number").value = 1
}