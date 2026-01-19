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
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const timeline = [
  { week: "Week 1-2", phase: "Foundation", tasks: "Auth system, database schema, encrypted storage setup, core UI components" },
  { week: "Week 3-4", phase: "Core Features", tasks: "Document upload/view, share link generation, permission system, role enforcement" },
  { week: "Week 5-6", phase: "Polish & Launch", tasks: "Mobile optimization, access revocation, security audit, deployment, documentation" },
];

const experience = [
  {
    name: "Marlo AI",
    type: "iOS App",
    icon: Smartphone,
    description: "AI-powered mobile application with secure user data handling",
  },
  {
    name: "QuantBook",
    type: "Web Platform",
    icon: Globe,
    description: "Financial web platform with authentication and data visualization",
  },
  {
    name: "MapCanvas.store",
    type: "E-commerce",
    icon: Globe,
    description: "Custom e-commerce solution with payment integration",
  },
  {
    name: "Cleaning Business Tools",
    type: "Business Tools",
    icon: Wrench,
    description: "Internal tools for business operations and client management",
  },
];

const ProposalSection = () => {
  return (
    <div className="space-y-10">
      {/* Understanding */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Understanding Your Needs</h2>
        </div>
        
        <div className="rounded-xl bg-card p-6 shadow-card">
          <p className="text-foreground leading-relaxed">
            You're building a <span className="font-semibold text-primary">creator-owned work identity platform</span> that 
            lets freelancers store and share sensitive onboarding documents (IDs, tax forms, verification) 
            with companies—without repeating paperwork for every new client.
          </p>
          
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {[
              "Secure, encrypted document storage",
              "Permissioned share links with expiry",
              "Role-based access (creative vs viewer)",
              "Mobile-first, clean interface",
              "No enterprise complexity in V1",
              "Security-first architecture",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-secure shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">6-Week MVP Timeline</h2>
        </div>
        
        <div className="grid gap-4">
          {timeline.map((item, index) => (
            <div key={index} className="rounded-xl bg-card p-5 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Badge variant="secondary" className="w-fit bg-primary/10 text-primary">
                  {item.week}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{item.phase}</span>
                  {index < timeline.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{item.tasks}</p>
            </div>
          ))}
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
                <div>
                  <h3 className="font-semibold text-foreground">{project.name}</h3>
                  <Badge variant="outline" className="mt-1 text-xs">{project.type}</Badge>
                  <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
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
      </section>
    </div>
  );
};

export default ProposalSection;
