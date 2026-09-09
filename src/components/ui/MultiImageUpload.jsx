import { useEffect, useState } from "react";
import {
  AlertCircle,
  ImagePlus,
  Plus,
  UploadCloud,
  X,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function MultiImageUpload({
  label = "Images",
  onChange,
  error,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024,
  enablePrimary = false,
}) {
  const [files, setFiles] = useState([]);
  const [primaryIndex, setPrimaryIndex] = useState(0);

  const onDrop = (acceptedFiles) => {
    setFiles((currentFiles) => {
      const remaining = maxFiles - currentFiles.length;

      if (remaining <= 0) {
        return currentFiles;
      }

      const newFiles = acceptedFiles
        .slice(0, remaining)
        .map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );

      const updatedFiles = [...currentFiles, ...newFiles];

      onChange?.(updatedFiles);

      return updatedFiles;
    });
  };

  const removeImage = (index) => {
    setFiles((currentFiles) => {
      const removedFile = currentFiles[index];

      if (removedFile?.preview) {
        URL.revokeObjectURL(removedFile.preview);
      }

      const updatedFiles = currentFiles.filter(
        (_, fileIndex) => fileIndex !== index,
      );

      onChange?.(updatedFiles);

      return updatedFiles;
    });

    if (!enablePrimary) {
      return;
    }

    setPrimaryIndex((currentIndex) => {
      if (index === currentIndex) {
        return 0;
      }

      if (index < currentIndex) {
        return currentIndex - 1;
      }

      return currentIndex;
    });
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    multiple: true,
    maxFiles,
    maxSize,
    disabled: files.length >= maxFiles,
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-[#03152B]">
          {label}
        </label>
      )}

      <div
        {...getRootProps()}
        className={`
          rounded-lg border border-dashed px-4 py-5 text-center
          transition
          ${
            files.length >= maxFiles
              ? "cursor-not-allowed border-[#D7DFEA] bg-[#F1F5F9]"
              : "cursor-pointer"
          }
          ${
            isDragActive
              ? "border-[#2E7AF0] bg-[#EAF1FF]"
              : "border-[#CBD5E1] bg-[#F8FAFD] hover:border-[#2E7AF0] hover:bg-[#F4F8FF]"
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2E7AF0] shadow-sm ring-1 ring-[#D7E5FF]">
            {isDragActive ? (
              <ImagePlus size={18} />
            ) : (
              <UploadCloud size={18} />
            )}
          </div>

          <p className="text-xs font-bold text-[#03152B]">
            {files.length >= maxFiles
              ? "Maximum images reached"
              : isDragActive
                ? "Drop images here..."
                : "Drag & drop images here"}
          </p>

          <p className="mt-1 text-xs text-[#64748B]">
            or
          </p>

          <span className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-[#D7DFEA] bg-white px-3 py-1.5 text-xs font-semibold text-[#2E7AF0] shadow-sm">
            <UploadCloud size={13} />
            Browse Files
          </span>

          <p className="mt-2 text-xs font-medium text-[#8A98AA]">
            PNG, JPG, WEBP up to {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
      </div>

      {(files.length > 0 || files.length < maxFiles) && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              role={enablePrimary ? "button" : undefined}
              tabIndex={enablePrimary ? 0 : undefined}
              onClick={() => {
                if (enablePrimary) {
                  setPrimaryIndex(index);
                }
              }}
              onKeyDown={(event) => {
                if (
                  enablePrimary &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  setPrimaryIndex(index);
                }
              }}
              className={`group relative aspect-square overflow-hidden rounded-md border bg-white ${
                enablePrimary && index === primaryIndex
                  ? "border-[#2E7AF0] ring-1 ring-[#2E7AF0]"
                  : "border-[#D7DFEA]"
              } ${enablePrimary ? "cursor-pointer" : ""}`}
              aria-label={
                enablePrimary ? `Set ${file.name} as primary image` : undefined
              }
            >
              <img
                src={file.preview}
                alt={file.name}
                className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
              />

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  removeImage(index);
                }}
                className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#1E2B3F] text-white shadow-sm transition hover:bg-[#03152B]"
                aria-label={`Remove ${file.name}`}
              >
                <X size={12} />
              </button>

              {enablePrimary && index === primaryIndex && (
                <span className="absolute left-1 top-1 rounded bg-[#2E7AF0] px-1.5 py-0.5 text-[10px] font-bold text-white">
                  Primary
                </span>
              )}
            </div>
          ))}

          {files.length < maxFiles && (
            <div
              {...getRootProps()}
              className="flex aspect-square cursor-pointer items-center justify-center rounded-md border border-dashed border-[#D7DFEA] bg-white text-[#8A98AA] transition hover:border-[#2E7AF0] hover:bg-[#F4F8FF] hover:text-[#2E7AF0]"
            >
              <input {...getInputProps()} />
              <Plus size={18} />
            </div>
          )}
        </div>
      )}

      {fileRejections.length > 0 && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
          <AlertCircle size={15} />
          Some images were rejected. Check file type, size, or maximum image
          count.
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
