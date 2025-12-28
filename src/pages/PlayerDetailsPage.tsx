import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Flag, Ruler, Weight, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const positionNames: Record<string, string> = {
  PG: 'Point Guard',
  SG: 'Shooting Guard',
  SF: 'Small Forward',
  PF: 'Power Forward',
  C: 'Center',
};

export default function PlayerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { getPlayerById, getTeamById, loading } = useData();

  if (loading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  const player = id ? getPlayerById(id) : undefined;
  const team = player ? getTeamById(player.teamId) : undefined;

  if (!player) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Player Not Found</h1>
          <Link to="/players">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Players
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/players" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Players
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 md:p-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-secondary font-display text-5xl text-primary">
                #{player.number}
              </div>
              <div>
                <h1 className="font-display text-4xl md:text-5xl text-foreground">
                  {player.firstName} {player.lastName}
                </h1>
                {team && (
                  <Link to={`/teams/${team.id}`} className="mt-2 inline-block text-primary hover:underline">
                    {team.name}
                  </Link>
                )}
                <p className="text-muted-foreground mt-1">{positionNames[player.position]}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-4">
                <Flag className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Nationality</p>
                  <p className="font-medium text-foreground">{player.nationality}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-4">
                <Ruler className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Height</p>
                  <p className="font-medium text-foreground">{player.height} cm</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-4">
                <Weight className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium text-foreground">{player.weight} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Birth Date</p>
                  <p className="font-medium text-foreground">{format(new Date(player.birthDate), 'MMM d, yyyy')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="rounded-xl border border-border bg-card p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h2 className="font-display text-2xl text-foreground mb-6">Season Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Points Per Game</span>
                <span className="font-display text-2xl text-primary">{player.stats.ppg}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rebounds Per Game</span>
                <span className="font-display text-2xl text-foreground">{player.stats.rpg}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Assists Per Game</span>
                <span className="font-display text-2xl text-foreground">{player.stats.apg}</span>
              </div>
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Efficiency Rating</span>
                  <span className="font-display text-3xl text-primary">{player.stats.efficiency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
