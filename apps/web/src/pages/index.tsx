import Link from 'next/link';
import MarketingLayout from '../components/layout/MarketingLayout';

const LandingPage = () => {
  return (
    <MarketingLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Welcome to My SaaS
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            The best solution for all your needs.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
};

export default LandingPage;
