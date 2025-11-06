import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Copy, Check, X, ExternalLink } from 'lucide-react';

const ProofModal = ({ isOpen, onClose, agent, zkProof }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatProofHash = (hash) => {
    return `${hash.substring(0, 20)}...${hash.substring(-10)}`;
  };

  if (!isOpen || !agent || !zkProof) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative w-full max-w-md glass rounded-2xl p-8 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-monochrome-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-monochrome-3" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="zk-ring w-16 h-16 mx-auto mb-4 bg-monochrome-0 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-monochrome-4" />
            </div>
            <h2 className="text-2xl font-bold text-monochrome-4 mb-2">ZK Proof Generated</h2>
            <p className="text-sm text-monochrome-3">Agent #{agent.agentId} • Cryptographically Verified</p>
          </div>

          {/* Verification Status */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Proof Verified</span>
              <span className="text-monochrome-3 text-sm">• Zero-Knowledge Validated</span>
            </div>
          </div>

          {/* Proof Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-monochrome-3 mb-2">
                Proof Hash
              </label>
              <div className="flex items-center space-x-2 bg-monochrome-1 rounded-lg p-3">
                <code className="flex-1 text-sm font-mono text-monochrome-4">
                  {formatProofHash(zkProof.proofHash)}
                </code>
                <button
                  onClick={() => copyToClipboard(zkProof.proofHash)}
                  className="p-1 hover:bg-monochrome-2 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-monochrome-3" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-monochrome-3 mb-2">
                Verification Hash
              </label>
              <div className="bg-monochrome-1 rounded-lg p-3">
                <code className="text-sm font-mono text-monochrome-4">
                  {formatProofHash(zkProof.verificationHash)}
                </code>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-monochrome-3 mb-2">
                  Agent ID
                </label>
                <span className="text-monochrome-4 font-mono text-sm">#{agent.agentId}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-monochrome-3 mb-2">
                  Protocol
                </label>
                <span className="text-monochrome-4 text-sm">{agent.protocol}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-monochrome-3 mb-2">
                Generated At
              </label>
              <span className="text-monochrome-4 text-sm font-mono">
                {new Date(zkProof.timestamp).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => copyToClipboard(zkProof.proofHash)}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-monochrome-1 hover:bg-monochrome-2 text-monochrome-4 hover:text-white rounded-lg transition-all duration-200 border border-monochrome-2/50 hover:border-monochrome-4/50"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Proof</span>
                </>
              )}
            </button>
            
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-monochrome-1 hover:bg-monochrome-2 text-monochrome-4 hover:text-white rounded-lg transition-all duration-200 border border-monochrome-2/50 hover:border-monochrome-4/50">
              <ExternalLink className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-monochrome-2/20">
            <p className="text-xs text-monochrome-3">
              This proof ensures data integrity without revealing sensitive information
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProofModal;