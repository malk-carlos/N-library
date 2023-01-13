/* ここの処理は仮なので表示システムに応じて新しくプログラムしてください */

/*
現在　test(jsonObj)が自動的に実行されるので（./js/api.js:31）
jsonObjに蔵書のデータが格納されています。

*/

function test(jsonObj) {
    const table = document.getElementById('foo-table');  //表のオブジェクトを取得

    //DB分繰り返し表作成
    for (j = 1; j < jsonObj.length; j++) {

        /* 初期設定エリアここまで　↓↓↓↓↓↓↓ */
        var row = table.insertRow(-1);  //行末に行(tr要素)を追加
        var cell = row.insertCell(0);  //セル(td要素)の追加
        for (q = 1; q < 26; q++) {//表の数分設定
            // cell(q) = row.insertCell(q);の変数名宣言
            eval('var cell' + q + ' = row.insertCell(' + q + ');')
        }
        /* 初期設定エリアここまで　↑↑↑↑↑↑ */


        /* 行作成エリア　↓↓↓↓↓↓↓ */
        cell.innerHTML = "<img class='book_img' src='" + jsonObj[j][17] + "'>"
        cell1.innerHTML = "<div class='book_view'><div class='book_title'>" + jsonObj[j][1] + "</div><div class='book_name'>" + jsonObj[j][7] + "</div><div class='book_cp'> " + jsonObj[j][9] + "</div><div class='book_data'>" + jsonObj[1][10].substr(0, 10) + "</div></div>"

        for (i = 2; i < 25; i++) {//自動セル書き込み
            eval('cell' + i + '.innerHTML= "<div class=table"+' + i + ' +">" + jsonObj[' + j + '][' + (i - 2) + ']+" </div>"')
        }

        cell25.innerHTML = ""
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
            columnDefs: [
                // 1列目を消す(visibleをfalseにすると消えます)
                { targets: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24], visible: false },
                { targets:[0], width: "20px"},
                {targets:1,"width":"80%"},
                { targets:[23,25], "width": "10%"},              
            ]
        });
        $("#foo-table").DataTable();
    });
}
