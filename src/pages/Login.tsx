// import React, { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
// import { PinInput } from '@/components/ui/pin-input';

// export const Login = () => {
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: 'admin@example.com',
//     password: 'admin123'
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [loginStep, setLoginStep] = useState<'credentials' | 'mpin'>('credentials');
//   const [mpin, setMpin] = useState('');

//   const handleCredentialLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       await login(formData.email, formData.password);
//       setLoginStep('mpin');
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Invalid credentials');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleMpinComplete = (pin: string) => {
//     setMpin(pin);
//     if (pin.length === 4) {
//       // Simulate MPIN verification
//       setTimeout(() => {
//         if (pin === '1234') {
//           // Complete login process
//           window.location.reload();
//         } else {
//           setError('Invalid MPIN. Please try again.');
//           setMpin('');
//         }
//       }, 500);
//     }
//   };

//   if (loginStep === 'mpin') {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center p-4">
//         <div className="w-full max-w-md">
//           <div className="admin-card p-8 text-center">
//             {/* Logo */}
//             <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
//               <LockClosedIcon className="h-8 w-8 text-primary-foreground" />
//             </div>

//             <h1 className="text-2xl font-bold text-foreground mb-2">Enter MPIN</h1>
//             <p className="text-muted-foreground mb-8">
//               Please enter your 4-digit MPIN to complete login
//             </p>

//             <div className="space-y-6">
//               <div className="flex justify-center">
//                 <PinInput
//                   length={4}
//                   onChange={handleMpinComplete}
//                   type="number"
//                   className="gap-4"
//                 />
//               </div>

//               {error && (
//                 <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
//                   <p className="text-destructive text-sm">{error}</p>
//                 </div>
//               )}

//               <button
//                 onClick={() => setLoginStep('credentials')}
//                 className="text-primary hover:underline text-sm"
//               >
//                 ← Back to email/password
//               </button>
//             </div>

//             <div className="mt-8 pt-6 border-t border-border text-center">
//               <p className="text-xs text-muted-foreground">
//                 Demo MPIN: <strong>1234</strong>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="admin-card p-8">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
//               <span className="text-2xl font-bold text-primary-foreground">A</span>
//             </div>
//             <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
//             <p className="text-muted-foreground mt-2">Sign in to your account</p>
//           </div>

//           <form onSubmit={handleCredentialLogin} className="space-y-6">
//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <UserIcon className="h-5 w-5 text-muted-foreground" />
//                 </div>
//                 <input
//                   id="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <LockClosedIcon className="h-5 w-5 text-muted-foreground" />
//                 </div>
//                 <input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   {showPassword ? (
//                     <EyeSlashIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
//                   ) : (
//                     <EyeIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
//                 <p className="text-destructive text-sm">{error}</p>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
//                   Signing in...
//                 </div>
//               ) : (
//                 'Sign In'
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-6 text-sm text-muted-foreground">
//           <p>© 2024 Admin Panel. All rights reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { PinInput } from '@/components/ui/pin-input';

export const Login = () => {
  const { login } = useAuth();

  // ✅ Use .env values only if mock mode is enabled
  const [formData, setFormData] = useState({
    email:
      import.meta.env.VITE_USE_MOCK_AUTH === 'true'
        ? import.meta.env.VITE_ADMIN_EMAIL || ''
        : '',
    password:
      import.meta.env.VITE_USE_MOCK_AUTH === 'true'
        ? import.meta.env.VITE_ADMIN_PASSWORD || ''
        : '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginStep, setLoginStep] = useState<'credentials' | 'mpin'>('credentials');
  const [mpin, setMpin] = useState('');

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      setLoginStep('mpin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMpinComplete = (pin: string) => {
    setMpin(pin);
    if (pin.length === 4) {
      setTimeout(() => {
        // ✅ Compare against env mock value if mock mode is on
        const mockMpin = import.meta.env.VITE_ADMIN_MPIN || '0000';
        if (
          import.meta.env.VITE_USE_MOCK_AUTH === 'true' &&
          pin === mockMpin
        ) {
          window.location.reload(); // Mock login success
        } else {
          // 🚨 In production, this will fail until backend validates
          setError('Invalid MPIN. Please try again.');
          setMpin('');
        }
      }, 500);
    }
  };

  if (loginStep === 'mpin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="admin-card p-8 text-center">
            {/* Logo */}
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
              <LockClosedIcon className="h-8 w-8 text-primary-foreground" />
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-2">Enter MPIN</h1>
            <p className="text-muted-foreground mb-8">
              Please enter your 4-digit MPIN to complete login
            </p>

            <div className="space-y-6">
              <div className="flex justify-center">
                <PinInput
                  length={4}
                  onChange={handleMpinComplete}
                  type="number"
                  className="gap-4"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={() => setLoginStep('credentials')}
                className="text-primary hover:underline text-sm"
              >
                ← Back to email/password
              </button>
            </div>

            {/* ✅ Only show demo MPIN in mock mode */}
            {import.meta.env.VITE_USE_MOCK_AUTH === 'true' && (
              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">
                  Demo MPIN: <strong>{import.meta.env.VITE_ADMIN_MPIN}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="admin-card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-foreground">A</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleCredentialLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>© 2024 Admin Panel. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
