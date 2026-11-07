import assert from "node:assert/strict";
import { test } from "node:test";
import { emptyInformante, informanteFaltantes, puntuarInformante } from "./scoring.ts";

test("AD8 cuenta solo los cambios observados", () => {
  const answer = { ad8: ["si", "no", "no_sabe", "si", "no", "no", "no", "no"] as typeof emptyInformante.ad8,
    descriptivas: { tiempo: "dos años" } };
  assert.deepEqual(puntuarInformante(answer), { total: 2, completo: true });
  assert.equal(puntuarInformante({ ...answer, descriptivas: {} }).total, 2);
});
test("AD8 indica faltantes y admite extremos", () => {
  assert.equal(informanteFaltantes(emptyInformante).length, 8);
  assert.equal(puntuarInformante({ ...emptyInformante, ad8: Array(8).fill("no") }).total, 0);
  assert.equal(puntuarInformante({ ...emptyInformante, ad8: Array(8).fill("si") }).total, 8);
});
