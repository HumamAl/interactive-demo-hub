import { FileText, Download, Share2, Eye, MoreHorizontal, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface DocumentCardProps {
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
  sharedWith?: number;
  isVerified?: boolean;
  onShare?: () => void;
  onView?: () => void;
}

const DocumentCard = ({
  name,
  type,
  uploadedAt,
  size,
  sharedWith = 0,
  isVerified = false,
  onShare,
  onView,
}: DocumentCardProps) => {
  const getTypeColor = (docType: string) => {
    switch (docType.toLowerCase()) {
      case "id":
        return "bg-primary/10 text-primary";
      case "tax":
        return "bg-secure/10 text-secure";
      case "contract":
        return "bg-amber-500/10 text-amber-600";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="group relative rounded-xl bg-card p-4 shadow-card transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground truncate">{name}</h3>
            {isVerified && (
              <Shield className="h-4 w-4 text-secure shrink-0" />
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
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onShare}
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
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
