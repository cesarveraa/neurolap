import test from "node:test";
import assert from "node:assert/strict";
import { EDM_ITEMS } from "./items.ts";
import { colorDesdeBandas, combinarFluidez, puntuarItem, puntuarProduccionMotora } from "./scoring.ts";
test("bandas de progresión e imitación en los bordes", () => {
  for (const [orden, casos] of [
    [
      4,
      [
        [0, "rojo"],
        [3, "rojo"],
        [4, "amarillo"],
        [5, "amarillo"],
        [6, "verde"],
        [7, "verde"],
      ],
    ],
    [
      27,
      [
        [0, "rojo"],
        [2, "rojo"],
        [3, "amarillo"],
        [4, "amarillo"],
        [5, "verde"],
        [6, "verde"],
      ],
    ],
  ] as const)
    for (const [n, c] of casos) assert.equal(colorDesdeBandas(n, EDM_ITEMS[orden - 1].bandas), c);
});
test("cero fuera de banda es rojo", () =>
  assert.equal(colorDesdeBandas(0, { V: [3, 3], A: [2, 2], R: [1, 1] }), "rojo"));
test("reconocimiento resta intrusiones", () =>
  assert.equal(
    puntuarItem(EDM_ITEMS[7], {
      si: [true, true, true, true, true, false, false, true, false, true, false, false],
    }).puntaje,
    3,
  ));
test("detección auditiva usa A completo o B", () => {
  assert.equal(puntuarItem(EDM_ITEMS[11], { bloqueA: [true, true] }).puntaje, 3);
  assert.equal(
    puntuarItem(EDM_ITEMS[11], { bloqueA: [false, true], bloqueB: [true, false, true] }).puntaje,
    2,
  );
});
test("seguimiento verbal corta en tercera falla", () =>
  assert.equal(
    puntuarItem(EDM_ITEMS[9], { series: [true, true, true, true, true, true, false, false, false, true] })
      .puntaje,
    6,
  ));
test("combinación de fluidez", () => {
  assert.equal(combinarFluidez("amarillo", "verde"), "verde");
  assert.equal(combinarFluidez("rojo", "verde"), "amarillo");
});
test("producción motora", () => {
  assert.equal(puntuarProduccionMotora([true, true, true, true, true]), 10);
  assert.equal(puntuarProduccionMotora([true, true, true, false, false]), 8);
  assert.equal(puntuarProduccionMotora([true, null, true, false, false]), null);
});
test("cálculo por modos A B C", () => {
  const item = EDM_ITEMS[23];
  for (const [modos, n] of [
    [{ A: [true, true, false] }, 3],
    [{ A: [false, false, true], B: [true, true, false] }, 2],
    [{ A: [false, false, true], B: [false, true, false], C: [true, false, true] }, 1],
    [{ A: [false, false, true], B: [false, true, false], C: [false, true, false] }, 0],
  ] as [{ A?: boolean[]; B?: boolean[]; C?: boolean[] }, number][])
    assert.equal(puntuarItem(item, { modos }).puntaje, n);
});
test("detección visual cuenta objetivos y falsas alarmas; permite corrección manual", () => {
  const item = EDM_ITEMS[5];
  const selected = { matrixIds: ["r1c1", "r1c2", "r3c3"] };
  assert.deepEqual(puntuarItem(item, selected), {
    puntaje: 2,
    color: "rojo",
    detalle: "2 aciertos, 1 falsas alarmas",
  });
  assert.equal(puntuarItem(item, { ...selected, aciertos: 1 }).puntaje, 1);
});
