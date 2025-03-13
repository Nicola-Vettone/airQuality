import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { Download } from "react-bootstrap-icons";
import { useState } from "react";

function Tools() {
  // Definiamo il tipo per i file caricati
  interface UploadedFile {
    name: string;
    file: File;
  }
  // Inizializziamo uno stato per gestire i file caricati
  const [files, setFiles] = useState<UploadedFile[]>([]);

  // Questa funzione gestisce il caricamento dei file e li aggiunge allo stato
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const uploadedFiles: UploadedFile[] = Array.from(event.target.files).map((file) => ({ name: file.name, file }));
    setFiles((prevFiles: UploadedFile[]) => [...prevFiles, ...uploadedFiles]);
  };
  return (
    <Container fluid className="p-0">
      <Container fluid className="module3d-container">
        <NavBar />
        <SearchBar />
      </Container>
      <Container className="d-flex flex-column align-items-center justify-content-center mt-5">
        {files.map((file, index) => (
          <p key={index} className="w-100 border border-2 mt-2 rounded-pill py-2 px-4 d-flex align-items-center">
            {file.name}
            <Download className="cursor-pointer-download ms-auto" size={22} />
          </p>
        ))}
        <div className="d-flex justify-content-end w-100">
          {/* Nascondiamo il campo di input file e lo colleghiamo a un'etichetta per migliorare l'interfaccia utente */}
          <input type="file" multiple onChange={handleFileUpload} className="d-none" id="fileInput" />
          <label
            htmlFor="fileInput"
            className="text-white mt-3 buttonSalta rounded-pill px-5 py-1 btn btn-primary cursor-pointer"
          >
            Upload
          </label>
        </div>
      </Container>
    </Container>
  );
}
export default Tools;
