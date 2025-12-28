import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/common/PageHeader';
import { GameCard } from '@/components/common/GameCard';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { useData } from '@/contexts/DataContext';

export default function FixturesPage() {
  const { games, loading, getTeamById } = useData();

  if (loading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  const upcomingGames = games
    .filter(g => g.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Layout>
      <div className="container py-8">
        <PageHeader
          title="Fixtures"
          subtitle={`${upcomingGames.length} upcoming games`}
        />

        {upcomingGames.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingGames.map((game, index) => (
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
            <p className="text-muted-foreground">No upcoming fixtures at this time.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
