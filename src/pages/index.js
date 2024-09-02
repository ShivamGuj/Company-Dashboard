import { useEffect, useState } from 'react';
import CompanyCard from '../components/CompanyCard';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch('https://dummy-json.mock.beeceptor.com/companies')
      .then((response) => response.json())
      .then((data) => setCompanies(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 underline">Company Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            showFullDetails={!!session}
          />
        ))}
      </div>
    </div>
  );
}

