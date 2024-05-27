import React, { useState, useEffect } from 'react';

export function NFTs({ struct }: { struct: [number, { media: string }][] }) {
  const [nfts, setNfts] = useState<string[]>([]); // Initialize an empty array to store NFTs

  useEffect(() => {
    if (struct) {
      setNfts(struct.map((item) => item[1].media));
    }
  }, [struct]);

  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0 }}>
      {Array.isArray(struct)? (
        struct.map((item, index) => (
          <li key={index} style={{ width: '33.33%', padding: '10px' }}>
            {getMediaComponent(item[1].media, index)}
          </li>
        ))
      ) : (
        <li key="0"></li>
      )}
    </ul>
  );
}

const getMediaComponent = (media: string, index: number) => {
  if (media.endsWith("png")) {
    return (
      <img
        width="120"
        className="img-fluid img-thumbnail"
        alt={"nft"}
        key={index}
        src={media}
      />
    );
  } else if (media.endsWith("pdf")) {
    return (
      <embed
        src={media}
        type="application/pdf"
        key={index}
      />
    );
  } else {
    return <span key={index}>Unsupported media type</span>;
  }
};