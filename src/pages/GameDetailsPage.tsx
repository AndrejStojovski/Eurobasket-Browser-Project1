import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { StatBar } from '@/components/common/StatBar';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function GameDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { getGameById, getTeamById, getGameStats, getPlayerById, loading } = useData();

  if (loading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  const game = id ? getGameById(id) : undefined;
  const homeTeam = game ? getTeamById(game.homeTeamId) : undefined;
  const awayTeam = game ? getTeamById(game.awayTeamId) : undefined;
  const stats = id ? getGameStats(id) : undefined;

  if (!game) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Game Not Found</h1>
          <Link to="/fixtures">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Fixtures
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const isFinished = game.status === 'finished';
  const homeWins = isFinished && game.homeScore! > game.awayScore!;
  const awayWins = isFinished && game.awayScore! > game.homeScore!;

  return (
    <Layout>
      <div className="container py-8">
        <Link to={isFinished ? '/results' : '/fixtures'} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to {isFinished ? 'Results' : 'Fixtures'}
        </Link>

        {/* Game Header */}
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 mb-6 animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(game.date), 'EEEE, MMMM d, yyyy • HH:mm')}</span>
          </div>

          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Home Team */}
            <Link to={`/teams/${homeTeam?.id}`} className="flex-1 text-center group">
              <div className="mx-auto mb-3 h-20 w-20 md:h-28 md:w-28 overflow-hidden rounded-xl bg-secondary">
                {homeTeam && (
                  <img src={homeTeam.logoUrl} alt={homeTeam.name} className="h-full w-full object-cover" />
                )}
              </div>
              <p className={cn(
                'font-display text-xl md:text-2xl group-hover:text-primary transition-colors',
                homeWins ? 'text-primary' : 'text-foreground'
              )}>
                {homeTeam?.name}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Home</p>
              {isFinished && (
                <p className={cn(
                  'font-display text-5xl md:text-6xl mt-4',
                  homeWins ? 'text-win' : 'text-foreground'
                )}>
                  {game.homeScore}
                </p>
              )}
            </Link>

            {/* VS */}
            <div className="flex-shrink-0 text-center">
              <span className="font-display text-3xl text-muted-foreground">VS</span>
              {!isFinished && (
                <p className="mt-2 rounded-full bg-primary/20 px-3 py-1 text-sm text-primary">
                  Upcoming
                </p>
              )}
            </div>

            {/* Away Team */}
            <Link to={`/teams/${awayTeam?.id}`} className="flex-1 text-center group">
              <div className="mx-auto mb-3 h-20 w-20 md:h-28 md:w-28 overflow-hidden rounded-xl bg-secondary">
                {awayTeam && (
                  <img src={awayTeam.logoUrl} alt={awayTeam.name} className="h-full w-full object-cover" />
                )}
              </div>
              <p className={cn(
                'font-display text-xl md:text-2xl group-hover:text-primary transition-colors',
                awayWins ? 'text-primary' : 'text-foreground'
              )}>
                {awayTeam?.name}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Away</p>
              {isFinished && (
                <p className={cn(
                  'font-display text-5xl md:text-6xl mt-4',
                  awayWins ? 'text-win' : 'text-foreground'
                )}>
                  {game.awayScore}
                </p>
              )}
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{game.venue}</span>
          </div>
        </div>

        {/* Quarter Scores */}
        {isFinished && game.quarterScores && (
          <div className="rounded-xl border border-border bg-card p-6 mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h2 className="font-display text-2xl text-foreground mb-4">Score by Quarter</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Team</th>
                    {game.quarterScores.home.map((_, i) => (
                      <th key={i} className="text-center py-3 px-4 text-muted-foreground font-medium">Q{i + 1}</th>
                    ))}
                    <th className="text-center py-3 px-4 text-foreground font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2 font-medium text-foreground">{homeTeam?.name}</td>
                    {game.quarterScores.home.map((score, i) => (
                      <td key={i} className="text-center py-3 px-4 text-foreground">{score}</td>
                    ))}
                    <td className={cn('text-center py-3 px-4 font-display text-xl', homeWins ? 'text-win' : 'text-foreground')}>
                      {game.homeScore}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-medium text-foreground">{awayTeam?.name}</td>
                    {game.quarterScores.away.map((score, i) => (
                      <td key={i} className="text-center py-3 px-4 text-foreground">{score}</td>
                    ))}
                    <td className={cn('text-center py-3 px-4 font-display text-xl', awayWins ? 'text-win' : 'text-foreground')}>
                      {game.awayScore}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Team Stats Comparison */}
        {stats && (
          <div className="rounded-xl border border-border bg-card p-6 mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="font-display text-2xl text-foreground mb-6">Team Statistics</h2>
            <div className="space-y-5">
              <StatBar label="Points" homeValue={stats.teamStats.homeTeam.points} awayValue={stats.teamStats.awayTeam.points} />
              <StatBar label="Rebounds" homeValue={stats.teamStats.homeTeam.rebounds} awayValue={stats.teamStats.awayTeam.rebounds} />
              <StatBar label="Assists" homeValue={stats.teamStats.homeTeam.assists} awayValue={stats.teamStats.awayTeam.assists} />
              <StatBar label="Steals" homeValue={stats.teamStats.homeTeam.steals} awayValue={stats.teamStats.awayTeam.steals} />
              <StatBar label="Blocks" homeValue={stats.teamStats.homeTeam.blocks} awayValue={stats.teamStats.awayTeam.blocks} />
              <StatBar label="Turnovers" homeValue={stats.teamStats.homeTeam.turnovers} awayValue={stats.teamStats.awayTeam.turnovers} higherIsBetter={false} />
              <StatBar label="FG%" homeValue={stats.teamStats.homeTeam.fgPercentage} awayValue={stats.teamStats.awayTeam.fgPercentage} unit="%" />
              <StatBar label="3P%" homeValue={stats.teamStats.homeTeam.threePercentage} awayValue={stats.teamStats.awayTeam.threePercentage} unit="%" />
              <StatBar label="FT%" homeValue={stats.teamStats.homeTeam.ftPercentage} awayValue={stats.teamStats.awayTeam.ftPercentage} unit="%" />
            </div>
          </div>
        )}

        {/* Player Stats */}
        {stats && stats.playerStats.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h2 className="font-display text-2xl text-foreground mb-6">Player Statistics</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Player</th>
                    <th className="text-center py-3 px-2 text-muted-foreground font-medium">MIN</th>
                    <th className="text-center py-3 px-2 text-muted-foreground font-medium">PTS</th>
                    <th className="text-center py-3 px-2 text-muted-foreground font-medium">REB</th>
                    <th className="text-center py-3 px-2 text-muted-foreground font-medium">AST</th>
                    <th className="text-center py-3 px-2 text-muted-foreground font-medium">STL</th>
                    <th className="text-center py-3 px-2 text-muted-foreground font-medium">BLK</th>
                    <th className="text-center py-3 px-2 text-muted-foreground font-medium">EFF</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.playerStats.map((ps) => {
                    const player = getPlayerById(ps.playerId);
                    return (
                      <tr key={ps.playerId} className="border-b border-border hover:bg-secondary/30">
                        <td className="py-3 px-2">
                          <Link to={`/players/${ps.playerId}`} className="font-medium text-foreground hover:text-primary">
                            {player ? `${player.firstName} ${player.lastName}` : 'Unknown'}
                          </Link>
                        </td>
                        <td className="text-center py-3 px-2 text-muted-foreground">{ps.minutes}</td>
                        <td className="text-center py-3 px-2 text-foreground font-semibold">{ps.points}</td>
                        <td className="text-center py-3 px-2 text-foreground">{ps.rebounds}</td>
                        <td className="text-center py-3 px-2 text-foreground">{ps.assists}</td>
                        <td className="text-center py-3 px-2 text-foreground">{ps.steals}</td>
                        <td className="text-center py-3 px-2 text-foreground">{ps.blocks}</td>
                        <td className="text-center py-3 px-2 text-primary font-semibold">{ps.efficiency}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
