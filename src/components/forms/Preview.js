import React from 'react';

const Preview = (previewData) => {

  const data = previewData.previewData

  return (
    <>
      {Object.keys(data).map(key => ( <div key={key}> <strong>{key}</strong>: {data[key]} </div> )) }
    </>
  );
};

export default Preview