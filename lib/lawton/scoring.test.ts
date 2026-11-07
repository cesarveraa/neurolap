import assert from "node:assert/strict";
import { test } from "node:test";
import { emptyLawton, lawtonFaltantes, puntuarLawton } from "./scoring.ts";

test("Lawton usa el valor de cada opción y suma ocho áreas", () => {
  assert.deepEqual(puntuarLawton(Array(8).fill(0)), { total: 8, completo: true });
  assert.deepEqual(puntuarLawton([3, 3, 3, 4, 2, 4, 2, 2]), { total: 0, completo: true });
  assert.equal(puntuarLawton([2, 1, 1, 1, 1, 2, 1, 1]).total, 5);
});
test("Lawton señala faltantes y opciones inválidas", () => {
  assert.equal(lawtonFaltantes(emptyLawton).length, 8);
  assert.deepEqual(lawtonFaltantes([0, 0, 0, 0, 0, 0, 0, 99]), ["Dinero"]);
  assert.equal(puntuarLawton([0, 0, 0, 0, 0, 0, 0, null]).completo, false);
});
