function mbReserve(n) {
    Swal.fire({
        title: "書籍詳細",
        html: `<p class='bookSwalName'>${bookDB[n][1]}</p>
        <p class='bookSwalCoverP'><img src='${bookDB[n][17]}' class='bookSwalCover'></p>
        <p class='bookSwalWriter BSP'>著者：${bookDB[n][7]}</p>
        <p class='bookSwalPage BSP'>${bookDB[n][11]}ページ</p>
        <p class='bookSwalData'><span class='bookSwalRegistry'>登録数：${bookDB[n][18]}冊</span>｜<span class='bookSwalStock'>貸出可能在庫：${bookDB[n][21]}冊</span></p>`,
        backdrop: "#0005",
        customClass: "bookDetails",
        showCancelButton : true,
        cancelButtonText : 'やめる',
        confirmButtonText : '予約する'
    }).then((result)=>{
        console.log("then1",n,"n")
        if(result.isConfirmed){
            send("reserve",cheak().sub, bookDB[n][0], new Date().toLocaleString(),n)
        } else {
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

function mbCancel(n) {
    Swal.fire({
        title: "予約中の書籍",
        html: `<p class='bookSwalName'>${bookDB[n][1]}</p>
        <p class='bookSwalCoverP'><img src='${bookDB[n][17]}' class='bookSwalCover'></p>
        <p class='bookSwalWriter BSP'>著者：${bookDB[n][7]}</p>
        <p class='bookSwalPage BSP'>${bookDB[n][11]}ページ</p>
        <p class='bookSwalData'><span class='bookSwalRegistry'>登録数：${bookDB[n][18]}冊</span>｜<span class='bookSwalStock'>貸出可能在庫：${bookDB[n][21]}冊</span></p>`,
        backdrop: "#0005",
        customClass: "bookDetails",
        showCancelButton : true,
        cancelButtonText : 'やめる',
        confirmButtonText : '予約を取り消す'
    }).then((result)=>{
        if(result.isConfirmed){
            cancel(n)
        } else {
            Swal.fire({
                title: "キャンセルを中止しました",
                text: "",
                customClass:"canceled"
            }).then(()=>{
                $("#overlay").fadeOut(300);
            })
        }
    })
}

function cannotReserve(n,mes) {
    swal.fire({
        title: "この本は借りれません",
        html: `<h4>${mes}</h4>
        <p class='bookSwalName'>${bookDB[n][1]}</p>
        <p class='bookSwalCoverP'><img src='${bookDB[n][17]}' class='bookSwalCover'></p>
        <p class='bookSwalWriter BSP'>著者：${bookDB[n][7]}</p>
        <p class='bookSwalPage BSP'>${bookDB[n][11]}ページ</p>
        <p class='bookSwalData'><span class='bookSwalRegistry'>登録数：${bookDB[n][18]}冊</span>｜<span class='bookSwalStock'>貸出可能在庫：${bookDB[n][21]}冊</span></p>`,
        backdrop: "#0005",
        customClass: "bookDetails",
        confirmButtonText : 'OK'
    })
}