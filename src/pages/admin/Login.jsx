import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [email, setEmail] = useState('admin@top1.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { checkUserAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await base44.auth.login(email, password);
      await checkUserAuth();
      window.location.href = '/top-1website#author-adminbangladesh$top1';
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian text-silver relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-obsidian mix-blend-multiply" />
      </div>
      
      <div className="z-10 bg-dark-charcoal p-8 rounded-xl border border-steel/20 shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <h1 className="text-2xl font-bold font-mono text-white">TOP-1 Admin</h1>
        </div>
        
        {error && <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-steel mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-obsidian border border-steel/20 rounded-md px-3 py-2 text-silver focus:outline-none focus:border-red-600 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-steel mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-obsidian border border-steel/20 rounded-md px-3 py-2 text-silver focus:outline-none focus:border-red-600 transition-colors"
              required
            />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white mt-4">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}
