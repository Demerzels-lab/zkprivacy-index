import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Eye, Pause } from 'lucide-react';

const AgentCard = ({ agent, onGenerateProof }) => {
  const getStatusIcon = () => {
    switch (agent.status) {
      case 'active':
        return <Activity className="w-4 h-4 text-green-400" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-400" />;
      case 'private':
        return <Eye className="w-4 h-4 text-blue-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (agent.status) {
      case 'active':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'paused':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'private':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getThreatLevelColor = (level) => {
    if (level >= 8) return 'text-red-400';
    if (level >= 6) return 'text-yellow-400';
    return 'text-green-400';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl p-6 hover:glass-dark transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-sm font-medium capitalize">{agent.status}</span>
          </div>
          <span className="text-monochrome-4 text-sm font-mono">#{agent.agentId}</span>
        </div>
        
        {agent.verificationStatus === 'verified' && (
          <div className="zk-ring w-8 h-8 rounded-full bg-monochrome-0 flex items-center justify-center">
            <Shield className="w-4 h-4 text-monochrome-4" />
          </div>
        )}
      </div>

      {/* Activity Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-monochrome-4 mb-1 group-hover:text-white transition-colors">
            {agent.activity}
          </h3>
          <p className="text-sm text-monochrome-3">
            {agent.protocol} • {agent.amount}
          </p>
        </div>

        {/* Wallet Address */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-monochrome-3">Wallet:</span>
          <code className="text-xs font-mono bg-monochrome-1 px-2 py-1 rounded text-monochrome-4">
            {agent.wallet.substring(0, 10)}...{agent.wallet.substring(-4)}
          </code>
        </div>

        {/* Threats */}
        {agent.threats && agent.threats.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs text-monochrome-3">Threats:</span>
            <div className="flex flex-wrap gap-1">
              {agent.threats.map((threat, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-full border border-red-500/20"
                >
                  {threat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-monochrome-2/20">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-xs text-monochrome-3">Threat Level</p>
              <p className={`text-sm font-semibold ${getThreatLevelColor(agent.threatLevel)}`}>
                {agent.threatLevel}/10
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-monochrome-3">Last Update</p>
              <p className="text-sm font-mono text-monochrome-4">
                {formatTimeAgo(agent.timestamp)}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onGenerateProof(agent)}
            className="px-3 py-1 text-xs bg-monochrome-1 hover:bg-monochrome-2 text-monochrome-4 hover:text-white rounded-lg transition-all duration-200 border border-monochrome-2/50 hover:border-monochrome-4/50"
          >
            Generate ZK Proof
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;