import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import medicalSymbol from '../../medical-symbol.png';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, loading } = useAuth();
  const [, navigate] = useLocation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      setSuccess('Account created successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="landing-font min-h-screen overflow-x-hidden bg-[#f8f9ff] text-[#0b1c30] bg-[radial-gradient(rgb(203,213,225)_1.2px,transparent_1.2px)] [background-size:32px_32px]">
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {/* soft glows */}
        <div className="pointer-events-none absolute top-1/4 left-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12)_0%,rgba(37,99,235,0)_70%)]" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.10)_0%,rgba(16,185,129,0)_70%)]" />

        <div className="relative w-full max-w-[1040px] grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left - Visual */}
          <div className="hidden lg:flex items-stretch">
            <div className="glass-card ambient-shadow rounded-[32px] border border-[rgba(195,198,215,0.35)] overflow-hidden w-full">
              <div className="relative h-full">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1600&q=80"
                  alt="Medical background"
                />
                <div className="absolute inset-0 bg-[#006c49] opacity-55" />
                <div className="relative h-full flex flex-col items-center justify-center p-10 text-center text-white">
                  <h3 className="text-[30px] leading-[1.2] font-bold mb-3">Join MedScan</h3>
                  <p className="text-[16px] leading-[1.5] opacity-90 max-w-sm">
                    Create an account to scan prescriptions and manage orders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Signup Form */}
          <div className="glass-card ambient-shadow rounded-[32px] p-8 sm:p-10 border border-[rgba(195,198,215,0.35)]">
            <div className="flex items-center justify-between mb-8">
              <img
                alt="MedScan Logo"
                className="h-10 w-10 object-contain"
                src={medicalSymbol}
              />
              <span className="text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#434655] opacity-70">
                Create account
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-[30px] leading-[1.2] tracking-[-0.01em] font-bold text-[#0b1c30]">
                Create your account
              </h2>
              <p className="mt-2 text-[16px] leading-[1.5] text-[#434655]">
                Join thousands managing prescriptions digitally.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-[#ffdad6] border border-[rgba(147,0,10,0.20)] rounded-2xl p-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[#93000a]" />
                <span className="text-sm text-[#93000a] font-medium">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-[rgba(0,108,73,0.10)] border border-[rgba(0,108,73,0.18)] rounded-2xl p-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#006c49]" />
                <span className="text-sm text-[#006c49] font-medium">{success}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#434655]">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#737686]" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 bg-white/70 border border-[rgba(195,198,215,0.6)] placeholder:text-[#737686] text-[#0b1c30] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[rgba(37,99,235,0.25)] focus:border-[#2563eb] sm:text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#434655]">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#737686]" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 bg-white/70 border border-[rgba(195,198,215,0.6)] placeholder:text-[#737686] text-[#0b1c30] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[rgba(37,99,235,0.25)] focus:border-[#2563eb] sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#434655]">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#737686]" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 w-full px-4 py-3 bg-white/70 border border-[rgba(195,198,215,0.6)] placeholder:text-[#737686] text-[#0b1c30] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[rgba(37,99,235,0.25)] focus:border-[#2563eb] sm:text-sm"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#737686] hover:text-[#004ac6] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#434655]">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#737686]" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 w-full px-4 py-3 bg-white/70 border border-[rgba(195,198,215,0.6)] placeholder:text-[#737686] text-[#0b1c30] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[rgba(37,99,235,0.25)] focus:border-[#2563eb] sm:text-sm"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#737686] hover:text-[#004ac6] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-6 text-sm font-bold rounded-full text-[#eeefff] bg-[#2563eb] hover:-translate-y-0.5 transition-transform ambient-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center">
              <span className="text-sm text-[#434655]">Already have an account? </span>
              <Link href="/login">
                <span className="font-semibold text-[#004ac6] hover:opacity-80 transition-opacity cursor-pointer">
                  Sign in
                </span>
              </Link>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
