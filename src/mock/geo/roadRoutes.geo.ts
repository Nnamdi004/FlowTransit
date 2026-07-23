/**
 * Approximate road/BRT corridor paths as ordered [lat, lng] pairs.
 * Straight-line segments between real stop coordinates — good enough for a
 * mock map demo, not turn-by-turn accurate.
 */
export const ikoroduCmsPath: [number, number][] = [
  [6.6018, 3.5106], // Ikorodu Garage
  [6.5786, 3.3778], // Ojota
  [6.5711, 3.3644], // Maryland Bus Terminal
  [6.5095, 3.3711], // Yaba Bus Stop
  [6.4531, 3.3958], // CMS Bus Terminal
];

export const oshodiMile2Path: [number, number][] = [
  [6.5558, 3.3468], // Oshodi Interchange
  [6.4923, 3.3546], // Surulere (Bode Thomas)
  [6.4593, 3.2955], // Mile 2 Bus Terminal
];

export const ikejaYabaPath: [number, number][] = [
  [6.6018, 3.3515], // Ikeja Along
  [6.5558, 3.3468], // Oshodi Interchange
  [6.5095, 3.3711], // Yaba Bus Stop
];

export const ajahObalendePath: [number, number][] = [
  [6.4698, 3.5852], // Ajah Bus Stop
  [6.4422, 3.4732], // Lekki Phase 1 Gate
  [6.4508, 3.4275], // Falomo
  [6.4514, 3.4079], // Obalende Bus Stop
];
