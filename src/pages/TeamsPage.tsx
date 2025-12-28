import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/common/PageHeader';
import { TeamCard } from '@/components/common/TeamCard';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { useData } from '@/contexts/DataContext';

export default function TeamsPage() {
  const { teams, loading } = useData();

  if (loading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <PageHeader
          title="Teams"
          subtitle={`${teams.length} teams competing in the 2024-25 season`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teams.map((team, index) => (
            <div
              key={team.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TeamCard team={team} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
