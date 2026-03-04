import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronRight,
  FileText,
  Grid,
  Smartphone,
  Target,
  Users,
} from "lucide-react";
import { type Variants, motion } from "motion/react";
import type { ActiveView } from "../App";

interface HomePageProps {
  onNavigate: (view: ActiveView) => void;
}

const featureCards = [
  {
    icon: BookOpen,
    title: "Study Notes",
    description:
      "Comprehensive, unit-wise study notes for Paper 1 & Paper 2. Structured for systematic preparation.",
    color: "bg-blue-50 text-primary",
  },
  {
    icon: FileText,
    title: "PYQ Downloads",
    description:
      "Download Previous Year Question papers from 2019–2024. Solve real exam questions with ease.",
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    icon: Grid,
    title: "Unit-wise Coverage",
    description:
      "All syllabus units systematically organized. Track your progress topic by topic.",
    color: "bg-sky-50 text-sky-700",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Study anywhere, anytime. Fully responsive design optimized for all screen sizes.",
    color: "bg-teal-50 text-teal-700",
  },
];

const stats = [
  { icon: Users, value: "50,000+", label: "Students Prepared" },
  { icon: Award, value: "15+ Years", label: "PYQ Coverage" },
  { icon: Target, value: "2 Papers", label: "Complete Syllabus" },
];

const paperCards = [
  {
    key: "paper1" as ActiveView,
    label: "Paper 1",
    ocid: "home.paper1_button",
    title: "Teaching & Research Aptitude",
    description:
      "Covers Teaching Aptitude, Research Aptitude, Reading Comprehension, Logical Reasoning, Data Interpretation, Information & Communication Technology, and more.",
    units: [
      "Teaching Aptitude",
      "Research Aptitude",
      "Logical Reasoning",
      "Data Interpretation",
      "ICT",
      "Environmental & Biodiversity",
    ],
    badgeColor: "bg-primary/10 text-primary",
  },
  {
    key: "paper2" as ActiveView,
    label: "Paper 2",
    ocid: "home.paper2_button",
    title: "Education Subject",
    description:
      "In-depth coverage of Education as a discipline — philosophical, sociological, historical, and psychological foundations of education.",
    units: [
      "Philosophical Foundations",
      "Sociological Foundations",
      "Educational Psychology",
      "Curriculum Studies",
      "Educational Technology",
      "Research Methods",
    ],
    badgeColor: "bg-indigo-100 text-indigo-700",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient dot-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-5 bg-white/15 text-white border-white/20 hover:bg-white/20 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
              UGC-NET · GSET · SET Preparation
            </Badge>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-5">
              Ace Your <span className="text-sky-300">NET / GSET</span> Exam
            </h1>

            <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-9 max-w-2xl mx-auto">
              Your complete study companion for UGC-NET and GSET. Unit-wise
              notes, previous year questions, and structured coverage for both
              Paper 1 and Paper 2.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                data-ocid="home.paper1_button"
                onClick={() => onNavigate("paper1")}
                className="bg-white text-primary hover:bg-white/90 font-bold text-base px-7 py-3 shadow-lg hover:shadow-xl transition-all"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Paper 1
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-ocid="home.paper2_button"
                onClick={() => onNavigate("paper2")}
                className="border-white/40 bg-white/10 text-white hover:bg-white/20 font-semibold text-base px-7 py-3 backdrop-blur-sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                Explore Paper 2
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 text-white/80"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Icon className="w-5 h-5 text-sky-300" />
                </div>
                <div>
                  <div className="font-display font-bold text-lg text-white leading-tight">
                    {value}
                  </div>
                  <div className="text-xs text-white/60 tracking-wide">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Paper Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Choose Your Paper
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Complete study materials organized by subject and unit for targeted
            preparation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {paperCards.map((paper) => (
            <motion.div key={paper.key} variants={itemVariants}>
              <Card
                className="card-accent-top shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group border border-border"
                onClick={() => onNavigate(paper.key)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge
                      className={`${paper.badgeColor} font-semibold text-xs px-3 py-1`}
                    >
                      {paper.label}
                    </Badge>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {paper.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {paper.description}
                  </p>
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">
                      Key Units
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {paper.units.map((unit) => (
                        <span
                          key={unit}
                          className="text-xs bg-muted text-foreground/70 px-2.5 py-1 rounded-full"
                        >
                          {unit}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="mt-6 w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-semibold"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(paper.key);
                    }}
                  >
                    Study {paper.label}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-ice-blue border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Designed for serious NET/GSET aspirants who want structured,
              focused preparation.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {featureCards.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="bg-white border border-border shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                  <CardContent className="p-5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}
                    >
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl hero-gradient dot-pattern overflow-hidden relative"
        >
          <div className="relative px-8 py-12 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to Start Preparing?
            </h2>
            <p className="text-white/70 text-base mb-7 max-w-lg mx-auto">
              Join thousands of students who cleared NET/GSET using our
              structured study materials and PYQ practice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => onNavigate("paper1")}
                className="bg-white text-primary font-bold hover:bg-white/90 px-8"
              >
                Begin with Paper 1
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("paper2")}
                className="border-white/40 bg-white/10 text-white hover:bg-white/20 font-semibold"
              >
                Begin with Paper 2
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
