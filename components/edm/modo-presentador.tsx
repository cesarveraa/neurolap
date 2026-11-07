"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { MatrixSelect } from "@/components/test/components/matrix-select";

type Props = {
  src: string;
  seconds?: number;
  lamina?: string;
  onClose: () => void;
  selectedIds?: string[];
  onSelect?: (ids: string[]) => void;
};
export function ModoPresentador({ src, seconds, lamina, onClose, selectedIds, onSelect }: Props) {
  const [remaining, setRemaining] = useState(seconds ?? 0);
  const [phase, setPhase] = useState<"estimulo" | "lamina" | "fin">("estimulo");
  useEffect(() => {
    if (!seconds || phase !== "estimulo") return;
    const timer = window.setInterval(() => setRemaining((n) => Math.max(0, n - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [seconds, phase]);
  useEffect(() => {
    if (seconds && remaining === 0 && phase === "estimulo") setPhase(lamina ? "lamina" : "fin");
  }, [remaining, seconds, phase, lamina]);
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="edm-presenter-overlay" />
        <Dialog.Content className="edm-presenter edm-tool" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">Estímulo para el paciente</Dialog.Title>
          <button className="edm-presenter-close" onClick={onClose} aria-label="Cerrar presentación">
            <X />
          </button>
          {seconds && phase === "estimulo" && (
            <div className="edm-presenter-timer">
              <div className="edm-presenter-track">
                <div style={{ width: `${(remaining / seconds) * 100}%` }} />
              </div>
              <strong aria-live="off">{remaining} s</strong>
            </div>
          )}
          {phase === "fin" ? (
            <div className="edm-presenter-end">
              <h2>Tiempo cumplido: retire la tarjeta</h2>
              <button className="edm-primary" onClick={onClose}>
                Volver al registro
              </button>
            </div>
          ) : phase === "lamina" && lamina ? (
            <div className="edm-presenter-matrix">
              <MatrixSelect
                imageSrc={lamina}
                initialSelection={selectedIds}
                onSelect={(ids) => onSelect?.(ids)}
              />
            </div>
          ) : (
            <img
              className={/n[34]-(palabras|nombres)/.test(src) ? "edm-presenter-words" : undefined}
              src={src}
              alt="Estímulo del protocolo"
              onClick={onClose}
            />
          )}
          {phase === "lamina" && (
            <button className="edm-primary" onClick={onClose}>
              Volver al registro
            </button>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
