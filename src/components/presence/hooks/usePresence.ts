import { useEffect, useState } from "react";
import type { Presence } from "@/types/presence";

export function usePresence() {
  const [presence, setPresence] = useState<Presence | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_RICH_PRESENCE) {
      console.error("WebSocket URL not configured");
      return;
    }

    const socket = new WebSocket(process.env.NEXT_PUBLIC_RICH_PRESENCE);

    const handleOpen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      socket.send("Connection established");
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data === "connected" || event.data === "pong") return;

      try {
        const data = JSON.parse(event.data);
        setPresence(data);
      } catch (error) {
        console.error("Invalid JSON from WebSocket:", event.data, error);
      }
    };

    const handleClose = () => {
      setIsConnected(false);
      console.log("WebSocket disconnected");
    };

    const handleError = (error: Event) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    const pingInterval = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send("ping");
      }
    }, 10000);

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);

    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);
      socket.close();
      clearInterval(pingInterval);
    };
  }, []);

  return { presence, isConnected };
}
