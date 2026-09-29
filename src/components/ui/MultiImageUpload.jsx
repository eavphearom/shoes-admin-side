import { useEffect, useState } from "react";
import { AlertCircle, ImagePlus, Plus, UploadCloud, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

export function UploadImagePreview({ image, className = "" }) {
  const [blobUrl, setBlobUrl] = useState("");
  const blob = image instanceof Blob ? image : image?.file;
  useEffect(() => {
    if (!(blob instanceof Blob)) return;
    const url = URL.createObjectURL(blob);
    // Each mounted preview owns its URL; persisted files get fresh URLs on edit.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [blob]);
  const src = blob ? blobUrl : typeof image === "string" ? image : image?.url || image?.preview;
  return src ? <img src={src} alt={image?.name || "Product image"} className={className} /> : <ImagePlus size={24} className="text-[#94A3B8]" />;
}

export default function MultiImageUpload({
  label = "Images", value, onChange, error, maxFiles = 5, maxSize = 5 * 1024 * 1024,
  enablePrimary = false, layout = "stacked", disabled = false,
}) {
  const [internalFiles, setInternalFiles] = useState([]);
  const files = value ?? internalFiles;
  const compact = layout === "compact";
  const commit = (next) => {
    if (value === undefined) setInternalFiles(next);
    onChange?.(next);
  };
  const onDrop = (accepted) => {
    const added = accepted.slice(0, maxFiles - files.length).map(file => ({
      clientId: crypto.randomUUID(), name: file.name, file, is_primary: false,
    }));
    const next = [...files, ...added];
    if (enablePrimary && next.length && !next.some(image => image.is_primary)) next[0] = { ...next[0], is_primary: true };
    commit(next);
  };
  const remove = (index) => {
    const next = files.filter((_, i) => i !== index);
    if (enablePrimary && next.length && !next.some(image => image.is_primary)) next[0] = { ...next[0], is_primary: true };
    commit(next);
  };
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop, accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] },
    multiple: true, maxFiles, maxSize, disabled: disabled || files.length >= maxFiles,
  });
  return (
    <div className="min-w-0">
      {label && <p className="mb-2 text-sm font-medium text-[#03152B]">{label}</p>}
      {!compact && <div {...getRootProps()} className={"mb-3 cursor-pointer rounded-lg border border-dashed p-4 text-center " + (isDragActive ? "border-[#F97316] bg-orange-50" : "border-[#D7DFEA] bg-[#F8FAFD]")}>
        <input {...getInputProps()} aria-label={label || "Upload images"} />
        <UploadCloud className="mx-auto text-[#F97316]" size={24} />
        <p className="mt-2 text-sm">Drag & drop images here or browse files</p>
        <p className="mt-1 text-xs text-[#64748B]">PNG, JPG, WEBP up to {maxSize / 1024 / 1024}MB</p>
      </div>}
      <div className={"grid gap-2 " + (compact ? "grid-cols-[repeat(auto-fill,minmax(72px,1fr))]" : "grid-cols-3 sm:grid-cols-4")}>
        {files.map((image, index) => <div key={image.clientId || image.id || image.url || index} className={"relative aspect-[4/5] min-w-0 overflow-hidden rounded-md border bg-[#F7F8FA] " + (image.is_primary && enablePrimary ? "border-[#267BFA]" : "border-[#D7DFEA]")}>
          <button type="button" disabled={disabled || !enablePrimary} onClick={() => commit(files.map((item, i) => ({ ...item, is_primary: i === index })))} aria-label={"Set image " + (index + 1) + " as primary"} aria-pressed={enablePrimary ? Boolean(image.is_primary) : undefined} className="flex h-full w-full cursor-pointer items-center justify-center">
            <UploadImagePreview image={image} className="h-full w-full object-contain" />
          </button>
          <button type="button" disabled={disabled} onClick={() => remove(index)} aria-label={"Remove image " + (index + 1)} className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#7187A5] text-white"><X size={12} /></button>
          {enablePrimary && image.is_primary && <span className="pointer-events-none absolute bottom-1 left-1 rounded bg-[#267BFA] px-1.5 py-0.5 text-[10px] font-medium text-white">Primary</span>}
        </div>)}
        {files.length < maxFiles && <div {...getRootProps()} className={"flex aspect-[4/5] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed text-center text-xs " + (compact ? "border-[#75A9FF] bg-[#F8FBFF] text-[#267BFA]" : "border-[#D7DFEA] text-[#64748B]")}>
          {compact && <input {...getInputProps()} aria-label="Add variant images" />}
          <Plus size={22} /><span>Add Images</span>
        </div>}
      </div>
      {fileRejections.length > 0 && <p role="alert" className="mt-2 text-xs text-red-600">Use JPG, PNG or WEBP images under {maxSize / 1024 / 1024}MB, up to {maxFiles} images.</p>}
      {error && <p role="alert" className="mt-2 flex items-center gap-1 text-xs text-red-600"><AlertCircle size={14} />{error}</p>}
    </div>
  );
}
