/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";
import moment from "moment-timezone";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import MapComponent from "./Maps";
import { useNavigate } from "react-router";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams, ValueFormatterParams, ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

/* import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css"; */

// Registra il modulo necessario per AG Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Definizione del tipo per i dati ricevuti da MQTT
interface MQTTMessageItem {
  temperature: string;
  humidity: string;
  pm10: string;
  pm2_5: string;
  noise: string;
}

// Struttura dei messaggi con chiave deviceId
type MQTTMessages = Record<string, MQTTMessageItem>;

const MQTTClient: React.FC = () => {
  const navigate = useNavigate();

  const [oggi, setOggi] = useState<string>(() => localStorage.getItem("oggi") || moment().calendar());

  const [messages, setMessages] = useState<MQTTMessages>(() => {
    const storedData = localStorage.getItem("mqttMessages");
    return storedData ? JSON.parse(storedData) : {};
  });
  //use effect con i dati inseriti nel localStorage che appaiono in tabella al primo render
  useEffect(() => {
    localStorage.setItem("mqttMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const newOggi = moment().calendar();
    setOggi(newOggi);
    localStorage.setItem("oggi", newOggi);
  }, [messages]);

  let client: MqttClient | null = null;
  //useEffect che esegue la connessione a MQTT e aggiorna i dati
  useEffect(() => {
    const brokerUrl: string = "wss://nexustlc.ddns.net:443/mqtt";

    client = mqtt.connect(brokerUrl, {
      username: "ProgettoAirQualityClient",
      password: "1d87914de3fdd3b778a45ce3fdff3c6c",
    });

    client.on("connect", () => {
      console.log("Connesso al broker MQTT");
      client?.subscribe("Synapsy/AirQuality/+", (err) => {
        if (!err) {
          console.log("Sottoscritto al topic");
        } else {
          console.error("Errore nella sottoscrizione:", err);
        }
      });
    });

    client.on("message", (topic: string, message: Buffer) => {
      const topicParts = topic.split("/");
      const deviceId = topicParts[2];

      try {
        const parsedMessage: MQTTMessageItem = JSON.parse(message.toString());
        console.log(parsedMessage);
        setMessages((prev) => ({
          ...prev,
          [deviceId]: parsedMessage,
        }));
      } catch (error) {
        console.error("Errore nel parsing del messaggio:", error);
      }
    });

    return () => {
      if (client) {
        client.end();
        console.log("Connessione MQTT chiusa");
      }
    };
  }, []);

  const handleDeviceClick = (deviceId: string) => {
    navigate(`/grafici?deviceId=${deviceId}`);
    console.log(deviceId);
  };

  // Definizione delle colonne
  const columnDefs: ColDef[] = [
    {
      headerName: "#ID",
      field: "deviceId",
      cellRenderer: (params: ICellRendererParams) => (
        <span className="cursorID" onClick={() => handleDeviceClick(params.value)}>
          {params.value}
        </span>
      ),
    },
    {
      headerName: "Status",
      field: "status",
      valueFormatter: () => "🟢",
    },
    {
      headerName: "Temperatura",
      field: "temperature",
      valueFormatter: (params: ValueFormatterParams) => `${params.value}°`,
    },
    {
      headerName: "Umidità",
      field: "humidity",
      valueFormatter: (params: ValueFormatterParams) => `${params.value}%`,
    },
    {
      headerName: "Installed On",
      field: "installedOn",
      valueFormatter: () => "17/12/24",
    },
    {
      headerName: "Last Transmission",
      field: "lastTransmission",
      valueFormatter: () => oggi,
    },
  ];
  //trasforma i messaggi ricevuti via MQTT  per essere visualizzato nella tabella
  const rowData = Object.entries(messages).map(([deviceId, msg]) => ({
    deviceId,
    ...msg,
  }));

  return (
    <Container fluid className="backGroundColor">
      <NavBar />
      <div className="ag-theme-alpine mb-2 " style={{ height: 300, width: "100%" }}>
        <AgGridReact //tabella
          rowData={rowData} // dati dell'array
          columnDefs={columnDefs} //colonne
          // Proprietà per far estendere le colonne
          defaultColDef={{
            flex: 1,
            resizable: true,
          }}
        />
      </div>
      <MapComponent />
    </Container>
  );
};

export default MQTTClient;
