export const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_API ?? "http://localhost:8000";
export type CaptureQuality = {
  level: "ok" | "repetir" | "revisar";
  reasons: string[];
  metrics: Record<string, number>;
};
export type DrawingSuggestion = {
  color: "verde" | "amarillo" | "rojo";
  probabilities: { verde: number; amarillo: number; rojo: number };
  screening: DrawingScreening;
  quality: CaptureQuality;
  estimate: { elements_present: number; elements_correct: number; score_0_36: number };
  requires_review: boolean;
  model_version: string;
};
export type ScreeningDecision = "deficit_probable" | "sin_deficit_aparente" | "revisar" |
  "repetir_grabacion" | "repetir_foto";
export type DrawingScreening = {
  decision: ScreeningDecision;
  deficit_probability: number;
  review_band: [number, number];
  reasons: string[];
};
export type FluencySuggestion = {
  quality: CaptureQuality;
  transcript: string;
  words: { word: string; valid: boolean; reason?: string; t?: number }[];
  qualitative?: FluencyQualitative;
  count: number;
  color: "verde" | "amarillo" | "rojo";
  model_version: string;
};
export type FluencyQualitative = {
  version: string;
  n_words: number;
  labelled: number;
  clusters: { words: string[]; categories: string[]; size: number }[];
  switches: number;
  mean_cluster_size: number;
  repetitions: number;
  per_15s?: [number, number, number, number];
  first_word_s?: number;
  median_irt_s?: number | null;
  long_pauses?: number;
};
export type VideoSuggestion = {
  score_0_6: number;
  color: "verde" | "amarillo" | "rojo";
  requires_review: boolean;
  confidence: number;
  per_hand: { left: { correct: number; attempts: number }; right: { correct: number; attempts: number } };
  attempts?: { hand: "left" | "right"; n: 1 | 2 | 3; correct: boolean }[];
  timeline?: { t: number; hand: string; posture: "puno" | "filo" | "palma" | "otro" }[];
  screening?: VideoScreening | null;
  model_version: string;
};
export type VideoScreening = {
  review_band?: [number, number];
  decision: ScreeningDecision;
  deficit_probability: number;
  reasons: string[];
  notes: string[];
  cycles_reverse: number;
  features: {
    cycles: number;
    taps: number;
    tap_run: number;
    tempo: number;
    dur: number;
    vis: number;
    reexp?: number;
    active_frac?: number;
    both_moving_frac?: number;
  };
  taps: number[];
  start_cue_s: number;
  one_hand_only: boolean;
  model_version: string;
};
export async function aiHealth() {
  return aiGet<{ ok: boolean; models: { video: boolean; drawing: boolean; fluency: boolean } }>("/health");
}
async function aiGet<T>(path: string): Promise<T> {
  const r = await fetch(`${AI_BASE_URL}${path}`);
  if (!r.ok) throw new Error("IA no disponible");
  return r.json();
}
async function aiPost<T>(path: string, file: File, extra?: Record<string, string>): Promise<T> {
  const body = new FormData();
  body.append("file", file);
  for (const [k, v] of Object.entries(extra ?? {})) body.append(k, v);
  const r = await fetch(`${AI_BASE_URL}${path}`, { method: "POST", body });
  if (!r.ok) throw new Error("IA no disponible");
  return r.json();
}
export const predictDrawing = (file: File, task: "copia" | "memoria") =>
  aiPost<DrawingSuggestion>("/drawing/predict", file, { task });
export const scoreFluency = (file: File, category: "animales" | "f") =>
  aiPost<FluencySuggestion>("/fluency/score", file, { category });
export const predictVideo = (file: File) => aiPost<VideoSuggestion>("/video/predict", file);
