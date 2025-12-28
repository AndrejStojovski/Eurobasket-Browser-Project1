import { cn } from '@/lib/utils';

interface StatBarProps {
  label: string;
  homeValue: number;
  awayValue: number;
  unit?: string;
  higherIsBetter?: boolean;
}

export function StatBar({ label, homeValue, awayValue, unit = '', higherIsBetter = true }: StatBarProps) {
  const total = homeValue + awayValue;
  const homePercent = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPercent = 100 - homePercent;

  const homeWins = higherIsBetter ? homeValue > awayValue : homeValue < awayValue;
  const awayWins = higherIsBetter ? awayValue > homeValue : awayValue < homeValue;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className={cn('font-semibold', homeWins ? 'text-primary' : 'text-foreground')}>
          {homeValue}{unit}
        </span>
        <span className="text-muted-foreground">{label}</span>
        <span className={cn('font-semibold', awayWins ? 'text-primary' : 'text-foreground')}>
          {awayValue}{unit}
        </span>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            'transition-all duration-500',
            homeWins ? 'bg-primary' : 'bg-muted-foreground'
          )}
          style={{ width: `${homePercent}%` }}
        />
        <div
          className={cn(
            'transition-all duration-500',
            awayWins ? 'bg-primary' : 'bg-muted-foreground'
          )}
          style={{ width: `${awayPercent}%` }}
        />
      </div>
    </div>
  );
}
