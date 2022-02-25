
var myGameInstance = null;


console.log("teststart");
window.addEventListener('load', function() {
    //ロード時
    console.log("Start");
    var isInitialized = false;
    //GetToStartUnityWorld
});
StartServerWebSocket = function(){
    var connection = new WebSocket("ws://localhost:5001");

 
    //通信が接続された場合
    connection.onopen = function(e) 
    {
        console.log(e.Data);
        myGameInstance.SendMessage("NetWorkManager","OnOpen", "connectserver");
    };
    
    //エラーが発生した場合
    connection.onerror = function(error) 
    {
        myGameInstance.SendMessage("NetWorkManager","OnError"),e.Data;
    };
    
    //メッセージを受け取った場合
    connection.onmessage = function(e) 
    {
        myGameInstance.SendMessage("NetWorkManager","OnMessage",e.Data);
    };
    window.onbeforeunload = function(){
        myGameInstance.SendMessage("NetWorkManager","OnMessage","StopConnect");
        connection.close();
    }
    
    //通信が切断された場合
    connection.onclose = function() 
    {
        myGameInstance.SendMessage("NetWorkManager","OnClose","close");
        console.log("close");
    };

    function SendData(Data)
    {
        connection.send(Data);
    }
}
test = function(){
    myGameInstance.SendMessage("NetWorkManager","OnMessage");
}