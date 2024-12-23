import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

const Loading = ({ loading }) => {
  return (
    <div className="text-lg text-center py-6">
      <PacmanLoader
        color="#34D399"
        loading={loading}
        height={25}
        width={3}
        radius={3}
        margin={4}
      />
    </div>
  );
};

export default Loading;
