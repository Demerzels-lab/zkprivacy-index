import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Zap, Shield, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/router';

export default function CreateAgent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    protocol: '',
    threshold: '',
    timeframe: '24h'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const protocols = [
    'Axiom Pool-A',
    'Axiom Pool-B', 
    'Yield Optimizer',
    'DEX Aggregator',
    'Arbitrage Scanner',
    'Liquidity Monitor',
    'Bridge Monitor',
    'Position Tracker',
    'Custom Protocol'
  ];

  const timeframes = [
    { value: '1h', label: '1 Hour' },
    { value: '6h', label: '6 Hours' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.protocol || !formData.threshold) {
      setError('Please fill in all required fields');
      return;
    }

    const thresholdValue = parseFloat(formData.threshold);
    if (isNaN(thresholdValue) || thresholdValue <= 0) {
      setError('Threshold must be a positive number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(data);
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setError(data.error || 'Failed to deploy agent');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Head>
          <title>Agent Deployed - ZKWhale.AI</title>
        </Head>

        <div className="min-h-screen bg-monochrome-0 network-grid flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto text-center p-8"
          >
            <div className="zk-ring w-20 h-20 mx-auto mb-6 bg-monochrome-0 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-monochrome-4 mb-4">
              Agent Deployed Successfully!
            </h1>
            
            <p className="text-monochrome-3 mb-6">
              Your AI agent is now active and monitoring {success.agent.protocol}.
            </p>
            
            <div className="glass rounded-xl p-4 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold text-monochrome-4 mb-1">
                  Agent #{success.agent.agentId}
                </div>
                <div className="text-sm text-monochrome-3">
                  Status: Active • ZK Verified
                </div>
              </div>
            </div>
            
            <p className="text-sm text-monochrome-4 mb-6">
              Redirecting to dashboard in 2 seconds...
            </p>
            
            <Link href="/dashboard">
              <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-monochrome-4 text-monochrome-0 rounded-lg hover:bg-monochrome-3 transition-all duration-200">
                <span>View Dashboard</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Deploy Agent - ZKWhale.AI</title>
        <meta name="description" content="Deploy your private AI agent to track whale wallets on Axiom with zero-knowledge verification." />
      </Head>

      <div className="min-h-screen bg-monochrome-0 network-grid">
        {/* Header */}
        <header className="relative z-10 p-6 border-b border-monochrome-2/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-6">
              <Link href="/dashboard">
                <button className="flex items-center space-x-2 text-monochrome-3 hover:text-monochrome-4 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Dashboard</span>
                </button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-monochrome-4 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-monochrome-0" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-monochrome-4">Deploy AI Agent</h1>
                  <p className="text-sm text-monochrome-3">Create a private agent to track whale activity</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 max-w-2xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <div className="zk-ring w-16 h-16 mx-auto mb-4 bg-monochrome-0 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-monochrome-4" />
              </div>
              <h2 className="text-2xl font-bold text-monochrome-4 mb-2">Deploy Private Agent</h2>
              <p className="text-monochrome-3">
                Configure your AI agent to monitor whale wallets with zero-knowledge privacy guarantees.
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Protocol Selection */}
              <div>
                <label className="block text-sm font-medium text-monochrome-4 mb-2">
                  Protocol to Monitor *
                </label>
                <select
                  name="protocol"
                  value={formData.protocol}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-monochrome-1 border border-monochrome-2/20 rounded-lg text-monochrome-4 focus:outline-none focus:ring-2 focus:ring-monochrome-4 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select a protocol</option>
                  {protocols.map((protocol) => (
                    <option key={protocol} value={protocol}>
                      {protocol}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-monochrome-3 mt-1">
                  Choose the Axiom protocol you want to monitor for whale activity.
                </p>
              </div>

              {/* Whale Threshold */}
              <div>
                <label className="block text-sm font-medium text-monochrome-4 mb-2">
                  Whale Threshold (ETH) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="threshold"
                    value={formData.threshold}
                    onChange={handleInputChange}
                    placeholder="e.g., 100"
                    min="0.1"
                    step="0.1"
                    className="w-full px-4 py-3 bg-monochrome-1 border border-monochrome-2/20 rounded-lg text-monochrome-4 focus:outline-none focus:ring-2 focus:ring-monochrome-4 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <span className="absolute right-3 top-3 text-monochrome-3">ETH</span>
                </div>
                <p className="text-xs text-monochrome-3 mt-1">
                  Minimum transaction amount to trigger whale alerts (minimum 0.1 ETH).
                </p>
              </div>

              {/* Time Frame */}
              <div>
                <label className="block text-sm font-medium text-monochrome-4 mb-2">
                  Monitoring Timeframe *
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {timeframes.map((timeframe) => (
                    <button
                      key={timeframe.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, timeframe: timeframe.value }))}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                        formData.timeframe === timeframe.value
                          ? 'bg-monochrome-4 text-monochrome-0 border-monochrome-4'
                          : 'bg-monochrome-1 text-monochrome-3 border-monochrome-2/20 hover:text-monochrome-4 hover:border-monochrome-4/50'
                      }`}
                    >
                      {timeframe.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-monochrome-3 mt-1">
                  How long to monitor whale activity before the agent pauses automatically.
                </p>
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-400 mb-1">Privacy Guaranteed</h4>
                    <p className="text-xs text-monochrome-3">
                      Your agent configuration and monitoring data are protected with zero-knowledge proofs. 
                      No sensitive information is exposed during operation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  loading
                    ? 'bg-monochrome-2 text-monochrome-4 cursor-not-allowed'
                    : 'bg-monochrome-4 text-monochrome-0 hover:bg-monochrome-3 transform hover:scale-105'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-monochrome-4 border-t-transparent rounded-full animate-spin"></div>
                    <span>Deploying Agent...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Deploy Agent</span>
                  </>
                )}
              </button>
            </form>

            {/* Agent Info */}
            <div className="mt-8 pt-6 border-t border-monochrome-2/20">
              <h4 className="text-sm font-medium text-monochrome-4 mb-3">What happens next?</h4>
              <div className="space-y-2 text-xs text-monochrome-3">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-monochrome-3 rounded-full"></div>
                  <span>Agent will be assigned a unique ID</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-monochrome-3 rounded-full"></div>
                  <span>ZK verification system will be activated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-monochrome-3 rounded-full"></div>
                  <span>Real-time monitoring will begin automatically</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-monochrome-3 rounded-full"></div>
                  <span>You'll receive alerts when whale thresholds are met</span>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}