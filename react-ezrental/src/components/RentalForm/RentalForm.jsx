import React, { useState } from "react";
import "./rentalFormStyles.css";
import UploadComponent from "./UploadComponent";
import { Button } from "antd";

function RentalForm() {
  const [urls, setUrls] = useState([]);

  return (
    <>
    
      <p>Componente RentalForm pasado a page AddAd</p>
      <b>Contenido</b>
      <UploadComponent urls={urls}/>

      <Button onClick={() => console.log(urls)}>
        PRINT
      </Button>

    </>
  );

}
export default RentalForm;
