exports.up = function (knex) {
  return knex.schema
    .createTable("tarifler", (tbl) => {
      tbl.increments("tarif_id");
      tbl.text("tarif_adi", 128).unique().notNullable();
      //  tbl.timestamps("kayit_tarihi").defaultTo(knex.fn.now());
    })

    .createTable("adimlar", (tbl) => {
      tbl.increments("adim_id");
      tbl.integer("adim_sirasi").unsigned().notNullable();
      tbl.text("adim_talimati").notNullable();
      tbl
        .integer("tarif_id")
        .unsigned()
        .notNullable()
        .references("tarif_id")
        .inTable("tarifler")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })

    .createTable("icindekiler", (tbl) => {
      tbl.increments("icindekiler_id");
      tbl.text("icindekiler_adi").notNullable();
      tbl.float("miktar").unsigned().notNullable();
    })

    .createTable("adim_icindekiler", (tbl) => {
      tbl.increments("adim_icindekiler_id");
      tbl
        .integer("adim_id")
        .references("adim_id")
        .inTable("adimlar")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");

      tbl
        .integer("icindekiler_id")
        .references("icindekiler_id")
        .inTable("icindekiler")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");

      // tbl.primary(["adim_id", "icindekiler_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("adim_icindekiler")
    .dropTableIfExists("icindekiler")
    .dropTableIfExists("adim")
    .dropTableIfExists("tarifler");
};
