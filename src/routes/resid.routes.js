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
     
} = require("../controllers/resid.controller");
const { 
    getrent,
    getevalu,
    createRent,
    createEvalu
} = require("../controllers/rent.controller");

router.post('/api/upload', uploadImg);

router.get("/resid", getAllResid);
router.get("/resid/:idResid", getResid);
router.delete("/resid/:idResid", deleteResid);
router.post('/resid/:idUsuario', createResid);
router.put('/resid/:idResid', updateResid);

router.get("/serv/:idResid", getServ);
router.get("/image/:idResid", getImgResid);

router.get("/rent/:idResid", getrent);
router.post("/rent/:idResid", createRent);
router.get("/evalu/:idResid", getevalu);
router.post("/evalu/:idResid", createEvalu);

module.exports = router;