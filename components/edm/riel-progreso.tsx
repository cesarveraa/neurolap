"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { List, X } from "lucide-react";
import { EDM_ITEMS } from "@/lib/edm/items";
import type { Color } from "@/lib/edm/items";

export const nombresColor: Record<Color, string> = {
  verde: "Conservación",
  amarillo: "Afectación",
  rojo: "Déficit",
};

type Props = { actual: number; colores: (Color | null)[]; irA: (n: number) => void };
export function RielProgreso({ actual, colores, irA }: Props) {
  return (
    <>
      <nav className="edm-rail" aria-label="Progreso de los 27 ítems">
        {EDM_ITEMS.map((item, i) => (
          <button
            key={item.orden}
            type="button"
            className={`edm-segment ${colores[i] ?? "pendiente"} ${actual === item.orden ? "actual" : ""} ${i === 13 ? "sesion-dos" : ""}`}
            title={`${item.orden}. ${item.nombre} · ${colores[i] ? nombresColor[colores[i]!] : "Pendiente"}`}
            aria-label={`Ítem ${item.orden}: ${item.nombre}, ${colores[i] ? nombresColor[colores[i]!] : "pendiente"}`}
            aria-current={actual === item.orden ? "step" : undefined}
            onClick={() => irA(item.orden)}
          />
        ))}
      </nav>
      <div className="edm-rail-caption">
        <span>Sesión 1 · ítems 1–13</span>
        <span>Sesión 2 · ítems 14–27</span>
      </div>
    </>
  );
}

export function ListaItems({ actual, colores, irA }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="edm-items-trigger">
        <List size={18} /> Ítems
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="edm-sheet-overlay" />
        <Dialog.Content className="edm-sheet edm-tool" aria-describedby={undefined}>
          <div className="edm-sheet-head">
            <Dialog.Title>Ítems de la evaluación</Dialog.Title>
            <Dialog.Close aria-label="Cerrar lista">
              <X size={22} />
            </Dialog.Close>
          </div>
          <div className="edm-sheet-scroll">
            {[0, 13].map((start) => (
              <section key={start}>
                <h3>
                  Sesión {start ? "2" : "1"} · ítems {start ? "14–27" : "1–13"}
                </h3>
                {EDM_ITEMS.slice(start, start ? 27 : 13).map((it) => {
                  const color = colores[it.orden - 1];
                  return (
                    <Dialog.Close key={it.orden} asChild>
                      <button
                        type="button"
                        className={`edm-sheet-item ${actual === it.orden ? "actual" : ""}`}
                        onClick={() => irA(it.orden)}
                      >
                        <span className="edm-sheet-num">{it.orden}</span>
                        <span className="edm-sheet-name">
                          <strong>{it.nombre}</strong>
                          <small>
                            {it.sistema} · {it.habilidad}
                          </small>
                        </span>
                        <span className={`edm-chip ${color ?? "pendiente"}`}>
                          {color ? nombresColor[color] : "Pendiente"}
                        </span>
                      </button>
                    </Dialog.Close>
                  );
                })}
              </section>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
