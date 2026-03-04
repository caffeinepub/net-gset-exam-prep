import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ChevronLeft, FileDown, Home, Menu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { ActiveView } from "../App";
import type { Unit } from "../backend.d";
import {
  useGetPYQsByPaper,
  useGetPapers,
  useGetUnitsByPaper,
} from "../hooks/useQueries";
import PYQTab from "./PYQTab";
import StudyNotesTab from "./StudyNotesTab";
import UnitSidebar from "./UnitSidebar";

interface PaperViewProps {
  paperKey: "paper1" | "paper2";
  onNavigate: (view: ActiveView) => void;
}

// Fallback static data
const FALLBACK_PAPERS = [
  {
    id: BigInt(1),
    title: "Paper 1: Teaching & Research Aptitude",
    description:
      "Covers fundamental concepts of Teaching and Research Aptitude for NET/GSET.",
  },
  {
    id: BigInt(2),
    title: "Paper 2: Education",
    description:
      "In-depth study of Education as a discipline for NET/GSET candidates.",
  },
];

const FALLBACK_UNITS: Record<string, Unit[]> = {
  "1": [
    {
      id: BigInt(1),
      title: "Teaching Aptitude",
      content:
        "## Teaching Aptitude\n\nTeaching is a complex professional activity that involves helping students learn effectively. This unit covers the nature, objectives, and characteristics of teaching.\n\n### Nature of Teaching\n\nTeaching is a **tri-polar process** involving the teacher, learner, and curriculum. Effective teaching requires understanding of:\n\n- **Learner characteristics**: cognitive development, motivation, learning styles\n- **Subject matter**: deep content knowledge and pedagogical content knowledge\n- **Teaching strategies**: direct instruction, collaborative learning, inquiry-based learning\n\n### Levels of Teaching\n\n1. **Memory Level** (Herbartian): Focus on memorization and recall of facts\n2. **Understanding Level** (Morrison): Focus on comprehension and application\n3. **Reflective Level** (Hunt): Highest level involving critical analysis and problem-solving\n\n### Maxims of Teaching\n\n- From known to unknown\n- From concrete to abstract\n- From simple to complex\n- From whole to part\n- From particular to general\n\n### Characteristics of a Good Teacher\n\nA good teacher demonstrates subject mastery, empathy, communication skills, patience, creativity, and continuous professional development.\n\n### Teaching Methods\n\n**Lecture Method**: Traditional direct instruction; efficient for large groups but limits interaction.\n\n**Discussion Method**: Promotes critical thinking; students engage actively with content.\n\n**Project Method**: Problem-solving approach connecting theory to practice.\n\n**Demonstration Method**: Shows practical application; effective for skill-based learning.",
      order: BigInt(1),
      paperId: BigInt(1),
    },
    {
      id: BigInt(2),
      title: "Research Aptitude",
      content:
        "## Research Aptitude\n\nResearch is a systematic, objective process of collecting and analyzing data to answer questions or solve problems.\n\n### Types of Research\n\n**Basic/Pure Research**: Aims to expand knowledge without immediate practical application.\n\n**Applied Research**: Solves specific practical problems using existing knowledge.\n\n**Action Research**: Conducted by practitioners to improve their own practice.\n\n### Research Process\n\n1. Identification of research problem\n2. Review of related literature\n3. Formulation of hypothesis\n4. Research design and methodology\n5. Data collection\n6. Data analysis and interpretation\n7. Conclusions and recommendations\n\n### Research Methods\n\n**Experimental Method**: Controls variables to establish cause-effect relationships.\n\n**Survey Method**: Collects data from a sample to generalize about a population.\n\n**Case Study**: In-depth investigation of a single unit (person, institution, event).\n\n**Historical Method**: Studies past events to understand present phenomena.\n\n### Sampling Techniques\n\n- **Random Sampling**: Equal probability of selection for all units\n- **Stratified Sampling**: Population divided into strata; samples drawn from each\n- **Cluster Sampling**: Natural groups (clusters) selected as sampling units\n- **Purposive Sampling**: Subjects selected based on specific criteria",
      order: BigInt(2),
      paperId: BigInt(1),
    },
    {
      id: BigInt(3),
      title: "Reading Comprehension",
      content: `## Reading Comprehension\n\nReading comprehension is the ability to understand, interpret, and evaluate written text. This unit focuses on strategies for improving comprehension skills.\n\n### Types of Reading\n\n**Skimming**: Reading quickly to get the main idea without focusing on details.\n\n**Scanning**: Reading to locate specific information.\n\n**Intensive Reading**: Careful, detailed reading for complete understanding.\n\n**Extensive Reading**: Reading large amounts for general understanding and pleasure.\n\n### Comprehension Levels\n\n1. **Literal Comprehension**: Understanding the explicit meaning\n2. **Inferential Comprehension**: Drawing conclusions from implied information\n3. **Critical Comprehension**: Evaluating and judging the content\n4. **Creative Comprehension**: Going beyond the text to create new ideas\n\n### Strategies for Effective Comprehension\n\n- **SQ3R Method**: Survey, Question, Read, Recite, Review\n- **KWL Chart**: What I Know, What I Want to know, What I Learned\n- **Reciprocal Teaching**: Predicting, questioning, clarifying, summarizing\n\n### Common Question Types in NET/GSET\n\n- Main idea identification\n- Inference questions\n- Vocabulary in context\n- Author's purpose and tone\n- Fact vs. opinion distinctions`,
      order: BigInt(3),
      paperId: BigInt(1),
    },
    {
      id: BigInt(4),
      title: "Logical Reasoning",
      content: `## Logical Reasoning\n\nLogical reasoning is the process of using rational, systematic reasoning to arrive at valid conclusions from given premises.\n\n### Types of Reasoning\n\n**Deductive Reasoning**: Drawing specific conclusions from general principles.\n- Example: All mammals are warm-blooded. Whales are mammals. Therefore, whales are warm-blooded.\n\n**Inductive Reasoning**: Drawing general conclusions from specific observations.\n- Example: Every crow I've seen is black. Therefore, all crows are probably black.\n\n**Analogical Reasoning**: Drawing conclusions based on similarities between things.\n\n### Syllogisms\n\nA syllogism consists of a major premise, minor premise, and conclusion:\n\n- All A are B (Major Premise)\n- All B are C (Minor Premise)\n- Therefore, All A are C (Conclusion)\n\n### Common Logical Fallacies\n\n- **Ad Hominem**: Attacking the person rather than the argument\n- **Straw Man**: Misrepresenting someone's argument\n- **False Dichotomy**: Presenting only two options when more exist\n- **Circular Reasoning**: Using the conclusion as a premise\n\n### Number Series and Patterns\n\nIdentify the rule governing the sequence:\n- Arithmetic sequences: 2, 5, 8, 11, 14... (common difference = 3)\n- Geometric sequences: 2, 6, 18, 54... (common ratio = 3)\n- Fibonacci-type: 1, 1, 2, 3, 5, 8...`,
      order: BigInt(4),
      paperId: BigInt(1),
    },
    {
      id: BigInt(5),
      title: "Data Interpretation",
      content:
        "## Data Interpretation\n\nData interpretation involves analyzing and drawing conclusions from data presented in various forms.\n\n### Types of Data Representation\n\n**Bar Graphs**: Compare quantities across different categories.\n\n**Pie Charts**: Show proportional distribution of a whole.\n\n**Line Graphs**: Display trends over time.\n\n**Tables**: Present exact numerical data in rows and columns.\n\n**Histograms**: Show frequency distribution of continuous data.\n\n### Statistical Measures\n\n**Measures of Central Tendency**:\n- Mean (Arithmetic Average)\n- Median (Middle value)\n- Mode (Most frequent value)\n\n**Measures of Dispersion**:\n- Range = Maximum - Minimum\n- Standard Deviation: measures spread around the mean\n- Variance: square of standard deviation\n\n### Steps for Data Interpretation\n\n1. Read the title and labels carefully\n2. Note the units of measurement\n3. Identify trends, patterns, and anomalies\n4. Perform required calculations\n5. Draw valid conclusions\n\n### Important Formulas\n\n- Percentage change = [(New - Old) / Old] × 100\n- Percentage of total = (Part / Whole) × 100\n- Average = Sum of values / Number of values",
      order: BigInt(5),
      paperId: BigInt(1),
    },
    {
      id: BigInt(6),
      title: "ICT in Education",
      content:
        "## Information & Communication Technology in Education\n\nICT refers to technologies that provide access to information through telecommunications. In education, ICT transforms teaching, learning, and administrative processes.\n\n### Components of ICT\n\n- **Hardware**: Computers, tablets, smartphones, projectors, interactive whiteboards\n- **Software**: Educational applications, LMS, productivity tools\n- **Networks**: Internet, intranet, LAN, WAN\n\n### Role of ICT in Education\n\n**Enhancing Learning**: Interactive multimedia, simulations, and virtual labs make abstract concepts concrete.\n\n**Personalized Learning**: Adaptive learning platforms cater to individual pace and style.\n\n**Access to Resources**: Global libraries, MOOCs, and open educational resources.\n\n**Communication**: Email, video conferencing, discussion forums enable collaboration.\n\n### E-Learning Models\n\n- **Synchronous E-learning**: Real-time interaction (video lectures, live chat)\n- **Asynchronous E-learning**: Self-paced (recorded lectures, forums)\n- **Blended Learning**: Combination of online and face-to-face instruction\n\n### Digital Literacy\n\nDigital literacy encompasses the ability to find, evaluate, use, share, and create content using digital devices and the internet. Key skills include:\n\n- Information literacy\n- Media literacy\n- Technology literacy\n- Communication and collaboration",
      order: BigInt(6),
      paperId: BigInt(1),
    },
    {
      id: BigInt(7),
      title: "Environment & Biodiversity",
      content: `## Environment and Biodiversity\n\nThis unit covers environmental awareness, ecological balance, and biodiversity conservation relevant to NET/GSET Paper 1.\n\n### Ecosystem Concepts\n\n**Ecosystem**: A community of living organisms interacting with their physical environment.\n\n**Food Chain**: Linear sequence showing energy flow: Producers → Primary Consumers → Secondary Consumers → Tertiary Consumers\n\n**Food Web**: Complex network of interconnected food chains.\n\n**Ecological Pyramids**:\n- Pyramid of Numbers\n- Pyramid of Biomass\n- Pyramid of Energy\n\n### Biodiversity\n\n**Levels of Biodiversity**:\n- Genetic diversity\n- Species diversity\n- Ecosystem diversity\n\n**Hotspots of Biodiversity**: Areas with exceptionally high species richness and significant habitat loss. India has 4 hotspots:\n1. Himalayas\n2. Western Ghats-Sri Lanka\n3. Indo-Burma\n4. Sundaland\n\n### Environmental Issues\n\n- **Global Warming**: Rise in Earth's average temperature due to greenhouse gases\n- **Ozone Depletion**: Destruction of ozone layer by CFCs\n- **Acid Rain**: Precipitation with pH below 5.6\n- **Eutrophication**: Excessive nutrient enrichment of water bodies\n\n### Conservation Strategies\n\n- **In-situ Conservation**: Protection in natural habitat (National Parks, Wildlife Sanctuaries, Biosphere Reserves)\n- **Ex-situ Conservation**: Protection outside natural habitat (Zoos, Botanical Gardens, Gene Banks)`,
      order: BigInt(7),
      paperId: BigInt(1),
    },
  ],
  "2": [
    {
      id: BigInt(8),
      title: "Philosophical Foundations",
      content: `## Philosophical Foundations of Education\n\nPhilosophy of education deals with the nature, aims, and problems of education through philosophical inquiry.\n\n### Idealism and Education\n\n**Key Thinkers**: Plato, Hegel, Froebel\n\n**Core Principles**:\n- Ideas and mind are the ultimate reality\n- Aim of education: realization of spiritual and moral values\n- Curriculum: humanities, literature, fine arts\n- Teacher: moral exemplar and guide\n\n### Naturalism and Education\n\n**Key Thinkers**: Rousseau, Pestalozzi, Spencer\n\n**Core Principles**:\n- Nature is the ultimate reality\n- 'Back to Nature' movement\n- Child-centered education\n- Learning through experience and activity\n\n### Pragmatism and Education\n\n**Key Thinkers**: John Dewey, William James, Charles Pierce\n\n**Core Principles**:\n- Knowledge is provisional and grows through experience\n- 'Learning by doing'\n- Problem-solving approach\n- School as a social institution\n\n### Existentialism and Education\n\n**Key Thinkers**: Sartre, Kierkegaard, Martin Buber\n\n**Core Principles**:\n- Individual freedom and responsibility\n- Self-realization and authentic existence\n- Student-centered curriculum\n\n### Indian Philosophy and Education\n\n**Vedic Education**: Guru-Shishya tradition, holistic development\n\n**Buddhist Education**: Universal access, focus on ethics and meditation\n\n**Tagore's Philosophy**: Naturalistic, creative, internationalist`,
      order: BigInt(1),
      paperId: BigInt(2),
    },
    {
      id: BigInt(9),
      title: "Sociological Foundations",
      content: `## Sociological Foundations of Education\n\nSociology of education examines how social institutions, structures, and forces shape and are shaped by education.\n\n### Education as a Social Institution\n\nEducation serves several social functions:\n- **Socialization**: Transmitting cultural values and norms\n- **Social Control**: Regulating behavior and maintaining order\n- **Social Mobility**: Providing opportunities for advancement\n- **Social Integration**: Promoting national unity and cohesion\n\n### Theories of Education and Society\n\n**Functionalist Theory** (Durkheim, Parsons):\n- Education serves the needs of society\n- Schools prepare students for adult roles\n- Merit-based advancement\n\n**Conflict Theory** (Marx, Bourdieu):\n- Education reproduces social inequalities\n- Dominant classes control educational content\n- Cultural capital advantages privileged groups\n\n**Symbolic Interactionism** (Mead, Cooley):\n- Focus on face-to-face interactions in classrooms\n- Self-concept developed through social interactions\n- Labeling theory and its effects on achievement\n\n### Social Factors Affecting Education\n\n- **Social Class**: Economic status influences access and quality of education\n- **Gender**: Patriarchal norms affect girls' education\n- **Caste and Race**: Historical and contemporary discrimination\n- **Religion**: Influence on curriculum and school culture\n\n### Education for Social Change\n\nPaulo Freire's **Pedagogy of the Oppressed**: Education as a tool for liberation; critical consciousness (conscientization).`,
      order: BigInt(2),
      paperId: BigInt(2),
    },
    {
      id: BigInt(10),
      title: "Educational Psychology",
      content: `## Educational Psychology\n\nEducational psychology applies psychological principles to understand learning, teaching, and educational processes.\n\n### Theories of Learning\n\n**Behaviorism**:\n- Pavlov's Classical Conditioning: Learning through stimulus-response association\n- Skinner's Operant Conditioning: Learning through reinforcement and punishment\n- Thorndike's Laws: Law of Readiness, Law of Exercise, Law of Effect\n\n**Cognitivism**:\n- Piaget's Stages of Cognitive Development:\n  1. Sensorimotor (0-2 years)\n  2. Preoperational (2-7 years)\n  3. Concrete Operational (7-11 years)\n  4. Formal Operational (11+ years)\n\n- Vygotsky's Zone of Proximal Development (ZPD): What a learner can do with guidance vs. independently\n\n**Constructivism**: Learners actively construct knowledge through experience.\n\n### Intelligence\n\n**Spearman's Two-Factor Theory**: General intelligence (g) + Specific abilities (s)\n\n**Thurstone's Primary Mental Abilities**: 7 distinct abilities including verbal, spatial, numerical\n\n**Gardner's Multiple Intelligences**: 8 types including linguistic, logical-mathematical, musical, bodily-kinesthetic, spatial, interpersonal, intrapersonal, naturalist\n\n**Sternberg's Triarchic Theory**: Analytical, creative, and practical intelligence\n\n### Motivation\n\n**Maslow's Hierarchy of Needs**: Physiological → Safety → Love/Belonging → Esteem → Self-Actualization\n\n**Achievement Motivation** (McClelland): Need for Achievement (nAch)\n\n**Attribution Theory** (Weiner): Internal vs. external, stable vs. unstable attributions`,
      order: BigInt(3),
      paperId: BigInt(2),
    },
    {
      id: BigInt(11),
      title: "Curriculum Studies",
      content:
        "## Curriculum Studies\n\nCurriculum refers to all planned educational experiences provided by a school or educational institution.\n\n### Definitions of Curriculum\n\n- **Traditional**: A course of study or subjects to be taught\n- **Broad**: All experiences under the guidance of the school\n- **Hidden Curriculum**: Implicit lessons, values, and norms taught alongside formal curriculum\n\n### Components of Curriculum\n\n1. **Aims and Objectives**: What students should learn\n2. **Content**: Subject matter and learning experiences\n3. **Methods**: Pedagogical approaches\n4. **Evaluation**: Assessment of learning outcomes\n\n### Curriculum Organization\n\n**Subject-Centered Curriculum**: Organized around academic disciplines\n\n**Child-Centered Curriculum**: Based on interests and needs of learners\n\n**Activity/Experience Curriculum**: Learning through purposeful activities\n\n**Core Curriculum**: Common learning for all students\n\n**Integrated Curriculum**: Breaks down subject boundaries, connects knowledge\n\n### National Curriculum Frameworks\n\n**NCF 2005**: Emphasized learning without burden, constructivism, critical pedagogy\n\n**NEP 2020**: Multidisciplinary education, 5+3+3+4 structure, vocational education, mother tongue instruction\n\n### Curriculum Development Process\n\n1. Needs assessment\n2. Goal setting\n3. Content selection and organization\n4. Implementation\n5. Evaluation and revision",
      order: BigInt(4),
      paperId: BigInt(2),
    },
    {
      id: BigInt(12),
      title: "Educational Technology",
      content: `## Educational Technology\n\nEducational technology encompasses the design, development, implementation, and evaluation of processes and tools to improve learning.\n\n### Definitions and Concepts\n\nEducational Technology is the **systematic application of scientific knowledge about learning** to improve the efficiency and effectiveness of teaching and training.\n\n### Levels of Educational Technology\n\n1. **Teaching Technology**: Micro level — improving individual teaching acts\n2. **Instructional Technology**: Macro level — designing instructional systems\n3. **Behavioral Technology**: Using behavioral principles for learning design\n4. **Instructional Design Technology**: Systematic approach to curriculum and instruction\n\n### Communication Models in Education\n\n**Shannon-Weaver Model**: Sender → Encoder → Channel → Decoder → Receiver (with noise)\n\n**Berlo's SMCR Model**: Source → Message → Channel → Receiver\n\n**Schramm's Model**: Emphasizes shared field of experience between communicator and recipient\n\n### Instructional Media\n\n**Dale's Cone of Experience**: Hierarchy from direct experience (most concrete) to verbal symbols (most abstract):\n- Direct Purposeful Experience\n- Contrived Experience\n- Dramatized Experience\n- Demonstrations\n- Field Trips\n- Exhibits\n- Motion Pictures\n- Still Pictures\n- Radio/Recordings\n- Visual Symbols\n- Verbal Symbols\n\n### Systems Approach to Instruction\n\nInputs → Process → Output → Feedback`,
      order: BigInt(5),
      paperId: BigInt(2),
    },
    {
      id: BigInt(13),
      title: "Research Methods in Education",
      content:
        "## Research Methods in Education\n\nResearch methodology in education encompasses systematic approaches to investigating educational phenomena.\n\n### Types of Educational Research\n\n**Fundamental/Basic Research**: Extends theoretical knowledge without immediate application.\n\n**Applied Research**: Solves specific educational problems.\n\n**Action Research**: Teachers investigate their own practice; cyclical process of plan-act-observe-reflect.\n\n**Evaluation Research**: Assesses the worth or merit of educational programs.\n\n### Quantitative Research\n\n**Experimental Research**:\n- True Experimental: Random assignment, control and experimental groups\n- Quasi-Experimental: No random assignment\n- Pre-Experimental: Minimal control\n\n**Descriptive Research**:\n- Survey research\n- Correlational research\n- Causal-comparative (ex post facto) research\n\n### Qualitative Research\n\n- **Ethnography**: Study of cultural groups in natural settings\n- **Phenomenology**: Study of lived experiences\n- **Grounded Theory**: Developing theory from data\n- **Case Study**: In-depth investigation of a bounded system\n- **Narrative Research**: Study of individual lives through stories\n\n### Measurement and Scaling\n\n**Scales of Measurement**:\n1. Nominal: Categories without order (gender, religion)\n2. Ordinal: Ranked categories (grades: A, B, C)\n3. Interval: Equal intervals, no true zero (temperature)\n4. Ratio: Equal intervals with true zero (height, weight)\n\n**Attitude Scales**:\n- Likert Scale: 5-point response scale\n- Thurstone Scale: Equal-appearing intervals\n- Semantic Differential Scale: Bipolar adjectives",
      order: BigInt(6),
      paperId: BigInt(2),
    },
  ],
};

const FALLBACK_PYQS = [
  // Paper 1 PYQs
  {
    id: BigInt(1),
    title: "NET Paper 1 June 2024",
    year: BigInt(2024),
    downloadUrl: "#",
    paperId: BigInt(1),
  },
  {
    id: BigInt(2),
    title: "NET Paper 1 December 2023",
    year: BigInt(2023),
    downloadUrl: "#",
    paperId: BigInt(1),
  },
  {
    id: BigInt(3),
    title: "NET Paper 1 June 2023",
    year: BigInt(2023),
    downloadUrl: "#",
    paperId: BigInt(1),
  },
  {
    id: BigInt(4),
    title: "NET Paper 1 December 2022",
    year: BigInt(2022),
    downloadUrl: "#",
    paperId: BigInt(1),
  },
  {
    id: BigInt(5),
    title: "NET Paper 1 June 2022",
    year: BigInt(2022),
    downloadUrl: "#",
    paperId: BigInt(1),
  },
  {
    id: BigInt(6),
    title: "NET Paper 1 November 2021",
    year: BigInt(2021),
    downloadUrl: "#",
    paperId: BigInt(1),
  },
  {
    id: BigInt(7),
    title: "NET Paper 1 October 2020",
    year: BigInt(2020),
    downloadUrl: "#",
    paperId: BigInt(1),
  },
  {
    id: BigInt(8),
    title: "NET Paper 1 June 2019",
    year: BigInt(2019),
    downloadUrl: "#",
    paperId: BigInt(1),
  },
  // Paper 2 PYQs
  {
    id: BigInt(9),
    title: "NET Paper 2 Education June 2024",
    year: BigInt(2024),
    downloadUrl: "#",
    paperId: BigInt(2),
  },
  {
    id: BigInt(10),
    title: "NET Paper 2 Education December 2023",
    year: BigInt(2023),
    downloadUrl: "#",
    paperId: BigInt(2),
  },
  {
    id: BigInt(11),
    title: "NET Paper 2 Education June 2023",
    year: BigInt(2023),
    downloadUrl: "#",
    paperId: BigInt(2),
  },
  {
    id: BigInt(12),
    title: "NET Paper 2 Education December 2022",
    year: BigInt(2022),
    downloadUrl: "#",
    paperId: BigInt(2),
  },
  {
    id: BigInt(13),
    title: "NET Paper 2 Education June 2022",
    year: BigInt(2022),
    downloadUrl: "#",
    paperId: BigInt(2),
  },
  {
    id: BigInt(14),
    title: "NET Paper 2 Education November 2021",
    year: BigInt(2021),
    downloadUrl: "#",
    paperId: BigInt(2),
  },
  {
    id: BigInt(15),
    title: "NET Paper 2 Education October 2020",
    year: BigInt(2020),
    downloadUrl: "#",
    paperId: BigInt(2),
  },
  {
    id: BigInt(16),
    title: "NET Paper 2 Education June 2019",
    year: BigInt(2019),
    downloadUrl: "#",
    paperId: BigInt(2),
  },
];

export default function PaperView({ paperKey, onNavigate }: PaperViewProps) {
  const paperIndex = paperKey === "paper1" ? 0 : 1;
  const [selectedUnitId, setSelectedUnitId] = useState<bigint | null>(null);
  const [activeTab, setActiveTab] = useState<"notes" | "pyq">("notes");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { data: papers, isLoading: papersLoading } = useGetPapers();

  const resolvedPapers = papers && papers.length > 0 ? papers : FALLBACK_PAPERS;
  const paper = resolvedPapers[paperIndex];
  const paperId = paper?.id ?? null;

  const { data: units, isLoading: unitsLoading } = useGetUnitsByPaper(paperId);
  const { data: pyqs, isLoading: pyqsLoading } = useGetPYQsByPaper(
    activeTab === "pyq" ? paperId : null,
  );

  const resolvedUnits =
    units && units.length > 0
      ? units
      : paperId
        ? FALLBACK_UNITS[paperId.toString()] || []
        : [];

  const resolvedPYQs =
    pyqs && pyqs.length > 0
      ? pyqs
      : FALLBACK_PYQS.filter((p) => p.paperId === paperId);

  // Sort units by order
  const sortedUnits = [...resolvedUnits].sort(
    (a, b) => Number(a.order) - Number(b.order),
  );

  // Select first unit by default
  useEffect(() => {
    if (sortedUnits.length > 0 && selectedUnitId === null) {
      setSelectedUnitId(sortedUnits[0].id);
    }
  }, [sortedUnits, selectedUnitId]);

  // Reset unit when paper changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: setters are stable and paperKey is the actual dependency
  useEffect(() => {
    setSelectedUnitId(null);
    setActiveTab("notes");
  }, [paperKey]);

  const selectedUnit = sortedUnits.find((u) => u.id === selectedUnitId) || null;
  const selectedUnitIndex = sortedUnits.findIndex(
    (u) => u.id === selectedUnitId,
  );

  function handlePrevUnit() {
    if (selectedUnitIndex > 0) {
      setSelectedUnitId(sortedUnits[selectedUnitIndex - 1].id);
    }
  }

  function handleNextUnit() {
    if (selectedUnitIndex < sortedUnits.length - 1) {
      setSelectedUnitId(sortedUnits[selectedUnitIndex + 1].id);
    }
  }

  function handleSidebarPYQLink() {
    setActiveTab("pyq");
    setMobileSidebarOpen(false);
  }

  if (papersLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6">
          <Skeleton className="hidden md:block w-64 h-[600px] rounded-xl" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  const sidebarContent = (
    <UnitSidebar
      paper={paper}
      units={sortedUnits}
      selectedUnitId={selectedUnitId}
      isLoading={unitsLoading}
      onSelectUnit={(id) => {
        setSelectedUnitId(id);
        setActiveTab("notes");
        setMobileSidebarOpen(false);
      }}
      onPYQLink={handleSidebarPYQLink}
    />
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Breadcrumb bar */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="hover:text-primary flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </button>
            <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
            <span className="text-foreground font-medium truncate">
              {papersLoading ? "Loading..." : paper?.title || "Paper"}
            </span>
          </div>

          {/* Mobile sidebar toggle */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden flex items-center gap-2 border-border text-foreground"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu className="w-4 h-4" />
            Units
          </Button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0">
          <div className="sticky top-24">{sidebarContent}</div>
        </aside>

        {/* Mobile sidebar drawer */}
        <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetContent
            side="left"
            className="w-72 p-0"
            data-ocid="sidebar.sheet"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Units Navigation</SheetTitle>
            </SheetHeader>
            {sidebarContent}
          </SheetContent>
        </Sheet>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "notes" | "pyq")}
          >
            <TabsList className="mb-6 bg-muted/60 border border-border w-full sm:w-auto">
              <TabsTrigger
                value="notes"
                data-ocid="content.study_notes_tab"
                className="flex items-center gap-2 flex-1 sm:flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
              >
                <BookOpen className="w-4 h-4" />
                Study Notes
              </TabsTrigger>
              <TabsTrigger
                value="pyq"
                data-ocid="content.pyq_tab"
                className="flex items-center gap-2 flex-1 sm:flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
              >
                <FileDown className="w-4 h-4" />
                PYQ Downloads
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`notes-${selectedUnitId?.toString()}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <StudyNotesTab
                    unit={selectedUnit}
                    isLoading={unitsLoading}
                    hasPrev={selectedUnitIndex > 0}
                    hasNext={selectedUnitIndex < sortedUnits.length - 1}
                    onPrev={handlePrevUnit}
                    onNext={handleNextUnit}
                    prevTitle={
                      selectedUnitIndex > 0
                        ? sortedUnits[selectedUnitIndex - 1].title
                        : undefined
                    }
                    nextTitle={
                      selectedUnitIndex < sortedUnits.length - 1
                        ? sortedUnits[selectedUnitIndex + 1].title
                        : undefined
                    }
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="pyq" className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key="pyq-tab"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <PYQTab
                    pyqs={resolvedPYQs}
                    isLoading={pyqsLoading}
                    paperTitle={paper?.title || ""}
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
