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

router.post('/api/upload', uploadImg);

router.get("/resid", getAllResid);
router.get("/resid/:idResid", getResid);
router.delete("/resid/:idResid", deleteResid);
router.post('/resid', createResid);
router.put('/resid/:idResid', updateResid);

router.get("/serv/:idResid", getServ);
router.get("/image/:idResid", getImgResid);

module.exports = router;