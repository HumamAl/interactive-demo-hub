import { Shield, Link2, Users, Smartphone, Clock } from "lucide-react";

const challenges = [
  {
    icon: Shield,
    problem: "Secure Document Storage",
    whyFail: "Many teams use basic cloud storage without encryption or access controls, leading to data breaches or accidental exposure.",
    solution: "End-to-end encrypted storage with automatic document classification. Each file gets unique encryption keys with audit logging.",
    tech: "AES-256 encryption, Supabase Storage with RLS, file type validation",
  },
  {
    icon: Link2,
    problem: "Permissioned Share Links",
    whyFail: "Static share links can't be revoked, leaked links grant permanent access, no way to track who accessed what.",
    solution: "Time-limited, revocable share tokens with granular permissions. Real-time access logs and one-click link invalidation.",
    tech: "JWT tokens with expiry, PostgreSQL for link state, webhook notifications",
  },
  {
    icon: Users,
    problem: "Role-Based Access Control",
    whyFail: "All-or-nothing permissions mean freelancers share too much or create friction. Companies can't trust viewer boundaries.",
    solution: "Two-tier role system: Creatives (full control) vs Viewers (read-only, no download). Per-document permission overrides.",
    tech: "Supabase RLS policies, custom claims in auth tokens, permission middleware",
  },
  {
    icon: Smartphone,
    problem: "Mobile-First Experience",
    whyFail: "Desktop-first designs frustrate mobile users. Freelancers often work on-the-go and need quick document access.",
    solution: "Touch-optimized UI with bottom navigation, swipe actions, and optimized document previews. Offline document caching.",
    tech: "React responsive design, PWA capabilities, IndexedDB for offline",
  },
  {
    icon: Clock,
    problem: "MVP Scope Discipline",
    whyFail: "Feature creep delays launch. Building enterprise features before validating core value proposition wastes resources.",
    solution: "Laser-focused on core loop: Upload → Secure → Share → Revoke. No dashboards, billing, or enterprise features in V1.",
    tech: "Iterative development, feature flags, early user testing",
  },
];

const ChallengesSection = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Project Challenges</h2>
        <p className="text-muted-foreground mt-1">
          Key technical and UX challenges for this platform and my approach to solving them
        </p>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="rounded-xl bg-card p-6 shadow-card animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <challenge.icon className="h-6 w-6 text-primary" />
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {challenge.problem}
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-destructive/80">
                      Why Teams Fail
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {challenge.whyFail}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-secure">
                      My Solution
                    </p>
                    <p className="text-sm text-foreground">
                      {challenge.solution}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                      Tech Used
                    </p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {challenge.tech}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengesSection;
