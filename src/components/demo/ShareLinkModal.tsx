import { useState, useEffect } from "react";
import { Copy, Check, Link2, Clock, Users, Shield, Mail, Eye, Lock, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ShareLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentName: string;
}

const ShareLinkModal = ({ open, onOpenChange, documentName }: ShareLinkModalProps) => {
  const [copied, setCopied] = useState(false);
  const [expiry, setExpiry] = useState("7days");
  const [requireAuth, setRequireAuth] = useState(false);
  const [allowDownload, setAllowDownload] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkGenerated, setLinkGenerated] = useState(false);

  // Generate a realistic-looking share token
  const generateToken = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 12; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  const [shareToken] = useState(generateToken());
  const shareLink = `https://workid.app/share/${shareToken}`;

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setCopied(false);
      setLinkGenerated(false);
      setRecipientEmail("");
    }
  }, [open]);

  const handleGenerateLink = () => {
    setIsGenerating(true);
    // Simulate link generation
    setTimeout(() => {
      setIsGenerating(false);
      setLinkGenerated(true);
      toast.success("Share link created", {
        description: `Link expires in ${expiry === "1day" ? "1 day" : expiry === "7days" ? "7 days" : expiry === "30days" ? "30 days" : "never"}.`,
      });
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    if (!recipientEmail) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success("Invitation sent", {
      description: `Share link sent to ${recipientEmail}`,
    });
    setRecipientEmail("");
  };

  const getExpiryLabel = (value: string) => {
    switch (value) {
      case "1day": return "24 hours";
      case "7days": return "7 days";
      case "30days": return "30 days";
      case "never": return "No expiration";
      default: return value;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Share Document
          </DialogTitle>
          <DialogDescription>
            Create a secure, permissioned link to share "{documentName}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Link Settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Link Expiration
              </Label>
              <Select value={expiry} onValueChange={setExpiry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1day">
                    <div className="flex items-center gap-2">
                      <span>24 hours</span>
                      <Badge variant="secondary" className="text-xs">Most secure</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="7days">7 days</SelectItem>
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="never">Never expire</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Access Controls */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Access Controls</Label>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-secure" />
                  <div>
                    <p className="text-sm font-medium">Require email verification</p>
                    <p className="text-xs text-muted-foreground">
                      Viewer must verify their email before access
                    </p>
                  </div>
                </div>
                <Switch checked={requireAuth} onCheckedChange={setRequireAuth} />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium">Allow download</p>
                    <p className="text-xs text-muted-foreground">
                      Viewer can download a copy of the document
                    </p>
                  </div>
                </div>
                <Switch checked={allowDownload} onCheckedChange={setAllowDownload} />
              </div>
            </div>
          </div>

          {/* Generate or Show Link */}
          {!linkGenerated ? (
            <Button
              onClick={handleGenerateLink}
              className="w-full gap-2"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating secure link...
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4" />
                  Generate Share Link
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-4 animate-fade-in">
              {/* Link preview */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Share Link</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={shareLink}
                    readOnly
                    className="font-mono text-sm bg-secondary/50"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleCopy}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-secure" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Send via email */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Send via Email (optional)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="email"
                    placeholder="recipient@company.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleSendEmail}
                    className="shrink-0"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Link summary */}
              <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
                <p className="text-sm font-medium text-foreground">Link Settings Summary</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Expires: {getExpiryLabel(expiry)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span>Access: {allowDownload ? "View & Download" : "View only"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    <span>Auth: {requireAuth ? "Required" : "Not required"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>Role: Viewer only</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Role info */}
          <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-medium">Viewer permissions only</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Recipients can view the document but cannot share it further.
              {!allowDownload && " Downloads are disabled."} You can revoke access anytime.
            </p>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {linkGenerated ? "Done" : "Cancel"}
          </Button>
          {linkGenerated && (
            <Button onClick={handleCopy} className="gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLinkModal;
