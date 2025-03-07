var atoms = [
	{
		id: "Xx",
		atomicNumber: 0,
		mass: 0,
		exactMass: 0,
		radiusCovalent: 0,
		radiusVDW: 0,
		symbol: "Xx",
		name: "Dummy",
		elementColor: [
			0.07,
			0.5,
			0.7
		]
	},
	{
		id: "H",
		atomicNumber: 1,
		mass: 1.00794,
		exactMass: 1.007825032,
		ionization: 13.5984,
		electronAffinity: 0.75420375,
		electronegativityPauling: 2.2,
		nameOrigin: "Greek 'hydro' and 'gennao' for 'forms water'",
		radiusCovalent: 0.37,
		radiusVDW: 1.2,
		boilingpoint: 20.28,
		meltingpoint: 14.01,
		periodTableBlock: "s",
		discoveryDate: "1766",
		period: "1",
		group: "1",
		electronicConfiguration: "1s1",
		family: "Non-Metal",
		symbol: "H",
		name: "Hydrogen",
		elementColor: [
			1,
			1,
			1
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"C.",
			"Cavendish"
		]
	},
	{
		id: "He",
		atomicNumber: 2,
		mass: 4.002602,
		exactMass: 4.002603254,
		ionization: 24.5874,
		electronAffinity: 0,
		nameOrigin: "The Greek word for the sun was 'helios'",
		radiusCovalent: 0.32,
		radiusVDW: 1.4,
		boilingpoint: 4.216,
		meltingpoint: 0.95,
		periodTableBlock: "p",
		discoveryDate: "1895",
		period: "1",
		group: "8",
		electronicConfiguration: "1s2",
		family: "Noblegas",
		symbol: "He",
		name: "Helium",
		elementColor: [
			0.85,
			1,
			1
		],
		discoveryCountry: [
			"se",
			"uk"
		],
		discoverers: [
			"P. J. Janssen",
			"J. N. Lockyer"
		]
	},
	{
		id: "Li",
		atomicNumber: 3,
		mass: 6.941,
		exactMass: 7.01600455,
		ionization: 5.3917,
		electronAffinity: 0.618049,
		electronegativityPauling: 0.98,
		nameOrigin: "Greek 'lithos' means 'stone'",
		radiusCovalent: 1.34,
		radiusVDW: 2.2,
		boilingpoint: 1615,
		meltingpoint: 453.7,
		periodTableBlock: "s",
		discoveryDate: "1817",
		period: "2",
		group: "1",
		electronicConfiguration: "He 2s1",
		family: "Alkali_Earth",
		symbol: "Li",
		name: "Lithium",
		elementColor: [
			0.8,
			0.5,
			1
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"A.",
			"Arfvedson"
		]
	},
	{
		id: "Be",
		atomicNumber: 4,
		mass: 9.012182,
		exactMass: 9.0121822,
		ionization: 9.3227,
		electronAffinity: 0,
		electronegativityPauling: 1.57,
		nameOrigin: "Greek 'beryllos' for 'light-green stone'",
		radiusCovalent: 0.9,
		radiusVDW: 1.9,
		boilingpoint: 3243,
		meltingpoint: 1560,
		periodTableBlock: "s",
		discoveryDate: "1797",
		period: "2",
		group: "2",
		electronicConfiguration: "He 2s2",
		family: "Alkaline_Earth",
		symbol: "Be",
		name: "Beryllium",
		elementColor: [
			0.76,
			1,
			0
		],
		discoveryCountry: [
			"fr"
		],
		discoverers: [
			"Nicholas",
			"Louis",
			"Vauquelin"
		]
	},
	{
		id: "B",
		atomicNumber: 5,
		mass: 10.811,
		exactMass: 11.0093054,
		ionization: 8.298,
		electronAffinity: 0.279723,
		electronegativityPauling: 2.04,
		nameOrigin: "Boron means 'Bor(ax) + (carb)on'. It is found in borax and behaves a lot like carbon",
		radiusCovalent: 0.82,
		radiusVDW: 1.8,
		boilingpoint: 4275,
		meltingpoint: 2365,
		periodTableBlock: "p",
		discoveryDate: "1808",
		period: "2",
		group: "3",
		electronicConfiguration: "He 2s2 2p1",
		family: "Metalloids",
		symbol: "B",
		name: "Boron",
		elementColor: [
			1,
			0.71,
			0.71
		],
		discoveryCountry: [
			"uk",
			"fr"
		],
		discoverers: [
			"Louis Joseph Gay-Lussac",
			"Louis Jacques Thenard"
		]
	},
	{
		id: "C",
		atomicNumber: 6,
		mass: 12.0107,
		exactMass: 12,
		ionization: 11.2603,
		electronAffinity: 1.262118,
		electronegativityPauling: 2.55,
		nameOrigin: "Latin 'carboneum' for carbon",
		radiusCovalent: 0.77,
		radiusVDW: 1.7,
		boilingpoint: 5100,
		meltingpoint: 3825,
		periodTableBlock: "p",
		discoveryDate: "0",
		period: "2",
		group: "4",
		electronicConfiguration: "He 2s2 2p2",
		family: "Non-Metal",
		symbol: "C",
		name: "Carbon",
		elementColor: [
			0.5,
			0.5,
			0.5
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "N",
		atomicNumber: 7,
		mass: 14.0067,
		exactMass: 14.003074,
		ionization: 14.5341,
		electronAffinity: -0.07,
		electronegativityPauling: 3.04,
		nameOrigin: "Latin 'nitrogenium' ('forms saltpeter')",
		radiusCovalent: 0.75,
		radiusVDW: 1.6,
		boilingpoint: 77.344,
		meltingpoint: 63.15,
		periodTableBlock: "p",
		discoveryDate: "1772",
		period: "2",
		group: "5",
		electronicConfiguration: "He 2s2 2p3",
		family: "Non-Metal",
		symbol: "N",
		name: "Nitrogen",
		elementColor: [
			0.05,
			0.05,
			1
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"D.",
			"Rutherford"
		]
	},
	{
		id: "O",
		atomicNumber: 8,
		mass: 15.9994,
		exactMass: 15.99491462,
		ionization: 13.6181,
		electronAffinity: 1.461112,
		electronegativityPauling: 3.44,
		nameOrigin: "Latin 'oxygenium' (forms acids)",
		radiusCovalent: 0.73,
		radiusVDW: 1.55,
		boilingpoint: 90.188,
		meltingpoint: 54.8,
		periodTableBlock: "p",
		discoveryDate: "1774",
		period: "2",
		group: "6",
		electronicConfiguration: "He 2s2 2p4",
		family: "Non-Metal",
		symbol: "O",
		name: "Oxygen",
		elementColor: [
			1,
			0.05,
			0.05
		],
		discoveryCountry: [
			"se",
			"uk"
		],
		discoverers: [
			"J.",
			"Priestley"
		]
	},
	{
		id: "F",
		atomicNumber: 9,
		mass: 18.9984032,
		exactMass: 18.99840322,
		ionization: 17.4228,
		electronAffinity: 3.4011887,
		electronegativityPauling: 3.98,
		nameOrigin: "Latin 'fluere' ('floats')",
		radiusCovalent: 0.71,
		radiusVDW: 1.5,
		boilingpoint: 85,
		meltingpoint: 53.55,
		periodTableBlock: "p",
		discoveryDate: "1886",
		period: "2",
		group: "7",
		electronicConfiguration: "He 2s2 2p5",
		family: "Halogen",
		symbol: "F",
		name: "Fluorine",
		elementColor: [
			0.7,
			1,
			1
		],
		discoveryCountry: [
			"fr"
		],
		discoverers: [
			"H.",
			"F.",
			"Moissan"
		]
	},
	{
		id: "Ne",
		atomicNumber: 10,
		mass: 20.1797,
		exactMass: 19.99244018,
		ionization: 21.5645,
		electronAffinity: 0,
		nameOrigin: "Greek 'neo'. meaning 'new'",
		radiusCovalent: 0.69,
		radiusVDW: 1.54,
		boilingpoint: 27.1,
		meltingpoint: 24.55,
		periodTableBlock: "p",
		discoveryDate: "1898",
		period: "2",
		group: "8",
		electronicConfiguration: "He 2s2 2p6",
		family: "Noblegas",
		symbol: "Ne",
		name: "Neon",
		elementColor: [
			0.7,
			0.89,
			0.96
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"W. Ramsay",
			"M.W. Travers"
		]
	},
	{
		id: "Na",
		atomicNumber: 11,
		mass: 22.98976928,
		exactMass: 22.98976928,
		ionization: 5.1391,
		electronAffinity: 0.547926,
		electronegativityPauling: 0.93,
		nameOrigin: "Arabic 'natrun' for 'soda'",
		radiusCovalent: 1.54,
		radiusVDW: 2.4,
		boilingpoint: 1156,
		meltingpoint: 371,
		periodTableBlock: "s",
		discoveryDate: "1807",
		period: "3",
		group: "1",
		electronicConfiguration: "Ne 3s1",
		family: "Alkali_Earth",
		symbol: "Na",
		name: "Sodium",
		elementColor: [
			0.67,
			0.36,
			0.95
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"Sir",
			"Humphrey",
			"Davy"
		]
	},
	{
		id: "Mg",
		atomicNumber: 12,
		mass: 24.305,
		exactMass: 23.9850417,
		ionization: 7.6462,
		electronAffinity: 0,
		electronegativityPauling: 1.31,
		nameOrigin: "Named after the city of Magnesia",
		radiusCovalent: 1.3,
		radiusVDW: 2.2,
		boilingpoint: 1380,
		meltingpoint: 922,
		periodTableBlock: "s",
		discoveryDate: "1808",
		period: "3",
		group: "2",
		electronicConfiguration: "Ne 3s2",
		family: "Alkaline_Earth",
		symbol: "Mg",
		name: "Magnesium",
		elementColor: [
			0.54,
			1,
			0
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"H.",
			"B.",
			"Davy"
		]
	},
	{
		id: "Al",
		atomicNumber: 13,
		mass: 26.9815386,
		exactMass: 26.98153863,
		ionization: 5.9858,
		electronAffinity: 0.43283,
		electronegativityPauling: 1.61,
		nameOrigin: "Latin 'alumen'",
		radiusCovalent: 1.18,
		radiusVDW: 2.1,
		boilingpoint: 2740,
		meltingpoint: 933.5,
		periodTableBlock: "p",
		discoveryDate: "1825",
		period: "3",
		group: "3",
		electronicConfiguration: "Ne 3s2 3p1",
		family: "Other_Metal",
		symbol: "Al",
		name: "Aluminium",
		elementColor: [
			0.75,
			0.65,
			0.65
		],
		discoveryCountry: [
			"dk"
		],
		discoverers: [
			"H.",
			"Ch.",
			"Oersted"
		]
	},
	{
		id: "Si",
		atomicNumber: 14,
		mass: 28.0855,
		exactMass: 27.97692653,
		ionization: 8.1517,
		electronAffinity: 1.389521,
		electronegativityPauling: 1.9,
		nameOrigin: "Latin 'silex'",
		radiusCovalent: 1.11,
		radiusVDW: 2.1,
		boilingpoint: 2630,
		meltingpoint: 1683,
		periodTableBlock: "p",
		discoveryDate: "1823",
		period: "3",
		group: "4",
		electronicConfiguration: "Ne 3s2 3p2",
		family: "Metalloids",
		symbol: "Si",
		name: "Silicon",
		elementColor: [
			0.5,
			0.6,
			0.6
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"J.",
			"J.",
			"Berzelius"
		]
	},
	{
		id: "P",
		atomicNumber: 15,
		mass: 30.973762,
		exactMass: 30.97376163,
		ionization: 10.4867,
		electronAffinity: 0.7465,
		electronegativityPauling: 2.19,
		nameOrigin: "Greek 'phosphoros' for 'carries light'",
		radiusCovalent: 1.06,
		radiusVDW: 1.95,
		boilingpoint: 553,
		meltingpoint: 317.3,
		periodTableBlock: "p",
		discoveryDate: "1669",
		period: "3",
		group: "5",
		electronicConfiguration: "Ne 3s2 3p3",
		family: "Non-Metal",
		symbol: "P",
		name: "Phosphorus",
		elementColor: [
			1,
			0.5,
			0
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"H.",
			"Brandt"
		]
	},
	{
		id: "S",
		atomicNumber: 16,
		mass: 32.065,
		exactMass: 31.972071,
		ionization: 10.36,
		electronAffinity: 2.0771029,
		electronegativityPauling: 2.58,
		nameOrigin: "In sanskrit 'sweb' means 'to sleep'",
		radiusCovalent: 1.02,
		radiusVDW: 1.8,
		boilingpoint: 717.82,
		meltingpoint: 392.2,
		periodTableBlock: "p",
		discoveryDate: "0",
		period: "3",
		group: "6",
		electronicConfiguration: "Ne 3s2 3p4",
		family: "Non-Metal",
		symbol: "S",
		name: "Sulfur",
		elementColor: [
			1,
			1,
			0.19
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "Cl",
		atomicNumber: 17,
		mass: 35.453,
		exactMass: 34.96885268,
		ionization: 12.9676,
		electronAffinity: 3.612724,
		electronegativityPauling: 3.16,
		nameOrigin: "Greek 'chloros' for 'yellow-green'",
		radiusCovalent: 0.99,
		radiusVDW: 1.8,
		boilingpoint: 239.18,
		meltingpoint: 172.17,
		periodTableBlock: "p",
		discoveryDate: "1774",
		period: "3",
		group: "7",
		electronicConfiguration: "Ne 3s2 3p5",
		family: "Halogen",
		symbol: "Cl",
		name: "Chlorine",
		elementColor: [
			0.12,
			0.94,
			0.12
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"C.",
			"W.",
			"Scheele"
		]
	},
	{
		id: "Ar",
		atomicNumber: 18,
		mass: 39.948,
		exactMass: 39.96238312,
		ionization: 15.7596,
		electronAffinity: 0,
		nameOrigin: "Greek 'aergon' for 'inactive'",
		radiusCovalent: 0.97,
		radiusVDW: 1.88,
		boilingpoint: 87.45,
		meltingpoint: 83.95,
		periodTableBlock: "p",
		discoveryDate: "1894",
		period: "3",
		group: "8",
		electronicConfiguration: "Ne 3s2 3p6",
		family: "Noblegas",
		symbol: "Ar",
		name: "Argon",
		elementColor: [
			0.5,
			0.82,
			0.89
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"W. Ramsay",
			"J. Rayleigh"
		]
	},
	{
		id: "K",
		atomicNumber: 19,
		mass: 39.0983,
		exactMass: 38.96370668,
		ionization: 4.3407,
		electronAffinity: 0.501459,
		electronegativityPauling: 0.82,
		nameOrigin: "Arabic 'al qaliy' for potash",
		radiusCovalent: 1.96,
		radiusVDW: 2.8,
		boilingpoint: 1033,
		meltingpoint: 336.8,
		periodTableBlock: "s",
		discoveryDate: "1807",
		period: "4",
		group: "1",
		electronicConfiguration: "Ar 4s1",
		family: "Alkali_Earth",
		symbol: "K",
		name: "Potassium",
		elementColor: [
			0.56,
			0.25,
			0.83
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"H.",
			"B.",
			"Davy"
		]
	},
	{
		id: "Ca",
		atomicNumber: 20,
		mass: 40.078,
		exactMass: 39.96259098,
		ionization: 6.1132,
		electronAffinity: 0.02455,
		electronegativityPauling: 1,
		nameOrigin: "Latin 'calx' for 'lime'",
		radiusCovalent: 1.74,
		radiusVDW: 2.4,
		boilingpoint: 1757,
		meltingpoint: 1112,
		periodTableBlock: "s",
		discoveryDate: "1808",
		period: "4",
		group: "2",
		electronicConfiguration: "Ar 4s2",
		family: "Alkaline_Earth",
		symbol: "Ca",
		name: "Calcium",
		elementColor: [
			0.24,
			1,
			0
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"H.",
			"B.",
			"Davy"
		]
	},
	{
		id: "Sc",
		atomicNumber: 21,
		mass: 44.955912,
		exactMass: 44.9559119,
		ionization: 6.5615,
		electronAffinity: 0.188,
		electronegativityPauling: 1.36,
		nameOrigin: "Named because it was found in Scandinavia",
		radiusCovalent: 1.44,
		radiusVDW: 2.3,
		boilingpoint: 3109,
		meltingpoint: 1814,
		periodTableBlock: "d",
		discoveryDate: "1879",
		period: "4",
		group: "3",
		electronicConfiguration: "Ar 3d1 4s2",
		family: "Transition",
		symbol: "Sc",
		name: "Scandium",
		elementColor: [
			0.9,
			0.9,
			0.9
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"L.",
			"Nilson"
		]
	},
	{
		id: "Ti",
		atomicNumber: 22,
		mass: 47.867,
		exactMass: 47.9479463,
		ionization: 6.8281,
		electronAffinity: 0.084,
		electronegativityPauling: 1.54,
		nameOrigin: "The Titans were giants in Greek mythology",
		radiusCovalent: 1.36,
		radiusVDW: 2.15,
		boilingpoint: 3560,
		meltingpoint: 1935,
		periodTableBlock: "d",
		discoveryDate: "1791",
		period: "4",
		group: "4",
		electronicConfiguration: "Ar 3d2 4s2",
		family: "Transition",
		symbol: "Ti",
		name: "Titanium",
		elementColor: [
			0.75,
			0.76,
			0.78
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"W.",
			"Gregor"
		]
	},
	{
		id: "V",
		atomicNumber: 23,
		mass: 50.9415,
		exactMass: 50.9439595,
		ionization: 6.7462,
		electronAffinity: 0.525,
		electronegativityPauling: 1.63,
		nameOrigin: "'Vanadis' is another name for the Nordic goddess Freyja",
		radiusCovalent: 1.25,
		radiusVDW: 2.05,
		boilingpoint: 3650,
		meltingpoint: 2163,
		periodTableBlock: "d",
		discoveryDate: "1830",
		period: "4",
		group: "5",
		electronicConfiguration: "Ar 3d3 4s2",
		family: "Transition",
		symbol: "V",
		name: "Vanadium",
		elementColor: [
			0.65,
			0.65,
			0.67
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"N.",
			"Sefström"
		]
	},
	{
		id: "Cr",
		atomicNumber: 24,
		mass: 51.9961,
		exactMass: 51.9405075,
		ionization: 6.7665,
		electronAffinity: 0.67584,
		electronegativityPauling: 1.66,
		nameOrigin: "Greek 'chroma' means 'color'",
		radiusCovalent: 1.27,
		radiusVDW: 2.05,
		boilingpoint: 2945,
		meltingpoint: 2130,
		periodTableBlock: "d",
		discoveryDate: "1797",
		period: "4",
		group: "6",
		electronicConfiguration: "Ar 3d5 4s1",
		family: "Transition",
		symbol: "Cr",
		name: "Chromium",
		elementColor: [
			0.54,
			0.6,
			0.78
		],
		discoveryCountry: [
			"fr"
		],
		discoverers: [
			"Nicholas",
			"Louis",
			"Vauquelin"
		]
	},
	{
		id: "Mn",
		atomicNumber: 25,
		mass: 54.938045,
		exactMass: 54.9380451,
		ionization: 7.434,
		electronAffinity: 0,
		electronegativityPauling: 1.55,
		nameOrigin: "It was discovered near a town named Magnesia in black earth. Thus, it was named 'magnesia nigra', or for short, Manganese.",
		radiusCovalent: 1.39,
		radiusVDW: 2.05,
		boilingpoint: 2235,
		meltingpoint: 1518,
		periodTableBlock: "d",
		discoveryDate: "1774",
		period: "4",
		group: "7",
		electronicConfiguration: "Ar 3d5 4s2",
		family: "Transition",
		symbol: "Mn",
		name: "Manganese",
		elementColor: [
			0.61,
			0.48,
			0.78
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"C.",
			"W.",
			"Scheele"
		]
	},
	{
		id: "Fe",
		atomicNumber: 26,
		mass: 55.845,
		exactMass: 55.9349375,
		ionization: 7.9024,
		electronAffinity: 0.151,
		electronegativityPauling: 1.83,
		nameOrigin: "Latin 'ferrum'",
		radiusCovalent: 1.25,
		radiusVDW: 2.05,
		boilingpoint: 3023,
		meltingpoint: 1808,
		periodTableBlock: "d",
		discoveryDate: "0",
		period: "4",
		group: "8",
		electronicConfiguration: "Ar 3d6 4s2",
		family: "Transition",
		symbol: "Fe",
		name: "Iron",
		elementColor: [
			0.5,
			0.48,
			0.78
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "Co",
		atomicNumber: 27,
		mass: 58.933195,
		exactMass: 58.933195,
		ionization: 7.881,
		electronAffinity: 0.6633,
		electronegativityPauling: 1.88,
		nameOrigin: "Named after the German word 'Kobold' for 'goblin'",
		radiusCovalent: 1.26,
		radiusVDW: 2,
		boilingpoint: 3143,
		meltingpoint: 1768,
		periodTableBlock: "d",
		discoveryDate: "1737",
		period: "4",
		group: "8",
		electronicConfiguration: "Ar 3d7 4s2",
		family: "Transition",
		symbol: "Co",
		name: "Cobalt",
		elementColor: [
			0.44,
			0.48,
			0.78
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"G.",
			"Brandt"
		]
	},
	{
		id: "Ni",
		atomicNumber: 28,
		mass: 58.6934,
		exactMass: 57.9353429,
		ionization: 7.6398,
		electronAffinity: 1.15716,
		electronegativityPauling: 1.91,
		nameOrigin: "'Nickel' was the name of a mountain goblin",
		radiusCovalent: 1.21,
		radiusVDW: 2,
		boilingpoint: 3005,
		meltingpoint: 1726,
		periodTableBlock: "d",
		discoveryDate: "1751",
		period: "4",
		group: "8",
		electronicConfiguration: "Ar 3d8 4s2",
		family: "Transition",
		symbol: "Ni",
		name: "Nickel",
		elementColor: [
			0.36,
			0.48,
			0.76
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"A.",
			"F.",
			"Cronstedt"
		]
	},
	{
		id: "Cu",
		atomicNumber: 29,
		mass: 63.546,
		exactMass: 62.9295975,
		ionization: 7.7264,
		electronAffinity: 1.23578,
		electronegativityPauling: 1.9,
		nameOrigin: "Greek 'cuprum' for Cypres",
		radiusCovalent: 1.38,
		radiusVDW: 2,
		boilingpoint: 2840,
		meltingpoint: 1356.6,
		periodTableBlock: "d",
		discoveryDate: "0",
		period: "4",
		group: "1",
		electronicConfiguration: "Ar 3d10 4s1",
		family: "Transition",
		symbol: "Cu",
		name: "Copper",
		elementColor: [
			1,
			0.48,
			0.38
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "Zn",
		atomicNumber: 30,
		mass: 65.38,
		exactMass: 63.9291422,
		ionization: 9.3942,
		electronAffinity: 0,
		electronegativityPauling: 1.65,
		nameOrigin: "German 'zinking' for 'rough', because zinc ore is very rough",
		radiusCovalent: 1.31,
		radiusVDW: 2.1,
		boilingpoint: 1180,
		meltingpoint: 692.73,
		periodTableBlock: "d",
		discoveryDate: "1746",
		period: "4",
		group: "2",
		electronicConfiguration: "Ar 3d10 4s2",
		family: "Transition",
		symbol: "Zn",
		name: "Zinc",
		elementColor: [
			0.49,
			0.5,
			0.69
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"Andreas",
			"Marggraf"
		]
	},
	{
		id: "Ga",
		atomicNumber: 31,
		mass: 69.723,
		exactMass: 68.9255736,
		ionization: 5.9993,
		electronAffinity: 0.41,
		electronegativityPauling: 1.81,
		nameOrigin: "'Gallia' is an old name for France",
		radiusCovalent: 1.26,
		radiusVDW: 2.1,
		boilingpoint: 2478,
		meltingpoint: 302.92,
		periodTableBlock: "p",
		discoveryDate: "1875",
		period: "4",
		group: "3",
		electronicConfiguration: "Ar 3d10 4s2 4p1",
		family: "Other_Metal",
		symbol: "Ga",
		name: "Gallium",
		elementColor: [
			0.76,
			0.56,
			0.56
		],
		discoveryCountry: [
			"fr"
		],
		discoverers: [
			"P.",
			"E.",
			"Lecoq",
			"de",
			"Boisbaudran"
		]
	},
	{
		id: "Ge",
		atomicNumber: 32,
		mass: 72.64,
		exactMass: 73.9211778,
		ionization: 7.8994,
		electronAffinity: 1.232712,
		electronegativityPauling: 2.01,
		nameOrigin: "Latin 'germania' is an old name for Germany",
		radiusCovalent: 1.22,
		radiusVDW: 2.1,
		boilingpoint: 3107,
		meltingpoint: 1211.5,
		periodTableBlock: "p",
		discoveryDate: "1886",
		period: "4",
		group: "4",
		electronicConfiguration: "Ar 3d10 4s2 4p2",
		family: "Metalloids",
		symbol: "Ge",
		name: "Germanium",
		elementColor: [
			0.4,
			0.56,
			0.56
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"C.",
			"A.",
			"Winkler"
		]
	},
	{
		id: "As",
		atomicNumber: 33,
		mass: 74.9216,
		exactMass: 74.9215965,
		ionization: 9.7886,
		electronAffinity: 0.814,
		electronegativityPauling: 2.18,
		nameOrigin: "Greek 'arsenikos' for 'male' or 'bold'",
		radiusCovalent: 1.19,
		radiusVDW: 2.05,
		boilingpoint: 876,
		meltingpoint: 1090,
		periodTableBlock: "p",
		discoveryDate: "0",
		period: "4",
		group: "5",
		electronicConfiguration: "Ar 3d10 4s2 4p3",
		family: "Metalloids",
		symbol: "As",
		name: "Arsenic",
		elementColor: [
			0.74,
			0.5,
			0.89
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "Se",
		atomicNumber: 34,
		mass: 78.96,
		exactMass: 79.9165213,
		ionization: 9.7524,
		electronAffinity: 2.02067,
		electronegativityPauling: 2.55,
		nameOrigin: "Greek 'selena' for 'moon'",
		radiusCovalent: 1.16,
		radiusVDW: 1.9,
		boilingpoint: 958,
		meltingpoint: 494,
		periodTableBlock: "p",
		discoveryDate: "1817",
		period: "4",
		group: "6",
		electronicConfiguration: "Ar 3d10 4s2 4p4",
		family: "Non-Metal",
		symbol: "Se",
		name: "Selenium",
		elementColor: [
			1,
			0.63,
			0
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"J.",
			"J.",
			"Berzelius"
		]
	},
	{
		id: "Br",
		atomicNumber: 35,
		mass: 79.904,
		exactMass: 78.9183371,
		ionization: 11.8138,
		electronAffinity: 3.363588,
		electronegativityPauling: 2.96,
		nameOrigin: "Greek 'bromos' for 'smells badly'",
		radiusCovalent: 1.14,
		radiusVDW: 1.9,
		boilingpoint: 331.85,
		meltingpoint: 265.95,
		periodTableBlock: "p",
		discoveryDate: "1826",
		period: "4",
		group: "7",
		electronicConfiguration: "Ar 3d10 4s2 4p5",
		family: "Halogen",
		symbol: "Br",
		name: "Bromine",
		elementColor: [
			0.65,
			0.16,
			0.16
		],
		discoveryCountry: [
			"fr"
		],
		discoverers: [
			"A.",
			"J.",
			"Balard"
		]
	},
	{
		id: "Kr",
		atomicNumber: 36,
		mass: 83.798,
		exactMass: 83.911507,
		ionization: 13.9996,
		electronAffinity: 0,
		electronegativityPauling: 3,
		nameOrigin: "Greek 'kryptos' for 'hidden'",
		radiusCovalent: 1.1,
		radiusVDW: 2.02,
		boilingpoint: 120.85,
		meltingpoint: 116,
		periodTableBlock: "p",
		discoveryDate: "1898",
		period: "4",
		group: "8",
		electronicConfiguration: "Ar 3d10 4s2 4p6",
		family: "Noblegas",
		symbol: "Kr",
		name: "Krypton",
		elementColor: [
			0.36,
			0.72,
			0.82
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"W. Ramsay",
			"M. W. Travers"
		]
	},
	{
		id: "Rb",
		atomicNumber: 37,
		mass: 85.4678,
		exactMass: 84.91178974,
		ionization: 4.1771,
		electronAffinity: 0.485916,
		electronegativityPauling: 0.82,
		nameOrigin: "Latin 'rubidus' for 'dark red'",
		radiusCovalent: 2.11,
		radiusVDW: 2.9,
		boilingpoint: 961,
		meltingpoint: 312.63,
		periodTableBlock: "s",
		discoveryDate: "1861",
		period: "5",
		group: "1",
		electronicConfiguration: "Kr 5s1",
		family: "Alkali_Earth",
		symbol: "Rb",
		name: "Rubidium",
		elementColor: [
			0.44,
			0.18,
			0.69
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"Robert W. Bunsen",
			"Gustav R. Kirchhoff"
		]
	},
	{
		id: "Sr",
		atomicNumber: 38,
		mass: 87.62,
		exactMass: 87.9056121,
		ionization: 5.6949,
		electronAffinity: 0.05206,
		electronegativityPauling: 0.95,
		nameOrigin: "Named after the mineral Strontianit",
		radiusCovalent: 1.92,
		radiusVDW: 2.55,
		boilingpoint: 1655,
		meltingpoint: 1042,
		periodTableBlock: "s",
		discoveryDate: "1790",
		period: "5",
		group: "2",
		electronicConfiguration: "Kr 5s2",
		family: "Alkaline_Earth",
		symbol: "Sr",
		name: "Strontium",
		elementColor: [
			0,
			1,
			0
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"H.",
			"B.",
			"Davy"
		]
	},
	{
		id: "Y",
		atomicNumber: 39,
		mass: 88.90585,
		exactMass: 88.9058483,
		ionization: 6.2173,
		electronAffinity: 0.307,
		electronegativityPauling: 1.22,
		nameOrigin: "Named after the small town of Ytterby near Stockholm in Sweden. Terbium. Ytterbium and Gadolinium are also named after this town.",
		radiusCovalent: 1.62,
		radiusVDW: 2.4,
		boilingpoint: 3611,
		meltingpoint: 1795,
		periodTableBlock: "d",
		discoveryDate: "1794",
		period: "5",
		group: "3",
		electronicConfiguration: "Kr 4d1 5s2",
		family: "Transition",
		symbol: "Y",
		name: "Yttrium",
		elementColor: [
			0.58,
			1,
			1
		],
		discoveryCountry: [
			"fi"
		],
		discoverers: [
			"Johann",
			"Gadolin"
		]
	},
	{
		id: "Zr",
		atomicNumber: 40,
		mass: 91.224,
		exactMass: 89.9047044,
		ionization: 6.6339,
		electronAffinity: 0.426,
		electronegativityPauling: 1.33,
		nameOrigin: "Named after the mineral zircon",
		radiusCovalent: 1.48,
		radiusVDW: 2.3,
		boilingpoint: 4682,
		meltingpoint: 2128,
		periodTableBlock: "d",
		discoveryDate: "1789",
		period: "5",
		group: "4",
		electronicConfiguration: "Kr 4d2 5s2",
		family: "Transition",
		symbol: "Zr",
		name: "Zirconium",
		elementColor: [
			0.58,
			0.88,
			0.88
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"Martin",
			"Heinrich",
			"Klaproth"
		]
	},
	{
		id: "Nb",
		atomicNumber: 41,
		mass: 92.90638,
		exactMass: 92.9063781,
		ionization: 6.7589,
		electronAffinity: 0.893,
		electronegativityPauling: 1.6,
		nameOrigin: "Named after Niobe, the daughter of the Greek god Tantalus.",
		radiusCovalent: 1.37,
		radiusVDW: 2.15,
		boilingpoint: 5015,
		meltingpoint: 2742,
		periodTableBlock: "d",
		discoveryDate: "1801",
		period: "5",
		group: "5",
		electronicConfiguration: "Kr 4d4",
		family: "Transition",
		symbol: "Nb",
		name: "Niobium",
		elementColor: [
			0.45,
			0.76,
			0.79
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"Ch.",
			"Hatchett"
		]
	},
	{
		id: "Mo",
		atomicNumber: 42,
		mass: 95.96,
		exactMass: 97.9054082,
		ionization: 7.0924,
		electronAffinity: 0.7472,
		electronegativityPauling: 2.16,
		nameOrigin: "This name has Greek roots. It means 'like Platinum' - it was difficult to distinguish Molybdenum from Platinum.",
		radiusCovalent: 1.45,
		radiusVDW: 2.1,
		boilingpoint: 4912,
		meltingpoint: 2896,
		periodTableBlock: "d",
		discoveryDate: "1778",
		period: "5",
		group: "6",
		electronicConfiguration: "Kr 4d5 5s1",
		family: "Transition",
		symbol: "Mo",
		name: "Molybdenum",
		elementColor: [
			0.33,
			0.71,
			0.71
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"C.",
			"W.",
			"Scheele"
		]
	},
	{
		id: "Tc",
		atomicNumber: 43,
		mass: 98,
		exactMass: 97.907216,
		ionization: 7.28,
		electronAffinity: 0.55,
		electronegativityPauling: 1.9,
		nameOrigin: "Greek 'technetos' for artificial",
		radiusCovalent: 1.56,
		radiusVDW: 2.05,
		boilingpoint: 4538,
		meltingpoint: 2477,
		periodTableBlock: "d",
		discoveryDate: "1937",
		period: "5",
		group: "7",
		electronicConfiguration: "Kr 4d6 5s1",
		family: "Transition",
		symbol: "Tc",
		name: "Technetium",
		elementColor: [
			0.23,
			0.62,
			0.62
		],
		discoveryCountry: [
			"it"
		],
		discoverers: [
			"C. Perrier",
			"E. G. Segre"
		]
	},
	{
		id: "Ru",
		atomicNumber: 44,
		mass: 101.07,
		exactMass: 101.9043493,
		ionization: 7.3605,
		electronAffinity: 1.04638,
		electronegativityPauling: 2.2,
		nameOrigin: "Ruthenia is the old name of Russia",
		radiusCovalent: 1.26,
		radiusVDW: 2.05,
		boilingpoint: 4425,
		meltingpoint: 2610,
		periodTableBlock: "d",
		discoveryDate: "1844",
		period: "5",
		group: "8",
		electronicConfiguration: "Kr 4d7 5s1",
		family: "Transition",
		symbol: "Ru",
		name: "Ruthenium",
		elementColor: [
			0.14,
			0.56,
			0.56
		],
		discoveryCountry: [
			"ru"
		],
		discoverers: [
			"K.",
			"Klaus"
		]
	},
	{
		id: "Rh",
		atomicNumber: 45,
		mass: 102.9055,
		exactMass: 102.905504,
		ionization: 7.4589,
		electronAffinity: 1.14289,
		electronegativityPauling: 2.28,
		nameOrigin: "Greek 'rhodeos' means 'red like a rose'",
		radiusCovalent: 1.35,
		radiusVDW: 2,
		boilingpoint: 3970,
		meltingpoint: 2236,
		periodTableBlock: "d",
		discoveryDate: "1803",
		period: "5",
		group: "8",
		electronicConfiguration: "Kr 4d8 5s1",
		family: "Transition",
		symbol: "Rh",
		name: "Rhodium",
		elementColor: [
			0.04,
			0.49,
			0.55
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"W.",
			"Wollaston"
		]
	},
	{
		id: "Pd",
		atomicNumber: 46,
		mass: 106.42,
		exactMass: 105.903486,
		ionization: 8.3369,
		electronAffinity: 0.56214,
		electronegativityPauling: 2.2,
		nameOrigin: "Named after the asteroid Pallas",
		radiusCovalent: 1.31,
		radiusVDW: 2.05,
		boilingpoint: 3240,
		meltingpoint: 1825,
		periodTableBlock: "d",
		discoveryDate: "1803",
		period: "5",
		group: "8",
		electronicConfiguration: "Kr 4d10",
		family: "Transition",
		symbol: "Pd",
		name: "Palladium",
		elementColor: [
			0,
			0.41,
			0.52
		],
		discoveryCountry: [
			"uk"
		]
	},
	{
		id: "Ag",
		atomicNumber: 47,
		mass: 107.8682,
		exactMass: 106.905097,
		ionization: 7.5762,
		electronAffinity: 1.30447,
		electronegativityPauling: 1.93,
		nameOrigin: "Latin 'argentum' for silver",
		radiusCovalent: 1.53,
		radiusVDW: 2.1,
		boilingpoint: 2436,
		meltingpoint: 1235.1,
		periodTableBlock: "d",
		discoveryDate: "0",
		period: "5",
		group: "1",
		electronicConfiguration: "Kr 4d10 5s1",
		family: "Transition",
		symbol: "Ag",
		name: "Silver",
		elementColor: [
			0.88,
			0.88,
			1
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "Cd",
		atomicNumber: 48,
		mass: 112.411,
		exactMass: 113.9033585,
		ionization: 8.9938,
		electronAffinity: 0,
		electronegativityPauling: 1.69,
		nameOrigin: "Greek 'kadmia' ('Galmei' = Zinc carbonate)",
		radiusCovalent: 1.48,
		radiusVDW: 2.2,
		boilingpoint: 1040,
		meltingpoint: 594.26,
		periodTableBlock: "d",
		discoveryDate: "1817",
		period: "5",
		group: "2",
		electronicConfiguration: "Kr 4d10 5s2",
		family: "Transition",
		symbol: "Cd",
		name: "Cadmium",
		elementColor: [
			1,
			0.85,
			0.56
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"F.",
			"Stromeyer"
		]
	},
	{
		id: "In",
		atomicNumber: 49,
		mass: 114.818,
		exactMass: 114.903878,
		ionization: 5.7864,
		electronAffinity: 0.404,
		electronegativityPauling: 1.78,
		nameOrigin: "Named after 'Indigo' because of its blue spectrum",
		radiusCovalent: 1.44,
		radiusVDW: 2.2,
		boilingpoint: 2350,
		meltingpoint: 429.78,
		periodTableBlock: "p",
		discoveryDate: "1863",
		period: "5",
		group: "3",
		electronicConfiguration: "Kr 4d10 5s2 5p1",
		family: "Other_Metal",
		symbol: "In",
		name: "Indium",
		elementColor: [
			0.65,
			0.46,
			0.45
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"F. Reich",
			"H.T. Richter"
		]
	},
	{
		id: "Sn",
		atomicNumber: 50,
		mass: 118.71,
		exactMass: 119.9021947,
		ionization: 7.3439,
		electronAffinity: 1.112066,
		electronegativityPauling: 1.96,
		nameOrigin: "Latin 'stannum' for tin",
		radiusCovalent: 1.41,
		radiusVDW: 2.25,
		boilingpoint: 2876,
		meltingpoint: 505.12,
		periodTableBlock: "p",
		discoveryDate: "0",
		period: "5",
		group: "4",
		electronicConfiguration: "Kr 4d10 5s2 5p2",
		family: "Other_Metal",
		symbol: "Sn",
		name: "Tin",
		elementColor: [
			0.4,
			0.5,
			0.5
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "Sb",
		atomicNumber: 51,
		mass: 121.76,
		exactMass: 120.9038157,
		ionization: 8.6084,
		electronAffinity: 1.047401,
		electronegativityPauling: 2.05,
		nameOrigin: "Arabic 'anthos ammonos' for 'blossom of the god Ammon'",
		radiusCovalent: 1.38,
		radiusVDW: 2.2,
		boilingpoint: 1860,
		meltingpoint: 903.91,
		periodTableBlock: "p",
		discoveryDate: "0",
		period: "5",
		group: "5",
		electronicConfiguration: "Kr 4d10 5s2 5p3",
		family: "Metalloids",
		symbol: "Sb",
		name: "Antimony",
		elementColor: [
			0.62,
			0.39,
			0.71
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "Te",
		atomicNumber: 52,
		mass: 127.6,
		exactMass: 129.9062244,
		ionization: 9.0096,
		electronAffinity: 1.970875,
		electronegativityPauling: 2.1,
		nameOrigin: "Latin 'tellus' or 'telluris' for 'Planet Earth'",
		radiusCovalent: 1.35,
		radiusVDW: 2.1,
		boilingpoint: 1261,
		meltingpoint: 722.72,
		periodTableBlock: "p",
		discoveryDate: "1782",
		period: "5",
		group: "6",
		electronicConfiguration: "Kr 4d10 5s2 5p4",
		family: "Metalloids",
		symbol: "Te",
		name: "Tellurium",
		elementColor: [
			0.83,
			0.48,
			0
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"Franz",
			"Joseph",
			"Muller",
			"von",
			"Reichstein"
		]
	},
	{
		id: "I",
		atomicNumber: 53,
		mass: 126.90447,
		exactMass: 126.904473,
		ionization: 10.4513,
		electronAffinity: 3.059038,
		electronegativityPauling: 2.66,
		nameOrigin: "Greek 'ioeides' for 'violet'.",
		radiusCovalent: 1.33,
		radiusVDW: 2.1,
		boilingpoint: 457.5,
		meltingpoint: 386.7,
		periodTableBlock: "p",
		discoveryDate: "1811",
		period: "5",
		group: "7",
		electronicConfiguration: "Kr 4d10 5s2 5p5",
		family: "Halogen",
		symbol: "I",
		name: "Iodine",
		elementColor: [
			0.58,
			0,
			0.58
		],
		discoveryCountry: [
			"fr"
		],
		discoverers: [
			"Bernard",
			"Courtois"
		]
	},
	{
		id: "Xe",
		atomicNumber: 54,
		mass: 131.293,
		exactMass: 131.9041535,
		ionization: 12.1298,
		electronAffinity: 0,
		electronegativityPauling: 2.6,
		nameOrigin: "Greek 'xenos' for 'foreigner'",
		radiusCovalent: 1.3,
		radiusVDW: 2.16,
		boilingpoint: 165.1,
		meltingpoint: 161.39,
		periodTableBlock: "p",
		discoveryDate: "1898",
		period: "5",
		group: "8",
		electronicConfiguration: "Kr 4d10 5s2 5p6",
		family: "Noblegas",
		symbol: "Xe",
		name: "Xenon",
		elementColor: [
			0.26,
			0.62,
			0.69
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"W. Ramsay",
			"M. W. Travers"
		]
	},
	{
		id: "Cs",
		atomicNumber: 55,
		mass: 132.9054519,
		exactMass: 132.9054519,
		ionization: 3.8939,
		electronAffinity: 0.471626,
		electronegativityPauling: 0.79,
		nameOrigin: "Latin 'caesius' for 'heaven blue'.",
		radiusCovalent: 2.25,
		radiusVDW: 3,
		boilingpoint: 944,
		meltingpoint: 301.54,
		periodTableBlock: "s",
		discoveryDate: "1860",
		period: "6",
		group: "1",
		electronicConfiguration: "Xe 6s1",
		family: "Alkali_Earth",
		symbol: "Cs",
		name: "Caesium",
		elementColor: [
			0.34,
			0.09,
			0.56
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"Robert Wilhelm Bunsen",
			"Gustav Robert Kirchhoff"
		]
	},
	{
		id: "Ba",
		atomicNumber: 56,
		mass: 137.327,
		exactMass: 137.9052472,
		ionization: 5.2117,
		electronAffinity: 0.14462,
		electronegativityPauling: 0.89,
		nameOrigin: "Greek 'barys' for 'heavy'",
		radiusCovalent: 1.98,
		radiusVDW: 2.7,
		boilingpoint: 2078,
		meltingpoint: 1002,
		periodTableBlock: "s",
		discoveryDate: "1808",
		period: "6",
		group: "2",
		electronicConfiguration: "Xe 6s2",
		family: "Alkaline_Earth",
		symbol: "Ba",
		name: "Barium",
		elementColor: [
			0,
			0.79,
			0
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"Humphry",
			"Bartholomew",
			"Davy"
		]
	},
	{
		id: "La",
		atomicNumber: 57,
		mass: 138.90547,
		exactMass: 138.9063533,
		ionization: 5.5769,
		electronAffinity: 0.47,
		electronegativityPauling: 1.1,
		nameOrigin: "Greek 'lanthanein' for 'hidden'. The Lanthanoids are also called the 'rare earth' elements.",
		radiusCovalent: 1.69,
		radiusVDW: 2.5,
		boilingpoint: 3737,
		meltingpoint: 1191,
		periodTableBlock: "f",
		discoveryDate: "1839",
		period: "6",
		group: "3",
		electronicConfiguration: "Xe 5d1 6s2",
		family: "Rare_Earth",
		symbol: "La",
		name: "Lanthanum",
		elementColor: [
			0.44,
			0.83,
			1
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"K.",
			"G.",
			"Mosander"
		]
	},
	{
		id: "Ce",
		atomicNumber: 58,
		mass: 140.116,
		exactMass: 139.9054387,
		ionization: 5.5387,
		electronAffinity: 0.5,
		electronegativityPauling: 1.12,
		nameOrigin: "Named after the planetoid Ceres",
		radiusVDW: 2.48,
		boilingpoint: 3715,
		meltingpoint: 1071,
		periodTableBlock: "f",
		discoveryDate: "1803",
		period: "6",
		group: "4",
		electronicConfiguration: "Xe 4f1 5d1 6s2",
		family: "Rare_Earth",
		symbol: "Ce",
		name: "Cerium",
		elementColor: [
			1,
			1,
			0.78
		],
		discoverers: [
			"Jöns Jacob Berzelius",
			"W. Hisinger",
			"M. Klaproth"
		]
	},
	{
		id: "Pr",
		atomicNumber: 59,
		mass: 140.90765,
		exactMass: 140.9076528,
		ionization: 5.473,
		electronAffinity: 0.5,
		electronegativityPauling: 1.13,
		nameOrigin: "Greek 'prasinos didymos' for 'green twin'",
		radiusVDW: 2.47,
		boilingpoint: 3785,
		meltingpoint: 1204,
		periodTableBlock: "f",
		discoveryDate: "1885",
		period: "6",
		group: "5",
		electronicConfiguration: "Xe 4f3 6s2",
		family: "Rare_Earth",
		symbol: "Pr",
		name: "Praseodymium",
		elementColor: [
			0.85,
			1,
			0.78
		],
		discoverers: [
			"Carl",
			"F.",
			"Auer",
			"von",
			"Welsbach"
		]
	},
	{
		id: "Nd",
		atomicNumber: 60,
		mass: 144.242,
		exactMass: 141.9077233,
		ionization: 5.525,
		electronAffinity: 0.5,
		electronegativityPauling: 1.14,
		nameOrigin: "Greek 'neos didymos' for 'new twin'",
		radiusVDW: 2.45,
		boilingpoint: 3347,
		meltingpoint: 1294,
		periodTableBlock: "f",
		discoveryDate: "1885",
		period: "6",
		group: "6",
		electronicConfiguration: "Xe 4f4 6s2",
		family: "Rare_Earth",
		symbol: "Nd",
		name: "Neodymium",
		elementColor: [
			0.78,
			1,
			0.78
		],
		discoverers: [
			"Carl",
			"F.",
			"Auer",
			"von",
			"Welsbach"
		]
	},
	{
		id: "Pm",
		atomicNumber: 61,
		mass: 145,
		exactMass: 144.912749,
		ionization: 5.582,
		electronAffinity: 0.5,
		nameOrigin: "Named after the Greek Prometheus. Prometheus stole the fire from the gods and gave it to mankind.",
		radiusVDW: 2.43,
		boilingpoint: 3273,
		meltingpoint: 1315,
		periodTableBlock: "f",
		discoveryDate: "1945",
		period: "6",
		group: "7",
		electronicConfiguration: "Xe 4f5 6s2",
		family: "Rare_Earth",
		symbol: "Pm",
		name: "Promethium",
		elementColor: [
			0.64,
			1,
			0.78
		],
		discoverers: [
			"J. A. Marinsky",
			"C. D. Coryell",
			"L. E. Glendenin"
		]
	},
	{
		id: "Sm",
		atomicNumber: 62,
		mass: 150.36,
		exactMass: 151.9197324,
		ionization: 5.6437,
		electronAffinity: 0.5,
		electronegativityPauling: 1.17,
		nameOrigin: "Named after the mineral Samarskit",
		radiusVDW: 2.42,
		boilingpoint: 2067,
		meltingpoint: 1347,
		periodTableBlock: "f",
		discoveryDate: "1879",
		period: "6",
		group: "8",
		electronicConfiguration: "Xe 4f6 6s2",
		family: "Rare_Earth",
		symbol: "Sm",
		name: "Samarium",
		elementColor: [
			0.56,
			1,
			0.78
		],
		discoverers: [
			"P.",
			"Lecoq",
			"de",
			"Boisbaudran"
		]
	},
	{
		id: "Eu",
		atomicNumber: 63,
		mass: 151.964,
		exactMass: 152.9212303,
		ionization: 5.6704,
		electronAffinity: 0.5,
		nameOrigin: "Named after Europe",
		radiusVDW: 2.4,
		boilingpoint: 1800,
		meltingpoint: 1095,
		periodTableBlock: "f",
		discoveryDate: "1901",
		period: "6",
		group: "8",
		electronicConfiguration: "Xe 4f7 6s2",
		family: "Rare_Earth",
		symbol: "Eu",
		name: "Europium",
		elementColor: [
			0.38,
			1,
			0.78
		],
		discoverers: [
			"E.",
			"A.",
			"Demarcay"
		]
	},
	{
		id: "Gd",
		atomicNumber: 64,
		mass: 157.25,
		exactMass: 157.9241039,
		ionization: 6.1498,
		electronAffinity: 0.5,
		electronegativityPauling: 1.2,
		nameOrigin: "Named after the Finnish chemist Johan Gadolin",
		radiusVDW: 2.38,
		boilingpoint: 3545,
		meltingpoint: 1585,
		periodTableBlock: "f",
		discoveryDate: "1880",
		period: "6",
		group: "8",
		electronicConfiguration: "Xe 4f7 5d1 6s2",
		family: "Rare_Earth",
		symbol: "Gd",
		name: "Gadolinium",
		elementColor: [
			0.27,
			1,
			0.78
		],
		discoverers: [
			"Jean",
			"de",
			"Marignac"
		]
	},
	{
		id: "Tb",
		atomicNumber: 65,
		mass: 158.92535,
		exactMass: 158.9253468,
		ionization: 5.8638,
		electronAffinity: 0.5,
		nameOrigin: "Named after the Swedish town of Ytterby",
		radiusVDW: 2.37,
		boilingpoint: 3500,
		meltingpoint: 1629,
		periodTableBlock: "f",
		discoveryDate: "1843",
		period: "6",
		group: "1",
		electronicConfiguration: "Xe 4f9 6s2",
		family: "Rare_Earth",
		symbol: "Tb",
		name: "Terbium",
		elementColor: [
			0.19,
			1,
			0.78
		],
		discoverers: [
			"K.",
			"G.",
			"Mosander"
		]
	},
	{
		id: "Dy",
		atomicNumber: 66,
		mass: 162.5,
		exactMass: 163.9291748,
		ionization: 5.9389,
		electronAffinity: 0.5,
		electronegativityPauling: 1.22,
		nameOrigin: "Greek 'dysprositor' for 'difficult to reach'",
		radiusVDW: 2.35,
		boilingpoint: 2840,
		meltingpoint: 1685,
		periodTableBlock: "f",
		discoveryDate: "1886",
		period: "6",
		group: "2",
		electronicConfiguration: "Xe 4f10 6s2",
		family: "Rare_Earth",
		symbol: "Dy",
		name: "Dysprosium",
		elementColor: [
			0.12,
			1,
			0.78
		],
		discoverers: [
			"F.",
			"E.",
			"Lecoq",
			"de",
			"Boisbaudran"
		]
	},
	{
		id: "Ho",
		atomicNumber: 67,
		mass: 164.93032,
		exactMass: 164.9303221,
		ionization: 6.0215,
		electronAffinity: 0.5,
		electronegativityPauling: 1.23,
		nameOrigin: "Latin 'holmia' for the old name of Stockholm",
		radiusVDW: 2.33,
		boilingpoint: 2968,
		meltingpoint: 1747,
		periodTableBlock: "f",
		discoveryDate: "1878",
		period: "6",
		group: "3",
		electronicConfiguration: "Xe 4f11 6s2",
		family: "Rare_Earth",
		symbol: "Ho",
		name: "Holmium",
		elementColor: [
			0,
			1,
			0.61
		],
		discoverers: [
			"J. L. Soret",
			"P.T. Cleve"
		]
	},
	{
		id: "Er",
		atomicNumber: 68,
		mass: 167.259,
		exactMass: 165.9302931,
		ionization: 6.1077,
		electronAffinity: 0.5,
		electronegativityPauling: 1.24,
		nameOrigin: "Named ofter the Swedish town of Ytterby. Terbium and Ytterbium are also named after this town.",
		radiusVDW: 2.32,
		boilingpoint: 3140,
		meltingpoint: 1802,
		periodTableBlock: "f",
		discoveryDate: "1843",
		period: "6",
		group: "4",
		electronicConfiguration: "Xe 4f12 6s2",
		family: "Rare_Earth",
		symbol: "Er",
		name: "Erbium",
		elementColor: [
			0,
			0.9,
			0.46
		],
		discoverers: [
			"K.",
			"G.",
			"Mosander"
		]
	},
	{
		id: "Tm",
		atomicNumber: 69,
		mass: 168.93421,
		exactMass: 168.9342133,
		ionization: 6.1843,
		electronAffinity: 0.5,
		electronegativityPauling: 1.25,
		nameOrigin: "Named after the old name of Scandinavia, 'Thule'.",
		radiusVDW: 2.3,
		boilingpoint: 2223,
		meltingpoint: 1818,
		periodTableBlock: "f",
		discoveryDate: "1879",
		period: "6",
		group: "5",
		electronicConfiguration: "Xe 4f13 6s2",
		family: "Rare_Earth",
		symbol: "Tm",
		name: "Thulium",
		elementColor: [
			0,
			0.83,
			0.32
		],
		discoverers: [
			"P.",
			"T.",
			"Cleve"
		]
	},
	{
		id: "Yb",
		atomicNumber: 70,
		mass: 173.054,
		exactMass: 173.9388621,
		ionization: 6.2542,
		electronAffinity: 0.5,
		nameOrigin: "Like Terbium and Gadolinium, this is named after the Swedish town of Ytterby.",
		radiusVDW: 2.28,
		boilingpoint: 1469,
		meltingpoint: 1092,
		periodTableBlock: "f",
		discoveryDate: "1878",
		period: "6",
		group: "6",
		electronicConfiguration: "Xe 4f14 6s2",
		family: "Rare_Earth",
		symbol: "Yb",
		name: "Ytterbium",
		elementColor: [
			0,
			0.75,
			0.22
		],
		discoverers: [
			"J.",
			"Ch.",
			"Marignac"
		]
	},
	{
		id: "Lu",
		atomicNumber: 71,
		mass: 174.9668,
		exactMass: 174.9407718,
		ionization: 5.4259,
		electronAffinity: 0.5,
		electronegativityPauling: 1.27,
		nameOrigin: "Named after the Roman name 'Lutetia' for Paris",
		radiusCovalent: 1.6,
		radiusVDW: 2.27,
		boilingpoint: 3668,
		meltingpoint: 1936,
		periodTableBlock: "f",
		discoveryDate: "1907",
		period: "6",
		group: "7",
		electronicConfiguration: "Xe 4f14 5d1 6s2",
		family: "Rare_Earth",
		symbol: "Lu",
		name: "Lutetium",
		elementColor: [
			0,
			0.67,
			0.14
		],
		discoverers: [
			"Carl F. Auer von Welsbach",
			"G. Urbain"
		]
	},
	{
		id: "Hf",
		atomicNumber: 72,
		mass: 178.49,
		exactMass: 179.94655,
		ionization: 6.8251,
		electronAffinity: 0,
		electronegativityPauling: 1.3,
		nameOrigin: "'Hafnia' is the old name of Kopenhagen (Denmark)",
		radiusCovalent: 1.5,
		radiusVDW: 2.25,
		boilingpoint: 4875,
		meltingpoint: 2504,
		periodTableBlock: "d",
		discoveryDate: "1923",
		period: "6",
		group: "4",
		electronicConfiguration: "Xe 4f14 5d2 6s2",
		family: "Transition",
		symbol: "Hf",
		name: "Hafnium",
		elementColor: [
			0.3,
			0.76,
			1
		],
		discoveryCountry: [
			"dk"
		],
		discoverers: [
			"D. Coster",
			"G. Hevesy"
		]
	},
	{
		id: "Ta",
		atomicNumber: 73,
		mass: 180.94788,
		exactMass: 180.9479958,
		ionization: 7.5496,
		electronAffinity: 0.322,
		electronegativityPauling: 1.5,
		nameOrigin: "Named after the Greek myth of Tantalos",
		radiusCovalent: 1.38,
		radiusVDW: 2.2,
		boilingpoint: 5730,
		meltingpoint: 3293,
		periodTableBlock: "d",
		discoveryDate: "1802",
		period: "6",
		group: "5",
		electronicConfiguration: "Xe 4f14 5d3 6s2",
		family: "Transition",
		symbol: "Ta",
		name: "Tantalum",
		elementColor: [
			0.3,
			0.65,
			1
		],
		discoveryCountry: [
			"se"
		],
		discoverers: [
			"A.",
			"Ekeberg"
		]
	},
	{
		id: "W",
		atomicNumber: 74,
		mass: 183.84,
		exactMass: 183.9509312,
		ionization: 7.864,
		electronAffinity: 0.815,
		electronegativityPauling: 2.36,
		nameOrigin: "'tung sten' means 'heavy stone' in Swedish. The old name (and thus the symbol 'W') was Wolfram, named after a mineral.",
		radiusCovalent: 1.46,
		radiusVDW: 2.1,
		boilingpoint: 5825,
		meltingpoint: 3695,
		periodTableBlock: "d",
		discoveryDate: "1783",
		period: "6",
		group: "6",
		electronicConfiguration: "Xe 4f14 5d4 6s2",
		family: "Transition",
		symbol: "W",
		name: "Tungsten",
		elementColor: [
			0.13,
			0.58,
			0.84
		],
		discoveryCountry: [
			"es"
		],
		discoverers: [
			"C.",
			"W.",
			"Scheele"
		]
	},
	{
		id: "Re",
		atomicNumber: 75,
		mass: 186.207,
		exactMass: 186.9557531,
		ionization: 7.8335,
		electronAffinity: 0.15,
		electronegativityPauling: 1.9,
		nameOrigin: "Named after the German river Rhine (latin 'Rhenium').",
		radiusCovalent: 1.59,
		radiusVDW: 2.05,
		boilingpoint: 5870,
		meltingpoint: 3455,
		periodTableBlock: "d",
		discoveryDate: "1925",
		period: "6",
		group: "7",
		electronicConfiguration: "Xe 4f14 5d5 6s2",
		family: "Transition",
		symbol: "Re",
		name: "Rhenium",
		elementColor: [
			0.15,
			0.49,
			0.67
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"Walter Noddack",
			"Ida Tacke-Noddack",
			"Otto Berg"
		]
	},
	{
		id: "Os",
		atomicNumber: 76,
		mass: 190.23,
		exactMass: 191.9614807,
		ionization: 8.4382,
		electronAffinity: 1.0778,
		electronegativityPauling: 2.2,
		nameOrigin: "Greek for 'smell'. Its oxides smell strongly like radishes.",
		radiusCovalent: 1.28,
		radiusVDW: 2,
		boilingpoint: 5300,
		meltingpoint: 3300,
		periodTableBlock: "d",
		discoveryDate: "1804",
		period: "6",
		group: "8",
		electronicConfiguration: "Xe 4f14 5d6 6s2",
		family: "Transition",
		symbol: "Os",
		name: "Osmium",
		elementColor: [
			0.15,
			0.4,
			0.59
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"S.",
			"Tennant"
		]
	},
	{
		id: "Ir",
		atomicNumber: 77,
		mass: 192.217,
		exactMass: 192.9629264,
		ionization: 8.967,
		electronAffinity: 1.56436,
		electronegativityPauling: 2.2,
		nameOrigin: "Greek 'iris' for 'rainbow'",
		radiusCovalent: 1.37,
		radiusVDW: 2,
		boilingpoint: 4700,
		meltingpoint: 2720,
		periodTableBlock: "d",
		discoveryDate: "1804",
		period: "6",
		group: "8",
		electronicConfiguration: "Xe 4f14 5d7 6s2",
		family: "Transition",
		symbol: "Ir",
		name: "Iridium",
		elementColor: [
			0.09,
			0.33,
			0.53
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"S.",
			"Tennant"
		]
	},
	{
		id: "Pt",
		atomicNumber: 78,
		mass: 195.084,
		exactMass: 194.9647911,
		ionization: 8.9588,
		electronAffinity: 2.1251,
		electronegativityPauling: 2.28,
		nameOrigin: "Spanish 'platina' means 'small silver'",
		radiusCovalent: 1.28,
		radiusVDW: 2.05,
		boilingpoint: 4100,
		meltingpoint: 2042.1,
		periodTableBlock: "d",
		discoveryDate: "1735",
		period: "6",
		group: "8",
		electronicConfiguration: "Xe 4f14 5d9 6s1",
		family: "Transition",
		symbol: "Pt",
		name: "Platinum",
		elementColor: [
			0.96,
			0.93,
			0.82
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"A.",
			"de",
			"Ulloa"
		]
	},
	{
		id: "Au",
		atomicNumber: 79,
		mass: 196.966569,
		exactMass: 196.9665687,
		ionization: 9.2255,
		electronAffinity: 2.30861,
		electronegativityPauling: 2.54,
		nameOrigin: "Latin 'aurum'. Named after Aurora, the goddess of sunrise",
		radiusCovalent: 1.44,
		radiusVDW: 2.1,
		boilingpoint: 3130,
		meltingpoint: 1337.58,
		periodTableBlock: "d",
		discoveryDate: "0",
		period: "6",
		group: "1",
		electronicConfiguration: "Xe 4f14 5d10 6s1",
		family: "Transition",
		symbol: "Au",
		name: "Gold",
		elementColor: [
			0.8,
			0.82,
			0.12
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "Hg",
		atomicNumber: 80,
		mass: 200.59,
		exactMass: 201.970643,
		ionization: 10.4375,
		electronAffinity: 0,
		electronegativityPauling: 2,
		nameOrigin: "Graeco-Latin 'hydrargyrum' for 'liquid silver'",
		radiusCovalent: 1.49,
		radiusVDW: 2.05,
		boilingpoint: 629.88,
		meltingpoint: 234.31,
		periodTableBlock: "d",
		discoveryDate: "0",
		period: "6",
		group: "2",
		electronicConfiguration: "Xe 4f14 5d10 6s2",
		family: "Transition",
		symbol: "Hg",
		name: "Mercury",
		elementColor: [
			0.71,
			0.71,
			0.76
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "Tl",
		atomicNumber: 81,
		mass: 204.3833,
		exactMass: 204.9744275,
		ionization: 6.1082,
		electronAffinity: 0.377,
		electronegativityPauling: 1.62,
		nameOrigin: "Greek 'tallos' for 'young twig'",
		radiusCovalent: 1.48,
		radiusVDW: 2.2,
		boilingpoint: 1746,
		meltingpoint: 577,
		periodTableBlock: "p",
		discoveryDate: "1861",
		period: "6",
		group: "3",
		electronicConfiguration: "Xe 4f14 5d10 6s2 6p1",
		family: "Other_Metal",
		symbol: "Tl",
		name: "Thallium",
		elementColor: [
			0.65,
			0.33,
			0.3
		],
		discoveryCountry: [
			"uk"
		],
		discoverers: [
			"W.",
			"Crookes"
		]
	},
	{
		id: "Pb",
		atomicNumber: 82,
		mass: 207.2,
		exactMass: 207.9766521,
		ionization: 7.4167,
		electronAffinity: 0.364,
		electronegativityPauling: 2.33,
		nameOrigin: "Latin 'plumbum' for Lead",
		radiusCovalent: 1.47,
		radiusVDW: 2.3,
		boilingpoint: 2023,
		meltingpoint: 600.65,
		periodTableBlock: "p",
		discoveryDate: "0",
		period: "6",
		group: "4",
		electronicConfiguration: "Xe 4f14 5d10 6s2 6p2",
		family: "Other_Metal",
		symbol: "Pb",
		name: "Lead",
		elementColor: [
			0.34,
			0.35,
			0.38
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "Bi",
		atomicNumber: 83,
		mass: 208.9804,
		exactMass: 208.9803987,
		ionization: 7.2855,
		electronAffinity: 0.942363,
		electronegativityPauling: 2.02,
		nameOrigin: "The old name of Bismuth is 'Wismut', which stood for 'white mass'.",
		radiusCovalent: 1.46,
		radiusVDW: 2.3,
		boilingpoint: 1837,
		meltingpoint: 544.59,
		periodTableBlock: "p",
		discoveryDate: "0",
		period: "6",
		group: "5",
		electronicConfiguration: "Xe 4f14 5d10 6s2 6p3",
		family: "Other_Metal",
		symbol: "Bi",
		name: "Bismuth",
		elementColor: [
			0.62,
			0.31,
			0.71
		],
		discoveryCountry: [
			"ancient"
		]
	},
	{
		id: "Po",
		atomicNumber: 84,
		mass: 209,
		exactMass: 208.9824304,
		ionization: 8.414,
		electronAffinity: 1.9,
		electronegativityPauling: 2,
		nameOrigin: "Named after Poland to honor Marie Curie",
		radiusVDW: 2,
		meltingpoint: 527,
		periodTableBlock: "p",
		discoveryDate: "1898",
		period: "6",
		group: "6",
		electronicConfiguration: "Xe 4f14 5d10 6s2 6p4",
		family: "Metalloids",
		symbol: "Po",
		name: "Polonium",
		elementColor: [
			0.67,
			0.36,
			0
		],
		discoveryCountry: [
			"fr"
		],
		discoverers: [
			"M. Sklodowska-Curie",
			"P. Curie"
		]
	},
	{
		id: "At",
		atomicNumber: 85,
		mass: 210,
		exactMass: 209.987148,
		ionization: 0,
		electronAffinity: 2.8,
		electronegativityPauling: 2.2,
		nameOrigin: "Greek 'astator' for 'changing'",
		radiusVDW: 2,
		boilingpoint: 610,
		meltingpoint: 575,
		periodTableBlock: "p",
		discoveryDate: "1940",
		period: "6",
		group: "7",
		electronicConfiguration: "Xe 4f14 5d10 6s2 6p5",
		family: "Halogen",
		symbol: "At",
		name: "Astatine",
		elementColor: [
			0.46,
			0.31,
			0.27
		],
		discoveryCountry: [
			"us"
		],
		discoverers: [
			"D. R. Corson",
			"K. R. McKenzie",
			"E. Segre"
		]
	},
	{
		id: "Rn",
		atomicNumber: 86,
		mass: 222,
		exactMass: 222.0175777,
		ionization: 10.7485,
		electronAffinity: 0,
		nameOrigin: "Named after Radium. It ends with 'on' to make it clear that it is a noble gas.",
		radiusCovalent: 1.45,
		radiusVDW: 2,
		boilingpoint: 211.4,
		meltingpoint: 202,
		periodTableBlock: "p",
		discoveryDate: "1898",
		period: "6",
		group: "8",
		electronicConfiguration: "Xe 4f14 5d10 6s2 6p6",
		family: "Noblegas",
		symbol: "Rn",
		name: "Radon",
		elementColor: [
			0.26,
			0.51,
			0.59
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"E.",
			"Dorn"
		]
	},
	{
		id: "Fr",
		atomicNumber: 87,
		mass: 223,
		exactMass: 223.0197359,
		ionization: 4.0727,
		electronegativityPauling: 0.7,
		nameOrigin: "Named after France to honor Marguerite Perey",
		radiusVDW: 2,
		boilingpoint: 950,
		meltingpoint: 300,
		periodTableBlock: "s",
		discoveryDate: "1939",
		period: "7",
		group: "1",
		electronicConfiguration: "Rn 7s1",
		family: "Alkali_Earth",
		symbol: "Fr",
		name: "Francium",
		elementColor: [
			0.26,
			0,
			0.4
		],
		discoveryCountry: [
			"fr"
		],
		discoverers: [
			"M.",
			"Perey"
		]
	},
	{
		id: "Ra",
		atomicNumber: 88,
		mass: 226,
		exactMass: 226.0254098,
		ionization: 5.2784,
		electronegativityPauling: 0.9,
		nameOrigin: "Latin 'radius' for 'beam', as it is radioactive",
		radiusVDW: 2,
		boilingpoint: 1413,
		meltingpoint: 973,
		periodTableBlock: "s",
		discoveryDate: "1898",
		period: "7",
		group: "2",
		electronicConfiguration: "Rn 7s2",
		family: "Alkaline_Earth",
		symbol: "Ra",
		name: "Radium",
		elementColor: [
			0,
			0.49,
			0
		],
		discoveryCountry: [
			"fr"
		],
		discoverers: [
			"M. Sklodowska-Curie",
			"P. Curie"
		]
	},
	{
		id: "Ac",
		atomicNumber: 89,
		mass: 227,
		exactMass: 227.0277521,
		ionization: 5.17,
		electronegativityPauling: 1.1,
		nameOrigin: "Greek 'aktis' for 'beam' - actinium is radioactive",
		radiusVDW: 2,
		boilingpoint: 3470,
		meltingpoint: 1324,
		periodTableBlock: "f",
		discoveryDate: "1899",
		period: "7",
		group: "3",
		electronicConfiguration: "Rn 6d1 7s2",
		family: "Other_Metal",
		symbol: "Ac",
		name: "Actinium",
		elementColor: [
			0.44,
			0.67,
			0.98
		],
		discoveryCountry: [
			"fr"
		],
		discoverers: [
			"A.",
			"L.",
			"Debierne"
		]
	},
	{
		id: "Th",
		atomicNumber: 90,
		mass: 232.03806,
		exactMass: 232.0380553,
		ionization: 6.3067,
		electronegativityPauling: 1.3,
		nameOrigin: "Named after the German god of thunder: Thor",
		radiusVDW: 2.4,
		boilingpoint: 5060,
		meltingpoint: 2028,
		periodTableBlock: "f",
		discoveryDate: "1828",
		period: "7",
		group: "4",
		electronicConfiguration: "Rn 6d2 7s2",
		family: "Other_Metal",
		symbol: "Th",
		name: "Thorium",
		elementColor: [
			0,
			0.73,
			1
		],
		discoverers: [
			"J.",
			"J.",
			"Berzelius"
		]
	},
	{
		id: "Pa",
		atomicNumber: 91,
		mass: 231.03588,
		exactMass: 231.035884,
		ionization: 5.89,
		electronegativityPauling: 1.5,
		nameOrigin: "Greek 'protos' for 'ancester'. Protactinium is before Actinium in the periodic table.",
		radiusVDW: 2,
		boilingpoint: 4300,
		meltingpoint: 1845,
		periodTableBlock: "f",
		discoveryDate: "1917",
		period: "7",
		group: "5",
		electronicConfiguration: "Rn 5f2 6d1 7s2",
		family: "Other_Metal",
		symbol: "Pa",
		name: "Protactinium",
		elementColor: [
			0,
			0.63,
			1
		],
		discoverers: [
			"O. Hahn",
			"L. Meitern",
			"W. Wollaston"
		]
	},
	{
		id: "U",
		atomicNumber: 92,
		mass: 238.02891,
		exactMass: 238.0507882,
		ionization: 6.1941,
		electronegativityPauling: 1.38,
		nameOrigin: "Greek 'ouranos' for 'heaven'. Named after the planet Uranus.",
		radiusVDW: 2.3,
		boilingpoint: 4407,
		meltingpoint: 1408,
		periodTableBlock: "f",
		discoveryDate: "1789",
		period: "7",
		group: "6",
		electronicConfiguration: "Rn 5f3 6d1 7s2",
		family: "Other_Metal",
		symbol: "U",
		name: "Uranium",
		elementColor: [
			0,
			0.56,
			1
		],
		discoverers: [
			"M.",
			"M.",
			"Klaproth"
		]
	},
	{
		id: "Np",
		atomicNumber: 93,
		mass: 237,
		exactMass: 237.0481734,
		ionization: 6.2657,
		electronegativityPauling: 1.36,
		nameOrigin: "Named after the planet Neptune.",
		radiusVDW: 2,
		boilingpoint: 4175,
		meltingpoint: 912,
		periodTableBlock: "f",
		discoveryDate: "1940",
		period: "7",
		group: "7",
		electronicConfiguration: "Rn 5f4 6d1 7s2",
		family: "Other_Metal",
		symbol: "Np",
		name: "Neptunium",
		elementColor: [
			0,
			0.5,
			1
		],
		discoverers: [
			"E. M. McMillan",
			"P. Aberson"
		]
	},
	{
		id: "Pu",
		atomicNumber: 94,
		mass: 244,
		exactMass: 244.064204,
		ionization: 6.026,
		electronegativityPauling: 1.28,
		nameOrigin: "Named after the planet Pluto.",
		radiusVDW: 2,
		boilingpoint: 3505,
		meltingpoint: 913,
		periodTableBlock: "f",
		discoveryDate: "1940",
		period: "7",
		group: "8",
		electronicConfiguration: "Rn 5f6 7s2",
		family: "Other_Metal",
		symbol: "Pu",
		name: "Plutonium",
		elementColor: [
			0,
			0.42,
			1
		],
		discoverers: [
			"Glenn T. Seaborg",
			"E. M. McMillan",
			"J. W. Kennedy",
			"A.C. Wahl"
		]
	},
	{
		id: "Am",
		atomicNumber: 95,
		mass: 243,
		exactMass: 243.0613811,
		ionization: 5.9738,
		electronegativityPauling: 1.3,
		nameOrigin: "Named after America.",
		radiusVDW: 2,
		boilingpoint: 2880,
		meltingpoint: 1449,
		periodTableBlock: "f",
		discoveryDate: "1945",
		period: "7",
		group: "8",
		electronicConfiguration: "Rn 5f7 7s2",
		family: "Other_Metal",
		symbol: "Am",
		name: "Americium",
		elementColor: [
			0.33,
			0.36,
			0.95
		],
		discoverers: [
			"Glenn T. Seaborg",
			"L. O. Morgan",
			"R. A. James",
			"A. Ghiors"
		]
	},
	{
		id: "Cm",
		atomicNumber: 96,
		mass: 247,
		exactMass: 247.070354,
		ionization: 5.9914,
		electronegativityPauling: 1.3,
		nameOrigin: "Named after Marie Curie.",
		radiusVDW: 2,
		boilingpoint: 3383,
		meltingpoint: 1620,
		periodTableBlock: "f",
		discoveryDate: "1944",
		period: "7",
		group: "8",
		electronicConfiguration: "Rn 5f7 6d1 7s2",
		family: "Other_Metal",
		symbol: "Cm",
		name: "Curium",
		elementColor: [
			0.47,
			0.36,
			0.89
		],
		discoverers: [
			"Glenn T. Seaborg",
			"R. A. James",
			"A. Ghiors"
		]
	},
	{
		id: "Bk",
		atomicNumber: 97,
		mass: 247,
		exactMass: 247.070307,
		ionization: 6.1979,
		electronegativityPauling: 1.3,
		nameOrigin: "Named after the town Berkeley where it was discovered.",
		radiusVDW: 2,
		boilingpoint: 983,
		meltingpoint: 1258,
		periodTableBlock: "f",
		discoveryDate: "1949",
		period: "7",
		group: "1",
		electronicConfiguration: "Rn 5f9 7s2",
		family: "Other_Metal",
		symbol: "Bk",
		name: "Berkelium",
		elementColor: [
			0.54,
			0.31,
			0.89
		],
		discoverers: [
			"Glenn T. Seaborg",
			"A. Ghiors",
			"S. G. Thompson"
		]
	},
	{
		id: "Cf",
		atomicNumber: 98,
		mass: 251,
		exactMass: 251.079587,
		ionization: 6.2817,
		electronegativityPauling: 1.3,
		nameOrigin: "Named after the US-State of California.",
		radiusVDW: 2,
		boilingpoint: 1173,
		meltingpoint: 1172,
		periodTableBlock: "f",
		discoveryDate: "1950",
		period: "7",
		group: "2",
		electronicConfiguration: "Rn 5f10 7s2",
		family: "Other_Metal",
		symbol: "Cf",
		name: "Californium",
		elementColor: [
			0.63,
			0.21,
			0.83
		],
		discoverers: [
			"Glenn T. Seaborg",
			"A. Ghiors",
			"S. G. Thompson"
		]
	},
	{
		id: "Es",
		atomicNumber: 99,
		mass: 252,
		exactMass: 252.08298,
		ionization: 6.42,
		electronegativityPauling: 1.3,
		nameOrigin: "Named after the scientist Albert Einstein.",
		radiusVDW: 2,
		meltingpoint: 1130,
		periodTableBlock: "f",
		discoveryDate: "1952",
		period: "7",
		group: "3",
		electronicConfiguration: "Rn 5f11 7s2",
		family: "Other_Metal",
		symbol: "Es",
		name: "Einsteinium",
		elementColor: [
			0.7,
			0.12,
			0.83
		],
		discoverers: [
			"Glenn T. Seaborg",
			"et al."
		]
	},
	{
		id: "Fm",
		atomicNumber: 100,
		mass: 257,
		exactMass: 257.095105,
		ionization: 6.5,
		electronegativityPauling: 1.3,
		nameOrigin: "Named after the scientist Enrico Fermi.",
		radiusVDW: 2,
		meltingpoint: 1800,
		periodTableBlock: "f",
		discoveryDate: "1953",
		period: "7",
		group: "4",
		electronicConfiguration: "Rn 5f12 7s2",
		family: "Other_Metal",
		symbol: "Fm",
		name: "Fermium",
		elementColor: [
			0.7,
			0.12,
			0.73
		],
		discoverers: [
			"Glenn T. Seaborg",
			"et al."
		]
	},
	{
		id: "Md",
		atomicNumber: 101,
		mass: 258,
		exactMass: 258.098431,
		ionization: 6.58,
		electronegativityPauling: 1.3,
		nameOrigin: "Named after the scientist D.I. Mendeleev.",
		radiusVDW: 2,
		meltingpoint: 1100,
		periodTableBlock: "f",
		discoveryDate: "1955",
		period: "7",
		group: "5",
		electronicConfiguration: "Rn 5f13 7s2",
		family: "Other_Metal",
		symbol: "Md",
		name: "Mendelevium",
		elementColor: [
			0.7,
			0.05,
			0.65
		],
		discoverers: [
			"Glenn T. Seaborg",
			"Albert Ghiorso",
			"Bernard Harvey",
			"Gregory Choppin",
			"Stanley G. Thompson"
		]
	},
	{
		id: "No",
		atomicNumber: 102,
		mass: 259,
		exactMass: 259.10103,
		ionization: 6.65,
		electronegativityPauling: 1.3,
		nameOrigin: "Named after the scientist Alfred Nobel.",
		radiusVDW: 2,
		meltingpoint: 1100,
		periodTableBlock: "f",
		discoveryDate: "1958",
		period: "7",
		group: "6",
		electronicConfiguration: "Rn 5f14 7s2",
		family: "Other_Metal",
		symbol: "No",
		name: "Nobelium",
		elementColor: [
			0.74,
			0.05,
			0.53
		]
	},
	{
		id: "Lr",
		atomicNumber: 103,
		mass: 262,
		exactMass: 262.10963,
		ionization: 4.9,
		nameOrigin: "Named after the scientist Ernest Orlando Lawrence.",
		radiusVDW: 2,
		meltingpoint: 1900,
		periodTableBlock: "f",
		discoveryDate: "1961",
		period: "7",
		group: "7",
		electronicConfiguration: "Rn 5f14 7s2 7p1",
		family: "Other_Metal",
		symbol: "Lr",
		name: "Lawrencium",
		elementColor: [
			0.78,
			0,
			0.4
		],
		discoverers: [
			"Albert Ghiorso",
			"Torbjorn Sikkeland",
			"Almon Larsh",
			"Robert M. Latimer"
		]
	},
	{
		id: "Rf",
		atomicNumber: 104,
		mass: 267,
		exactMass: 261.10877,
		ionization: 6,
		nameOrigin: "Named after the scientist Ernest Rutherford",
		radiusVDW: 2,
		periodTableBlock: "d",
		discoveryDate: "1964",
		period: "7",
		group: "4",
		electronicConfiguration: "Rn 5f14 6d2 7s2",
		family: "Transition",
		symbol: "Rf",
		name: "Rutherfordium",
		elementColor: [
			0.8,
			0,
			0.35
		],
		discoveryCountry: [
			"ru",
			"us"
		]
	},
	{
		id: "Db",
		atomicNumber: 105,
		mass: 268,
		exactMass: 262.11408,
		nameOrigin: "Named after the science-town Dubna in Russia",
		radiusVDW: 2,
		periodTableBlock: "d",
		discoveryDate: "1967",
		period: "7",
		group: "5",
		electronicConfiguration: "Rn 5f14 6d3 7s2",
		family: "Transition",
		symbol: "Db",
		name: "Dubnium",
		elementColor: [
			0.82,
			0,
			0.31
		],
		discoveryCountry: [
			"ru",
			"us"
		]
	},
	{
		id: "Sg",
		atomicNumber: 106,
		mass: 271,
		exactMass: 263.11832,
		nameOrigin: "Named after the scientist G. Theodore Seaborg.",
		radiusVDW: 2,
		periodTableBlock: "d",
		discoveryDate: "1974",
		period: "7",
		group: "6",
		family: "Transition",
		symbol: "Sg",
		name: "Seaborgium",
		elementColor: [
			0.85,
			0,
			0.27
		],
		discoveryCountry: [
			"ru",
			"us"
		],
		discoverers: [
			"Albert Ghiorso",
			"et al."
		]
	},
	{
		id: "Bh",
		atomicNumber: 107,
		mass: 272,
		exactMass: 264.1246,
		nameOrigin: "Named after the scientist Niels Bohr.",
		radiusVDW: 2,
		periodTableBlock: "d",
		discoveryDate: "1981",
		period: "7",
		group: "7",
		family: "Transition",
		symbol: "Bh",
		name: "Bohrium",
		elementColor: [
			0.88,
			0,
			0.22
		],
		discoveryCountry: [
			"ru"
		],
		discoverers: [
			"Peter Armbruster",
			"Gottfried Münzenber",
			"et al."
		]
	},
	{
		id: "Hs",
		atomicNumber: 108,
		mass: 270,
		exactMass: 265.13009,
		nameOrigin: "Latin 'hassia' for the German county Hessen. In Hessen a lot elements have been discovered.",
		radiusVDW: 2,
		periodTableBlock: "d",
		discoveryDate: "1984",
		period: "7",
		group: "8",
		family: "Transition",
		symbol: "Hs",
		name: "Hassium",
		elementColor: [
			0.9,
			0,
			0.18
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"Peter Armbruster",
			"Gottfried Münzenber",
			"et al."
		]
	},
	{
		id: "Mt",
		atomicNumber: 109,
		mass: 276,
		exactMass: 268.13873,
		nameOrigin: "Named after the scientist Lise Meitner.",
		radiusVDW: 2,
		periodTableBlock: "d",
		discoveryDate: "1982",
		period: "7",
		group: "8",
		family: "Transition",
		symbol: "Mt",
		name: "Meitnerium",
		elementColor: [
			0.91,
			0,
			0.15
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"Peter Armbruster",
			"Gottfried Münzenber",
			"et al."
		]
	},
	{
		id: "Ds",
		atomicNumber: 110,
		mass: 281,
		exactMass: 271.14606,
		nameOrigin: "Named after the German city Darmstadt where many elements have been discovered.",
		periodTableBlock: "d",
		discoveryDate: "1994",
		period: "7",
		group: "8",
		family: "Transition",
		symbol: "Ds",
		name: "Darmstadtium",
		elementColor: [
			0.92,
			0,
			0.14
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"S. Hofmann",
			"V. Ninov",
			"F. P. Hessberger",
			"P. Armbruster",
			"H. Folger",
			"G. Münzenberg",
			"H. J. Schött",
			"et al."
		]
	},
	{
		id: "Rg",
		atomicNumber: 111,
		mass: 280,
		exactMass: 272.15362,
		nameOrigin: "Named after Wilhelm Conrad Röntgen.",
		periodTableBlock: "d",
		discoveryDate: "1994",
		period: "7",
		group: "1",
		family: "Transition",
		symbol: "Rg",
		name: "Roentgenium",
		elementColor: [
			0.93,
			0,
			0.13
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"S. Hofmann",
			"V. Ninov",
			"F. P. Hessberger",
			"P. Armbruster",
			"H. Folger",
			"G. Münzenberg",
			"et al."
		]
	},
	{
		id: "Cn",
		atomicNumber: 112,
		mass: 285,
		exactMass: 285.17411,
		nameOrigin: "Historically known as eka-mercury. Ununbium is a temporary IUPAC systematic element name.",
		periodTableBlock: "d",
		discoveryDate: "1996",
		period: "7",
		family: "Transition",
		symbol: "Cn",
		name: "Copernicium",
		elementColor: [
			0.94,
			0,
			0.12
		],
		discoveryCountry: [
			"de"
		],
		discoverers: [
			"First",
			"created",
			"at",
			"the",
			"Gesellschaft",
			"für",
			"Schwerionenforschung"
		]
	},
	{
		id: "Uut",
		atomicNumber: 113,
		mass: 284,
		exactMass: 284.17808,
		nameOrigin: "Historically known as eka-thallium. Ununtrium is a temporary IUPAC systematic element name.",
		periodTableBlock: "p",
		discoveryDate: "2003",
		period: "7",
		family: "Other_Metal",
		symbol: "Uut",
		name: "Ununtrium",
		elementColor: [
			0.95,
			0,
			0.11
		],
		discoveryCountry: [
			"ru",
			"us"
		],
		discoverers: [
			"Russian scientists at Dubna (JINR)",
			"American scientists at the Lawrence Livermore National Laboratory."
		]
	},
	{
		id: "Uuq",
		atomicNumber: 114,
		mass: 289,
		exactMass: 289.18728,
		nameOrigin: "Historically known as eka-lead. Ununquadium is a temporary IUPAC systematic element name.",
		periodTableBlock: "p",
		discoveryDate: "1998",
		period: "7",
		family: "Other_Metal",
		symbol: "Uuq",
		name: "Ununquadium",
		elementColor: [
			0.96,
			0,
			0.1
		],
		discoveryCountry: [
			"ru",
			"us"
		],
		discoverers: [
			"Joint",
			"Institute",
			"for",
			"Nuclear",
			"Research"
		]
	},
	{
		id: "Uup",
		atomicNumber: 115,
		mass: 288,
		exactMass: 288.19249,
		nameOrigin: "Historically known as eka-bismuth. Ununpentium is a temporary IUPAC systematic element name.",
		periodTableBlock: "p",
		discoveryDate: "2004",
		period: "7",
		family: "Other_Metal",
		symbol: "Uup",
		name: "Ununpentium",
		elementColor: [
			0.97,
			0,
			0.09
		],
		discoveryCountry: [
			"ru",
			"us"
		],
		discoverers: [
			"Russian scientists at Dubna (JINR)",
			"American scientists at the Lawrence Livermore National Laboratory."
		]
	},
	{
		id: "Uuh",
		atomicNumber: 116,
		mass: 293,
		exactMass: 292.19979,
		nameOrigin: "Historically known as eka-polonium. Ununhexium is a temporary IUPAC systematic element name.",
		periodTableBlock: "p",
		discoveryDate: "2000",
		period: "7",
		family: "Other_Metal",
		symbol: "Uuh",
		name: "Ununhexium",
		elementColor: [
			0.98,
			0,
			0.08
		],
		discoveryCountry: [
			"ru"
		],
		discoverers: [
			"Joint",
			"Institute",
			"for",
			"Nuclear",
			"Research"
		]
	},
	{
		id: "Uus",
		atomicNumber: 117,
		nameOrigin: "Temporary symbol and name. Can also be referred to as eka-astatine.",
		periodTableBlock: "p",
		discoveryDate: "0",
		period: "7",
		family: "Halogen",
		symbol: "Uus",
		name: "Ununseptium",
		elementColor: [
			0.99,
			0,
			0.07
		]
	},
	{
		id: "Uuo",
		atomicNumber: 118,
		mass: 294,
		nameOrigin: "Historically known as eka-radon, eka-emanation before 1960. Ununoctium is a temporary IUPAC systematic element name.",
		periodTableBlock: "p",
		discoveryDate: "2002",
		period: "7",
		family: "Noblegas",
		symbol: "Uuo",
		name: "Ununoctium",
		elementColor: [
			1,
			0,
			0.06
		],
		discoveryCountry: [
			"ru",
			"us"
		],
		discoverers: [
			"Russian scientists at Dubna (JINR)",
			"American scientists at the Lawrence Livermore National Laboratory."
		]
	}
];
var atomElem = {
	atoms: atoms
};

export { atomElem as a };
