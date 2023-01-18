function test(jsonObj) {

    const jOl4 = Math.floor((jsonObj.length) / 4); // 4冊ごとに列を作る

    for (let i = 0; i < jOl4; i ++) {

        const $row = $(`<div id='row${String(i+1)}' class='book-row'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素

        for (let j = 1; j < 5; j ++){
            const $n = i*4+j;
            const $div = $(`<div id='book${String($n)}' class='book'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素
            const $ps = $(`<div class='ps'><div>`)

            const $cover = $(`<img src='${jsonObj[$n][17]}' class='coverimg' alt="${jsonObj[$n][1]}">`) // 表紙
            const $title = $(`<p class='title'>${jsonObj[$n][1]}</p>`) // タイトル
            const $writer = $(`<p class='writer'>${jsonObj[$n][7]}</p>`) // 著者名

            $ps.append($title).append($writer);
            $div.append($cover).append($ps);
            $row.append($div);
        }
        $("#container").append($row);
    }
}