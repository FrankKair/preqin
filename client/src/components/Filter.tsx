import React from 'react';
import { Commitment } from '../types';
import { getTotalsByAssetClass, formatCurrency } from '../utils';
import '../styles/Filter.css';

type FilterProps = {
  readonly commitments: Commitment[];
  readonly selectedClass: string;
  readonly onFilterChange: (assetClass: string) => void;
};

export const Filter: React.FC<FilterProps> = ({ commitments, selectedClass, onFilterChange }) => {
  const { total, assetValueMap, classes } = getTotalsByAssetClass(commitments);

  return (
    <div className='filter-container'>
      <button
        onClick={() => onFilterChange('All')}
        className={`filter-button ${selectedClass === 'All' ? 'selected' : ''}`}
      >
        All <br /> £{formatCurrency(total)}
      </button>

      {classes.map((assetClass) => (
        <button
          key={assetClass}
          onClick={() => onFilterChange(assetClass)}
          className={`filter-button ${selectedClass === assetClass ? 'selected' : ''}`}
        >
          {assetClass} <br /> £{formatCurrency(assetValueMap[assetClass])}
        </button>
      ))}
    </div>
  );
};
