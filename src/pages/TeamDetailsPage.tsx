import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PlayerCard } from '@/components/common/PlayerCard';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';

export default function TeamDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { getTeamById, getPlayersByTeam, loading } = useData();

  if (loading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  const team = id ? getTeamById(id) : undefined;
  const players = id ? getPlayersByTeam(id) : [];

  if (!team) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Team Not Found</h1>
          <Link to="/teams">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Teams
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const winRate = ((team.wins / (team.wins + team.losses)) * 100).toFixed(1);

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/teams" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Teams
        </Link>

        {/* Team Header */}
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-xl bg-secondary flex-shrink-0">
              <img src={team.logoUrl} alt={team.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-4xl md:text-5xl text-foreground">{team.name}</h1>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {team.city}, {team.country}
                </div>
                <div className="flex items-center gap-1.5">
                  <Building className="h-4 w-4" />
                  {team.arena}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Founded {team.founded}
                </div>
              </div>
            </div>
            <div className="flex gap-6 md:gap-8">
              <div className="text-center">
                <p className="font-display text-4xl text-win">{team.wins}</p>
                <p className="text-sm text-muted-foreground">Wins</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl text-loss">{team.losses}</p>
                <p className="text-sm text-muted-foreground">Losses</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl text-primary">{winRate}%</p>
                <p className="text-sm text-muted-foreground">Win Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Roster */}
        <h2 className="font-display text-3xl text-foreground mb-6">Roster ({players.length})</h2>
        {players.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((player, index) => (
              <div
                key={player.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PlayerCard player={player} showTeam={false} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">No players found for this team.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
