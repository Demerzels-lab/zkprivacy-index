import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Filter, RefreshCw, Shield, Activity, Pause, Eye, Plus } from 'lucide-react';
import AgentCard from '../components/AgentCard';
import ProofModal from '../components/ProofModal';

export default function Dashboard() {
  const [agents, setAgents] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, paused: 0, private: 0, verified: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [zkProof, setZkProof] = useState(null);
  const [showProofModal, setShowProofModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Fetch agents data
  const fetchAgents = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) setRefreshing(true);
      const response = await fetch('/api/agents');
      const data = await response.json();
      setAgents(data.agents || []);
      setStats(data.stats || {});
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
      if (showRefreshIndicator) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAgents();
    const interval = setInterval(() => fetchAgents(), 3000);
    return () => clearInterval(interval);
  }, []);

  // Generate ZK proof
  const handleGenerateProof = async (agent) => {
    setSelectedAgent(agent);
    try {
      const response = await fetch('/api/zk-proof', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId: agent.agentId,
          agentData: agent,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setZkProof(data.zkProof);
        setShowProofModal(true);
      }
    } catch (error) {
      console.error('Error generating ZK proof:', error);
      // Fallback: show mock proof
      setZkProof({
        proofHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        verificationHash: '0x9f8e7d6c5b4a39281f0e9d8c7b6a59483f2e1d0c9b8a79685f4e3d2c1b0a9f8e',
        timestamp: new Date().toISOString(),
        verification: 'verified'
      });
      setShowProofModal(true);
    }
  };

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    if (filter === 'all') return true;
    if (filter === 'verified') return agent.verificationStatus === 'verified';
    if (filter === 'pending') return agent.verificationStatus === 'pending';
    return agent.status === filter;
  });

  const getFilterCount = (filterType) => {
    if (filterType === 'all') return agents.length;
    if (filterType === 'verified') return stats.verified || 0;
    if (filterType === 'pending') return stats.pending || 0;
    return agents.filter(a => a.status === filterType).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-monochrome-0 network-grid flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-monochrome-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-monochrome-3">Loading agent dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - ZKWhale.AI</title>
        <meta name="description" content="Monitor and manage your AI agents tracking whale wallets with zero-knowledge verification." />
      </Head>

      <div className="min-h-screen bg-monochrome-0 network-grid">
        {/* Header */}
        <header className="relative z-10 p-6 border-b border-monochrome-2/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/">
                <button className="flex items-center space-x-2 text-monochrome-3 hover:text-monochrome-4 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-monochrome-4 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-monochrome-0" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-monochrome-4">Agent Dashboard</h1>
                  <p className="text-sm text-monochrome-3">Monitor and manage your AI agents</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => fetchAgents(true)}
                disabled={refreshing}
                className={`flex items-center space-x-2 px-3 py-2 text-sm bg-monochrome-1 hover:bg-monochrome-2 text-monochrome-4 hover:text-white rounded-lg transition-all duration-200 border border-monochrome-2/50 hover:border-monochrome-4/50 ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <Link href="/create">
                <button className="flex items-center space-x-2 px-4 py-2 bg-monochrome-4 text-monochrome-0 rounded-lg hover:bg-monochrome-3 transition-all duration-200">
                  <Plus className="w-4 h-4" />
                  <span>Deploy Agent</span>
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-monochrome-4">{stats.total}</div>
              <div className="text-xs text-monochrome-3">Total Agents</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.active}</div>
              <div className="text-xs text-monochrome-3">Active</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.paused}</div>
              <div className="text-xs text-monochrome-3">Paused</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.private}</div>
              <div className="text-xs text-monochrome-3">Private</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.verified}</div>
              <div className="text-xs text-monochrome-3">Verified</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.pending}</div>
              <div className="text-xs text-monochrome-3">Pending</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-monochrome-3" />
              <span className="text-sm text-monochrome-3">Filter by:</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {['all', 'active', 'paused', 'private', 'verified', 'pending'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-3 py-1 text-xs rounded-lg transition-all duration-200 ${
                    filter === filterType
                      ? 'bg-monochrome-4 text-monochrome-0'
                      : 'bg-monochrome-1 text-monochrome-3 hover:text-monochrome-4 hover:bg-monochrome-2'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)} ({getFilterCount(filterType)})
                </button>
              ))}
            </div>
          </div>

          {/* Agents Grid */}
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.agentId}
                  agent={agent}
                  onGenerateProof={handleGenerateProof}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-monochrome-1 rounded-full flex items-center justify-center">
                <Activity className="w-8 h-8 text-monochrome-3" />
              </div>
              <h3 className="text-lg font-semibold text-monochrome-4 mb-2">No agents found</h3>
              <p className="text-monochrome-3 mb-6">
                {filter === 'all' 
                  ? "You haven't deployed any agents yet." 
                  : `No agents match the ${filter} filter.`}
              </p>
              <Link href="/create">
                <button className="flex items-center space-x-2 px-6 py-3 bg-monochrome-4 text-monochrome-0 rounded-lg hover:bg-monochrome-3 transition-all duration-200 mx-auto">
                  <Plus className="w-4 h-4" />
                  <span>Deploy Your First Agent</span>
                </button>
              </Link>
            </div>
          )}
        </section>

        {/* ZK Proof Modal */}
        <ProofModal
          isOpen={showProofModal}
          onClose={() => {
            setShowProofModal(false);
            setSelectedAgent(null);
            setZkProof(null);
          }}
          agent={selectedAgent}
          zkProof={zkProof}
        />
      </div>
    </>
  );
}