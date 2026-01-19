import { useState } from "react";
import {
  FileText,
  Shield,
  Clock,
  Users,
  Link2,
  Download,
  Share2,
  X,
  Eye,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Calendar
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface DocumentViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: {
    id: string;
    name: string;
    type: string;
    uploadedAt: string;
    size: string;
    sharedWith: number;
    isVerified: boolean;
    expiresAt?: string;
    lastAccessed?: string;
  } | null;
}

const mockShareHistory = [
  { recipient: "Acme Studios", accessedAt: "Today at 2:34 PM", status: "active" },
  { recipient: "TechCorp Inc", accessedAt: "Yesterday", status: "active" },
  { recipient: "Freelance Co", accessedAt: "Jan 15, 2025", status: "expired" },
];

const mockAuditLog = [
  { action: "Viewed", by: "Acme Studios", timestamp: "Today at 2:34 PM" },
  { action: "Link created", by: "You", timestamp: "Today at 10:15 AM" },
  { action: "Verified", by: "System", timestamp: "Jan 18, 2025" },
  { action: "Uploaded", by: "You", timestamp: "Jan 17, 2025" },
];

const DocumentViewerModal = ({ open, onOpenChange, document }: DocumentViewerModalProps) => {
  const [activeTab, setActiveTab] = useState("preview");

  if (!document) return null;

  const getTypeColor = (docType: string) => {
    switch (docType.toLowerCase()) {
      case "id":
        return "bg-primary/10 text-primary";
      case "tax":
        return "bg-secure/10 text-secure";
      case "contract":
        return "bg-amber-500/10 text-amber-600";
      case "payment":
        return "bg-trust/10 text-trust";
      case "insurance":
        return "bg-purple-500/10 text-purple-600";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleDownload = () => {
    toast.success("Download started", {
      description: `${document.name} is being downloaded.`,
    });
  };

  const handleRevokeAccess = (recipient: string) => {
    toast.success("Access revoked", {
      description: `${recipient} can no longer access this document.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate">{document.name}</span>
                {document.isVerified && (
                  <Shield className="h-4 w-4 text-secure shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={getTypeColor(document.type)}>
                  {document.type}
                </Badge>
                <span className="text-xs text-muted-foreground">{document.size}</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="w-full justify-start shrink-0">
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="sharing" className="gap-2">
              <Link2 className="h-4 w-4" />
              Sharing
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Clock className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="preview" className="mt-4 space-y-4">
              {/* Document Preview Placeholder */}
              <div className="aspect-[4/3] rounded-lg bg-secondary/50 border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center">
                <FileText className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground font-medium">Document Preview</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Secure preview would render here
                </p>
                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Watermarked for your protection
                </div>
              </div>

              {/* Document Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    Uploaded
                  </div>
                  <p className="font-medium text-foreground">{document.uploadedAt}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Users className="h-4 w-4" />
                    Shared With
                  </div>
                  <p className="font-medium text-foreground">{document.sharedWith} viewers</p>
                </div>
                {document.expiresAt && (
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Clock className="h-4 w-4" />
                      Expires
                    </div>
                    <p className="font-medium text-foreground">{document.expiresAt}</p>
                  </div>
                )}
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Shield className="h-4 w-4" />
                    Verification
                  </div>
                  <p className={`font-medium ${document.isVerified ? "text-secure" : "text-amber-500"}`}>
                    {document.isVerified ? "Verified" : "Pending"}
                  </p>
                </div>
              </div>

              {/* Security Info */}
              <div className="rounded-lg bg-secure/5 border border-secure/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-secure" />
                  <span className="font-medium text-foreground">Security Details</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Encryption</span>
                    <span className="font-mono text-secure">AES-256-GCM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="text-secure">Encrypted at rest</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sharing" className="mt-4 space-y-4">
              {document.sharedWith > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Active Shares</h4>
                    <Badge variant="secondary">{document.sharedWith} total</Badge>
                  </div>

                  {mockShareHistory.map((share, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{share.recipient}</p>
                          <p className="text-xs text-muted-foreground">
                            Last accessed: {share.accessedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {share.status === "active" ? (
                          <>
                            <Badge variant="secondary" className="bg-secure/10 text-secure">
                              Active
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleRevokeAccess(share.recipient)}
                            >
                              Revoke
                            </Button>
                          </>
                        ) : (
                          <Badge variant="secondary" className="bg-muted text-muted-foreground">
                            Expired
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Link2 className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="font-medium text-foreground">No active shares</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This document hasn't been shared yet
                  </p>
                </div>
              )}

              {/* Permission Info */}
              <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Viewer Permissions</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Viewers can only see this document. Downloads are disabled and the
                      preview is watermarked for your protection.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-4 space-y-4">
              <div className="space-y-1">
                {mockAuditLog.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary shrink-0">
                      {log.action === "Viewed" && <Eye className="h-4 w-4 text-primary" />}
                      {log.action === "Link created" && <Link2 className="h-4 w-4 text-trust" />}
                      {log.action === "Verified" && <CheckCircle2 className="h-4 w-4 text-secure" />}
                      {log.action === "Uploaded" && <FileText className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{log.action}</span>
                        {" by "}
                        <span className="text-muted-foreground">{log.by}</span>
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-secondary/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Full audit log with IP addresses and device info available in production
                </p>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex gap-2 justify-between pt-4 border-t shrink-0">
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewerModal;
