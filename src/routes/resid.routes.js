const { Router } = require("express");
const pool = require("../db");
const router = Router();

const { 
    getAllResid,
    deleteResid,
    getResid,
    createResid

} = require("../controllers/resid.controller");


router.get("/resid", getAllResid);
router.get("/resid/:idResid", getResid);
router.delete("/resid/:idResid", deleteResid);
router.post('/resid', createResid);


module.exports = router;