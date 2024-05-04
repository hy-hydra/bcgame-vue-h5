class WebSocketService {
  private socket: WebSocket | null = null;

  public connect(url: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      if (this.socket !== null) {
        this.disconnect();
      }

      this.socket = new WebSocket(url);

      this.socket.onopen = event => {
        console.log("WebSocket connected.");
        resolve(event);
      };

      this.socket.onerror = event => {
        console.error("WebSocket error:", event);
        reject(event);
      };

      this.socket.onclose = event => {
        console.log("WebSocket disconnected.", event);
      };
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  public sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error("WebSocket is not connected.");
    }
  }

  public onMessage(callback: (this: WebSocket, ev: MessageEvent) => any): void {
    if (this.socket) {
      this.socket.onmessage = callback;
    }
  }
}

export default new WebSocketService();
