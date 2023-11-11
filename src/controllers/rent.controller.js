const pool = require('../db')

  const getrent = async (req, res) =>{
    const idResid = req.params.idResid;
    try {
      const resultRent = await pool.query("SELECT * FROM reserva WHERE id_residencia = $1", [idResid]);
      res.json(resultRent.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error obteniendo alquiler");
    }
    };

  const getevalu = async (req, res) =>{
      const idResid = req.params.idResid;
      try {
        const resultEvalu = await pool.query("SELECT * FROM evaluacion WHERE id_residencia = $1", [idResid]);
        res.json(resultEvalu.rows);
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
            huespedes
          } = req.body;
          
          const newRent = await pool.query(
            "INSERT INTO reserva (id_residencia, precio_total_reserva, fecha_inicio_reserva, fecha_fin_reserva, huespedes_reserva, pagado_reserva) VALUES ($1, $2, $3, $4, $5, 'True')",
            [idResid, precio, fechaIni, fechaFin, huespedes]
          );
          
          await pool.query("UPDATE estado SET estado_residencia = 'Alquilado', fecha_inicio_estado = $1, fecha_fin_estado = $2 WHERE id_residencia = $3", 
          [fechaIni, fechaFin, idResid]);
      
          res.json({ message: "La reserva ha sido creado exitosamente", lot: newRent.rows[0] });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "No se pudo realizar la reserva." });
        }
      };
      const createEvalu = async (req, res) => {
        try {
          const idResid = req.params.idResid;
          const {
            calificacion,
            comentario
          } = req.body;
          
          const newEva = await pool.query(
            "INSERT INTO evaluacion (id_residencia, calificacion, comentario) VALUES ($1, $2, $3)",
            [idResid, calificacion, comentario]
          );
      
          res.json({ message: "El comentario ha sido creado exitosamente", lot: newEva.rows[0] });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "No se pudo realizar el comentario" });
        }
      };

    module.exports = {
        getrent,
        getevalu,
        createRent,
        createEvalu
    };