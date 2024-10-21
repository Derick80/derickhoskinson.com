
import React from 'react';
import EvidenceBlock from './evidence-block/evidence-block';
export default async function GeneticsPage () {
  return (
    <div
      className='relative flex flex-col gap-10 w-full'
    >
      <h1>Genetics</h1>
      <p>Genetics Page</p>

      <EvidenceBlock />
    </div>
  );
}


