const { Router } = require("express");
const pool = require("../db");
const router = Router();

const { 
    getAllResid,
    deleteResid,
    getResid,
    getImgResid,
    createResid,
    getServ,
    updateResid,
    uploadImg, 
    getResidUsr
} = require("../controllers/resid.controller");
const { 
    getrent,
    getevalu,
    createRent,
    createEvalu,
    createUsuario,
    getUsuario,
    getrentUser
} = require("../controllers/rent.controller");

router.post('/api/upload', uploadImg);

router.get("/resid", getAllResid);
router.get("/resid/usuario/:codUsuario", getResidUsr);
router.get("/resid/:idResid", getResid);
router.delete("/resid/:idResid", deleteResid);
router.post('/resid/:codUsuario', createResid);
router.put('/resid/:idResid', updateResid);

router.get("/serv/:idResid", getServ);
router.get("/image/:idResid", getImgResid);

router.get("/rent/resid/:idResid", getrent);
router.get("/rent/user/:idResid", getrentUser);
router.post("/rent/:idResid/:codUsuario", createRent);
router.get("/evalu/:idResid", getevalu);
router.post("/evalu/:idResid/:codUsuario", createEvalu);

router.get("/usr/:codUsuario", getUsuario);
router.post("/usr", createUsuario);
module.exports = router;