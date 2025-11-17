'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function WalletManager() {
  const [walletBalance, setWalletBalance] = useState(50.5)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const depositInputRef = useRef<HTMLInputElement>(null)
  const withdrawInputRef = useRef<HTMLInputElement>(null)
  const sendAmountInputRef = useRef<HTMLInputElement>(null)
  const sendAddressInputRef = useRef<HTMLInputElement>(null)

  // Reset inputs when modals close
  useEffect(() => {
    if (!showDepositModal && depositInputRef.current) {
      depositInputRef.current.value = ''
    }
  }, [showDepositModal])

  useEffect(() => {
    if (!showWithdrawModal && withdrawInputRef.current) {
      withdrawInputRef.current.value = ''
    }
  }, [showWithdrawModal])

  useEffect(() => {
    if (!showSendModal && sendAmountInputRef.current && sendAddressInputRef.current) {
      sendAmountInputRef.current.value = ''
      sendAddressInputRef.current.value = ''
    }
  }, [showSendModal])

  const handleDeposit = async () => {
    const amount = parseFloat(depositInputRef.current?.value || '0')
    if (!depositInputRef.current?.value || amount <= 0) {
      setStatusMessage('Please enter a valid amount')
      return
    }
    setTransactionStatus('loading')
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setWalletBalance((prev) => prev + amount)
      setShowDepositModal(false)
      setTransactionStatus('success')
      setStatusMessage('Deposit successful!')
      setTimeout(() => setTransactionStatus('idle'), 2500)
    } catch (error) {
      setTransactionStatus('error')
      setStatusMessage('Deposit failed. Please try again.')
      setTimeout(() => setTransactionStatus('idle'), 2500)
    }
  }

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawInputRef.current?.value || '0')
    if (!withdrawInputRef.current?.value || amount <= 0) {
      setStatusMessage('Please enter a valid amount')
      return
    }
    if (amount > walletBalance) {
      setStatusMessage('Insufficient balance')
      return
    }
    setTransactionStatus('loading')
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setWalletBalance((prev) => prev - amount)
      setShowWithdrawModal(false)
      setTransactionStatus('success')
      setStatusMessage('Withdrawal successful!')
      setTimeout(() => setTransactionStatus('idle'), 2500)
    } catch (error) {
      setTransactionStatus('error')
      setStatusMessage('Withdrawal failed. Please try again.')
      setTimeout(() => setTransactionStatus('idle'), 2500)
    }
  }

  const handleSend = async () => {
    const amount = parseFloat(sendAmountInputRef.current?.value || '0')
    const address = sendAddressInputRef.current?.value || ''
    
    if (!sendAmountInputRef.current?.value || amount <= 0) {
      setStatusMessage('Please enter a valid amount')
      return
    }
    if (!address || address.trim() === '') {
      setStatusMessage('Please enter a recipient address')
      return
    }
    if (amount > walletBalance) {
      setStatusMessage('Insufficient balance')
      return
    }
    setTransactionStatus('loading')
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setWalletBalance((prev) => prev - amount)
      setShowSendModal(false)
      setTransactionStatus('success')
      setStatusMessage('Funds sent successfully!')
      setTimeout(() => setTransactionStatus('idle'), 2500)
    } catch (error) {
      setTransactionStatus('error')
      setStatusMessage('Send failed. Please try again.')
      setTimeout(() => setTransactionStatus('idle'), 2500)
    }
  }

  const ModalOverlay = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!isOpen) return null
    return (
      <>
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" 
          onClick={onClose}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div 
            className="relative bg-card border border-border/50 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      <Card className="p-4 sm:p-6 md:p-8 border-border/50 bg-gradient-to-br from-primary/10 to-transparent">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="w-full sm:w-auto">
            <p className="text-muted-foreground text-xs sm:text-sm mb-2">Wallet Balance</p>
            <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-primary">₦{walletBalance.toFixed(2)}</p>
            <p className="text-muted-foreground text-xs mt-1">Nigerian Naira</p>
          </div>
          <div className="flex gap-3 flex-wrap w-full sm:w-auto">
            <Button
              onClick={() => { setShowDepositModal(true); setStatusMessage('') }}
              className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm px-6 py-3 sm:py-2"
            >
              <i className="fas fa-plus mr-2" />
              Add Funds
            </Button>
            <Button
              onClick={() => { setShowWithdrawModal(true); setStatusMessage('') }}
              variant="outline"
              className="flex-1 sm:flex-none border-border hover:border-primary text-xs sm:text-sm px-6 py-3 sm:py-2"
            >
              <i className="fas fa-arrow-down mr-2" />
              Withdraw
            </Button>
            <Button
              onClick={() => { setShowSendModal(true); setStatusMessage('') }}
              variant="outline"
              className="flex-1 sm:flex-none border-border hover:border-primary text-xs sm:text-sm px-6 py-3 sm:py-2"
            >
              <i className="fas fa-paper-plane mr-2" />
              Send
            </Button>
          </div>
        </div>
      </Card>

      {/* Deposit Modal */}
      <ModalOverlay isOpen={showDepositModal} onClose={() => { setShowDepositModal(false); setStatusMessage('') }}>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-plus text-2xl text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Add Funds</h3>
          </div>
          <input
            ref={depositInputRef}
            type="number"
            placeholder="Enter amount in ₦"
            autoFocus
            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm"
            min="0"
            step="0.01"
          />
          <div className="pt-2 space-y-3">
            <Button
              onClick={handleDeposit}
              disabled={transactionStatus === 'loading'}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-semibold text-sm"
            >
              {transactionStatus === 'loading' ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-check mr-2" />
                  Confirm Deposit
                </>
              )}
            </Button>
            <Button
              onClick={() => { setShowDepositModal(false); setStatusMessage('') }}
              variant="outline"
              className="w-full border-border text-sm py-3"
            >
              Cancel
            </Button>
          </div>
          {statusMessage && (
            <p className="text-sm text-red-400 text-center">{statusMessage}</p>
          )}
        </div>
      </ModalOverlay>

      {/* Withdraw Modal */}
      <ModalOverlay isOpen={showWithdrawModal} onClose={() => { setShowWithdrawModal(false); setStatusMessage('') }}>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-arrow-down text-2xl text-yellow-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Withdraw Funds</h3>
          </div>
          <div className="p-4 rounded-lg bg-background border border-border/50">
            <p className="text-sm text-muted-foreground block mb-1">Available Balance</p>
            <p className="text-xl font-bold text-primary">₦{walletBalance.toFixed(2)}</p>
          </div>
          <input
            ref={withdrawInputRef}
            type="number"
            placeholder="Enter amount"
            autoFocus
            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm"
            min="0"
            max={walletBalance}
            step="0.01"
          />
          <div className="pt-2 space-y-3">
            <Button
              onClick={handleWithdraw}
              disabled={transactionStatus === 'loading'}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 font-semibold text-sm"
            >
              {transactionStatus === 'loading' ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-check mr-2" />
                  Confirm Withdrawal
                </>
              )}
            </Button>
            <Button
              onClick={() => { setShowWithdrawModal(false); setStatusMessage('') }}
              variant="outline"
              className="w-full border-border text-sm py-3"
            >
              Cancel
            </Button>
          </div>
          {statusMessage && (
            <p className="text-sm text-red-400 text-center">{statusMessage}</p>
          )}
        </div>
      </ModalOverlay>

      {/* Send Modal */}
      <ModalOverlay isOpen={showSendModal} onClose={() => { setShowSendModal(false); setStatusMessage('') }}>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-paper-plane text-2xl text-blue-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Send Funds</h3>
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-2">Recipient Address</label>
            <input
              ref={sendAddressInputRef}
              type="text"
              placeholder="0x..."
              autoFocus
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm font-mono"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-2">Amount (₦)</label>
            <input
              ref={sendAmountInputRef}
              type="number"
              placeholder="Enter amount"
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm"
              min="0"
              max={walletBalance}
              step="0.01"
            />
          </div>
          <div className="pt-2 space-y-3">
            <Button
              onClick={handleSend}
              disabled={transactionStatus === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold text-sm"
            >
              {transactionStatus === 'loading' ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-check mr-2" />
                  Send Funds
                </>
              )}
            </Button>
            <Button
              onClick={() => { setShowSendModal(false); setStatusMessage('') }}
              variant="outline"
              className="w-full border-border text-sm py-3"
            >
              Cancel
            </Button>
          </div>
          {statusMessage && (
            <p className="text-sm text-red-400 text-center">{statusMessage}</p>
          )}
        </div>
      </ModalOverlay>

      {/* Transaction Status */}
      {transactionStatus === 'success' && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 text-sm flex items-center gap-2 animate-in fade-in">
          <i className="fas fa-check-circle flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}
      {transactionStatus === 'error' && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm flex items-center gap-2 animate-in fade-in">
          <i className="fas fa-exclamation-circle flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}
    </div>
  )
}
