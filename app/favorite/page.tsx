import Card from '@/components/Card';
import React from 'react';

type Props = {};

const FavoritesPage: React.FC<Props> = () => {
  return (
    <>
      <div className="flex flex-col space-y-6 max-w-6xl w-full py-5 mx-auto">
        <div className='mx-8'>
          <h2 className='font-semibold text-base'>Your Saved Pictures</h2>
        </div>
        <Card favoritesOnly={true} />
      </div>
    </>
  );
};

export default FavoritesPage;
