function path_check() {
    const url = new URL(window.location.href);
    const path = url.pathname;
    console.log(path);
    // var jsonObj = send();

    if (path == "/library.html") {
        let key = $("#keyword").val();
        console.log(key);
        search(key);

    } else {
        let key = $("#keyword").val();
        console.log(key);
        search_move(key);
    }
}

function search(key) { //library.htmlを開いている場合の検索

    let search_list = [jsonObj[0]];

    for (let k = 1; k < jsonObj.length; k++) { // jsonObjの数（= 登録書籍の種類数）分検索

        for (let l = 2; l <= 16; l++) { // jsonObjのパラメータ2-16に部分一致するか検索

            if(String(jsonObj[k][l]).indexOf(key) > -1){ // 検索ワードと一致する部分があるか
                search_list.push(jsonObj[k]); // 一致したら配列をsearch_listに
                l += 15; // 同一書籍を重ねて表示しないよう抜ける
            } else {}
        }
    }
    reset_list(search_list);
}

function search_move(key) { //library.htmlへの遷移を伴う検索
    window.location.href = `library.html?key=${encodeURIComponent(key)}`;
}

function reset_list(list) {

    $("#container").empty();

    const jOl4 = Math.floor((list.length) / 4); // 4冊ごとに列を作る

    for (let i = 0; i < jOl4; i ++) {

        const $row = $(`<div id='row${String(i+1)}' class='book-row'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素

        for (let j = 1; j < 5; j ++){
            const $n = i*4+j;
            const $div = $(`<div id='book${String($n)}' class='book'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素
            const $ps = $(`<div class='ps'><div>`)

            const $cover = $(`<img src='${list[$n][17]}' class='coverimg' alt="${list[$n][1]}">`) // 表紙
            const $title = $(`<p class='title'>${list[$n][1]}</p>`) // タイトル
            const $writer = $(`<p class='writer'>${list[$n][7]}</p>`) // 著者名

            $ps.append($title).append($writer);
            $div.append($cover).append($ps);
            $row.append($div);
        }
        $("#container").append($row);
    }
    history.replaceState('', '', new URL(window.location.href).pathname);
}