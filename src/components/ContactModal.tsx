import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Download, CheckCircle2, Building2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  productContext?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, productContext }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    clinicName: '',
    doctorName: '',
    email: '',
    phone: '',
    inquiryType: productContext || '総合カタログ請求・デモ希望',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#121826] to-[#0a1128] border-2 border-cyan-500/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-cyan-900/30 overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/60 hover:bg-slate-750 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">RAY JAPAN CONTACT & CATALOG</div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>製品資料請求・デモ体験のお申し込み</span>
          </h2>
          <p className="text-slate-300 text-sm mt-1">
            RAY JAPAN（レイメディカル株式会社）専門スタッフが医院様のご要望に合わせて最適な導入プランをご提案します。
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">送信が完了いたしました</h3>
            <p className="text-slate-300 text-sm max-w-md mb-6">
              お問い合わせいただき誠にありがとうございます。担当コンサルタントより、2営業日以内にご連絡差し上げます。
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-2.5 rounded-lg transition-colors"
            >
              閉じる
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">医院名・施設名 <span className="text-rose-400">*</span></label>
                <input 
                  type="text"
                  required
                  placeholder="例: RAY歯科クリニック"
                  value={form.clinicName}
                  onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">ご芳名 <span className="text-rose-400">*</span></label>
                <input 
                  type="text"
                  required
                  placeholder="例: 山田 太郎"
                  value={form.doctorName}
                  onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">メールアドレス <span className="text-rose-400">*</span></label>
                <input 
                  type="email"
                  required
                  placeholder="doctor@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">お電話番号 <span className="text-rose-400">*</span></label>
                <input 
                  type="tel"
                  required
                  placeholder="03-XXXX-XXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">ご希望の項目</label>
              <select
                value={form.inquiryType}
                onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="総合カタログ請求">総合カタログ・製品パンフレット請求</option>
                <option value="RAYFace 実機デモ体験希望">RAYFace 実機デモ体験希望 (訪問またはショールーム)</option>
                <option value="RAY 5D Concept詳細相談">RAY 5D Concept 詳細機能・ガイデッド相談</option>
                <option value="RAY Mill 導入ROI試算">RAY Mill チェアサイドCAD/CAM導入ROI試算</option>
                <option value="RAYSCAN Studio 導入相談">RAYSCAN Studio (フラッグシップ4-in-1) 導入相談</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-300">RAY JAPAN 日本支社</span>: 東京都千代田区
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-lg shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  送信する
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
