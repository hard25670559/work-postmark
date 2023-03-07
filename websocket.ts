import { Server as WebsocketServer } from 'ws';
import { Server as HttpServer } from 'http';

export default (server: HttpServer) => {
  //將 express 交給 SocketServer 開啟 WebSocket 的服務
  const wss = new WebsocketServer({ server });

  //當有 client 連線成功時
  wss.on('connection', ws => {
    console.log('Client connected')
    // 當收到client消息時
    ws.on('message', data => {
      // 收回來是 Buffer 格式、需轉成字串
      const dataTmp = data.toString();

      // 可在 terminal 看收到的訊息
      console.log(dataTmp);

      /// 發送消息給client
      ws.send(dataTmp);

    });

    // 當連線關閉
    ws.on('close', () => {
      console.log('Close connected');
    });

    return wss;
  });
}

export function broadcast(websocketServer: WebsocketServer, message: string) {
  /// 發送給所有client：
  let clients = websocketServer.clients;  //取得所有連接中的 client
  clients.forEach(client => client.send(message));
}

