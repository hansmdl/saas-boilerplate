import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* TODO: Implement Header component */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">SaaS Boilerplate</h1>
          {/* TODO: Add user menu and workspace selector */}
        </div>
      </header>

      <div className="flex flex-1">
        {/* TODO: Implement Sidebar component */}
        <aside className="w-64 bg-gray-900 text-white p-4">
          <nav>
            <ul>
              <li className="mb-2"><a href="#" className="block hover:text-gray-300">Dashboard</a></li>
              <li className="mb-2"><a href="#" className="block hover:text-gray-300">Settings</a></li>
              {/* TODO: Add more navigation items */}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>

      {/* TODO: Implement Footer component */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} SaaS Boilerplate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppLayout;
