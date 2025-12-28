import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { TeamCard } from '@/components/common/TeamCard';
import { GameCard } from '@/components/common/GameCard';
import { useData } from '@/contexts/DataContext';
import { PageLoader } from '@/components/common/LoadingSpinner';

export default function Index() {
  const { teams, games, loading, getTeamById } = useData();

  if (loading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  const upcomingGames = games.filter(g => g.status === 'upcoming').slice(0, 2);
  const recentResults = games.filter(g => g.status === 'finished').slice(0, 2);
  const topTeams = [...teams].sort((a, b) => (b.wins - b.losses) - (a.wins - a.losses)).slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient border-b border-border">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl animate-slide-up">
            <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              2024-25 Season
            </span>
            <h1 className="font-display text-5xl tracking-wide text-foreground md:text-7xl">
              Euroleague <span className="text-gradient">Basketball</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-2xl">
              Explore teams, players, fixtures, and results from Europe's premier basketball competition.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/teams">
                <Button size="lg" className="gap-2 font-semibold">
                  <Users className="h-5 w-5" />
                  Browse Teams
                </Button>
              </Link>
              <Link to="/fixtures">
                <Button variant="outline" size="lg" className="gap-2">
                  <Calendar className="h-5 w-5" />
                  View Fixtures
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-b border-border bg-card py-6">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <p className="font-display text-4xl text-primary">{teams.length}</p>
              <p className="text-sm text-muted-foreground">Teams</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl text-foreground">150+</p>
              <p className="text-sm text-muted-foreground">Players</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl text-foreground">34</p>
              <p className="text-sm text-muted-foreground">Rounds</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl text-foreground">6</p>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Teams */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              <h2 className="font-display text-3xl text-foreground">Top Teams</h2>
            </div>
            <Link to="/teams" className="flex items-center gap-1 text-sm text-primary hover:underline">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topTeams.map((team, index) => (
              <div key={team.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <TeamCard team={team} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-12 md:py-16 bg-card/50">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Upcoming Games */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-foreground">Upcoming Games</h2>
                <Link to="/fixtures" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingGames.map(game => (
                  <GameCard
                    key={game.id}
                    game={game}
                    homeTeam={getTeamById(game.homeTeamId)}
                    awayTeam={getTeamById(game.awayTeamId)}
                  />
                ))}
              </div>
            </div>

            {/* Recent Results */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-foreground">Recent Results</h2>
                <Link to="/results" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentResults.map(game => (
                  <GameCard
                    key={game.id}
                    game={game}
                    homeTeam={getTeamById(game.homeTeamId)}
                    awayTeam={getTeamById(game.awayTeamId)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center glow-primary">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Manage Your League
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Access the admin panel to add, edit, and manage players in the system.
            </p>
            <Link to="/login">
              <Button size="lg" className="gap-2">
                Admin Login <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
