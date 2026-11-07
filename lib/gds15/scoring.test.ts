import assert from "node:assert/strict";
import { test } from "node:test";
import { emptyGds, gdsFaltantes, puntuarGds } from "./scoring.ts";

test("GDS puntúa ambas direcciones depresivas", () => {
  const baseline = [true, false, false, false, true, false, true, false, false, false, true, false, true, false, false];
  assert.deepEqual(puntuarGds(baseline), { total: 0, completo: true });
  assert.equal(puntuarGds(baseline.map((v) => !v)).total, 15);
  assert.equal(puntuarGds(baseline.map((v, i) => i < 5 ? !v : v)).total, 5);
});
test("GDS no completa ni puntúa una respuesta faltante", () => {
  assert.equal(gdsFaltantes(emptyGds).length, 15);
  assert.deepEqual(puntuarGds([null, ...Array(14).fill(false)]).completo, false);
});
