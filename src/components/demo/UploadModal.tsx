import { useState, useCallback } from "react";
import { Upload, X, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete: (fileName: string) => void;
}

type UploadState = "idle" | "uploading" | "encrypting" | "complete" | "error";

const UploadModal = ({ open, onOpenChange, onUploadComplete }: UploadModalProps) => {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const simulateUpload = (name: string) => {
    setFileName(name);
    setUploadState("uploading");
    setProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 60) {
          clearInterval(uploadInterval);
          setUploadState("encrypting");

          // Simulate encryption
          setTimeout(() => {
            setProgress(80);
            setTimeout(() => {
              setProgress(100);
              setUploadState("complete");
              toast.success("Document uploaded", {
                description: `${name} has been securely encrypted and stored.`,
              });
            }, 500);
          }, 800);
          return 70;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleFileSelect = () => {
    // Simulate file selection with mock data
    const mockFiles = [
      "Invoice_2025_001.pdf",
      "Contract_Agreement.pdf",
      "Tax_Document_W9.pdf",
      "ID_Verification.jpg",
    ];
    const randomFile = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    simulateUpload(randomFile);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload("Dropped_Document.pdf");
  }, []);

  const handleComplete = () => {
    onUploadComplete(fileName);
    onOpenChange(false);
    // Reset state after closing
    setTimeout(() => {
      setUploadState("idle");
      setProgress(0);
      setFileName("");
    }, 300);
  };

  const handleClose = () => {
    if (uploadState === "uploading" || uploadState === "encrypting") {
      return; // Prevent closing during upload
    }
    onOpenChange(false);
    setTimeout(() => {
      setUploadState("idle");
      setProgress(0);
      setFileName("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Document
          </DialogTitle>
          <DialogDescription>
            Upload a document to your secure vault. Files are encrypted with AES-256.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {uploadState === "idle" && (
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Drop your file here, or{" "}
                    <button
                      onClick={handleFileSelect}
                      className="text-primary hover:underline"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {(uploadState === "uploading" || uploadState === "encrypting") && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                <FileText className="h-10 w-10 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{fileName}</p>
                  <p className="text-sm text-muted-foreground">
                    {uploadState === "uploading" ? "Uploading..." : "Encrypting..."}
                  </p>
                </div>
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {uploadState === "uploading" ? "Uploading" : "Encrypting with AES-256"}
                  </span>
                  <span className="font-mono text-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secure/10">
                  <CheckCircle2 className="h-3 w-3 text-secure" />
                </div>
                End-to-end encryption enabled
              </div>
            </div>
          )}

          {uploadState === "complete" && (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secure/10">
                  <CheckCircle2 className="h-8 w-8 text-secure" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">Upload Complete</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {fileName} has been securely stored
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-secondary/50 p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Encryption</span>
                  <span className="font-mono text-secure">AES-256-GCM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-secure">Encrypted & Stored</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Verification</span>
                  <span className="text-amber-500">Pending</span>
                </div>
              </div>
            </div>
          )}

          {uploadState === "error" && (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Upload Failed</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Please try again or contact support
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          {uploadState === "idle" && (
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          )}
          {uploadState === "complete" && (
            <>
              <Button variant="outline" onClick={() => {
                setUploadState("idle");
                setProgress(0);
                setFileName("");
              }}>
                Upload Another
              </Button>
              <Button onClick={handleComplete}>
                Done
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
