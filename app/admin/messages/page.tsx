'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Mail,
  Phone,
  Check,
  RefreshCw,
  Copy,
  ExternalLink,
  ShieldAlert,
  AlertCircle,
} from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'resolved';
  admin_notes?: string | null;
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = React.useState<ContactMessage[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [filter, setFilter] = React.useState<'all' | 'unread' | 'read' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [isUpdating, setIsUpdating] = React.useState<string | null>(null);

  const loadMessages = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) {
        const json = await res.json();
        if (json.messages) {
          setMessages(json.messages);
        }
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleUpdateStatus = async (id: string, newStatus: 'unread' | 'read' | 'resolved') => {
    setIsUpdating(id);
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    setIsUpdating(id);
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter !== 'all' && msg.status !== filter) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      msg.name.toLowerCase().includes(query) ||
      msg.email.toLowerCase().includes(query) ||
      msg.subject.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query)
    );
  });

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
              Support &amp; Contact Inquiries
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-error-light text-error text-xs font-black">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-text-main/70 mt-1">
            Citizen questions, state CA requests, and enterprise API inquiries received from /contact
          </p>
        </div>

        <button
          type="button"
          onClick={loadMessages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-darker/60 border border-surface-darker text-xs font-bold text-text-main transition-colors shadow-2xs self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-surface-darker/80 rounded-2xl p-4 shadow-sm">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'unread', 'read', 'resolved'] as const).map((tab) => {
            const count =
              tab === 'all'
                ? messages.length
                : messages.filter((m) => m.status === tab).length;
            const isActive = filter === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface hover:bg-surface-darker/60 text-text-main/70 hover:text-text-main'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-surface-darker text-text-main/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl focus:border-primary focus:bg-white focus:outline-none transition-colors"
          />
          <Search className="w-3.5 h-3.5 text-text-main/40 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading && messages.length === 0 ? (
          <div className="bg-white border border-surface-darker/80 rounded-3xl p-12 text-center text-xs text-text-main/50">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
            <span>Loading contact messages...</span>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="bg-white border border-surface-darker/80 rounded-3xl p-12 text-center">
            <MessageSquare className="w-10 h-10 text-text-main/20 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-text-main">No messages found</h3>
            <p className="text-xs text-text-main/60 mt-1">
              {filter === 'all'
                ? 'No contact submissions have been recorded yet.'
                : `No messages currently marked as "${filter}".`}
            </p>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const dateStr = new Date(msg.created_at).toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={msg.id}
                className={`bg-white border rounded-3xl p-5 sm:p-6 shadow-sm transition-all ${
                  msg.status === 'unread'
                    ? 'border-primary/40 ring-1 ring-primary/20'
                    : 'border-surface-darker/80'
                }`}
              >
                {/* Top Row: Sender Info & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary-light text-primary font-black text-sm flex items-center justify-center shrink-0 border border-primary/20">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-text-main">{msg.name}</span>
                        {msg.status === 'unread' && (
                          <span className="px-2 py-0.5 rounded-full bg-error-light text-error text-[10px] font-black uppercase">
                            Unread
                          </span>
                        )}
                        {msg.status === 'resolved' && (
                          <span className="px-2 py-0.5 rounded-full bg-success-light text-success text-[10px] font-bold uppercase">
                            Resolved
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-text-main/60 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span className="font-mono text-[11px]">{msg.email}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.id + '-email', msg.email)}
                            className="hover:text-primary transition-colors ml-0.5"
                            title="Copy email"
                          >
                            {copiedId === msg.id + '-email' ? (
                              <Check className="w-3 h-3 text-success" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </span>

                        {msg.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{msg.phone}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-text-main/50 self-start sm:self-auto font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{dateStr}</span>
                  </div>
                </div>

                {/* Subject & Message Content */}
                <div className="py-4">
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-surface border border-surface-darker text-xs font-bold text-primary mb-2.5">
                    {msg.subject}
                  </div>
                  <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed whitespace-pre-line bg-surface/30 p-3.5 rounded-2xl border border-surface-darker/60 font-medium">
                    {msg.message}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-3 border-t border-surface-darker/60 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {msg.status !== 'resolved' ? (
                      <button
                        type="button"
                        disabled={isUpdating === msg.id}
                        onClick={() => handleUpdateStatus(msg.id, 'resolved')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-success-light text-success hover:bg-success hover:text-white text-xs font-bold transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark as Resolved</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={isUpdating === msg.id}
                        onClick={() => handleUpdateStatus(msg.id, 'read')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface hover:bg-surface-darker/60 text-xs font-bold text-text-main/70 transition-colors"
                      >
                        <span>Re-open / Mark as Read</span>
                      </button>
                    )}

                    {msg.status === 'unread' && (
                      <button
                        type="button"
                        disabled={isUpdating === msg.id}
                        onClick={() => handleUpdateStatus(msg.id, 'read')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface hover:bg-surface-darker/60 text-xs font-bold text-text-main/70 transition-colors"
                      >
                        <span>Mark Read</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id + '-all', `From: ${msg.name} <${msg.email}>\nSubject: ${msg.subject}\n\n${msg.message}`)}
                      className="px-2.5 py-1.5 rounded-xl border border-surface-darker hover:bg-surface text-xs font-semibold text-text-main/70 transition-colors flex items-center gap-1"
                    >
                      {copiedId === msg.id + '-all' ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Details</span>
                    </button>

                    <button
                      type="button"
                      disabled={isUpdating === msg.id}
                      onClick={() => handleDelete(msg.id)}
                      className="p-1.5 rounded-xl hover:bg-error-light hover:text-error text-text-main/40 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
