import React, { useState, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";

import { oggi } from "../configurations/timeConfig";

// Tipo TypeScript per i dati che riceveremo dai messaggi MQTT
type MQTTMessageItem = {
  temperature: string;
  humidity: string;
  pm10: string;
  pm2_5: string;
  noise: string;
};

// utilizzo un oggetto invece di un array
type MQTTMessages = Record<string, MQTTMessageItem>;

const topic = "Synapsy/AirQuality/+"; //inserisco il topic in una variabile

const MQTTClient: React.FC = () => {
  // Stato per memorizzare l'ultimo messaggio ricevuto per ogni dispositivo
  const [messages, setMessages] = useState<MQTTMessages>({});

  let client: MqttClient | null = null; // Variabile per il client MQTT

  useEffect(() => {
    const brokerUrl: string = "wss://nexustlc.ddns.net:443/mqtt"; // URL del broker MQTT (WebSocket Secure)

    // Connessione al broker MQTT
    // eslint-disable-next-line react-hooks/exhaustive-deps
    client = mqtt.connect(brokerUrl, {
      //Credenziali per la mqtt client, senza non possono essere visualizzati i dati
      username: "ProgettoAirQualityClient",
      password: "1d87914de3fdd3b778a45ce3fdff3c6c",
    });

    // Quando la connessione è attiva, ci iscriviamo al topic
    client.on("connect", () => {
      console.log("Connesso al broker MQTT");
      client?.subscribe(topic, (err) => {
        if (!err) {
          console.log("Sottoscritto al topic: " + topic);
        } else {
          console.error("Errore nella sottoscrizione:", err);
        }
      });
    });

    client.on("error", (error) => {
      console.error("Errore nella connessione al broker MQTT:", error);
    });

    // Quando riceviamo un messaggio, lo leggiamo e aggiorniamo lo stato
    client.on("message", (topic: string, message: Buffer) => {
      const topicParts = topic.split("/");
      const deviceId = topicParts[2];
      console.log(`Messaggio ricevuto su ${deviceId}:`, message.toString());

      try {
        // Convertire il messaggio da stringa JSON a oggetto TypeScript
        const parsedMessage: MQTTMessageItem = JSON.parse(message.toString());

        // Sovrascriviamo il messaggio precedente per questo dispositivo
        setMessages((prev) => ({
          ...prev,
          [deviceId]: parsedMessage,
        }));
      } catch (error) {
        console.error("Errore nel parsing del messaggio:", error);
      }
    });

    // Quando il componente viene smontato, chiudiamo la connessione MQTT
    return () => {
      if (client) {
        client.end();
        console.log("Connessione MQTT chiusa");
      }
    };
  }, []); // si esegue solo una volta

  return (
    <div>
      <h2>MQTT Client</h2>
      {Object.keys(messages).length > 0 ? (
        <div className="d-flex">
          {Object.entries(messages).map(([deviceId, msg]) => (
            //converto l'oggetto in un array con entries per poi mapparlo
            <div key={deviceId}>
              <p>
                <strong>{deviceId}</strong>
              </p>
              <p>
                <strong>Temperatura:</strong> {msg.temperature}
              </p>
              <p>
                <strong>Umidità:</strong> {msg.humidity}
              </p>
              <p>
                <strong>PM10:</strong> {msg.pm10}
              </p>
              <p>
                <strong>PM2.5:</strong> {msg.pm2_5}
              </p>
              <p>
                <strong>Noise:</strong> {msg.noise}
              </p>
              <p>
                <strong>Data</strong> {oggi}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>In attesa di messaggi...</p>
      )}
    </div>
  );
};

export default MQTTClient;
