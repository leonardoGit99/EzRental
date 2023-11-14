const pool = require('../db')

  const getrent = async (req, res) =>{
    const idResid = req.params.idResid;
    //falta poner nombre de usuario
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
        const idUsuarioResult = await pool.query("SELECT id_usuario FROM residencia WHERE id_residencia = $1", [idResid]);
        const idUsuario = idUsuarioResult.rows[0].id_usuario;
        const resultEvalu = await pool.query("SELECT e.id_evaluacion, e.calificacion, e.comentario, u.nombre_usuario FROM evaluacion e, usuario u WHERE e.id_residencia = $1 and u.id_usuario = $2", 
        [idResid, idUsuario]);
        res.json(resultEvalu.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error obteniendo evaluacion");
      }
      };


  const createRent = async (req, res) => {
        try {
          const { idResid, idUsuario } = req.params;
          const {
            precio,
            fechaIni,
            fechaFin,
            huespedes
          } = req.body;
          
          const newRent = await pool.query(
            "INSERT INTO reserva (id_residencia, id_usuario, precio_total_reserva, fecha_inicio_reserva, fecha_fin_reserva, huespedes_reserva) VALUES ($1, $2, $3, $4, $5, $6)",
            [idResid, idUsuario, precio, fechaIni, fechaFin, huespedes]
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
          const { idResid, idUsuario } = req.params;
          const {
            calificacion,
            comentario
          } = req.body;
          
          const newEva = await pool.query(
            "INSERT INTO evaluacion (id_residencia, id_usuario, calificacion, comentario) VALUES ($1, $2, $3, $4)",
            [idResid, idUsuario, calificacion, comentario]
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