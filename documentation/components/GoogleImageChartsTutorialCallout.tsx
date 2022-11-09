import React from 'react';

export default function GoogleImageChartsTutorialCallout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: '#eee',
        padding: '1rem',
        paddingBottom: '0.1rem',
        marginBottom: '1rem',
      }}
    >
      {children}
    </div>
  );
}
