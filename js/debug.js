function log(data){
    if(localStorage.getItem('debug')==1){
        console.log(data)
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
          height: '500px',
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