import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, AlertTriangle } from 'lucide-react';

const LiveFeed = ({ agents }) => {
  const [feedItems, setFeedItems] = useState([]);

  // Generate new feed items from agent data
  useEffect(() => {
    const generateFeedItems = () => {
      const newItems = agents
        .filter(agent => agent.status === 'active')
        .slice(0, 5)
        .map(agent => {
          const messages = [
            `Agent #${agent.agentId} detected ${agent.amount.toLowerCase()} ${agent.activity.toLowerCase()}`,
            `Agent #${agent.agentId} is monitoring ${agent.protocol} — ${agent.threats ? agent.threats.length : 0} whales active`,
            `Agent #${agent.agentId} flagged ${agent.activity.toLowerCase()} from Whale ${agent.wallet.substring(0, 8)}... — proof ${agent.verificationStatus}`,
            `Agent #${agent.agentId} ${agent.activity.toLowerCase()} — ZK verification ${agent.verificationStatus}`,
            `Agent #${agent.agentId} tracked ${agent.amount.toLowerCase()} movement on ${agent.protocol}`,
          ];
          
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          
          return {
            id: `${agent.agentId}-${Date.now()}`,
            message: randomMessage,
            agentId: agent.agentId,
            timestamp: agent.timestamp,
            verificationStatus: agent.verificationStatus,
            threatLevel: agent.threatLevel,
            type: agent.threatLevel >= 8 ? 'alert' : agent.threatLevel >= 6 ? 'warning' : 'info'
          };
        });

      setFeedItems(prevItems => {
        const combinedItems = [...newItems, ...prevItems];
        return combinedItems.slice(0, 10); // Keep only latest 10 items
      });
    };

    // Generate initial items
    generateFeedItems();

    // Set up interval to generate new items
    const interval = setInterval(generateFeedItems, 4000);

    return () => clearInterval(interval);
  }, [agents]);

  const getIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Activity className="w-4 h-4 text-green-400" />;
    }
  };

  const getItemColor = (type) => {
    switch (type) {
      case 'alert':
        return 'border-l-red-400 bg-red-500/5';
      case 'warning':
        return 'border-l-yellow-400 bg-yellow-500/5';
      default:
        return 'border-l-green-400 bg-green-500/5';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  return (
    <div className="bg-monochrome-0 border border-monochrome-2/20 rounded-2xl p-6 h-96 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-monochrome-4">Live Agent Feed</h3>
          <span className="text-sm text-monochrome-3">({agents.filter(a => a.status === 'active').length} active)</span>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-monochrome-3">
          <Shield className="w-3 h-3" />
          <span>ZK Secured</span>
        </div>
      </div>

      <div className="h-80 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-monochrome-3">
        <AnimatePresence>
          {feedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -20, y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`border-l-4 ${getItemColor(item.type)} p-3 rounded-r-lg glass transition-all duration-300 hover:glass-dark group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getIcon(item.type)}
                  <div className="flex-1">
                    <p className="text-sm text-monochrome-4 group-hover:text-white transition-colors">
                      {item.message}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-monochrome-3 font-mono">
                        #{item.agentId}
                      </span>
                      <span className="text-xs text-monochrome-3">
                        {formatTimeAgo(item.timestamp)}
                      </span>
                      {item.verificationStatus === 'verified' && (
                        <div className="flex items-center space-x-1">
                          <Shield className="w-3 h-3 text-blue-400" />
                          <span className="text-xs text-blue-400">verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.type === 'alert' ? 'bg-red-500/20 text-red-400' :
                    item.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {item.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {feedItems.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-4 bg-monochrome-1 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-monochrome-3" />
            </div>
            <p className="text-monochrome-3">Waiting for agent updates...</p>
            <p className="text-xs text-monochrome-4 mt-2">AI agents are scanning Axiom in real-time</p>
          </div>
        )}
      </div>

      {/* Terminal-style footer */}
      <div className="mt-4 pt-4 border-t border-monochrome-2/20">
        <div className="flex items-center space-x-2 text-xs text-monochrome-3">
          <span className="terminal">$</span>
          <span>zkwhale-ai&gt;</span>
          <span className="animate-pulse">monitoring active agents...</span>
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;