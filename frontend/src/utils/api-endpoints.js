export const apiSections = [
    {
      name: 'Authentication',
      description: 'Secure user authentication to access system features and data.',
      icon: 'fa-solid fa-lock',
      routes: [
        {
          method: 'POST',
          endpoint: '/auth/register',
          description: 'Register a new user.',
          headers: [{ key: 'Content-Type', value: 'multipart/form-data' }],
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
          headers: [{ key: 'Content-Type', value: 'application/json' }],
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
      description: 'Manage members, their details, and associated roles effectively.',
      icon: 'fa-solid fa-users',
      routes: [
        {
          method: 'GET',
          endpoint: '/members',
          description: 'Retrieve all members.',
          headers: [{ key: 'Authorization', value: 'Bearer <JWT>' }],
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
      description: 'Configure system settings like email, timezone, and logos easily.',
      icon: 'fa-solid fa-cog',
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
          headers: [{ key: 'Authorization', value: 'Bearer <JWT>' }],
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
    },
    {
      name: 'Roles',
      description: 'Manage user roles and permissions for system access control.',
      icon: 'fa-solid fa-user-tag',
      routes: [
        {
          method: 'GET',
          endpoint: '/roles',
          description: 'Retrieve all roles.',
          headers: [{ key: 'Authorization', value: 'Bearer <JWT>' }],
          response: {
            success: [{ id: 'number', name: 'string' }],
            error: { error: 'string' }
          }
        },
        {
          method: 'POST',
          endpoint: '/roles',
          description: 'Create a new role.',
          headers: [
            { key: 'Authorization', value: 'Bearer <JWT>' },
            { key: 'Content-Type', value: 'application/json' }
          ],
          body: { name: 'string' },
          response: {
            success: {
              message: 'Role created successfully!',
              role: { id: 'number', name: 'string' }
            },
            error: { error: 'string' }
          }
        },
        {
          method: 'PUT',
          endpoint: '/roles/:id',
          description: 'Update an existing role.',
          headers: [
            { key: 'Authorization', value: 'Bearer <JWT>' },
            { key: 'Content-Type', value: 'application/json' }
          ],
          body: { name: 'string' },
          response: {
            success: {
              message: 'Role updated successfully!',
              role: { id: 'number', name: 'string' }
            },
            error: { error: 'string' }
          }
        },
        {
          method: 'DELETE',
          endpoint: '/roles/:id',
          description: 'Delete a role.',
          headers: [{ key: 'Authorization', value: 'Bearer <JWT>' }],
          response: {
            success: { message: 'Role deleted successfully!' },
            error: { error: 'string' }
          }
        }
      ]
    },
    {
        name: 'Activity Logs',
        description: 'Manage user activity logs within the system.',
        icon: 'fa-solid fa-list-alt',
        routes: [
            {
                method: 'GET',
                endpoint: '/activity-logs',
                description: 'Fetch activity logs',
                headers: [{ key: 'Authorization', value: 'Bearer <JWT>' }],
                response: {
                    logs: [
                        {
                            id: 'number',
                            action: 'string',
                            details: 'string',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: 'Dashboard',
        description: 'Manage dashboard statistics',
        icon: 'fa-solid fa-home',
        routes: [
            {
                method: 'GET',
                endpoint: '/dashboard/stats',
                description: 'Get dashboard statistics',
                headers: [{ key: 'Authorization', value: 'Bearer <JWT>' }],
                response: {
                    stats: {
                        totalMembers: 'number',
                        totalAdmins: 'number',
                    },
                },
            },
        ],
    },
  ];
  