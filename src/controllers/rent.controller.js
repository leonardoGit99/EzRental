const pool = require('../db')

const getrent = async (req, res) =>{
    const idResid = req.params.idResid;
    try {
      const resultResid = await pool.query("SELECT * FROM reserva WHERE id_residencia = $1", [idResid]);
      res.json(resultResid.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error obteniendo alquiler");
    }
    };

    const getevalu = async (req, res) =>{
      const idResid = req.params.idResid;
      try {
        const resultResid = await pool.query("SELECT * FROM evaluacion WHERE id_residencia = $1", [idResid]);
        res.json(resultResid.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error obteniendo evaluacion");
      }
      };


const createRent = async (req, res) => {
        try {
          const idResid = req.params.idResid;
          const {
            precio,
            fechaIni,
            fechaFin,
            huespedes,
            pagado
          } = req.body;
          
          const newRent = await pool.query(
            "INSERT INTO reserva (id_residencia, precio_total_reserva, fecha_inicio_reserva, fecha_fin_reserva, huespedes_reserva, pagado_reserva) VALUES ($1, $2, $3, $4, $5, $6)",
            [idResid, precio, fechaIni, fechaFin, huespedes, pagado]
          );
          
          await pool.query("UPDATE estado SET estado_residencia = 'Alquilado', fecha_inicio_estado = $1, fecha_fin_estado = $2 WHERE id_residencia = $3", 
          [fechaIni, fechaFin, idResid]);
      
          res.json({ message: "La reserva ha sido creado exitosamente", lot: newRent.rows[0] });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "No se pudo realizar la reserva." });
        }
      };

    module.exports = {
        getrent,
        getevalu,
        createRent
    };