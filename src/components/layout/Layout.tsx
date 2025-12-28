import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border bg-card py-6">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Euroleague Browser. All data is for demonstration purposes.
          </p>
        </div>
      </footer>
    </div>
  );
}
