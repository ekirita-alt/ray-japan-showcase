import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCw, 
  Layers, 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Camera, 
  Cpu, 
  Compass, 
  CheckCircle2, 
  AlertTriangle,
  ZoomIn,
  Share2,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { SolutionItem } from '../data/solutionsData';

interface InteractiveVisualizerProps {
  item: SolutionItem;
  categoryId: string;
}

export const InteractiveVisualizer: React.FC<InteractiveVisualizerProps> = ({ item, categoryId }) => {
  // Common states
  const [sliderVal, setSliderVal] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<string>('default');
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [captureProgress, setCaptureProgress] = useState<number>(100);
  const [implantAngle, setImplantAngle] = useState<number>(4);
  const [implantDepth, setImplantDepth] = useState<number>(10);
  const [layerOpacity, setLayerOpacity] = useState({ face: 75, bone: 60, teeth: 90 });
  const [selectedPlane, setSelectedPlane] = useState<'all' | 'camper' | 'frankfort' | 'bipupillary' | 'occlusal'>('all');
  const [monthlyCrowns, setMonthlyCrowns] = useState<number>(25);
  const [onedayStep, setOnedayStep] = useState<number>(0);

  // Trigger capture animation for One-shot
  const handleTriggerCapture = () => {
    setIsCapturing(true);
    setCaptureProgress(0);
    const interval = setInterval(() => {
      setCaptureProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCapturing(false);
          return 100;
        }
        return prev + 25;
      });
    }, 125); // 0.5s total (4 ticks)
  };

  // 1. RAYFace One-shot Capture
  if (item.interactiveType === 'rayface-oneshot') {
    return (
      <div className="relative w-full h-full min-h-[380px] bg-gradient-to-b from-[#0e172a] to-[#070c18] rounded-xl border border-slate-700/60 p-6 flex flex-col justify-between overflow-hidden">
        {/* Top HUD */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">6× 3D CMOS STROBE SENSORS</span>
          </div>
          <div className="text-xs text-slate-300 font-mono">SHUTTER: 0.5 SEC (ONE-SHOT)</div>
        </div>

        {/* Central Viewport */}
        <div className="relative flex-1 flex items-center justify-center my-4">
          {/* Facial targeting reticle */}
          <div className="relative w-64 h-64 border border-cyan-500/30 rounded-full flex items-center justify-center">
            {/* Rotating radar ring */}
            <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin [animation-duration:6s]" />
            <div className="absolute inset-3 border border-slate-600/40 rounded-full" />
            
            {/* Face wireframe mesh outline */}
            <svg viewBox="0 0 100 100" className="w-48 h-48 text-cyan-400 drop-shadow-[0_0_12px_rgba(0,168,255,0.6)]">
              {/* Head contour */}
              <ellipse cx="50" cy="50" rx="34" ry="42" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              {/* Eye line */}
              <line x1="28" y1="42" x2="72" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              {/* Nose line */}
              <path d="M50,38 L50,56 L46,60 L54,60" fill="none" stroke="currentColor" strokeWidth="1.2" />
              {/* Lip contour */}
              <path d="M38,70 Q50,65 62,70 Q50,78 38,70 Z" fill="rgba(0,168,255,0.2)" stroke="currentColor" strokeWidth="1" />
              {/* Mesh grid points */}
              <circle cx="36" cy="42" r="2" fill="#00a8ff" />
              <circle cx="64" cy="42" r="2" fill="#00a8ff" />
              <circle cx="50" cy="58" r="2" fill="#00a8ff" />
              <circle cx="50" cy="72" r="2" fill="#00a8ff" />
              <circle cx="50" cy="84" r="2" fill="#00a8ff" />
            </svg>

            {/* Flash Effect on capture */}
            {isCapturing && (
              <div className="absolute inset-0 bg-white/90 rounded-full animate-ping pointer-events-none" />
            )}

            {/* Scanning Laser Beam */}
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#00a8ff] animate-pulse top-1/2 -translate-y-1/2" />
          </div>

          {/* Real-time coordinates */}
          <div className="absolute bottom-2 left-4 text-[11px] font-mono text-slate-400 space-y-1 bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/50">
            <div>3D MESH POINTS: <span className="text-cyan-400">1,248,000 pts</span></div>
            <div>ALIGNMENT ERROR: <span className="text-emerald-400">&lt; 0.08 mm</span></div>
            <div>STATUS: <span className="text-white">{isCapturing ? '高速同期撮影中...' : 'スタンバイ完了'}</span></div>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-800">
          <div className="text-xs text-slate-300">
            わずか0.5秒のワンショット撮影。体動ブレ・瞬きのない高精度3D顔貌モデルを即座に生成。
          </div>
          <button
            onClick={handleTriggerCapture}
            disabled={isCapturing}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-lg shadow-cyan-500/20 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            {isCapturing ? `撮影中 ${captureProgress}%` : '0.5秒 撮影シミュレート'}
          </button>
        </div>
      </div>
    );
  }

  // 2. Autoマッチング (Auto Matching)
  if (item.interactiveType === 'rayface-automatch') {
    return (
      <div className="w-full h-full min-h-[380px] bg-gradient-to-b from-[#0e172a] to-[#070c18] rounded-xl border border-slate-700/60 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
            <Layers className="w-4 h-4" />
            <span>AI 仮想患者 (Virtual Patient) レイヤー深度ブレンダー</span>
          </div>
          <div className="text-xs bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 px-2.5 py-1 rounded">
            自動整合マッチング精度: 99.4%
          </div>
        </div>

        {/* Interactive Multi-layer Display */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden rounded-lg bg-slate-950/80 border border-slate-800">
          {/* Base Head graphic */}
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Face Layer */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: layerOpacity.face / 100 }}
            >
              <svg viewBox="0 0 120 120" className="w-full h-full text-cyan-500/80">
                <ellipse cx="60" cy="55" rx="42" ry="50" fill="rgba(0,168,255,0.12)" stroke="#00a8ff" strokeWidth="1.5" />
                <path d="M40,50 Q60,45 80,50" stroke="#00a8ff" strokeWidth="1" fill="none" />
                <path d="M60,45 L60,68 L54,72 L66,72" stroke="#00a8ff" strokeWidth="1.5" fill="none" />
                <path d="M46,84 Q60,78 74,84 Q60,94 46,84 Z" fill="rgba(0,168,255,0.3)" stroke="#00a8ff" strokeWidth="1" />
              </svg>
            </div>

            {/* Bone CBCT Layer */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none"
              style={{ opacity: layerOpacity.bone / 100 }}
            >
              <svg viewBox="0 0 120 120" className="w-full h-full text-indigo-400">
                <ellipse cx="60" cy="52" rx="34" ry="40" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 2" />
                <path d="M42,75 Q60,82 78,75 L80,90 Q60,100 40,90 Z" fill="rgba(129,140,248,0.2)" stroke="#818cf8" strokeWidth="1.5" />
              </svg>
            </div>

            {/* IOS Teeth Scan Layer */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none"
              style={{ opacity: layerOpacity.teeth / 100 }}
            >
              <svg viewBox="0 0 120 120" className="w-full h-full text-emerald-400">
                <g transform="translate(46, 80) scale(0.24)">
                  {/* U-shaped arch of teeth */}
                  <path d="M5,40 C5,10 95,10 95,40" fill="none" stroke="#34d399" strokeWidth="6" strokeLinecap="round" />
                  <rect x="38" y="10" width="10" height="15" rx="2" fill="#fff" stroke="#34d399" strokeWidth="1.5" />
                  <rect x="52" y="10" width="10" height="15" rx="2" fill="#fff" stroke="#34d399" strokeWidth="1.5" />
                  <rect x="25" y="14" width="9" height="14" rx="2" fill="#fff" stroke="#34d399" strokeWidth="1.5" />
                  <rect x="66" y="14" width="9" height="14" rx="2" fill="#fff" stroke="#34d399" strokeWidth="1.5" />
                </g>
              </svg>
            </div>

            {/* AI Landmark Points */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 border-2 border-emerald-400 rounded-full animate-ping" />
            <div className="absolute top-1/2 right-1/3 w-3 h-3 border-2 border-cyan-400 rounded-full animate-ping [animation-delay:0.3s]" />
          </div>
        </div>

        {/* Slider Controls for 3 Layers */}
        <div className="grid grid-cols-3 gap-4 bg-slate-900/90 p-3 rounded-lg border border-slate-800">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span className="text-cyan-400 font-medium">① 3D顔貌 (Face)</span>
              <span>{layerOpacity.face}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={layerOpacity.face}
              onChange={(e) => setLayerOpacity(prev => ({ ...prev, face: Number(e.target.value) }))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span className="text-indigo-400 font-medium">② CT骨格 (Bone)</span>
              <span>{layerOpacity.bone}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={layerOpacity.bone}
              onChange={(e) => setLayerOpacity(prev => ({ ...prev, bone: Number(e.target.value) }))}
              className="w-full accent-indigo-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span className="text-emerald-400 font-medium">③ IOS歯列 (Teeth)</span>
              <span>{layerOpacity.teeth}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={layerOpacity.teeth}
              onChange={(e) => setLayerOpacity(prev => ({ ...prev, teeth: Number(e.target.value) }))}
              className="w-full accent-emerald-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  // 3. 各種平面情報 (Planes)
  if (item.interactiveType === 'rayface-planes') {
    return (
      <div className="w-full h-full min-h-[380px] bg-gradient-to-b from-[#0e172a] to-[#070c18] rounded-xl border border-slate-700/60 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
            <Compass className="w-4 h-4" />
            <span>生体基準平面 3Dワンクリック抽出アナライザー</span>
          </div>
          <div className="flex items-center gap-1.5">
            {(['all', 'frankfort', 'camper', 'occlusal'] as const).map(plane => (
              <button
                key={plane}
                onClick={() => setSelectedPlane(plane)}
                className={`text-xs px-2.5 py-1 rounded transition-colors ${
                  selectedPlane === plane 
                    ? 'bg-cyan-500 text-slate-950 font-bold' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {plane === 'all' ? '全平面表示' : plane === 'frankfort' ? 'フランクフルト平面' : plane === 'camper' ? 'カンペル平面' : '咬合平面'}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Profile Head with Anatomical Planes */}
        <div className="relative flex-1 flex items-center justify-center my-3 bg-slate-950/60 rounded-lg border border-slate-800 p-4">
          <div className="relative w-80 h-64 flex items-center justify-center">
            {/* Profile silhouette */}
            <svg viewBox="0 0 200 160" className="w-full h-full text-slate-600">
              {/* Profile facial contour */}
              <path 
                d="M 60,20 C 85,20 115,25 125,45 C 130,55 125,65 130,72 L 140,78 L 132,84 C 134,92 136,98 132,104 L 135,116 C 130,128 115,135 100,138 L 75,140 C 65,140 60,110 55,90 Z" 
                fill="rgba(15, 23, 42, 0.8)" 
                stroke="#475569" 
                strokeWidth="2" 
              />
              {/* Ear tragus */}
              <ellipse cx="75" cy="78" rx="6" ry="10" fill="#33415c" />
              {/* Eye orbit */}
              <ellipse cx="118" cy="62" rx="4" ry="4" fill="#00a8ff" />

              {/* Frankfort Plane (Porion - Orbitale: Cyan horizontal line) */}
              {(selectedPlane === 'all' || selectedPlane === 'frankfort') && (
                <g>
                  <line x1="20" y1="62" x2="180" y2="62" stroke="#00a8ff" strokeWidth="2.5" strokeDasharray="5 3" />
                  <text x="135" y="58" fill="#00a8ff" fontSize="7" fontWeight="bold">Frankfort (0.0°)</text>
                </g>
              )}

              {/* Camper's Plane (Tragus - Ala: Amber inclined line) */}
              {(selectedPlane === 'all' || selectedPlane === 'camper') && (
                <g>
                  <line x1="25" y1="68" x2="180" y2="92" stroke="#f59e0b" strokeWidth="2.5" />
                  <text x="135" y="100" fill="#f59e0b" fontSize="7" fontWeight="bold">Camper (8.4°)</text>
                </g>
              )}

              {/* Occlusal Plane (Emerald line) */}
              {(selectedPlane === 'all' || selectedPlane === 'occlusal') && (
                <g>
                  <line x1="30" y1="80" x2="180" y2="102" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 3" />
                  <text x="135" y="112" fill="#10b981" fontSize="7" fontWeight="bold">Occlusal (7.8°)</text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Anatomical Planes Angle Metrics */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-900/90 p-2.5 rounded border border-cyan-500/30">
            <div className="text-[11px] text-cyan-400 font-medium">フランクフルト平面</div>
            <div className="text-lg font-bold text-white font-mono">0.0° <span className="text-xs text-slate-400">(基準線)</span></div>
          </div>
          <div className="bg-slate-900/90 p-2.5 rounded border border-amber-500/30">
            <div className="text-[11px] text-amber-400 font-medium">カンペル平面 傾斜角</div>
            <div className="text-lg font-bold text-white font-mono">8.4° <span className="text-xs text-emerald-400">(正常域)</span></div>
          </div>
          <div className="bg-slate-900/90 p-2.5 rounded border border-emerald-500/30">
            <div className="text-[11px] text-emerald-400 font-medium">咬合平面 対称性</div>
            <div className="text-lg font-bold text-white font-mono">99.2% <span className="text-xs text-emerald-400">(理想平行)</span></div>
          </div>
        </div>
      </div>
    );
  }

  // 4. DSD (Digital Smile Design)
  if (item.interactiveType === 'rayface-dsd') {
    return (
      <div className="w-full h-full min-h-[380px] bg-gradient-to-b from-[#0e172a] to-[#070c18] rounded-xl border border-slate-700/60 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>DSD デジタルスマイルデザイン Before / After 比較シミュレーター</span>
          </div>
          <div className="text-xs text-slate-300">
            スライダーを左右にドラッグして術前・術後を比較
          </div>
        </div>

        {/* Split Comparison Canvas */}
        <div className="relative flex-1 my-3 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center select-none">
          {/* Background Mouth Simulation */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Lips Frame */}
            <svg viewBox="0 0 300 150" className="w-full h-full max-w-md">
              {/* Lips contour */}
              <path 
                d="M 40,75 Q 150,20 260,75 Q 150,55 40,75 Z" 
                fill="#be185d" 
                opacity="0.85" 
              />
              <path 
                d="M 40,75 Q 150,135 260,75 Q 150,95 40,75 Z" 
                fill="#9d174d" 
                opacity="0.9" 
              />
              
              {/* Original Teeth (Left - Before) */}
              <g id="before-teeth" opacity={1}>
                {/* Asymmetric, slightly discolored teeth */}
                <rect x="122" y="55" width="24" height="34" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                <rect x="150" y="54" width="22" height="32" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" transform="rotate(-3 160 70)" />
                <rect x="100" y="58" width="18" height="28" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                <rect x="174" y="58" width="18" height="27" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              </g>

              {/* DSD Ideal Teeth (Right - After, clipped by slider) */}
              <clipPath id="dsd-clip">
                <rect x={150 * (sliderVal / 50)} y="0" width="300" height="150" />
              </clipPath>

              <g clipPath="url(#dsd-clip)">
                {/* Radiant white, Golden proportion symmetrical crowns */}
                <rect x="122" y="54" width="26" height="38" rx="3" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="152" y="54" width="26" height="38" rx="3" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="96" y="57" width="22" height="33" rx="3" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="182" y="57" width="22" height="33" rx="3" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.5" />
                {/* Golden ratio overlay lines */}
                <path d="M 96,92 Q 150,98 204,92" fill="none" stroke="#00a8ff" strokeWidth="2" strokeDasharray="3 2" />
              </g>
            </svg>

            {/* Split Divider Line */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_10px_#00a8ff] z-20 pointer-events-none"
              style={{ left: `${sliderVal}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-xs shadow-lg">
                ◀▶
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-3 left-4 text-xs font-semibold px-2 py-1 bg-amber-950/70 border border-amber-600/40 text-amber-300 rounded">
              BEFORE (術前)
            </div>
            <div className="absolute top-3 right-4 text-xs font-semibold px-2 py-1 bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 rounded">
              AFTER (DSDシミュレーション)
            </div>
          </div>
        </div>

        {/* Drag Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-300 font-medium">
            <span>Before (術前状態)</span>
            <span className="text-cyan-400">黄金比 1:1.618 スマイルデザイン適用中</span>
            <span>After (完成予想)</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderVal} 
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // 5. 5D インプラント (Implant Guided Surgery)
  if (item.interactiveType === '5d-implant') {
    const isSafe = implantDepth <= 12 && Math.abs(implantAngle) <= 12;
    return (
      <div className="w-full h-full min-h-[380px] bg-gradient-to-b from-[#0e172a] to-[#070c18] rounded-xl border border-slate-700/60 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>3D ガイデッド・インプラント埋入シミュレーション</span>
          </div>
          <div className={`text-xs px-2.5 py-1 rounded border flex items-center gap-1.5 font-bold ${
            isSafe 
              ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300' 
              : 'bg-rose-950/70 border-rose-500/50 text-rose-300'
          }`}>
            {isSafe ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            {isSafe ? '安全マージン確保 (良好)' : '警告: 神経管近接 (<1.5mm)'}
          </div>
        </div>

        {/* Bone & Implant Cross Section */}
        <div className="relative flex-1 my-3 bg-slate-950/80 rounded-lg border border-slate-800 flex items-center justify-center p-4">
          <svg viewBox="0 0 240 180" className="w-full h-full max-w-sm">
            {/* Alveolar Bone Cross Section */}
            <path 
              d="M 50,170 C 40,80 70,30 120,30 C 170,30 200,80 190,170 Z" 
              fill="rgba(30, 41, 59, 0.7)" 
              stroke="#64748b" 
              strokeWidth="2" 
            />
            {/* Cortical bone rim */}
            <path 
              d="M 54,168 C 46,82 73,36 120,36 C 167,36 194,82 186,168" 
              fill="none" 
              stroke="#94a3b8" 
              strokeWidth="3" 
            />

            {/* Inferior Alveolar Nerve Canal (Mandibular canal) */}
            <circle cx="120" cy="148" r="9" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" strokeWidth="2" />
            <text x="134" y="152" fill="#ef4444" fontSize="8" fontWeight="bold">下顎神経管 (IAN)</text>

            {/* Safety Margin Radius */}
            <circle cx="120" cy="148" r="18" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />

            {/* Implant Body */}
            <g transform={`translate(120, ${30 + implantDepth * 4}) rotate(${implantAngle} 0 0)`}>
              {/* Fixture */}
              <rect x="-8" y="0" width="16" height="42" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
              {/* Thread ridges */}
              <line x1="-8" y1="10" x2="8" y2="10" stroke="#0369a1" strokeWidth="1" />
              <line x1="-8" y1="18" x2="8" y2="18" stroke="#0369a1" strokeWidth="1" />
              <line x1="-8" y1="26" x2="8" y2="26" stroke="#0369a1" strokeWidth="1" />
              <line x1="-8" y1="34" x2="8" y2="34" stroke="#0369a1" strokeWidth="1" />
              {/* Abutment top */}
              <polygon points="-6,0 6,0 4,-12 -4,-12" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
            </g>
          </svg>

          {/* Real-time telemetry */}
          <div className="absolute top-3 left-4 text-xs font-mono space-y-1 bg-slate-900/90 p-2 rounded border border-slate-700">
            <div>埋入深度: <span className="text-cyan-400">{implantDepth} mm</span></div>
            <div>埋入角度: <span className="text-cyan-400">{implantAngle}°</span></div>
            <div>骨密度 (HU): <span className="text-emerald-400">850 HU (Type II 良好)</span></div>
          </div>
        </div>

        {/* Sliders for Angle and Depth */}
        <div className="grid grid-cols-2 gap-4 bg-slate-900/90 p-3 rounded-lg border border-slate-800">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>埋入角度 (チルト): {implantAngle}°</span>
              <span className="text-slate-400">許容 ±15°</span>
            </div>
            <input 
              type="range" 
              min="-20" 
              max="20" 
              value={implantAngle}
              onChange={(e) => setImplantAngle(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>埋入深度: {implantDepth} mm</span>
              <span className={isSafe ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                マージン: {(18 - implantDepth * 1.1).toFixed(1)} mm
              </span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="16" 
              value={implantDepth}
              onChange={(e) => setImplantDepth(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  // 5D Concept Explorer
  if (item.interactiveType === '5d-concept') {
    const dimensions = [
      { id: 'ct', num: '3D', name: '従来のCT (3D)', desc: '従来のCBCTによる3D骨格・歯根・顎骨データ（DICOM形式）。', color: 'border-amber-500/80 bg-amber-500/10 text-amber-300' },
      { id: 'ai', num: '+要素①', name: 'AI Segmentation', desc: 'DICOM形式から解剖学的構造（歯根、下顎管、上顎洞、気道など）を高精度に自動分割し、STLデータへ瞬時に変換。', color: 'border-emerald-500/80 bg-emerald-500/10 text-emerald-300' },
      { id: 'face', num: '+要素②', name: 'RAYFace 顔貌データ', desc: 'ワンショット0.5秒の3Dフェイススキャン。口唇ライン、笑顔の審美基準、軟組織データを取得。', color: 'border-cyan-500/80 bg-cyan-500/10 text-cyan-300' },
      { id: 'fusion', num: '= 5D', name: '3D ＋ 2つの要素 (5D)', desc: '従来のCT(3D)に「AI機能」と「RAYFace顔貌データ」が融合。解剖学的構造と外観の調和を1画面で診断できる真のバーチャルペイシェントが完成。', color: 'border-purple-500/80 bg-purple-500/10 text-purple-300' }
    ];

    const currentDim = dimensions.find(d => d.id === activeTab) || dimensions[0];

    return (
      <div className="w-full h-full min-h-[380px] bg-gradient-to-b from-[#0e172a] to-[#070c18] rounded-xl border border-slate-700/60 p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
            <Layers className="w-4 h-4" />
            <span>RAY 5D Concept 構成要素シミュレーター（3D ＋ 2つの要素）</span>
          </div>
          <div className="text-xs bg-cyan-950/70 border border-cyan-800 text-cyan-300 px-3 py-1 rounded font-bold">
            3D ＋ AI ＋ 顔貌データ
          </div>
        </div>

        {/* 4-Block Concept Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
          {dimensions.map((dim, idx) => (
            <button
              key={dim.id}
              onClick={() => setActiveTab(dim.id)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                activeTab === dim.id || (activeTab === 'default' && idx === 0)
                  ? `${dim.color} ring-1 ring-white/30 shadow-lg`
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="text-xs font-mono font-bold opacity-80">{dim.num}</div>
              <div className="text-xs font-bold truncate mt-0.5">{dim.name}</div>
            </button>
          ))}
        </div>

        {/* Interactive Viewer Card */}
        <div className="flex-1 bg-slate-900/80 rounded-lg border border-slate-800 p-4 flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              {currentDim.num} DIMENSION
            </span>
            <h4 className="text-lg font-bold text-white mt-1 mb-2">
              {currentDim.name}
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {currentDim.desc}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> AI自動マッチング対応
              </span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> ワンクリック統合
              </span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> 全科共通プラットフォーム
              </span>
            </div>
          </div>
          <div className="absolute right-3 bottom-2 text-8xl font-black text-slate-800/30 select-none pointer-events-none">
            5D
          </div>
        </div>
      </div>
    );
  }

  // 6. CAD/CAM 1Day Treatment Workflow
  if (item.interactiveType === 'cadcam-oneday') {
    const steps = [
      { name: "① 口腔内スキャン", time: "3 分", desc: "最新iOSで高速フルアーチ印象採得。患者の嘔吐反射ゼロ。" },
      { name: "② AI CADデザイン", time: "10 分", desc: "隣接在・対合歯の咬合関係をAIが自動計算しクラウン即時生成。" },
      { name: "③ RAY Mill 高速切削", time: "12 分", desc: "高剛性スピンドルでジルコニア・セラミックを精密ミリング。" },
      { name: "④ 焼成・即時セット", time: "15 分", desc: "超高速ファーネス焼成とチェアサイド研磨後、当日中に装着完了。" }
    ];

    return (
      <div className="w-full h-full min-h-[380px] bg-gradient-to-b from-[#0e172a] to-[#070c18] rounded-xl border border-slate-700/60 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
            <Clock className="w-4 h-4" />
            <span>1Dayトリートメント 最短40分ワークフロートラッカー</span>
          </div>
          <div className="text-xs bg-cyan-950/70 border border-cyan-800 text-cyan-300 px-3 py-1 rounded font-bold">
            総所要時間: 約40分 (即日完結)
          </div>
        </div>

        {/* Step Progression Visualizer */}
        <div className="grid grid-cols-4 gap-2 my-4">
          {steps.map((st, idx) => (
            <button
              key={idx}
              onClick={() => setOnedayStep(idx)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                onedayStep === idx
                  ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(0,168,255,0.2)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono text-cyan-400 font-bold">{st.time}</span>
                <span className={`w-2 h-2 rounded-full ${onedayStep === idx ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
              </div>
              <div className="text-xs font-bold text-white mb-1">{st.name}</div>
            </button>
          ))}
        </div>

        {/* Active Step Detailed Card */}
        <div className="flex-1 bg-slate-900/90 rounded-lg border border-slate-800 p-5 flex flex-col justify-center">
          <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">STEP {onedayStep + 1} FOCUS</div>
          <h4 className="text-lg font-bold text-white mb-2">{steps[onedayStep].name} (目安 {steps[onedayStep].time})</h4>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">{steps[onedayStep].desc}</p>
          <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> 来院回数: 2回以上 → 1回
            </span>
            <span className="flex items-center gap-1 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" /> 仮歯・再麻酔不要
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 7. CAD/CAM 内製化メリット (ROI Calculator)
  if (item.interactiveType === 'cadcam-inhouse') {
    const outsourceCostPerCrown = 15000; // 15,000 yen
    const inhouseCostPerCrown = 3200; // 3,200 yen (block + bur + electricity)
    const monthlySavings = (outsourceCostPerCrown - inhouseCostPerCrown) * monthlyCrowns;
    const annualSavings = monthlySavings * 12;
    const estimatedMachineCost = 6500000;
    const paybackMonths = Math.max(6, Math.round(estimatedMachineCost / monthlySavings));

    return (
      <div className="w-full h-full min-h-[380px] bg-gradient-to-b from-[#0e172a] to-[#070c18] rounded-xl border border-slate-700/60 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
            <DollarSign className="w-4 h-4" />
            <span>技工内製化 ROI（費用対効果）シミュレーター</span>
          </div>
          <div className="text-xs text-slate-400">
            月間補綴症例数に応じたコスト削減予測
          </div>
        </div>

        {/* Crown Quantity Slider */}
        <div className="my-3 bg-slate-900/80 p-4 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-300 font-medium">月間 クラウン/インレー製作数:</span>
            <span className="text-lg font-bold text-cyan-400 font-mono">{monthlyCrowns} 歯 / 月</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="80" 
            step="5"
            value={monthlyCrowns}
            onChange={(e) => setMonthlyCrowns(Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>小規模 (5歯)</span>
            <span>中規模 (25〜35歯)</span>
            <span>大規模 (80歯)</span>
          </div>
        </div>

        {/* Calculation Results Card */}
        <div className="grid grid-cols-3 gap-3 my-2">
          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
            <div className="text-[11px] text-slate-400 mb-1">外注技工料 (想定)</div>
            <div className="text-base font-bold text-slate-300 font-mono">
              ¥{(outsourceCostPerCrown * monthlyCrowns).toLocaleString()} <span className="text-xs font-normal">/月</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">単価 ¥15,000</div>
          </div>
          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
            <div className="text-[11px] text-cyan-400 mb-1">RAY Mill 内製原価</div>
            <div className="text-base font-bold text-cyan-300 font-mono">
              ¥{(inhouseCostPerCrown * monthlyCrowns).toLocaleString()} <span className="text-xs font-normal">/月</span>
            </div>
            <div className="text-[10px] text-cyan-400/80 mt-1">ブロック＋バー費用</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 p-3 rounded-lg border border-emerald-500/50">
            <div className="text-[11px] text-emerald-400 font-bold mb-1">年間コスト削減額</div>
            <div className="text-lg font-bold text-emerald-300 font-mono">
              +¥{(annualSavings / 10000).toFixed(0)} 万円 <span className="text-xs font-normal">/年</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">設備回収 目安 {paybackMonths} ヶ月</div>
          </div>
        </div>

        <div className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
          ※ 納期が即日化することで再製・脱落リスクを削減し、自費成約率と患者定着率を劇的に高めます。
        </div>
      </div>
    );
  }

  // Default Fallback Simulator for other items
  return (
    <div className="relative w-full h-full min-h-[380px] bg-gradient-to-b from-[#0e172a] to-[#070c18] rounded-xl border border-slate-700/60 p-5 flex flex-col justify-between overflow-hidden">
      {/* Background visual asset */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
          <Cpu className="w-4 h-4" />
          <span>{item.title} デジタル臨床プレビュー</span>
        </div>
        <div className="text-xs px-2.5 py-1 bg-cyan-950 border border-cyan-800 text-cyan-300 rounded font-mono">
          RAY INNOVATION
        </div>
      </div>

      <div className="relative z-10 my-4 flex-1 flex flex-col justify-center items-center text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 shadow-[0_0_20px_rgba(0,168,255,0.25)]">
          <Sparkles className="w-8 h-8" />
        </div>
        <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
        <p className="text-sm text-slate-300 max-w-md leading-relaxed">{item.desc}</p>
        
        {item.badge && (
          <span className="mt-3 text-xs bg-slate-800/80 border border-slate-700 text-cyan-300 px-3 py-1 rounded-full">
            {item.badge}
          </span>
        )}
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
        {item.features.slice(0, 2).map((feat, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/80 p-2 rounded border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>{feat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
