function db_cheak(db){
    let datas_arry
    const subject = ["", "タイトル", "タイトルカナ", "サブタイトル", "サブタイトルかな", "シリーズ", "シリーズかな", "著者", "著者かな", "出版社", "出版日", "ページ数", "分類", "内容紹介", "著者紹介", "キーワード", "価格", "画像URL","登録数"]

    const parmet = (new URL(window.location.href).search).replace("?","")
    for(let i =0 ;i<db.length;i++){
        if(db[i][0]==parmet){
        console.log(db[i])

        for(let q =1;q<19;q++){
            console.log(db[i][q])
            document.getElementById("books_tbl2").rows[q - 1].cells[0].innerHTML = subject[q]
            if(q==17){
                document.getElementById("books_tbl2").rows[q - 1].cells[1].innerHTML = '<textarea readonly oninput="imgurl()" class="box" id=books' + q + ' type="text" >' + db[i][q] + '</textarea><button id="mode_change_button' + q + '" onclick="mode_changes(' + q + ')">修正</button><div><img id="imgs" src='+db[i][q]+'></div>'          
              }else{
            document.getElementById("books_tbl2").rows[q - 1].cells[1].innerHTML = '<textarea readonly class="box" id=books' + q + ' type="text" >' + db[i][q] + '</textarea><button id="mode_change_button' + q + '" onclick="mode_changes(' + q + ')">修正</button>'
            }
        }
        if(db[1][22]=="許可"){
            document.getElementById("books_tbl2").rows[18].cells[1].innerHTML = '<select id="books19"><option selected>許可</option><option>禁止</option></select>'
        }else{
            document.getElementById("books_tbl2").rows[18].cells[1].innerHTML = '<select id="books19"><option >許可</option><option selected>禁止</option></select>'
        }
     document.getElementById("books_tbl2").rows[19].cells[1].innerHTML =  '<textarea readonly class="box" id="books20" type="text" >' + db[i][0] + '</textarea>'

        }
    }
}

function mode_changes(id) {
    if (eval('document.getElementById("books' + id + '").readOnly')) {

        eval('document.getElementById("books' + id + '").readOnly = false;')
        eval('document.getElementById("mode_change_button' + id + '").innerHTML ="完了";')
    } else {

        eval('document.getElementById("books' + id + '").readOnly = true;')
        eval('document.getElementById("mode_change_button' + id + '").innerHTML = "修正";')
    }

}

function imgurl(){
    document.getElementById("imgs").src=document.getElementById("books17").value;
}

function cheanges() {
    let datas_arry =[]
    for (i = 1; i < 21; i++) {
       datas_arry[i] = encodeURIComponent(document.getElementById("books" + i).value)
        console.log(datas_arry[i])
    }
    send("register", datas_arry[20], datas_arry[1],datas_arry[2], datas_arry[3], datas_arry[4], datas_arry[5], datas_arry[6], datas_arry[7], datas_arry[8], datas_arry[9], datas_arry[10], datas_arry[11], datas_arry[12], datas_arry[13], datas_arry[14], datas_arry[15], datas_arry[16], datas_arry[17],datas_arry[19], datas_arry[18])

        //本を登録処理
        //key1 = ISBN
        //key2 = タイトル
        //key3 = タイトルかな
        //key4 = サブタイトル
        //key5 = サブタイトルかな
        //key6 = シリーズ
        //key7 = シリーズかな
        //key8 = 著者
        //key9 = 著者かな
        //key10 = 出版社
        //key11 = 出版日
        //key12 = ページ数
        //key13 = 分類
        //key14 = 内容紹介
        //key15 = 著者紹介
        //key16 = キーワード
        //key17 = 価格
        //key18 = 画像URL
        //key19 = 登録数
        //key20 = 貸し出し許可状態


}


function deletes(){
    send("delete",datas_arry[18])
}
