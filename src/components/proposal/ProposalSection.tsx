import {
  Target,
  Calendar,
  Briefcase,
  Mail,
  Phone,
  Linkedin,
  Github,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Globe,
  Wrench,
  Shield,
  Clock,
  Users,
  Zap,
  Lock,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Calculate dates based on a realistic start date
const getProjectDates = () => {
  const startDate = new Date("2025-02-03"); // Monday start

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  return {
    week1Start: formatDate(startDate),
    week2End: formatDate(addDays(startDate, 13)),
    week3Start: formatDate(addDays(startDate, 14)),
    week4End: formatDate(addDays(startDate, 27)),
    week5Start: formatDate(addDays(startDate, 28)),
    week6End: formatDate(addDays(startDate, 41)),
    launchDate: formatDate(addDays(startDate, 42)),
  };
};

const dates = getProjectDates();

const timeline = [
  {
    week: "Week 1-2",
    dates: `${dates.week1Start} - ${dates.week2End}`,
    phase: "Foundation",
    icon: Shield,
    tasks: [
      "User authentication (email/password + magic links)",
      "Database schema with RLS policies",
      "Encrypted storage infrastructure",
      "Core UI components & mobile-first layouts",
    ],
    deliverable: "Working auth + secure upload prototype",
  },
  {
    week: "Week 3-4",
    dates: `${dates.week3Start} - ${dates.week4End}`,
    phase: "Core Features",
    icon: Lock,
    tasks: [
      "Document upload with client-side encryption",
      "Permissioned share link generation",
      "Expiry and revocation system",
      "Role-based access (Creative vs Viewer)",
    ],
    deliverable: "Full upload → share → revoke flow working",
  },
  {
    week: "Week 5-6",
    dates: `${dates.week5Start} - ${dates.week6End}`,
    phase: "Polish & Launch",
    icon: Zap,
    tasks: [
      "Mobile optimization & touch interactions",
      "Security hardening & penetration testing",
      "Performance optimization & caching",
      "Deployment, documentation, handoff",
    ],
    deliverable: "Production-ready MVP deployed",
  },
];

const whyMe = [
  {
    icon: Clock,
    title: "MVP Velocity",
    description: "I've shipped 10+ MVPs for early-stage products. I know what to build and—more importantly—what to skip.",
  },
  {
    icon: Shield,
    title: "Security-First",
    description: "Built permissioned systems handling sensitive data. I understand encryption, RLS, and audit logging.",
  },
  {
    icon: Users,
    title: "Clear Communicator",
    description: "Weekly demos, async updates, quick response times. You'll always know where we stand.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Mindset",
    description: "I design for thumbs first, then scale up. Your freelancer users will actually enjoy using this.",
  },
];

const experience = [
  {
    name: "Secure Document Platform",
    type: "Similar Project",
    icon: Lock,
    description: "Built a HIPAA-compliant document sharing system with expiring links and audit trails.",
    relevance: "Direct experience with permissioned document access",
  },
  {
    name: "Freelancer Tools Suite",
    type: "Target Audience",
    icon: FileText,
    description: "Invoice and contract management tools used by 500+ creative professionals.",
    relevance: "Deep understanding of freelancer workflows",
  },
  {
    name: "Marlo AI",
    type: "iOS App",
    icon: Smartphone,
    description: "AI-powered mobile app with secure user data handling and offline support.",
    relevance: "Mobile-first development expertise",
  },
  {
    name: "QuantBook",
    type: "Web Platform",
    icon: Globe,
    description: "Financial platform with role-based access, real-time data, and complex permissions.",
    relevance: "Authentication and authorization systems",
  },
];

const ProposalSection = () => {
  return (
    <div className="space-y-10">
      {/* Understanding */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Understanding Your Vision</h2>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-card">
          <p className="text-foreground leading-relaxed">
            You're building a <span className="font-semibold text-primary">creator-owned work identity platform</span>—not
            a marketplace, not a social network. A focused tool that lets creative freelancers store their essential
            onboarding documents (W-9s, IDs, payment info) and share them with companies through{" "}
            <span className="font-semibold">permissioned links</span>, without repeating paperwork for every new client.
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">Core Requirements</p>
              {[
                "User authentication (creative professionals)",
                "Secure document storage (IDs, tax forms, etc.)",
                "Permissioned sharing via secure access links",
                "Role-based access (creatives vs. viewers)",
                "Ability to revoke or expire access",
                "Clean, intuitive UI (mobile-first preferred)",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-secure shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">What's NOT in V1</p>
              {[
                "Company accounts (they use permissioned links)",
                "Admin dashboards or analytics",
                "Complex billing or subscriptions",
                "Enterprise workflows or team management",
                "Over-engineered features",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-4 w-4 shrink-0 flex items-center justify-center text-xs">—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Why I'm a Good Fit</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {whyMe.map((item, index) => (
            <div key={index} className="rounded-xl bg-card p-5 shadow-card">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">6-Week MVP Timeline</h2>
        </div>

        <p className="text-sm text-muted-foreground">
          Targeting your ~6-8 week goal. Weekly check-ins, async updates, iterative delivery.
        </p>

        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="rounded-xl bg-card overflow-hidden shadow-card">
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {item.week}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">{item.dates}</span>
                      </div>
                      <span className="font-semibold text-foreground">{item.phase}</span>
                    </div>
                  </div>
                  {index < timeline.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block ml-auto" />
                  )}
                </div>

                <ul className="space-y-2 ml-13">
                  {item.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-secure shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-secondary/50 px-5 py-3 border-t border-border/50">
                <p className="text-sm">
                  <span className="text-muted-foreground">Deliverable: </span>
                  <span className="font-medium text-foreground">{item.deliverable}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Launch date callout */}
        <div className="rounded-xl bg-secure/5 border border-secure/20 p-4 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secure/10 shrink-0">
            <Zap className="h-6 w-6 text-secure" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Target Launch: {dates.launchDate}</p>
            <p className="text-sm text-muted-foreground">
              Production-ready MVP with core loop: Upload → Secure → Share → Revoke
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Relevant Experience</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {experience.map((project, index) => (
            <div key={index} className="rounded-xl bg-card p-5 shadow-card">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <project.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{project.name}</h3>
                    <Badge variant="outline" className="text-xs">{project.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                  <p className="text-xs text-primary mt-2 font-medium">{project.relevance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Let's Build This Together</h2>

        <div className="rounded-xl bg-gradient-to-br from-primary/5 to-secure/5 p-6 border border-primary/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground">Humam Al Rubaye</h3>
              <p className="text-muted-foreground mt-1">Full-Stack Developer • MVP Specialist</p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <a
                  href="mailto:humameu4@gmail.com"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  humameu4@gmail.com
                </a>
                <a
                  href="tel:518-965-9700"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  518-965-9700
                </a>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                Available to start within 48 hours. Less than 30 hrs/week works perfectly.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="icon" asChild>
                <a href="https://linkedin.com/in/humam-alrubaye" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/HumamAl" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild className="gap-2">
                <a href="mailto:humameu4@gmail.com">
                  <Mail className="h-4 w-4" />
                  Get in Touch
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Final note */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">A note on approach:</span> I read your post carefully—you want
            someone who can move fast without over-engineering, build secure permissioned systems, and communicate clearly.
            That's exactly how I work. I'd love to discuss your vision in more detail and show you how I'd approach the
            first two weeks of development.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProposalSection;
