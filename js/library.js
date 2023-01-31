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
                const $btn = $(`<button id='btn${String($n)}' class='limit' onClick='toReserve(${jsonObj[$n][0]},${$n})'>予約不可</button>`) //予約ボタン
                const $div = $(`<div id='book${String($n)}' class='book ${jsonObj[$n][0]}'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素
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
    if ($(`#btn${String(n)}`).attr('class') == 'reserve_btn'){
        console.log("tore")
        send("reserve",cheak().sub, book_num, new Date().toLocaleString(),n)
    }
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
    if (userdata < 3) {
        $(`.limit`).removeClass('limit').addClass('reserve_btn').text("予約する");
    } else {
        $(`.reserve_btn`).removeClass('reserve_btn').addClass('limit').text("予約不可");
    }

    //貸出予約履歴照会
    send("LendingData",cheak().sub)
}

function mydata(datas) {
    console.log(datas,"mydata");

    const book_length = $(".book:last").attr("id").replace("book","");
    console.log(book_length,"Blen") 
    for(let i = 0; book_length > i; i ++){
        for(let j = 0; datas.length > j; j ++){
            let dataJ = datas[j];
            if(dataJ[1] == $(`#book${i+1}`).attr("class").replace("book ","")){
                if(dataJ[5] == "予約中")
                $(`#btn${i+1}`).removeClass('limit').addClass('reserved').removeAttr("onClick").text("予約済み");
            }
        }
    }
}