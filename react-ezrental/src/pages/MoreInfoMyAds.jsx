import React from 'react';
import { useParams } from 'react-router-dom';

function MoreInfoMyAds() {
  let {id} = useParams();
  
  return (
    <>
      Mas info de card host {id}
    </>
  );
};

export default MoreInfoMyAds;