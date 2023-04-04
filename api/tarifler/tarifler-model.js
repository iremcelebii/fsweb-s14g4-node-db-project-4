const db = require("../../data/db-config");

function find() {
  return db
    .select("tarifler.*")
    .count("adimlar.adim_id as adim_sayisi")
    .from("tarifler")
    .leftJoin("adimlar", "tarifler.tarif_id", "adimlar.tarif_id")
    .groupBy("tarifler.tarif_id");
  // .orderBy("schemes.scheme_id", "asc");
}

async function findTarifAdimlariById(tarifId) {
  const temeltablo = await db
    .leftJoin("adimlar", "tarifler.tarif_id ", "adimlar.tarif_id")
    .select("tarifler.tarif_id", "tarifler.tarif_adi")
    .select("adimlar.*")
    .from("tarifler")
    .where("tarifler.tarif_id", tarifId)
    .orderBy("adimlar.adim_sirasi", "asc");
  //!olmayan bir id girdiğinde:
  if (temeltablo.length === 0) {
    return null;
  }

  const response = {
    tarif_id: parseInt(tarifId),
    tarif_adi: temeltablo[0].tarif_adi,
    adimlar: [],
  };

  if (!temeltablo[0].adim_id) {
    //!adım_id boş ise steps boş dön
    return response;
  } else {
    temeltablo.forEach((obj) => {
      response.adimlar.push({
        adim_id: obj.adim_id,
        adim_sirasi: obj.adim_sirasi,
        adim_talimati: obj.adim_talimati,
      });
    });
    return response;
  }
}

/**
      SELECT
       adimlar.tarif_id,      
       adimlar.adim_id,
       adimlar.adim_sirasi,
       adimlar.adim_talimati,
       icindekiler.icindekiler_id,
       icindekiler.icindekiler_adi,
       icindekiler.miktar      
      FROM  adim_icindekiler 
      RIGHT JOIN adimlar 
       ON adimlar.adim_id = adim_icindekiler.adim_id
      LEFT JOIN icindekiler
      ON icindekiler.icindekiler_id = adim_icindekiler.icindekiler_id
      WHERE adimlar.tarif_id=2 AND adimlar.adim_sirasi=2
      ORDER BY   adimlar.adim_id
 **/

async function findTafifIcindekileriById(tarifId, adimSirasi) {
  const temeltablo = await db

    .select(
      "adimlar.tarif_id",
      "adimlar.adim_sirasi",
      "adimlar.adim_talimati",
      "icindekiler.icindekiler_id",
      "icindekiler.icindekiler_adi",
      "icindekiler.miktar"
    )

    .from("adim_icindekiler")
    .rightJoin("adimlar", "adimlar.adim_id", "adim_icindekiler.adim_id")
    .leftJoin(
      "icindekiler",
      "icindekiler.icindekiler_id",
      "adim_icindekiler.icindekiler_id"
    )
    .where({ "adimlar.tarif_id": tarifId, "adimlar.adim_sirasi": adimSirasi })
    .orderBy("adim_icindekiler.icindekiler_id", "asc");
  //!olmayan bir id girdiğinde:
  if (temeltablo.length === 0) {
    return null;
  }

  const response = {
    tarif_id: parseInt(tarifId),
    adim_sirasi: parseInt(adimSirasi),
    icindekiler: [],
  };

  if (!temeltablo[0].icindekiler_id) {
    //!adım_id boş ise steps boş dön
    return response;
  } else {
    temeltablo.forEach((obj) => {
      response.icindekiler.push({
        id: obj.icindekiler_id,
        adi: obj.icindekiler_adi,
        miktar: obj.miktar,
      });
    });
    return response;
  }
}

const icindekileriGetir = async function (adimId) {
  const icindekiler = await db("adim_icindekiler")
    .leftJoin(
      "icindekiler",
      "adim_icindekiler.icindekiler_id",
      "icindekiler.icindekiler_id"
    )
    .select("icindekiler.*")
    .where("adim_id", adimId);
  return icindekiler;
};
const idyeGoreTarifGetir = async function (tarifId) {
  const temeltablo = await db("tarifler")
    .leftJoin("adimlar", "tarifler.tarif_id", "adimlar.tarif_id")
    .leftJoin("adim_icindekiler", "adim_icindekiler.adim_id", "adimlar.adim_id")
    .leftJoin(
      "icindekiler",
      "icindekiler.icindekiler_id",
      "adim_icindekiler.icindekiler_id"
    )

    .select(
      "tarifler.*",
      "adimlar.adim_id",
      "adimlar.adim_sirasi",
      "adimlar.adim_talimati",
      "icindekiler.icindekiler_id",
      "icindekiler.icindekiler_adi",
      "icindekiler.miktar"
    )
    .where("tarifler.tarif_id", tarifId);

  if (tarifler.length === 0) {
    return [];
  }

  const tarifModel = {
    tarif_id: tarifId,
    tarif_adi: temeltablo[0].tarif_adi,
    adimlar: [],
  };

  for (let i = 0; i < tarifler.length; i++) {
    const tarif = tarifler[i];

    const adimModel = {
      adim_id: tarif.adim_id,
      adim_sirasi: tarif.adim_sirasi,
      adim_talimatlari: tarif.adim_talimati,
      icindekiler: [],
    };
    const icindekiler = await icindekileriGetir(tarif.adim_id);
    adimModel.icindekiler = icindekiler;
    tarifModel.adimlar.push(adimModel);
  }
  return tarifModel;
};

module.exports = {
  find,
  findTarifAdimlariById,
  findTafifIcindekileriById,
  idyeGoreTarifGetir,
};
