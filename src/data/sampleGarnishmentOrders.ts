import {GarnishmentOrderWithTimeline} from "@/context/GarnishmentContext";

// Sample data with updated values and new fields
export const initialOrders: GarnishmentOrderWithTimeline[] = [
  {
    id: "1",
    caseNumber: "GRN-2023-001",
    customerName: "Seidel Nohlmans AG GMBH",
    accountNumber: "DE41 3470 1991 0717 3190 00",
    dateReceived: new Date("2025-03-08T22:00:00.000Z"),
    dueDate: new Date("2025-05-07T22:00:00.000Z"),
    currentStage: "legal_team",
    amount: 32364,
    courtOrderNumber: "7113-581819/5",
    courtAddress: "Katharine-Kade-Platz 2, 31117 Biedenkopf",
    defendantAddress: "Fritschring 6/0, 56213 Wolmirstedt",
    defendantId: "HRB 91322",
    plaintiff: "Tlustek"
  },
  {
    id: "2",
    caseNumber: "GRN-2023-002",
    customerName: "Zimmer GMBH",
    accountNumber: "DE52 4576 7602 0512 3837 00",
    dateReceived: new Date("2025-03-22T22:00:00.000Z"),
    dueDate: new Date("2025-05-21T22:00:00.000Z"),
    currentStage: "case_management",
    amount: 90030,
    courtOrderNumber: "1869-564430/2",
    courtAddress: "Dariusz-Reichmann-Weg 3, 47299 Beeskow",
    defendantAddress: "Hilde-Atzler-Platz 14, 27793 Schlüchtern",
    defendantId: "HRB 39650",
    plaintiff: "Pieper Otto Stiftung & Co. KG"
  },
  {
    id: "3",
    caseNumber: "GRN-2023-003",
    customerName: "Kade Vogt KG GMBH",
    accountNumber: "DE42 6713 4194 0526 7828 00",
    dateReceived: new Date("2025-03-31T22:00:00.000Z"),
    dueDate: new Date("2025-05-30T22:00:00.000Z"),
    currentStage: "case_management",
    amount: 65493,
    courtOrderNumber: "3856-803187/1",
    courtAddress: "Junckenallee 41, 93112 Uelzen",
    defendantAddress: "Julian-Ullmann-Straße 8, 88731 Forchheim",
    defendantId: "HRB 66780",
    plaintiff: "Stadelmann AG"
  },
  {
    id: "4",
    caseNumber: "GRN-2023-004",
    customerName: "Graf Linke e.V. GMBH",
    accountNumber: "DE56 4515 9294 0454 8165 00",
    dateReceived: new Date("2025-03-25T22:00:00.000Z"),
    dueDate: new Date("2025-10-04T22:00:00.000Z"),
    currentStage: "customer_management",
    amount: 90459,
    courtOrderNumber: "1605-370356/9",
    courtAddress: "Ljudmila-Söding-Straße 1/5 78801 Wiedenbrück",
    defendantAddress: "Hendriksring 7, 85397 Duderstadt",
    defendantId: "HRB 85037",
    plaintiff: "Säuberlich GmbH & Co. KG"
  },
  {
    id: "5",
    caseNumber: "GRN-2023-005",
    customerName: "Dörr GMBH",
    accountNumber: "DE24 3419 6512 0262 8349 00",
    dateReceived: new Date("2025-03-27T22:00:00.000Z"),
    dueDate: new Date("2025-08-09T22:00:00.000Z"),
    currentStage: "compliance_team",
    amount: 30773,
    courtOrderNumber: "2118-279396/4",
    courtAddress: "Elias-Cichorius-Straße 3/7 89632 Fulda",
    defendantAddress: "Kobeltstraße 5, 68909 Rochlitz",
    defendantId: "HRB 64593",
    plaintiff: "Bauer Stiftung & Co. KGaA"
  },
  {
    id: "6",
    caseNumber: "GRN-2023-006",
    customerName: "Oderwald GMBH",
    accountNumber: "DE2426 3004 8477 6371",
    dateReceived: new Date("2025-03-14T22:00:00.000Z"),
    dueDate: new Date("2025-06-14T22:00:00.000Z"),
    currentStage: "legal_team",
    amount: 45000,
    courtOrderNumber: "4873-481611/7",
    courtAddress: "Haufferring 32, 93780 Grafenau",
    defendantAddress: "Silva-Heser-Allee 3, 26502 Hechingen",
    defendantId: "HRB 36553",
    plaintiff: "Börner AG & Co. KGaA"
  },
  {
    id: "7",
    caseNumber: "GRN-2023-007",
    customerName: "BEISPIEL BAU GMBH",
    accountNumber: "DE89 3704 0044 0532 0130 00",
    dateReceived: new Date("2025-04-05T22:00:00.000Z"),
    dueDate: new Date("2025-06-19T22:00:00.000Z"),
    currentStage: "customer_management",
    amount: 17657,
    courtOrderNumber: "0123-4567/22",
    courtAddress: "Kolner Straße 10 60311 Frankfurt am Main",
    defendantAddress: "Beispielweg 45, 80331 München",
    defendantId: "HRB 12345",
    plaintiff: "ABC Company GMBH"
  },
  {
    id: "8",
    caseNumber: "GRN-2023-008",
    customerName: "Rust GMBH",
    accountNumber: "DE7765 8509 5522 7806",
    dateReceived: new Date("2025-03-16T22:00:00.000Z"),
    dueDate: new Date("2025-05-31T23:00:00.000Z"),
    currentStage: "case_management",
    amount: 17657,
    courtOrderNumber: "8233-795120/1",
    courtAddress: "Heinz-Wilhelm-Patberg-Gasse 1, 85017 Oranienburg",
    defendantAddress: "Heiner-Salz-Ring 308, 21045 Wiedenbrück",
    defendantId: "HRB 92237",
    plaintiff: "Binner GmbH & Co. KG"
  },
  {
    id: "9",
    caseNumber: "GRN-2023-009",
    customerName: "Meister GMBH",
    accountNumber: "DE97 2736 6237 0478 2257 00",
    dateReceived: new Date("2025-03-20T22:00:00.000Z"),
    dueDate: new Date("2025-11-04T23:00:00.000Z"),
    currentStage: "case_management",
    amount: 79752,
    courtOrderNumber: "9266-740318/9",
    courtAddress: "Haeringgasse 348, 88581 Oschatz",
    defendantAddress: "Camilla-Tröst-Platz 128, 11209 Dessau",
    defendantId: "HRB 42097",
    plaintiff: "Adler"
  }
];
