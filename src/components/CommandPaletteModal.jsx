import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, ArrowRight, BookOpen, Wrench, Shield, CheckSquare, X, CornerDownLeft } from 'lucide-react';
import { WEEKS_DATA } from '../data/dispatchData';

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onSelectWeek,
  onOpenReader,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Flatten searchable items from all 4 weeks
  const searchableItems = useMemo(() => {
    const items = [];

    WEEKS_DATA.forEach((week) => {
      // 1. The Week master editorial dispatch
      items.push({
        id: `week-${week.id}`,
        title: week.title,
        subtitle: week.subtitle,
        category: 'Editorial Dispatch',
        weekId: week.id,
        weekNumber: week.weekNumber,
        type: 'dispatch',
        tag: week.tag,
        icon: BookOpen,
      });

      // 2. The Interactive tool
      items.push({
        id: `tool-${week.id}`,
        title: week.simulator.title,
        subtitle: week.simulator.description,
        category: 'Interactive Simulator',
        weekId: week.id,
        weekNumber: week.weekNumber,
        type: 'tool',
        tag: week.simulator.badge,
        icon: Wrench,
      });

      // 3. Checklist
      items.push({
        id: `checklist-${week.id}`,
        title: `Week ${week.weekNumber} Defense Checklist & Drills`,
        subtitle: `${week.checklist.length} actionable employee compliance tasks`,
        category: 'Defender Checklist',
        weekId: week.id,
        weekNumber: week.weekNumber,
        type: 'checklist',
        tag: 'COMPLIANCE',
        icon: CheckSquare,
      });

      // 4. Resources
      week.resources.forEach((res) => {
        items.push({
          id: `res-${res.id}`,
          title: res.title,
          subtitle: `${res.format} • ${res.code}`,
          category: 'Field Resource',
          weekId: week.id,
          weekNumber: week.weekNumber,
          type: 'resource',
          tag: res.type,
          icon: Shield,
        });
      });
    });

    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return searchableItems.slice(0, 8);
    const q = searchQuery.toLowerCase();
    return searchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
    );
  }, [searchQuery, searchableItems]);

  const handleSelectItem = (item) => {
    onSelectWeek(item.weekId);
    if (item.type === 'dispatch') {
      onOpenReader();
    }
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelectItem(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Dialog box */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-neutral-950 dark:bg-neutral-950 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-black/15 shadow-2xl overflow-hidden font-sans">
        
        {/* Search Input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 dark:border-white/10 light:border-black/10 bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-neutral-50">
          <Search className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search all 4 campaign weeks, simulators, threats (e.g. passkeys, DMARC, CVE, backups)..."
            className="w-full bg-transparent text-sm text-neutral-100 dark:text-neutral-100 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-neutral-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] font-mono text-neutral-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`cursor-pointer p-3 rounded-xl flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-neutral-800/90 dark:bg-neutral-800/90 light:bg-neutral-100 text-neutral-100'
                      : 'hover:bg-neutral-900/50 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-neutral-900 text-neutral-400'
                    }`}>
                      <Icon className="w-4 h-4 flex-shrink-0" />
                    </div>

                    <div className="overflow-hidden">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold truncate text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
                          W{item.weekNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 dark:text-neutral-400 light:text-neutral-600 truncate font-sans">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 pl-2">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase hidden sm:inline">
                      {item.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs font-mono text-neutral-500">
              NO MATCHING THREAT INTELLIGENCE ARTIFACTS FOUND
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-white/5 dark:border-white/5 light:border-black/5 bg-neutral-900/40 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>OCTOBER 2026 DISPATCH HUB</span>
        </div>

      </div>
    </div>
  );
}
