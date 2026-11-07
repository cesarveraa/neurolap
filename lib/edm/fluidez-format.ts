import type { FluencyQualitative } from "./ai-client.ts";

export const categoryLabels: Record<string, string> = {
  granja: "granja", domestico: "domésticos", andino: "andinos", selva: "selva",
  africa: "África", polar: "polares", australia: "Australia",
  campo_bosque: "campo y bosque", mar: "mar", agua_dulce: "río y lago",
  carga: "de carga", caza_consumo: "de caza", aves: "aves", felinos: "felinos",
  caninos: "caninos", primates: "primates", roedores_conejos: "roedores y conejos",
  bovinos: "bovinos", ovinos_caprinos: "ovejas y cabras", porcinos: "porcinos",
  equinos: "equinos", ciervos: "ciervos", camelidos: "camélidos", osos: "osos",
  marsupiales: "marsupiales", otros_mamiferos: "otros mamíferos",
  mamiferos_marinos: "mamíferos acuáticos", reptiles_anfibios: "reptiles y anfibios",
  peces: "peces", bichos: "invertebrados terrestres",
  moluscos_crustaceos: "moluscos y crustáceos", prehistoricos: "prehistóricos",
};

export function formatDecimal(value: number) {
  return value.toLocaleString("es-BO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function formatCluster(cluster: FluencyQualitative["clusters"][number], category: "animales" | "f") {
  const label = category === "f" ? "mismo sonido" : cluster.categories
    .map((key) => categoryLabels[key] ?? key.replaceAll("_", " ")).join(", ");
  return `${cluster.words.join(" · ")} — ${label || "sin categoría"}`;
}

export function visibleClusters(qualitative: FluencyQualitative, category: "animales" | "f") {
  return {
    chips: qualitative.clusters.slice(0, 6).map((cluster) => formatCluster(cluster, category)),
    more: qualitative.clusters.length > 6 ? `+${qualitative.clusters.length - 6} más` : null,
  };
}
