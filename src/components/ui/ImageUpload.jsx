import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ImagePlus,
  UploadCloud,
  X,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function ImageUpload({
  label = "Image",
  onChange,
  error,
  maxSize = 5 * 1024 * 1024,
}) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
    onChange?.(file);
  };

  const removeImage = (event) => {
    event.stopPropagation();

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setFileName("");
    onChange?.(null);
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpg", ".jpeg", ".png", ".webp"],
      },
      maxFiles: 1,
      maxSize,
    });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-[#03152B]">
          {label}
        </label>
      )}

      <div
        {...getRootProps()}
        className={`group relative overflow-hidden rounded-lg border border-dashed p-4 transition ${
          isDragActive
            ? "border-[#2E7AF0] bg-[#EAF1FF]"
            : "border-[#CBD5E1] bg-[#F8FAFD] hover:border-[#2E7AF0] hover:bg-[#F4F8FF]"
        }`}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="grid cursor-pointer gap-4 sm:grid-cols-[128px_1fr] sm:items-center">
            <div className="relative overflow-hidden rounded-lg border border-[#D7DFEA] bg-white">
              <img
                src={preview}
                alt="Preview"
                className="h-32 w-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#03152B]/80 text-white shadow-sm transition hover:bg-[#03152B]"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>

            <div className="text-left">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#15803D]">
                <CheckCircle2 size={13} />
                Image selected
              </div>
              <p className="truncate text-sm font-semibold text-[#03152B]">
                {fileName}
              </p>
              <p className="mt-1 text-xs text-[#64748B]">
                Click or drop a new file to replace this image.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex cursor-pointer flex-col items-center justify-center py-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2E7AF0] shadow-sm ring-1 ring-[#D7E5FF]">
              {isDragActive ? (
                <ImagePlus size={22} />
              ) : (
                <UploadCloud size={22} />
              )}
            </div>

            <p className="text-sm font-semibold text-[#03152B]">
              {isDragActive ? "Drop image here" : "Upload product image"}
            </p>

            <p className="mt-1 text-sm text-[#64748B]">
              Drag and drop or click to browse
            </p>

            <p className="mt-2 text-xs font-medium text-[#8A98AA]">
              JPG, PNG, WEBP up to {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>
        )}
      </div>

      {fileRejections.length > 0 && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
          <AlertCircle size={15} />
          Image was rejected. Check file type or size.
        </p>
      )}

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
          <AlertCircle size={15} />
          {error}
        </p>
      )}
    </div>
  );
}
