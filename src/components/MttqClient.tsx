import React, { useState, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";

import { oggi } from "../configurations/timeConfig";
import { Container, Table } from "react-bootstrap";
import NavBar from "./NavBar";
import MapComponent from "./Maps";

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
  const [messages, setMessages] = useState<MQTTMessages>(() => {
    const storedData = localStorage.getItem("mqttMessages"); // salvo i dati nel localStorage così non mi causa errore e avrò sempre gli ultimi dati prima dell'aggiornamento
    return storedData ? JSON.parse(storedData) : {};
  });

  useEffect(() => {
    localStorage.setItem("mqttMessages", JSON.stringify(messages));
  }, [messages]); //al comporsi del componente lo inizializza con i dati salvati e poi cambiano all'aggiornarsi di message

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
    <Container fluid className="backGroundColor ">
      <NavBar />
      <div className="mt-4">
        <Table>
          <thead>
            <tr className="text-center">
              <th>#ID</th>
              <th>Status</th>
              <th>Temperatura</th>
              <th>Umidità</th>
              <th>Installed On</th>
              <th>Last Transmission</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(messages || {}).map(
              //converto l'oggetto in array per poi mapparlo
              ([deviceId, msg]) => (
                <tr className="text-center" key={deviceId}>
                  <td>{deviceId}</td>
                  <td>🟢</td>
                  <td>{msg.temperature}°</td>
                  <td>{msg.humidity}%</td>
                  <td>17/12/24</td>
                  <td>{oggi}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
      <MapComponent />
    </Container>
  );
};

export default MQTTClient;
