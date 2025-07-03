import AppLayout from '../components/layout/AppLayout';

const DashboardPage = () => {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">KPI 1</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">KPI 2</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">5,678</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">KPI 3</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">9,101</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
