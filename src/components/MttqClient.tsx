import React, { useState, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";

// Tipo TypeScript per i dati che riceveremo dai messaggi MQTT
type MQTTMessage = {
  temperature: string;
  humidity: string;
};

const topic = "Synapsy/AirQuality/94BD842D82D3"; //inserisco il topic in una variabile

const MQTTClient: React.FC = () => {
  // Stato per memorizzare l'ultimo messaggio ricevuto
  const [message, setMessage] = useState<MQTTMessage | null>(null);

  let client: MqttClient | null = null; // Variabile per il client MQTT

  useEffect(() => {
    const brokerUrl: string = "wss://nexustlc.ddns.net:443/mqtt"; // URL del broker MQTT (WebSocket Secure)
    // Connessione al broker MQTT
    // eslint-disable-next-line react-hooks/exhaustive-deps
    client = mqtt.connect(brokerUrl);

    // Quando la connessione è attiva, ci iscriviamo al topic
    client.on("connect", () => {
      console.log("Connesso al broker MQTT");
      client?.subscribe(topic, (err) => {
        if (!err) {
          console.log("Sottoscritto al topic" + topic);
        } else {
          console.error(" Errore nella sottoscrizione", err);
        }
      });
    });

    // Quando riceviamo un messaggio, lo leggiamo e aggiorniamo lo stato
    client.on("message", (topic: string, message: Buffer) => {
      console.log(`Messaggio ricevuto su ${topic}:`, message.toString());
      try {
        // Proviamo a convertire il messaggio da stringa JSON a oggetto TypeScript
        const parsedMessage: MQTTMessage = JSON.parse(message.toString());
        setMessage(parsedMessage); // Aggiorniamo lo stato con i nuovi dati
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
  }, []); // L'array vuoto [] fa sì che useEffect venga eseguito solo una volta

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h2>MQTT Client</h2>
      {message ? (
        <div>
          <p>
            <strong>Data Time:</strong> {message.temperature}
          </p>
          <p>
            <strong>IP Address:</strong> {message.humidity}
          </p>
        </div>
      ) : (
        <p>In attesa di messaggi...</p>
      )}
    </div>
  );
};

export default MQTTClient;
