// src/hooks/useWebSocket.js - Hook do WebSocket
"use client";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export function useWebSocket() {
  const { state } = useApp();
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    if (!state.user) return;

    const connectWebSocket = () => {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001";
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setConnectionStatus("Connected");
        setSocket(ws);

        // Authenticate with server
        ws.send(
          JSON.stringify({
            type: "auth",
            token: localStorage.getItem("token"),
          })
        );
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "notification":
            toast.success(data.message);
            break;
          case "appointment_reminder":
            toast.info(`Przypomnienie: Wizyta za ${data.timeUntil}`);
            break;
          case "new_patient":
            toast.info("Nowy pacjent zarejestrowany");
            break;
          default:
            console.log("Unknown message type:", data.type);
        }
      };

      ws.onclose = () => {
        setConnectionStatus("Disconnected");
        setSocket(null);

        // Reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setConnectionStatus("Error");
      };
    };

    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socket) {
        socket.close();
      }
    };
  }, [state.user]);

  return { socket, connectionStatus };
}
