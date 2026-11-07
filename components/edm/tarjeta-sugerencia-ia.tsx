"use client";
import { useRef, useState } from "react";
import { EDM_ITEMS } from "@/lib/edm/items";
import type { Respuesta } from "@/lib/edm/scoring";
import { predictDrawing, scoreFluency, predictVideo } from "@/lib/edm/ai-client";
import type { DrawingSuggestion, FluencySuggestion, VideoSuggestion } from "@/lib/edm/ai-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioRecorderPair } from "@/components/test/components/audio-recorder";
import { nombresColor } from "./riel-progreso";
import { VideoRecorder } from "@/components/test/components/video-recorder";
import { EvidenciaVideoIA } from "./evidencia-video-ia";
import { EvidenciaReyIA } from "./evidencia-rey-ia";
import { FluidezCualitativa } from "./fluidez-cualitativa";
import { GuiaCaptura } from "./guia-captura";
export function TarjetaSugerenciaIA({
  itemOrder,
  onAccept,
  onManual,
  drawingSuggestion,
  onDrawingSuggestion,
}: {
  itemOrder: number;
  onAccept: (v: Partial<Respuesta>) => void;
  onManual: (v: Partial<Respuesta>) => void;
  drawingSuggestion?: DrawingSuggestion;
  onDrawingSuggestion?: (suggestion?: DrawingSuggestion) => void;
}) {
  const item = EDM_ITEMS[itemOrder - 1];
  const [suggestion, setSuggestion] = useState<
    | DrawingSuggestion
    | FluencySuggestion
    | VideoSuggestion
    | { animales: FluencySuggestion; f: FluencySuggestion }
    | null
  >(drawingSuggestion ?? null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<{ animales?: File; f?: File; dibujo?: File; video?: File }>({});
  const drawingInput = useRef<HTMLInputElement>(null);
  const [videoKey, setVideoKey] = useState(0);
  const [audioReset, setAudioReset] = useState<{ category: "animals" | "letterF"; id: number }>({
    category: "animals", id: 0,
  });
  const fluency = suggestion && "animales" in suggestion ? suggestion : null;
  const repeatPhoto = suggestion && "probabilities" in suggestion &&
    suggestion.screening.decision === "repetir_foto";
  const repeatVideo = suggestion && "score_0_6" in suggestion &&
    suggestion.screening?.decision === "repetir_grabacion";
  const retryAudio = (category: "animales" | "f") => {
    setSuggestion((old) => old && "animales" in old
      ? { ...old, [category]: undefined } : null);
    setFiles((old) => ({ ...old, [category]: undefined }));
    setAudioReset((old) => ({ category: category === "animales" ? "animals" : "letterF",
      id: old.id + 1 }));
    setError("");
  };
  const run = async (file: File, category?: "animales" | "f") => {
    setLoading(true);
    setError("");
    try {
      if (item.ia?.startsWith("dibujo")) {
        setSuggestion(null);
        onDrawingSuggestion?.(undefined);
        const result = await predictDrawing(file, item.ia === "dibujo_copia" ? "copia" : "memoria");
        setSuggestion(result);
        onDrawingSuggestion?.(result);
      } else if (item.ia === "video") setSuggestion(await predictVideo(file));
      else if (category) {
        const s = await scoreFluency(file, category);
        setSuggestion(
          (old) =>
            ({ ...(old && "animales" in old ? old : {}), [category]: s }) as {
              animales: FluencySuggestion;
              f: FluencySuggestion;
            },
        );
      }
    } catch {
      setError("No se pudo analizar. Puede reintentar o registrar manualmente.");
    } finally {
      setLoading(false);
    }
  };
  const accept = () => {
    if (!suggestion) return;
    if ("score_0_6" in suggestion) {
      const checks = Array.from(
        { length: 6 },
        (_, i) =>
          suggestion.attempts?.find((x) => (x.hand === "left" ? 0 : 3) + x.n - 1 === i)?.correct ??
          i < suggestion.score_0_6,
      );
      onAccept({ checks, tamizajeDecision: suggestion.screening?.decision });
    } else if ("probabilities" in suggestion) onAccept({ colorManual: suggestion.color });
    else if ("animales" in suggestion && "f" in suggestion) {
      const fluencyAnswer = {
        animales: suggestion.animales.count,
        f: suggestion.f.count,
        transcriptAnimales: suggestion.animales.transcript,
        transcriptF: suggestion.f.transcript,
        cualitativaAnimales: suggestion.animales.qualitative,
        cualitativaF: suggestion.f.qualitative,
      };
      onAccept(fluencyAnswer);
    }
  };
  return (
    <Card className="edm-ai-card">
      <CardHeader>
        <CardTitle className="text-lg">Analizar con IA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <GuiaCaptura tipo={item.ia === "fluidez" ? "fluidez" : item.ia === "video" ? "video" : "dibujo"}
          open={!suggestion} />
        {item.ia === "fluidez" ? (
          <>
            <AudioRecorderPair
              maxDurationSec={60}
              resetCategory={audioReset}
              onAnswer={(v) => setFiles({ animales: v.animals?.file, f: v.letterF?.file })}
            />
            <Button
              type="button"
              disabled={!files.animales || !files.f || loading}
              onClick={async () => {
                if (files.animales && !fluency?.animales) await run(files.animales, "animales");
                if (files.f && !fluency?.f) await run(files.f, "f");
              }}
            >
              Analizar grabaciones
            </Button>
          </>
        ) : item.ia === "video" ? (
          <VideoRecorder
            key={videoKey}
            onAnalyzing={() => {
              setSuggestion(null);
              setError("");
              setLoading(true);
            }}
            onRecord={(v) => {
              setLoading(false);
              if (v.file) setFiles((old) => ({ ...old, video: v.file }));
              if (v.server?.details?.score_0_6 !== undefined)
                setSuggestion(v.server.details as VideoSuggestion);
              else setError("No se pudo analizar. Puede reintentar o registrar manualmente.");
            }}
          />
        ) : (
          <label className="block">
            Foto del dibujo
            <input
              ref={drawingInput}
              type="file"
              accept="image/*"
              capture="environment"
              className="block mt-1"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (file) {
                  setFiles((old) => ({ ...old, dibujo: file }));
                  run(file);
                }
              }}
            />
          </label>
        )}
        {!loading && !error && !suggestion && (
          <p className="edm-ai-empty" role="status">
            {item.ia === "video"
              ? "Suba o grabe el video para obtener una sugerencia"
              : item.ia === "fluidez"
                ? "Suba o grabe el audio para obtener una sugerencia"
                : "Suba una foto del dibujo para obtener una sugerencia"}
          </p>
        )}
        {loading && (
          <div className="edm-ai-loading" role="status">
            <div className="edm-skeleton" />
            <div className="edm-skeleton short" />
            <p>
              {item.ia === "video" ? "Analizando video… puede tardar hasta un minuto" :
                `Analizando ${item.ia?.startsWith("dibujo") ? "dibujo" : "grabaciones"}…`}
            </p>
          </div>
        )}
        {error && (
          <div role="alert" className="edm-ai-error">
            <p>{error}</p>
            <Button
              disabled={!files.animales && !files.f && !files.dibujo && !files.video}
              onClick={async () => {
                if (item.ia === "fluidez") {
                  if (files.animales) await run(files.animales, "animales");
                  if (files.f) await run(files.f, "f");
                } else if (files.dibujo) await run(files.dibujo);
                else if (files.video) await run(files.video);
              }}
            >
              Reintentar
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setError("");
                onManual({});
              }}
            >
              Registrar manualmente
            </Button>
          </div>
        )}
        {suggestion && (
          <div className="rounded border p-3 space-y-2">
            {!("score_0_6" in suggestion) &&
              !("probabilities" in suggestion && "screening" in suggestion && suggestion.screening) && (
              <p className={`edm-ai-outcome ${"color" in suggestion ? suggestion.color : ""}`}>
                {"probabilities" in suggestion
                  ? `Color sugerido: ${nombresColor[suggestion.color]}`
                  : "animales" in suggestion
                    ? <>
                        Animales: {suggestion.animales?.count ?? "—"}
                        {suggestion.animales?.quality?.level === "repetir" && " (revisar)"}
                        {" · F: "}{suggestion.f?.count ?? "—"}
                        {suggestion.f?.quality?.level === "repetir" && " (revisar)"}
                      </>
                    : "Resultado parcial"}
              </p>
            )}
            {"requires_review" in suggestion && suggestion.requires_review &&
              !("screening" in suggestion && suggestion.screening) && <p>Revise manualmente.</p>}
            {"score_0_6" in suggestion && <EvidenciaVideoIA suggestion={suggestion} />}
            {"probabilities" in suggestion && <EvidenciaReyIA suggestion={suggestion} />}
            {fluency && (["animales", "f"] as const).map((category) =>
              fluency[category]?.quality?.level === "repetir" && <div key={category}
                className="edm-capture-warning" role="alert">
                <strong>{category === "animales" ? "Animales" : "Palabras con F"}: repetir audio</strong>
                <ul>{fluency[category].quality.reasons.map((reason, index) =>
                  <li key={index}>{reason}</li>)}</ul>
                <p>El conteo puede no ser confiable</p>
                <Button type="button" variant="outline" onClick={() => retryAudio(category)}>
                  Grabar de nuevo
                </Button>
              </div>)}
            {fluency && (["animales", "f"] as const).map((category) =>
              fluency[category]?.qualitative && <FluidezCualitativa key={category}
                category={category} qualitative={fluency[category].qualitative} />)}
            {"timeline" in suggestion && suggestion.timeline && !suggestion.screening && (
              <div className="edm-timeline">
                {(["left", "right"] as const).map((hand) => (
                  <div key={hand} className="edm-timeline-row">
                    <span>{hand === "left" ? "Izq." : "Der."}</span>
                    {suggestion.timeline
                      ?.filter((x) => x.hand === hand)
                      .map((x, i) => (
                        <span key={i} className={`edm-posture ${x.posture}`} title={`${x.t}s`}>
                          {x.posture}
                        </span>
                      ))}
                  </div>
                ))}
                <p className="edm-timeline-legend">Puño · Filo · Palma · Otra postura</p>
              </div>
            )}
            {"probabilities" in suggestion && !repeatPhoto && (
              <p className="text-xs">
                Probabilidad por color: verde {Math.round(suggestion.probabilities.verde * 100)}%,
                {" "}amarillo{" "}
                {Math.round(suggestion.probabilities.amarillo * 100)}%, rojo{" "}
                {Math.round(suggestion.probabilities.rojo * 100)}%
              </p>
            )}
            {"animales" in suggestion && "f" in suggestion && (
              <div className="text-xs">
                <p>Animales: {suggestion.animales?.transcript}</p>
                <p>F: {suggestion.f?.transcript}</p>
                <p>
                  Palabras:{" "}
                  {[...(suggestion.animales?.words ?? []), ...(suggestion.f?.words ?? [])]
                    .map((w) => `${w.word}${w.valid ? "" : " (excluida)"}`)
                    .join(", ")}
                </p>
              </div>
            )}
            {!("score_0_6" in suggestion && suggestion.screening) && <small>
              Modelo:{" "}
              {"model_version" in suggestion
                ? suggestion.model_version
                : "animales" in suggestion
                  ? suggestion.animales?.model_version
                  : "—"}
            </small>}
            <div className="flex flex-wrap items-center gap-2">
              {repeatPhoto && <Button type="button" onClick={() => drawingInput.current?.click()}>
                Tomar otra foto
              </Button>}
              {repeatVideo && <Button type="button" onClick={() => {
                setSuggestion(null);
                setFiles((old) => ({ ...old, video: undefined }));
                setVideoKey((old) => old + 1);
                setError("");
              }}>Grabar de nuevo</Button>}
              <Button
                type="button"
                onClick={accept}
                disabled={!!repeatPhoto || !!repeatVideo || (item.ia === "fluidez" &&
                  (!("animales" in suggestion) || !suggestion.animales || !suggestion.f))}
              >
                {"score_0_6" in suggestion
                  ? `Usar sugerencia aproximada (${suggestion.score_0_6}/6)`
                  : "Usar sugerencia"}
              </Button>
              {"score_0_6" in suggestion && (
                <p className="text-xs mt-2 basis-full">Confirme cada uno de los 6 intentos antes de continuar.</p>
              )}
            </div>
          </div>
        )}
        <p className="text-xs">
          El resultado final lo decide el evaluador; puede corregir los controles de registro.
        </p>
      </CardContent>
    </Card>
  );
}
