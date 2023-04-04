const express = require("express");
const tarifModel = require("./tarifler-model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const tarifler = await tarifModel.find();
    res.json(tarifler);
  } catch (err) {
    next(err);
  }
});

router.get("/:tarifId", async (req, res, next) => {
  try {
    const tarif = await tarifModel.findTarifAdimlariById(req.params.tarifId);
    res.json(tarif);
  } catch (err) {
    next(err);
  }
});

router.get("/detay/:id", async (req, res, next) => {
  try {
    const tarifler = await tarifModel.idyeGoreTarifGetir(req.params.id);
    res.json(tarifler);
  } catch (err) {
    next(err);
  }
});

router.get("/:tarifId/:adimSirasi", async (req, res, next) => {
  try {
    const icindekiler = await tarifModel.findTafifIcindekileriById(
      req.params.tarifId,
      req.params.adimSirasi
    );
    res.json(icindekiler);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
