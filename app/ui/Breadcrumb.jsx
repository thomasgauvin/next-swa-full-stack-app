import React from 'react';
import Link from 'next/link'

const Breadcrumb = ({ paths }) => {
  return (
    <div className="text-md text-gray-400 mb-4">
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          {path.url ? (
            <Link href={path.url} className="hover:text-gray-800">{path.name}</Link>
          ) : (
            <span>{path.name}</span>
          )}
          {index !== paths.length - 1 && <span className="mx-2">{'>'}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;