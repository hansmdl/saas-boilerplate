import React from 'react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h2 className="text-xl font-bold">My SaaS</h2>
          </div>
          <nav className="mt-5">
            <a
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200"
            >
              Settings
            </a>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <h1 className="text-lg font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
