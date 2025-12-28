import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/common/PageHeader';
import { GameCard } from '@/components/common/GameCard';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { useData } from '@/contexts/DataContext';

export default function ResultsPage() {
  const { games, loading, getTeamById } = useData();

  if (loading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  const finishedGames = games
    .filter(g => g.status === 'finished')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Layout>
      <div className="container py-8">
        <PageHeader
          title="Results"
          subtitle={`${finishedGames.length} completed games`}
        />

        {finishedGames.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {finishedGames.map((game, index) => (
              <div
                key={game.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <GameCard
                  game={game}
                  homeTeam={getTeamById(game.homeTeamId)}
                  awayTeam={getTeamById(game.awayTeamId)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">No results available yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
