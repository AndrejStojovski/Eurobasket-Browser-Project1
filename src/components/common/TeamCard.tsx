import { Link } from 'react-router-dom';
import { MapPin, Trophy } from 'lucide-react';
import { Team } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface TeamCardProps {
  team: Team;
  className?: string;
}

export function TeamCard({ team, className }: TeamCardProps) {
  const winRate = ((team.wins / (team.wins + team.losses)) * 100).toFixed(1);

  return (
    <Link
      to={`/teams/${team.id}`}
      className={cn(
        'group block rounded-lg border border-border bg-card p-6 shadow-card transition-all duration-300',
        'hover:border-primary/50 hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-secondary flex-shrink-0">
          <img
            src={team.logoUrl}
            alt={team.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors truncate">
            {team.name}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{team.city}, {team.country}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-win">{team.wins}</p>
            <p className="text-xs text-muted-foreground">Wins</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-loss">{team.losses}</p>
            <p className="text-xs text-muted-foreground">Losses</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1">
          <Trophy className="h-3.5 w-3.5 text-primary" />
          <span className="text-sm font-medium text-foreground">{winRate}%</span>
        </div>
      </div>
    </Link>
  );
}
