// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar: string;
//   role: 'admin' | 'super-admin';
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   // Check if user was previously logged in
//   const [user, setUser] = useState<User | null>(() => {
//     const savedUser = localStorage.getItem('admin_user');
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const login = async (email: string, password: string) => {
//     // Mock login - in real app, this would make API call
//     if (email === 'admin@example.com' && password === 'admin123') {
//       const userData = {
//         id: '1',
//         name: 'Admin User',
//         email: 'admin@example.com',
//         avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         role: 'admin' as const
//       };
//       setUser(userData);
//       localStorage.setItem('admin_user', JSON.stringify(userData));
//     } else {
//       throw new Error('Invalid credentials');
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('admin_user');
//   };

//   const value = {
//     user,
//     isAuthenticated: !!user,
//     login,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "super-admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("admin_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const useMock = import.meta.env.VITE_USE_MOCK_AUTH === "true";

  const login = async (email: string, password: string) => {
    if (useMock) {
      // 🔹 MOCK LOGIN
      if (
        email === import.meta.env.VITE_ADMIN_EMAIL &&
        password === import.meta.env.VITE_ADMIN_PASSWORD
      ) {
        const userData: User = {
          id: "1",
          name: "Admin User",
          email: import.meta.env.VITE_ADMIN_EMAIL || "admin@example.com",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          role: "admin",
        };
        setUser(userData);
        localStorage.setItem("admin_user", JSON.stringify(userData));
      } else {
        throw new Error("Invalid credentials (mock)");
      }
    } else {
      // 🔹 REAL API LOGIN
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        throw new Error("Invalid credentials (API)");
      }

      const data = await res.json();
      // Backend should return a user + token
      const userData: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        role: data.role,
      };

      setUser(userData);
      localStorage.setItem("admin_user", JSON.stringify(userData));
      localStorage.setItem("token", data.token); // save JWT/token
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
