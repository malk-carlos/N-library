/* ここの処理は仮なので表示システムに応じて新しくプログラムしてください */

/*
現在　test(jsonObj)が自動的に実行されるので（./js/api.js:31）
jsonObjに蔵書のデータが格納されています。

*/
//貸出期間（日）
const Lending_period = 7
//取り置き期間（日）
const Hold_period = 7


function test(jsonObj) {
    const table = document.getElementById('container');  //表のオブジェクトを取得

    //DB分繰り返し表作成
    for (j = 1; j < jsonObj.length; j++) {

        /* 初期設定エリアここまで　↓↓↓↓↓↓↓ */
        var row = table.insertRow(-1);  //行末に行(tr要素)を追加
        var cell = row.insertCell(0);  //セル(td要素)の追加
        for (q = 1; q < 26; q++) {//表の数分設定
            // cell(q) = row.insertCell(q);の変数名宣言
            eval(`var cell${q} = row.insertCell(${q});`)
        }
        /* 初期設定エリアここまで　↑↑↑↑↑↑ */

        let date = new Date(jsonObj[j][10])
        if (date != "Invalid Date") {
            date.setDate(date.getDate() + 1)
            date = `${date.getFullYear()}/${(date.getMonth() + 1)}/${+date.getDate()}`
        } else {
            date = ""
        }

        /* 行作成エリア　↓↓↓↓↓↓↓ */
        cell.innerHTML = `<img class='book_img' src='${jsonObj[j][17]}'>`
        // cell1.innerHTML = "<div class='book_view'><div class='book_title'>" + jsonObj[j][1] + "</div><div class='book_name'>" + jsonObj[j][7] + "</div><div class='book_cp'> " + jsonObj[j][9] + "</div><div class='book_data'>" + jsonObj[1][10].substr(0, 10) + "</div></div>"
        cell1.innerHTML = `<div class='book_view'><div class='book_title'>${jsonObj[j][1]}</div><div class='book_name'>${jsonObj[j][7]}</div><div class='book_cp'> ${jsonObj[j][9]}</div><div class='book_data'>${date}</div></div>`
        for (i = 2; i < 25; i++) {//自動セル書き込み
            eval('cell' + i + '.innerHTML= "<div class=table"+' + i + ' +">" + jsonObj[' + j + '][' + (i - 2) + ']+" </div>"')
        }

        cell25.innerHTML = '<a href="./change.html?' + jsonObj[j][0] + '">編集</a>'
        /* 行作成エリアここまで　↑↑↑↑↑↑ */
    }

    table.deleteRow(1);


    jQuery(function ($) {
        // デフォルトの設定を変更
        $.extend($.fn.dataTable.defaults, {
            language: {
                url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
            },
            displayLength: 30,
            lengthMenu: [ 10,30, 50,100,300 ],
            columnDefs: [
                // 1列目を消す(visibleをfalseにすると消えます)
                { targets: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 24], visible: false },
            ]
        });
        $("#container").DataTable();
    });
}


function alllending(jsonObj) {
    $(".reload").remove();
    const table = document.getElementById('container2');  //表のオブジェクトを取得
    const table2 = document.getElementById('container3');  //表のオブジェクトを取得

    //DB分繰り返し表作成
    for (j = 1; j < jsonObj.length; j++) {
        if (jsonObj[j][5] == "貸出中") {//貸出表
            /* 初期設定エリアここまで　↓↓↓↓↓↓↓ */
            var row = table.insertRow(-1);  //行末に行(tr要素)を追加
            row.setAttribute("class", `reload reload${j}`);
            var cell = row.insertCell(0);  //セル(td要素)の追加
            for (q = 1; q < 6; q++) {//表の数分設定
                // cell(q) = row.insertCell(q);の変数名宣言
                eval(`var cell${q} = row.insertCell(${q});`)
            }
            /* 初期設定エリアここまで　↑↑↑↑↑↑ */

            /* 行作成エリア　↓↓↓↓↓↓↓ */
            cell.innerHTML = `<img class='book_img' src='${jsonObj[j][8]}'>`
            cell1.innerHTML = `<div class='title table${j}'>${jsonObj[j][7]} </div>`
            cell2.innerHTML = `<div class='username table${j}'>${jsonObj[j][9]} </div>`
            cell3.innerHTML = `<div class='date table${j}'>${showDiffDate(jsonObj[j][3],Lending_period, j)}</div>`
            cell4.innerHTML = `<div class='system_no table${j}'>${jsonObj[j][6]} </div>`
            cell5.innerHTML = `<div class='adminbutton table${j}'><button class='admin_retrun' onclick='send("retrun2"," ${jsonObj[j][0]}","${jsonObj[j][1]}"," ${new Date().toLocaleString()}","${jsonObj[j][6]}")'>返却処理</button><button class='admin_cancel' onclick='admin_cancel_lending("${j}")'>貸出データ削除 </button></div>`
            /* 行作成エリアここまで　↑↑↑↑↑↑ */

        } else if (jsonObj[j][5] == "予約中") {//予約表
            /* 初期設定エリアここまで　↓↓↓↓↓↓↓ */
            var row = table2.insertRow(-1);  //行末に行(tr要素)を追加
            row.setAttribute("class", `reload reload${j}`);
            var cell = row.insertCell(0);  //セル(td要素)の追加
            for (q = 1; q < 6; q++) {//表の数分設定
                // cell(q) = row.insertCell(q);の変数名宣言
                eval(`var cell${q} = row.insertCell(${q});`)
            }
            /* 初期設定エリアここまで　↑↑↑↑↑↑ */


            /* 行作成エリア　↓↓↓↓↓↓↓ */
            cell.innerHTML = `<img class='book_img' src='${jsonObj[j][8]}'>`
            cell1.innerHTML = `<div class='title table${j}'>${jsonObj[j][7]} </div>`
            cell2.innerHTML = `<div class='username table${j}'>${jsonObj[j][9]} </div>`
            cell3.innerHTML = `<div class='date table${j}'>${showDiffDate(jsonObj[j][2],Hold_period, j)}</div>`
            cell4.innerHTML = `<div class='system_no table${j}'>${jsonObj[j][6]} </div>`
            cell5.innerHTML = `<div class='adminbutton table${j}'><button class='admin_cancel' onclick='admin_cancel_resave("${j}")'>予約データ取消 </button></div>`
            /* 行作成エリアここまで　↑↑↑↑↑↑ */

        }
    }

}

function admin_cancel_lending(j) {
    Swal.fire({
        title: '確認',
        text: "貸出履歴を取り消しますか？",
        footer: "元には戻せません",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '取消',cancelButtonText:'キャンセル'
    }).then((result) => {
        if (result.isConfirmed) {

            $("#overlay").fadeIn(300);
            send("lendingdel", reservationdata[j][0], reservationdata[j][1], new Date().toLocaleString(), "", reservationdata[j][6], j);
        }
    })


}

function admin_cancel_resave(j) {
    Swal.fire({
        title: '確認',
        text: "予約を取り消しますか？",
        footer: "元には戻せません",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '取消',cancelButtonText:'キャンセル'
    }).then((result) => {
        if (result.isConfirmed) {
            $("#overlay").fadeIn(300);
            send("resavedel", reservationdata[j][0], reservationdata[j][1], new Date().toLocaleString(), "", reservationdata[j][6], j);

        }
    })
}

function showDiffDate(date, n, j) {
    // 現在日時を数値に変換
    var nowDate = new Date();
    var dnumNow = nowDate.getTime();
    // 指定日時を数値に変換
    var targetDate = new Date(date);
    var dnumTarget = targetDate.getTime();
    // 引き算して残日数を計算
    var diffMSec = dnumTarget - dnumNow;
    var diffDays = diffMSec / (1000 * 60 * 60 * 24);
    var showDays = Math.ceil(diffDays); // 小数点以下を切り上げる
    var dt = targetDate
    var dt = dt.setDate(dt.getDate() + n);
    var today = new Date(dt);


    // 表示
    var Msg;
    if (showDays == (-(n-1))) {
        //今日まで
        Msg = "今日まで"
        if (j) {
            $(`.reload${j} td`).css({ "background-color": "#5fcf62"})
        }
    } else if (showDays > (-n)) {
        //残り日付
        Msg = "残り" + ((n - 1) + showDays) + "日"
    } else {
        //超過日付
        Msg = "期限超過" + -((n - 1) + showDays) + "日"
        if (j) {
            $(`.reload${j} td`).css({ "background-color": "#ff6262", "color": "#262626" })
        }
    }
    return Msg + `<br>(${today.getFullYear()}/${(today.getMonth() + 1)}/${today.getDate()}迄)`
}
