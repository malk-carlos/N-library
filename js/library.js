function test(jsonObj) {
    for (i = 1; i < jsonObj.length; i ++) {
        const $div = $(`<div id='book${String(i)}' class='book'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素

        const $cover = $(`<img src='${jsonObj[i][17]}' class='coverimg'>`) // 表紙
        const $title = $(`<p class='title'>${jsonObj[i][1]}</p>`) // タイトル
        const $writer = $(`<p class='writer'>${jsonObj[i][7]}</p>`) // 著者名

        $div.append($cover).append($title).append($writer);
        $("#container").append($div)
    }
}