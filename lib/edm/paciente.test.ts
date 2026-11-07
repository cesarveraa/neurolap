import assert from "node:assert/strict";
import { test } from "node:test";
import { calcularEdad } from "./paciente.ts";

test("edad usa los años cumplidos a la fecha de evaluación", () => {
  assert.equal(calcularEdad("1990-11-08", "2026-11-07"), "35");
  assert.equal(calcularEdad("1990-11-08", "2026-11-08"), "36");
});

test("nacimiento el 29 de febrero conserva la fecha real de cumpleaños", () => {
  assert.equal(calcularEdad("2000-02-29", "2025-02-28"), "24");
  assert.equal(calcularEdad("2000-02-29", "2025-03-01"), "25");
  assert.equal(calcularEdad("2000-02-29", "2024-02-29"), "24");
});

test("fechas inválidas o futuras no producen edad", () => {
  assert.equal(calcularEdad("2025-02-29", "2026-11-07"), "");
  assert.equal(calcularEdad("2027-01-01", "2026-11-07"), "");
});
