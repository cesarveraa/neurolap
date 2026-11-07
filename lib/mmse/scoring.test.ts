import assert from "node:assert/strict";
import { test } from "node:test";
import { emptyMmse, puntuarMmse } from "./scoring.ts";

test("bordes clínicos 13 y 14", () => {
  const base = { ...emptyMmse, fecha: [true, true, true, true],
    objetos: [true, true, true], digitos: ["9", "7", "5", "3", "1"],
    papel: [true, false, false] };
  assert.equal(puntuarMmse(base).total, 13);
  assert.equal(puntuarMmse(base).interpretacion, "sugiere déficit cognitivo");
  assert.equal(puntuarMmse({ ...base, papel: [true, true, false] }).interpretacion, "normal");
});

test("los dígitos se puntúan por posición", () => {
  assert.equal(puntuarMmse({ ...emptyMmse, digitos: ["9", "7", "3", "5", "1"] }).total, 3);
});

test("el máximo es 19", () => {
  const answer = { ...emptyMmse, fecha: [true, true, true, true],
    objetos: [true, true, true], repeticiones: 1, digitos: ["9", "7", "5", "3", "1"],
    papel: [true, true, true],
    recuerdo: ["correcto", "correcto", "correcto"] as ("correcto" | "incorrecto" | "nr")[],
    copia: "correcto" as const };
  assert.equal(puntuarMmse(answer).total, 19);
  assert.equal(puntuarMmse(answer).completo, true);
});

test("mmseFaltantes dice qué falta, en orden", async () => {
  const { emptyMmse, mmseFaltantes } = await import("./scoring.ts");
  const casi = { ...emptyMmse, fecha: [true, true, true, true], objetos: [true, true, true],
    digitos: ["9", "7", "5", "3", "1"], papel: [true, true, true],
    recuerdo: ["correcto", "correcto", "correcto"], copia: "correcto" } as typeof emptyMmse;
  assert.deepEqual(mmseFaltantes(casi), ["2. número de repeticiones"]);
  assert.deepEqual(mmseFaltantes({ ...casi, repeticiones: 0 }), []);
});
