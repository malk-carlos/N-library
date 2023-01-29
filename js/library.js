function test(jsonObj) {

    const query = location.search.split('=');
    console.log("query",query)
    const search_key = decodeURIComponent(query[1]);

    if (query[0]=="") {
        const jOl4 = Math.floor((jsonObj.length) / 4); // 4冊ごとに列を作る

        for (let i = 0; i < jOl4; i ++) {
    
            const $row = $(`<div id='row${String(i+1)}' class='book-row'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素
    
            for (let j = 1; j < 5; j ++){
                const $n = i*4+j;
                const $btn = $(`<button id='btn${String($n)}' class='reserve_btn' onClick='toReserve(${jsonObj[$n][0]},${$n})'>予約する</button>`) //予約ボタン
                const $div = $(`<div id='book${String($n)}' class='book'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素
                const $ps = $(`<div class='ps'><div>`)
    
                const $cover = $(`<img src='${jsonObj[$n][17]}' class='coverimg' alt="${jsonObj[$n][1]}">`) // 表紙
                const $title = $(`<p class='title'>${jsonObj[$n][1]}</p>`) // タイトル
                const $writer = $(`<p class='writer'>${jsonObj[$n][7]}</p>`) // 著者名
    
                $ps.append($title).append($writer);
                $div.append($cover).append($ps).append($btn);
                $row.append($div);
            }
            $("#container").append($row);
        }
    } else {
        search(search_key);
    }
}

function toReserve(book_num,n) {
    send("reserve",cheak().sub, book_num, new Date().toLocaleString(),n)
}

function reserve(data,n) {
    console.log(data,n,userdata);
    if (data == "予約完了") {
        $(`#btn${String(n)}`).removeClass('reserve_btn').addClass('reserved').removeAttr("onClick").text("予約済み");
        userdata += 1;
    }
    limit();
}

function limit() {
    if (userdata >= 3) {
        $(`.reserve_btn`).removeClass('reserve_btn').addClass('limit').text("予約不可");
    }
}