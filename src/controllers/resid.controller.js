const pool = require('../db')
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { createAndUploadFile } = require('../uploadImg');
const { auth } = require('../auth');



const uploadImg = (req, res, next) => {
  console.log('Datos de la solicitud del frontend:', req.body);
  upload.single('image')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    }

    const file = req.file;

    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    console.log("Archivo recibido: ", file.originalname);
    const url = await createAndUploadFile(auth, req.file)
    res.json({ imgUrl: url });
  });
};



const getAllResid = async (req, res) => {
  try {
    const result = await pool.query(`
    SELECT 
    r.id_residencia, r.titulo_residencia, r.tipo_residencia, r.pais_residencia, r.ciudad_residencia, r.direccion_residencia, r.cama_residencia, r.habitacion_residencia, r.banio_residencia, r.descripcion_residencia, r.huesped_max_residencia, r.dias_max_residencia, r.dias_min_residencia, r.precio_residencia, r.check_in_residencia, r.check_out_residencia, r.tipo_alojamiento,
    array_agg(i.imagen_residencia) AS imagenes,
    array_agg(s.wifi_residencia) AS wifi_residencia,
    array_agg(s.cocina_residencia) AS cocina_residencia,
    array_agg(s.televisor_residencia) AS televisor_residencia,
    array_agg(s.lavadora_residencia) AS lavadora_residencia,
    array_agg(s.aire_acond_residencia) AS aire_acond_residencia,
    array_agg(s.psicina_residencia) AS psicina_residencia,
    array_agg(s.jacuzzi_residencia) AS jacuzzi_residencia,
    array_agg(s.estacionamiento_residencia) AS estacionamiento_residencia,
    array_agg(s.gimnasio_residencia) AS gimnasio_residencia,
    array_agg(s.parrilla_residencia) AS parrilla_residencia,
    array_agg(s.camaras_segurid_residencia) AS camaras_segurid_residencia,
    array_agg(s.humo_segurid_residencia) AS humo_segurid_residencia,
    array_agg(e.estado_residencia) AS estado_residencia,
    array_agg(e.fecha_inicio_estado) AS fecha_inicio_estado,
    array_agg(e.fecha_fin_estado) AS fecha_fin_estado
FROM residencia r
LEFT JOIN imagen i ON r.id_residencia = i.id_residencia
LEFT JOIN servicio s ON r.id_residencia = s.id_residencia
LEFT JOIN estado e ON r.id_residencia = e.id_residencia
GROUP BY r.id_residencia;
      `);
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Error obteniendo la información de las residencias");
  }
};



const getResid = async (req, res) =>{
  const idResid = req.params.idResid;
  try {
    const resultResid = await pool.query("SELECT * FROM residencia r, servicio s, estado e WHERE r.id_residencia = s.id_residencia AND r.id_residencia = e.id_residencia AND r.id_residencia = $1", [idResid]);
    res.json(resultResid.rows[0]);
  } catch (err) {
    res.status(500).send("Error obteniendo la residencia");
  }
  };
 
  const getImgResid = async (req, res) => {
    const idResid = req.params.idResid;
    try {
        const resultImgResid = await pool.query("SELECT imagen_residencia FROM residencia r, imagen i WHERE r.id_residencia = i.id_residencia AND r.id_residencia = $1", [idResid]);
        const images = resultImgResid.rows.map((row) => row.imagen_residencia); // Extrae las URLs de las imágenes en un nuevo arreglo
        res.json({ imagen_residencia: images }); // Envía un objeto con el arreglo de imágenes
    } catch (err) {
        res.status(500).send("Error obteniendo las imagenes de la residencia");
    }
};


  const getServ = async (req, res) =>{
    const idResid = req.params.idResid;
    try {
      const resultResid = await pool.query("SELECT * FROM servicio WHERE id_residencia = $1", [idResid]);
      res.json(resultResid.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error obteniendo el servicio");
    }
    };

  const deleteResid = async (req, res) => {
    const id = req.params.idResid;
  
    try {
      // Inicia la transacción
      await pool.query('BEGIN');
      await pool.query('DELETE FROM SERVICIO WHERE id_residencia = $1', [id]);
      await pool.query('DELETE FROM IMAGEN WHERE id_residencia = $1', [id]);
      await pool.query('DELETE FROM ESTADO WHERE id_residencia = $1', [id]);
      await pool.query('DELETE FROM RESIDENCIA WHERE id_residencia = $1', [id]);
      // Finaliza la transacción
      await pool.query('COMMIT');
      res.status(200).send(`Eliminada la residencia con ID: ${id}`);
    } catch (error) {
      // En caso de error, realiza un ROLLBACK y envía una respuesta de error
      await pool.query('ROLLBACK');
      res.status(500).send('Error eliminando la residencia: ' + error);
    }
  };
  
const createResid = async (req, res) =>{
  const client = await pool.connect(); // Inicia una transacción
  try {
    const { tituloResid, tipoResid, paisResid, ciudadResid, direcResid, camaResid, habitResid, banioResid, descripResid, huesMaxResid, diasMaxResid, diasMinResid, precioResid, checkInResid, checkOutResid, tipoAlojam,
     wifi, lavadora, cocina, televisor, aireAcond, psicina, jacuzzi, estacionamiento, gim, parrilla, camaras, detectorHumo,
    imagen
    } = req.body;
    
    const nameResid = await pool.query(
      "SELECT * FROM residencia WHERE LOWER(titulo_residencia) = LOWER($1);",
      [tituloResid]
    );
    if (nameResid.rows.length > 0) {
      return res.status(200).json({ data: 1 }); //si reciben 1 es error por titulo repetido, sino pos no 
    }

    
    await client.query('BEGIN'); // Inicia la transacción
    const newResid = await pool.query(
      "INSERT INTO residencia (titulo_residencia, tipo_residencia, pais_residencia, ciudad_residencia, direccion_residencia, cama_residencia, habitacion_residencia, banio_residencia, descripcion_residencia, huesped_max_residencia, dias_max_residencia, dias_min_residencia, precio_residencia, check_in_residencia, check_out_residencia, tipo_alojamiento ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)",
      [tituloResid, tipoResid, paisResid, ciudadResid, direcResid, camaResid, habitResid, banioResid, descripResid, huesMaxResid, diasMaxResid, diasMinResid, precioResid, checkInResid, checkOutResid, tipoAlojam]
    );
    
    const id_nuevo = await pool.query(
      "SELECT id_residencia FROM residencia WHERE LOWER(titulo_residencia) = LOWER($1);",
      [tituloResid]
    );
    const id_nuevoResid = parseInt(id_nuevo.rows[0].id_residencia); 
     
    const enlacesImagenes = imagen;
    for (let i = 0; i < enlacesImagenes.length; i++) {
      const enlaceImagen = enlacesImagenes[i];
      const newImg = await pool.query(
        "INSERT INTO imagen (id_residencia, imagen_residencia, tipo_imagen) VALUES ($1, $2, 'habitacion')",
        [id_nuevoResid, enlaceImagen]  
      );
    }
    const newServ = await pool.query(
      "INSERT INTO servicio (id_residencia, wifi_residencia, cocina_residencia, televisor_residencia, lavadora_residencia, aire_acond_residencia, psicina_residencia, jacuzzi_residencia, estacionamiento_residencia, gimnasio_residencia, parrilla_residencia, camaras_segurid_residencia, humo_segurid_residencia ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
      [id_nuevoResid, wifi, cocina, televisor, lavadora, aireAcond, psicina, jacuzzi, estacionamiento, gim, parrilla, camaras, detectorHumo]
    );

    let algunCampoEsNull = false;

    for (const campo in req.body) {
      if (req.body[campo] === null || req.body[campo] === undefined) {
        algunCampoEsNull = true;
       break; // Sale del bucle tan pronto se encuentra un campo nulo o indefinido
     }
    }

    if (algunCampoEsNull) {
      const newEst1 = await pool.query(
        "INSERT INTO estado (id_residencia, estado_residencia, fecha_inicio_estado, fecha_fin_estado) VALUES ($1,'En Construcción', null, null)",
        [id_nuevoResid]);  //raro raro las comillas en activo...
    } else {
      const newEst2 = await pool.query(
        "INSERT INTO estado (id_residencia, estado_residencia, fecha_inicio_estado, fecha_fin_estado) VALUES ($1,'Previsualización', null, null)",
        [id_nuevoResid]  //raro raro las comillas en activo...
      );
    }
    await client.query('COMMIT'); // Confirma la transacción
    
    return res.status(200).json(`Residencia agregada exitosamente. ${imagen.length} imagen(es) y ${imagen.length} registro(s) agregado(s).`);
  } catch (error) {
    await client.query('ROLLBACK'); // Revierte la transacción en caso de error
    console.error(error);
    return res.status(500).json(`Error al agregar la residencia: ${error.toString()}`);
  } finally {
    client.release(); // Libera el cliente de la conexión
  }
  };


  const updateResid = async (req, res) => {
    try {
      const { idResid } = req.params;
      const { tituloResid, tipoResid, paisResid, ciudadResid, direcResid, camaResid, habitResid, banioResid, descripResid, huesMaxResid, diasMaxResid, diasMinResid, precioResid, checkInResid, checkOutResid, tipoAlojam,
        wifi, lavadora, cocina, televisor, aireAcond, psicina, jacuzzi, estacionamiento, gim, parrilla, camaras, detectorHumo,
        estado, fechaIniEst, fechaFinEst,
        imagen
      } = req.body;
  
      const existingResid = await pool.query(
        "SELECT * FROM residencia WHERE LOWER(titulo_residencia) = LOWER($1) AND id_residencia != $2",
        [tituloResid, idResid]
      );
      if (existingResid.rows.length > 0) {
        return res.status(200).json({ data: 1 });
      }
      
      const newResid = await pool.query(
        "UPDATE residencia SET titulo_residencia = $1, tipo_residencia = $2, pais_residencia = $3, ciudad_residencia = $4, direccion_residencia= $5, cama_residencia = $6, habitacion_residencia = $7, banio_residencia = $8, descripcion_residencia = $9, huesped_max_residencia= $10, dias_max_residencia = $11, dias_min_residencia = $12, precio_residencia = $13, check_in_residencia= $14, check_out_residencia= $15, tipo_alojamiento= $16  WHERE id_residencia = $17 ",
        [tituloResid, tipoResid, paisResid, ciudadResid, direcResid, camaResid, habitResid, banioResid, descripResid, huesMaxResid, diasMaxResid, diasMinResid, precioResid, checkInResid, checkOutResid, tipoAlojam, idResid]
      );
      await pool.query('DELETE FROM IMAGEN WHERE id_residencia = $1', [idResid]);
      const enlacesImagenes = imagen;
      for (let i = 0; i < enlacesImagenes.length; i++) {
        const enlaceImagen = enlacesImagenes[i];
        const newImg = await pool.query(
          "INSERT INTO imagen (id_residencia, imagen_residencia, tipo_imagen) VALUES ($1, $2, 'habitacion')",
          [idResid, enlaceImagen]  
        );
      }

      const newService = await pool.query(
        "UPDATE servicio SET wifi_residencia = $1, cocina_residencia = $2, televisor_residencia = $3, lavadora_residencia = $4, aire_acond_residencia= $5, psicina_residencia = $6, jacuzzi_residencia = $7, estacionamiento_residencia = $8, gimnasio_residencia = $9, parrilla_residencia= $10, camaras_segurid_residencia = $11, humo_segurid_residencia= $12 WHERE id_residencia = $13 ",
        [wifi, cocina, televisor, lavadora, aireAcond, psicina, jacuzzi, estacionamiento, gim, parrilla, camaras, detectorHumo, idResid]
      );
      const newEst = await pool.query(
        "UPDATE estado SET estado_residencia = $1, fecha_inicio_estado = $2, fecha_fin_estado= $3 WHERE id_residencia = $4 ",
        [estado, fechaIniEst, fechaFinEst, idResid]   //mas raro raro aun las comillas
      );
      if (newResid.rowCount === 0)
        return res.status(404).json({ message: "OK" });
  
      return res.status(200).json({ message: `La residencia con ID ${idResid} ha sido actualizado correctamente` });
    } catch (error) {
      return res.status(500).json({ message: `Error actualizando residencia: ${error.message}` });
    }
  };



module.exports = {
    getAllResid,
    getResid,
    getImgResid,
    deleteResid,
    createResid,
    getServ,
    updateResid,
    uploadImg,
};