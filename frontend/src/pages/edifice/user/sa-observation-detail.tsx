import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ChevronLeft, Image as ImageIcon, User, Send, CheckCircle2,
  Loader2, Mic, Square, X, FileText, Paperclip,
} from "lucide-react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { useSiteData, useObservation, imageUrl } from "@/features/site-agent/data-source";
import type { Reply } from "@/features/site-agent/mock-data";

// -------------------------------------------------------------
// Voice recorder hook
// -------------------------------------------------------------
function useVoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        setAudioBlob(new Blob(chunksRef.current, { type: "audio/webm" }));
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start(200);
      mediaRef.current = mr;
      setRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } catch {
      alert("Microphone access denied");
    }
  }, []);

  const stop = useCallback(() => {
    if (mediaRef.current && mediaRef.current.state !== "inactive") {
      mediaRef.current.stop();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setRecording(false);
  }, []);

  const clear = useCallback(() => {
    setAudioBlob(null);
    setDuration(0);
  }, []);

  const fmtTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return { recording, audioBlob, duration, fmtTime, start, stop, clear };
}

// -------------------------------------------------------------
// Reply payload used by AttachmentInput -> parent
// -------------------------------------------------------------
export interface ReplyPayload {
  text: string;
  transcribedText?: string;
  images: File[];
  files: File[];
  audioBlob: Blob | null;
}

interface AttachmentInputProps {
  onSubmit: (payload: ReplyPayload) => Promise<void> | void;
  submitLabel?: string;
  placeholder?: string;
}

function AttachmentInput({ onSubmit, submitLabel, placeholder }: AttachmentInputProps) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [transcribed, setTranscribed] = useState("");
  const [transcribing, setTranscribing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const recorder = useVoiceRecorder();
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Mock transcription — no API call
  useEffect(() => {
    if (!recorder.recording && recorder.audioBlob && !transcribing && !transcribed) {
      setTranscribing(true);
      const timer = setTimeout(() => {
        setTranscribed("Transcribed: [mock voice content]");
        setTranscribing(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [recorder.recording, recorder.audioBlob, transcribing, transcribed]);

  const handleSubmit = async () => {
    const finalText = text || transcribed;
    if (!finalText && !images.length && !files.length && !recorder.audioBlob) return;
    setSubmitting(true);
    try {
      await onSubmit({
        text: finalText,
        transcribedText: transcribed || undefined,
        images,
        files,
        audioBlob: recorder.audioBlob,
      });
      setText("");
      setImages([]);
      setFiles([]);
      setTranscribed("");
      recorder.clear();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      alert("Failed: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white">
      {/* Text area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder || "Write a reply..."}
        className="w-full text-sm border-none outline-none resize-none h-16 bg-transparent placeholder-gray-300"
      />

      {/* Transcription preview */}
      {transcribing && (
        <p className="text-xs text-gray-400 animate-pulse mb-2">Transcribing audio...</p>
      )}
      {transcribed && (
        <p className="text-xs text-gray-500 italic mb-2 bg-gray-50 p-2 rounded-lg">
          {'\u{1F399} "'}{transcribed}{'"'}
        </p>
      )}

      {/* Attachment previews */}
      {(images.length > 0 || files.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-3">
          {images.map((f, i) => (
            <div
              key={`img-${i}`}
              className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-100"
            >
              <img
                src={URL.createObjectURL(f)}
                className="w-full h-full object-cover"
                alt=""
              />
              <button
                onClick={() =>
                  setImages((prev) => prev.filter((_, j) => j !== i))
                }
                className="absolute top-0 right-0 w-4 h-4 bg-black/60 text-white rounded-bl-md flex items-center justify-center"
              >
                <X size={8} />
              </button>
            </div>
          ))}
          {files.map((f, i) => (
            <div
              key={`file-${i}`}
              className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg text-[10px] text-gray-500 border border-gray-100"
            >
              <FileText size={10} /> {f.name.substring(0, 20)}
              <button
                onClick={() =>
                  setFiles((prev) => prev.filter((_, j) => j !== i))
                }
                className="text-gray-300 hover:text-red-400"
              >
                <X size={8} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Action bar */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        {!recorder.recording ? (
          <button
            onClick={recorder.start}
            className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-black transition-colors"
            title="Record voice"
          >
            <Mic size={14} />
          </button>
        ) : (
          <button
            onClick={recorder.stop}
            className="p-2 rounded-lg bg-red-50 text-red-600 animate-pulse flex items-center gap-1 text-xs"
          >
            <Square size={12} /> {recorder.fmtTime(recorder.duration)}
          </button>
        )}
        <button
          onClick={() => imgRef.current?.click()}
          className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-black transition-colors"
          title="Add images/drawings"
        >
          <ImageIcon size={14} />
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-black transition-colors"
          title="Add PDF/files"
        >
          <Paperclip size={14} />
        </button>

        <input
          ref={imgRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            setImages((prev) => [...prev, ...Array.from(e.target.files || [])])
          }
        />
        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.dwg,.dxf"
          className="hidden"
          onChange={(e) =>
            setFiles((prev) => [...prev, ...Array.from(e.target.files || [])])
          }
        />

        {recorder.audioBlob && !recorder.recording && (
          <span className="text-[10px] text-green-600 font-bold px-2 py-0.5 bg-green-50 rounded-full">
            {'✓'} Voice attached
          </span>
        )}

        <div className="flex-1" />
        <button
          onClick={handleSubmit}
          disabled={
            submitting ||
            transcribing ||
            (!text && !transcribed && !images.length && !files.length && !recorder.audioBlob)
          }
          className="px-4 py-2 bg-black text-white rounded-xl text-xs font-bold hover:opacity-80 disabled:opacity-20 transition-all flex items-center gap-1.5"
        >
          {submitting ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Send size={12} />
          )}
          {submitLabel || "Reply"}
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Detail Page
// -------------------------------------------------------------
export function SaObservationDetailPage() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const { loading, addReply, markResolved, reopen } = useSiteData();
  const item = useObservation(id);

  const [showResolution, setShowResolution] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/user/sa-observations";
    }
  };

  if (loading) {
    return (
      <EdifiShell system="site-agent" activeNav="observations" section="user">
        <div className="flex items-center justify-center py-32">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
        </div>
      </EdifiShell>
    );
  }

  if (!item) {
    return (
      <EdifiShell system="site-agent" activeNav="observations" section="user">
        <div className="max-w-3xl mx-auto py-20 text-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-black transition-colors mb-6 mx-auto"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <p className="text-gray-400 text-lg mb-2">Observation not found.</p>
          <p className="text-sm text-gray-300">
            The observation with id{" "}
            <span className="font-mono">{id ?? "(none)"}</span> could not be located.
          </p>
        </div>
      </EdifiShell>
    );
  }

  const buildReplyFromPayload = (
    payload: ReplyPayload,
    author = "You",
  ): Reply => {
    const attachments: NonNullable<Reply["attachments"]> = [];
    payload.images.forEach((f) =>
      attachments.push({ type: "image", name: f.name, path: URL.createObjectURL(f) }),
    );
    payload.files.forEach((f) =>
      attachments.push({ type: "file", name: f.name, path: URL.createObjectURL(f) }),
    );
    if (payload.audioBlob) {
      attachments.push({
        type: "audio",
        name: "voice.webm",
        path: URL.createObjectURL(payload.audioBlob),
      });
    }
    return {
      id: crypto.randomUUID(),
      author,
      timestamp: new Date().toISOString(),
      text: payload.text,
      transcribedText: payload.transcribedText,
      attachments: attachments.length ? attachments : undefined,
    };
  };

  const handleReply = (payload: ReplyPayload) => {
    if (id) addReply(id, buildReplyFromPayload(payload));
  };

  const handleSuggestResolution = (payload: ReplyPayload) => {
    if (id) {
      addReply(id, buildReplyFromPayload(payload, "Suggested Resolution"));
      markResolved(id);
    }
    setShowResolution(false);
  };

  const handleMarkResolved = () => {
    if (id) markResolved(id);
  };
  const handleReopen = () => {
    if (id) reopen(id);
  };

  // Determine interaction mode
  const isNewQuery = item.source === "manual" && item.type === "query";
  const showSuggestResolution = isNewQuery;

  const allImages = [
    ...(item.images?.before || []),
    ...(item.images?.after || []),
  ];

  return (
    <EdifiShell system="site-agent" activeNav="observations" section="user">
      <div className="animate-in fade-in max-w-3xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-black transition-colors mb-6"
        >
          <ChevronLeft size={16} /> Back
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${
                item.status === "open"
                  ? "bg-amber-50 text-amber-600 border border-amber-100"
                  : "bg-green-50 text-green-600 border border-green-100"
              }`}
            >
              {item.status}
            </span>
            <span
              className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${
                item.source === "pptx"
                  ? "bg-gray-800 text-white"
                  : item.type === "update"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {item.source === "pptx" ? "Site Report" : item.type}
            </span>
            <span className="text-xs text-gray-400">#{item.serialNo}</span>
            {item.sourceFile && (
              <span className="text-xs text-gray-400">from {item.sourceFile}</span>
            )}
          </div>
          <h2 className="text-xl font-bold leading-tight">
            {item.description || item.category || "No description"}
          </h2>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Category", value: item.category || "—" },
            { label: "Location", value: item.location || "—" },
            { label: "Date", value: item.dateRaised || "—" },
            {
              label: "Stakeholder",
              value: item.responsibleStakeholder || "—",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-gray-50 border border-gray-100"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                {m.label}
              </p>
              <p className="text-sm font-medium truncate">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Technical details */}
        {(item.natureOfObservation || item.technicalRootCause || item.raisedBy) && (
          <div className="p-5 rounded-2xl border border-gray-100 bg-white mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              Technical Details
            </p>
            <div className="space-y-2 text-sm">
              {item.natureOfObservation && (
                <p>
                  <span className="font-medium text-gray-500">Nature:</span>{" "}
                  {item.natureOfObservation}
                </p>
              )}
              {item.technicalRootCause && (
                <p>
                  <span className="font-medium text-gray-500">Root Cause:</span>{" "}
                  {item.technicalRootCause}
                </p>
              )}
              {item.raisedBy && (
                <p>
                  <span className="font-medium text-gray-500">Raised By:</span>{" "}
                  {item.raisedBy}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Solution / Resolution */}
        {(item.solutionDescription ||
          item.resolutionDescription ||
          item.suggestedResolution) && (
          <div className="p-5 rounded-2xl border border-green-100 bg-green-50/30 mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">
              Solution &amp; Resolution
            </p>
            <div className="space-y-2 text-sm">
              {item.solutionDescription && (
                <p>
                  <span className="font-medium text-gray-500">Solution:</span>{" "}
                  {item.solutionDescription}
                </p>
              )}
              {item.solutionMode && (
                <p>
                  <span className="font-medium text-gray-500">Mode:</span>{" "}
                  {item.solutionMode}
                </p>
              )}
              {item.suggestedResolution && (
                <p>
                  <span className="font-medium text-gray-500">Suggested:</span>{" "}
                  {item.suggestedResolution}
                </p>
              )}
              {item.resolutionDescription && (
                <p>
                  <span className="font-medium text-gray-500">Resolution:</span>{" "}
                  {item.resolutionDescription}
                </p>
              )}
              {item.resolvedDate && (
                <p className="text-xs text-gray-400">
                  Resolved: {item.resolvedDate}
                </p>
              )}
            </div>
            {/* Resolution attachments */}
            {(item.resolutionAttachments?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.resolutionAttachments!.map((a, i) => (
                  <a
                    key={i}
                    href={imageUrl(a.path)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] px-2 py-1 bg-green-100 text-green-700 rounded-lg flex items-center gap-1"
                  >
                    {a.type === "image" ? (
                      <ImageIcon size={10} />
                    ) : (
                      <FileText size={10} />
                    )}{" "}
                    {a.name?.substring(0, 20) || "Attachment"}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Images — Before/After */}
        {allImages.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              Images ({allImages.length})
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(item.images?.before?.length ?? 0) > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-amber-600 mb-2 uppercase">
                    Query / Before
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {item.images!.before!.map((img, i) => (
                      <img
                        key={i}
                        src={imageUrl(img)}
                        alt={`Before ${i + 1}`}
                        className="w-full h-32 object-cover rounded-xl border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => window.open(imageUrl(img), "_blank")}
                      />
                    ))}
                  </div>
                </div>
              )}
              {(item.images?.after?.length ?? 0) > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-green-600 mb-2 uppercase">
                    Resolution / After
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {item.images!.after!.map((img, i) => (
                      <img
                        key={i}
                        src={imageUrl(img)}
                        alt={`After ${i + 1}`}
                        className="w-full h-32 object-cover rounded-xl border border-green-100 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => window.open(imageUrl(img), "_blank")}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Replies */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
            Discussion ({item.replies?.length || 0})
          </p>
          <div className="space-y-3 mb-4">
            {(item.replies || []).map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <User size={12} className="text-gray-400" />
                  <span className="text-xs font-bold text-gray-600">
                    {r.author}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(r.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm">{r.text}</p>
                {r.transcribedText && (
                  <p className="text-xs text-gray-400 italic mt-1">
                    {'\u{1F399} '}{r.transcribedText}
                  </p>
                )}
                {(r.attachments?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {r.attachments!.map((a, i) => (
                      <a
                        key={i}
                        href={a.path}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded-lg flex items-center gap-1 hover:bg-gray-200 transition-colors"
                      >
                        {a.type === "image" ? (
                          <ImageIcon size={10} />
                        ) : a.type === "audio" ? (
                          <Mic size={10} />
                        ) : (
                          <FileText size={10} />
                        )}
                        {a.name?.substring(0, 25) || a.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reply input — always shown for site reports & updates */}
          {(!showSuggestResolution || item.status === "resolved") && (
            <AttachmentInput
              onSubmit={handleReply}
              submitLabel="Reply"
              placeholder="Add a reply with text, voice, images, or drawings..."
            />
          )}
        </div>

        {/* Actions — Suggest Resolution (only for new queries) */}
        {showSuggestResolution && item.status === "open" && (
          <div className="pt-4 border-t border-gray-100">
            {!showResolution ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResolution(true)}
                  className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold hover:border-black transition-colors"
                >
                  Suggest Resolution
                </button>
                {item.suggestedResolution && (
                  <button
                    onClick={handleMarkResolved}
                    className="flex-1 py-3 rounded-2xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={14} /> Mark as Resolved
                  </button>
                )}
              </div>
            ) : (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Suggest Resolution
                </p>
                <AttachmentInput
                  onSubmit={handleSuggestResolution}
                  submitLabel="Submit Resolution"
                  placeholder="Describe the resolution with text, voice, images, or drawings..."
                />
                <button
                  onClick={() => setShowResolution(false)}
                  className="mt-2 text-xs text-gray-400 hover:text-black transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* For new queries — reply after resolution is suggested */}
        {showSuggestResolution &&
          item.status === "open" &&
          item.suggestedResolution && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Add Reply
              </p>
              <AttachmentInput
                onSubmit={handleReply}
                submitLabel="Reply"
                placeholder="Add a reply..."
              />
            </div>
          )}

        {item.status === "resolved" && item.source === "manual" && (
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleReopen}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold hover:border-black transition-colors"
            >
              Reopen Query
            </button>
          </div>
        )}
      </div>
    </EdifiShell>
  );
}
