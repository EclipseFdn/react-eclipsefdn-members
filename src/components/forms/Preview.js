import React from 'react';

const Preview = (previewData) => {

  const data = previewData.previewData

  //Check if has signing auth, if has, hide the signing auth info, and remove the info if has when submitting

  console.log(data)

  return (
    <>
      <h4>Preview</h4>
      <p> Please check the console log </p>
      {/* {Object.keys(data).map(key => ( <div key={key}> <strong>{key}</strong>: {data[key]} </div> )) } */}
    </>
  );
};

export default Preview