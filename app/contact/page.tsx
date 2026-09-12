'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  Building2,
  Clock,
  ArrowRight,
  FileCheck2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [subject, setSubject] = React.useState('Verification Assistance');
  const [message, setMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successResponse, setSuccessResponse] = React.useState<{
    id: string;
    text: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          subject,
          message: message.trim(),
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSuccessResponse({
          id: json.messageId,
          text: json.message,
        });
        // Clear inputs
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setErrorMessage(json.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
      setErrorMessage('Network communication error. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-background bg-dot-grid min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-light text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Kagazo Government PKI &amp; Citizen Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight leading-tight">
            Get in Touch with our Technical Desk
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-main/70 leading-relaxed">
            Have questions about digital signature validation, state revenue certificates, or enterprise API access? Send us your message directly.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Information Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Admin Desk Card */}
            <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center border border-primary/20 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-text-main">Rapid Administrator Response</h2>
              <p className="text-xs text-text-main/70 mt-1 leading-relaxed">
                Messages submitted through this portal go directly to our executive administration inbox. We respond to citizen technical queries within <strong>2 to 4 business hours</strong>.
              </p>

              <div className="mt-5 pt-4 border-t border-surface-darker/60 space-y-2.5 text-xs text-text-main/80">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  <span>Support Desk: <strong>Monday – Saturday (9:00 AM – 7:00 PM IST)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>HQ: <strong>Chennai, Tamil Nadu, India</strong></span>
                </div>
              </div>
            </div>

            {/* Inquiries breakdown */}
            <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-text-main uppercase tracking-wider text-text-main/80">
                Common Inquiries We Assist With
              </h2>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-surface/50">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-text-main">State CA Trust Store Inclusion</strong>
                  <p className="text-text-main/60 mt-0.5 text-[11px]">
                    Need a new state revenue or municipal Sub-CA certificate added to our trust store? Let us know the portal.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-surface/50">
                <Building2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-text-main">Enterprise &amp; High-Volume Batch API</strong>
                  <p className="text-text-main/60 mt-0.5 text-[11px]">
                    Fintech, HR onboarding platforms, and legal verification desks requiring bulk automated certificate audits.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-surface/50">
                <FileCheck2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-text-main">Signature Not Recognized?</strong>
                  <p className="text-text-main/60 mt-0.5 text-[11px]">
                    If a government document gives an unexpected verification outcome, provide the issuing portal details.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Reminder */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong>Privacy Notice:</strong> Do not include unmasked 12-digit Aadhaar numbers or confidential banking passwords in your message. To verify documents securely, use our in-memory verification tool on the homepage.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-10 shadow-soft">
            <h2 className="text-xl font-black text-text-main">Send a Direct Message</h2>
            <p className="text-xs text-text-main/70 mt-1 mb-6">
              Complete the details below. Our team reviews all incoming inquiries daily.
            </p>

            {/* Success Feedback Card */}
            {successResponse && (
              <div className="mb-6 p-5 rounded-2xl bg-success-light border border-success/30 text-success text-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-success" />
                <div>
                  <strong className="text-sm font-bold block mb-1">Message Sent Successfully!</strong>
                  <p className="text-success/90">{successResponse.text}</p>
                  <p className="text-[11px] text-success/75 mt-2 font-mono">
                    Tracking Reference: {successResponse.id}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccessResponse(null)}
                    className="mt-3 text-[11px] font-bold text-success hover:underline"
                  >
                    Send another inquiry &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Error Feedback Card */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-error-light border border-error/30 text-error text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-surface/50 border border-surface-darker focus:border-primary focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-surface/50 border border-surface-darker focus:border-primary focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Subject Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp <span className="text-text-main/50 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-surface/50 border border-surface-darker focus:border-primary focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1.5">
                    Inquiry Topic <span className="text-error">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-surface/50 border border-surface-darker focus:border-primary focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                  >
                    <option value="Verification Assistance">Verification Assistance</option>
                    <option value="API & Enterprise Access">API &amp; Enterprise Access</option>
                    <option value="Add New State Certificate">Add New State Certificate Authority</option>
                    <option value="Billing & Subscription">Billing &amp; Subscription Inquiry</option>
                    <option value="Bug Report or Technical Glitch">Bug Report or Technical Glitch</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1.5">
                  Your Message <span className="text-error">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe your question, document certificate type, or requirement in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-surface/50 border border-surface-darker focus:border-primary focus:bg-white rounded-xl p-3.5 text-xs text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-y leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-bold shadow-md flex items-center justify-center gap-2 py-3"
              >
                {isSubmitting ? (
                  <span>Transmitting Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Admin Desk</span>
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-surface-darker text-center text-[11px] text-text-main/60">
              Need to verify a government PDF right now?{' '}
              <Link href="/#upload-zone" className="text-primary font-bold hover:underline inline-flex items-center gap-1">
                <span>Go to Verification Engine</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
