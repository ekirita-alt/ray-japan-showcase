/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  appData, 
  SolutionCategory, 
  SolutionItem 
} from './data/solutionsData';
import { 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronDown,
  Sparkles,
  Play,
  Pause,
  X
} from 'lucide-react';
import rayLogoImg from './assets/images/ray_logo.png';
import topBgmAudio from './assets/audio/top_bgm.mp3';

export default function App() {
  // Navigation state
  const [currentView, setCurrentView] = useState<'home' | 'detail'>('home');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('rayface');
  const [activeItemId, setActiveItemId] = useState<string>('oneshot');
  // Expanded state for Level-2 groups (default: empty / all closed until clicked)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  
  // Concept Movie Modal state for top page
  const [isConceptModalOpen, setIsConceptModalOpen] = useState<boolean>(false);

  // Audio & Playback state
  const [isMuted, setIsMuted] = useState<boolean>(false); // Sound ON by default (shared across all pages)
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [animKey, setAnimKey] = useState<number>(0);
  
  // Video element reference
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Audio element reference for video BGM with looping
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);

  // Active Category & Item
  const activeCategory: SolutionCategory = appData[activeCategoryId] || appData['rayface'];
  const activeItem: SolutionItem = 
    activeCategory.items.find(item => item.id === activeItemId) || activeCategory.items[0];

  // Open category from Home
  // Play video with autoplay permission fallback
  const startVideoPlayback = (targetUrl?: string) => {
    if (!videoRef.current) return;
    if (targetUrl) {
      videoRef.current.src = targetUrl;
    }
    videoRef.current.muted = isMuted;
    videoRef.current.play().then(() => {
      setIsVideoPlaying(true);
    }).catch(() => {
      // If browser blocked unmuted autoplay, fallback to muted so playback starts instantly
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
        videoRef.current.play().then(() => {
          setIsVideoPlaying(true);
        }).catch(() => {
          setIsVideoPlaying(false);
        });
      }
    });
  };

  // Toggle expand state for a group (accordion: automatically closes other groups when one is selected/opened)
  const toggleGroup = (groupId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const willOpen = !expandedGroups[groupId];
    if (willOpen) {
      setExpandedGroups({ [groupId]: true });
      // When opening a group, if currently active item is not in this group, select the first item of this group
      const currentItem = activeCategory.items.find(it => it.id === activeItemId);
      if (currentItem?.groupId !== groupId) {
        const targetEntry = activeCategory.entries.find(
          entry => entry.type === 'group' && entry.group.id === groupId
        );
        if (targetEntry && targetEntry.type === 'group' && targetEntry.group.items.length > 0) {
          const firstSub = targetEntry.group.items[0];
          setActiveItemId(firstSub.id);
          setAnimKey(prev => prev + 1);
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            startVideoPlayback(firstSub.videoUrl);
          }
        }
      }
    } else {
      setExpandedGroups({});
    }
  };

  // Open category from Home (optional targetItemId for direct deep-linking)
  const handleOpenCategory = (categoryId: string, targetItemId?: string) => {
    const category = appData[categoryId];
    if (!category) return;
    setActiveCategoryId(categoryId);
    const chosenItem = targetItemId 
      ? category.items.find(it => it.id === targetItemId) || category.items[0]
      : category.items[0];
    setActiveItemId(chosenItem.id);
    
    // Groups are closed from the start; open ONLY if a specific item within it was targeted
    if (targetItemId && chosenItem.groupId) {
      setExpandedGroups({
        [chosenItem.groupId]: true
      });
    } else {
      setExpandedGroups({});
    }

    setCurrentView('detail');
    setAnimKey(prev => prev + 1);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      startVideoPlayback(chosenItem.videoUrl);
    }
  };

  // Back to Home
  const handleBackToHome = () => {
    setCurrentView('home');
    setExpandedGroups({});
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  // Select item (either standalone middle item or sub-item in a group)
  const handleSelectSubItem = (itemId: string) => {
    setActiveItemId(itemId);
    setAnimKey(prev => prev + 1);

    const selectedItem = activeCategory.items.find(it => it.id === itemId);
    if (selectedItem?.groupId) {
      // Sub-item in a group: keep only its parent group open and close all other groups
      setExpandedGroups({
        [selectedItem.groupId]: true
      });
    } else {
      // Standalone middle item (no sub-items) selected: automatically close all group tabs!
      setExpandedGroups({});
    }

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      startVideoPlayback(selectedItem?.videoUrl);
    }
  };

  // Toggle Video Play / Pause
  const handleTogglePlayVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      startVideoPlayback();
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  // Universal Toggle Mute (Linked between Top Page & Detail Pages)
  const handleToggleMute = () => {
    setIsMuted(prev => {
      const nextMuted = !prev;
      if (videoRef.current) {
        videoRef.current.muted = nextMuted;
      }
      if (bgmAudioRef.current) {
        if (nextMuted) {
          bgmAudioRef.current.pause();
        } else if (currentView === 'home') {
          bgmAudioRef.current.play().catch(() => {});
        }
      }
      return nextMuted;
    });
  };

  // Modal open/close handlers for Face-Driven Dentistry Concept Film
  const handleOpenConceptModal = () => {
    setIsConceptModalOpen(true);
    if (bgmAudioRef.current) {
      bgmAudioRef.current.pause();
    }
  };

  const handleCloseConceptModal = () => {
    setIsConceptModalOpen(false);
    if (currentView === 'home' && !isMuted && bgmAudioRef.current) {
      bgmAudioRef.current.play().catch(() => {});
    }
  };

  // Close concept modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isConceptModalOpen) {
        handleCloseConceptModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConceptModalOpen]);

  // Sync video element muted property whenever isMuted changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Top Page BGM Controller: strictly active only when on 'home' view, modal is closed, and sound is ON (!isMuted)
  useEffect(() => {
    if (currentView === 'home' && !isConceptModalOpen) {
      if (!isMuted && bgmAudioRef.current) {
        bgmAudioRef.current.play().catch(() => {});
      }
    } else {
      if (bgmAudioRef.current) {
        bgmAudioRef.current.pause();
      }
    }
  }, [currentView, isMuted, isConceptModalOpen]);

  // Handle browser autoplay policies on top page: trigger resume on first interaction
  useEffect(() => {
    const handleFirstGesture = () => {
      if (currentView === 'home' && !isMuted && !isConceptModalOpen && bgmAudioRef.current) {
        bgmAudioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });

    if (currentView === 'home' && !isMuted && bgmAudioRef.current) {
      bgmAudioRef.current.play().catch(() => {});
    }

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [currentView, isMuted]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (bgmAudioRef.current) {
        bgmAudioRef.current.pause();
      }
    };
  }, []);

  // Ensure video updates when active item changes
  useEffect(() => {
    if (videoRef.current && currentView === 'detail') {
      videoRef.current.currentTime = 0;
      startVideoPlayback(activeItem.videoUrl);
    }
  }, [activeItemId, currentView]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a1128] text-white flex flex-col font-sans select-none">
      
      {/* ================= Universal Top Status & Utility Bar ================= */}
      <header className="h-14 px-6 bg-[#0c142b]/95 border-b border-[#33415c]/60 flex items-center justify-between shrink-0 z-30">
        {/* Brand Zone */}
        <div 
          onClick={handleBackToHome}
          className="flex items-center cursor-pointer group"
        >
          <img 
            src={rayLogoImg} 
            alt="Ray" 
            className="h-7 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85" 
          />
        </div>

        {/* Center Breadcrumb (Detail view only) */}
        {currentView === 'detail' && (
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 font-medium">
            <button 
              onClick={handleBackToHome}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              ホーム
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400 font-semibold">{activeCategory.title}</span>
            {activeItem.groupTitle && (
              <>
                <span className="text-slate-600">/</span>
                <span className="text-cyan-300 font-semibold truncate max-w-xs">
                  {activeItem.groupTitle}
                </span>
              </>
            )}
            <span className="text-slate-600">/</span>
            <span className="text-white truncate max-w-xs font-medium">
              {activeItem.title}
            </span>
          </div>
        )}

        {/* Action Controls Zone */}
        <div className="flex items-center gap-2 min-h-[36px]">
          {/* Universal Sound Mute On/Off Button (Linked across Top Page & Detail Pages) */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'サウンドをON（ミュート解除）' : 'ミュートにする'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
              !isMuted 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,168,255,0.35)] hover:bg-cyan-500/30' 
                : 'bg-slate-900/70 border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-500'
            }`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>MUTE</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ================= Viewport Body ================= */}
      <main className="relative flex-1 w-full h-[calc(100vh-3.5rem)] overflow-hidden">
        
        {/* ========================================================
            階層1: ホーム画面 (Home View)
           ======================================================== */}
        <div 
          className={`absolute inset-0 overflow-y-auto overscroll-contain touch-pan-y flex flex-col items-center p-4 sm:p-6 md:p-8 transition-all duration-400 ease-in-out ${
            currentView === 'home' 
              ? 'opacity-100 scale-100 pointer-events-auto z-20' 
              : 'opacity-0 scale-95 pointer-events-none z-10'
          }`}
          style={{
            background: 'radial-gradient(circle at center, #121826 0%, #0a1128 100%)'
          }}
        >
          <div className="w-full max-w-4xl flex flex-col items-center my-auto py-6 sm:py-8">
            {/* Main Title Lockup - Clickable to play Face Forward Concept Movie */}
            <div className="text-center mb-6 md:mb-8 lg:mb-10 -translate-y-1 md:-translate-y-3">
              <button
                type="button"
                onClick={handleOpenConceptModal}
                className="group inline-flex items-center cursor-pointer transition-all focus:outline-none select-none"
                title="クリックしてブランドムービーを再生"
              >
                <div className="flex items-center gap-2.5 sm:gap-3.5 px-4 py-1.5 rounded-2xl transition-all duration-300 group-hover:bg-white/5 group-hover:shadow-[0_0_30px_rgba(0,168,255,0.25)]">
                  <h1 className="face-driven-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white group-hover:text-cyan-300 transition-colors">
                    Face-Driven Dentistry
                  </h1>
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500 text-cyan-300 group-hover:text-slate-950 flex items-center justify-center border border-cyan-400/40 group-hover:border-cyan-300 transition-all duration-300 shadow-[0_0_15px_rgba(0,168,255,0.3)] group-hover:scale-110 shrink-0">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                  </span>
                </div>
              </button>
            </div>

            {/* 2x2 Grid of Main Solution Cards (Simple & Clean) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
              {Object.entries(appData).map(([catKey, cat]) => (
                <button
                  key={catKey}
                  onClick={() => handleOpenCategory(catKey)}
                  className="group relative flex flex-col items-center justify-center p-7 sm:p-9 md:p-11 rounded-2xl border-2 border-[#33415c] hover:border-[#00a8ff] bg-gradient-to-br from-[#162238] to-[#0f172a] hover:from-[#1c2c49] hover:to-[#131f38] text-white cursor-pointer transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-cyan-500/20 active:scale-95 text-center overflow-hidden min-h-[170px] sm:min-h-[200px]"
                >
                  {/* Background visual artwork preview */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none overflow-hidden">
                    <img 
                      src={cat.heroImage} 
                      alt={cat.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${cat.imagePosition || 'object-center'} scale-100 group-hover:scale-105`} 
                    />
                  </div>

                  {/* Category Title (Centered) */}
                  <div className="relative z-10 text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] text-center px-4 leading-snug">
                    {cat.title}
                  </div>

                  {/* Hover glow light */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-10 bg-cyan-400/20 blur-xl rounded-full group-hover:bg-cyan-400/40 transition-colors pointer-events-none" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            階層2 & 3: 詳細画面 (Detail View)
           ======================================================== */}
        <div 
          className={`absolute inset-0 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden overscroll-contain touch-pan-y transition-all duration-400 ease-in-out ${
            currentView === 'detail' 
              ? 'opacity-100 scale-100 pointer-events-auto z-20' 
              : 'opacity-0 scale-95 pointer-events-none z-10'
          }`}
        >
          {/* ================= Sidebar (30% width) ================= */}
          <aside className="w-full md:w-[32%] lg:w-[28%] bg-[#121826] border-b-2 md:border-b-0 md:border-r-2 border-[#00a8ff]/30 p-3 sm:p-5 md:p-6 flex flex-col justify-between shrink-0 overflow-y-auto max-h-[38vh] sm:max-h-[42vh] md:max-h-none">
            <div>
              {/* Back to Home Button */}
              <button
                id="btn-back"
                onClick={handleBackToHome}
                className="w-full mb-3 sm:mb-5 flex items-center justify-center gap-1.5 sm:gap-2 bg-transparent hover:bg-[#1e293b] active:bg-[#33415c] border-2 border-[#33415c] text-slate-300 hover:text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-bold text-xs sm:text-sm md:text-base transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#00a8ff]" />
                <span>ホームに戻る</span>
              </button>

              {/* Category Title */}
              <div className="mb-2.5 sm:mb-4 pb-2 sm:pb-3 border-b-2 border-[#33415c]">
                <div className="text-[10px] sm:text-[11px] font-mono text-cyan-400 uppercase tracking-wider">Category</div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#00a8ff]">
                  {activeCategory.title}
                </h2>
                {activeCategory.subText && (
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">
                    {activeCategory.subText}
                  </div>
                )}
              </div>

              {/* Submenu Item Entries (3-tier hierarchy: 中項目 & 小項目) */}
              <div className="space-y-1.5 sm:space-y-2">
                {activeCategory.entries.map((entry) => {
                  if (entry.type === 'item') {
                    const item = entry.item;
                    const isActive = activeItemId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectSubItem(item.id)}
                        className={`w-full text-left p-2 sm:p-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 border-2 cursor-pointer flex items-center justify-between group ${
                          isActive
                            ? 'bg-[#00a8ff]/20 border-[#00a8ff] text-white shadow-[0_0_15px_rgba(0,168,255,0.35)] md:translate-x-1.5'
                            : 'bg-white/5 border-[#33415c]/70 text-slate-300 hover:bg-white/10 hover:border-slate-500'
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_#00a8ff]" />
                        )}
                      </button>
                    );
                  } else {
                    const group = entry.group;
                    const isGroupExpanded = Boolean(expandedGroups[group.id]);
                    const isAnyChildActive = group.items.some(it => it.id === activeItemId);
                    return (
                      <div
                        key={group.id}
                        className={`rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
                          isAnyChildActive
                            ? 'bg-[#00a8ff]/15 border-cyan-500/50 p-1.5 sm:p-2 shadow-[0_0_15px_rgba(0,168,255,0.2)]'
                            : isGroupExpanded
                            ? 'bg-white/5 border-cyan-500/30 p-1.5 sm:p-2'
                            : 'bg-white/5 border-[#33415c]/70 p-1.5 sm:p-2 hover:bg-white/10 hover:border-slate-500'
                        }`}
                      >
                        {/* Group Header (中項目) */}
                        <button
                          onClick={(e) => toggleGroup(group.id, e)}
                          className={`w-full flex items-center justify-between px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg text-xs font-bold transition-colors cursor-pointer group hover:bg-slate-800/60 ${
                            isGroupExpanded ? 'text-cyan-300' : 'text-white'
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-bold tracking-wide">{group.title}</span>
                          <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${isGroupExpanded ? 'rotate-0 text-cyan-400' : '-rotate-90 text-slate-400 group-hover:text-white'}`} />
                        </button>

                        {/* Sub-items list (小項目) */}
                        {isGroupExpanded && (
                          <div className="pl-2 sm:pl-3 ml-2 sm:ml-2.5 border-l-2 border-cyan-500/30 space-y-1 mt-1 mb-0.5">
                            {group.items.map((subItem) => {
                              const isSubActive = activeItemId === subItem.id;
                              return (
                                <button
                                  key={subItem.id}
                                  onClick={() => handleSelectSubItem(subItem.id)}
                                  className={`w-full text-left px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-200 border cursor-pointer flex items-center justify-between ${
                                    isSubActive
                                      ? 'bg-[#00a8ff]/25 border-[#00a8ff] text-white font-bold shadow-[0_0_12px_rgba(0,168,255,0.3)] md:translate-x-1'
                                      : 'bg-transparent border-transparent text-slate-300 hover:bg-white/5 hover:text-white hover:border-slate-700/60'
                                  }`}
                                >
                                  <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                                    <span className="truncate">{subItem.title}</span>
                                  </div>
                                  {isSubActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_#00a8ff]" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            {/* Bottom Quick Category Switcher */}
            <div className="mt-3 sm:mt-6 pt-2.5 sm:pt-4 border-t border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-1.5 sm:mb-2">Category 切替</div>
              <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                {Object.entries(appData).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => handleOpenCategory(key)}
                    className={`text-[11px] sm:text-xs py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-lg font-medium transition-colors text-center truncate cursor-pointer ${
                      activeCategoryId === key
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,168,255,0.4)]'
                        : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ================= Main Content (70% width) ================= */}
          <section className="flex-1 bg-[#0a1128] p-3.5 sm:p-6 md:p-8 flex flex-col overflow-y-auto">
            
            {/* Media Wrapper (Responsive video height: compact on mobile, majestic on desktop) */}
            <div className="relative w-full h-[180px] sm:h-[260px] md:h-[52vh] bg-black rounded-xl sm:rounded-2xl overflow-hidden border border-[#33415c] shadow-xl sm:shadow-2xl shadow-black/60 mb-3 sm:mb-5 shrink-0 flex items-center justify-center">
              <div 
                onClick={handleTogglePlayVideo}
                className="relative w-full h-full flex items-center justify-center bg-slate-950 cursor-pointer group"
              >
                <video 
                  ref={videoRef}
                  id="main-video"
                  src={activeItem.videoUrl}
                  autoPlay
                  muted={isMuted}
                  playsInline
                  loop
                  preload="auto"
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  className="w-full h-full object-contain bg-black"
                />

                {/* Play overlay if paused */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(0,168,255,0.6)] transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-slate-950 ml-0.5 sm:ml-1" />
                    </div>
                  </div>
                )}

                {/* Subtle video badge */}
                <div className="absolute top-2.5 left-3 sm:top-3 sm:left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono text-cyan-300 flex items-center gap-1.5 sm:gap-2 pointer-events-none">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CLINICAL VIDEO LOOP</span>
                </div>
              </div>
            </div>

            {/* Dynamic Text Information Wrapper with smooth fade-in animation */}
            <div 
              key={`text-${activeItemId}-${animKey}`}
              className="flex-1 flex flex-col justify-between fade-in"
            >
              <div>
                <div className="flex flex-col gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                  {/* 3-Tier Hierarchy Path Indicator */}
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-cyan-400">
                    <span className="text-slate-400">{activeCategory.title}</span>
                    {activeItem.groupTitle && (
                      <>
                        <span className="text-slate-600">/</span>
                        <span className="text-cyan-300 font-semibold">{activeItem.groupTitle}</span>
                      </>
                    )}
                    <span className="text-slate-600">/</span>
                    <span className="text-white font-medium">{activeItem.title}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <h1 
                      id="content-title"
                      className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight"
                    >
                      {activeItem.title}
                    </h1>
                    {activeItem.badge && (
                      <span className="text-[10px] sm:text-xs bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-medium">
                        {activeItem.badge}
                      </span>
                    )}
                  </div>
                </div>

                <p 
                  id="content-desc"
                  className="text-xs sm:text-base md:text-lg text-slate-300 leading-relaxed mb-2.5 sm:mb-5 line-clamp-3 sm:line-clamp-none"
                >
                  {activeItem.desc}
                </p>

                {/* Features & Key Clinical Points Grid (2-columns on mobile for compact ratio & neat alignment) */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-6">
                  {activeItem.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-900/70 border border-slate-800 p-2 sm:p-3 rounded-lg sm:rounded-xl flex items-start gap-1.5 sm:gap-2.5 text-[11px] sm:text-sm text-slate-200"
                    >
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2 sm:line-clamp-none">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Specs & Action Bar */}
              <div className="pt-2.5 sm:pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 sm:gap-4 mt-auto">
                {activeItem.specs && activeItem.specs.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono">
                    {activeItem.specs.map((sp, idx) => (
                      <div key={idx} className="bg-slate-900/80 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg border border-slate-800">
                        <span className="text-slate-400 mr-1.5 sm:mr-2">{sp.label}:</span>
                        <span className="text-cyan-300 font-bold">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </section>
        </div>

      </main>

      {/* Brand Concept Movie Modal for Face-Driven Dentistry */}
      {isConceptModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md transition-opacity duration-300"
          onClick={handleCloseConceptModal}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-950 border-2 border-cyan-500/50 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/30 flex flex-col animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900/95 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold text-sm sm:text-base text-white tracking-wide">
                  Face-Driven Dentistry — Brand Movie
                </span>
                <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 font-mono">
                  Face Forward
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseConceptModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700 text-xs font-semibold"
                title="閉じる"
              >
                <X className="w-4 h-4" />
                <span>閉じる</span>
              </button>
            </div>

            {/* Video Container (16:9 ratio) - Native HTML5 video */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <video
                key="concept-video-v3"
                src="/videos/face_forward_concept.mp4?v=3"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                controls
                className="w-full h-full object-contain bg-black"
              />
            </div>
          </div>
        </div>
      )}

      {/* Background Preloader for instant concept video startup */}
      <video
        src="/videos/face_forward_concept.mp4?v=3"
        preload="auto"
        muted
        playsInline
        className="hidden"
        aria-hidden="true"
      />

      {/* Top Page Background Audio Element (Looping) */}
      <audio
        ref={bgmAudioRef}
        src={topBgmAudio}
        loop
        playsInline
        preload="auto"
        onEnded={() => {
          if (bgmAudioRef.current && currentView === 'home' && !isMuted && !isConceptModalOpen) {
            bgmAudioRef.current.currentTime = 0;
            bgmAudioRef.current.play().catch(() => {});
          }
        }}
      />

    </div>
  );
}
