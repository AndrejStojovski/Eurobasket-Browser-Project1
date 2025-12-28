import { Link } from 'react-router-dom';
import { Player, Team } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface PlayerCardProps {
  player: Player;
  team?: Team;
  className?: string;
  showTeam?: boolean;
}

const positionColors: Record<string, string> = {
  PG: 'bg-blue-500/20 text-blue-400',
  SG: 'bg-green-500/20 text-green-400',
  SF: 'bg-yellow-500/20 text-yellow-400',
  PF: 'bg-orange-500/20 text-orange-400',
  C: 'bg-red-500/20 text-red-400',
};

export function PlayerCard({ player, team, className, showTeam = true }: PlayerCardProps) {
  return (
    <Link
      to={`/players/${player.id}`}
      className={cn(
        'group block rounded-lg border border-border bg-card p-5 shadow-card transition-all duration-300',
        'hover:border-primary/50 hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary font-display text-xl text-primary">
            #{player.number}
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {player.firstName} {player.lastName}
            </h3>
            {showTeam && team && (
              <p className="text-sm text-muted-foreground">{team.name}</p>
            )}
          </div>
        </div>
        <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', positionColors[player.position])}>
          {player.position}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <div className="rounded-md bg-secondary/50 p-2">
          <p className="text-lg font-semibold text-foreground">{player.stats.ppg}</p>
          <p className="text-xs text-muted-foreground">PPG</p>
        </div>
        <div className="rounded-md bg-secondary/50 p-2">
          <p className="text-lg font-semibold text-foreground">{player.stats.rpg}</p>
          <p className="text-xs text-muted-foreground">RPG</p>
        </div>
        <div className="rounded-md bg-secondary/50 p-2">
          <p className="text-lg font-semibold text-foreground">{player.stats.apg}</p>
          <p className="text-xs text-muted-foreground">APG</p>
        </div>
        <div className="rounded-md bg-secondary/50 p-2">
          <p className="text-lg font-semibold text-primary">{player.stats.efficiency}</p>
          <p className="text-xs text-muted-foreground">EFF</p>
        </div>
      </div>
    </Link>
  );
}
