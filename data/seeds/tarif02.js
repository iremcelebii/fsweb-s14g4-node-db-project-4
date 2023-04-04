exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tarifler").insert([{ tarif_adi: "Pizza" }]);
  await knex("adimlar").insert([
    {
      adim_sirasi: 1,
      adim_talimati: "Fırını 180 dereceye ayarlayın",
      tarif_id: 2,
    },
    {
      adim_sirasi: 2,
      adim_talimati: "Pizzayı buzdolabından çıkartın",
      tarif_id: 2,
    },
    {
      adim_sirasi: 3,
      adim_talimati: "Fırına atın heheh",
      tarif_id: 2,
    },
  ]);
  await knex("icindekiler").insert([
    { icindekiler_adi: "fırın", miktar: 1 },
    { icindekiler_adi: "buzdolabı", miktar: 1 },
    { icindekiler_adi: "pizza", miktar: 1 },
  ]);
  await knex("adim_icindekiler").insert([
    { icindekiler_id: 2, adim_id: 3 },
    { icindekiler_id: 3, adim_id: 4 },
    { icindekiler_id: 4, adim_id: 4 },
  ]);
};
