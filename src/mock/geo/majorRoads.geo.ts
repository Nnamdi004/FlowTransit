export interface MajorRoad {
  id: string;
  name: string;
  path: [number, number][];
}

/**
 * Decorative arterial-road geometry (not transit routes) so the map reads
 * as a real Lagos road network. Approximate, illustrative only.
 */
export const majorRoads: MajorRoad[] = [
  {
    id: 'road-third-mainland-bridge',
    name: 'Third Mainland Bridge',
    path: [
      [6.5423, 3.3859],
      [6.5142, 3.3843],
      [6.487, 3.3875],
      [6.465, 3.393],
    ],
  },
  {
    id: 'road-ikorodu-road',
    name: 'Ikorodu Road',
    path: [
      [6.6018, 3.5106],
      [6.5786, 3.3778],
      [6.5645, 3.3697],
      [6.5095, 3.3711],
    ],
  },
  {
    id: 'road-apapa-oshodi-expressway',
    name: 'Apapa–Oshodi Expressway',
    path: [
      [6.4432, 3.3592],
      [6.4593, 3.2955],
      [6.5558, 3.3468],
    ],
  },
  {
    id: 'road-lagos-badagry-expressway',
    name: 'Lagos–Badagry Expressway',
    path: [
      [6.4593, 3.2955],
      [6.4667, 3.2833],
      [6.4152, 2.8823],
    ],
  },
];
