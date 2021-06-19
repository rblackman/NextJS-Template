import clamp from './clamp';

interface RgbColor {
	red: number;
	green: number;
	blue: number;
}

interface HslColor {
	hue: number;
	saturation: number;
	lightness: number;
}

export function rgbToHsl({ red, green, blue }: RgbColor): HslColor {
	const r = red / 255;
	const g = green / 255;
	const b = blue / 255;

	// Find greatest and smallest channel values
	const colorMin = Math.min(r, g, b);
	const colorMax = Math.max(r, g, b);
	const delta = colorMax - colorMin;
	let hue = 0;
	let saturation = 0;
	let lightness = 0;

	// Calculate hue
	// No difference
	if (delta === 0) {
		// Red is max
		hue = 0;
	} else if (colorMax === r) {
		// Green is max
		hue = ((g - b) / delta) % 6;
	} else if (colorMax === g) {
		// Blue is max
		hue = (b - r) / delta + 2;
	} else {
		hue = (r - g) / delta + 4;
	}

	hue = Math.round(hue * 60);

	// Make negative hues positive behind 360°
	if (hue < 0) {
		hue += 360;
	}

	// Calculate lightness
	lightness = (colorMax + colorMin) / 2;

	// Calculate saturation
	saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

	// Multiply l and s by 100
	saturation = +(saturation * 100).toFixed(1);
	lightness = +(lightness * 100).toFixed(1);

	return { hue, saturation, lightness };
}

export default function parseColor(color: string): HslColor {
	let c = color;
	if (color.startsWith('#')) {
		c = color.slice(1);
	}
	const rgb: RgbColor = {
		red: parseInt(c.slice(0, 2), 16),
		green: parseInt(c.slice(2, 4), 16),
		blue: parseInt(c.slice(4, 6), 16)
	};

	return rgbToHsl(rgb);
}

export function hsla({ hue, saturation, lightness }: HslColor, alpha: number | null = null): string {
	const clampedHue = clamp(hue, 0, 360);
	const clampedSaturation = clamp(saturation, 0, 100);
	const clampedLightness = clamp(lightness, 0, 100);

	if (alpha) {
		return `hsla(${clampedHue}, ${clampedSaturation}%, ${clampedLightness}%, ${clamp(alpha, 0, 1)})`;
	}

	return `hsl(${clampedHue}, ${clampedSaturation}%, ${clampedLightness}%)`;
}
