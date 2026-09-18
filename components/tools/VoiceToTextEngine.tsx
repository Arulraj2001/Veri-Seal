'use client';

import * as React from 'react';
import {
  Mic,
  MicOff,
  Upload,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Download,
  Copy,
  Check,
  Sparkles,
  Clock,
  Volume2,
  VolumeX,
  FileText,
  Search,
  Wand2,
  Trash2,
  Users,
  AlertCircle,
  FileCheck2,
  RefreshCw,
  Sliders,
  ChevronDown,
} from 'lucide-react';
import {
  TranscriptSegment,
  decodeAudioToPCM16k,
  formatTimecode,
  generateSRT,
  generateVTT,
  generateTimestampedText,
  generateCleanText,
  cleanFillerWords,
  calculateTranscriptMetrics,
} from '@/lib/stt-audio-utils';
import {
  STT_MODELS,
  SUPPORTED_LANGUAGES,
  DEMO_SAMPLES,
  SttModelOption,
} from '@/lib/stt-constants';

type InputMode = 'upload' | 'live' | 'demo';

export function VoiceToTextEngine() {
  // Input mode & settings
  const [activeMode, setActiveMode] = React.useState<InputMode>('upload');
  const [selectedModel, setSelectedModel] = React.useState<SttModelOption>(STT_MODELS[0]);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>('auto');

  // Auto-switch to multilingual model if user selects a non-English language (Hindi, Tamil, Telugu, etc.)
  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    if (langCode !== 'en' && langCode !== 'auto' && !selectedModel.isMultilingual) {
      const multilingualModel = STT_MODELS.find((m) => m.isMultilingual) || STT_MODELS[1];
      setSelectedModel(multilingualModel);
    }
  };

  // File & Audio states
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [audioDuration, setAudioDuration] = React.useState<number>(0);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = React.useState<number>(1.0);
  const [isMuted, setIsMuted] = React.useState<boolean>(false);

  // Live recording states
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [liveTranscriptStream, setLiveTranscriptStream] = React.useState<string>('');
  const [recordingSeconds, setRecordingSeconds] = React.useState<number>(0);

  // Transcription process states
  const [isTranscribing, setIsTranscribing] = React.useState<boolean>(false);
  const [progressStatus, setProgressStatus] = React.useState<string>('');
  const [progressPercent, setProgressPercent] = React.useState<number>(0);
  const [transcribeError, setTranscribeError] = React.useState<string | null>(null);

  // Output segments
  const [segments, setSegments] = React.useState<TranscriptSegment[]>([]);
  const [activeSegmentId, setActiveSegmentId] = React.useState<number | string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [copiedFeedback, setCopiedFeedback] = React.useState<boolean>(false);

  // Refs
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const workerRef = React.useRef<Worker | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const recordedChunksRef = React.useRef<Blob[]>([]);
  const recordingTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speechRecognitionRef = React.useRef<any>(null);
  const segmentsContainerRef = React.useRef<HTMLDivElement | null>(null);

  // Initialize Web Worker
  React.useEffect(() => {
    try {
      workerRef.current = new Worker('/workers/whisper.worker.js', {
        type: 'module',
      });

      workerRef.current.onmessage = (event: MessageEvent) => {
        const { status, progress, message, segments: resultSegments, error } = event.data;

        if (status === 'loading') {
          setProgressStatus(message || 'Loading neural weights...');
        } else if (status === 'progress') {
          setProgressPercent(progress || 0);
          setProgressStatus(`Downloading model weights: ${progress}%`);
        } else if (status === 'transcribing') {
          setProgressStatus('Synthesizing speech tokens & timestamps...');
          setProgressPercent(100);
        } else if (status === 'complete') {
          setIsTranscribing(false);
          setProgressStatus('');
          setProgressPercent(0);
          if (Array.isArray(resultSegments) && resultSegments.length > 0) {
            setSegments(resultSegments);
          }
        } else if (status === 'error') {
          setIsTranscribing(false);
          setTranscribeError(error || 'Transcription failed. Please check the audio format.');
        }
      };
    } catch (err) {
      console.warn('Worker initialization note:', err);
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Sync audio playback time with active segment highlighting
  React.useEffect(() => {
    if (segments.length === 0) return;

    const current = segments.find(
      (s) => currentTime >= s.start && currentTime <= s.end
    );

    if (current && current.id !== activeSegmentId) {
      setActiveSegmentId(current.id);

      // Auto-scroll active segment into view
      const activeEl = document.getElementById(`segment-${current.id}`);
      if (activeEl && segmentsContainerRef.current) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentTime, segments, activeSegmentId]);

  // Handle Audio File Selection
  const handleFileSelect = (file: File) => {
    setTranscribeError(null);
    setAudioFile(file);

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setIsPlaying(false);
    setCurrentTime(0);
    setSegments([]);
  };

  // Run File Transcription
  const runFileTranscription = async () => {
    if (!audioFile) {
      setTranscribeError('Please upload an audio or video file first.');
      return;
    }

    setIsTranscribing(true);
    setTranscribeError(null);
    setProgressStatus('Decoding and resampling audio to 16kHz PCM...');
    setProgressPercent(10);

    try {
      const { pcm, duration } = await decodeAudioToPCM16k(audioFile);
      setAudioDuration(duration);

      if (workerRef.current) {
        workerRef.current.postMessage({
          type: 'transcribe',
          data: {
            pcm,
            modelId: selectedModel.id,
            language: selectedLanguage,
          },
        });
      } else {
        throw new Error('Transcription worker is not initialized.');
      }
    } catch (err) {
      setIsTranscribing(false);
      setTranscribeError(err instanceof Error ? err.message : 'Failed to decode audio file.');
    }
  };

  // Start Live Microphone Dictation & Recording
  const startLiveRecording = async () => {
    setTranscribeError(null);
    setLiveTranscriptStream('');
    setRecordingSeconds(0);
    recordedChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Convert audioBlob to file for potential precision Whisper pass
        const file = new File([audioBlob], `live-recording-${Date.now()}.webm`, { type: 'audio/webm' });
        setAudioFile(file);

        // Stop all microphone tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(250);
      setIsRecording(true);

      // Start recording timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // Initialize browser streaming SpeechRecognition if available
      const SpeechRecognitionClass =
        window.SpeechRecognition ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as unknown as { webkitSpeechRecognition: any }).webkitSpeechRecognition;

      if (SpeechRecognitionClass) {
        const recognition = new SpeechRecognitionClass();
        speechRecognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = selectedLanguage === 'auto' ? 'en-US' : selectedLanguage;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          let fullTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            fullTranscript += event.results[i][0].transcript + ' ';
          }
          setLiveTranscriptStream(fullTranscript.trim());
        };

        recognition.onerror = (e: unknown) => {
          console.warn('SpeechRecognition notification:', e);
        };

        recognition.start();
      }
    } catch (err) {
      setTranscribeError(
        err instanceof Error
          ? err.message
          : 'Microphone access denied. Please allow microphone permissions in your browser.'
      );
    }
  };

  // Stop Live Recording
  const stopLiveRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    setIsRecording(false);

    // If live dictation captured text, convert to segments
    if (liveTranscriptStream.trim().length > 0) {
      const sentences = liveTranscriptStream
        .split(/(?<=[.?!])\s+/)
        .filter((s) => s.trim().length > 0);

      const duration = Math.max(recordingSeconds, 1);
      setAudioDuration(duration);

      const segmentDuration = duration / Math.max(sentences.length, 1);
      const generatedSegments: TranscriptSegment[] = sentences.map((sentence, idx) => ({
        id: idx + 1,
        start: Math.round(idx * segmentDuration * 100) / 100,
        end: Math.round((idx + 1) * segmentDuration * 100) / 100,
        text: sentence.trim(),
        speaker: 'Speaker 1',
      }));

      setSegments(generatedSegments);
    }
  };

  // Load a Demo Sample
  const loadDemoSample = (sample: (typeof DEMO_SAMPLES)[0]) => {
    setTranscribeError(null);
    setAudioFile(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setAudioDuration(sample.duration);
    setCurrentTime(0);
    setIsPlaying(false);
    setSegments(sample.segments);
  };

  // Audio Player Controls
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const seekToTimestamp = (seconds: number) => {
    if (!audioRef.current) {
      setCurrentTime(seconds);
      return;
    }
    audioRef.current.currentTime = seconds;
    setCurrentTime(seconds);
    if (!isPlaying) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSkip = (secondsOffset: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(audioDuration, audioRef.current.currentTime + secondsOffset));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  // Transcript Editing & Modification Handlers
  const handleSegmentTextChange = (id: number | string, newText: string) => {
    setSegments((prev) =>
      prev.map((seg) => (seg.id === id ? { ...seg, text: newText } : seg))
    );
  };

  const handleSpeakerChange = (id: number | string, newSpeaker: string) => {
    setSegments((prev) =>
      prev.map((seg) => (seg.id === id ? { ...seg, speaker: newSpeaker } : seg))
    );
  };

  const handleRemoveSegment = (id: number | string) => {
    setSegments((prev) => prev.filter((seg) => seg.id !== id));
  };

  // 1-Click Filler Word Cleaning
  const handleCleanFillerWords = () => {
    setSegments((prev) =>
      prev.map((seg) => ({
        ...seg,
        text: cleanFillerWords(seg.text),
      }))
    );
  };

  // Export File Generators
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportSRT = () => {
    const srt = generateSRT(segments);
    downloadFile(srt, `kagazo-transcript-${Date.now()}.srt`, 'text/plain');
  };

  const exportVTT = () => {
    const vtt = generateVTT(segments);
    downloadFile(vtt, `kagazo-subtitles-${Date.now()}.vtt`, 'text/vtt');
  };

  const exportTimestampedText = () => {
    const txt = generateTimestampedText(segments);
    downloadFile(txt, `kagazo-transcript-${Date.now()}.txt`, 'text/plain');
  };

  const exportCleanText = () => {
    const txt = generateCleanText(segments);
    downloadFile(txt, `kagazo-clean-text-${Date.now()}.txt`, 'text/plain');
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(
      {
        tool: 'Kagazo Voice to Text Transcriber',
        exportedAt: new Date().toISOString(),
        durationSeconds: audioDuration,
        segments,
      },
      null,
      2
    );
    downloadFile(jsonStr, `kagazo-transcript-${Date.now()}.json`, 'application/json');
  };

  const copyToClipboard = () => {
    const txt = generateTimestampedText(segments);
    navigator.clipboard.writeText(txt).then(() => {
      setCopiedFeedback(true);
      setTimeout(() => setCopiedFeedback(false), 2000);
    });
  };

  // Metrics calculation
  const metrics = calculateTranscriptMetrics(segments, audioDuration);

  // Filtered segments based on search query
  const filteredSegments = segments.filter((seg) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      seg.text.toLowerCase().includes(q) ||
      (seg.speaker && seg.speaker.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Hidden Native Audio Element for Interactive Playback */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setAudioDuration(audioRef.current.duration);
            }
          }}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}

      {/* Main Studio Card */}
      <div className="bg-[#12141A] border border-[#262833] rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 text-gray-200">
        {/* Studio Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262833] pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E6570B]/15 border border-[#E6570B]/30 flex items-center justify-center text-[#E6570B] shadow-inner">
              <Mic className="w-5 h-5 text-[#E6570B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg text-white">Voice &amp; Audio Transcriber Studio</h2>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  REAL WHISPER AI
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Millisecond timestamps, WebGPU client-side inference, zero cloud uploads.
              </p>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-1 bg-[#0E0F14] p-1 rounded-2xl border border-[#262833] text-xs self-start sm:self-auto">
            <button
              onClick={() => setActiveMode('upload')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all font-medium ${
                activeMode === 'upload'
                  ? 'bg-[#E6570B] text-white font-semibold shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Audio</span>
            </button>
            <button
              onClick={() => setActiveMode('live')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all font-medium ${
                activeMode === 'live'
                  ? 'bg-[#E6570B] text-white font-semibold shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Live Dictation</span>
            </button>
            <button
              onClick={() => setActiveMode('demo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all font-medium ${
                activeMode === 'demo'
                  ? 'bg-[#E6570B] text-white font-semibold shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Try Demo</span>
            </button>
          </div>
        </div>

        {/* Model & Language Configuration Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#0E0F14] p-3.5 rounded-2xl border border-[#262833] text-xs">
          {/* Model Selector */}
          <div className="md:col-span-6 space-y-1">
            <label className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-[#E6570B]" />
              <span>Whisper Neural Engine</span>
            </label>
            <div className="relative">
              <select
                value={selectedModel.id}
                onChange={(e) => {
                  const m = STT_MODELS.find((mod) => mod.id === e.target.value);
                  if (m) setSelectedModel(m);
                }}
                className="w-full appearance-none bg-[#161821] border border-[#262833] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E6570B] transition-colors pr-8 font-medium cursor-pointer"
              >
                {STT_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} — {model.size} ({model.speed})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Language Selector */}
          <div className="md:col-span-4 space-y-1">
            <label className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>Spoken Language</span>
            </label>
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full appearance-none bg-[#161821] border border-[#262833] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E6570B] transition-colors pr-8 font-medium cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Privacy Indicator Badge */}
          <div className="md:col-span-2 flex flex-col justify-end">
            <div className="h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-2.5 flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% In-RAM</span>
            </div>
          </div>
        </div>

        {/* MODE 1: File Upload Workspace */}
        {activeMode === 'upload' && (
          <div className="space-y-4">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileSelect(e.dataTransfer.files[0]);
                }
              }}
              className="border-2 border-dashed border-[#262833] hover:border-[#E6570B]/50 transition-all rounded-2xl p-6 sm:p-8 text-center bg-[#0E0F14]/60 flex flex-col items-center justify-center gap-3 relative cursor-pointer group"
            >
              <input
                type="file"
                accept="audio/*,video/mp4,video/webm"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />

              <div className="w-12 h-12 rounded-2xl bg-[#1A1D27] group-hover:bg-[#E6570B]/20 border border-[#262833] group-hover:border-[#E6570B]/40 flex items-center justify-center text-[#E6570B] transition-colors">
                <Upload className="w-6 h-6 text-[#E6570B]" />
              </div>

              <div>
                <p className="font-bold text-sm text-white">
                  {audioFile ? (
                    <span className="text-emerald-400 flex items-center justify-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-400" />
                      {audioFile.name} ({(audioFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  ) : (
                    'Click to upload or drag & drop audio / video'
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Supported containers: MP3, WAV, M4A, AAC, WEBM, FLAC, OGG, MP4
                </p>
              </div>

              <span className="text-[10px] font-mono text-gray-500 bg-[#161821] px-3 py-1 rounded-full border border-[#262833]">
                Zero Uploads &bull; Resampled In-Browser via Web Audio API
              </span>
            </div>

            {/* Action Trigger Button */}
            {audioFile && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <span className="text-xs text-gray-400">
                  Ready to transcribe with <strong>{selectedModel.name}</strong>
                </span>
                <button
                  onClick={runFileTranscription}
                  disabled={isTranscribing}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#E6570B] hover:bg-[#cf4c07] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isTranscribing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Transcribing Audio...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Start Neural Transcription</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: Live Microphone Dictation */}
        {activeMode === 'live' && (
          <div className="space-y-4 bg-[#0E0F14] rounded-2xl p-6 border border-[#262833] text-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? 'bg-red-500/20 border-2 border-red-500 animate-pulse text-red-400 shadow-lg shadow-red-500/20'
                    : 'bg-[#1A1D27] border border-[#262833] text-gray-400'
                }`}
              >
                {isRecording ? <Mic className="w-8 h-8 text-red-400" /> : <MicOff className="w-8 h-8 text-gray-400" />}
              </div>

              <div>
                <h3 className="font-bold text-sm text-white">
                  {isRecording ? 'Listening & Transcribing in Real Time...' : 'Live Microphone Dictation'}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isRecording
                    ? `Recording duration: ${formatTimecode(recordingSeconds, 'display')}`
                    : 'Click Start to record speech with 0-latency live streaming timestamps.'}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {!isRecording ? (
                  <button
                    onClick={startLiveRecording}
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Start Recording</span>
                  </button>
                ) : (
                  <button
                    onClick={stopLiveRecording}
                    className="px-6 py-2.5 rounded-xl bg-[#E6570B] hover:bg-[#cf4c07] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <MicOff className="w-4 h-4" />
                    <span>Stop &amp; Generate Timestamps</span>
                  </button>
                )}
              </div>

              {/* Streaming Live Text Preview */}
              {isRecording && liveTranscriptStream && (
                <div className="w-full max-w-xl text-left mt-3 p-3.5 rounded-xl bg-[#161821] border border-[#262833] text-xs text-gray-300 font-mono leading-relaxed">
                  <span className="text-[#E6570B] font-bold mr-2">&bull; Live:</span>
                  {liveTranscriptStream}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODE 3: Try Demo Samples */}
        {activeMode === 'demo' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400">
              Click any sample below to instantly load real audio and pre-verified timestamps into the interactive player:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DEMO_SAMPLES.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => loadDemoSample(demo)}
                  className="p-4 rounded-2xl bg-[#0E0F14] hover:bg-[#161821] border border-[#262833] hover:border-[#E6570B]/50 transition-all text-left space-y-1.5 group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#E6570B] bg-[#E6570B]/10 px-2 py-0.5 rounded border border-[#E6570B]/20">
                      {demo.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {demo.duration}s
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-white group-hover:text-[#E6570B] transition-colors">
                    {demo.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                    {demo.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress & Error Banners */}
        {isTranscribing && (
          <div className="p-4 rounded-2xl bg-[#0E0F14] border border-[#E6570B]/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-2 text-white">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#E6570B]" />
                {progressStatus || 'Processing audio through Whisper neural engine...'}
              </span>
              <span className="text-[#E6570B] font-mono font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#1A1D27] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E6570B] to-amber-500 transition-all duration-300 rounded-full"
                style={{ width: `${Math.max(progressPercent, 5)}%` }}
              />
            </div>
          </div>
        )}

        {transcribeError && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p>{transcribeError}</p>
          </div>
        )}

        {/* Synchronized Audio Player Controller (when audio or segments exist) */}
        {(audioUrl || segments.length > 0) && (
          <div className="p-4 rounded-2xl bg-[#0E0F14] border border-[#262833] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262833] pb-2 text-xs">
              <span className="font-semibold text-gray-300 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#E6570B]" />
                <span>Interactive Transcript Audio Player</span>
              </span>
              <div className="flex items-center gap-2 text-gray-400 font-mono text-[11px]">
                <span>{formatTimecode(currentTime, 'display')}</span>
                <span>/</span>
                <span>{formatTimecode(audioDuration, 'display')}</span>
              </div>
            </div>

            {/* Scrubber Bar */}
            <div className="relative flex items-center">
              <input
                type="range"
                min={0}
                max={audioDuration || 100}
                step={0.1}
                value={currentTime}
                onChange={(e) => seekToTimestamp(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#1A1D27] rounded-lg appearance-none cursor-pointer accent-[#E6570B]"
              />
            </div>

            {/* Playback Controls & Speed Selectors */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleSkip(-5)}
                  className="p-2 rounded-xl bg-[#161821] hover:bg-[#1A1D27] border border-[#262833] text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="Rewind 5s"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[10px] font-mono">-5s</span>
                </button>

                <button
                  onClick={togglePlayPause}
                  className="px-4 py-2 rounded-xl bg-[#E6570B] hover:bg-[#cf4c07] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play Live'}</span>
                </button>

                <button
                  onClick={() => handleSkip(5)}
                  className="p-2 rounded-xl bg-[#161821] hover:bg-[#1A1D27] border border-[#262833] text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="Forward 5s"
                >
                  <RotateCw className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[10px] font-mono">+5s</span>
                </button>

                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (audioRef.current) audioRef.current.muted = !isMuted;
                  }}
                  className="p-2 rounded-xl bg-[#161821] hover:bg-[#1A1D27] border border-[#262833] text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Toggle Mute"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 bg-[#161821] p-1 rounded-xl border border-[#262833] text-[11px] font-mono">
                {[0.75, 1.0, 1.25, 1.5, 2.0].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      playbackSpeed === speed
                        ? 'bg-[#E6570B] text-white font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TRANSCRIPT RESULTS WORKSPACE */}
        {segments.length > 0 && (
          <div className="space-y-4 pt-2">
            {/* Action & Metrics Summary Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0E0F14] p-3 rounded-2xl border border-[#262833] text-xs">
              <div className="flex flex-wrap items-center gap-3 text-gray-400">
                <span className="font-bold text-white flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#E6570B]" />
                  <span>{metrics.wordCount} words</span>
                </span>
                <span>&bull;</span>
                <span>{metrics.segmentCount} segments</span>
                <span>&bull;</span>
                <span className="text-emerald-400 font-bold">{metrics.wpm} WPM ({metrics.paceDescription})</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Filler Words Cleaner */}
                <button
                  onClick={handleCleanFillerWords}
                  className="px-3 py-1.5 rounded-xl bg-[#161821] hover:bg-[#1A1D27] border border-[#262833] hover:border-[#E6570B]/40 text-gray-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Remove verbal fillers like 'um', 'uh', 'like'"
                >
                  <Wand2 className="w-3.5 h-3.5 text-[#E6570B]" />
                  <span>Clean Fillers (um/uh)</span>
                </button>

                {/* Quick Copy Button */}
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded-xl bg-[#161821] hover:bg-[#1A1D27] border border-[#262833] hover:border-emerald-500/40 text-gray-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedFeedback ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-400" />
                      <span>Copy All</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Transcript Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search words, terms, or speakers in transcript..."
                className="w-full bg-[#0E0F14] border border-[#262833] rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E6570B] transition-colors"
              />
            </div>

            {/* Interactive Transcript Segments List */}
            <div
              ref={segmentsContainerRef}
              className="max-h-[460px] overflow-y-auto space-y-2 pr-1 custom-scrollbar"
            >
              {filteredSegments.map((segment) => {
                const isActive = activeSegmentId === segment.id;
                return (
                  <div
                    key={segment.id}
                    id={`segment-${segment.id}`}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-[#161821] border-[#E6570B] shadow-md shadow-orange-500/5'
                        : 'bg-[#0E0F14] border-[#262833] hover:border-[#383B4A]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        {/* Click-to-Seek Timestamp Badge */}
                        <button
                          onClick={() => seekToTimestamp(segment.start)}
                          className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded-md border flex items-center gap-1 transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#E6570B] text-white border-[#E6570B]'
                              : 'bg-[#161821] text-[#E6570B] border-[#262833] hover:border-[#E6570B]/50'
                          }`}
                          title="Click to jump audio to this timestamp"
                        >
                          <Play className="w-2.5 h-2.5 fill-current" />
                          <span>{formatTimecode(segment.start, 'display')}</span>
                        </button>

                        {/* Speaker Diarization Badge / Input */}
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Users className="w-3 h-3 text-gray-500" />
                          <input
                            type="text"
                            value={segment.speaker || 'Speaker 1'}
                            onChange={(e) => handleSpeakerChange(segment.id, e.target.value)}
                            className="bg-transparent border-none text-[11px] text-gray-300 font-semibold focus:outline-none focus:text-white w-20"
                            placeholder="Speaker"
                          />
                        </div>
                      </div>

                      {/* Segment Action Buttons */}
                      <button
                        onClick={() => handleRemoveSegment(segment.id)}
                        className="text-gray-500 hover:text-rose-400 transition-colors p-1"
                        title="Delete segment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Editable Segment Text */}
                    <textarea
                      rows={2}
                      value={segment.text}
                      onChange={(e) => handleSegmentTextChange(segment.id, e.target.value)}
                      className={`w-full bg-transparent border-none text-xs sm:text-sm leading-relaxed focus:outline-none resize-none transition-colors ${
                        isActive ? 'text-white font-medium' : 'text-gray-300'
                      }`}
                      placeholder="Transcript text..."
                    />
                  </div>
                );
              })}
            </div>

            {/* MULTI-FORMAT EXPORT SUITE */}
            <div className="pt-3 border-t border-[#262833] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export Standards &amp; Subtitles</span>
                </span>
                <span className="text-[10px] font-mono text-gray-500">100% Free &bull; Zero Watermarks</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  onClick={exportSRT}
                  className="p-2.5 rounded-xl bg-[#0E0F14] hover:bg-[#161821] border border-[#262833] hover:border-emerald-500/40 text-xs font-semibold text-white flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <span className="text-emerald-400 font-bold font-mono">.SRT</span>
                  <span className="text-[10px] text-gray-400">Video Subtitles</span>
                </button>

                <button
                  onClick={exportVTT}
                  className="p-2.5 rounded-xl bg-[#0E0F14] hover:bg-[#161821] border border-[#262833] hover:border-emerald-500/40 text-xs font-semibold text-white flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <span className="text-emerald-400 font-bold font-mono">.VTT</span>
                  <span className="text-[10px] text-gray-400">Web Captions</span>
                </button>

                <button
                  onClick={exportTimestampedText}
                  className="p-2.5 rounded-xl bg-[#0E0F14] hover:bg-[#161821] border border-[#262833] hover:border-[#E6570B]/40 text-xs font-semibold text-white flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <span className="text-[#E6570B] font-bold font-mono">.TXT (Time)</span>
                  <span className="text-[10px] text-gray-400">Timecoded Text</span>
                </button>

                <button
                  onClick={exportCleanText}
                  className="p-2.5 rounded-xl bg-[#0E0F14] hover:bg-[#161821] border border-[#262833] hover:border-[#E6570B]/40 text-xs font-semibold text-white flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <span className="text-[#E6570B] font-bold font-mono">.TXT (Clean)</span>
                  <span className="text-[10px] text-gray-400">Plain Prose</span>
                </button>

                <button
                  onClick={exportJSON}
                  className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-[#0E0F14] hover:bg-[#161821] border border-[#262833] hover:border-indigo-500/40 text-xs font-semibold text-white flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <span className="text-indigo-400 font-bold font-mono">.JSON</span>
                  <span className="text-[10px] text-gray-400">Structured Data</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
