import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import mqtt, { MqttClient } from "mqtt";

// Importa i tipi da echarts per una tipizzazione corretta
import { EChartsOption } from "echarts";

// Interfaccia per tipizzare i dati ricevuti dal messaggio MQTT
interface Payload {
  pm2_5: number;
  pm10: number;
  humidity: number;
  temperature: number;
  noise: number;
}

const GraficiMqtt: React.FC = () => {
  // Stati per memorizzare i dati ricevuti da MQTT
  const [dataPM2_5, setDataPM2_5] = useState<number[]>([]);
  const [dataPM10, setDataPM10] = useState<number[]>([]);
  const [dataHumidity, setDataHumidity] = useState<number[]>([]);
  const [dataTemperature, setDataTemperature] = useState<number[]>([]);
  const [noiseLevel, setNoiseLevel] = useState<number[]>([]);

  // Ottieni deviceId dai parametri dell'URL
  const [deviceId, setDeviceId] = useState<string>("");

  useEffect(() => {
    // Estrai deviceId dai parametri dell'URL
    const urlParams = new URLSearchParams(window.location.search);
    const deviceIdFromURL = urlParams.get("deviceId");

    if (deviceIdFromURL) {
      setDeviceId(deviceIdFromURL);
      console.log("DeviceId dall'URL:", deviceIdFromURL);
    } else {
      console.warn("DeviceId non trovato nei parametri dell'URL");
    }
  }, []);

  // Opzioni per il grafico del livello di rumore
  const noiseChartOption: EChartsOption = {
    title: { text: "Noise Level", left: "center" },
    xAxis: {
      type: "category", // Tipo di asse specificato come "category"
      data: Array.from({ length: noiseLevel.length }, (_, i) => i),
    },
    yAxis: { type: "value", min: 30, max: 120 },
    series: [{ data: noiseLevel, type: "bar", color: "green" }],
  };

  useEffect(() => {
    // Se non c'è un deviceId, non connettersi
    if (!deviceId) return;

    // Connessione al broker MQTT
    const client: MqttClient = mqtt.connect("wss://nexustlc.ddns.net:443/mqtt", {
      username: "ProgettoAirQualityClient", // username per l'autenticazione
      password: "1d87914de3fdd3b778a45ce3fdff3c6c", // password per l'autenticazione
    });

    // Quando la connessione è stabilita
    client.on("connect", () => {
      console.log("Connesso a MQTT");
      // Sottoscrivi solo al topic specifico per il deviceId dall'URL
      const topicToSubscribe = `Synapsy/AirQuality/${deviceId}`;
      client.subscribe(topicToSubscribe);
      console.log(`Sottoscritto al topic: ${topicToSubscribe}`);

      // Reset dei dati all'avvio
      setDataPM2_5([]);
      setDataPM10([]);
      setDataHumidity([]);
      setDataTemperature([]);
      setNoiseLevel([]);
    });

    // Quando un messaggio viene ricevuto
    client.on("message", (topic: string, message: Buffer) => {
      try {
        // Parsing dei dati dal messaggio MQTT
        const payload: Payload = JSON.parse(message.toString());

        // Aggiornamento degli stati con i nuovi dati (limitato agli ultimi 20/30 valori)
        setDataPM2_5((prev) => [...prev.slice(-20), payload.pm2_5]);
        setDataPM10((prev) => [...prev.slice(-20), payload.pm10]);
        setDataHumidity((prev) => [...prev.slice(-20), payload.humidity]);
        setDataTemperature((prev) => [...prev.slice(-20), payload.temperature]);
        setNoiseLevel((prev) => [...prev.slice(-30), payload.noise]);
      } catch (error) {
        console.error("Errore parsing MQTT:", error); // Gestione degli errori in caso di dati non validi
      }
    });

    // Pulizia della connessione MQTT quando il componente viene smontato
    // o quando cambia il deviceId
    return (): void => {
      client.end(); // Chiude la connessione MQTT
      console.log("Connessione MQTT terminata");
    };
  }, [deviceId]); // L'effetto dipende ora dal deviceId

  // Funzione per generare le opzioni dei grafici
  const getChartOption = (title: string, data: number[], color: string): EChartsOption => ({
    title: { text: title, left: "center" },
    xAxis: {
      type: "category", // Tipo di asse specificato come "category"
      data: Array.from({ length: data.length }, (_, i) => i),
    },
    yAxis: { type: "value" },
    series: [{ data, type: "line", smooth: true, lineStyle: { color } }],
  });

  return (
    <div>
      {deviceId ? (
        // Mostra i grafici se c'è un deviceId
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <h2 style={{ gridColumn: "1 / span 2", textAlign: "center" }}>Dati del dispositivo: {deviceId}</h2>
          {/* Grafico per PM2.5 */}
          <ReactECharts option={getChartOption("PM 2.5", dataPM2_5, "red")} />
          {/* Grafico per PM10 */}
          <ReactECharts option={getChartOption("PM 10", dataPM10, "green")} />
          {/* Grafico per Umidità */}
          <ReactECharts option={getChartOption("Umidità", dataHumidity, "purple")} />
          {/* Grafico per Temperatura */}
          <ReactECharts option={getChartOption("Temperatura", dataTemperature, "orange")} />
          {/* Grafico per Livello di Rumore */}
          <ReactECharts option={noiseChartOption} />
        </div>
      ) : (
        // Mostra un messaggio se non c'è un deviceId
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>Nessun dispositivo specificato. Aggiungi il parametro '?deviceId=XXX' all'URL.</p>
        </div>
      )}
    </div>
  );
};

export default GraficiMqtt;
