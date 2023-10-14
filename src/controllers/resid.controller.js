const pool = require('../db')


const getAllResid = async (req, res) =>{
    const result = await pool.query("select * from residencia");
  console.log(result);
  res.json(result.rows);
  };

const getResid = async (req, res) =>{
  const idResid = req.params.idResid;
  try {
    const resultResid = await pool.query("SELECT * FROM residencia WHERE id_residencia = $1", [idResid]);
    res.json(resultResid.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obteniendo la residencia");
  }
  };

  const deleteResid = async (req, res) => {
    const id = req.params.idResid;
  
    try {
      // Inicia la transacción
      await pool.query('BEGIN');
      await pool.query('DELETE FROM SERVICIO WHERE id_residencia = $1', [id]);
      await pool.query('DELETE FROM IMAGEN WHERE id_residencia = $1', [id]);
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
  try {
    const { tituloResid, tipoResid, paisResid, ciudadResid, direcResid, camaResid, habitResid, banioResid, descripResid, huesMaxResid, diasMaxResid, diasMinResid, precioResid, reglaResid, checkInResid, checkOutResid, tipoAlojam,
     wifi, lavadora, cocina, televisor, aireAcond, psicina, jacuzzi, estacionamiento, gim, parrilla, camaras, detectorHumo 
    } = req.body;
    const nameResid = await pool.query(
      "SELECT * FROM residencia WHERE LOWER(titulo_residencia) = LOWER($1);",
      [tituloResid]
    );
    if (nameResid.rows.length > 0) {
      return res.status(200).json({ data: 1 }); //si reciben 1 es error por titulo repetido, sino pos no es error
    }
    const newResid = await pool.query(
      "INSERT INTO residencia (titulo_residencia, tipo_residencia, pais_residencia, ciudad_residencia, direccion_residencia, cama_residencia, habitacion_residencia, banio_residencia, descripcion_residencia, huesped_max_residencia, dias_max_residencia, dias_min_residencia, precio_residencia, regla_residencia, check_in_residencia, check_out_residencia, tipo_alojamiento ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
      [tituloResid, tipoResid, paisResid, ciudadResid, direcResid, camaResid, habitResid, banioResid, descripResid, huesMaxResid, diasMaxResid, diasMinResid, precioResid, reglaResid, checkInResid, checkOutResid, tipoAlojam]
    );
    const id_nuevo = await pool.query(
      "SELECT id_residencia FROM residencia WHERE LOWER(titulo_residencia) = LOWER($1);",
      [tituloResid]
    );
    const id_nuevoResid = parseInt(id_nuevo.rows[0].id_residencia); 
    const newServ = await pool.query(
      "INSERT INTO servicio (id_residencia, wifi_residencia, cocina_residencia, televisor_residencia, lavadora_residencia, aire_acond_residencia, psicina_residencia, jacuzzi_residencia, estacionamiento_residencia, gimnasio_residencia, parrilla_residencia, camaras_segurid_residencia, humo_segurid_residencia ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
      [id_nuevoResid, wifi, lavadora, cocina, televisor, aireAcond, psicina, jacuzzi, estacionamiento, gim, parrilla, camaras, detectorHumo]
    );
    
    return res.status(200).json(`Residencia agregada exitosamente. ${newResid.rowCount} registro(s) agregado(s).`);
  } catch (error) {
    console.error(error); 
    return res.status(500).json(`Error al agregar la residencia: ${error.toString()}`);
  }
  };





module.exports = {
    getAllResid,
    getResid,
    deleteResid,
    createResid
};