"use client";
import { Fragment, useRef } from "react";
import { EDM_ITEMS } from "@/lib/edm/items";
import type { Color, Sistema } from "@/lib/edm/items";
import { colorDesdeBandas, puntuarItem, resumenPorSistema } from "@/lib/edm/scoring";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Draft } from "./edm-wizard";
import { ReporteOficialEdm } from "@/components/edm/reporte-oficial-edm";
import { nombreDecision } from "@/components/edm/evidencia-video-ia";
import { ResumenReyIA } from "@/components/edm/evidencia-rey-ia";
import { FluidezCualitativa } from "@/components/edm/fluidez-cualitativa";
import type { FluencyQualitative } from "@/lib/edm/ai-client";
import { puntuarMmse } from "@/lib/mmse/scoring";
import { resumirReserva } from "@/lib/reserva-cognitiva/items";
import { puntuarInformante, HISTORIA_PREGUNTAS, CUIDADOR_PREGUNTAS } from "@/lib/informante/scoring";
import { puntuarGds } from "@/lib/gds15/scoring";
import { puntuarLawton } from "@/lib/lawton/scoring";
const labels: Record<Sistema, string> = {
  episodica: "Episódica",
  operativa: "Operativa",
  semantica: "Semántica",
  procesual: "Procesual",
};
const cells: Record<Color, string> = { rojo: "rojo", amarillo: "amarillo", verde: "verde" };
export function TestResults({ draft, onBack }: { draft: Draft; onBack: () => void }) {
  const officialRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const movements = [12, 19, 20, 21, 22].map((n) => draft.answers[n]?.movimientos?.[0] ?? null);
  const rows = EDM_ITEMS.flatMap((item) => {
    const ans: import("@/lib/edm/scoring").Respuesta =
      item.orden === 26 ? { movimientos: movements } : (draft.answers[item.orden] ?? {});
    const result = puntuarItem(item, ans);
    const main = {
      casilla: item.casillas[0],
      sistema: item.sistema,
      dimension: item.dimension,
      habilidad: item.habilidad,
      nombre: item.nombre,
      puntaje: result.puntaje,
      detalle: result.detalle,
      max: item.max,
      color: result.color,
      provisional: item.provisional,
      ia: item.ia,
      fuente: ans.fuente,
      tamizajeDecision: ans.tamizajeDecision,
    };
    if (item.orden === 14) {
      const lectura = ans.lectura?.filter(Boolean).length ?? 0;
      return [
        main,
        {
          ...main,
          casilla: 20,
          nombre: "Lectura simple",
          provisional: item.provisionalSecundaria,
          puntaje: lectura,
          color: colorDesdeBandas(lectura, item.bandasSecundarias ?? item.bandas),
          ia: undefined,
        },
      ];
    }
    return [main];
  });
  const summary = resumenPorSistema(rows);
  const mmse = draft.modules.mmse ? puntuarMmse(draft.mmse) : null;
  const reserva = draft.modules.reserva ? resumirReserva(draft.reserva) : null;
  const fluencyAnswer = Object.values(draft.answers).map((answer) => answer as typeof answer & {
    cualitativaAnimales?: FluencyQualitative; cualitativaF?: FluencyQualitative;
  }).find((answer) => answer.cualitativaAnimales || answer.cualitativaF);
  const pdf = async () => {
    if (!officialRef.current || !detailRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;
    const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "landscape" });
    const svg = officialRef.current.querySelector("svg");
    if (!svg) return;
    const markup = new XMLSerializer().serializeToString(svg);
    const source = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
    const sheet = new Image();
    sheet.src = source;
    await sheet.decode();
    const official = document.createElement("canvas");
    official.width = 1122 * 2;
    official.height = 794 * 2;
    const context = official.getContext("2d");
    if (!context) throw new Error("No se pudo preparar el PDF");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, official.width, official.height);
    context.drawImage(sheet, 0, 0, official.width, official.height);
    const landscapeWidth = pdf.internal.pageSize.getWidth();
    const landscapeHeight = pdf.internal.pageSize.getHeight();
    const factor = Math.min(landscapeWidth / official.width, landscapeHeight / official.height);
    // JPEG, no PNG: el PDF queda en unos cientos de KB en vez de decenas de MB
    pdf.addImage(official.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0,
      official.width * factor, official.height * factor);
    pdf.addPage("a4", "portrait");
    // Puntos de corte seguros: el borde superior de cada fila, título, párrafo o sección (nunca a mitad de una línea)
    const raiz = detailRef.current.getBoundingClientRect().top;
    // ...pero nunca justo debajo de un título o del subtítulo de un grupo (quedaría solo al pie de la página)
    const titulos = [...detailRef.current.querySelectorAll("h1, h2, h3, h4, [data-slot='card-header'], tr:has(> td[colspan]), thead")]
      .map((el) => el.getBoundingClientRect().bottom - raiz);
    const bordes = [...detailRef.current.querySelectorAll("tr, li, p, h1, h2, h3, h4, section, table, [class*='row'], [class*='section']")]
      .filter((el) => !el.closest("[data-pdf-keep-together]") || el.hasAttribute("data-pdf-keep-together"))
      .map((el) => el.getBoundingClientRect().top - raiz)
      .filter((t) => t > 0 && !titulos.some((b) => t >= b - 2 && t - b < 48));
    const canvas = await html2canvas(detailRef.current, {
      scale: 2, backgroundColor: "#ffffff", useCORS: true,
    });
    const escala = canvas.height / detailRef.current.scrollHeight;
    const cortes = [...new Set(bordes.map((t) => Math.round(t * escala)))].sort((a, b) => a - b);
    const indivisibles = [...detailRef.current.querySelectorAll("[data-pdf-keep-together]")]
      .map((el) => {
        const box = el.getBoundingClientRect();
        return { start: Math.round((box.top - raiz) * escala),
          end: Math.round((box.bottom - raiz) * escala) };
      });
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    // Cada página lleva solo su trozo del perfil (antes se repetía la imagen completa en cada página)
    const sliceHeight = Math.floor((canvas.width * height) / width);
    for (let sy = 0, n = 0; sy < canvas.height; n++) {
      if (n) pdf.addPage("a4", "portrait");
      const limite = sy + sliceHeight;
      let corte = limite >= canvas.height ? canvas.height
        : [...cortes].reverse().find((c) => c <= limite && c > sy + sliceHeight * 0.6) ?? limite;
      const crossing = indivisibles.find(({ start, end }) =>
        start > sy && start < corte && end > corte && end - start <= sliceHeight);
      if (crossing) corte = crossing.start;
      const slice = document.createElement("canvas");
      slice.width = canvas.width;
      slice.height = corte - sy;
      const g = slice.getContext("2d");
      if (!g) throw new Error("No se pudo preparar el PDF");
      g.fillStyle = "#fff";
      g.fillRect(0, 0, slice.width, slice.height);
      g.drawImage(canvas, 0, sy, canvas.width, slice.height, 0, 0, canvas.width, slice.height);
      pdf.addImage(slice.toDataURL("image/jpeg", 0.88), "JPEG", 0, 0, width, (slice.height * width) / canvas.width);
      sy = corte;
    }
    pdf.save(`EDM-perfil-${draft.patient.fecha}.pdf`);
  };
  return (
    <div className="edm-report space-y-5">
      <div className="edm-print-hide flex flex-wrap gap-2 justify-end">
        <Button variant="outline" onClick={onBack}>
          Volver a la evaluación
        </Button>
        <Button onClick={pdf}>Descargar PDF</Button>
        <Button variant="outline" onClick={() => window.print()}>
          Imprimir
        </Button>
      </div>
      <h3 className="edm-print-hide text-lg font-semibold">Hoja oficial</h3>
      <div className="edm-official-section" ref={officialRef}>
        <ReporteOficialEdm patient={draft.patient} casillas={Object.fromEntries(rows.map((row) => [
          row.casilla, { color: row.color, provisional: Boolean(row.provisional), nombre: row.nombre },
        ]))} />
      </div>
      <div ref={detailRef} className="edm-detail-section space-y-5 bg-white p-4">
        <ResumenReyIA copia={draft.reySuggestions?.copia} memoria={draft.reySuggestions?.memoria} />
        <Card>
          <CardHeader><CardTitle>Consentimiento e instrumentos complementarios</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><strong>Consentimiento:</strong> {draft.consent.acepta ? "sí" : "no"},
              {" "}{draft.consent.fecha} · {draft.consent.nombre} ({draft.consent.relacion})</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {([
                ["Nombre o código", draft.patient.paciente], ["Edad", draft.patient.edad],
                ["Escolaridad", draft.patient.escolaridad],
                ["Años de estudio", draft.patient.aniosEstudio],
                ["Fecha de nacimiento", draft.patient.fechaNacimiento],
                ["Lugar de nacimiento", draft.patient.lugarNacimiento],
                ["Mano con que escribe", draft.patient.manoEscritura],
                ["Profesión", draft.patient.profesion], ["Ocupación", draft.patient.ocupacion],
                ["Estado civil", draft.patient.estadoCivil], ["N.º de hijos", draft.patient.hijos],
                ["Idioma materno", draft.patient.idiomaMaterno],
                ["Otros idiomas", draft.patient.otrosIdiomas],
                ["Con quién vive", draft.patient.convivencia],
                ["Antecedentes", draft.patient.antecedentes],
                ["Medicación actual", draft.patient.medicacion],
                ["Dificultades de memoria", draft.patient.dificultadesMemoria],
                ["Evaluador", draft.patient.evaluador],
                ["Lugar y fecha de evaluación", [draft.patient.lugar, draft.patient.fecha]
                  .filter(Boolean).join(", ")],
              ] as const).map(([label, value]) => <p key={label}>
                <strong>{label}:</strong> {value || "—"}</p>)}
            </div>
            {mmse && <p><strong>MMSE modificado:</strong> {mmse.total}/19 · {mmse.interpretacion}</p>}
            {reserva && <p><strong>Reserva cognitiva:</strong> total de códigos {reserva.total};
              {" "}actividades “Sí” {reserva.si}. Interpretación pendiente de validación clínica.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Escalas complementarias (no forman parte del EDM 2023)</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold">Informante · AD8</h3>
              {draft.escalas?.informante === "aplicada" && draft.informante &&
                puntuarInformante(draft.informante).completo ? <>
                <p><strong>{puntuarInformante(draft.informante).total}/8.</strong> 2 o más sugiere cambio cognitivo (Galvin 2005; versión española: Carnero-Pardo 2013). No establece un diagnóstico.</p>
                {[...HISTORIA_PREGUNTAS, ...CUIDADOR_PREGUNTAS].filter(([key]) =>
                  draft.informante.descriptivas[key]?.trim()).map(([key, question]) =>
                  <p key={key} className="edm-report-descriptive"><strong>{question}</strong> {draft.informante.descriptivas[key]}</p>)}
                <p className="edm-license">AD8 © 2005 Knight Alzheimer’s Disease Research Center, Washington University. Verificar permiso de uso antes de aplicación clínica.</p>
              </> : <p>No aplicada</p>}
            </section>
            <section>
              <h3 className="font-semibold">GDS-15 · estado de ánimo</h3>
              {draft.escalas?.gds === "aplicada" && draft.gds && puntuarGds(draft.gds).completo ?
                <p><strong>{puntuarGds(draft.gds).total}/15.</strong> 5 o más sugiere síntomas depresivos; confirmar con entrevista clínica (Sheikh y Yesavage 1986).</p> : <p>No aplicada</p>}
            </section>
            <section>
              <h3 className="font-semibold">Lawton y Brody · actividades instrumentales</h3>
              {draft.escalas?.lawton === "aplicada" && draft.lawton && puntuarLawton(draft.lawton).completo ?
                <p><strong>{puntuarLawton(draft.lawton).total}/8.</strong> Más puntos indican mayor autonomía en estas actividades (Lawton y Brody 1969). Interpretar con la entrevista clínica.</p> : <p>No aplicada</p>}
            </section>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-burgundy-dark">Perfil de resultados · EDM 2023</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Paciente:</strong> {draft.patient.paciente}
            </p>
            <p>
              <strong>Edad:</strong> {draft.patient.edad}
            </p>
            <p>
              <strong>Evaluador:</strong> {draft.patient.evaluador}
            </p>
            <p>
              <strong>Lugar y fecha:</strong> {draft.patient.lugar}, {draft.patient.fecha}
            </p>
            <p>
              <strong>Sexo:</strong> {draft.patient.sexo || "—"}
            </p>
            <p>
              <strong>Escolaridad:</strong> {draft.patient.escolaridad || "—"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resumen por sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(["episodica", "operativa", "semantica", "procesual"] as const).map((s) => {
              const v = summary[s],
                total = v.rojo + v.amarillo + v.verde;
              return (
                <div key={s}>
                  <p className="font-medium">
                    {labels[s]} · {v.rojo} déficit, {v.amarillo} afectación, {v.verde} conservación
                  </p>
                  <div
                    className="flex h-5 rounded overflow-hidden"
                    aria-label={`${labels[s]}: ${v.rojo} déficit, ${v.amarillo} afectación, ` +
                      `${v.verde} conservación`}
                  >
                    {(["rojo", "amarillo", "verde"] as const).map((c) => (
                      <div
                        key={c}
                        className={`edm-summary-segment ${cells[c]}`}
                        style={{ width: `${total ? (v[c] / total) * 100 : 0}%` }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        {fluencyAnswer && <section data-pdf-keep-together className="edm-fluency-report">
          <h3>Análisis cualitativo de la fluidez (complementario, en validación)</h3>
          {fluencyAnswer.cualitativaAnimales && <FluidezCualitativa compact category="animales"
            qualitative={fluencyAnswer.cualitativaAnimales} />}
          {fluencyAnswer.cualitativaF && <FluidezCualitativa compact category="f"
            qualitative={fluencyAnswer.cualitativaF} />}
        </section>}
        <Card>
          <CardHeader>
            <CardTitle>Perfil EDM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-beige-light text-left">
                    <th className="p-2">Casilla</th>
                    <th className="p-2">Habilidad</th>
                    <th className="p-2">Puntaje</th>
                    <th className="p-2">Déficit</th>
                    <th className="p-2">Afectación</th>
                    <th className="p-2">Conservación</th>
                  </tr>
                </thead>
                <tbody>
                  {(["episodica", "operativa", "semantica", "procesual"] as const).map((sistema) => (
                    <Fragment key={sistema}>
                      {
                        <tr key={`${sistema}-title`} className="bg-beige-light font-bold">
                          <td colSpan={6} className="p-2">
                            Memoria {labels[sistema]}
                          </td>
                        </tr>
                      }
                      {rows
                        .filter((r) => r.sistema === sistema)
                        .sort((a, b) => a.casilla - b.casilla)
                        .map((row) => (
                          <tr key={row.casilla} className="border-b">
                            <td className="p-2">{row.casilla}</td>
                            <td className="p-2">
                              {row.dimension} · {row.habilidad}
                              <small className="block text-muted-foreground">
                                {row.nombre} · {row.detalle}
                                {row.provisional ? " *" : ""}
                                {row.ia && row.fuente?.startsWith("ia_") ? (
                                  <span
                                    title={`Sugerencia de IA ${
                                      row.fuente === "ia_aceptada" ? "aceptada" : "editada"
                                    }${
                                      row.casilla === 35 && row.tamizajeDecision
                                        ? ` · Tamizaje: ${nombreDecision(row.tamizajeDecision)}` : ""
                                    }`}
                                    aria-label={`Sugerencia de IA ${
                                      row.fuente === "ia_aceptada" ? "aceptada" : "editada"
                                    }${
                                      row.casilla === 35 && row.tamizajeDecision
                                        ? ` · Tamizaje: ${nombreDecision(row.tamizajeDecision)}` : ""
                                    }`}
                                  >
                                    {" "}
                                    ◈
                                  </span>
                                ) : null}
                              </small>
                            </td>
                            <td className="p-2">
                              {row.puntaje === null ? "—" : row.puntaje}/{row.max}
                            </td>
                            {(["rojo", "amarillo", "verde"] as const).map((color) => (
                              <td key={color} className="p-2 text-center">
                                {row.color === color ? (
                                  <span
                                    className={`edm-report-dot ${cells[color]}`}
                                    title={
                                      color === "rojo"
                                        ? "Déficit"
                                        : color === "amarillo"
                                          ? "Afectación"
                                          : "Conservación"
                                    }
                                    aria-label={
                                      color === "rojo"
                                        ? "Déficit"
                                        : color === "amarillo"
                                          ? "Afectación"
                                          : "Conservación"
                                    }
                                  />
                                ) : null}
                              </td>
                            ))}
                          </tr>
                        ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3">* Banda provisional, pendiente de validación clínica.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notas finales del evaluador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(["cognitivo", "emocional", "conductual"] as const).map((k) => (
              <p key={k}>
                <strong>Nivel {k}:</strong> {draft.finalNotes[k] || "—"}
              </p>
            ))}
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground">
          Herramienta de apoyo; la interpretación corresponde a un profesional.
        </p>
      </div>
    </div>
  );
}
