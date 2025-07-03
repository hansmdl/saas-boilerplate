import { AppLayout } from '@/components/layout/AppLayout';

export default function Web() {
  return (
    <AppLayout>
      <h2 className='text-3xl font-bold mb-6'>Dashboard Overview</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* TODO: Replace with actual KPI cards */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold text-gray-700'>Total Users</h3>
          <p className='text-4xl font-bold text-blue-600'>1,234</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold text-gray-700'>Active Subscriptions</h3>
          <p className='text-4xl font-bold text-green-600'>567</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold text-gray-700'>Revenue (MRR)</h3>
          <p className='text-4xl font-bold text-purple-600'>$12,345</p>
        </div>
      </div>

      {/* TODO: Add more dashboard sections like recent activity, charts, etc. */}
      <div className='mt-8 bg-white p-6 rounded-lg shadow-md'>
        <h3 className='text-xl font-semibold text-gray-700 mb-4'>Recent Activity</h3>
        <ul className='list-disc list-inside'>
          <li className='mb-2'>User John Doe signed up.</li>
          <li className='mb-2'>Organization "Acme Corp" upgraded to Pro plan.</li>
          <li className='mb-2'>New invoice #00123 generated for Jane Smith.</li>
          {/* TODO: Fetch and display real activity data */}
        </ul>
      </div>
    </AppLayout>
  );
}
