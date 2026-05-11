"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, X, CheckCircle } from "lucide-react";

interface FileDropZoneProps {
  className?: string;
  variant?: "default" | "minimal" | "bordered";
  size?: "sm" | "md" | "lg";
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFilesDropped?: (files: File[]) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function FileDropZone({
  className = "",
  size = "md",
  accept = "*",
  multiple = true,
  maxSize = 10,
  onFilesDropped,
  isLoading = false,
  disabled = false,
}: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sizes = {
    sm: "py-8 px-4",
    md: "py-12 px-6",
    lg: "py-16 px-8",
  };

  const validateFiles = useCallback(
    (fileList: FileList | File[]) => {
      const arr = Array.from(fileList);
      const maxBytes = maxSize * 1024 * 1024;
      const invalid = arr.find((f) => f.size > maxBytes);
      if (invalid) {
        setError(`File "${invalid.name}" exceeds ${maxSize}MB limit`);
        return [];
      }
      setError("");
      return multiple ? arr : [arr[0]];
    },
    [maxSize, multiple]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      const valid = validateFiles(e.dataTransfer.files);
      if (valid.length) {
        setFiles((prev) => [...prev, ...valid]);
        onFilesDropped?.(valid);
      }
    },
    [disabled, validateFiles, onFilesDropped]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const valid = validateFiles(e.target.files);
    if (valid.length) {
      setFiles((prev) => [...prev, ...valid]);
      onFilesDropped?.(valid);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / 1048576).toFixed(1)}MB`;
  };

  return (
    <div className={`w-full max-w-md ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}>
      <motion.div
        onDragOver={(e) => { e.preventDefault(); !disabled && setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        animate={{
          scale: isDragOver ? 1.02 : 1,
          borderColor: isDragOver ? "var(--accent)" : error ? "#ef4444" : "var(--border)",
        }}
        transition={{ duration: 0.2 }}
        className={`relative ${sizes[size]} rounded-2xl border-2 border-dashed bg-[var(--bg-card)] cursor-pointer transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] group`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />

        {/* Glow on drag */}
        {isDragOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: "inset 0 0 30px var(--accent-glow)" }}
          />
        )}

        <div className="flex flex-col items-center text-center gap-3">
          <motion.div
            animate={{
              y: isDragOver ? -4 : 0,
              scale: isDragOver ? 1.1 : 1,
            }}
            className="w-12 h-12 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)]"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full"
              />
            ) : (
              <Upload size={22} />
            )}
          </motion.div>

          <div>
            <p className="text-sm font-medium">
              {isDragOver ? "Drop files here" : "Drop files or click to upload"}
            </p>
            <p className="text-xs text-[var(--text-tertiary)] mt-1">
              {accept === "*" ? "Any file type" : accept} · Max {maxSize}MB
              {multiple ? " · Multiple files" : ""}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-500 font-medium"
        >
          {error}
        </motion.p>
      )}

      {/* File list */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 space-y-2"
          >
            {files.map((file, i) => (
              <motion.div
                key={`${file.name}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-border"
              >
                <File size={16} className="shrink-0 text-[var(--accent)]" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{file.name}</div>
                  <div className="text-[10px] text-[var(--text-tertiary)]">{formatSize(file.size)}</div>
                </div>
                <CheckCircle size={14} className="shrink-0 text-green-500" />
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  className="shrink-0 p-0.5 rounded hover:bg-[var(--bg-card)] text-[var(--text-tertiary)]"
                  aria-label="Remove file"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
