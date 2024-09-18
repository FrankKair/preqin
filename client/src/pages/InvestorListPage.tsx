import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Commitment, Investor } from '../types';
import { fetchInvestors } from '../api';
import { formatDate, formatCurrency } from '../utils';
import '../styles/InvestorListPage.css';

const totalCommitments = (commitments: Commitment[]) =>
  commitments.reduce((prev, curr) => prev + curr.amount, 0)

export const InvestorListPage: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);

  useEffect(() => {
    const getInvestors = async () => {
      const data = await fetchInvestors();
      setInvestors(data);
    };
    getInvestors();
  }, []);

  return (
    <div className="investor-list-page">
      <h1>Investors</h1>
      <table className="investor-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Date Added</th>
            <th>Address</th>
            <th>Total Commitment</th>
          </tr>
        </thead>
        <tbody>
          {investors.map((investor) => (
            <tr key={investor.id}>
              <td>{investor.id}</td>
              <td>
                <Link to={`/investors/${investor.id}`}>{investor.name}</Link>
              </td>
              <td>{investor.type}</td>
              <td>{formatDate(investor.dateAdded)}</td>
              <td>{investor.country}</td>
              <td>{formatCurrency(totalCommitments(investor.commitments))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
