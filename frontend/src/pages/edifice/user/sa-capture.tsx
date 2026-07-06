import { useState, useEffect, useRef, useCallback } from "react";
import type { ChangeEvent } from "react";
import { Image as ImageIcon, Mic, Square, Upload, X, Loader2, Plus } from "lucide-react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { CATEGORIES } from "@/features/site-agent/mock-data";
import { useSiteData } from "@/features/site-agent/data-source";

type VoiceRecorder = {
  recording: boolean;
  audioBlob: Blob | null;
  duration: number;
  fmtTime: (s: number) => string;
  start: () => Promise<void>;
  stop: () => void;
  clear: () => void;
};

function useVoiceRecorder(): VoiceRecorder {
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
      mr.ondataavailable = (e: BlobEvent) => {
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
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      alert("Microphone access denied: " + msg);
    }
  }, []);

  const stop = useCallback(() => {
    if (mediaRef.current && mediaRef.current.state !== "inactive") mediaRef.current.stop();
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

export function SaCapturePage() {
  const [projectType, setProjectType] = useState("");
  const [newProjectType, setNewProjectType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [stage, setStage] = useState("");
  const [type, setType] = useState<"query" | "update">("query");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [stakeholder, setStakeholder] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [transcribed, setTranscribed] = useState("");
  const [transcribing, setTranscribing] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [allProjectTypes, setAllProjectTypes] = useState<string[]>([]);
  const { projects, projectTypes } = useSiteData();
  const recorder = useVoiceRecorder();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onNavigate = (_target: string) => {
    window.location.href = "/user/sa-observations";
  };

  useEffect(() => {
    // Merge context-provided projectTypes (already includes source data) + project names + localStorage user types.
    const serverNames = projects.map((p) => p.name);
    let storedTypes: string[] = [];
    try {
      storedTypes = JSON.parse(localStorage.getItem("archzig_project_types") || "[]");
    } catch {
      storedTypes = [];
    }
    const merged = [...new Set([...projectTypes, ...serverNames, ...storedTypes])].sort();
    setAllProjectTypes(merged);
  }, [projects, projectTypes]);

  const handleTranscribe = useCallback((_blob: Blob | File) => {
    setTranscribing(true);
    setTimeout(() => {
      setTranscribed("Transcribed voice note: identified issue at location...");
      setTranscribing(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (!recorder.recording && recorder.audioBlob && !audioFile) {
      handleTranscribe(recorder.audioBlob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recorder.recording, recorder.audioBlob]);

  const handleSubmit = () => {
    if (!description.trim() && !images.length) {
      alert("Add at least a description or images.");
      return;
    }

    let finalProjectType = projectType;
    if (projectType === "__new__") {
      finalProjectType = newProjectType.trim();
      if (!finalProjectType) {
        alert("Enter the new project type name.");
        return;
      }
      let storedTypes: string[] = [];
      try {
        storedTypes = JSON.parse(localStorage.getItem("archzig_project_types") || "[]");
      } catch {
        storedTypes = [];
      }
      if (!storedTypes.includes(finalProjectType)) {
        storedTypes.push(finalProjectType);
        localStorage.setItem("archzig_project_types", JSON.stringify(storedTypes));
      }
    }
    if (!finalProjectType) finalProjectType = "General";

    setSubmitting(true);

    const formData = {
      type,
      projectType: finalProjectType,
      projectName,
      stage: stage || "General",
      description,
      category: category || "General",
      location,
      responsibleStakeholder: stakeholder,
      transcribedText: transcribed,
      dateRaised: new Date().toISOString().split("T")[0],
      images: images.map((f) => f.name),
      audio: audioFile?.name || (recorder.audioBlob ? "recording.webm" : null),
    };

    console.log("Submit:", formData);
    onNavigate("queries");
  };

  const addImages = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setImages((p) => [...p, ...arr]);
    setPreviews((p) => [...p, ...arr.map((f) => URL.createObjectURL(f))]);
  };

  const hasAudio = audioFile || recorder.audioBlob;

  return (
    <EdifiShell system="site-agent" activeNav="capture" section="user">
      <div className="animate-in fade-in max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">New Site Observation</h2>
        <p className="text-sm text-gray-400 mb-8">Register a new query or update from the site.</p>

        <div className="space-y-6">
          {/* Type Toggle */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Type</p>
            <div className="flex gap-2">
              {(["query", "update"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    type === t
                      ? "bg-black text-white"
                      : "bg-gray-50 border border-gray-200 text-gray-500 hover:border-gray-400"
                  }`}
                >
                  {t === "query" ? "Query" : "Update"}
                </button>
              ))}
            </div>
          </div>

          {/* Project Type & Project Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Project Type</p>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
              >
                <option value="">Select type...</option>
                {allProjectTypes.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
                <option value="__new__">+ Create New Type</option>
              </select>
              {projectType === "__new__" && (
                <input
                  type="text"
                  value={newProjectType}
                  onChange={(e) => setNewProjectType(e.target.value)}
                  placeholder="New project type name..."
                  className="w-full mt-2 px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              )}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Project Name</p>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Tower B - Phase 2"
                list="sa-capture-project-names"
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
              />
              <datalist id="sa-capture-project-names">
                {projects.map((p) => (
                  <option key={p.id} value={p.name} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Stage & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Project Stage</p>
              <input
                type="text"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                placeholder="e.g., Foundation, Finishing..."
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Location</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Tower A - Level 3"
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>

          {/* Category & Stakeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Responsible Stakeholder
              </p>
              <input
                type="text"
                value={stakeholder}
                onChange={(e) => setStakeholder(e.target.value)}
                placeholder="e.g., Contractor / Vendor"
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the observation, issue, or update..."
              className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 resize-none h-28"
            />
          </div>

          {/* Images & Voice - side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Images</p>
              <div
                className="border-2 border-dashed border-gray-200 rounded-2xl min-h-[140px] p-3 flex flex-wrap gap-2 items-center justify-center bg-white hover:border-black cursor-pointer transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {previews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="w-14 h-14 object-cover rounded-xl shadow-sm"
                    alt=""
                  />
                ))}
                {!previews.length && (
                  <div className="flex flex-col items-center text-gray-300">
                    <ImageIcon size={24} />
                    <p className="text-xs mt-1">Click to upload</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => addImages(e.target.files)}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Voice Note</p>
              <div className="flex gap-2 mb-2">
                {!recorder.recording ? (
                  <button
                    onClick={recorder.start}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm hover:border-black transition-colors"
                  >
                    <Mic size={14} className="text-gray-400" /> Record
                  </button>
                ) : (
                  <button
                    onClick={recorder.stop}
                    className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 animate-pulse"
                  >
                    <Square size={14} /> Stop {recorder.fmtTime(recorder.duration)}
                  </button>
                )}
                <label className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm hover:border-black transition-colors cursor-pointer">
                  <Upload size={14} className="text-gray-400" />
                  {hasAudio && !recorder.recording ? (
                    <span className="text-green-600 text-xs">✓ Audio</span>
                  ) : (
                    "Upload"
                  )}
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        setAudioFile(f);
                        recorder.clear();
                        handleTranscribe(f);
                      }
                    }}
                  />
                </label>
                {hasAudio && (
                  <button
                    onClick={() => {
                      setAudioFile(null);
                      recorder.clear();
                      setTranscribed("");
                    }}
                    className="p-2 text-gray-300 hover:text-red-400 bg-white border border-gray-200 rounded-xl"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              {transcribing && (
                <p className="text-xs text-gray-400 animate-pulse">Transcribing...</p>
              )}
              {transcribed && (
                <p className="text-xs text-gray-500 italic line-clamp-3">"{transcribed}"</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => onNavigate("queries")}
              className="px-5 py-2.5 text-gray-400 font-medium hover:text-black transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || transcribing}
              className="px-8 py-2.5 bg-black text-white rounded-full font-bold text-sm hover:opacity-80 disabled:opacity-40 transition-all flex items-center gap-2"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              {submitting ? "Submitting..." : transcribing ? "Transcribing..." : "Submit Observation"}
            </button>
          </div>
        </div>
      </div>
    </EdifiShell>
  );
}
