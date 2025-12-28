import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Game, Team } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface GameCardProps {
  game: Game;
  homeTeam?: Team;
  awayTeam?: Team;
  className?: string;
}

export function GameCard({ game, homeTeam, awayTeam, className }: GameCardProps) {
  const gameDate = new Date(game.date);
  const isFinished = game.status === 'finished';

  return (
    <Link
      to={`/games/${game.id}`}
      className={cn(
        'group block rounded-lg border border-border bg-card p-5 shadow-card transition-all duration-300',
        'hover:border-primary/50 hover:shadow-lg',
        className
      )}
    >
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{format(gameDate, 'MMM d, yyyy • HH:mm')}</span>
        </div>
        <span className={cn(
          'rounded-full px-2 py-0.5 text-xs font-medium',
          isFinished ? 'bg-muted text-muted-foreground' : 'bg-primary/20 text-primary'
        )}>
          {isFinished ? 'Final' : 'Upcoming'}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Home Team */}
        <div className="flex-1 text-center">
          <div className="mx-auto mb-2 h-12 w-12 overflow-hidden rounded-lg bg-secondary">
            {homeTeam && (
              <img src={homeTeam.logoUrl} alt={homeTeam.name} className="h-full w-full object-cover" />
            )}
          </div>
          <p className="font-medium text-foreground text-sm truncate">{homeTeam?.name || 'TBD'}</p>
          {isFinished && (
            <p className={cn(
              'mt-1 font-display text-3xl',
              game.homeScore! > game.awayScore! ? 'text-win' : 'text-foreground'
            )}>
              {game.homeScore}
            </p>
          )}
        </div>

        {/* VS */}
        <div className="flex-shrink-0">
          <span className="font-display text-2xl text-muted-foreground">VS</span>
        </div>

        {/* Away Team */}
        <div className="flex-1 text-center">
          <div className="mx-auto mb-2 h-12 w-12 overflow-hidden rounded-lg bg-secondary">
            {awayTeam && (
              <img src={awayTeam.logoUrl} alt={awayTeam.name} className="h-full w-full object-cover" />
            )}
          </div>
          <p className="font-medium text-foreground text-sm truncate">{awayTeam?.name || 'TBD'}</p>
          {isFinished && (
            <p className={cn(
              'mt-1 font-display text-3xl',
              game.awayScore! > game.homeScore! ? 'text-win' : 'text-foreground'
            )}>
              {game.awayScore}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" />
        <span>{game.venue}</span>
      </div>
    </Link>
  );
}
