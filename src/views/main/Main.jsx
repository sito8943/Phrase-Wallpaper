import React, { useState, useEffect } from "react";

function Main() {
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [ok, setOk] = useState("");
  var file = "";

  useEffect(() => {}, []);

  const fileChange = (e) => {
    var archivo = e.target.files[0];
    setFileName(e.target.value);
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
      var contenido = e.target.result;
      file = JSON.parse(contenido);
    };
    lector.readAsText(archivo);
    setError("");
    setOk("");
  };

  const setPhoto = async (e) => {
    setError("");
    setOk("");
  };

  return (
    <div>
      <input
        type="file"
        name="photo"
        id="photo"
        onChange={fileChange}
        accept=".png"
      />
      <button onClick={setPhoto}>Hola</button>
      <label htmlFor="">{fileName}</label>
    </div>
  );
}

export default Main;
