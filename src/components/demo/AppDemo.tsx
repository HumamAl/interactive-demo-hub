import { useState, useEffect } from "react";
import { Plus, Search, Filter, FolderOpen, Shield, Users, Link2, Upload, X, FileText, CheckCircle2, Clock, AlertCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import DocumentCard from "./DocumentCard";
import ShareLinkModal from "./ShareLinkModal";
import UploadModal from "./UploadModal";
import DocumentViewerModal from "./DocumentViewerModal";
import { toast } from "sonner";

// Realistic mock data for a creative freelancer
const mockDocuments = [
  {
    id: "1",
    name: "Passport - Sarah Chen",
    type: "ID",
    uploadedAt: "2 days ago",
    size: "1.2 MB",
    sharedWith: 2,
    isVerified: true,
    category: "identity",
    expiresAt: "Jan 2028",
    lastAccessed: "Today at 2:34 PM",
  },
  {
    id: "2",
    name: "W-9 Tax Form 2025",
    type: "Tax",
    uploadedAt: "1 week ago",
    size: "245 KB",
    sharedWith: 3,
    isVerified: true,
    category: "tax",
    lastAccessed: "Yesterday",
  },
  {
    id: "3",
    name: "NDA - Acme Studios",
    type: "Contract",
    uploadedAt: "3 days ago",
    size: "890 KB",
    sharedWith: 1,
    isVerified: true,
    category: "contract",
    lastAccessed: "3 days ago",
  },
  {
    id: "4",
    name: "Driver's License - CA",
    type: "ID",
    uploadedAt: "1 month ago",
    size: "1.8 MB",
    sharedWith: 4,
    isVerified: true,
    category: "identity",
    expiresAt: "Aug 2027",
    lastAccessed: "Last week",
  },
  {
    id: "5",
    name: "1099-NEC Form 2024",
    type: "Tax",
    uploadedAt: "2 weeks ago",
    size: "156 KB",
    sharedWith: 0,
    isVerified: false,
    category: "tax",
    lastAccessed: "Never",
  },
  {
    id: "6",
    name: "Direct Deposit Authorization",
    type: "Payment",
    uploadedAt: "5 days ago",
    size: "78 KB",
    sharedWith: 2,
    isVerified: true,
    category: "payment",
    lastAccessed: "4 days ago",
  },
  {
    id: "7",
    name: "Professional Liability Insurance",
    type: "Insurance",
    uploadedAt: "3 weeks ago",
    size: "2.1 MB",
    sharedWith: 1,
    isVerified: true,
    category: "insurance",
    expiresAt: "Dec 2025",
    lastAccessed: "2 weeks ago",
  },
];

const recentActivity = [
  { action: "viewed", doc: "W-9 Tax Form", viewer: "Acme Studios", time: "2 min ago" },
  { action: "shared", doc: "Passport", viewer: "New Client Co", time: "1 hour ago" },
  { action: "expired", doc: "Old NDA link", viewer: null, time: "3 hours ago" },
  { action: "verified", doc: "Insurance Certificate", viewer: null, time: "Yesterday" },
];

const AppDemo = () => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [viewerModalOpen, setViewerModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<typeof mockDocuments[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState(mockDocuments);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = (doc: typeof mockDocuments[0]) => {
    setSelectedDoc(doc);
    setShareModalOpen(true);
  };

  const handleView = (doc: typeof mockDocuments[0]) => {
    setSelectedDoc(doc);
    setViewerModalOpen(true);
  };

  const handleDelete = (docId: string) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    toast.success("Document deleted", {
      description: "The document has been permanently removed.",
    });
  };

  const handleUploadComplete = (fileName: string) => {
    const newDoc = {
      id: String(Date.now()),
      name: fileName,
      type: "Contract" as const,
      uploadedAt: "Just now",
      size: "1.2 MB",
      sharedWith: 0,
      isVerified: false,
      category: "contract",
      lastAccessed: "Never",
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || doc.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Documents", value: documents.length.toString(), icon: FolderOpen, color: "text-primary" },
    { label: "Verified", value: documents.filter(d => d.isVerified).length.toString(), icon: Shield, color: "text-secure" },
    { label: "Active Shares", value: documents.reduce((acc, d) => acc + d.sharedWith, 0).toString(), icon: Link2, color: "text-trust" },
    { label: "Unique Viewers", value: "6", icon: Users, color: "text-amber-500" },
  ];

  const documentTypes = ["all", "ID", "Tax", "Contract", "Payment", "Insurance"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Document Vault</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Your secure, creator-owned document storage
          </p>
        </div>
        <Button className="gap-2 shadow-sm" onClick={() => setUploadModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-xl bg-card p-4 shadow-card animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-secondary`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-card p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-primary" />
          <h3 className="font-medium text-sm text-foreground">Recent Activity</h3>
        </div>
        <div className="space-y-2">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-sm py-2 border-b border-border/50 last:border-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {activity.action === "viewed" && <CheckCircle2 className="h-4 w-4 text-secure shrink-0" />}
              {activity.action === "shared" && <Link2 className="h-4 w-4 text-trust shrink-0" />}
              {activity.action === "expired" && <Clock className="h-4 w-4 text-amber-500 shrink-0" />}
              {activity.action === "verified" && <Shield className="h-4 w-4 text-secure shrink-0" />}
              <span className="text-muted-foreground flex-1 truncate">
                {activity.action === "viewed" && <><span className="text-foreground font-medium">{activity.viewer}</span> viewed <span className="font-medium text-foreground">{activity.doc}</span></>}
                {activity.action === "shared" && <>Shared <span className="font-medium text-foreground">{activity.doc}</span> with <span className="font-medium text-foreground">{activity.viewer}</span></>}
                {activity.action === "expired" && <><span className="font-medium text-foreground">{activity.doc}</span> access expired</>}
                {activity.action === "verified" && <><span className="font-medium text-foreground">{activity.doc}</span> was verified</>}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              {filterType === "all" ? "All Types" : filterType}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {documentTypes.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => setFilterType(type)}
                className={filterType === type ? "bg-primary/10" : ""}
              >
                {type === "all" ? "All Types" : type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Document list */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl bg-card p-4 shadow-card animate-pulse">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-secondary" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-secondary rounded w-1/3" />
                  <div className="h-3 bg-secondary rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDocs.map((doc, index) => (
            <div
              key={doc.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <DocumentCard
                id={doc.id}
                name={doc.name}
                type={doc.type}
                uploadedAt={doc.uploadedAt}
                size={doc.size}
                sharedWith={doc.sharedWith}
                isVerified={doc.isVerified}
                expiresAt={doc.expiresAt}
                onShare={() => handleShare(doc)}
                onView={() => handleView(doc)}
                onDelete={() => handleDelete(doc.id)}
              />
            </div>
          ))}
        </div>
      )}

      {!isLoading && filteredDocs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No documents found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Modals */}
      <ShareLinkModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        documentName={selectedDoc?.name || ""}
      />

      <UploadModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onUploadComplete={handleUploadComplete}
      />

      <DocumentViewerModal
        open={viewerModalOpen}
        onOpenChange={setViewerModalOpen}
        document={selectedDoc}
      />
    </div>
  );
};

export default AppDemo;
