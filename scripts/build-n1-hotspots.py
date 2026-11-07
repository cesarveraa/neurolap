"""Rebuild item N°1 figure bounds and targets from the sharp protocol sheet."""
from pathlib import Path
import json

import cv2
import numpy as np
from scipy.signal import find_peaks

ROOT = Path(__file__).resolve().parents[1]
SOURCES = [ROOT / 'public/anexo1-response-edm.png', ROOT / 'public/edm/n1-lamina.png']
TARGET = ROOT / 'public/edm/n1-estimulo.png'
OUTPUT = ROOT / 'lib/edm/n1-hotspots.json'
ROWS, COLS = 15, 16


def sharpness(path):
    image = cv2.imread(str(path), cv2.IMREAD_GRAYSCALE)
    return cv2.Laplacian(image, cv2.CV_64F).var()


def centers(ink, axis, count):
    profile = ink.sum(axis=axis).astype(np.float32)
    window = max(9, round(len(profile) / count * .6) | 1)
    smooth = cv2.GaussianBlur(profile.reshape(1, -1), (window, 1), 0).ravel()
    peaks, _ = find_peaks(smooth, distance=round(len(profile) / count * .7), prominence=1)
    if len(peaks) != count:
        raise ValueError(f'Expected {count} projection peaks, found {len(peaks)}: {peaks.tolist()}')
    return peaks


def boundaries(peaks, length):
    return [0] + [round((a + b) / 2) for a, b in zip(peaks, peaks[1:])] + [length]


def normalized_ink(image):
    points = cv2.findNonZero(image)
    x, y, w, h = cv2.boundingRect(points)
    return cv2.resize((image[y:y + h, x:x + w] > 0).astype(np.float32), (64, 64))


def is_target(crop, template):
    sample = normalized_ink(crop)
    error = np.mean(np.abs(sample - template))
    center = sample[26:38, 26:38].mean()
    ring = sample[13:22, 22:42].mean()
    contours, _ = cv2.findContours(crop, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    outline = max(contours, key=cv2.contourArea)
    vertices = cv2.approxPolyDP(outline, .045 * cv2.arcLength(outline, True), True)[:, 0, :]
    corners = sum(x < 3 or x > crop.shape[1] - 4 for x, y in vertices)
    return bool(error < .20 and center > .7 and ring < .25 and corners < 4)


def main():
    source = max(SOURCES, key=sharpness)
    gray = cv2.imread(str(source), cv2.IMREAD_GRAYSCALE)
    if gray is None or cv2.imread(str(TARGET), cv2.IMREAD_GRAYSCALE) is None:
        raise FileNotFoundError('Missing protocol sheet or target')
    ink = (gray < 170).astype(np.uint8) * 255
    height, width = ink.shape
    template = normalized_ink((cv2.imread(str(TARGET), 0) < 170).astype(np.uint8) * 255)
    xs = boundaries(centers(ink, 0, COLS), width)
    ys = boundaries(centers(ink, 1, ROWS), height)
    hotspots = []
    for row in range(ROWS):
        for col in range(COLS):
            x0, x1, y0, y1 = xs[col], xs[col + 1], ys[row], ys[row + 1]
            cell = ink[y0:y1, x0:x1]
            points = cv2.findNonZero(cell)
            if points is None:
                continue
            x, y, w, h = cv2.boundingRect(points)
            crop = cell[y:y + h, x:x + w]
            hotspots.append({
                'id': f'r{row + 1}c{col + 1}', 'fila': row + 1, 'columna': col + 1,
                'x': round((x0 + x) / width, 6), 'y': round((y0 + y) / height, 6),
                'w': round(w / width, 6), 'h': round(h / height, 6),
                'objetivo': bool(is_target(crop, template)),
            })
    OUTPUT.write_text(json.dumps(hotspots, ensure_ascii=False, indent=2) + '\n')
    objectives = [h['id'] for h in hotspots if h['objetivo']]
    print(f'{source.relative_to(ROOT)}: {len(hotspots)} figures, {len(objectives)} targets')
    print('Targets:', ', '.join(objectives))


if __name__ == '__main__':
    main()
