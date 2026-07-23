export type TeamMember = {
  id: string;
  name: string;
  role: string;
  linkedin: string;
  origin: string;
};

export type KeyLink = {
  id: string;
  label: string;
  url: string;
};

export type FormState = {
  gameName: string;
  pitch: string;
  completionDate: string;
  team: TeamMember[];
  keyRoles: string;
  ipDistribution: string;
  studentDates: string;
  images: string[];
  keyLinks: KeyLink[];

  showPitch: boolean;
  showCompletionDate: boolean;
  showTeam: boolean;
  showKeyRoles: boolean;
  showIpDistribution: boolean;
  showStudentDates: boolean;
  showKeyLinks: boolean;

  // Labels
  headerEyebrowLeft: string;
  headerEyebrowRight: string;
  headerSubRight: string;
  page1Section1Number: string;
  page1Section1Title: string;
  page1Section2Number: string;
  page1Section2Title: string;
  page2HeaderSuffix: string;
  page2NumberInfo: string;
  page2Section1Number: string;
  page2Section1Title: string;
  tableHeaderName: string;
  tableHeaderRole: string;
  tableHeaderProfile: string;
  tableHeaderOrigin: string;
  tableEmptyText: string;
  page2Section2Number: string;
  page2Section2Title: string;
  page2Section3Number: string;
  page2Section3Title: string;
  page2Section4Number: string;
  page2Section4Title: string;
  page2Section5Number: string;
  page2Section5Title: string;
  extraVisualsTitle: string;
};

export const initialState: FormState = {
  gameName: "Underlands",
  pitch: `Underlands is een procedurally generated 3D co-op action-RPG roguelite waarin jij en je vrienden als Threadwalkers op gevaarlijke expedities trekken door het mysterieuze, veranderlijke gangenstelsel van de Undercurrents.\n\nSinds de Reckoning de oppervlakte verwoestte, is de mensheid naar de diepte gevlucht. Gewapend met magische uitrusting verkennen spelers een eeuwenoud portaalnetwerk van een lang-vergane beschaving, de Predecessors.\n\nMet een combinatie van snelle, vloeiende actie en een diepgaand verzamel- en craftingsysteem baant jouw team zich een weg door steeds gevaarlijker wordende biomen. Verzamel zeldzame grondstoffen, versla gecorrumpeerde monsters en imposante bazen, en breng waardevolle schatten en kaartgegevens terug naar de Bastion om permanent sterker te worden.\n\nGeen enkele afdaling is hetzelfde. Stippel je eigen route uit, trotseer de gevaren van het diepe en leg het netwerk van de wereld bloot!`,
  completionDate: "28/09/2027",
  team: [
    {
      id: "1",
      name: "Nathan Pesch",
      role: "Game Director",
      linkedin: "https://www.linkedin.com/in/nathan-pesch/",
      origin: "Vlaams (geboren te Asse)"
    }
  ],
  keyRoles: "Game Director: Nathan Pesch\nArt Director: \nTechnical Director: \nProducer: ",
  ipDistribution: "N.v.t.",
  studentDates: "N.v.t.",
  images: [],
  keyLinks: [
    { id: "1", label: "Playthrough Video", url: "https://youtube.com/" },
    { id: "2", label: "Game Build", url: "https://itch.io/" }
  ],

  showPitch: true,
  showCompletionDate: true,
  showTeam: true,
  showKeyRoles: true,
  showIpDistribution: true,
  showStudentDates: true,
  showKeyLinks: true,

  headerEyebrowLeft: "Intake Games",
  headerEyebrowRight: "2-Pager",
  headerSubRight: "Prepared for: Projectbeheerder",
  page1Section1Number: "01",
  page1Section1Title: "Pitch / Gameconcept",
  page1Section2Number: "02",
  page1Section2Title: "Beoogde Afronding Fase",
  page2HeaderSuffix: "- Details",
  page2NumberInfo: "PAGE\n02/02",
  page2Section1Number: "03",
  page2Section1Title: "Teamsamenstelling",
  tableHeaderName: "Naam",
  tableHeaderRole: "Rol",
  tableHeaderProfile: "Profiel",
  tableHeaderOrigin: "Herkomst",
  tableEmptyText: "Geen teamleden toegevoegd.",
  page2Section2Number: "04",
  page2Section2Title: "Sleutelrollen",
  page2Section3Number: "05",
  page2Section3Title: "IP Verdeling",
  page2Section4Number: "06",
  page2Section4Title: "Studenten in Team",
  page2Section5Number: "07",
  page2Section5Title: "Belangrijke Links",
  extraVisualsTitle: "Extra Visuals",
};

