function test(bookDB) {

    const query = location.search.split('=');
    const search_key = decodeURIComponent(query[1]);

    if (query[0]=="") {
        const bOl4 = Math.ceil((bookDB.length) / 4); // 4冊ごとに列を作る
    
        for (let i = 0; i <= bOl4; i ++) {
    
            const $row = $(`<div id='row${String(i+1)}' class='book-row'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素
    
            for (let j = 1; j < 5; j ++){
                const $n = i*4+j;
    
                const $btn = $(`<button id='btn${String($n)}' class='standby' name='${bookDB[$n][21]}' onClick='toReserve(${bookDB[$n][0]},${$n})'>予約不可</button>`) //予約ボタン
                const $div = $(`<div id='book${String($n)}' class='book ${bookDB[$n][0]}'></div>`) // 各書籍の表紙, タイトル, 著者を記載する要素
                const $div2 = $(`<div id='bookData${String($n)}' class='bookData' onClick='popup(${String($n)})'></div>`)
                const $ps = $(`<div class='ps'><div>`)
    
                const $cover = $(`<img src='${bookDB[$n][17]}' class='coverimg' alt="${bookDB[$n][1]}" oncontextmenu="return false;">`) // 表紙
                const $title = $(`<p class='title'>${bookDB[$n][1]}</p>`) // タイトル
                const $writer = $(`<p class='writer'>${bookDB[$n][7]}</p>`) // 著者名
    
                $ps.append($title).append($writer);
                $div2.append($cover).append($ps)
                $div.append($div2).append($btn);
                $row.append($div);
    
                if ($n == bookDB.length - 1) {
                    j = 5;
                } else {
                    j = j;
                }
            }
            $("#container").append($row);
        }
    } else {
        search(search_key,bookDB);
    }
}

function toReserve(book_num,n) {
    console.log(userdata)
    $("#overlay").fadeIn(300);
    if ($(`#btn${String(n)}`).attr('class') == 'reserve_btn'){
        console.log("tore")
        res_popup(book_num,n)
    }
}

function reserve(rentStatus,n) {
    console.log(rentStatus,n,userdata,"書籍データ,通し番号,userdata");
    if (rentStatus == "予約完了") {
        $(`#btn${String(n)}`).removeClass('reserve_btn').addClass('reserved').removeAttr("onClick").text("予約済み");
        userdata += 1;
        limit();
    } else if (rentStatus == "予約できませんでした") {
        swal.fire({
            title: "予期しないエラー",
            text: "エラーが発生しました！",
            icon: "error",
            confirmButtonText : "ページをリロードする",
            allowOutsideClick : false
        }).then(() => {
            window.location.reload();
        }) ;
    }
}

function limit () {
    if (userdata < 3) {
        $(`.standby`).removeClass('standby limit').addClass('reserve_btn').text("予約する");
    } else {
        $(`.reserve_btn`).removeClass('reserve_btn').addClass('limit').removeAttr("onClick").text("予約不可");
    }
}

function mydata(logDB) {
    console.log(logDB,"mydata");

    const book_length = $(".book:last").attr("id").replace("book","");
    console.log(book_length,"Blen") 
    for(let i = 0; book_length > i; i ++){
        if (Number($(`#btn${i+1}`).attr("name")) <= 0){
            $(`#btn${i+1}`).removeClass('standby reserve_btn').addClass('limit').removeAttr("onClick").text("予約不可");
        }
        for(let j = 0; logDB.length > j; j ++){
            let dataJ = logDB[j];
            if(dataJ[1] == $(`#book${i+1}`).attr("class").replace("book ","") && dataJ[5] == "予約中"){
                $(`#btn${i+1}`).removeClass('standby limit').addClass('reserved').removeAttr("onClick").text("予約済み");
            }
        }
    }
    limit();
}

function popup(n) {
    // 蔵書データ[n]でsweetalert表示
    Swal.fire({
        title: "書籍詳細",
        html: `<p class='bookSwalName'><b>『${bookDB[n][1]}』</b><span class='ruby'>${bookDB[n][2]}</span><p>
        <div class='bookSwalViwe'>
        <div class='bookSwalViwes'>
        <p class='bookSwalCoverP'><img src='${bookDB[n][17]}' class='bookSwalCover' oncontextmenu="return false;"></p>
        <p class='bookSwalWriter'>著者：<a href='https://www.google.com/search?q=${bookDB[n][7]}'>${bookDB[n][7]}</a></p>
        <p class='bookSwalPage'>${bookDB[n][11]}ページ</p>
        <p class='bookSwalData'><span class='bookSwalRegistry'>登録数：${bookDB[n][18]}冊</span>｜<span class='bookSwalStock'>貸出可能在庫：${bookDB[n][21]}冊</span></p></div></div>`,
        backdrop: "#0005",
        confirmButtonText : "閉じる",
        customClass: "bookDetails"
    })
    if(bookDB[n][13] !=='-' && bookDB[n][13]!==""){
        $(".bookSwalViwe").append(`<div class='bookSwalViwes2'><p><b>書籍紹介</b></p>${bookDB[n][13]}</div>`)
    }
}

function res_popup(book_num,n) {
    // 蔵書データ[n]でsweetalert表示
    // 予約時最終確認
    Swal.fire({
        title: "最終確認",
        html: `<p class='bookSwalName'>${bookDB[n][7]} の<br><b>『${bookDB[n][1]}』</b><br>を予約します。よろしいですか？</p>
        <p class='bookSwalCoverP'><img src='${bookDB[n][17]}' class='bookSwalCover'>`,
        showCancelButton : true,
        cancelButtonText : 'やめる',
        showLoaderOnConfirm: true,
        customClass: "finalConfirmation"
    }).then((result)=>{
        console.log("then1")
        if(result.isConfirmed){
            send("reserve",cheak().sub, book_num, new Date().toLocaleString(),n)
        } else {
            console.log("then2")
            Swal.fire({
                title: "予約をキャンセルしました",
                text: "",
                customClass:"canceled"
            }).then(()=>{
                $("#overlay").fadeOut(300);
            })
        }
    })
}