/**
 * AUTO-GENERATED from the old repo's syllabus-<subject>.html pages
 * (/home/z/fuhademy/teachers/**). Do not hand-edit; regenerate with the
 * parser script instead.
 *
 * Source formats varied (JAMB HTML lists, pre-line text dumps, summary
 * sections) — all normalised into the shape below.
 */

export interface SyllabusSection {
  title: string;
  topics: string[];
  objectives: string[];
}

export interface Syllabus {
  title: string;
  source: string;
  intro: string;
  aims: string[];
  sections: SyllabusSection[];
  note?: string;
}

export type SyllabusBySubject = Record<string, Syllabus>;

export const SYLLABI: SyllabusBySubject = {
  "accounting": {
    "title": "Accounting Syllabus",
    "source": "Accounts - Principles of Accounts Syllabus from JAMB",
    "intro": "The aim of this 2025 JAMB Accounts Syllabus for (UTME) Unified Tertiary Matriculation Examination, is to prepare the candidates for the Board's examination. It is designed to test their achievement of the course objectives, which are to:",
    "aims": [
      "1. Stimulate and sustain their interest in Principles of Accounts;",
      "2. Use the basic knowledge of and practical skills in Accounting;",
      "3. Apply the knowledge and interpretation of accounting information to decision making;",
      "4. Determine the relevance of accounting information to business and governments;",
      "5. Use information and communication technology for present and future challenges.",
      "6. Use current accounting principles in financial reporting.",
      "1. Nature and Significance of Accounting"
    ],
    "sections": [
      {
        "title": "Nature and Significance of Accounting",
        "topics": [
          "a.Development of accounting (including branches of accounting)",
          "b. Objectives of bookkeeping and accounting;",
          "c. Users and characteristics of Accounting information",
          "d. Principles, concepts and conventions of accounting (nature, significance and application)",
          "e. Role of accounting records and information"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. differentiate between bookkeeping and accounting;",
          "ii. use the historical background of bookkeeping and accounting for future development;",
          "iii. apply the right principles, concepts and conventions to solving accounting problems;",
          "iv. examine the role of accounting records and information in decision making.",
          "v. List the branches of Accounting such as Cost Accounting, Management Accounting, Auditing, Financial Accounting and Taxation."
        ]
      },
      {
        "title": "Principles of Double Entry",
        "topics": [
          "a. Functions of source documents",
          "b. Books of original entry",
          "c. Accounting equation",
          "d. The ledger and its classifications",
          "e. Trial balance",
          "f. Types and treatment of errors and uses of suspense account"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. relate the various source documents to their uses;",
          "ii. relate source documents to the various books of original entry;",
          "iii. determine the effect of changes in elements of accounting equation;",
          "iv. identify the role of double entry and use it to post transactions into various divisions of the ledger;",
          "v. balance off ledger accounts;",
          "vi. extract a trial balance from balances and determine its uses;",
          "vii. identify various types of errors and their necessary corrections;",
          "viii. create a suspense account."
        ]
      },
      {
        "title": "Ethics in Accounting",
        "topics": [
          "a. Objectives",
          "b. Qualities of an Accountant"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. use ethics in preparing and presenting Accounting Reports;",
          "ii. list qualities of an Accountant such as honesty, integrity, transparency, accountability and fairness."
        ]
      },
      {
        "title": "Cashbook",
        "topics": [
          "a. Columnar cashbooks",
          "b. Discounts",
          "c. Petty cashbook and the imprest system"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. determine the cash float;",
          "ii. differentiate between two and three columnar cashbooks and how transactions are recorded in them;",
          "iii. differentiate between trade and cash discounts;",
          "iv. examine the effects of trade and cash discounts in the books of accounts.",
          "v. Identify various petty cash expense;"
        ]
      },
      {
        "title": "Bank Transactions and Reconciliation Statements",
        "topics": [
          "a. Instrument of bank transactions",
          "b. e-banking system",
          "c. Courses of discrepancies between cashbook and bank statement",
          "d. Bank reconciliation statement"
        ],
        "objectives": [
          "Candidates should be able to :",
          "i. identify bank documents such as cheques, pay-in-slips, credit and debit cards and their uses;",
          "ii. assess the impact of automated credit system, credit transfers, interbank transfers and direct debit on cash balances;",
          "iii. list factors that cause discrepancies between balances of cashbook and bank statements",
          "iv. prepare adjusted cashbook balance",
          "v. prepare bank reconciliation statements."
        ]
      },
      {
        "title": "The Final Accounts of a Sole Trader",
        "topics": [
          "a. Income statement (Trading and profit and loss account)",
          "b. Statement of financial position (Balance sheet)",
          "c. Adjustments:",
          "i. provision for bad and doubtful debt",
          "ii. provision for discounts",
          "iii. provision for depreciation using straight-line and reducing balance methods",
          "iv. accruals and prepayments"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. determine the cost of sales, gross profit and net profit of a sole trader;",
          "ii. identify fixed assets, current assets, long- term liabilities, current liabilities and proprietor's capital;",
          "iii. compute adjustable items on the related expenditure and income in the profit and loss account;",
          "iv. relate the adjustable items and their corresponding disclosure in the statement of financial position;",
          "v. differentiate between bad debts and provision for bad and doubtful debts."
        ]
      },
      {
        "title": "Stock Valuation",
        "topics": [
          "a. Methods of cost determination using FIFO, LIFO and simple average",
          "b. The advantages and disadvantages of the methods",
          "c. The importance of stock valuation"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. determine the cost of materials issued to production or cost of goods sold using FIFO, LIFO and simple average;",
          "ii. calculate the closing stock of materials or finished goods using FIFO, LIFO and simple average;",
          "iii. compare the advantages and disadvantages of each method of stock valuation;",
          "iv. determine the effects of stock valuation on trading, profits and cost of goods sold."
        ]
      },
      {
        "title": "Control Accounts and Self-balancing Ledgers",
        "topics": [
          "a. Importance of control accounts",
          "b. Purchases ledger control account",
          "c. Sales ledger control account"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. determine the importance of control accounts in a business enterprise;",
          "ii. differentiate between sales ledger control account and purchases ledger control account;",
          "iii. identify the individual elements of control accounts;",
          "iv. prepare the control accounts"
        ]
      },
      {
        "title": "Incomplete Records and Single Entry",
        "topics": [
          "a. Conversion of single entry to double entry",
          "b. Determination of missing figures",
          "c. Preparation of final accounts from incomplete records"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. determine proprietor's capital using statement of affairs;",
          "ii. determine the amount of sales, purchases, cash balances, debtors, creditors and expenses by converting single entry to double entry;",
          "iii. use accounting equations and gross profit percentage to determine gross profit or cost of sales."
        ]
      },
      {
        "title": "Manufacturing Accounts",
        "topics": [
          "a. Cost classification",
          "b. Cost apportionment",
          "c. Preparation of manufacturing account"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. calculate prime cost, production overhead, production cost and total cost;",
          "ii. determine the basis of apportionment into production, administration, selling and distribution."
        ]
      },
      {
        "title": "Accounts of Not-For-Profit-Making Organizations.",
        "topics": [
          "a. Objectives of Not-For-Profit-Making organizations",
          "b. Receipts and payments account",
          "c. Income and expenditure account",
          "d. Statement of financial position (Balance sheet)"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. distinguish between the features of Not-for-profit-making organizations;",
          "ii. determine the subscription income, subscription in arrears and in advance;",
          "iii. compute the cash balances and accumulated funds, surplus and deficit for the period from all sources.",
          "iv. Prepare:",
          "a. receipts and payments account",
          "b. income and expenditure account",
          "c. statement of financial position"
        ]
      },
      {
        "title": "Departmental Accounts",
        "topics": [
          "a. Objectives",
          "b. Apportionment of expenses",
          "c. Departmental trading and profit and loss account"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the reasons for departmental accounts;",
          "ii. determine the expenses associated with individual departments;",
          "iii. compute departmental profits or losses."
        ]
      },
      {
        "title": "Branch Accounts",
        "topics": [
          "a. Objectives",
          "b. Branch accounts in the head office books",
          "c. Head office account",
          "d. Reconciliation of branch and head office books"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. determine the reasons for branch accounts;",
          "ii. calculate profits and losses from branches;",
          "iii.determine the sources of differences and reconcile them."
        ]
      },
      {
        "title": "Joint Venture Accounts",
        "topics": [
          "a. Objectives",
          "b. Personal accounts of venturers",
          "c. Memorandum Joint venture accounts"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the objectives of Joint Venture;",
          "ii. determine the profit or loss of the Joint Venture;",
          "iii.determine the profit or loss of each venture."
        ]
      },
      {
        "title": "Partnership Accounts",
        "topics": [
          "a. Formation of partnership",
          "b. Profit and loss account",
          "c. Appropriation account",
          "d. Partners current and capital accounts",
          "e. Treatment of goodwill",
          "f. Admission/retirement of a partner",
          "g. Dissolution of partnership",
          "h. Conversion of a partnership to a company"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. determine the instruments of partnership formation;",
          "ii. categorize all accounts necessary for partnership;",
          "iii. determine the effects of admission and retirement of a partner;",
          "iv. prepare revaluation account",
          "v. identify the accounts required for dissolution and conversion to a company;",
          "vi. determine the partners share of profits or losses"
        ]
      },
      {
        "title": "Introduction to Company Accounts",
        "topics": [
          "a. Formation and classification of companies",
          "b. Issue of shares and debentures",
          "c. Final accounts of companies",
          "d. Interpretation of accounts using ratios.",
          "e. Distinction between capital and revenue reserves"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. differentiate between types of companies;",
          "ii. identify the processes and procedures of recording the issue of shares and debentures;",
          "iii. compute elements of final accounts of companies;",
          "iv. Interpret the accounts for decision making using ratios such as current, acid test and stock turnover."
        ]
      },
      {
        "title": "Public Sector Accounting",
        "topics": [
          "a. Comparison of cash and accrual basis of accounting",
          "b. Sources of government revenue",
          "c. Capital and recurrent expenditure",
          "d. Consolidated revenue fund",
          "e. Statement of assets and liabilities",
          "f. Responsibilities and powers of:",
          "i. The Accountant General",
          "ii. The Auditor General",
          "i. The Minister of Finance",
          "ii. The Treasurer of local government",
          "g. Instruments of financial regulation"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. differentiate between public sector accounting and private sector accounting;",
          "ii. identify the sources of government revenue;",
          "iii. differentiate between capital and recurrent expenditure;",
          "iii. calculate consolidated revenue fund and determine the values of assets and liabilities;",
          "iv. analyse the duties of the Accountant General, the Auditor General, the Minister of Finance and the Treasurer of local government;",
          "v. distinguish between the elements of control in government accounting procedures e.g. virement, warrant, votes, authority to incur expenditure, budget and due process certificate."
        ]
      },
      {
        "title": "Information Technology in Accounting",
        "topics": [
          "a. Manual and computerized accounting processing system",
          "b. Processes involved in data processing",
          "c. Computer hardware and software",
          "d. Advantages and disadvantages of manual and computerized accounting processing system"
        ],
        "objectives": []
      }
    ]
  },
  "biology": {
    "title": "Biology Syllabus",
    "source": "Biology Syllabus from JAMB",
    "intro": "The aim of the Unified Tertiary Matriculation Examination (UTME) 2025 syllabus in Biology is to prepare the candidates for the Board’s examination. It is designed to test their achievement of the course objectives, which are to:",
    "aims": [
      "demonstrate sufficient knowledge of the concepts of the diversity, interdependence and unity of life;",
      "account for continuity of life through reorganization, inheritance and evolution;",
      "apply biological principles and concepts to everyday life, especially to matters affecting living things, individual, society, the environment, community health and the economy."
    ],
    "sections": [
      {
        "title": "Variety of Organisms",
        "topics": [],
        "objectives": [
          "differentiate between living and non-living things",
          "identify structures and functions of plant and animal cells",
          "compare plant and animal cells",
          "trace levels of organization among organisms",
          "Evolution among the following: Monera (bacteria, blue-green algae), Protista (Amoeba, Euglena, Paramecium), Fungi (mushroom, Rhizopus), Plantae (Thallophyta, Bryophyta, Pteridophyta, Spermatophyta), Animalia (invertebrates and vertebrates)",
          "analyze features and characteristics of listed organisms",
          "demonstrate increase in structural complexity",
          "trace life histories and evolution",
          "determine economic and environmental importance",
          "Variety of Organisms Structural, functional, and behavioural adaptations; adaptive colouration; social behaviour; structural adaptations",
          "describe adaptations to environment and way of life",
          "categorize colouration and behaviour in animals",
          "differentiate castes in social insects and their functions",
          "account for adaptation in food, protection, mating, temperature, and water conservation"
        ]
      },
      {
        "title": "Form and Functions",
        "topics": [],
        "objectives": [
          "identify and relate structure to function",
          "describe supporting tissues and their distribution",
          "examine arrangement of mammalian organs",
          "Nutrition Modes (autotrophic, heterotrophic), types, plant nutrition (photosynthesis, minerals), animal nutrition (food classes, tests, teeth, alimentary canal, enzymes)",
          "compare nutrition modes and provide examples",
          "differentiate types and determine nutritional value",
          "analyze photosynthesis, macro/micro-nutrients, food classes, tests, teeth, alimentary canal, enzymes",
          "Transport Need, materials, channels (circulatory and vascular systems), media and processes (diffusion, osmosis, transpiration, root pressure, active transport)",
          "relate size/complexity to transport systems",
          "describe sources, forms, and channels of transport",
          "identify plant vascular organs and their functions",
          "describe media and mechanisms of transport",
          "Respiration Respiratory organs, mechanisms, aerobic/anaerobic respiration",
          "examine significance and chemical process of respiration",
          "describe respiratory organs and mechanisms",
          "analyze aerobic and anaerobic respiration and their importance",
          "Excretion Excretory structures and mechanisms, excretory products of plants",
          "define and relate excretion to structure and function",
          "analyze excretory organs and products",
          "Support and Movement Plant and animal support tissues, skeleton types, movement, tropism, joints",
          "determine need for support/movement, identify tissues, describe skeletons and joints",
          "Reproduction Asexual and sexual reproduction, plant and mammal reproduction, fertilization, development, birth control",
          "differentiate reproduction types, relate structure to function, describe fertilization and development",
          "Growth Meaning, germination, conditions for growth",
          "apply knowledge of germination and growth, differentiate types",
          "Co-ordination and Control Nervous system, sense organs, hormones, homeostasis",
          "apply knowledge of nervous and hormonal control, sense organs, and homeostasis"
        ]
      },
      {
        "title": "Ecology",
        "topics": [],
        "objectives": [
          "deduce effects of abiotic/biotic factors, use equipment, describe human impact",
          "Symbiotic interactions and energy flow Food chains/webs, nutrient cycles (carbon, water, nitrogen)",
          "determine examples of symbiosis, analyze food chains/webs, describe cycles and significance",
          "Natural habitats and local biomes Aquatic and terrestrial habitats, Nigerian biomes",
          "associate organisms with habitats, relate features to biomes",
          "Ecology of populations Population density, competition, succession, factors affecting size",
          "analyze population changes, competition, succession, and factors affecting size",
          "Soil Soil types, structure, components, fertility, conservation",
          "identify soil properties, relate to plant growth, apply conservation methods",
          "Humans and Environment Diseases, pollution, conservation, game reserves, health agencies",
          "identify disease conditions, pollution types, conservation methods, and agencies"
        ]
      },
      {
        "title": "Heredity and Variations",
        "topics": [],
        "objectives": [
          "differentiate continuous/discontinuous variation, relate to environment/genetics, apply in real life",
          "Heredity Inheritance, chromosomes, probability, sex determination, application in agriculture/medicine, sex-linked characters",
          "determine heritable characters, analyze inheritance, apply principles in real life, identify sex-linked traits"
        ]
      },
      {
        "title": "Evolution",
        "topics": [],
        "objectives": [
          "relate organic evolution, examine contributions of theorists, provide evidence for evolution"
        ]
      }
    ]
  },
  "chemistry": {
    "title": "Chemistry Syllabus",
    "source": "Chemistry Syllabus from JAMB",
    "intro": "The aim of the Unified Tertiary Matriculation Examination (UTME) 2025 syllabus in Chemistry is to prepare the candidates for the Board’s examination. It is designed to test their achievement of the course objectives, which are to:",
    "aims": [
      "understand the basic principles and concepts in chemistry;",
      "interpret scientific data relating to chemistry;",
      "deduce the relationships between chemistry and other sciences;",
      "apply the knowledge of chemistry to industry and everyday life."
    ],
    "sections": [
      {
        "title": "Separation of mixtures and purification of chemical substances",
        "topics": [
          "Pure and impure substances",
          "Boiling and melting points",
          "Elements, compounds and mixtures",
          "Chemical and physical changes",
          "Separation processes: evaporation, simple and fractional distillation, sublimation, filtration, crystallization, paper and column chromatography, simple and fractional crystallization, magnetization, decantation"
        ],
        "objectives": [
          "distinguish between pure and impure substances",
          "use boiling and melting points as criteria for purity of chemical substances",
          "distinguish between elements, compounds and mixture",
          "differentiate between chemical and physical changes",
          "identify the properties of the components of a mixture",
          "specify the principle involved in each separation method",
          "apply the basic principle of separation processes in everyday life"
        ]
      },
      {
        "title": "Chemical combination",
        "topics": [],
        "objectives": [
          "perform simple calculations involving formulae, equations/chemical composition and the mole concept",
          "deduce the chemical laws from given expressions/statements/data",
          "interpret graphical representations related to these laws",
          "deduce the stoichiometry of chemical reactions"
        ]
      },
      {
        "title": "Kinetic theory of matter and Gas Laws",
        "topics": [
          "An outline of the kinetic theory of matter: melting, vapourization, boiling, freezing, condensation in terms of molecular motion and Brownian movement",
          "The laws of Boyle, Charles, Graham and Dalton (law of partial pressure); combined gas law, molar volume and atomicity of gases",
          "The ideal gas equation (PV = nRT)",
          "The relationship between vapour density of gases and the relative molecular mass"
        ],
        "objectives": [
          "apply the theory to distinguish between solids, liquids and gases",
          "deduce reasons for change of state",
          "draw inferences based on molecular motion",
          "deduce gas laws from given expressions/statements",
          "interpret graphical representations related to these laws",
          "perform simple calculations based on these laws, equations and relationships"
        ]
      },
      {
        "title": "Atomic structure and bonding",
        "topics": [
          "The concept of atoms, molecules and ions, the works of Dalton, Millikan, Rutherford, Moseley, Thompson and Bohr",
          "Atomic structure, electron configuration, atomic number, mass number and isotopes (elements of atomic number 1 to 20)",
          "Shapes of s and p orbitals",
          "The periodic table and periodicity of elements, families of elements, variation of properties: ionization energy, ionic radii, electron affinity and electronegativity",
          "Chemical bonding: Electrovalency, covalency, electron configuration, hydrogen bonding, metallic bonding, coordinate bond, van der Waals' forces",
          "Shapes of simple molecules: linear, non-linear, tetrahedral, pyramidal",
          "Nuclear Chemistry: Radioactivity, types and properties of radiations, nuclear reactions, uses and applications"
        ],
        "objectives": [
          "distinguish between atoms, molecules and ions",
          "identify the contributions of these scientists to the development of the atomic structure",
          "deduce the number of protons, neutrons and electrons from atomic and mass numbers of an atom",
          "apply the rules guiding the arrangement of electrons in an atom",
          "identity common elements exhibiting isotopy",
          "relate isotopy to mass number",
          "perform simple calculations relating to isotopy",
          "differentiate between the shapes of the orbitals",
          "determine the number of electrons in s and p atomic orbitals",
          "relate atomic number to the position of an element on the periodic table",
          "relate properties of groups of elements on the periodic table",
          "identify reasons for variation in properties across the period and down the groups",
          "differentiate between the different types of bonding",
          "deduce bond types based on electron configurations",
          "relate the nature of bonding to properties of compounds",
          "differentiate between the various shapes of molecules",
          "distinguish between ordinary chemical reaction and nuclear reaction",
          "differentiate between natural and artificial radioactivity",
          "compare the properties of the different types of nuclear radiations",
          "compute simple calculations on the half-life of a radioactive material",
          "balance simple nuclear equation",
          "identify the various applications of radioactivity"
        ]
      },
      {
        "title": "Air",
        "topics": [],
        "objectives": [
          "deduce reason(s) for the existence of air as a mixture",
          "identify the principle involved in the separation of air components",
          "deduce reasons for the variation in the composition of air in the environment",
          "specify the uses of some of the constituents of air"
        ]
      },
      {
        "title": "Water",
        "topics": [],
        "objectives": [
          "identify the various uses of water",
          "identity the effects of dissolved atmospheric gases in water",
          "distinguish between the properties of hard and soft water",
          "determine the causes of hardness",
          "identify methods of removal of hardness",
          "describe the processes involved in the treatment of water for town supply",
          "distinguish between these phenomena",
          "identify the various compounds that exhibit these phenomena"
        ]
      },
      {
        "title": "Solubility",
        "topics": [],
        "objectives": [
          "distinguish between the different types of solutions",
          "interpret solubility curves",
          "calculate the amount of solute that can dissolve in a given amount of solvent at a given temperature",
          "deduce that solubility is temperature-dependent",
          "relate nature of solvents to their uses",
          "differentiate among true solution, suspension and colloids",
          "compare the properties of a true solution and a ‘false' solution",
          "provide typical examples of suspensions and colloids"
        ]
      },
      {
        "title": "Environmental Pollution",
        "topics": [],
        "objectives": [
          "identify the different types of pollution and pollutants",
          "specify different sources of pollutants",
          "classify pollutants as biodegradable and non-biodegradable",
          "specify the effects of pollution on the environment",
          "identify measures for control of environmental pollution"
        ]
      },
      {
        "title": "Acids, bases and salts",
        "topics": [],
        "objectives": [
          "distinguish between the properties of acids and bases",
          "identify the different types of acids and bases",
          "determine the basicity of acids",
          "differentiate between acidity and alkalinity using acid/base indicators",
          "identify the various methods of preparation of salts",
          "classify different types of salts",
          "relate degree of dissociation to strength of acids and bases",
          "relate degree of dissociation to conductance",
          "perform simple calculations on pH and pOH",
          "identify the appropriate acid-base indicator",
          "interpret graphical representation of titration curves",
          "perform simple calculations based on the mole concept",
          "balance equations for the hydrolysis of salts",
          "deduce the properties (acidic, basic, neutral) of the resultant solution"
        ]
      },
      {
        "title": "Oxidation and reduction",
        "topics": [],
        "objectives": [
          "identify the various forms of expressing oxidation and reduction",
          "classify chemical reactions in terms of oxidation or reduction",
          "balance redox reaction equations",
          "deduce the oxidation number of chemical species",
          "compute the number of electron transfer in redox reactions",
          "identify the name of redox species in a reaction",
          "distinguish between oxidizing and reducing agents in redox reactions",
          "apply oxidation number in naming inorganic compounds",
          "relate reagents to their oxidizing and reducing abilities"
        ]
      },
      {
        "title": "Electrolysis",
        "topics": [],
        "objectives": [
          "distinguish between electrolytes and non-electrolytes",
          "perform calculations based on faraday as a mole of electrons",
          "identify suitable electrodes for different electrolytes",
          "specify the chemical reactions at the electrodes",
          "determine the products at the electrodes",
          "identify the factors that affect the products of electrolysis",
          "specify the different areas of application of electrolysis",
          "identify the various electrochemical cells",
          "calculate electrode potentials using half-cell reaction equations",
          "determine the different areas of application of electrolytic processes",
          "identify methods used in protecting metals"
        ]
      },
      {
        "title": "Energy changes",
        "topics": [],
        "objectives": [
          "determine the types of heat changes ∆H in physical and chemical processes",
          "interpret graphical representations of heat changes",
          "relate the physical state of a substance to the degree of orderliness",
          "determine the conditions for spontaneity of a reaction",
          "relate ∆Ho, ∆So and ∆Go as the driving forces for chemical reactions",
          "solve simple problems based on the relationships ∆Go = ∆Ho - T∆So"
        ]
      },
      {
        "title": "Rates of Chemical Reaction",
        "topics": [],
        "objectives": [
          "identify the factors that affect the rates of a chemical reaction",
          "determine the effects of temperature on the rate of reactions",
          "examine the effect of concentration/pressure on the rate of a chemical reaction",
          "describe how the rate of a chemical reaction is affected by surface area",
          "determine the types of catalysts suitable for different reactions and their effects",
          "determine ways of moderating these effects in chemical reactions",
          "interpret reaction rate curves",
          "solve simple problems on the rate of reactions",
          "relate the rate of reaction to the kinetic theory of matter",
          "examine the significance of activation energy to chemical reactions",
          "deduce the value of activation energy (Ea) from reaction rate curves"
        ]
      },
      {
        "title": "Chemical equilibrium",
        "topics": [],
        "objectives": [
          "identify the factors that affects the position of equilibrium of a chemical reaction",
          "predict the effects of each factor on the position of equilibrium",
          "determine the effects of these factors on equilibrium constant"
        ]
      },
      {
        "title": "Non-metals and their compounds",
        "topics": [],
        "objectives": [
          "predict reagents for the laboratory and industrial preparation of these gases and their compounds",
          "identify the properties of the gases and their compounds",
          "compare the properties of these gases and their compounds",
          "specify the uses of each gas and its compounds",
          "determine the specific test for each gas and its compounds",
          "determine specific tests for Cl−, SO2−4, SO2−3, S2−, NH+4, NO−3, CO2−3, HCO−3",
          "predict the reagents for preparation, properties and uses HCl(g) and HCl(aq)",
          "identify the allotropes of oxygen",
          "determine the significance of ozone to our environment",
          "classify the oxides of oxygen and their properties",
          "identify the allotropes of sulphur and their uses",
          "predict the reagents for preparation, properties and uses of SO2 and H2S",
          "specify the preparations of H2SO4 and H2SO3, their properties and uses",
          "specify the laboratory and industrial preparation of NH3",
          "identify the properties and uses of NH3",
          "identify reagents for the laboratory preparation of HNO3, its properties and uses",
          "specify the properties of N2O, NO, NO2 gases",
          "examine the relevance of nitrogen cycle to the environment",
          "identify allotropes of carbon",
          "predict reagents for the laboratory preparation of CO2",
          "specify the properties of CO2 and its uses",
          "determine the reagents for the laboratory preparation of CO",
          "predict the effects of CO on human",
          "identify the different forms of coal",
          "determine their uses",
          "specify the products of the destructive distillation of wood and coal",
          "specify the uses of coke and synthetic gas"
        ]
      },
      {
        "title": "Metals and their compounds",
        "topics": [],
        "objectives": [
          "specify the general properties of metals",
          "determine the method of extraction suitable for each metal",
          "relate the methods of extraction to the properties for the metals",
          "compare the chemical reactivities of the metals",
          "specify the uses of the metals",
          "determine specific test for metallic ions",
          "determine the process for the production of the compounds of these metals",
          "compare the chemical reactivities of the compounds",
          "specify the uses of these compounds",
          "specify the chemical composition of cement",
          "describe the method of purification of bauxite",
          "specify the ores of tin",
          "relate the method of extraction to its properties",
          "specify the uses of tin",
          "identify the general properties of the first transition metals",
          "deduce reasons for the specific properties of the transition metals",
          "determine the IUPAC names of simple transition metal complexes",
          "determine the suitable method of extraction of iron",
          "specify the properties and uses of iron",
          "identify the different forms of iron, their compositions, properties and uses",
          "identify the appropriate method of extraction of copper from its compounds",
          "relate the properties of copper and its compound to their uses",
          "specify the method for the preparation of CuSO4",
          "specify the constituents and uses of the various alloys mentioned",
          "compare the properties and uses of alloys to pure metals"
        ]
      },
      {
        "title": "Organic Compounds",
        "topics": [],
        "objectives": [
          "derive the name of organic compounds from their general formulae",
          "relate the name of a compound to its structure",
          "relate the tetravalency of carbon to its ability to form chains of compound (catenation)",
          "classify compounds according to their functional groups",
          "derive empirical formula and molecular formula, from given data",
          "relate structure/functional groups to specific properties",
          "derive various isomeric forms from a given formula",
          "distinguish between the different types of isomerism",
          "specify the uses of these compounds",
          "specify the chemical composition of cement",
          "specify the uses of various hydrocarbons",
          "identify crude oil as a complex mixture of hydrocarbons",
          "relate the fractions of hydrocarbons to their properties and uses",
          "relate transformation processes to quality improvement of the fractions",
          "distinguish between various polymerization processes",
          "specify the process involved in vulcanization",
          "specify chemical test for terminal alkynes",
          "distinguish between aliphatic and aromatic hydrocarbons",
          "relate the properties of benzene to its structure",
          "compare the various classes of alkanols",
          "determine the processes involved in ethanol production",
          "examine the importance of ethanol as an alternative energy provider",
          "distinguish the various classes of alkanols",
          "differentiate between alkanals and alkanones",
          "compare the various types of alkanoic acids",
          "identify natural sources of alkanoates",
          "specify the methods for the production of soap, detergent and margarine",
          "distinguish between detergent and soap",
          "compare the various classes of alkanamine",
          "identify the natural sources of carbohydrates",
          "compare the various classes of carbohydrates",
          "infer the products of hydrolysis and dehydration of carbohydrates",
          "determine the uses of carbohydrates",
          "specify the tests for simple sugars",
          "identify the basic structure of proteins",
          "specify the methods and products of hydrolysis",
          "specify the various tests for proteins",
          "distinguish between natural and synthetic polymers",
          "differentiate between addition and condensation polymerization processes",
          "classify natural and commercial polymers and their uses",
          "distinguish between thermoplastics and thermosetting plastics"
        ]
      },
      {
        "title": "Chemistry and Industry",
        "topics": [],
        "objectives": [
          "classify chemical industries in terms of products",
          "identify raw materials for each industry",
          "distinguish between fine and heavy chemicals",
          "enumerate the relevance of each of these industries",
          "relate industrial processes to biotechnology"
        ]
      }
    ]
  },
  "commerce": {
    "title": "Commerce Syllabus",
    "source": "Commerce Syllabus from JAMB",
    "intro": "The aim of this 2025 JAMB Economics Syllabus for Unified Tertiary Matriculation Examination (UTME), is to prepare the candidates for the Board's examination. It is designed to test their understanding of the course objectives, which are to:",
    "aims": [
      "(1) acquire the basic knowledge of Commerce;",
      "(2) examine the relationship between Commerce and other related fields;",
      "(3) apply the principles of Commerce in the Nigerian economy and",
      "(4) appreciate dynamic and positive changes in commercial activities.",
      "1. Commerce"
    ],
    "sections": [
      {
        "title": "Commerce",
        "topics": [
          "(i) Meaning and scope",
          "(ii) Characteristics",
          "(iii) Functions"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) differentiate between Commerce and other related subjects;",
          "(ii) describe the characteristics of Commerce;",
          "(iii) Identify the functions of Commerce"
        ]
      },
      {
        "title": "Occupation",
        "topics": [
          "(i) Meaning and importance",
          "(ii) Types (industrial, commercial, and services)",
          "(iii) Factors that determine choice of occupation"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) State the importance of occupation;",
          "(ii) Compare the different types of occupation;",
          "(iii) Identify the factors determining the choice of occupation."
        ]
      },
      {
        "title": "Production",
        "topics": [
          "(i) Factors, characteristics, and rewards (land, labour, capital, and entrepreneur)",
          "(ii) Division of Labour and specialization",
          "(iii) Types (primary, secondary and tertiary)"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) identify the Factors of Production and their rewards;",
          "(ii) distinguish between Division of Labour and Specialization;",
          "(iii) classify the types of production."
        ]
      },
      {
        "title": "Trade",
        "topics": [
          "a. Home Trade",
          "(i) Retail trade: - Types of retailers - Functions of retailers - Factors to be considered in setting up retail trade - Trends in retailing (branding, self -service, vending machines, the use of luncheon, fuel vouchers, etc) - Advantages and disadvantages of retailers",
          "(ii) Wholesale trade: - Types of wholesalers (merchant, agent, general, etc) - Functions of wholesalers - Advantages and disadvantages of wholesalers",
          "b. Foreign trade",
          "(i) Basic issues in foreign trade (balance of trade, balance of payments, and counter trade)",
          "(ii) Procedures and documents used in export, import, and entreport trade",
          "(iii) Barriers to international trade",
          "(iv) Role of Customs and Excise Authority, Ports Authority, etc in foreign trade"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) compare the various types of retailers;",
          "(ii) identify the functions of retailers;",
          "(iii) highlight the factors in setting up retail trade;",
          "(iv) classify modern retailing practices;",
          "(v) identify the advantages and disadvantages of retail business;",
          "(vi) classify the types of wholesalers;",
          "(vii) discuss the functions of wholesalers;",
          "(viii) outline the merits and demerits of the middleman;",
          "(ix) analyse the basic issues in foreign trade;",
          "(x) explain the procedures and documents used in foreign trade;",
          "(xi) identify the barriers to international trade;",
          "(xii) appraise the role of government agencies in foreign trade"
        ]
      },
      {
        "title": "Purchase and Sale of Goods",
        "topics": [
          "(i) Procedure and documentation (enquiry, quotation, order, invoice, proforma invoice, statement of accounts, indent, consular invoice, bill of lading, certificate of origin, consignment note, etc)",
          "(ii) Terms of trade (trade discount, quantity discount, cash discount, warranties, C.O.D., C.I.F., F.O.B., and E.O.E. etc)",
          "(iii) Terms of payments",
          "a. Cash - Legal tender",
          "b. Credit - Types and functions - Merits and demerits"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) examine the procedures and documents used in the purchase and sale of goods;",
          "(ii) determine the terms of trade;",
          "(iii) distinguish between cash and credit forms of payment;",
          "(iv) identify the types of credit;",
          "(v) analyse the merits and demerits of credit transactions.",
          "6. Aids-to-trade Topic:",
          "a. Advertising:",
          "(i) Types and media",
          "(ii) Advantages and disadvantages",
          "b. Banking:",
          "(i) Types of bank",
          "(ii) Services",
          "(iii) Challenges",
          "c. Communication:",
          "(i) Process and procedure",
          "(ii) Types",
          "(iii) Trends",
          "(iv) Merits and demerits",
          "(v) Barriers",
          "d. Insurance:",
          "(i) Types",
          "(ii) Principles",
          "(iii) Terms",
          "(iv) Importance",
          "e. Tourism:",
          "(i) Importance",
          "(ii) Agencies that promote tourism in Nigeria",
          "(iii) Challenges",
          "f. Transportation:",
          "(i) Mode",
          "(ii) Importance",
          "(iii) Advantages and disadvantages",
          "g. Warehousing:",
          "(i) Importance",
          "(ii) Types and functions",
          "(iii) Factors to be considered in siting a warehouse Candidates should be able to:",
          "(i) identify the different types of advertising and its media;",
          "(ii) analyse the advantages and disadvantages of advertising;",
          "(iii) categorize the different types of bank;",
          "(iv) assess the services rendered by banks;",
          "(v) identify the challenges facing banks;",
          "(vi) assess the different stages in the communication process;",
          "(vii) analyse the types of communication;",
          "(viii) appraise the contributions of courier services, GSM, etc., to businesses;",
          "(ix) state the merits and demerits of communication;",
          "(x) outline the barriers to communication",
          "(xi) describe the types of insurance;",
          "(xii) apply the principles of insurance to life situations;",
          "(xiii) explain the terms in insurance;",
          "(xiv) state the importance of insurance;",
          "(xv) examine the importance of tourism;",
          "(xvi) identify the agencies that promote tourism in Nigeria;",
          "(xvii) analyse the challenges facing tourism in Nigeria;",
          "(xviii) appraise the relevance of the various modes of transportation;",
          "(xix) list the importance of transportation;",
          "(xx) discuss the advantages and disadvantages of transportation;",
          "(xxi) highlight the importance of warehousing;",
          "(xxii) appraise the contributions of warehouses to businesses.",
          "(xxiii) evaluate the factors that determine the siting of warehouses"
        ]
      },
      {
        "title": "Business Units",
        "topics": [
          "(i) Forms and features (Sole Proprietorship, Partnership, Limited Liability Companies, Public Corporations, Cooperative Societies, etc.)",
          "(ii) Registration of businesses",
          "(iii) Business Mergers",
          "(iv) Determination of choice of business units",
          "(v) Dissolution and liquidation",
          "(vi) Merits and demerits"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) identify the forms and features of business units;",
          "(ii) analyse the procedures for registering businesses;",
          "(iii) appraise the different forms of business mergers and the reasons for merging;",
          "(iv) examine the factors which determine the choice of business units;",
          "(v) differentiate between dissolution and liquidation of business;",
          "(vi) state the merits and demerits of business units."
        ]
      },
      {
        "title": "Financing Business",
        "topics": [
          "(i) Sources of finance (personal savings, sale of shares and bonds, loans, debentures, mortgage, bank overdraft, ploughing back of profit, credit purchase, leasing, etc.)",
          "(ii) Types of capital (share capital, capital owned, authorized (capital, issued capital, called-up capital, paid-up capital, liquid capital, working capital, and owners' equity)",
          "(iii) Calculation of forms of capital, profits (gross and net), and turnover",
          "(iv) Problems of sourcing finance",
          "(v) The role of Bureau de change in an economy"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) identify the various ways of financing a business;",
          "(ii) discuss the different types of capital",
          "(iii) compute the different forms of capital, profits, and turnover;",
          "(iv) appraise the problems associated with sourcing finances for business;",
          "(v) assess the role of bureaux de change in an economy."
        ]
      },
      {
        "title": "Trade Associations",
        "topics": [
          "(i) Objectives and functions of trade and manufacturer's associations (Cocoa Farmers' Association, Garri Sellers' Association, Poultry Farmers' Association, etc.)",
          "(ii) Objectives and functions of Chambers of Commerce."
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) discuss the objectives and functions of trade and manufacturer's associations;",
          "(ii) list the objectives and functions of Chambers of Commerce."
        ]
      },
      {
        "title": "Money",
        "topics": [
          "(i) Evolution",
          "(ii) Forms and qualities",
          "(iii) Functions"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) discuss the origin of money;",
          "(ii) analyse the forms and qualities of money;",
          "(iii) appraise the functions of money."
        ]
      },
      {
        "title": "Elements of Business Management",
        "topics": [
          "(i) Functions (planning, organizing, staffing, coordinating, motivating, communicating, controlling etc)",
          "(ii) Principles (span of control, unity of command, delegation of authority, etc)",
          "(iii) Organizational structure (line, line, and staff, functional, matrix, and committee)",
          "(iv) Functional areas of business (production, marketing, finance, and personnel)",
          "(v) Business resources (man, money, materials, machines, and opportunities/goodwill)"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. appraise the functions of management.",
          "ii. analyse the principles of management.",
          "iii. identify organizational structures.",
          "iv. assess the functional areas of business.",
          "v. examine the business resources."
        ]
      },
      {
        "title": "Stock Exchange",
        "topics": [
          "(i) Importance and functions",
          "(ii) Types of securities (stocks, shares, bonds, debentures, etc)",
          "(iii) Procedure of transactions and speculations",
          "(iv) Second-Tier Securities Market, (listing requirements, types of companies for the market, advantages and operating regulations of the market.)"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) state the importance and functions of the Stock Exchange;",
          "(ii) identify the different securities traded on the Stock Exchange;",
          "(iii) analyse the procedure of transactions and speculations on the Stock Exchange;",
          "(iv) appraise the advantages and operating regulations of the market."
        ]
      },
      {
        "title": "Elements of Marketing",
        "topics": [
          "(i) Importance and Functions",
          "(ii) The marketing concept (consumer orientation, customer satisfaction, integrated marketing, etc)",
          "(iii) Marketing mix (product, price, place, and promotion)",
          "(iv) Market Segmentation",
          "(v) Public relations and Customer Service"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) highlight the importance and functions of marketing;",
          "(ii) discuss the marketing concept;",
          "(iii) assess the elements of marketing mix;",
          "(iv) explain market segmentation;",
          "(v) examine public relations and customer service."
        ]
      },
      {
        "title": "Legal Aspects of Business",
        "topics": [
          "(i) Meaning and validity of a simple contract",
          "(ii) Agency, Sale of Goods Act and Hire Purchase Act",
          "(iii) Contract of employment",
          "(iv) Government regulations of business (registration of business, patents, trademarks, copyrights, etc)",
          "(v) Consumer protection (Government legislation, Standards Organization Trade Descriptions Act, Consumer Protection Council, NAFDAC, NDLEA, Customs and Excise, etc.)",
          "(vi) Regulatory agencies. Objectives; Candidates should be able to:",
          "i. analyse the elements and validity of a simple contract.",
          "ii. examine Agency, Sale of Goods Act and Hire Purchase Act.",
          "iii. assess the rights and obligations of employers and employees.",
          "iv. distinguish between patents, trademarks, and copyrights.",
          "v. identify the functions of consumerism."
        ],
        "objectives": []
      },
      {
        "title": "Information and Communication Technology (ICT)",
        "topics": [
          "a. Computer:",
          "(i) Appreciation and application",
          "(ii) Types and functions",
          "(iii) Merits and demerits",
          "(iv) Challenges",
          "b. Terms (Internet, Intranet, browsing, password, e-mail, google, yahoo, search, Local Area Network, etc.)",
          "c. Activities:",
          "(i) e-commerce",
          "(ii) e-banking",
          "(iii) e-business"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) discuss computer appreciation and application;",
          "(ii) enumerate the types and functions of computer;",
          "(iii) analyse the merits and demerits of ICT;",
          "(iv) appraise the challenges of using the computer;",
          "(v) identify the different terms used in ICT;",
          "(vi) evaluate the trends in ICT."
        ]
      },
      {
        "title": "Business Environment and Social Responsibility",
        "topics": [
          "(i) Legal, political, economic, social, cultural, technological environments, etc",
          "(ii) Safe products, philanthropic and societal consideration",
          "(iii) Types and implication of pollution (water, air, land, etc.)"
        ],
        "objectives": [
          "Candidates should be able to:",
          "(i) discuss the types of business environment;",
          "(ii) assess the role of social environment in the provision of safe products;",
          "(iii) identify the different types of pollution and their implications on businesses."
        ]
      }
    ]
  },
  "economics": {
    "title": "Economics Syllabus",
    "source": "Economics Syllabus from JAMB",
    "intro": "The aim of the Unified Tertiary Matriculation Examination (UTME) 2025 syllabus in Economics is to prepare the candidates for the Board's examination. It is designed to test their achievement of the course objectives, which are to:",
    "aims": [
      "1. demonstrate sufficient knowledge and understanding of the basic concepts, tools and their general applications to economic analysis;2. identify and explain the basic structures, operations and roles of the various economic units and institutions (national and international);",
      "3. describe major economic activities - production, distribution and consumption;",
      "4. identify and appraise the basic and current economic problems of society;",
      "5. develop the competence to proffer solutions to economic problems identified.",
      "1. Economics as a science"
    ],
    "sections": [
      {
        "title": "Economics as a science",
        "topics": [
          "a. Basic Concepts: Wants, Scarcity, choice, scale of preference, opportunity cost, Rationality, production, distribution, consumption. b (i). Economic problems of; What, how, and for whom to produce and efficiency of resource use.",
          "(ii). Application of PPF to solution of economic problems."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. compare various concepts in economics and their applications;",
          "ii. interpret graphs/schedules in relation to the concepts;",
          "iii. identify economic problems;",
          "iv. proffer solutions to economic problems"
        ]
      },
      {
        "title": "Economic Systems",
        "topics": [
          "a. Types; free enterprise centrally planned and mixed economies",
          "b. Solutions to economic problems under different systems",
          "c. Contemporary issues in economic systems (economic reforms e.g deregulation, banking sector consolidation, cash policy reform)."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. compare the various economic systems;",
          "ii. apply the knowledge of economic systems to contemporary issues in Nigeria",
          "iii. proffer solutions to economic problems in different economic systems."
        ]
      },
      {
        "title": "Methods and Tools of Economic Analysis",
        "topics": [
          "a. Scientific Approach:",
          "i. inductive and deductive methods",
          "ii. positive and normative reasoning",
          "b. Basic Tools",
          "i. tables, charts and graphs",
          "ii. measures of central tendency: mean, median and mode, and their applications.",
          "iii. measures of dispersion; variance, standard deviation, range and their applications;",
          "iv. merits and demerits of the tools."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. distinguish between the various forms of reasoning;",
          "ii. apply these forms of reasoning to real life situations;",
          "iii. use the tools to interpret economic data;",
          "iv. analyse economic data using the tools;",
          "v. assess the merits and demerits of the tools."
        ]
      },
      {
        "title": "The Theory of Demand",
        "topics": [
          "a. i. meaning and determinants of demand",
          "ii. demand schedules and curves",
          "iii. the distinction between change in quantity demanded and change in demand.",
          "b. Types of demand: Composite, derived, competitive and joint demand:",
          "c. Types, nature and determinants of elasticity and their measurement - price, income and cross elasticity of demand:",
          "d. Importance of elasticity of demand to consumers, producers and government."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the factors determining demand;",
          "ii. interpret demand curves from demand schedules;",
          "iii. differentiate between change in quantity demanded and change in demand;",
          "iv. compare the various types of demand and their interrelationships;",
          "v. relate the determinants to the nature of elasticity;",
          "vi. compute elasticities;",
          "vii. interpret elasticity coefficients in relation to real life situations."
        ]
      },
      {
        "title": "The Theory of Consumer Behaviour",
        "topics": [
          "a. Basic Concepts:",
          "i. utility (cardinal, ordinal, total average and marginal utilities)",
          "ii. indifference curve and budget line.",
          "b. Diminishing marginal utility and the law of demand.",
          "c. Consumer equilibrium using the indifference curve and marginal analyses.",
          "d. Effects of shift in the budget line and the indifference curve.",
          "e. Consumer surplus and its applications."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. appraise the various utility concepts",
          "ii. apply the law of demand using the marginal utility analysis",
          "iii. use indifference curve and marginal analyses to determine consumer equilibrium",
          "iv. associate the income and substitution effects",
          "v. apply consumer surplus to real-life situations."
        ]
      },
      {
        "title": "The Theory of Supply",
        "topics": [
          "a. i. Meaning and determinants of supply",
          "ii. Supply schedules and supply curves",
          "iii. the distinction between change in quantity supplied and change in supply",
          "b. Types of Supply: Joint/complementary, competitive and composite",
          "c. Elasticity of Supply: determinants, measurements, nature and applications"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the factors determining supply;",
          "ii. interpret supply curves from supply schedules;",
          "iii. differentiate between change in quantity supplied and change in supply;",
          "iv. compare the various types of supply and their interrelationships;",
          "v. relate the determinants to the nature of elasticity;",
          "vi. compute elasticity coefficients;",
          "vii. interpret the coefficients in relation to real life situations."
        ]
      },
      {
        "title": "The Theory of Price Determination",
        "topics": [
          "a. The concepts of market and price",
          "b. Functions of the price system",
          "c.",
          "i. Equilibrium price and quantity in product and factor markets",
          "ii. Price legislation and its effects",
          "d. The effects of changes in supply and demand on equilibrium price and quantity."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. explain the concepts of market and price;",
          "ii. examine the functions of the price system;",
          "iii. evaluate the effects of government interference with the price system;",
          "iv. differentiate between minimum and maximum price legislation;",
          "v. interpret the effects of changes in supply and demand on equilibrium price and quantity."
        ]
      },
      {
        "title": "The Theory of Production",
        "topics": [
          "a. Meaning and types of production",
          "b. Concepts of production and their interrelationships (TP, AP, MP and the law of variable proportion).",
          "c. Division of labour and specialization",
          "d. Scale of Production: Internal and external economies of scale and their implications.",
          "e. Production functions and returns to scale",
          "f. Producers' equilibrium isoquant - isocost and marginal analyses.",
          "g. Factors affecting productivity."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. relate TP, AP and MP with the law of variable proportion;",
          "ii. compare internal and external economies of scale in production and their effects;",
          "iii. identify the types of production functions",
          "iv. compare the different types of returns to the scale and their implications;",
          "v. determine the firm's equilibrium position using the isoquant-isocost and marginal analyses.",
          "vi. identify the factors affecting productivity."
        ]
      },
      {
        "title": "Theory of Costs and Revenue",
        "topics": [
          "a. The concepts of cost: Fixed, Variable, Total Average and Marginal",
          "b. The concepts of revenue: Total, average and marginal revenue;",
          "c. Accountants' and Economists' notions of cost",
          "d. Short-run and long-run costs",
          "e. The marginal cost and the supply curve of a firm."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. explain the various cost concepts",
          "ii. differentiate between accountants' and economists' notions of costs",
          "iii. interpret the short-run and long-run costs curves",
          "iv. establish the relationship between marginal cost and supply curve.",
          "v. explain the various revenue concepts."
        ]
      },
      {
        "title": "Market Structures",
        "topics": [
          "a. Perfectly competitive market:",
          "i. Assumptions and characteristics;",
          "ii. Short-run and long-run equilibrium of a perfect competitor;",
          "b. Imperfect Market:",
          "i. Pure monopoly, discriminatory monopoly and monopolistic competition.",
          "ii. Short-run and long-run equilibrium positions.",
          "c. Break-even/shut-down analysis in the various markets."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. analyse the assumptions and characteristics of a perfectly competitive market;",
          "ii. differentiate between short-run and long-run equilibrium of a perfectly competitive firm;",
          "iii. analyse the assumptions and characteristics of imperfect markets;",
          "iv. differentiate between the short-run and long-run equilibrium of imperfectly competitive firms;",
          "v. establish the conditions for the break-even/shut down of firms."
        ]
      },
      {
        "title": "National Income",
        "topics": [
          "a. The Concepts of GNP, GDP, NI, NNP",
          "b. National Income measurements and their problems",
          "c. Uses and limitations of national income estimates",
          "d. The circular flow of income (two and three-sector models)",
          "e. The concepts of consumption, investment and savings",
          "f. The multiplier and its effects",
          "g. Elementary theory of income determination and equilibrium national income."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the major concepts in national income;",
          "ii. compare the different ways of measuring national income;",
          "iii. examine their problems;",
          "iv. assess the uses and limitations of national income estimates;",
          "v. interpret the circular flow of income using the two and three-sector models;",
          "vi. calculate the various multipliers;",
          "vii. evaluate their effects on equilibrium national income;",
          "viii. explain the concepts of consumption, investment and savings."
        ]
      },
      {
        "title": "Money and Inflation",
        "topics": [
          "a. Types, characteristics and functions of money",
          "b. Demand for money and the supply of money",
          "c. Quantity Theory of money (Fisher equation)",
          "d. The value of money and the price level",
          "e. Inflation: Types, measurements, effects and control",
          "f. Deflation: Measurements, effects and control."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. explain between the types, characteristics and functions of money;",
          "ii. identify the factors affecting the demand for and the supply of money;",
          "iii. examine the relationship between the value of money and the price level;",
          "iv. identify the components in the quantity theory of money;",
          "v. examine the causes and effects of inflation;",
          "vi. calculate the consumer price index;",
          "vii. interpret the consumer price index;",
          "viii. examine ways of controlling inflation.",
          "ix. Examine the causes, measurement, effects and control of deflation."
        ]
      },
      {
        "title": "Financial Institutions",
        "topics": [
          "a. Types and functions of financial institutions (traditional, central bank, mortgage banks, merchant banks, insurance companies, building societies);",
          "b. The role of financial institutions in economic development;",
          "c. Money and capital markets",
          "d. Financial sector regulations",
          "e. Deposit money banks and the creation of money",
          "f. Monetary policy and its instruments",
          "g. Challenges facing financial institutions in Nigeria."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. Identify the types and functions of financial institutions;",
          "ii. Explain the roles of financial institutions in economic development;",
          "iii. Distinguish between the money and capital markets;",
          "iv. Identify the various financial sector regulators and their functions;",
          "v. Explain the money creation process and its challenges;",
          "vi. Examine the various monetary policy instruments and their effects;",
          "vii. Appraise the challenges facing the financial institutions in Nigeria.",
          "14. Public Finance",
          "a. Meaning and objectives",
          "b. Fiscal policy and its instruments",
          "c. Sources of government revenue (taxes royalties, rents, grants and aids)",
          "d. Principles of taxation",
          "e. Tax incidence and its effects",
          "f. The effects of public expenditure",
          "g. Government budget and public debts",
          "h. Revenue allocation and resource control in Nigeria. Candidates should be able to:",
          "i. identify the objectives of public finance;",
          "ii. explain fiscal policy and its instruments;",
          "iii. compare the various sources of government revenue",
          "iv. analyse the principles of taxation;",
          "v. analyse the incidence of taxation and its effects;",
          "vi. examine the effects of public expenditure on the economy;",
          "vii. examine the types and effects of budgets;",
          "viii. highlight the criteria for revenue allocation in Nigeria and their impact."
        ]
      },
      {
        "title": "Economic Growth and Development",
        "topics": [
          "a. Meaning and scope",
          "b. Indicators of growth and development",
          "c. Factors affecting growth and development",
          "d. Problems of development in Nigeria",
          "e. Development planning in Nigeria."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. distinguish between economic growth and development;",
          "ii. highlight the indicators of growth and development;iii. identify the factors affecting growth and development;",
          "iv. assess the problems of development in Nigeria;",
          "v. examine the role of planning in development;"
        ]
      },
      {
        "title": "Agriculture in Nigeria",
        "topics": [
          "a. Types and features;",
          "b. The role of agriculture in economic development;",
          "c. Problems of agriculture;",
          "d. Effects of agricultural policies and their effects;",
          "e. Instability in agricultural incomes (causes, effects and solutions)."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the types and features of agriculture;",
          "ii. examine the characteristics and problems of agriculture;",
          "iii. assess the role of agriculture in economic development;",
          "iv. appraise agricultural policies in Nigeria;",
          "v. evaluate the causes and effects of instability in agricultural incomes."
        ]
      },
      {
        "title": "Industry and Industrialization",
        "topics": [
          "a. Concepts and effects of location and localization of industry in Nigeria;",
          "b. Strategies and Industrialization in Nigeria;",
          "c. Industrialization and economic development in Nigeria;",
          "d. Funding and management of business organization;",
          "e. Factors determining the size of firms."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. differentiate between location and localization of industry;",
          "ii. identify the factors influencing the location and localization of industry;",
          "iii. examine the problems of industrialization;",
          "iv. appraise some industrialization strategies;",
          "v. examine the role of industry in economic development."
        ]
      },
      {
        "title": "Natural Resources and the Nigerian Economy",
        "topics": [
          "a. Development of major natural resources (petroleum, gold, diamond, timber etc).",
          "b. Contributions of the oil and the non-oil sectors to the Nigerian economy.",
          "c. Linkage effects.",
          "d. Upstream/downstream of the oil sector.",
          "e. The role of NNPC and OPEC in the oil sector.",
          "f. Challenges facing natural resources exploitation."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. trace the development of the major natural resources in Nigeria;",
          "ii. assess the contribution of the oil and the non-oil sectors to the Nigerian economy;",
          "iii. establish the linkages between the natural resources and other sectors;",
          "iv. analyse the environmental effects of exploitation activities in Nigeria;",
          "v. distinguish between the upstream and downstream activities in the oil sector ;",
          "vi. examine the roles of NNPC and OPEC in the oil sector;",
          "vii. suggest ways of controlling the effects of natural resource exploitation."
        ]
      },
      {
        "title": "Business Organizations",
        "topics": [
          "a. Private enterprises (e.g. sole-proprietorship, partnership, limited liability companies and cooperative societies)",
          "b. Problems of private enterprises;",
          "c. Public enterprises and their problems;",
          "d. Funding and management of business organizations;",
          "e. Factors determining the size of firms;",
          "f. Privatization and Commercialization as solutions to the problems of public enterprises."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. compare the types and basic features of private business organization;",
          "ii. assess the financing and management problems of business organizations;",
          "iii. identify the features of public enterprises;",
          "iv. identify the factors determining the size of firms;",
          "v. differentiate between privatization and commercialization;",
          "vi. compare the advantages and disadvantages of privatization and commercialization;"
        ]
      },
      {
        "title": "Population",
        "topics": [
          "a. Meaning and theories;",
          "b. Census: importance and problems.",
          "c. Size and growth: over-population, under- population and optimum population.",
          "d. Structure and distribution;",
          "e. Population policy and economic development."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. analyse some population theories:",
          "ii. examine the relevance of the theories to Nigeria;",
          "iii. examine the uses and limitations of census data;",
          "iv. identify determinants of the size, composition and growth of population;",
          "v. analyse the structure and distribution of population;",
          "vi. appraise government population policy in Nigeria."
        ]
      },
      {
        "title": "International Trade",
        "topics": [
          "a. Meaning and basis for international trade (absolute and comparative costs etc)",
          "b. Balance of trade and balance of payments: problems and corrective measures;",
          "c. Composition and direction of Nigeria's foreign trade;",
          "d. Exchange rate: meaning, types, and determination."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. examine the basis for international trade.",
          "ii. differentiate between absolute and comparative advantages;",
          "iii. distinguish between balance of trade and balance of payments and their corrective measures;",
          "iv. highlight the problems of balance of payments and their corrective measures;",
          "v. examine the composition and direction of Nigeria's foreign trade;",
          "vi. identify the types of exchange rates;",
          "vii. examine how exchange rates are determined."
        ]
      },
      {
        "title": "International Economic Organizations",
        "topics": [
          "Roles and relevance of international organization e.g. ECOWAS, AU, EU, ECA, IMF, EEC, OECD, World Bank, IBRD, WTO, ADB and UNCTAD, etc to Nigeria."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the various economic organizations and their functions;",
          "ii. evaluate their relevance to the Nigerian economy"
        ]
      },
      {
        "title": "Factors of Production and their Theories",
        "topics": [
          "a. Types, features, and rewards;",
          "b. Determination of wages, interest, and profits;",
          "c. Theories: marginal productivity theory of wages and liquidity preference theory;",
          "d. Factor mobility and efficiency;",
          "e. Unemployment and its solutions"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the types; features and rewards of factors;",
          "ii. analyse the determination of wages, interest, and profits;",
          "iii. interpret the marginal productivity of liquidity preference theories",
          "iv. examine factors mobility and efficiency;",
          "v. examine the types and causes of unemployment in Nigeria;",
          "vi. suggest solutions to unemployment in Nigeria."
        ]
      }
    ]
  },
  "english": {
    "title": "English Syllabus",
    "source": "English Language Syllabus from JAMB",
    "intro": "The aim of the Unified Tertiary Matriculation Examination (UTME) 2025 syllabus in Use of English is to guide the candidates in their preparation for the Board’s examination. It is designed to evaluate the candidates’ ability to:",
    "aims": [
      "communicate effectively in both written and spoken English;",
      "use the English Language for learning at the tertiary level."
    ],
    "sections": [
      {
        "title": "The Structure of the Examination",
        "topics": [
          "SECTION A: Comprehension/Summary 1 comprehension passage – 5 questions",
          "1 cloze passage – 10 questions",
          "1 reading text – 10 questions",
          "SECTION B: Lexis Structure Sentence interpretation – 5 questions",
          "Antonyms – 5 questions",
          "Synonyms – 5 questions",
          "Sentence completion – 10 questions",
          "SECTION C: Oral Forms 10 questions"
        ],
        "objectives": [
          "Total: 60 questions."
        ]
      },
      {
        "title": "A. Comprehension/Summary",
        "topics": [
          "description",
          "narration",
          "exposition",
          "argumentation/persuasion",
          "Each of the two passages to be set (one will be a cloze test) should reflect various disciplines and be about 200 words long.",
          "Questions on the passages will test the following: Comprehension of the whole or part of each passage.",
          "Comprehension of words, phrases, clauses, sentences, figures of speech and idioms as used in the passages.",
          "Coherence and logical reasoning (deductions, inferences, etc).",
          "The Lekki Headmaster by Kabir Alabi Garba",
          "Synthesis of ideas from the passages."
        ],
        "objectives": [
          "identify main points/topic sentences in passages;",
          "determine implied meaning;",
          "identify the grammatical functions of words, phrases, clauses and figurative/idiomatic expressions;",
          "deduce or infer the writer's intentions including mood, attitude to the subject matter and opinion."
        ]
      },
      {
        "title": "B. Lexis and Structure",
        "topics": [
          "synonyms",
          "antonyms",
          "homonyms",
          "clause and sentence patterns",
          "word classes and their functions",
          "mood, tense, aspect, number, agreement/concord, degree (positive, comparative and superlative) and question tags",
          "punctuation and spelling",
          "ordinary usage, figurative usage and idiomatic usage are to be tested."
        ],
        "objectives": [
          "identify words and expressions in their ordinary, figurative and idiomatic contexts;",
          "determine similar and opposite meaning of words;",
          "differentiate between correct and incorrect punctuation and spelling;",
          "identify various grammatical patterns in use;",
          "interpret information conveyed in sentences."
        ]
      },
      {
        "title": "C. Oral Forms",
        "topics": [
          "Vowels (monothongs and diphthongs)",
          "Consonants (including clusters)",
          "Rhymes (including homophones)",
          "Word stress (monosyllabic and polysyllabic)",
          "Intonation (words emphatic stress)"
        ],
        "objectives": [
          "make distinctions between vowel types;",
          "differentiate between consonant types;",
          "identify correct accentuation in individual words and connected speech."
        ]
      }
    ]
  },
  "government": {
    "title": "Government Syllabus",
    "source": "Government Syllabus from JAMB",
    "intro": "PART 1: ELEMENTS OF GOVERNMENT",
    "aims": [
      "1. Basic Concepts in Government"
    ],
    "sections": [
      {
        "title": "Basic Concepts in Government",
        "topics": [
          "a. Power, Authority, Legitimacy, Sovereignty;",
          "b. Society, State, Nation, Nation-State;",
          "c. Political Processes; Political Socialization, Political Participation, Political Culture."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the fundamental concepts in governance;",
          "ii. analyse various political processes;"
        ]
      },
      {
        "title": "Forms of Government",
        "topics": [
          "Monarchy, Aristocracy, Oligarchy, Autocracy, Republicanism, Democracy definitions, features, merits and demerits."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. distinguish between different forms of government."
        ]
      },
      {
        "title": "Arms of Government",
        "topics": [
          "a. The Legislature - types, structure, functions, powers;",
          "b. The Executive - types, functions, powers;",
          "c. The Judiciary - functions, powers, components.",
          "d. Their relationships"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the duties and obligations of the various arms of government and their agencies;",
          "ii. relate each arm to its functions;",
          "iii. appreciate how these arms interrelate."
        ]
      },
      {
        "title": "Structures of Governance",
        "topics": [
          "a. Unitary - features, reasons for adoption, merits and demerits",
          "b. Federal - features, reasons for adoption, merits and demerits",
          "c. Confederal - features, reasons for adoption, merits and demerits."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. compare the various political structures of governance."
        ]
      },
      {
        "title": "Systems of Governance",
        "topics": [
          "Presidential, Parliamentary and Monarchical."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. distinguish between the different systems of governance."
        ]
      },
      {
        "title": "Political Ideologies",
        "topics": [
          "Communalism, Feudalism, Capitalism, Socialism, Communism, Totalitarianism, Fascism, Nazism."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. differentiate between the major political ideologies;",
          "ii. contrast modes of production"
        ]
      },
      {
        "title": "Constitution",
        "topics": [
          "Meaning, Sources, Functions, Types - Written, Unwritten, Rigid and Flexible."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. Define and identify sources and functions of constitutions;",
          "ii. compare the nature of constitutions."
        ]
      },
      {
        "title": "Principles of Democratic Government",
        "topics": [
          "Ethics and Accountability in Public Office, Separation of Power, Checks and Balances, Individual and Collective Responsibility, Constitutionalism, Rule of Law, Representative Government."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the principles of democratic government;",
          "ii. determine the application of these principles;"
        ]
      },
      {
        "title": "Processes of Legislation",
        "topics": [
          "Legislative Enactments - acts, edicts, bye-laws, delegated legislation, decrees."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. analyse the processes involved in the making of laws."
        ]
      },
      {
        "title": "Citizenship",
        "topics": [
          "a. Meaning, types;",
          "b. Citizenship rights;",
          "c. Dual citizenship, renunciation, deprivation;",
          "d. Duties and obligations of citizens;",
          "e. Duties and obligations of the state."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. differentiate between the various methods of acquiring citizenship;",
          "ii. specify the rights and responsibilities of a citizen;",
          "iii. assess the obligations of the state."
        ]
      },
      {
        "title": "The Electoral Process",
        "topics": [
          "a. Suffrage - evolution, types;",
          "b. Election - types, ingredients of free and fair election;",
          "c. Electoral System - types, advantages and disadvantages of each;",
          "d. Electoral Commission - functions, problems."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. distinguish the different types of franchise",
          "ii. identify and explain the types of electoral systems",
          "iii. analyse the various electoral processes."
        ]
      },
      {
        "title": "Political Parties and Party Systems",
        "topics": [
          "a. Political parties - Definition, Organization, functions.",
          "b. Party Systems - Definition, organization, functions."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. assess the role of political parties;",
          "ii. distinguish between types of party systems."
        ]
      },
      {
        "title": "Pressure Groups",
        "topics": [
          "a. Definition, types, functions and modes of operation.",
          "b. Differences between Pressure Groups and Political Parties."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. evaluate the functions and the modus operandi of pressure groups;",
          "ii. distinguish between pressure groups and political parties."
        ]
      },
      {
        "title": "Public Opinion",
        "topics": [
          "a. Meaning, formation and measurement.",
          "b. Functions and limitations."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. compare methods of assessing public opinion;",
          "ii. assess the functions of public opinion;",
          "iii. analyse the limitations of public opinion."
        ]
      },
      {
        "title": "The Civil Service",
        "topics": [
          "Definition, characteristics, functions, structure, control and problems."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. analyse the significance of civil service in governance. PART II POLITICAL DEVELOPMENT IN NIGERIA"
        ]
      },
      {
        "title": "Pre - colonial Polities",
        "topics": [
          "Pre-jihad Hausa, Emirate, Tiv, Igbo, Yoruba",
          "a. Their structural organization;",
          "b. The functions of their various political institutions."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. appreciate the effectiveness of the pre-colonial political systems;",
          "ii. compare pre-colonial systems of governance."
        ]
      },
      {
        "title": "Imperialist Penetration",
        "topics": [
          "a. The British process of acquisition - trade, missionary activities, company rule, crown colony, protectorate;",
          "b. The British colonial administrative policy - direct and indirect rule;",
          "c. The French colonial administrative policy - assimilation and association;",
          "d. Impact of British colonial rule- economic, political, socio-cultural;",
          "e. Comparison of British and French colonial administration."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. trace the processes of imperialist penetration;",
          "ii. assess the impact of British and French policies;",
          "iii. distinguish between British and French colonial practices."
        ]
      },
      {
        "title": "Process of Decolonization",
        "topics": [
          "a. Nationalism - Meaning, Types;",
          "b. Nationalist Movements - emergence, goals, strategies;",
          "c. Nationalist Leaders - Herbert Macaulay, Nnamdi Azikiwe, Obafemi Awolowo, Ahmadu Bello, Ladipo Solanke, Aminu Kano, J. S. Tarka, Tafawa Balewa and others;",
          "d. Emergence of nationalist parties;",
          "e. Influence of external factors."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. evaluate the process of decolonization;",
          "ii. assess the roles of nationalist leaders and parties;",
          "iii. assess the impact of external forces and ideas (Pan-Africanism, Back-to-Africa Movements, Second World War etc)."
        ]
      },
      {
        "title": "Constitutional Development in Nigeria",
        "topics": [
          "a. Hugh Clifford Constitution (1922)",
          "b. Arthur Richards Constitution (1946)",
          "c. John Macpherson Constitution (1951)",
          "d. Oliver Lyttleton Constitution (1954)",
          "e. Independence Constitution (1960) Their features, merits and demerits."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. compare the various constitutional developments."
        ]
      },
      {
        "title": "Post - Independence Constitutions",
        "topics": [
          "1963, 1979, 1989 and 1999- characteristics and shortcomings."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. assess the workings of the various constitutions."
        ]
      },
      {
        "title": "Institutions of Government in the Post - Independence Nigeria",
        "topics": [
          "a. The Legislative - structure, functions and working.",
          "b. The Executive - structure, functions and workings.",
          "c. The Judiciary - structure, functions and workings."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. evaluate the operations of the arms of government and their agencies, e.g the civil service, armed forces, police, courts and others."
        ]
      },
      {
        "title": "Public Commissions Established by the 1979 and Subsequent Constitutions",
        "topics": [
          "The Civil Service Commission, the Public Complaints Commission, Electoral Commissions, National Boundary Commission and others - objectives functions and problems."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. evaluate the operations of public commissions;",
          "ii. assess the problems of the Public Commissions and their constraints."
        ]
      },
      {
        "title": "Political Parties and Party Politics in Post-Independence Nigeria",
        "topics": [
          "a. First Republic",
          "b. Second Republic",
          "c. Third Republic",
          "d. Fourth Republic - Evolution, membership spread, structure etc."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. contrast political processes in the republics;",
          "ii. evaluate the ideologies, structure and composition of the political parties."
        ]
      },
      {
        "title": "The Structure and Workings of Nigerian Federalism",
        "topics": [
          "a. Rationale for a Federal System;",
          "b. Tiers of government and their relationship;",
          "c. Creation of States - 1963, 1967, 1976, 1987, 1991, 1996;",
          "d. Problems of Nigerian Federalism - census, revenue allocation, conflicts etc. solutions e.g. Federal character, etc."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. examine the workings of Nigerian federalism;",
          "ii. identify its problems;",
          "iii. evaluate the corrective measure adopted."
        ]
      },
      {
        "title": "Public Corporations and Parastatals",
        "topics": [
          "a. Definition, types, purpose and functions;",
          "b. Finance, control and problems;",
          "c. Deregulation, privatization, commercialization - objectives, features, merits and demerits;",
          "d. Comparison between public corporations and parastatals."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. examine the operations of public corporations and parastatals;",
          "ii. identify the processes involved in privatization and commercialization;",
          "iii. assess the economic importance of privatization and commercialization."
        ]
      },
      {
        "title": "Local Government",
        "topics": [
          "a. Local government administration prior to 1976;",
          "b. Features of local government reforms (1976, 1989) - structure, functions, finance and inter-governmental relations;",
          "c. Traditional rulers and local governments;",
          "d. Problems of local government administration in Nigeria."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. trace the evolution and structure of local government;",
          "ii. identify the major problems faced by local governments."
        ]
      },
      {
        "title": "The Military in Nigerian Politics",
        "topics": [
          "a. Factors that led to military intervention;",
          "b. Structure of military regimes;",
          "c. Impact of military rule - political, e.g creation of states, introduction of unitary system (Unification Decree NO. 34) etc. economic, e.g SAP, etc.",
          "d. Processes of military disengagement."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. evaluate the reasons given for military intervention;",
          "ii. assess the achievements of military rule;",
          "iii. determine the conditions that necessitated withdrawal from governance. PART III: FOREIGN POLICY AND NIGERIA'S RELATIONS WITH THE INTERNATIONAL COMMUNITY"
        ]
      },
      {
        "title": "Foreign Policy",
        "topics": [
          "- Definition, purpose, determining factors; formulation and implementation."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. Define foreign policy, identify and explain its determinants"
        ]
      },
      {
        "title": "Nigeria's Foreign Policy",
        "topics": [
          "a. Relations with major powers;",
          "b. Relations with developing countries, e.g the Technical Aid Corps (TAC), etc.",
          "c. Nigeria's Non-Alignment Policy."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the major objectives of Nigeria's foreign policy.",
          "ii. analyse Nigeria's non-aligned posture."
        ]
      },
      {
        "title": "Relations with African Countries",
        "topics": [
          "a. Africa as the \"centre piece\" of Nigeria's forieign policy - guiding principles, implementation and implications;",
          "b. NEPAD - origin, objectives and implications."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. evaluate the role of Nigeria in continental affairs;",
          "ii. assess the role of NEPAD in developing Africa."
        ]
      },
      {
        "title": "Nigeria in International Organizations",
        "topics": [
          "a. The United Nations;",
          "b. The Commonwealth;",
          "c. The Organization of African Unity;",
          "d. The African Union;",
          "e. The Economic Community of West African States (ECOWAS);",
          "f. The Organization of Petroleum Exporting Countries (OPEC)."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. analyse the dynamics of Nigeria's involvement in international organizations;",
          "ii. assess their contribution to the development of Nigeria. PART IV: INTERNATIONAL ORGANIZATIONS:"
        ]
      },
      {
        "title": "International Organizations",
        "topics": [
          "a. ECOWAS;",
          "b. OAU, AU;",
          "c. Commonwealth;",
          "d. OPEC;",
          "e. UNO;",
          "f. African Petroleum Producers Association; - Origin, objectives, structure, functions, achievements, problems and prospects of these organizations."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. analyse the origin, objectives, structure, functions, achievements, problems and prospects of these organizations."
        ]
      }
    ]
  },
  "literature": {
    "title": "Literature Syllabus",
    "source": "Literature in English Syllabus from JAMB",
    "intro": "The aim of the Unified Tertiary Matriculation Examination (UTME) 2025 syllabus in Literature in English is to prepare the candidates for the Board’s examination. It is designed to test their achievement of the course objectives, which are to: stimulate and sustain their interest in Literature in English; create an awareness of the general principles of Literature and functions of language; appreciate literary works of all genres and across all cultures; apply the knowledge of Literature in English to the analysis of social, political and economic events in the society.",
    "aims": [
      "1. DRAMA"
    ],
    "sections": [
      {
        "title": "DRAMA",
        "topics": [
          "a. Types:",
          "i. Tragedy",
          "ii. Comedy",
          "iii. Tragicomedy",
          "iv. Melodrama",
          "v. Farce",
          "vi. Opera etc.",
          "b. Dramatic Techniques",
          "i. Characterization",
          "ii. Dialogue",
          "iii. Flashback",
          "iv. Mime",
          "v. Costume",
          "vi. Music/Dance",
          "vii. Décor/scenery",
          "viii. Acts/Scenes",
          "ix. Soliloquy/aside",
          "x. Figures of Speech etc",
          "c. Interpretation of the Prescribed Texts",
          "i. Theme",
          "ii. Plot",
          "iii. Socio-political context",
          "iv. Setting"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify the various types of drama;",
          "ii. analyse the contents of the various types of drama;",
          "iii. compare and contrast the features of different dramatic types;",
          "iv. demonstrate adequate knowledge of dramatic techniques used in each prescribed text;",
          "v. differentiate between styles of selected playwrights;",
          "vi. determine the theme of any prescribed text;",
          "vii. identify the plot of the play;",
          "viii. apply the lessons of the play to everyday living",
          "ix. identify the spatial and temporal setting of the play."
        ]
      },
      {
        "title": "PROSE",
        "topics": [
          "a. Types:",
          "i. Fiction - Novel - Novella/Novelette - Short story",
          "ii. Non-fiction - Biography - Autobiography - Memoir",
          "iii. Faction: a combination of fact and fiction",
          "b. Narrative Techniques/Devices:",
          "i. Point of view - Omniscent/Third Person - First Person",
          "ii. Characterisation - Round, flat, foil, hero, antihero, etc",
          "iii. Language",
          "c. Textual Analysis",
          "i. Theme",
          "ii. Plot",
          "iii. Setting (Temporal/Spatial)",
          "iv. Socio-political context"
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. differentiate between types of prose;",
          "ii. identify the category that each prescribed text belongs to;",
          "iii. analyse the components of each type of prose;",
          "iv. identify the narrative techniques used in each of the prescribed texts;",
          "v. determine an author's narrative style;",
          "vi. distinguish between one type of character from another;",
          "vii. determine the thematic pre-occupation of the author of the prescribed text;",
          "viii. indicate the plot of the novel; identify the temporal and spatial setting of the novel.",
          "ix. identify the temporal and spatial setting of the novel",
          "x. relate the prescribed text to real-life situations."
        ]
      },
      {
        "title": "POETRY",
        "topics": [
          "a. Types:",
          "i. Sonnet",
          "ii. Ode",
          "iii. Lyrics",
          "iv. Elegy",
          "v. Ballad",
          "vi. Panegyric",
          "vii. Epic",
          "viii. Blank Verse, etc.",
          "b. Poetic devices",
          "i. Structure",
          "ii. Imagery",
          "iii. Sound(Rhyme/Rhythm, repetition, pun, onomatopoeia, etc.)",
          "iv. Diction",
          "v. Persona",
          "c. Appreciation",
          "i. Thematic preoccupation",
          "ii. Socio-political relevance",
          "iii. Style."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify different types of poetry;",
          "ii. compare and contrast the features of different poetic types:",
          "iii. determine the devices used by various poets;",
          "iv. show how poetic devices are used for aesthetic effect in each poem;",
          "v. deduce the poet's preoccupation from the poem;",
          "vi. appraise poetry as an art with moral values;",
          "vii. apply the lessons from the poem to real-life situations."
        ]
      },
      {
        "title": "GENERAL LITERARY PRINCIPLES",
        "topics": [
          "a. Literary terms: foreshadowing, suspense, theatre, monologue, dialogue, soliloquy, symbolism, protagonist, antagonist, figures of speech, satire, stream of consciousness, etc., in addition to those listed above under the different genres.",
          "b. Literary principles",
          "i. Direct imitation in play;",
          "ii. Versification in drama and poetry;",
          "iii. Narration of people's experiences;",
          "iv. Achievement of aesthetic value, etc.",
          "c. Relationship between literary terms and principles."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. identify literary terms in drama, prose, and poetry;",
          "ii. identify the general principles of Literature;",
          "iii. differentiate between literary terms and principles;",
          "iv. use literary terms appropriately."
        ]
      },
      {
        "title": "LITERARY APPRECIATION",
        "topics": [
          "Unseen passages/extracts from Drama, Prose, and Poetry."
        ],
        "objectives": [
          "Candidates should be able to:",
          "i. determine literary devices used in a given passage/extract;",
          "ii. provide a meaningful interpretation of the given passage/extract;",
          "iii. relate the extract to true life experiences."
        ]
      }
    ]
  },
  "mathematics": {
    "title": "Mathematics Syllabus",
    "source": "Mathematics Syllabus from JAMB",
    "intro": "The aim of the Unified Tertiary Matriculation Examination (UTME) 2025 syllabus in Mathematics is to prepare the candidates for the Board's examination. It is designed to test the achievement of the course objectives, which are to:",
    "aims": [
      "(1) acquire computational and manipulative skills;",
      "(2) develop precise, logical and formal reasoning skills;",
      "(3) develop deductive skills in interpretation of graphs, diagrams and data;",
      "(4) apply mathematical concepts to resolve issues in daily living."
    ],
    "sections": [
      {
        "title": "SECTION I: NUMBER AND NUMERATION — 1. Number bases:",
        "topics": [
          "Operations in different number bases from 2 to 10",
          "Conversion from one base to another including fractional parts"
        ],
        "objectives": [
          "Perform four basic operations (×, +, -, ÷)",
          "Convert one base to another"
        ]
      },
      {
        "title": "SECTION I: NUMBER AND NUMERATION — 2. Fractions, Decimals, Approximations and Percentages:",
        "topics": [
          "Fractions and decimals",
          "Significant figures",
          "Decimal places",
          "Percentage errors",
          "Simple interest",
          "Profit and loss percent",
          "Ratio, proportion and rate",
          "Shares and value added tax (VAT)"
        ],
        "objectives": [
          "Perform basic operations (×, +, -, ÷) on fractions and decimals",
          "Express to specified number of significant figures and decimal places",
          "Calculate simple interest, profit and loss percent, ratio, proportion and rate",
          "Solve problems involving share and VAT"
        ]
      },
      {
        "title": "SECTION I: NUMBER AND NUMERATION — 3. Indices, Logarithms and Surds:",
        "topics": [
          "Laws of indices",
          "Standard form",
          "Laws of logarithm",
          "Logarithm of any positive number to a given base",
          "Change of bases in logarithm and application",
          "Relationship between indices and logarithm",
          "Surds"
        ],
        "objectives": [
          "Apply the laws of indices in calculation",
          "Establish the relationship between indices and logarithms in solving problems",
          "Solve problems in different bases in logarithms",
          "Simplify and rationalize surds",
          "Perform basic operations on surds"
        ]
      },
      {
        "title": "SECTION I: NUMBER AND NUMERATION — 4. Sets:",
        "topics": [
          "Types of sets",
          "Algebra of sets",
          "Venn diagrams and their applications"
        ],
        "objectives": [
          "Identify types of sets, i.e empty, universal, complements, subsets, finite, infinite and disjoint sets",
          "Solve problems involving cardinality of sets",
          "Solve set problems using symbol",
          "Use Venn diagrams to solve problems involving not more than 3 sets"
        ]
      },
      {
        "title": "SECTION II: ALGEBRA — 1. Polynomials:",
        "topics": [
          "Change of subject of formula",
          "Factor and remainder theorems",
          "Factorization of polynomials of degree not exceeding 3",
          "Multiplication and division of polynomials",
          "Roots of polynomials not exceeding degree 3",
          "Simultaneous equations including one linear one quadratic",
          "Graphs of polynomials of degree not greater than 3"
        ],
        "objectives": [
          "Find the subject of the formula of a given equation",
          "Apply factor and remainder theorem to factorize a given expression",
          "Multiply and divide polynomials of degree not more than 3",
          "Factorize by regrouping difference of two squares, perfect squares and cubic expressions, etc.",
          "Solve simultaneous equations - one linear, one quadratic",
          "Interpret graphs of polynomials including applications to maximum and minimum values"
        ]
      },
      {
        "title": "SECTION II: ALGEBRA — 2. Variation:",
        "topics": [
          "Direct",
          "Inverse",
          "Joint",
          "Partial",
          "Percentage increase and decrease"
        ],
        "objectives": [
          "Solve problems involving direct, inverse, joint and partial variations",
          "Solve problems on percentage increase and decrease in variation"
        ]
      },
      {
        "title": "SECTION II: ALGEBRA — 3. Inequalities:",
        "topics": [
          "Analytical and graphical solutions of linear inequalities",
          "Quadratic inequalities with integral roots only"
        ],
        "objectives": [
          "Solve problems on linear and quadratic inequalities",
          "Interpret graphs of inequalities"
        ]
      },
      {
        "title": "SECTION II: ALGEBRA — 4. Progression:",
        "topics": [
          "nth term of a progression",
          "Sum of A.P. and G.P."
        ],
        "objectives": [
          "Determine the nth term of a progression",
          "Compute the sum of A.P. and G.P.",
          "Sum to infinity of a given G.P."
        ]
      },
      {
        "title": "SECTION II: ALGEBRA — 5. Binary Operations:",
        "topics": [
          "Properties of closure, commutativity, associativity and distributivity",
          "Identity and inverse elements (simple cases only)"
        ],
        "objectives": [
          "Solve problems involving closure, commutativity, associativity and distributivity",
          "Solve problems involving identity and inverse elements"
        ]
      },
      {
        "title": "SECTION II: ALGEBRA — 6. Matrices and Determinants:",
        "topics": [
          "Algebra of matrices not exceeding 3 x 3",
          "Determinants of matrices not exceeding 3 x 3",
          "Inverses of 2 x 2 matrices [excluding quadratic and higher degree equations]"
        ],
        "objectives": [
          "Perform basic operations (×, +, -, ÷) on matrices",
          "Calculate determinants",
          "Compute inverses of 2 x 2 matrices"
        ]
      },
      {
        "title": "SECTION III: GEOMETRY AND TRIGONOMETRY — 1. Euclidean Geometry:",
        "topics": [
          "Properties of angles and lines",
          "Polygons: triangles, quadrilaterals and general polygons",
          "Circles: angle properties, cyclic quadrilaterals and intersecting chords",
          "Construction"
        ],
        "objectives": [
          "Identify various types of lines and angles",
          "Solve problems involving polygons",
          "Calculate angles using circle theorems",
          "Identify construction procedures of special angles, e.g. 30°, 45°, 60°, 75°, 90°, etc."
        ]
      },
      {
        "title": "SECTION III: GEOMETRY AND TRIGONOMETRY — 2. Mensuration:",
        "topics": [
          "Lengths and areas of plane geometrical figures",
          "Lengths of arcs and chords of a circle",
          "Perimeters and areas of sectors and segments of circles",
          "Surface areas and volumes of simple solids and composite figures",
          "The earth as a sphere: longitudes and latitudes"
        ],
        "objectives": [
          "Calculate the perimeters and areas of triangles, quadrilaterals, circles and composite figures",
          "Find the length of an arc, a chord, perimeters and areas of sectors and segments of circles",
          "Calculate total surface areas and volumes of cuboids, cylinders, cones, pyramids, prisms, spheres and composite figures",
          "Determine the distance between two points on the earth's surface"
        ]
      },
      {
        "title": "SECTION III: GEOMETRY AND TRIGONOMETRY — 3. Loci:",
        "topics": [],
        "objectives": [
          "Identify and interpret loci relating to parallel lines, perpendicular bisectors, angle bisectors and circles"
        ]
      },
      {
        "title": "SECTION III: GEOMETRY AND TRIGONOMETRY — 4. Coordinate Geometry:",
        "topics": [
          "Midpoint and gradient of a line segment",
          "Distance between two points",
          "Parallel and perpendicular lines",
          "Equations of straight lines"
        ],
        "objectives": [
          "Determine the midpoint and gradient of a line segment",
          "Find the distance between two points",
          "Identify conditions for parallelism and perpendicularity",
          "Find the equation of a line in the two-point form, point-slope form, slope intercept form and the general form"
        ]
      },
      {
        "title": "SECTION III: GEOMETRY AND TRIGONOMETRY — 5. Trigonometry:",
        "topics": [
          "Trigonometrical ratios of angles",
          "Angles of elevation and depression",
          "Bearings",
          "Areas and solutions of triangle",
          "Graphs of sine and cosine",
          "Sine and cosine formulae"
        ],
        "objectives": [
          "Calculate the sine, cosine and tangent of angles between -360° ≤ θ ≤ 360°",
          "Apply these special angles, e.g. 30°, 45°, 60°, 75°, 90°, 105°, 135° to solve simple problems in trigonometry",
          "Solve problems involving angles of elevation and depression",
          "Solve problems involving bearings",
          "Apply trigonometric formulae to find areas of triangles",
          "Solve problems involving sine and cosine graphs"
        ]
      },
      {
        "title": "SECTION IV: CALCULUS — 1. Differentiation:",
        "topics": [
          "limit of a function",
          "differentiation of explicit algebraic and simple trigonometrical functions - sine, cosine and tangent"
        ],
        "objectives": [
          "find the limit of a function",
          "differentiate explicit algebraic and simple trigonometrical functions"
        ]
      },
      {
        "title": "SECTION IV: CALCULUS — 2. Application of differentiation:",
        "topics": [
          "rate of change",
          "maxima and minima",
          "Objective: solve problems involving applications of rate of change, maxima and minima"
        ],
        "objectives": []
      },
      {
        "title": "SECTION IV: CALCULUS — 3. Integration:",
        "topics": [
          "integration of explicit algebraic and simple trigonometrical functions",
          "area under the curve"
        ],
        "objectives": [
          "solve problems of integration involving algebraic and simple trigonometric functions",
          "calculate area under the curve (simple cases only)"
        ]
      },
      {
        "title": "SECTION V: STATISTICS — 1. Representation of data:",
        "topics": [
          "frequency distribution",
          "histogram, bar chart and pie chart"
        ],
        "objectives": [
          "identify and interpret frequency distribution tables",
          "interpret information on histogram, bar chart and pie chart"
        ]
      },
      {
        "title": "SECTION V: STATISTICS — 2. Measures of Location:",
        "topics": [
          "mean, mode and median of ungrouped and grouped data (simple cases only)",
          "cumulative frequency"
        ],
        "objectives": [
          "calculate the mean, mode and median of ungrouped and grouped data (simple cases only)",
          "use ogive to find the median, quartiles and percentiles"
        ]
      },
      {
        "title": "SECTION V: STATISTICS — 4. Permutation and Combination:",
        "topics": [
          "Linear and circular arrangements",
          "Arrangements involving repeated objects",
          "Objective: solve simple problems involving permutation and combination"
        ],
        "objectives": []
      },
      {
        "title": "SECTION V: STATISTICS — 5. Probability:",
        "topics": [
          "experimental probability (tossing of coin, throwing of a dice etc)",
          "Addition and multiplication of probabilities (mutual and independent cases)",
          "Objective: solve simple problems in probability (including addition and multiplication)"
        ],
        "objectives": []
      }
    ]
  },
  "physics": {
    "title": "Physics — Syllabus (Summary)",
    "source": "Physics — Syllabus (Summary)",
    "intro": "This page contains a cleaned and readable version of the physics syllabus. Use the quick-links or lesson planner to map topics to lessons.",
    "aims": [],
    "sections": [
      {
        "title": "1. Measurements & Units",
        "topics": [
          "Length, area, volume — Vernier, micrometer, measuring cylinder.",
          "Mass, time; fundamental and derived quantities; units and dimensions.",
          "Errors, significant figures, standard form."
        ],
        "objectives": []
      },
      {
        "title": "2. Motion & Forces",
        "topics": [
          "Linear motion, kinematics, projectile motion, circular motion.",
          "Newton's laws, momentum, impulse, conservation.",
          "Simple harmonic motion and energy in oscillations."
        ],
        "objectives": []
      },
      {
        "title": "3. Work, Energy & Power",
        "topics": [
          "Energy forms, conservation, power, applications and societal context (renewables, environmental impact)."
        ],
        "objectives": []
      },
      {
        "title": "4. Gravitation & Fields",
        "topics": [
          "Newtonian gravitation, potential, escape velocity, satellite motion."
        ],
        "objectives": []
      },
      {
        "title": "5. Waves, Optics & Electricity",
        "topics": [
          "Wave properties, sound, ray optics, basic circuits and electromagnetism essentials."
        ],
        "objectives": []
      },
      {
        "title": "6. Thermal Physics & Modern Topics",
        "topics": [
          "Heat, temperature, kinetic theory, and selected modern physics topics as appropriate."
        ],
        "objectives": []
      }
    ],
    "note": "This is a trimmed summary for classroom planning. For the authoritative, detailed syllabus refer to the official board document and paste it into Quick Links for easy access."
  }
};
