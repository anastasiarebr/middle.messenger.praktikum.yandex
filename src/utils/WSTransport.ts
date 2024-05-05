
import { EventBus } from "../modules/EventBus";

enum WSTransportEvents {
  Connected = 'connected',
  Close = 'close',
  Error = 'error',
  Message = 'message',
}

export class WSTransport extends EventBus {
  private socket?: WebSocket;

  private pingInterval: NodeJS.Timeout | undefined;

  private readonly pingIntervalTime = 3000;

  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: string | number | object) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    if (this.socket) {
      throw new Error('The socket is already connected');
    }

    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSTransportEvents.Error, reject);
      this.on(WSTransportEvents.Connected, () => {
        this.off(WSTransportEvents.Error, reject);
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.pingIntervalTime);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected);
      console.log('Соединение установлено');
    });

    socket.addEventListener('close', (event) => {
      this.emit(WSTransportEvents.Close);
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e);
      console.log('Ошибка', e);
    });

    socket.addEventListener('message', (message: MessageEvent) => {
      try {
        const data = JSON.parse(message.data);
        if (['pong', 'user connected'].includes(data?.type)) {
          return;
        }

        console.log('Получены данные:', data);
        this.emit(WSTransportEvents.Message, data);
      } catch (err) {
        console.error(err);
      }
    });
  }
}
