import { useState } from "react";
import { Copy, Check, Link2, Clock, Users, Shield } from "lucide-react";
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

interface ShareLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentName: string;
}

const ShareLinkModal = ({ open, onOpenChange, documentName }: ShareLinkModalProps) => {
  const [copied, setCopied] = useState(false);
  const [expiry, setExpiry] = useState("7days");
  const [requireAuth, setRequireAuth] = useState(false);
  
  const shareLink = `https://workid.app/share/x7k9m2n4...`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Share Document
          </DialogTitle>
          <DialogDescription>
            Create a secure link to share "{documentName}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Link preview */}
          <div className="flex items-center gap-2">
            <Input
              value={shareLink}
              readOnly
              className="font-mono text-sm"
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

          {/* Expiry setting */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Link expires in
            </Label>
            <Select value={expiry} onValueChange={setExpiry}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1day">1 day</SelectItem>
                <SelectItem value="7days">7 days</SelectItem>
                <SelectItem value="30days">30 days</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Access settings */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Require verification</p>
                <p className="text-xs text-muted-foreground">
                  Viewer must verify email before access
                </p>
              </div>
            </div>
            <Switch checked={requireAuth} onCheckedChange={setRequireAuth} />
          </div>

          {/* Role info */}
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-medium">Viewer access only</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Recipients can view but not download or share further
            </p>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCopy} className="gap-2">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLinkModal;
