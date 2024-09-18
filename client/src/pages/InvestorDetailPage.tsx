import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInvestorById, fetchInvestorCommitments } from '../api';
import { Investor, Commitment } from '../types';
import { Filter } from '../components';
import { formatCurrency } from '../utils';

export const InvestorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [filteredCommitments, setFilteredCommitments] = useState<Commitment[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('All');

  useEffect(() => {
    const getInvestorDetails = async () => {
      try {
        if (id) {
          const investorData = await fetchInvestorById(Number(id));
          setInvestor(investorData);

          const commitmentsData = await fetchInvestorCommitments(Number(id));
          setFilteredCommitments(commitmentsData);
          setCommitments(commitmentsData);
        }
      } catch (error: any) {
        console.error(error);
      }
    }

    getInvestorDetails();
  }, [id]);

  const handleFilterChange = (assetClass: string) => {
    setSelectedClass(assetClass);
    if (assetClass === 'All') {
      setFilteredCommitments(commitments);
      return;
    }
    const filtered = commitments.filter(c => c.assetClass === assetClass);
    setFilteredCommitments(filtered);
  };

  if (!investor) return <div>Investor not found</div>;

  return (
    <div className="investor-list-page">
      <h2>Commitments</h2>

      <Filter
        commitments={commitments}
        selectedClass={selectedClass}
        onFilterChange={handleFilterChange}
      />

      <table className='investor-table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Asset Class</th>
            <th>Currency</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredCommitments.map((commitment, idx) => (
            <tr key={idx}>
              <td>{commitment.id}</td>
              <td>{commitment.assetClass}</td>
              <td>{commitment.currency}</td>
              <td>{formatCurrency(commitment.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
