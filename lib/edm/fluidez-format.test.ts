import assert from "node:assert/strict";
import { test } from "node:test";
import taxonomy from "../../../../NEUROLAP_Vision_Artificial/api/data/taxonomia_animales.json" with { type: "json" };
import { categoryLabels, formatCluster, formatDecimal, visibleClusters } from "./fluidez-format.ts";

test("todas las categorías de la API tienen etiqueta corta", () => {
  const keys = Object.values(taxonomy).flatMap((group) =>
    typeof group === "object" && group !== null ? Object.keys(group) : []);
  assert.deepEqual(keys.filter((key) => !categoryLabels[key]), []);
  assert.equal(categoryLabels.domestico, "domésticos");
  assert.equal(categoryLabels.agua_dulce, "río y lago");
});

test("formato de cifras y límite de chips", () => {
  assert.equal(formatDecimal(1.25), "1,3");
  const cluster = { words: ["perro", "gato"], categories: ["domestico"], size: 1 };
  assert.equal(formatCluster(cluster, "animales"), "perro · gato — domésticos");
  assert.equal(formatCluster(cluster, "f"), "perro · gato — mismo sonido");
  const result = visibleClusters({ version: "v1", n_words: 14, labelled: 14,
    clusters: Array(8).fill(cluster), switches: 7, mean_cluster_size: 1.25, repetitions: 0 }, "animales");
  assert.equal(result.chips.length, 6);
  assert.equal(result.more, "+2 más");
});
