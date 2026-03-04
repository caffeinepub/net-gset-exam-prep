import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
  type Paper = {
    id : Nat;
    title : Text;
    description : Text;
  };

  type Unit = {
    id : Nat;
    paperId : Nat;
    title : Text;
    content : Text;
    order : Nat;
  };

  type PYQ = {
    id : Nat;
    paperId : Nat;
    year : Nat;
    title : Text;
    downloadUrl : Text;
  };

  module Unit {
    public func compareByOrder(unit1 : Unit, unit2 : Unit) : Order.Order {
      Nat.compare(unit1.order, unit2.order);
    };
  };

  let papers = Map.fromIter<Nat, Paper>([
    (1, { id = 1; title = "Paper 1: Teaching Aptitude & Research Methodology"; description = "General paper covering teaching and research skills." }),
    (2, { id = 2; title = "Paper 2: Education Subject"; description = "Subject-specific paper for Education." }),
  ].values());

  let units = Map.fromIter<Nat, Unit>([
    (1, { id = 1; paperId = 1; title = "Teaching Aptitude"; content = "Study notes for Teaching Aptitude"; order = 1 }),
    (2, { id = 2; paperId = 1; title = "Research Aptitude"; content = "Study notes for Research Aptitude"; order = 2 }),
    (3, { id = 3; paperId = 1; title = "Comprehension"; content = "Study notes for Comprehension"; order = 3 }),
    (4, { id = 4; paperId = 1; title = "Communication"; content = "Study notes for Communication"; order = 4 }),
    (5, { id = 5; paperId = 1; title = "Mathematical Reasoning & Aptitude"; content = "Study notes for Mathematical Reasoning"; order = 5 }),
    (6, { id = 6; paperId = 1; title = "Logical Reasoning"; content = "Study notes for Logical Reasoning"; order = 6 }),
    (7, { id = 7; paperId = 1; title = "Data Interpretation"; content = "Study notes for Data Interpretation"; order = 7 }),
    (8, { id = 8; paperId = 1; title = "Information & Communication Technology"; content = "Study notes for ICT"; order = 8 }),
    (9, { id = 9; paperId = 1; title = "People & Environment"; content = "Study notes for People & Environment"; order = 9 }),
    (10, { id = 10; paperId = 1; title = "Higher Education System"; content = "Study notes for Higher Education System"; order = 10 }),
    (11, { id = 11; paperId = 2; title = "Philosophical Foundations of Education"; content = "Study notes for Philosophy"; order = 1 }),
    (12, { id = 12; paperId = 2; title = "Sociological Foundations of Education"; content = "Study notes for Sociology"; order = 2 }),
    (13, { id = 13; paperId = 2; title = "Psychological Foundations"; content = "Study notes for Psychology"; order = 3 }),
    (14, { id = 14; paperId = 2; title = "Curriculum Development"; content = "Study notes for Curriculum"; order = 4 }),
    (15, { id = 15; paperId = 2; title = "Instructional Technology"; content = "Study notes for Instructional Tech"; order = 5 }),
    (16, { id = 16; paperId = 2; title = "Educational Measurement & Evaluation"; content = "Study notes for Measurement/Evaluation"; order = 6 }),
    (17, { id = 17; paperId = 2; title = "Educational Administration & Management"; content = "Study notes for Administration/Management"; order = 7 }),
    (18, { id = 18; paperId = 2; title = "Distance Education"; content = "Study notes for Distance Education"; order = 8 }),
    (19, { id = 19; paperId = 2; title = "Educational Research"; content = "Study notes for Research"; order = 9 }),
    (20, { id = 20; paperId = 2; title = "Gender Issues in Education"; content = "Study notes for Gender Issues"; order = 10 }),
  ].values());

  let pyqs = Map.fromIter<Nat, PYQ>([
    (1, { id = 1; paperId = 1; year = 2024; title = "Paper 1 - 2024"; downloadUrl = "https://example.com/pyq/paper1-2024.pdf" }),
    (2, { id = 2; paperId = 1; year = 2023; title = "Paper 1 - 2023"; downloadUrl = "https://example.com/pyq/paper1-2023.pdf" }),
    (3, { id = 3; paperId = 1; year = 2022; title = "Paper 1 - 2022"; downloadUrl = "https://example.com/pyq/paper1-2022.pdf" }),
    (4, { id = 4; paperId = 1; year = 2021; title = "Paper 1 - 2021"; downloadUrl = "https://example.com/pyq/paper1-2021.pdf" }),
    (5, { id = 5; paperId = 1; year = 2020; title = "Paper 1 - 2020"; downloadUrl = "https://example.com/pyq/paper1-2020.pdf" }),
    (6, { id = 6; paperId = 1; year = 2019; title = "Paper 1 - 2019"; downloadUrl = "https://example.com/pyq/paper1-2019.pdf" }),
    (7, { id = 7; paperId = 2; year = 2024; title = "Paper 2 - 2024"; downloadUrl = "https://example.com/pyq/paper2-2024.pdf" }),
    (8, { id = 8; paperId = 2; year = 2023; title = "Paper 2 - 2023"; downloadUrl = "https://example.com/pyq/paper2-2023.pdf" }),
    (9, { id = 9; paperId = 2; year = 2022; title = "Paper 2 - 2022"; downloadUrl = "https://example.com/pyq/paper2-2022.pdf" }),
    (10, { id = 10; paperId = 2; year = 2021; title = "Paper 2 - 2021"; downloadUrl = "https://example.com/pyq/paper2-2021.pdf" }),
    (11, { id = 11; paperId = 2; year = 2020; title = "Paper 2 - 2020"; downloadUrl = "https://example.com/pyq/paper2-2020.pdf" }),
    (12, { id = 12; paperId = 2; year = 2019; title = "Paper 2 - 2019"; downloadUrl = "https://example.com/pyq/paper2-2019.pdf" }),
  ].values());

  public query ({ caller }) func getPapers() : async [Paper] {
    papers.values().toArray();
  };

  public query ({ caller }) func getUnitsByPaper(paperId : Nat) : async [Unit] {
    if (not papers.containsKey(paperId)) {
      Runtime.trap("Paper not found");
    };
    let filteredUnits = units.values().filter(
      func(unit) {
        unit.paperId == paperId;
      }
    ).toArray();
    filteredUnits.sort(Unit.compareByOrder);
  };

  public query ({ caller }) func getPYQsByPaper(paperId : Nat) : async [PYQ] {
    if (not papers.containsKey(paperId)) {
      Runtime.trap("Paper not found");
    };
    pyqs.values().filter(
      func(pyq) {
        pyq.paperId == paperId;
      }
    ).toArray();
  };

  public query ({ caller }) func getAllPYQs() : async [PYQ] {
    pyqs.values().toArray();
  };
};
