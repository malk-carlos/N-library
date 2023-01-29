function path_check() {
    const url = new URL(window.location.href);
    const path = url.pathname;

    if (path == "/library.html") {
        let key = $("#keyword").val();
        search(key);

    } else {
        let key = $("#keyword").val();
        search_move(key);
    }
}

function search(key) { //library.htmlを開いている場合の検索

    let search_list = [jsonObj[0]];

    for (let k = 1; k < jsonObj.length; k++) { // jsonObjの数（= 登録書籍の種類数）分検索

        for (let l = 1; l <= 15; l++) { // jsonObjのパラメータ1-9と15に部分一致するか検索
            
            console.log(k,l,String(jsonObj[k][l]).indexOf(key),String(jsonObj[k][l]))
            if(String(jsonObj[k][l]).indexOf(key) > -1){ // 検索ワードと一致する部分があるか
                search_list.push(jsonObj[k]); // 一致したら配列をsearch_listに
                l = 16; // 同一書籍を重ねて表示しないよう抜ける
            }
            else if(l == 9) {
                l = 15; //出版社情報の検索後書籍のキーワードデータ検索まで移動（内容紹介の文章が長いため予期しない取得が多かった）
            }
        }
    }
    reset_list(search_list);
}

function search_move(key) { //library.htmlへの遷移を伴う検索
    window.location.href = `library.html?key=${encodeURIComponent(key)}`;
}

function reset_list(search_list) {

    $("#container").empty();

    const jOl4 = Math.ceil((search_list.length) / 4); // 4冊ごとに列を作る

    for (let i = 0; i < jOl4; i ++) {

        const $row = $(`<div id='row${String(i+1)}' class='book-row'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素

        for (let j = 0; j < 4; j ++){
            const $n = i*4+j+1;
            const $div = $(`<div id='book${String($n)}' class='book'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素
            const $ps = $(`<div class='ps'><div>`)

            const $cover = $(`<img src='${search_list[$n][17]}' class='coverimg' alt="${search_list[$n][1]}">`) // 表紙
            const $title = $(`<p class='title'>${search_list[$n][1]}</p>`) // タイトル
            const $writer = $(`<p class='writer'>${search_list[$n][7]}</p>`) // 著者名

            $ps.append($title).append($writer);
            $div.append($cover).append($ps);
            $row.append($div);

            if ($n == search_list.length - 1) {
                j = 5;
            } else {
                j = j;
            }
        }
        $("#container").append($row);
    }
    history.replaceState('', '', new URL(window.location.href).pathname);
}

function toIndex_search() {
    const $word = $("#word").val();
    if ($word != ""){
        send('index_search')
    }
}

function index_search(jsonObj) {
    const $word = $("#word").val();
    // data = 蔵書一覧　$word = 検索ワード
    let search_list = [jsonObj[0]];
    for (let k = 1; k < jsonObj.length; k++) { // jsonObjの数（= 登録書籍の種類数）分検索

        for (let l = 1; l <= 15; l++) { // jsonObjのパラメータ1-9と15に部分一致するか検索
            
            console.log(k,l,String(jsonObj[k][l]).indexOf($word),String(jsonObj[k][l]))
            if(String(jsonObj[k][l]).indexOf($word) > -1){ // 検索ワードと一致する部分があるか
                search_list.push(jsonObj[k]); // 一致したら配列をsearch_listに
                l = 16; // 同一書籍を重ねて表示しないよう抜ける
            }
            else if(l == 9) {
                l = 15; //出版社情報の検索後書籍のキーワードデータ検索まで移動（内容紹介の文章が長いため予期しない取得が多かった）
            }
        }
    }
    $("#totalResults").text(`${search_list.length - 1}`)
    $("#result").css({display:"block"})
    reset_list(search_list);
}