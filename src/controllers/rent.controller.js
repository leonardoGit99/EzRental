const pool = require('../db')

  const getrent = async (req, res) =>{
    const idResid = req.params.idResid;
    try {
      const resultRent = await pool.query("SELECT r.precio_total_reserva, r.fecha_inicio_reserva, r.fecha_fin_reserva, r.huespedes_reserva, u.nombre_usuario FROM reserva r, usuario u WHERE r.id_usuario = u.id_usuario and id_residencia = $1", [idResid]);
      res.json(resultRent.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error obteniendo alquiler");
    }
    };
    const getUsuario = async (req, res) =>{
      const codUsuario = req.params.codUsuario;
      try {
        const resultUsr = await pool.query("SELECT * FROM usuario WHERE codigo_usuario = $1", [codUsuario]);
        res.json(resultUsr.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error obteniendo usuario");
      }
      };
  const getevalu = async (req, res) =>{
      const idResid = req.params.idResid;
      try {
        const resultEvalu = await pool.query("SELECT e.id_evaluacion, e.calificacion, e.comentario, u.nombre_usuario FROM evaluacion e, usuario u WHERE u.id_usuario=e.id_usuario and e.id_residencia = $1 ", 
        [idResid]);
        res.json(resultEvalu.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error obteniendo evaluacion");
      }
      };


  const createRent = async (req, res) => {
        try {
          const { idResid, codUsuario } = req.params;
          const {
            precio,
            fechaIni,
            fechaFin,
            huespedes
          } = req.body;
          
          const idUsuarioResult = await pool.query("SELECT id_usuario FROM usuario WHERE codigo_usuario = $1", [codUsuario]);
          const idUsuario = idUsuarioResult.rows[0].id_usuario;

          const newRent = await pool.query(
            "INSERT INTO reserva (id_residencia, id_usuario, precio_total_reserva, fecha_inicio_reserva, fecha_fin_reserva, huespedes_reserva) VALUES ($1, $2, $3, $4, $5, $6)",
            [idResid, idUsuario, precio, fechaIni, fechaFin, huespedes]
          );
          
          await pool.query("UPDATE estado SET estado_residencia = 'Alquilado' WHERE id_residencia = $1", 
          [idResid]);
      
          res.json({ message: "La reserva ha sido creado exitosamente", lot: newRent.rows[0] });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "No se pudo realizar la reserva." });
        }
      };
      const createEvalu = async (req, res) => {
        try {
          const { idResid, codUsuario } = req.params;
          const {
            calificacion,
            comentario
          } = req.body;
          const idUsuarioResult = await pool.query("SELECT id_usuario FROM usuario WHERE codigo_usuario = $1", [codUsuario]);
          const idUsuario = idUsuarioResult.rows[0].id_usuario;
          
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
      const createUsuario = async (req, res) => {
        try {
          const {
            codigo,
            nombre,
            correo,
            foto
          } = req.body;
          
          const newUsr = await pool.query(
            "INSERT INTO usuario (codigo_usuario, nombre_usuario, correo_usuario, foto_usuario) VALUES ($1, $2, $3, $4)",
            [codigo, nombre, correo, foto]
          );
      
          res.json({ message: "El usuario ha sido creado exitosamente", lot: newUsr.rows[0] });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "No se pudo crear el usuario" });
        }
      };
    module.exports = {
        getrent,
        getevalu,
        createRent,
        createEvalu,
        createUsuario,
        getUsuario
    };