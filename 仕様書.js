/*ログイン情報関連*/

//　ログイン情報はCookieに保存済み
//cheak()の返り値
loginData.name //名前
loginData.family_name //姓
loginData.given_name //名
loginData.picture //アカウント画像URL
loginData.email //メールアドレス
loginData.sub //アカウントID

/*スプレッドシート関連*/
//API操作　スプレッドシート
send(mode, key1, key2, ke...key20)

//仕様
    //log & admin_cheak
    //ログイン試行履歴送信モード
        //key1 = 日付
        //key2 = IPアドレス
        //key3 = メールアドレス（取得不可時は""で空欄）
        //key4 = ブラウザ
        //key5 = バージョン
        //key6 = os
        //key7 = エージェント
        //key8 = エラーメッセージ ("ない場合は””で空欄")
        //key9 = 名前
        //key10 = GoogleID

    //book_cheak & book_num & ad_book_cheak
    //蔵書DBを返す
        //keyは不要
    
    //
    
    //register
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