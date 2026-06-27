"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"customer" | "admin">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (role === "admin") {
      if (!isLogin) {
        setError("Admin registration is not allowed.");
        return;
      }
      if (email === "milti.mondal@gmail.com" && password === "Anish@6290852") {
        router.push("/admin");
      } else {
        setError("Invalid admin credentials.");
      }
    } else {
      // customer login flow
      router.push("/");
    }
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center py-12 px-4 relative">
      <div className="w-full max-w-md relative z-10">
        <motion.div 
          layout
          className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
        >
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {role === "admin" ? "Admin Portal" : isLogin ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {role === "admin" ? "Sign in to access the admin dashboard." : isLogin ? "Enter your details to access your account." : "Sign up to start shopping seamlessly."}
            </p>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button
              onClick={() => { setRole("customer"); setIsLogin(true); setError(""); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${role === "customer" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Customer
            </button>
            <button
              onClick={() => { setRole("admin"); setIsLogin(true); setError(""); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${role === "admin" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Admin
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form 
              key={role + (isLogin ? "login" : "register")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              {error && (
                <div className="bg-rose-50 text-rose-600 px-4 py-3 rounded-xl text-sm font-semibold border border-rose-100 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {error}
                </div>
              )}

              {!isLogin && role === "customer" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Full Name</label>
                  <input type="text" required className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-slate-700" placeholder="John Doe" />
                </div>
              )}
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-slate-700" 
                  placeholder={role === "admin" ? "admin@pureclean.com" : "you@example.com"} 
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
                  {isLogin && (
                    <a href="#" className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors">Forgot password?</a>
                  )}
                </div>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-slate-700" 
                  placeholder="••••••••" 
                />
              </div>

              <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-teal-700 transition-colors mt-2 shadow-sm active:scale-[0.98]">
                {role === "admin" ? "Sign In as Admin" : isLogin ? "Sign In" : "Create Account"}
              </button>

              {role === "customer" && (
                <>
                  <div className="relative flex items-center py-2 mt-2">
                    <div className="flex-grow border-t border-slate-100"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-xs">or continue with</span>
                    <div className="flex-grow border-t border-slate-100"></div>
                  </div>

                  <button type="button" className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 active:scale-[0.98]">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                </>
              )}
            </motion.form>
          </AnimatePresence>

          {role === "customer" && (
            <div className="text-center mt-8">
              <p className="text-sm text-slate-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setError(""); }}
                  className="ml-1.5 text-slate-900 font-bold hover:text-teal-600 transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
