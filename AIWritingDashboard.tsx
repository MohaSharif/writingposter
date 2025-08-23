import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Lightbulb, Layers3, Fingerprint, ClipboardList, ChevronDown, ChevronUp, Copy, BookOpenCheck, ExternalLink, Shield, PenTool, Images, AudioLines, Settings2, Share2 } from "lucide-react";

// واجهة عربية تفاعلية مستوحاة مباشرة من هيكل الوحدة المرفقة
// أقسام رئيسية: تمهيد + 4 مستويات (أفكار، تطوير النص، تعميق الأسلوب، المراجعة والإخراج)
// كل عنصر يحتوي على وصف ونماذج موجهات جاهزة للنسخ

const SECTION_STYLES = [
  "from-emerald-50 to-emerald-100 border-emerald-200",
  "from-sky-50 to-sky-100 border-sky-200",
  "from-fuchsia-50 to-fuchsia-100 border-fuchsia-200",
  "from-amber-50 to-amber-100 border-amber-200",
];

const Prompt = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1300);
    } catch (e) {}
  };
  return (
    <div className="group relative rounded-xl border bg-white/80 p-3 text-sm leading-7 shadow-sm hover:shadow transition">
      <div className="whitespace-pre-wrap text-gray-800">{text}</div>
      <button onClick={copy} className="absolute -top-2 -left-2 inline-flex items-center gap-1 rounded-full border bg-white px-2 py-1 text-[11px] text-gray-700 shadow hover:bg-gray-50">
        <Copy className="h-3.5 w-3.5" /> {copied ? "تم النسخ" : "انسخ"}
      </button>
    </div>
  );
};

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border bg-white/70 px-2 py-0.5 text-xs text-gray-700">
    {children}
  </span>
);

const LEVELS = [
  {
    id: "intro",
    icon: <Lightbulb className="h-5 w-5" />,
    title: "تمهيد: كيف نستخدم الذكاء الاصطناعي في الكتابة؟",
    colorIndex: 0,
    items: [
      {
        title: "مبادئ الاستخدام الواعي",
        chips: ["الأداة مُعزِّزة", "دور بشري مبكر", "نهج تكراري"],
        description:
          "اعتبر الذكاء الاصطناعي مُسرِّعًا لفكرتك لا بديلًا عنها: ابدأ بالعصف البشري ثم اطلب من الأداة البناء على رؤيتك عبر جولات قصيرة ومتتابعة.",
        prompts: [
          "خطّط المهمة قبل الصياغة: صفّ خطوات الإنجاز أولًا، ثم اطلب من الأداة الكتابة وفق هذا التخطيط.",
          "اكتب قيودك بوضوح: الجمهور، النبرة، الطول، أمثلة مسموحة/ممنوعة، كلمات مفتاحية للأسلوب.",
        ],
      },
      {
        title: "صيغة FITS للموجّهات",
        chips: ["Framework", "Identity", "Task", "Style"],
        description:
          "هيكل (Framework) + هوية (Identity) + مهمة (Task) + أسلوب (Style). أضِف ‘سلسلة التفكير’ لإظهار خطوات التخطيط قبل الكتابة.",
        prompts: [
          "أنت محرر إبداعي (Identity). التزم بإطار ‘بداية-منتصف-نهاية’ (Framework). المهمة: اقتراح 10 أفكار مركّزة (Task). الأسلوب: فصحى بسيطة ونبرة إنسانية (Style). اعرض التفكير قبل الإجابة.",
        ],
      },
    ],
  },
  {
    id: "lvl1",
    icon: <Layers3 className="h-5 w-5" />,
    title: "المستوى 1 — التمهيد وبناء الأفكار الأساسية",
    colorIndex: 0,
    items: [
      {
        title: "اندفاعة الأفكار (Idea Sprint)",
        chips: ["15–20 فكرة", "ترشيح أفضل 3"],
        description:
          "حوِّل موضوعًا عامًا إلى قائمة أفكار متنوعة ثم رشّحها وفق الجِدّة والملاءمة وإمكانية التطوير.",
        prompts: [
          "اقترح 20 فكرة لنص إبداعي قصير حول [الموضوع] لقرّاء [الفئة]. لكل فكرة سطر يجيب: لماذا تستحق القراءة الآن؟",
          "(قصة قصيرة) اكتب 15 لوغلاين تختلف في المكان/الزمن/العقدة، ثم قيّمها من 1–5 على الجِدّة والملاءمة.",
        ],
      },
      {
        title: "الزاوية والخُطّاف (Angle & Hook)",
        chips: ["5 زوايا", "افتتاحيات متنوعة"],
        description:
          "طوّر 5 زوايا معالجة لنفس الفكرة، واكتب لكل زاوية افتتاحيتين بنبرات مختلفة (شخصي/تحليلي/ساخر/محلي/مستقبلي).",
        prompts: [
          "للفكرة: [وصف] ولجمهور [الفئة] اقترح 5 زوايا معالجة، واكتب لكل زاوية 3 جمل افتتاحية قصيرة وقوية بنبرات مختلفة.",
        ],
      },
      {
        title: "مختبر العناوين",
        chips: ["وضوح", "جاذبية", "دِقّة"],
        description:
          "ولّد 10 عناوين ضمن قيود محددة، ثم حرّر العنوان الفائز بصوتك واحتفظ ببديل.",
        prompts: [
          "اقترح 10 عناوين لنص عن [الفكرة/الزاوية] (لغة فصحى، 7–12 كلمة، بلا مبالغة). اذكر مزايا كل عنوان، ثم رشّح 3 نهائية.",
        ],
      },
      {
        title: "من صورة إلى مشهد/فقرة افتتاحية",
        chips: ["مفردات حسّية", "بذرة صراع"],
        description:
          "استخرج مفردات حسّية من صورة، ثم اكتب فقرة افتتاحية توظّف ≥3 مفردات وتُلمّح لصراع.",
        prompts: [
          "استخرج 12 مفردة حسّية (بصر/صوت/رائحة/ملمس/طعم + حالة شعورية) من وصف هذه الصورة: [وصف/رابط]. ثم اكتب فقرة افتتاحية (140 كلمة) توظّف 5 مفردات وتلمّح لبذرة صراع.",
        ],
      },
      {
        title: "أساسيات الموجّهات (RFTI)",
        chips: ["Role", "Format", "Task", "Instructions"],
        description:
          "حدّد الدور والهيئة والمهمة والقيود. أجرِ تكرارين للتجريب ومقارنة الأثر على المخرجات.",
        prompts: [
          "أنت محرّر إبداعي (Role). الهيئة: نقاط مرقّمة (Format). المهمة: أخرج 10 أفكار حول [الموضوع] (Task). القيود: فصحى بسيطة، فكرة واحدة لكل سطر، أضِف سطر ‘لماذا الآن؟’ لكل فكرة (Instructions).",
        ],
      },
      {
        title: "سجلّ الأفكار (Idea Log)",
        chips: ["بطاقات ملكية", "نبرة/كلمات مفتاحية"],
        description:
          "وثّق أفضل 3 أفكار في بطاقات مختصرة لتثبيت الصوت والملكية قبل التطوير.",
        prompts: [
          "أنشئ 3 بطاقات: (1) فكرة بجملة واحدة، (2) الجمهور ولماذا يهتم؟ (3) أفضل خطّاف افتتاحي، (4) 5 كلمات أسلوبية مفتاحية، (5) مصادر/مراجع محتملة.",
        ],
      },
    ],
  },
  {
    id: "lvl2",
    icon: <PenTool className="h-5 w-5" />,
    title: "المستوى 2 — تطوير النصوص وصياغة البنية",
    colorIndex: 1,
    items: [
      {
        title: "خريطة تسلسل الأحداث (Beats → Outline)",
        chips: ["6–8 محطات", "هدف/صراع/انتقال"],
        description:
          "حوِّل الفكرة إلى مخطط من 6–8 محطات، ثم حوّل كل محطة إلى فقرة/مشهد بوضوح الهدف والصراع ونقطة الانتقال.",
        prompts: [
          "للفكرة: [نص] ولجمهور [الفئة] اقترح 3 مخططات بديلة من 7 محطات (افتتاح/محرّض/تصاعد/منعطف/ذروة/انفراج/أثر). لكل محطة: هدف، صراع، انتقال طبيعي.",
        ],
      },
      {
        title: "صوت الشخصية/زاوية الكاتب",
        chips: ["رغبة/عائق", "مونولوج"],
        description:
          "ابنِ بطاقة للشخصية (الرغبة/العائق/الجرح القديم/القرار الأخلاقي…) وأنتج مونولوجًا قصيرًا بصوتها.",
        prompts: [
          "ابنِ بطاقة شخصية من 7 حقول (الظاهر/الرغبة/العائق/الجرح القديم/القيمة المهددة/انحياز لغوي/قرار أخلاقي صعب) لشخصية: [وصف]. ثم اكتب مونولوجًا (100 كلمة) يُظهر الصوت دون تقريرية.",
        ],
      },
      {
        title: "التحرير الأسلوبي والإيقاعي (3 جولات)",
        chips: ["وضوح", "إيقاع", "نبرة"],
        description:
          "مرّر النص على 3 جولات: وضوح (حذف الحشو/أفعال فاعلة) → إيقاع (تنويع طول الجمل) → نبرة (ثبات المعجم).",
        prompts: [
          "حلّل الفقرة التالية على ثلاث جولات: (1) وضوح وإعادة صياغة الجمل الملتبسة، (2) إيقاع: مواضع تقصير/تقطيع وجملة ختام قوية، (3) نبرة: بدائل معجمية تحافظ على صوت الكاتب. أعد النص بثلاث نسخ: محافظة/مكثفة/إيقاعية.",
        ],
      },
    ],
  },
  {
    id: "lvl3",
    icon: <Fingerprint className="h-5 w-5" />,
    title: "المستوى 3 — التعمق وتخصيص الأسلوب",
    colorIndex: 2,
    items: [
      {
        title: "مصفوفة العالم/السياق",
        chips: ["مكان/زمن", "علاقات قوة", "محظورات"],
        description:
          "ابنِ مصفوفة من 10 حقول تُعمّق البيئة الدلالية (قوانين، مفارقات، مفردات حسّية، استعارات متكررة…).",
        prompts: [
          "ابنِ مصفوفة عالم لقصتي: [سطر الفكرة]. لكل حقل (المكان/الزمن/القوانين/علاقات القوة/مفارقات/محظورات/مفردات حسّية/استعارات مكرّرة/تاريخ داخلي/أسئلة مفتوحة) أعطني 2–3 أسطر قابلة للاستخدام، ثم فقرة مشهد افتتاحي توظّف 3 تفاصيل حسّية وتلميحًا اجتماعيًا.",
        ],
      },
      {
        title: "بصمة الأسلوب الشخصي (Style DNA)",
        chips: ["10 قواعد", "تحليل كتاباتك"],
        description:
          "حلّل 400–600 كلمة من كتاباتك لاستخراج خصائص الأسلوب وصُغ 10 قواعد تطبقها في نصوص جديدة.",
        prompts: [
          "حلّل هذا المقتطف لأسلوبي: [نص 400–600 كلمة]. استخرج: خصائص الجمل، الأفعال المفضلة، المعجم العاطفي، الإيقاع والترقيم، ثم صُغ 10 قواعد أسلوبية قابلة للتطبيق وطبّقها في فقرة جديدة (120–150 كلمة).",
        ],
      },
      {
        title: "محاكاة الصوت بأمثلة شخصية (Few‑Shot)",
        chips: ["أمثلةك أنت", "منع المحاكاة البرمجية"],
        description:
          "علّم الأداة صوتك من أمثلةك أنت (لا تقليد مؤلفين آخرين) لإنتاج مسودات أقرب لأسلوبك.",
        prompts: [
          "تعلّم الصوت من الأمثلة التالية (120–150 كلمة × 3) بأسلوبي دون نسخ الجمل. اكتب فقرة جديدة (140 كلمة) عن [موضوع] ملتزمًا بقواعد أسلوبي: [القواعد الـ10] مع قائمة كلمات ممنوعة لا أستخدمها.",
        ],
      },
      {
        title: "تحويل النبرة/النوع",
        chips: ["درامية", "ساخرة", "تشويقية"],
        description:
          "جرّب تبديل النبرة/النوع مع الحفاظ على صوتك (معجم/إيقاع/طول الجمل).",
        prompts: [
          "حوّل الفقرة التالية إلى ثلاث نسخ: درامية/ساخرة/تشويقية (90–110 كلمة لكل نسخة) مع الحفاظ على قواعد أسلوبي العشر. وضّح تحت كل نسخة: ما الذي تغيّر (المعجم/الإيقاع/الطول).",
        ],
      },
      {
        title: "طبقات المعنى (Subtext & Motifs)",
        chips: ["3 موتيفات", "إيحاء خافت"],
        description:
          "أضف عمقًا دلاليًا عبر رموز دقيقة وإشارات غير تصريحية متسقة عبر النص.",
        prompts: [
          "لهذه الثيمة: [مثال: الفقد/التجدد/العدالة] اقترح 3 موتيفات دقيقة (أشياء/ألوان/أصوات) و5 طرق إيحاء غير تصريحي. أعِد صياغة فقرتي بإدماج موتيف واحد فقط بشكل خافت.",
        ],
      },
      {
        title: "القواعد العشر للتأمل الذاتي",
        chips: ["بطاقة فحص", "وضوح/إيقاع/صوت"],
        description:
          "أسئلة نعم/لا لإصلاح سريع: الجملة الذهبية/افتتاح قوي/تنويع/أفعال فاعلة/صور حسّية/نبرة ثابتة…",
        prompts: [
          "حلّل فقرتي عبر بطاقة فحص من 10 أسئلة (فكرة واضحة/افتتاح قوي/تنويع الطول/أفعال فاعلة/لا حشو/صورة حسّية/نبرة ثابتة/انتقالات سلسة/خاتمة مؤثرة). أعطني اقتراحين لإصلاح كل ‘لا’.",
        ],
      },
    ],
  },
  {
    id: "lvl4",
    icon: <ClipboardList className="h-5 w-5" />,
    title: "المستوى 4 — المراجعة والإخراج النهائي",
    colorIndex: 3,
    items: [
      {
        title: "Reverse Outline",
        chips: ["وظيفة كل فقرة", "قرارات حذف/دمج"],
        description:
          "استخرج سطر وظيفة لكل فقرة وتحقق من منطق التسلسل، ثم احذف أو ادمج ما لا يضيف جديدًا.",
        prompts: [
          "استخرج من النص مخططًا عكسيًا (سطر وظيفة لكل فقرة)، واقترح حذف/دمج لتحقيق اقتصاد الأسلوب مع تبرير مختصر لكل قرار.",
        ],
      },
      {
        title: "Two‑Pass Polish",
        chips: ["وضوح ودقة", "إيقاع ونبرة"],
        description:
          "جولتان للتحسين: (1) وضوح/دقة المصطلح، (2) إيقاع/تنويع الطول وجملة أثر في الخاتمة.",
        prompts: [
          "أعد تحرير النص في جولتين وأخرج ثلاث نسخ: محافظة/مكثفة/إيقاعية، ثم رشّح الأنسب لجمهور [الفئة] مع أسباب الاختيار.",
        ],
      },
      {
        title: "Gate التحقق الحقائقي/المنطقي",
        chips: ["قابل للتحقق", "ثبات العالم"],
        description:
          "جدول ادّعاءات قابلة للتحقق/نوع الدليل المطلوب + فحص منطق العالم السردي وثبات الأسماء والأزمنة.",
        prompts: [
          "استخرج العبارات القابلة للتحقق واصنع جدولًا: العبارة/نوع الدليل/ملاحظة. ثم رصد مواطن غموض منطقي أو تضارب داخلي واقترح إصلاحًا.",
        ],
      },
      {
        title: "الأخلاق والأصالة",
        chips: ["إفصاح", "تحيزات", "عدم محاكاة مؤلف"],
        description:
          "اكتب فقرة إفصاح مسؤولة، وافحص تحيزات اللغة وتجنّب المحاكاة المباشرة لأسلوب مؤلف بعينه.",
        prompts: [
          "صُغ فقرة إفصاح: ‘تم الاستعانة بأدوات ذكاء اصطناعي في [عصف/صياغة/تحرير] مع مراجعة بشرية كاملة’. رصد 3 تحيزات ضمنية محتملة واقترح تعديلًا لكل منها.",
        ],
      },
      {
        title: "مرئي + Alt Text",
        chips: ["صورة داعمة", "وصف بديل"],
        description:
          "اختر مرئيًا بسيطًا ومرتبطًا بالنص وأكتب له نصًا بديلًا واضحًا. اذكر ‘مولّد بالذكاء الاصطناعي’ إن كان كذلك.",
        prompts: [
          "أنشئ وصفًا تفصيليًا لمرئي يخدم نصًا عن [الموضوع] (عناصر بسيطة وألوان هادئة)، واكتب Alt Text من سطرين يصف المَن/المكان/الغاية.",
        ],
      },
      {
        title: "مقطع قراءة دقيقة (اختياري)",
        chips: ["نبرة صوت", "توقفات"],
        description:
          "حوّل فقرة إلى نص قراءة دقيقة واحدة بنبرة مضبوطة وتوقفات محسوبة.",
        prompts: [
          "حوّل هذه الفقرة إلى نص قراءة دقيقة واحدة بنبرة [هادئة/حماسية/تأملية]، واقترح مواضع التوقف القصير لضبط الإيقاع.",
        ],
      },
      {
        title: "تنسيق وبيانات وصفية",
        chips: ["عناوين فرعية", "نبذة 50 كلمة", "وسوم"],
        description:
          "هيّئ نسخة نهائية مناسبة للمنصة: عناوين واضحة، نبذة قصيرة، كلمات مفتاحية/وسوم.",
        prompts: [
          "أعد تنسيق النص بعناوين فرعية واضحة، واكتب نبذة 50 كلمة للقارئ، واقترح 5 كلمات مفتاحية/وسوم مناسبة للنشر.",
        ],
      },
      {
        title: "مراجعة الأقران (Peer Review)",
        chips: ["أسئلة مركّزة", "Actionable"],
        description:
          "احصل على 2–3 تقارير مراجعة قصيرة وفق محاور: وضوح/إقناع/أسلوب/ملاءمة، مع قرارات تطبيق.",
        prompts: [
          "قيّم هذا النص لجمهور [الفئة] وفق 4 محاور (الوضوح/الإقناع/الأسلوب/الملاءمة). اكتب اقتراحات عملية ≤ 8 بنود، كل بند في سطر مع سبب مختصر.",
        ],
      },
      {
        title: "مواد الترويج المختصرة",
        chips: ["نبذة 50 كلمة", "3 عناوين", "3 منشورات"],
        description:
          "جهّز مواد تعريفية للنشر: نبذة مركّزة، عناوين بديلة، ومنشورات قصيرة لمنصات مختلفة.",
        prompts: [
          "اكتب نبذة 50 كلمة تلخّص القيمة للقارئ، ثم 3 عناوين بديلة بنبرات (رصين/قصصي/مباشر)، وثلاث منشورات قصيرة (≤35 كلمة) لمنصات مختلفة.",
        ],
      },
    ],
  },
];

function Section({ section, expandedId, setExpandedId }: any) {
  const isOpen = expandedId === section.id;
  const palette = SECTION_STYLES[section.colorIndex % SECTION_STYLES.length];

  return (
    <motion.div layout className={`rounded-2xl border bg-gradient-to-b ${palette} p-4 shadow-sm`}>
      <button
        onClick={() => setExpandedId(isOpen ? null : section.id)}
        className="flex w-full items-center justify-between gap-3 text-right"
      >
        <div className="flex items-center gap-2 text-gray-800">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
            {section.icon}
          </span>
          <h3 className="text-base font-bold leading-snug">{section.title}</h3>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {section.items.map((item: any, idx: number) => (
                <div key={idx} className="rounded-xl border bg-white/90 p-4 shadow-sm">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-extrabold text-gray-900">{item.title}</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.chips?.map((c: string, i: number) => (
                        <Pill key={i}>{c}</Pill>
                      ))}
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-gray-700">{item.description}</p>
                  <div className="space-y-3">
                    {item.prompts?.map((p: string, i: number) => (
                      <Prompt key={i} text={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AIWritingDashboard() {
  const [expandedId, setExpandedId] = useState<string | null>("lvl1");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return LEVELS;
    const k = q.trim();
    return LEVELS.map((sec) => ({
      ...sec,
      items: sec.items.filter((it: any) =>
        [it.title, it.description, ...(it.prompts || [])].join("\n").includes(k)
      ),
    })).filter((sec) => sec.items.length > 0);
  }, [q]);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-6 font-sans text-gray-900">
      <div className="mx-auto max-w-6xl">
        {/* العنوان الرئيسي */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">لوحة الكتابة الإبداعية بالذكاء الاصطناعي</h1>
            <p className="text-sm text-gray-600">رحلة متدرجة: من الفكرة → النص → الأسلوب → الإخراج والنشر</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث داخل التمارين والموجهات…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-xl border bg-white px-10 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {filtered.map((sec) => (
            <Section key={sec.id} section={sec} expandedId={expandedId} setExpandedId={setExpandedId} />
          ))}
        </div>

        {/* تذييل مختصر */}
        <div className="mt-10 rounded-2xl border bg-white p-4 text-xs text-gray-600">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 font-semibold text-gray-800">
              <BookOpenCheck className="h-4 w-4" />
              ملاحظات سريعة
            </span>
            <Pill>RTL</Pill>
            <Pill>Tailwind</Pill>
            <Pill>Framer Motion</Pill>
          </div>
          <ul className="mt-2 list-disc pr-6 leading-7">
            <li>استخدم الأدوات كمُسرّع لا كبديل، وحافظ على صوتك الشخصي دائمًا.</li>
            <li>كرّر على دفعات قصيرة: عصف → مخطط → مسودة → تحرير → مراجعة أقران.</li>
            <li>احفظ الأصالة والأخلاقيات: إفصاح عن استخدام الأدوات ورصد التحيّزات وتجنّب محاكاة مؤلف بعينه.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

