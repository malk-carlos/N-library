let Data, flags
const datas = ["", "", 'Data[0].onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content', 'Data[0].onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.collationkey', 'Data[0].onix.DescriptiveDetail.TitleDetail.TitleElement.Subtitle.content', 'Data[0].onix.DescriptiveDetail.TitleDetail.TitleElement.Subtitle.collationkey', 'Data[0].onix.DescriptiveDetail.Collection.TitleDetail.TitleElement[0].TitleText.content', 'Data[0].onix.DescriptiveDetail.Collection.TitleDetail.TitleElement[0].TitleText.collationkey', 'Data[0].onix.DescriptiveDetail.Contributor[0].PersonName.content', 'Data[0].onix.DescriptiveDetail.Contributor[0].PersonName.collationkey', 'Data[0].onix.PublishingDetail.Publisher.PublisherName', 'Data[0].onix.PublishingDetail.PublishingDate[0].Date', '(Number(Data[0].onix.DescriptiveDetail.Extent[0].ExtentType) + Number(Data[0].onix.DescriptiveDetail.Extent[0].ExtentUnit) + Number(Data[0].onix.DescriptiveDetail.Extent[0].ExtentValue))', 'Data[0].onix.DescriptiveDetail.Subject[0].SubjectCode', 'Data[0].onix.CollateralDetail.TextContent[1].Text', 'Data[0].onix.DescriptiveDetail.Contributor[0].BiographicalNote', 'Data[0].onix.DescriptiveDetail.Subject[2].SubjectHeadingText', 'Data[0].onix.ProductSupply.SupplyDetail.Price[0].PriceAmount', 'Data[0].onix.RecordReference']
const subject = ["", "", "タイトル", "タイトルカナ", "サブタイトル", "サブタイトルかな", "シリーズ", "シリーズかな", "著者", "著者かな", "出版社", "出版日", "ページ数", "分類", "内容紹介", "著者紹介", "キーワード", "価格", "ISBN"]
let datas_arry = []

function book_autocomplete(isbns) {
    if (isbns == "" || flags == "on") {
        return
    } else {
        flags = "on"
        fetch('https://api.openbd.jp/v1/get?isbn=' + isbns)
            .then((response) => response.json())
            .then((data) => Data = data)
            .then(response => {
                console.log(Data)
                if(Data[0] == null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: '未対応コード',
                        html:
                        'ISBNコードをスキャンしてください。未対応コードは手動で登録してください。',
                        showConfirmButton: false,
                        timer: 2500
                      })
                      flags ="off"
                    return
                }
                for (i = 2; i < 19; i++) {
                    try {
                        datas_arry[i] = eval(datas[i])
                        if (datas_arry[i] == undefined) {
                            datas_arry[i] = "-"
                        }
                        if (i == 17) {
                            if (!datas_arry[i] || datas_arry[i] != "-") {
                                datas_arry[i] = datas_arry[i] + "円"
                            }
                        }
                        if (i == 11) {
                            if (!datas_arry[i] || datas_arry[i] != "-" || !datas_arry[i] == Number) {
                                datas_arry[i] = datas_arry[11].substring(0, 4) + "/" + datas_arry[11].substring(4, 6) + "/" + datas_arry[11].substring(6)
                                if(datas_arry[i]=="//"){
                                    datas_arry[i] = Data[0].summary.pubdate.replace("-","/")
                                }
                                console.warn(datas_arry[11])
                            }
                        }
                    } catch (e) {
                        datas_arry[i] = "-"
                    }
                    if (i == 18) {
                        document.getElementById("books_tbl").rows[i - 2].cells[1].innerHTML = '<div id="books' + i + '">' + datas_arry[i] + '</div>'

                    } else {
                        document.getElementById("books_tbl").rows[i - 2].cells[1].innerHTML = '<div id="books' + i + '">' + datas_arry[i] + '</div>'
                    }
                    document.getElementById("books_tbl").rows[i - 2].cells[0].innerHTML = subject[i]

                }

                try {
                    document.getElementById("img").innerHTML = "<img name='img'  src=" + Data[0].onix.CollateralDetail.SupportingResource[0].ResourceVersion[0].ResourceLink + ">"
                } catch (e) {
                    document.getElementById("img").innerHTML = "<img name='img' src=/img/noimage.png>"
                }
                register()

            })

    }

}


function register() {
    for (i = 2; i < 19; i++) {
        datas_arry[i] = encodeURIComponent(document.getElementById("books" + i).innerHTML)
       // console.log(datas_arry[i])
    }
    send("register", datas_arry[18], datas_arry[2], datas_arry[3], datas_arry[4], datas_arry[5], datas_arry[6], datas_arry[7], datas_arry[8], datas_arry[9], datas_arry[10], datas_arry[11], datas_arry[12], datas_arry[13], datas_arry[14], datas_arry[15], datas_arry[16], datas_arry[17], document.img.src, encodeURIComponent(document.getElementById("options").value))
}

let texts
document.addEventListener('keypress', keypress_ivent);
document.addEventListener('keyup', keyup_ivent);

function keyup_ivent(e) {
    if (e.key == "Backspace") {
        texts = ""
        document.getElementById("keyview").innerHTML = texts
    }
    return;
}

function keypress_ivent(e) {
    //いずれかのキーが押された時の処理
    if (e.key != 'Enter') {
        if (texts) {
            texts = texts + e.key
        } else {
            texts = e.key
        }
    } else if (e.key == "Enter" && texts.length >= 7) {
        book_autocomplete(texts)
        texts = ""
    }
    document.getElementById("keyview").innerHTML = texts
    return false;
}