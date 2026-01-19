import { useState } from "react";
import { Shield, Link2, Users, Smartphone, Clock, ChevronDown, ChevronUp, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const challenges = [
  {
    icon: Shield,
    problem: "Secure Document Storage Without Enterprise Complexity",
    whyFail: "Teams over-engineer with complex KMS integrations or under-engineer with basic cloud storage. Creative professionals need bank-level security without the IT department.",
    solution: "Envelope encryption: AES-256-GCM for file encryption with per-document keys, wrapped by a master key. Zero-knowledge architecture means even I can't read your documents.",
    tech: ["AES-256-GCM", "Supabase Storage", "Per-doc encryption keys"],
    codeSnippet: `// Simplified encryption flow
const encryptDocument = async (file: File) => {
  const docKey = crypto.getRandomValues(new Uint8Array(32));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: crypto.getRandomValues(new Uint8Array(12)) },
    await crypto.subtle.importKey('raw', docKey, 'AES-GCM', false, ['encrypt']),
    await file.arrayBuffer()
  );
  // docKey is encrypted with user's master key before storage
  return { encrypted, wrappedKey: await wrapKey(docKey) };
};`,
  },
  {
    icon: Link2,
    problem: "Permissioned Share Links That Actually Expire",
    whyFail: "Static share links are forever—leaked links grant permanent access. Most 'expiring' links are just hidden URLs that still work. Freelancers share SSN over email because alternatives are too complex.",
    solution: "JWT-based share tokens with server-side validation. Links are cryptographically signed with expiration baked in. One-click revocation invalidates immediately, not 'within 24 hours'.",
    tech: ["JWT with RS256", "PostgreSQL token state", "Real-time invalidation"],
    codeSnippet: `// Share link generation with enforced expiry
const createShareLink = (docId: string, options: ShareOptions) => {
  const payload = {
    docId,
    exp: Math.floor(Date.now() / 1000) + options.expirySeconds,
    permissions: options.allowDownload ? ['view', 'download'] : ['view'],
    requireAuth: options.requireEmailVerification,
  };
  return jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });
};

// Revocation is instant - token marked invalid in DB
const revokeAccess = (shareId: string) =>
  supabase.from('share_links').update({ revoked_at: new Date() }).eq('id', shareId);`,
  },
  {
    icon: Users,
    problem: "Role-Based Access: Creatives vs. Viewers",
    whyFail: "All-or-nothing permissions mean freelancers over-share (companies see everything) or create friction (constant re-authorization). Companies can't trust that 'view only' actually prevents downloads.",
    solution: "Two-tier model matching your spec: Creatives have full control, Viewers get read-only with optional download. Enforced at database level with Row Level Security—not just UI hiding.",
    tech: ["Supabase RLS", "JWT custom claims", "Policy-based access"],
    codeSnippet: `-- Supabase RLS policy for viewer access
CREATE POLICY "viewers_can_only_read" ON documents
FOR SELECT USING (
  -- Owner always has access
  auth.uid() = owner_id
  OR
  -- Viewers via valid share link
  EXISTS (
    SELECT 1 FROM share_links
    WHERE share_links.document_id = documents.id
      AND share_links.viewer_id = auth.uid()
      AND share_links.expires_at > NOW()
      AND share_links.revoked_at IS NULL
  )
);

-- Downloads require explicit permission
CREATE POLICY "download_requires_permission" ON document_downloads
FOR INSERT USING (
  EXISTS (
    SELECT 1 FROM share_links
    WHERE document_id = NEW.document_id
      AND 'download' = ANY(permissions)
  )
);`,
  },
  {
    icon: Smartphone,
    problem: "Mobile-First for On-The-Go Freelancers",
    whyFail: "Desktop-first apps frustrate freelancers who need to share documents from a coffee shop or client meeting. 'Responsive' often means 'technically works' not 'actually usable'.",
    solution: "Touch-optimized from day one: swipe actions, bottom navigation, optimized document previews. PWA for app-like experience without App Store approval delays.",
    tech: ["React responsive", "PWA manifest", "Touch gestures"],
    codeSnippet: `// Mobile-optimized document preview hook
const useDocumentPreview = (docId: string) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return {
    previewSize: isMobile ? 'compressed' : 'full',
    // Swipe gestures for mobile navigation
    swipeHandlers: isMobile ? {
      onSwipeLeft: () => shareDocument(docId),
      onSwipeRight: () => archiveDocument(docId),
    } : {},
    // Bottom sheet instead of modal on mobile
    ShareComponent: isMobile ? BottomSheet : Dialog,
  };
};`,
  },
  {
    icon: Clock,
    problem: "MVP Scope Discipline",
    whyFail: "Feature creep kills MVPs. Teams build dashboards, billing, admin panels, and team management before validating the core value: does anyone actually want this?",
    solution: "Laser focus on your stated loop: Upload → Secure → Share → Revoke. No company accounts in V1 (they use permissioned links). No dashboards. No billing. Ship fast, validate, iterate.",
    tech: ["Iterative delivery", "Feature flags", "Weekly releases"],
    codeSnippet: `// Feature flag system for controlled rollout
const FEATURES = {
  // V1 Core - Always on
  DOCUMENT_UPLOAD: true,
  SHARE_LINKS: true,
  ACCESS_REVOCATION: true,

  // V1.1 - After validation
  EMAIL_NOTIFICATIONS: false,
  DOCUMENT_EXPIRY_REMINDERS: false,

  // V2 - Future
  COMPANY_ACCOUNTS: false,
  TEAM_MANAGEMENT: false,
  BILLING_INTEGRATION: false,
} as const;

// Clean separation of MVP vs future
const canUseFeature = (feature: keyof typeof FEATURES) =>
  FEATURES[feature] && !isKillSwitchActive(feature);`,
  },
];

const ChallengesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Technical Challenges & Solutions</h2>
        <p className="text-muted-foreground mt-1">
          Specific challenges for building a <span className="text-primary font-medium">creator-owned</span> work identity platform—and how I'd solve them
        </p>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="rounded-xl bg-card shadow-card overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <challenge.icon className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {challenge.problem}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
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
                        My Approach
                      </p>
                      <p className="text-sm text-foreground">
                        {challenge.solution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {challenge.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Code snippet toggle */}
            <div className="border-t border-border/50">
              <Button
                variant="ghost"
                className="w-full justify-between px-6 py-3 h-auto rounded-none hover:bg-secondary/50"
                onClick={() => toggleExpand(index)}
              >
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Code className="h-4 w-4" />
                  {expandedIndex === index ? "Hide code example" : "Show code example"}
                </span>
                {expandedIndex === index ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>

              {expandedIndex === index && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="rounded-lg bg-[#1a1a2e] p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                      <code>{challenge.codeSnippet}</code>
                    </pre>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    Simplified example for demonstration. Production code includes error handling, logging, and tests.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 mt-8">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Note on scope:</span> These solutions are designed to be{" "}
          <span className="text-primary font-medium">lean and focused</span>, as you specified.
          No enterprise complexity, no over-engineering. Security-first architecture that can scale
          when you're ready—but ships in 6 weeks.
        </p>
      </div>
    </div>
  );
};

export default ChallengesSection;
