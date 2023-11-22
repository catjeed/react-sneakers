import React from 'react';
import ContentLoader from 'react-content-loader';

export const CardLoader = () => (
  <ContentLoader
    speed={0}
    width={160}
    height={251}
    viewBox="0 0 160 254"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="165" rx="3" ry="3" width="158" height="15" />
    <rect x="0" y="227" rx="8" ry="8" width="85" height="30" />
    <rect x="125" y="220" rx="8" ry="8" width="33" height="33" />
    <rect x="0" y="0" rx="10" ry="10" width="160" height="140" />
    <rect x="0" y="182" rx="3" ry="3" width="95" height="15" />
  </ContentLoader>
);
