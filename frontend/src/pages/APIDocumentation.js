import React from 'react';

const APIDocumentation = () => {
    const apiSections = [
        {
          name: 'Authentication',
          routes: [
            {
              method: 'POST',
              endpoint: '/auth/register',
              description: 'Register a new user.',
              headers: [
                { key: 'Content-Type', value: 'multipart/form-data' }
              ],
              body: {
                username: 'string',
                password: 'string',
                name: 'string',
                email: 'string',
                dob: 'YYYY-MM-DD',
                profile_picture: 'file (optional)'
              },
              response: {
                success: {
                  message: 'User and member registered successfully!',
                  user: { id: 'number', username: 'string' },
                  member: { id: 'number', name: 'string', email: 'string' }
                },
                error: { error: 'string' }
              }
            },
            {
              method: 'POST',
              endpoint: '/auth/login',
              description: 'Login with username and password.',
              headers: [
                { key: 'Content-Type', value: 'application/json' }
              ],
              body: {
                username: 'string',
                password: 'string'
              },
              response: {
                success: {
                  token: 'string',
                  user: {
                    id: 'number',
                    username: 'string',
                    email: 'string',
                    role: 'number',
                    name: 'string',
                    photoUrl: 'string (URL)'
                  }
                },
                error: { message: 'string' }
              }
            }
          ]
        },
        {
          name: 'Members',
          routes: [
            {
              method: 'GET',
              endpoint: '/members',
              description: 'Retrieve all members.',
              headers: [
                { key: 'Authorization', value: 'Bearer <JWT>' }
              ],
              response: {
                success: [
                  {
                    id: 'number',
                    name: 'string',
                    email: 'string',
                    dob: 'YYYY-MM-DD',
                    photo: 'string (URL)',
                    user: { username: 'string' },
                    role: { role_name: 'string' }
                  }
                ],
                error: { error: 'string' }
              }
            },
            {
              method: 'POST',
              endpoint: '/members',
              description: 'Create a new member.',
              headers: [
                { key: 'Authorization', value: 'Bearer <JWT>' },
                { key: 'Content-Type', value: 'multipart/form-data' }
              ],
              body: {
                username: 'string',
                password: 'string',
                name: 'string',
                email: 'string',
                dob: 'YYYY-MM-DD',
                profilePicture: 'file (optional)'
              },
              response: {
                success: {
                  message: 'Member created successfully!',
                  member: { id: 'number', name: 'string', email: 'string' }
                },
                error: { error: 'string' }
              }
            }
          ]
        },
        {
          name: 'Settings',
          routes: [
            {
              method: 'POST',
              endpoint: '/control-panel/save',
              description: 'Save system settings.',
              headers: [
                { key: 'Authorization', value: 'Bearer <JWT>' },
                { key: 'Content-Type', value: 'multipart/form-data' }
              ],
              body: {
                websiteName: 'string',
                timezone: 'string',
                systemEmail: 'string',
                systemPhone: 'string',
                favicon: 'file (optional)',
                logo: 'file (optional)'
              },
              response: {
                success: { message: 'Settings saved successfully!' },
                error: { message: 'string' }
              }
            },
            {
              method: 'GET',
              endpoint: '/control-panel/settings',
              description: 'Retrieve system settings.',
              headers: [
                { key: 'Authorization', value: 'Bearer <JWT>' }
              ],
              response: {
                success: {
                  websiteName: 'string',
                  timezone: 'string',
                  systemEmail: 'string',
                  systemPhone: 'string',
                  favicon: 'string (URL)',
                  logo: 'string (URL)'
                },
                error: { message: 'string' }
              }
            }
          ]
        }
      ];
      
      const renderJSON = (json) => {
        if (Array.isArray(json)) {
            return (
                <pre style={{ backgroundColor: '#1e1e1e', color: '#dcdcdc', padding: '16px', borderRadius: '4px' }}>
                    [
                    {json.map((item, index) => (
                        <div key={index} style={{ marginLeft: '16px' }}>
                            {"{"}
                            {Object.entries(item).map(([key, value], idx) => (
                                <div key={idx} style={{ marginLeft: '16px' }}>
                                    <span style={{ color: '#9cdcfe' }}>"{key}"</span>:{" "}
                                    {typeof value === 'object' ? (
                                        renderJSON(value)
                                    ) : (
                                        <span style={{ color: '#ce9178' }}>
                                            {typeof value === 'string' ? `"${value}"` : value}
                                        </span>
                                    )}
                                    {idx < Object.entries(item).length - 1 && ","}
                                </div>
                            ))}
                            {"},"}
                        </div>
                    ))}
                    ]
                </pre>
            );
        } else if (typeof json === 'object' && json !== null) {
            return (
                <pre style={{ backgroundColor: '#1e1e1e', color: '#dcdcdc', padding: '16px', borderRadius: '4px' }}>
                    {"{"}
                    {Object.entries(json).map(([key, value], index) => (
                        <div key={index} style={{ marginLeft: '16px' }}>
                            <span style={{ color: '#9cdcfe' }}>"{key}"</span>:{" "}
                            {typeof value === 'object' ? (
                                renderJSON(value)
                            ) : (
                                <span style={{ color: '#ce9178' }}>
                                    {typeof value === 'string' ? `"${value}"` : value}
                                </span>
                            )}
                            {index < Object.entries(json).length - 1 && ","}
                        </div>
                    ))}
                    {"}"}
                </pre>
            );
        }
        return null;
    };
    
    
    return (
        <div className="bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
            {apiSections.map((section, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{section.name}</h2>
                    {section.routes.map((route, idx) => (
                        <div key={idx} className="bg-white shadow p-4 mb-4 rounded api-section">
                            <h3 className="text-lg font-bold mb-2">
                                <span className="text-blue-500">{route.method}</span> {route.endpoint}
                            </h3>
                            <p className="mb-2">{route.description}</p>
                            {route.headers && (
                                <div className="mb-2">
                                    <strong>Headers:</strong>
                                    <pre style={{ backgroundColor: '#1e1e1e', color: '#dcdcdc', padding: '16px', borderRadius: '4px' }}>
                                        {renderJSON(route.headers)}
                                    </pre>
                                </div>
                            )}
                            {route.body && (
                                <div className="mb-2">
                                    <strong>Body:</strong>
                                    <pre style={{ backgroundColor: '#1e1e1e', color: '#dcdcdc', padding: '16px', borderRadius: '4px' }}>
                                        {renderJSON(route.body)}
                                    </pre>
                                </div>
                            )}
                            {route.response && (
                                <div>
                                    <strong>Response:</strong>
                                    <pre style={{ backgroundColor: '#1e1e1e', color: '#dcdcdc', padding: '16px', borderRadius: '4px' }}>
                                        {renderJSON(route.response)}
                                    </pre>
                                </div>
                            )}
                        </div>                                       
                    ))}
                </div>
            ))}

        </div>
    );
};

export default APIDocumentation;
