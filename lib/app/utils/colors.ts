export const hexToNormalizedRGBA = (hex: string): [number, number, number, number] => {
    // Convertir hexadecimal a valores normalizados (0.0 a 1.0)
    const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
    const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
    const b = Number.parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b, 1.0]; // Alpha = 1.0 por defecto
}