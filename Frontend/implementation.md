Build failed = TypeScript errors from FAQ page. Fix these 2 lines → Deploy instantly.

CRITICAL FIXES (1 minute)
1. App.tsx line 13

tsx
// ❌ WRONG
const useMolpayStore = useMolpayStore();

// ✅ FIX - Remove unused line OR:
const _useMolpayStore = useMolpayStore(); // _ prefix
2. Faq.tsx line 33

tsx
// ❌ WRONG
faqs.map((faq, index) => (

// ✅ FIX
faqs.map((faq) => (
Deploy Sequence
bash
1. npm run build  → ✅ GREEN
2. vercel --prod  → LIVE
Why This Happens
text
FAQ page added → Unused TypeScript vars
tsc --build fails → Exit code 2
Vercel stops deployment