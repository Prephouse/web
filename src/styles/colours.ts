import { blue, cyan, green, grey, indigo, orange, purple, red, yellow } from '@mui/material/colors';

export const GREY_50 = grey[50];
export const GREY_200 = grey[200];
export const GREY_300 = grey[300];
export const GREY_400 = grey[400];
export const GREY_500 = grey[500];
export const GREY_600 = grey[600];
export const GREY_700 = grey[700];
export const GREY_900 = grey[900];

export const BLUE_500 = blue[500];
export const BLUE_800 = blue[800];
export const BLUE_900 = blue[900];

export const RED_500 = red[500];
export const RED_600 = red[600];

export const YELLOW_500 = yellow[500];

export const GREEN_500 = green[500];

export const ORANGE_500 = orange[500];

export const PURPLE_500 = purple[500];

export const CYAN_500 = cyan[500];

export const INDIGO_500 = indigo[500];

export const NAVIGATION_BLACK = GREY_900;
export const NAVIGATION_HOVER_GREY = GREY_700;
export const FACEBOOK_BLUE = BLUE_800;
export const FACEBOOK_BLUE_HOVER = BLUE_900;
export const GOOGLE_GREY_HOVER = GREY_50;

type ColourType = [number, number, number, number?];

const defaultPalette: ColourType[] = [
  [255, 173, 173],
  [255, 214, 165],
  [202, 255, 191],
  [155, 246, 255],
  [160, 196, 255],
  [189, 178, 255],
  [255, 198, 255],
];

export class ColorPicker {
  constructor(public palette: ColourType[] = defaultPalette, public index: number = 0) {}

  static getColorString(colour: ColourType | undefined, opacity?: number): string {
    const opacityColour = opacity ? colour?.concat(opacity) : colour;
    return `rgb(${opacityColour?.join(',')})`;
  }

  getColor(): string {
    const colour = this.palette[this.index];
    this.index = (this.index + 1) % this.palette.length;
    return ColorPicker.getColorString(colour);
  }

  getColorPair(opacity: number): [string, string] {
    const colour = this.palette[this.index];
    this.index = (this.index + 1) % this.palette.length;
    return [ColorPicker.getColorString(colour), ColorPicker.getColorString(colour, opacity)];
  }
}
