import React from 'react';
import { useParams } from 'react-router-dom';
import { apiSections } from '../utils/api-endpoints';
import { renderJSON } from '../utils/functions';

const APIDocumentation = () => {
  const { sectionName } = useParams();
  const section = apiSections.find(
    (sec) => sec.name.toLowerCase().replace(/\s+/g, '-') === sectionName
  );

  if (!section) {
    return <p className="text-red-500">Section not found.</p>;
  }

  return (
    <div className="bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">{section.name}</h1>
      {section.routes.map((route, idx) => (
        <div key={idx} className="bg-white shadow p-4 mb-4 rounded">
          <h3 className="text-lg font-bold mb-2">
            <span className="text-blue-500">{route.method}</span> {route.endpoint}
          </h3>
          <p className="mb-2">{route.description}</p>
          {route.headers && (
                <div className="mb-2">
                    <strong>Headers:</strong>
                    <pre style={{ backgroundColor: '#1e1e1e', color: '#dcdcdc', padding: '8px', borderRadius: '4px' }}>
                        {renderJSON(route.headers)}
                    </pre>
                </div>
            )}
            {route.body && (
                <div className="mb-2">
                    <strong>Body:</strong>
                    <pre style={{ backgroundColor: '#1e1e1e', color: '#dcdcdc', padding: '8px', borderRadius: '4px' }}>
                        {renderJSON(route.body)}
                    </pre>
                </div>
            )}
            {route.response && (
                <div>
                    <strong>Response:</strong>
                    <pre style={{ backgroundColor: '#1e1e1e', color: '#dcdcdc', padding: '8px', borderRadius: '4px' }}>
                        {renderJSON(route.response)}
                    </pre>
                </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default APIDocumentation;
