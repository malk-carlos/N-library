function log(data){
    if(localStorage.getItem('debug')=="1" || localStorage.getItem('debug') == "2"){
        console.log(data)
    }
    return
}


setTimeout(() => {
  if (localStorage.getItem('debug') == "1" ||localStorage.getItem('debug') == "2") {
    let element = document.querySelector('body');;
    element.insertAdjacentHTML('afterbegin', `<br><br><br><br><h2>デバッグモード</h2> <button onclick="localStorage.removeItem('debug');location.reload()">デバックモード解除</button>`);
  }
}, 2000);


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