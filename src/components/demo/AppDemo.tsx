import { useState } from "react";
import { Plus, Search, Filter, FolderOpen, Shield, Users, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DocumentCard from "./DocumentCard";
import ShareLinkModal from "./ShareLinkModal";

const mockDocuments = [
  {
    id: "1",
    name: "Passport Scan",
    type: "ID",
    uploadedAt: "2 days ago",
    size: "1.2 MB",
    sharedWith: 2,
    isVerified: true,
  },
  {
    id: "2",
    name: "W-9 Tax Form 2024",
    type: "Tax",
    uploadedAt: "1 week ago",
    size: "245 KB",
    sharedWith: 1,
    isVerified: true,
  },
  {
    id: "3",
    name: "Freelance Contract - Acme Corp",
    type: "Contract",
    uploadedAt: "3 days ago",
    size: "890 KB",
    sharedWith: 0,
    isVerified: false,
  },
  {
    id: "4",
    name: "Driver's License",
    type: "ID",
    uploadedAt: "1 month ago",
    size: "1.8 MB",
    sharedWith: 3,
    isVerified: true,
  },
  {
    id: "5",
    name: "1099-NEC Form",
    type: "Tax",
    uploadedAt: "2 weeks ago",
    size: "156 KB",
    sharedWith: 0,
    isVerified: false,
  },
];

const mockStats = [
  { label: "Documents", value: "12", icon: FolderOpen },
  { label: "Verified", value: "8", icon: Shield },
  { label: "Active Shares", value: "6", icon: Link2 },
  { label: "Viewers", value: "4", icon: Users },
];

const AppDemo = () => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleShare = (docName: string) => {
    setSelectedDoc(docName);
    setShareModalOpen(true);
  };

  const filteredDocs = mockDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Document Vault</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Securely store and share your work documents
          </p>
        </div>
        <Button className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-card p-4 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
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
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Document list */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => (
          <DocumentCard
            key={doc.id}
            name={doc.name}
            type={doc.type}
            uploadedAt={doc.uploadedAt}
            size={doc.size}
            sharedWith={doc.sharedWith}
            isVerified={doc.isVerified}
            onShare={() => handleShare(doc.name)}
            onView={() => {}}
          />
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No documents found</p>
        </div>
      )}

      {/* Share modal */}
      <ShareLinkModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        documentName={selectedDoc}
      />
    </div>
  );
};

export default AppDemo;
