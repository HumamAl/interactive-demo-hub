import { FileText, Download, Share2, Eye, MoreHorizontal, Shield, Clock, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DocumentCardProps {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
  sharedWith?: number;
  isVerified?: boolean;
  expiresAt?: string;
  onShare?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

const DocumentCard = ({
  id,
  name,
  type,
  uploadedAt,
  size,
  sharedWith = 0,
  isVerified = false,
  expiresAt,
  onShare,
  onView,
  onDelete,
}: DocumentCardProps) => {
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

  const getTypeIcon = (docType: string) => {
    // All types use FileText for simplicity, but colors differentiate them
    return FileText;
  };

  const handleDownload = () => {
    toast.success("Download started", {
      description: `${name} is being downloaded securely.`,
    });
  };

  return (
    <div className="group relative rounded-xl bg-card p-4 shadow-card transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
          type.toLowerCase() === "id" ? "bg-primary/10" :
          type.toLowerCase() === "tax" ? "bg-secure/10" :
          type.toLowerCase() === "contract" ? "bg-amber-500/10" :
          type.toLowerCase() === "payment" ? "bg-trust/10" :
          type.toLowerCase() === "insurance" ? "bg-purple-500/10" :
          "bg-secondary"
        }`}>
          <FileText className={`h-6 w-6 ${
            type.toLowerCase() === "id" ? "text-primary" :
            type.toLowerCase() === "tax" ? "text-secure" :
            type.toLowerCase() === "contract" ? "text-amber-600" :
            type.toLowerCase() === "payment" ? "text-trust" :
            type.toLowerCase() === "insurance" ? "text-purple-600" :
            "text-primary"
          }`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground truncate">{name}</h3>
            {isVerified && (
              <Shield className="h-4 w-4 text-secure shrink-0" title="Verified document" />
            )}
            {!isVerified && (
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" title="Pending verification" />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary" className={getTypeColor(type)}>
              {type}
            </Badge>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {uploadedAt}
            </span>
            <span>•</span>
            <span>{size}</span>
            {expiresAt && (
              <>
                <span>•</span>
                <span className="text-amber-500">Expires {expiresAt}</span>
              </>
            )}
          </div>

          {sharedWith > 0 && (
            <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Shared with {sharedWith} {sharedWith === 1 ? "viewer" : "viewers"}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onView}
            title="View document"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onShare}
            title="Share document"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Document</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{name}"? This action cannot be undone
                      and will revoke all active share links.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
