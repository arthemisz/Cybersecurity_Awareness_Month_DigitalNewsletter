import React from 'react';
import HeroCard from './bento/HeroCard';
import InteractiveToolCard from './bento/InteractiveToolCard';
import StatCard from './bento/StatCard';
import ChecklistCard from './bento/ChecklistCard';
import ResourcesCard from './bento/ResourcesCard';

export default function BentoGrid({ week, onOpenReader, onChecklistCompleted }) {
  return (
    <section className="relative z-10 w-full animate-fade-in">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {/* 1. Hero Feature Card (2 Columns) */}
        <HeroCard week={week} onOpenReader={onOpenReader} />

        {/* 2. Interactive Tool / Simulator Card (1 Column) */}
        <InteractiveToolCard week={week} />

        {/* 3. Metric / Risk Telemetry Card (1 Column) */}
        <StatCard week={week} />

        {/* 4. Quick Action Checklist Card (1 Column) */}
        <ChecklistCard week={week} onChecklistCompleted={onChecklistCompleted} />

        {/* 5. Field Resources & SOP Download Card (1 Column) */}
        <ResourcesCard week={week} />
      </div>
    </section>
  );
}
