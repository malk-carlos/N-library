//1 画面表示
//2 コンソール表示

function log(data){
    if(localStorage.getItem('debug')=="1" || localStorage.getItem('debug') == "2"){
        console.log(data)
    }
    return
}

function warn(data){
  if(localStorage.getItem('debug')=="1"){
    console.log(`⚠️${data}⚠️`)
  }else if(localStorage.getItem('debug') == "2"){
      console.warn(data)
  }
  return
}

//console.logイベントが発火した時に処理を実行
if(localStorage.getItem('debug')==1){
    window.console.log = text => {
      // 初回は表示用の要素を作成
      if (!$('#console').length) {
        // 画面下部に固定表示する
    $('<div id="console"></div>') 
         .appendTo($('body'))
         .css({
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '300px',
          padding: '8px',
          background: 'rgba(0,0,0,0.7)',
          fontSize: '10px',
          color: '#fff',
          zIndex: 1000000
        });
      }
      //consoleに本来出力される内容を表示していく
      $('#console').prepend(`${text}<br>`);
    };
}



  if (localStorage.getItem('debug')) { //デバッグモード中かどうか
    let element = document.querySelector('body');
    element.insertAdjacentHTML('afterbegin', `<div class="air"><div id="debug_title">デバッグモード</div><div class="debug"><div id="debug_ip">IPアドレス</div><div id="debug_name">ユーザー名</div><div id="debug_id">ユーザーID</div></div><div><button onclick="localStorage.removeItem('debug');location.reload()">デバッグモードOFF</button></div></div>`);
    setTimeout(() => {
      document.getElementById("debug_ip").innerHTML = Cookies.get("IP");
      document.getElementById("debug_name").innerHTML = loginData.name;
      document.getElementById("debug_id").innerHTML = loginData.sub;
      document.getElementById("debug_ip").innerHTML = Cookies.get("IP");
    }, 3000);
  }



  