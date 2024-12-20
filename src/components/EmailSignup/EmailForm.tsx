import React, { useState } from 'react';
import { SuccessDialog } from './SuccessDialog';

export function EmailForm() {
  const [email, setEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmail('');
        setIsDialogOpen(true);
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      alert('Sorry, something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-[#4A4A4A]/20 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] font-roboto"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#EBCE71] text-[#0F3D38] rounded-lg hover:bg-[#EBCE71]/90 transition-colors font-medium disabled:opacity-50 whitespace-nowrap"
          >
            {isSubmitting ? 'Subscribing...' : 'Notify Me'}
          </button>
        </div>
      </form>

      <SuccessDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </>
  );
}