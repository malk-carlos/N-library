const menu = [
  '質問1',
  '質問2'
];
const res = [
  '答え1',
  '答え2'
];

const chatTitle = "チャットボット";
const yourName = "ピヨ太郎";
const yourRoll = "マスコット";
const firstMsg = "Brrow a book へようこそ。わからない場合は下のボタンを押してください。";
const closeTxt = "×";
const profileSize = { width : 50, height : 50}; //プロフィール画像サイズ
const copyRight = '<span><a href="https://nagito.work/">Powerd by nagito</a></span>';

let ownURL, cssURL, profileImgURL;

let bodyTag;
let modeFlg;

//window.onload = function onLoad() {
window.addEventListener('load', function(){

  modeFlg = false; //アイキャッチ表示か、チャット窓表示かのフラグ

  ownURL = getOwnUrl(); //chatbot.jsまでのURL
  cssURL = ownURL + 'chatbot.css'; //css読み込みURL
  profileImgURL = ownURL + 'profile.png'; //画像読み込みURL


  /*chatbot.cssを読み込む*/
  let linkTag = document.createElement("link");
  linkTag.href = cssURL;
	linkTag.rel = 'stylesheet';
	linkTag.type = 'text/css';
  let headTag = document.getElementsByTagName("head")[0];
  console.log(headTag);
  headTag.appendChild(linkTag);

  /*body要素を取得して*/
  bodyTag = document.getElementsByTagName('body')[0];

  //アイキャッチ
  var eyecatchDiv = document.createElement("div");
  eyecatchDiv.id = "chatbot-eyecatch-div";
  /* imgタグを使った画像でやる場合はこれだけど、divタグに背景画像で指定することにする
  var eyecatchImg = document.createElement("img");
  eyecatchImg.id = "chatbot-eyecatch-img";
  eyecatchImg.src = eyecatchImgUrl;
  eyecatchImg.width = eyecatchSize.width;
  eyecatchImg.height = eyecatchSize.height;
  eyecatchDiv.appendChild(eyecatchImg);
  eyecatchImg.addEventListener('click',toggleEyecathChat);
  */
  bodyTag.appendChild(eyecatchDiv);
  eyecatchDiv.addEventListener('click',toggleEyecathChat);


  //チャット窓
  //一番大枠
  var wakuDiv = document.createElement("div");
  wakuDiv.id = "chatbot-outline";

  //ヘッダー
  var headerDiv = document.createElement("div");
  headerDiv.id = "chatbot-header-div";
  wakuDiv.appendChild(headerDiv);

  //タイトル
  var titleDiv = document.createElement("div");
  titleDiv.id = "chatbot-title-div";
  titleDiv.textContent = chatTitle;
  headerDiv.appendChild(titleDiv);

  //閉じるボタン
  var closeDiv = document.createElement("div");
  closeDiv.id = "chatbot-close-div";
  closeDiv.textContent = closeTxt;
  closeDiv.addEventListener('click',toggleEyecathChat);
  headerDiv.appendChild(closeDiv);


  //本体
  var bodyDiv = document.createElement("div");
  bodyDiv.id = "chatbot-body-div";
  wakuDiv.appendChild(bodyDiv);


  //プロフィール
  var profileDiv = document.createElement("div");
  profileDiv.id = "chatbot-profile-div";
  bodyDiv.appendChild(profileDiv);

  //プロフィール画像
  var profileImg = document.createElement("img");
  profileImg.id = "chatbot-profile-img";
  profileImg.src = profileImgURL;
  profileImg.width = profileSize.width;
  profileImg.height = profileSize.height;
  profileDiv.appendChild(profileImg)

  //名前
  var nameDiv  = document.createElement("div");
  nameDiv.id = "chatbot-name-div";
  nameDiv.textContent = yourName;
  profileDiv.appendChild(nameDiv)

  //役職
  var rollDiv  = document.createElement("div");
  rollDiv.id = "chatbot-roll-div";
  rollDiv.textContent = yourRoll;
  profileDiv.appendChild(rollDiv)

  //メッセージ
  var msgDiv = document.createElement("div");
  msgDiv.id = "chatbot-message-div";
  bodyDiv.appendChild(msgDiv);

  var msgP = document.createElement("p");
  msgP.id = "chatbot-message-p";
  msgP.textContent = firstMsg;
  msgDiv.appendChild(msgP);

  //メニュー
  var menuUl  = document.createElement("ul");
  menuUl.id = "chatbot-menu-ul";

  for (var i=0; i<menu.length; i++) {
    var menuLi = document.createElement("li");
    menuLi.id = "chatbot-menu-li-" + i;

    var menuRadio = document.createElement("input");
    menuRadio.id = "chatbot-menu-radio-" + i;
    menuRadio.type = "radio";
    menuRadio.name = "menu-group";
    menuRadio.value = menu[i];

    var menuLabel = document.createElement("label");
    menuLabel.htmlFor = menuRadio.id;
    menuLabel.textContent = menu[i];

    menuLi.appendChild(menuRadio);
    menuLi.appendChild(menuLabel);
    menuUl.appendChild(menuLi);
  }
  msgDiv.appendChild(menuUl);

  //フッター
  var footerDiv = document.createElement("div");
  footerDiv.id = "chatbot-footer-div";
  footerDiv.innerHTML = copyRight;
  wakuDiv.appendChild(footerDiv);


  /*body要素に入れる*/
  bodyTag.appendChild(wakuDiv);


  /*イベント登録 メニュー選択時の挙動*/
  let radioBtns = document.querySelectorAll(`input[type='radio'][name='menu-group']`);
  for (let btn of radioBtns) {
        btn.addEventListener('change', function () { //ボタンにリスナー登録
        var index = btn.id.split('-')[3]; //メニュー番号

        //クエリ用のスペース
        var queryDiv = document.createElement("div");
        queryDiv.classList.add('query-div');
        queryDiv.textContent = menu[index];
        msgDiv.appendChild(queryDiv);

        //画面下部まで移動
        var bottom = msgDiv.scrollHeight - msgDiv.clientHeight;
        msgDiv.scroll(0, bottom);

        //クエリが表示された200ミリ秒後に回答を表示
        setTimeout(function() {
          //答え用のスペース
          var resDiv = document.createElement("div");
          resDiv.classList.add('res-div');
          resDiv.innerHTML = res[index];
          msgDiv.appendChild(resDiv);

          //画面下部まで移動
          var bottom = msgDiv.scrollHeight - msgDiv.clientHeight;
          msgDiv.scroll(0, bottom);
        },200);

        });
  }

  toggleEyecathChat();

});

/*アイキャッチかチャット窓を表示*/
function toggleEyecathChat() {

  if(modeFlg) { //チャット窓を表示
    document.getElementById("chatbot-eyecatch-div").style.visibility = "hidden";
    var wakuDiv = document.getElementById("chatbot-outline");
    wakuDiv.style.visibility = "visible";
    wakuDiv.classList.add('chat-open-r');
  }else { //アイキャッチを表示
    document.getElementById("chatbot-eyecatch-div").style.visibility = "visible";
    var wakuDiv = document.getElementById("chatbot-outline");
    wakuDiv.style.visibility = "hidden";
    wakuDiv.classList.remove('chat-open-r');

  }

  modeFlg = !modeFlg;

}

/*chatbot.jsが設置されたURLを取得*/
function getOwnUrl() {
    var url;
    var scripts = document.getElementsByTagName("script");
    var i = scripts.length;
    while (i--) {
        var match = scripts[i].src.match(/(^|.*\/)chatbot\.js$/);
        if (match) {
            url = match[1];
            break;
        }
    }
    return url;
}
