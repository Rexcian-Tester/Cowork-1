/* Extra content layered on top of DATA.rev:
   theory[key]  – quick-revision theory sheet (HTML + KaTeX), shown in the "⚡ থিওরি" view
   sols[key][n] – typed step-by-step solution replacing the sheet's solution image
   notes[key][n]– short typed fix for a card whose sheet solution has a broken/missing glyph
   secTheory[key][sectionIndex] – theory anchor linked from a section header
   weak[sub]    – homepage "আরও যত্ন দরকার" list */
(function(){
const R=String.raw;

/* ======================= পরিবেশ রসায়ন ======================= */
const envTheory=R`
<div class="th-toc"><a data-jump="th-ideal">আদর্শ মান</a><a data-jump="th-water">DO · BOD · COD সূত্র</a><a data-jump="th-hard">খরতা</a><a data-jump="th-air">এসিড বৃষ্টি · স্মগ</a><a data-jump="th-ghg">গ্রিনহাউস · ওজোন</a><a data-jump="th-as">আর্সেনিক</a></div>

<section class="ths" id="th-ideal"><h3>১. গ্রহণযোগ্য / আদর্শ মান <small>মুখস্থ</small></h3>
<table class="th-tbl"><tr><th>রাশি</th><th>গ্রহণযোগ্য মান</th></tr>
<tr><td><b>pH</b></td><td>6.5 – 8.5</td></tr>
<tr><td><b>DO</b> (জলজ প্রাণীর জন্য)</td><td>5 – 6 ppm</td></tr>
<tr><td><b>BOD</b> (পানীয় পানি, WHO)</td><td>সর্বোচ্চ 6 ppm</td></tr>
<tr><td><b>COD</b></td><td>সর্বোচ্চ 10 ppm</td></tr>
<tr><td><b>TDS</b> (WHO)</td><td>সর্বোচ্চ 500 ppm</td></tr>
<tr><td><b>EDTA টাইট্রেশনের pH</b></td><td>10 (বাফার, EBT নির্দেশক)</td></tr>
<tr><td><b>As এর TLV</b> (পানীয় পানি)</td><td>0.05 ppm (বাংলাদেশ) · WHO 0.01 ppm</td></tr>
<tr><td><b>স্বাভাবিক বৃষ্টির pH</b></td><td>≈ 5.6 — এর কম হলে এসিড বৃষ্টি</td></tr></table>
<div class="th-key">DO <b>বেশি</b> = ভালো পানি · BOD/COD <b>বেশি</b> = দূষিত পানি · সবসময় <b>COD &gt; BOD</b> (COD সব জারণযোগ্য বস্তু ধরে, BOD শুধু জীবাণু-বিয়োজ্য জৈব বস্তু)।</div>
</section>

<section class="ths" id="th-water"><h3>২. DO · BOD · COD — সূত্র এক নজরে</h3>
<div class="th-f"><b>ppm (পানিতে)</b> $$1\ \text{ppm}=1\ \text{mg/L},\qquad \text{ppm}=M\times(\text{g/mol})\times1000$$</div>
<div class="th-ex"><span class="ex-l">উদাহরণ</span>0.0005 M CaCO₃ দ্রবণ → $0.0005\times100\times1000=50$ ppm</div>
<div class="th-f"><b>Winkler-এর মূল অনুপাত</b> $$\text{O}_2\to2\,\text{MnO(OH)}_2\to2\,\text{I}_2\to4\,\text{S}_2\text{O}_3^{2-}$$
<p>তাই $1\ \text{mol Na}_2\text{S}_2\text{O}_3\equiv\tfrac14\ \text{mol O}_2\equiv 8\ \text{g O}_2$ — এই <b>8</b> সংখ্যাটাই সব সূত্রে ঘুরে আসে।</p></div>
<div class="th-f"><b>DO</b> $$\text{DO (mg/L)}=\frac{V_{\text{thio}}(\text{mL})\times S_{\text{thio}}\times 8\times1000}{V_{\text{নমুনা}}(\text{mL})}$$</div>
<div class="th-ex"><span class="ex-l">উদাহরণ</span>প্রশ্ন ৯৫: 100 mL নমুনা, 0.0114 M থায়োসালফেট 7.5 mL লাগল $$\text{DO}=\frac{7.5\times0.0114\times8\times1000}{100}=6.84\ \text{ppm}$$ 5–6 ppm-এর বেশি → জলজ প্রাণীর জন্য ভালো।</div>
<div class="th-f"><b>BOD</b> (২০°C, অন্ধকারে ৫ দিন) $$\text{BOD}=\text{DO}_{\text{প্রথম দিন}}-\text{DO}_{\text{৫ম দিন}}$$<p>নমুনা লঘু করা হলে পার্থক্যকে $P$ (= নমুনার ভগ্নাংশ) দিয়ে ভাগ করো।</p></div>
<div class="th-ex"><span class="ex-l">উদাহরণ</span>প্রথম দিনে DO = 8 ppm, ৫ দিন পর DO = 3 ppm → BOD = 8 − 3 = 5 ppm (সীমা 6 ppm-এর মধ্যে → গ্রহণযোগ্য)।</div>
<div class="th-f"><b>COD</b> (অম্লীয় K₂Cr₂O₇ দিয়ে জারণ) $$\text{COD}=\frac{(V_1-V_2)\times N\times8\times1000}{V_{\text{নমুনা}}(\text{mL})}$$
<p>$V_1-V_2$ = দুই টাইট্রেশনের থায়োসালফেট আয়তনের পার্থক্য (= খরচ হওয়া অক্সিজেনের সমতুল্য)।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>প্রশ্ন ৯৬: 50 mL নমুনা, 0.015 N থায়োসালফেট — আগে 10 mL, পরে 3.5 mL $$\text{COD}=\frac{(10-3.5)\times0.015\times8\times1000}{50}=15.6\ \text{ppm}$$</div></div>
<div class="th-f"><b>COD ↔ K₂Cr₂O₇ ভর</b> (ইলেকট্রন সমতা) $$\text{Cr}_2\text{O}_7^{2-}\ \text{নেয় }6e^-,\quad \text{O}_2\ \text{নেয় }4e^-\ \Rightarrow\ n(\text{O}_2)=1.5\,n(\text{K}_2\text{Cr}_2\text{O}_7)$$
<p>শর্টকাট: <b>1 g O₂ ≡ 294/48 = 6.125 g K₂Cr₂O₇</b>। যেমন 0.02 g O₂ → 0.02 × 6.125 = 0.1225 g।</p></div>
<div class="th-f"><b>Winkler-এর ৫টি বিক্রিয়া</b> (লিখিত প্রশ্নে পুরোটা আসে)
$$\begin{aligned}&\text{MnSO}_4+2\text{KOH}\to\text{Mn(OH)}_2\downarrow(\text{সাদা})+\text{K}_2\text{SO}_4\\&2\text{Mn(OH)}_2+\text{O}_2\to2\text{MnO(OH)}_2\downarrow(\text{বাদামি})\\&\text{MnO(OH)}_2+2\text{H}_2\text{SO}_4\to\text{Mn(SO}_4)_2+3\text{H}_2\text{O}\\&\text{Mn(SO}_4)_2+2\text{KI}\to\text{MnSO}_4+\text{K}_2\text{SO}_4+\text{I}_2\\&2\text{Na}_2\text{S}_2\text{O}_3+\text{I}_2\to\text{Na}_2\text{S}_4\text{O}_6+2\text{NaI}\end{aligned}$$
<p>বাদামি অধঃক্ষেপ মানেই পানিতে O₂ আছে। নির্দেশক স্টার্চ: নীল → বর্ণহীন হলে শেষবিন্দু। Mn(OH)₂ + O₂ এর উৎপাদ <b>MnO(OH)₂</b> (MnO(OH) নয়)।</p></div>
<div class="th-key"><b>ফাঁদ:</b> সূত্রে নমুনার আয়তন mL-এ বসালে ×1000 লাগে; L-এ বসালে লাগে না। নরমালিটি (N) দেওয়া থাকলে সরাসরি ×8, মোলারিটি দেওয়া থাকলেও থায়োসালফেটের ক্ষেত্রে N = M।</div>
</section>

<section class="ths" id="th-hard"><h3>৩. পানির খরতা</h3>
<div class="th-f"><b>খরতা সবসময় CaCO₃ সমতুল্য ppm-এ</b> $$\text{খরতা (ppm)}=\frac{n(\text{CaCO}_3\ \text{সমতুল্য})}{V(\text{L})}\times100\times1000$$
<p>টাইট্রেশন থেকে mol বের করার নিয়ম: HCl দিয়ে → $n(\text{CaCO}_3)=\tfrac12 n(\text{HCl})$ · Na₂CO₃ দিয়ে → $1:1$ · EDTA দিয়ে → $1:1$ (pH 10)।</p></div>
<div class="th-f"><b>সবচেয়ে দ্রুত সূত্র</b> $$\boxed{\text{খরতা (ppm)}=S\times10^{5}}$$
<p>$S$ = CaCO₃ সমতুল্যের মোলার ঘনমাত্রা (mol/L)। কারণ: $S\times100\ (\text{CaCO}_3\text{-এর মোলার ভর})\times1000\ (\text{g}\to\text{mg})=S\times10^5$।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>প্রশ্ন ১০৩: $S=\dfrac{1.25\times10^{-4}}{0.2}=6.25\times10^{-4}$ M → খরতা $=6.25\times10^{-4}\times10^5=62.5$ ppm<br>প্রশ্ন ৯৭: $S=5\times10^{-4}$ M → $5\times10^{-4}\times10^5=50$ ppm</div></div>
<div class="th-f"><b>লবণের ভর থেকে</b> $$\text{CaCO}_3\ \text{সমতুল্য}=\text{লবণের ভর (mg/L)}\times\frac{100}{\text{লবণের আণবিক ভর}}$$
<p>Ca(HCO₃)₂ = 162 · Mg(HCO₃)₂ = 146 · CaCl₂ = 111 · MgCl₂ = 95 · CaSO₄ = 136 · MgSO₄ = 120</p></div>
<div class="th-ex"><span class="ex-l">উদাহরণ</span>পানিতে 120 mg/L MgSO₄ → $120\times\dfrac{100}{120}=100$ ppm খরতা</div>
<table class="th-tbl"><tr><th></th><th>অস্থায়ী খরতা</th><th>স্থায়ী খরতা</th></tr>
<tr><td>কারণ</td><td>Ca, Mg-এর <b>বাইকার্বনেট</b></td><td>Ca, Mg-এর <b>ক্লোরাইড ও সালফেট</b></td></tr>
<tr><td>দূর করা</td><td>ফুটিয়ে: $\text{Ca(HCO}_3)_2\xrightarrow{\Delta}\text{CaCO}_3\downarrow+\text{H}_2\text{O}+\text{CO}_2$<br>ক্লার্ক পদ্ধতি (চুন): $\text{Ca(HCO}_3)_2+\text{Ca(OH)}_2\to2\text{CaCO}_3\downarrow+2\text{H}_2\text{O}$</td><td>সোডা দিয়ে: $\text{CaCl}_2+\text{Na}_2\text{CO}_3\to\text{CaCO}_3\downarrow+2\text{NaCl}$<br>আয়ন বিনিময় / পারমুটিট</td></tr></table>
<div class="th-key"><b>ফাঁদ (তোমার ভুল ৯৭):</b> 36.5 হলো HCl-এর মোলার ভর, উত্তর নয়। খরতায় গুণ করতে হয় <b>CaCO₃-এর 100</b> দিয়ে।</div>
</section>

<section class="ths" id="th-air"><h3>৪. এসিড বৃষ্টি · স্মগ · দূষক</h3>
<div class="th-f"><b>সালফারের উৎস</b> (তোমার ভুল ১০৭) — (i) জীবাশ্ম জ্বালানি (কয়লা, তেল) পোড়ানো: বিদ্যুৎকেন্দ্র, কারখানা, যানবাহন; (ii) সালফাইড আকরিকের তাপজারণ (ধাতু নিষ্কাশন) ও আগ্নেয়গিরি।
$$\text{S}+\text{O}_2\to\text{SO}_2;\quad 2\text{SO}_2+\text{O}_2\to2\text{SO}_3;\quad \text{SO}_3+\text{H}_2\text{O}\to\text{H}_2\text{SO}_4;\quad \text{SO}_2+\text{H}_2\text{O}\to\text{H}_2\text{SO}_3$$</div>
<div class="th-f"><b>নাইট্রোজেনের উৎস: NO₂</b> — বজ্রপাত (≈3000°C) ও ইঞ্জিনের উচ্চ তাপ।
$$\text{N}_2+\text{O}_2\to2\text{NO};\quad 2\text{NO}+\text{O}_2\to2\text{NO}_2;\quad 4\text{NO}_2+\text{O}_2+2\text{H}_2\text{O}\to4\text{HNO}_3$$
<p>বজ্রপাত → প্রোটিন: HNO₃ মাটিতে নাইট্রেট লবণ বানায় ($\text{CaO}+2\text{HNO}_3\to\text{Ca(NO}_3)_2+\text{H}_2\text{O}$) → উদ্ভিদ NO₃⁻ শোষণ করে প্রোটিন বানায় → প্রাণী উদ্ভিদ খেয়ে প্রাণিজ প্রোটিন পায়।</p></div>
<div class="th-f"><b>এসিড বৃষ্টির ক্ষতি</b> — মার্বেল/চুনাপাথর ক্ষয় ($\text{CaCO}_3+\text{H}_2\text{SO}_4\to\text{CaSO}_4+\text{H}_2\text{O}+\text{CO}_2$, “স্টোন ক্যান্সার”), মাটির পুষ্টি ধুয়ে যাওয়া, মাছ মারা যাওয়া, ধাতু ক্ষয়।</div>
<table class="th-tbl"><tr><th>প্রাইমারি দূষক</th><th>সেকেন্ডারি দূষক</th></tr>
<tr><td>সরাসরি নির্গত: CO, SO₂, NO, হাইড্রোকার্বন, অ্যালডিহাইড, কিটোন</td><td>বায়ুতে বিক্রিয়ায় তৈরি: O₃, <b>PAN</b>, H₂SO₄, HNO₃</td></tr></table>
<div class="th-f"><b>আলোক-রাসায়নিক স্মগ ও PAN</b> (তোমার ভুল ১১৫) — গ্রীষ্ম, রোদ, গাড়ির ধোঁয়া (NOₓ + হাইড্রোকার্বন)।
$$\begin{aligned}&\text{NO}_2\xrightarrow{h\nu}\text{NO}+\text{O};\quad \text{O}+\text{O}_2\to\text{O}_3\\&\text{CH}_3\text{COCH}_3\xrightarrow{h\nu}\text{CH}_3^{\bullet}+\text{CH}_3\text{CO}^{\bullet}\\&\text{CH}_3\text{CO}^{\bullet}+\text{O}_2\to\text{CH}_3\text{C(O)OO}^{\bullet}\\&\text{CH}_3\text{C(O)OO}^{\bullet}+\text{NO}_2\to\text{CH}_3\text{C(O)OONO}_2\ (\text{PAN})\end{aligned}$$
<p>PAN = পারঅক্সি অ্যাসিটাইল নাইট্রেট। লন্ডন/ক্লাসিক্যাল স্মগ = SO₂ + ধোঁয়া + কুয়াশা (শীতকাল)।</p></div>
<div class="th-f"><b>সংক্ষিপ্ত রূপ</b> — ETP: Effluent Treatment Plant · TDS: Total Dissolved Solids · DO: Dissolved Oxygen · BOD: Biochemical Oxygen Demand · COD: Chemical Oxygen Demand · TLV: Threshold Limiting Value · PAN: Peroxy Acetyl Nitrate · CFC: Chlorofluorocarbon · ppm/ppb: parts per million/billion (গ্যাসে আয়তন হিসেবে, $1\ \text{ppb}=10^{-9}$)।</div>
</section>

<section class="ths" id="th-ghg"><h3>৫. গ্রিনহাউস প্রভাব ও ওজোন স্তর</h3>
<div class="th-f"><b>কীভাবে হয়:</b> সূর্যের ক্ষুদ্র তরঙ্গদৈর্ঘ্যের আলো বায়ুমণ্ডল ভেদ করে আসে → পৃথিবী দীর্ঘ তরঙ্গের <b>অবলোহিত (IR)</b> বিকিরণ ছাড়ে → গ্রিনহাউস গ্যাস তা শোষণ করে আটকে রাখে → তাপমাত্রা বাড়ে। ফল: বরফ গলা, সমুদ্রপৃষ্ঠ উঁচু হওয়া (বাংলাদেশের উপকূল ডুবে যাওয়ার ঝুঁকি)।</div>
<table class="th-tbl"><tr><th>গ্যাস (প্রাচুর্যের ক্রমে)</th><th>শতকরা অবদান</th><th>গ্লোবাল ওয়ার্মিং ক্ষমতা</th></tr>
<tr><td>CO₂</td><td>50%</td><td>1 (তুলনার মান)</td></tr>
<tr><td>CH₄</td><td>≈ 19%</td><td>≈ 21–25</td></tr>
<tr><td>CFC</td><td>16%</td><td>≈ 15000</td></tr>
<tr><td>O₃</td><td>≈ 8%</td><td>—</td></tr>
<tr><td>N₂O</td><td>5%</td><td>270</td></tr></table>
<p class="muted">পাঁচটির নাম (তোমার ভুল ১১২-খ): <b>CO₂, CH₄, CFC, O₃, N₂O</b>। বইভেদে শতকরা মান সামান্য আলাদা (CUET MCQ: CO₂ 49%, N₂O 6%, CFC 14%) — ক্রমটা মনে রাখাই আসল।</p>
<div class="th-f"><b>CFC দিয়ে ওজোন ক্ষয়</b> (শিকল বিক্রিয়া; একটি Cl প্রায় 10⁵ টি O₃ ভাঙে)
$$\text{CF}_2\text{Cl}_2\xrightarrow{h\nu}\text{CF}_2\text{Cl}^{\bullet}+\text{Cl}^{\bullet};\quad \text{Cl}^{\bullet}+\text{O}_3\to\text{ClO}^{\bullet}+\text{O}_2;\quad \text{ClO}^{\bullet}+\text{O}\to\text{Cl}^{\bullet}+\text{O}_2$$</div>
</section>

<section class="ths" id="th-as"><h3>৬. আর্সেনিক</h3>
<div class="th-f"><b>বিষাক্ততার ক্রম</b> $$\text{AsH}_3\ (\text{আর্সিন})>\text{AsO}_2^-\ (\text{আর্সেনাইট})>\text{As}_2\text{O}_3>\text{AsO}_3^{3-}$$
<p>নিয়ম: আর্সিন সবচেয়ে বিষাক্ত; As(III) যৌগ As(V)-এর চেয়ে বেশি বিষাক্ত।</p></div>
<div class="th-f"><b>ভূগর্ভে আর্সেনিক আসে কীভাবে</b> (জারণ তত্ত্ব) — পানির স্তর নামলে বাতাস ঢুকে আর্সেনিকযুক্ত সালফাইড খনিজ জারিত হয় (তোমার ভুল ১১১):
$$\text{As}_2\text{S}_3+7\text{O}_2+6\text{H}_2\text{O}\to2\text{H}_3\text{AsO}_4+3\text{H}_2\text{SO}_4$$
$$4\text{FeAsS}+13\text{O}_2+6\text{H}_2\text{O}\to4\text{FeSO}_4+4\text{H}_3\text{AsO}_4$$
<p>সমতা মেলানোর কৌশল: As₂S₃-এ As ও S গুনে আগে ডান দিক (2H₃AsO₄ + 3H₂SO₄), তারপর H দিয়ে H₂O (6টি), শেষে O গুনে O₂ (7টি)।</p></div>
<div class="th-f"><b>জৈব মিথাইলেশন</b> (তোমার ভুল ১১২-ক) — মিথাইল ব্যাকটেরিয়া ধাপে ধাপে CH₃ যোগ করে:
$$\text{H}_3\text{AsO}_3\to\text{CH}_3\text{As(OH)}_2\text{O}\to(\text{CH}_3)_2\text{As(OH)O}\to(\text{CH}_3)_2\text{AsH}$$
<p>আর্সেনাস এসিড → মিথাইল আর্সনিক এসিড → ডাইমিথাইল আর্সিনিক এসিড → ডাইমিথাইল আর্সিন।</p></div>
<div class="th-f"><b>TLV</b> = Threshold Limiting Value: দূষকের যে সর্বোচ্চ মাত্রা পার হলে পরিবেশ ও জীবের ক্ষতি হয়। <b>As: 0.05 ppm</b> (বাংলাদেশ), WHO 0.01 ppm। রোগ: আর্সেনিকোসিস (মেলানোসিস, কেরাটোসিস, ক্যান্সার)।</div>
</section>`;

/* ======================= ম্যাট্রিক্স ও নির্ণায়ক ======================= */
const matTheory=R`
<div class="th-toc"><a data-jump="th-basic">মৌলিক সূত্র</a><a data-jump="th-prop">নির্ণায়কের ধর্ম</a><a data-jump="th-frame">৪ ধাপের ফ্রেমওয়ার্ক</a><a data-jump="th-pat">৮টি প্যাটার্ন</a><a data-jump="th-eq">det = 0 সমীকরণ</a><a data-jump="th-cramer">ক্রেমার ও বিপরীত</a><a data-jump="th-mist">তোমার ভুলগুলো</a></div>

<section class="ths" id="th-basic"><h3>১. মৌলিক সূত্র <small>এগুলো ভুল হলে বাকি সব ভুল</small></h3>
<div class="th-f"><b>২×২</b> $$\begin{vmatrix}a&b\\c&d\end{vmatrix}=ad-bc$$</div>
<div class="th-ex"><span class="ex-l">উদাহরণ</span>$\begin{vmatrix}3&5\\2&4\end{vmatrix}=3\cdot4-5\cdot2=12-10=2$</div>
<div class="th-f"><b>৩×৩, প্রথম সারি বরাবর বিস্তার</b> — চিহ্নের দাবাবোর্ড মুখস্থ: $\begin{smallmatrix}+&-&+\\-&+&-\\+&-&+\end{smallmatrix}$
$$\begin{vmatrix}a_1&b_1&c_1\\a_2&b_2&c_2\\a_3&b_3&c_3\end{vmatrix}=a_1\begin{vmatrix}b_2&c_2\\b_3&c_3\end{vmatrix}-b_1\begin{vmatrix}a_2&c_2\\a_3&c_3\end{vmatrix}+c_1\begin{vmatrix}a_2&b_2\\a_3&b_3\end{vmatrix}$$
<p><b>অনুরাশি (Minor) $M_{ij}$</b> = i-তম সারি ও j-তম কলাম কেটে বাকি নির্ণায়ক। <b>সহগুণক (Cofactor)</b> $C_{ij}=(-1)^{i+j}M_{ij}$ — অর্থাৎ অনুরাশি × দাবাবোর্ডের চিহ্ন। মাঝের পদে <b>বিয়োগ</b> চিহ্ন সবচেয়ে বেশি ভুল হয়।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>$$\begin{vmatrix}1&2&3\\0&4&5\\1&0&6\end{vmatrix}=1(4\cdot6-5\cdot0)-2(0\cdot6-5\cdot1)+3(0\cdot0-4\cdot1)$$ $$=24-2(-5)+3(-4)=24+10-12=22$$ এখানে $C_{12}=-\begin{vmatrix}0&5\\1&6\end{vmatrix}=-(0-5)=5$ — মাইনাস চিহ্নটা খেয়াল করো।</div></div>
<div class="th-f"><b>সহগুণকের দুই সূত্র</b> (প্রশ্ন ১৮)
$$a_1A_1+b_1B_1+c_1C_1=\Delta\qquad\text{কিন্তু}\qquad a_2A_1+b_2B_1+c_2C_1=0$$
<p>নিজের সারির সহগুণক দিয়ে গুণ করে যোগ = Δ; <b>অন্য</b> সারির সহগুণক দিয়ে গুণ করে যোগ = 0 (কারণ তখন দুটি সমান সারির নির্ণায়ক তৈরি হয়)।</p></div>
<div class="th-f"><b>ম্যাট্রিক্স-নির্ণায়কের সূত্র</b> (n×n)
$$|kA|=k^{n}|A|,\quad |AB|=|A||B|,\quad |A^{T}|=|A|,\quad |A^{-1}|=\frac1{|A|},\quad |\text{adj}A|=|A|^{\,n-1}$$
<p>$|A|=0$ হলে A <b>ব্যতিক্রমী (singular)</b> — বিপরীত নেই। কর্ণ/ত্রিভুজাকার ম্যাট্রিক্সের নির্ণায়ক = কর্ণের ভুক্তিগুলোর গুণফল।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>3×3 ম্যাট্রিক্সে $|A|=5$ হলে $|2A|=2^3\times5=40$, $|A^{-1}|=\frac15$, $|\text{adj}A|=5^{2}=25$</div></div>
<div class="th-f"><b>বিপরীত</b> $$A^{-1}=\frac{\text{adj}A}{|A|},\qquad \begin{bmatrix}a&b\\c&d\end{bmatrix}^{-1}=\frac1{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix},\qquad \text{diag}(p,q)^{-1}=\text{diag}\!\left(\tfrac1p,\tfrac1q\right)$$
<p>adj A = সহগুণক ম্যাট্রিক্সের <b>ট্রান্সপোজ</b> (সারির সহগুণক কলামে বসে)।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>$\begin{bmatrix}2&1\\5&3\end{bmatrix}^{-1}=\dfrac{1}{6-5}\begin{bmatrix}3&-1\\-5&2\end{bmatrix}=\begin{bmatrix}3&-1\\-5&2\end{bmatrix}$ — কর্ণ অদলবদল, অন্য দুটির চিহ্ন উল্টো।</div></div>
</section>

<section class="ths" id="th-prop"><h3>২. নির্ণায়কের ধর্ম — প্রতিটা কোথায় কাজে লাগে</h3>
<table class="th-tbl"><tr><th>ধর্ম</th><th>কাজে লাগে যখন</th><th>উদাহরণ</th></tr>
<tr><td>সারি ↔ কলাম বদলালে মান একই ($|A^T|=|A|$)</td><td>সারিতে যা করা যায়, কলামেও তা করা যায়</td><td>$\begin{vmatrix}1&2\\3&4\end{vmatrix}=\begin{vmatrix}1&3\\2&4\end{vmatrix}=-2$</td></tr>
<tr><td>দুটি সারি/কলাম অদলবদল → চিহ্ন বদলায়</td><td>সাজাতে গিয়ে চিহ্ন ভুলো না</td><td>$\begin{vmatrix}3&4\\1&2\end{vmatrix}=6-4=+2$ (আগে ছিল −2)</td></tr>
<tr><td>দুটি সারি/কলাম <b>সমান বা সমানুপাতিক</b> → মান 0</td><td>“প্রমাণ কর = 0”; log-প্রশ্ন (২১); প্রশ্ন ২৪</td><td>$\begin{vmatrix}1&2\\2&4\end{vmatrix}=4-4=0$</td></tr>
<tr><td>কোনো সারি/কলামের <b>সাধারণ উৎপাদক</b> বাইরে আনা যায়</td><td>প্রথমেই! abc, xyz, (a+b+c) বের করো</td><td>$\begin{vmatrix}2&4\\3&5\end{vmatrix}=2\begin{vmatrix}1&2\\3&5\end{vmatrix}=2(-1)=-2$</td></tr>
<tr><td>$R_i\to R_i+kR_j$ করলে মান <b>বদলায় না</b></td><td>শূন্য তৈরির মূল অস্ত্র</td><td>$R_2\to R_2-3R_1$: $\begin{vmatrix}1&2\\3&4\end{vmatrix}=\begin{vmatrix}1&2\\0&-2\end{vmatrix}=-2$</td></tr>
<tr><td>কোনো কলামের ভুক্তি দুই পদের যোগ হলে দুই নির্ণায়কে ভাঙা যায়</td><td>প্রশ্ন ৩৩ (F(x+h) − F(x))</td><td>$\begin{vmatrix}1+2&5\\3+1&7\end{vmatrix}=\begin{vmatrix}1&5\\3&7\end{vmatrix}+\begin{vmatrix}2&5\\1&7\end{vmatrix}=-8+9=1$</td></tr>
<tr><td>কোনো সারি/কলামের সব ভুক্তি 0 → মান 0</td><td>MCQ-তে মান বসিয়ে দ্রুত যাচাই</td><td>$\begin{vmatrix}0&0\\5&7\end{vmatrix}=0$</td></tr>
<tr><td>ত্রিভুজাকার নির্ণায়ক = কর্ণের গুণফল</td><td>শূন্য বানানোর পর সরাসরি গুণ (প্রশ্ন ২৫)</td><td>$\begin{vmatrix}2&5&7\\0&3&1\\0&0&4\end{vmatrix}=2\cdot3\cdot4=24$</td></tr></table>
<div class="th-key"><b>সাবধান:</b><br>$R_i\to kR_i$ (একটা সারিকে k দিয়ে গুণ) করলে মান k গুণ হয়ে যায়। যেমন $R_1\to 2R_1$: $\begin{vmatrix}2&4\\3&4\end{vmatrix}=-4$, মূল মান $-2$-এর দ্বিগুণ। নিরাপদ নিয়ম: যে সারি/কলাম <b>বদলাচ্ছ</b> তাকে গুণ কোরো না, শুধু অন্যটার গুণিতক যোগ/বিয়োগ করো।</div>
</section>

<section class="ths" id="th-frame"><h3>৩. কঠোর ৪ ধাপের ফ্রেমওয়ার্ক <small>প্রতিটা নির্ণায়ক প্রশ্নে এই ক্রমে</small></h3>
<ol class="th-steps">
<li><b>দেখো (১০ সেকেন্ড):</b> কোনো সারি/কলামে সাধারণ উৎপাদক আছে? সব সারির (বা কলামের) যোগফল কি সমান? ১, a, a² ধরনের সারি আছে? একটা কলাম কি অন্যগুলোর মিশ্রণ? → নিচের ৮ প্যাটার্নের কোনটা চেনো।</li>
<li><b>বের করো:</b> সাধারণ উৎপাদক আগে বাইরে আনো (abc, xyz, 2(a+b+c)…)। এতে ভুক্তি ছোট হয়।</li>
<li><b>শূন্য বানাও:</b><br>$C_1\to C_1-C_2,\ C_2\to C_2-C_3$ (বা সারিতে) করে একটা সারি/কলামে <b>দুটি শূন্য</b> আনো। প্রতিটি ভুক্তি আলাদা লাইনে হিসাব করো — মাথায় নয়।</li>
<li><b>বিস্তার ও গুছাও:</b> যে সারিতে দুটি শূন্য, সেটা বরাবর বিস্তার করো (চিহ্ন দাবাবোর্ড থেকে) → ২×২ → উৎপাদকে ভাঙো (a²−b² = (a−b)(a+b) ইত্যাদি)।</li></ol><div class="th-ex"><span class="ex-l">উদাহরণ</span><b>ফ্রেমওয়ার্ক ধরে একটা পুরো প্রশ্ন:</b> $\begin{vmatrix}1&1&1\\2&3&4\\4&9&16\end{vmatrix}=?$
<p><b>১. দেখো:</b> সারি ১ = (1, 1, 1), সারি ২ = (2, 3, 4), সারি ৩ = বর্গ → P3 (ভ্যান্ডারমন্ড), a = 2, b = 3, c = 4।</p>
<p><b>২. বের করো:</b> কোনো সাধারণ উৎপাদক নেই → পরের ধাপ।</p>
<p><b>৩. শূন্য বানাও:</b> $C_1\to C_1-C_2$: $(0,\ -1,\ -5)$<br>$C_2\to C_2-C_3$: $(0,\ -1,\ -7)$</p>
$$\begin{vmatrix}0&0&1\\-1&-1&4\\-5&-7&16\end{vmatrix}$$
<p><b>৪. বিস্তার:</b> সারি ১-এ শুধু (1,3) = 1, চিহ্ন + → $\begin{vmatrix}-1&-1\\-5&-7\end{vmatrix}=7-5=2$</p>
<p><b>যাচাই:</b> সূত্রে $(a-b)(b-c)(c-a)=(-1)(-1)(2)=2$ ✓</p></div>
<div class="th-key"><b>MCQ-র গোপন অস্ত্র — মান বসাও:</b> x = y = z = 1 বা a = 1, b = 2, c = 3, বা a = b = 0 বসিয়ে নির্ণায়ক আর অপশন দুটোই হিসাব করো। প্রশ্ন ২২-এ a = b = 0 বসালে নির্ণায়ক = 1, শুধু (1+a²+b²)³ = 1 মেলে — ৫ সেকেন্ডে উত্তর!</div>
</section>

<section class="ths" id="th-pat"><h3>৪. ৮টি বারবার আসা প্যাটার্ন <small>তোমার শিটের প্রশ্ন থেকে</small></h3>

<div class="th-p"><div class="th-ph"><span>P1</span> সব সারির যোগফল সমান → সব কলাম যোগ করো</div>
<p><b>চেনার উপায়:</b> প্রতিটি সারির ভুক্তি যোগ করলে একই রাশি আসে (যেমন 2(a+b+c))। <b>কাজ:</b><br>$C_1\to C_1+C_2+C_3$ → প্রথম কলামে সব একই → বাইরে আনো → $R_2-R_1,\ R_3-R_1$।</p>
<p>উদাহরণ (প্রশ্ন ২৫): সারির যোগ = 2(a+b+c) $$\begin{vmatrix}a+b+2c&a&b\\c&b+c+2a&b\\c&a&c+a+2b\end{vmatrix}=2s\begin{vmatrix}1&a&b\\0&s&0\\0&0&s\end{vmatrix}=2s^3,\ s=a+b+c$$ একই কৌশল প্রশ্ন ২৮ (সারির বদলে কলামের যোগ সমান → $R_1+R_2+R_3$)।</p></div>

<div class="th-p"><div class="th-ph"><span>P2</span> “x+y, x, y” ধরন → C₁ − (C₂ + C₃)</div>
<p><b>চেনার উপায়:</b> প্রথম কলামের ভুক্তি = বাকি দুই কলামের যোগফল ± কিছু। <b>কাজ:</b><br>$C_1\to C_1-C_2-C_3$ → প্রথম কলামে 0 আর −2z জাতীয় সরল পদ।</p>
<p>উদাহরণ: প্রশ্ন ১৯ (= 4xyz), প্রশ্ন ৩০ (xyz বের করার পর একই ধরন, = 4x²y²z²)।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>$\begin{vmatrix}5&2&3\\4&1&3\\7&3&4\end{vmatrix}$ — প্রতিটি সারিতে প্রথম ভুক্তি = বাকি দুটির যোগ (5 = 2+3, 4 = 1+3, 7 = 3+4)। $C_1\to C_1-C_2-C_3$ করলে প্রথম কলাম $(0,0,0)$ → মান <b>0</b>, কোনো হিসাব ছাড়াই।</div></div>

<div class="th-p"><div class="th-ph"><span>P3</span> ১, a, a² (ভ্যান্ডারমন্ড) → পাশাপাশি কলাম বিয়োগ</div>
<p><b>কাজ:</b><br>$C_1\to C_1-C_2,\ C_2\to C_2-C_3$ → প্রথম সারি (0, 0, 1) → (a−b), (b−c) বাইরে → ২×২। ফলগুলো মুখস্থ রাখো:</p>
$$\begin{vmatrix}1&1&1\\a&b&c\\a^2&b^2&c^2\end{vmatrix}=(a-b)(b-c)(c-a)$$
$$\begin{vmatrix}1&1&1\\a&b&c\\a^3&b^3&c^3\end{vmatrix}=(a-b)(b-c)(c-a)(a+b+c),\qquad \begin{vmatrix}a&b&c\\a^2&b^2&c^2\\a^3&b^3&c^3\end{vmatrix}=abc(a-b)(b-c)(c-a)$$
<p>প্রশ্ন ২৪, ২৬, ২৭, ৩২, ৩৬ — সব এই এক ছাঁচের।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>$\begin{vmatrix}1&1&1\\1&2&3\\1&4&9\end{vmatrix}$: a = 1, b = 2, c = 3 → $(a-b)(b-c)(c-a)=(-1)(-1)(2)=2$</div></div>

<div class="th-p"><div class="th-ph"><span>P4</span> প্রতিটি কলামে আলাদা উৎপাদক → আগে বের করো</div>
<p>প্রশ্ন ২৬: a, b, c; প্রশ্ন ৩০: x, y, z; প্রশ্ন ৯: x। বের না করলে বীজগণিত তিনগুণ লম্বা হয়।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>$\begin{vmatrix}2&3\\4&9\end{vmatrix}$: C₁ থেকে 2, C₂ থেকে 3 বের করি → $6\begin{vmatrix}1&1\\2&3\end{vmatrix}=6(3-2)=6$। সরাসরি: $18-12=6$ ✓</div></div>

<div class="th-p"><div class="th-ph"><span>P5</span> একটা কলাম = অন্য কলামের মিশ্রণ → সেটা বিয়োগ করে দাও</div>
<p>প্রশ্ন ৩১: তৃতীয় কলাম (ax+by, bx+cy) = x·(প্রথম কলাম) + y·(দ্বিতীয় কলাম)। তাই $C_3\to C_3-xC_1-yC_2$ → উপরের দুটি ভুক্তি 0।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>$\begin{vmatrix}1&2&5\\3&4&11\\1&1&3\end{vmatrix}$: দেখো $C_3=C_1+2C_2$ (5 = 1+4, 11 = 3+8, 3 = 1+2)। $C_3\to C_3-C_1-2C_2$ → তৃতীয় কলাম $(0,0,0)$ → মান <b>0</b>।</div></div>

<div class="th-p"><div class="th-ph"><span>P6</span> log / একই পরিবর্তন সব সারিতে → দুটি কলাম সমানুপাতিক → 0</div>
<p>$\log 2x-\log 2y=\log\frac{x}{y}$ — প্রতিটি সারিতে একই। প্রশ্ন ২১: কলাম বিয়োগে দুটি ধ্রুব কলাম → সমানুপাতিক → মান 0। MCQ-তে x = y = z = 1 বসালে প্রথম সারিই 0।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>$\begin{vmatrix}1&2&3\\2&3&4\\3&4&5\end{vmatrix}$: $C_2-C_1=(1,1,1)$ এবং $C_3-C_2=(1,1,1)$ → দুটি কলাম সমান → মান <b>0</b>। (প্রতিটি সারি সমান্তর ধারা হলেই এমন হয়।)</div></div>

<div class="th-p"><div class="th-ph"><span>P7</span> ω (এককের ঘনমূল)</div>
<p>$\omega^3=1,\ \omega^4=\omega,\ 1+\omega+\omega^2=0$। বিস্তারের পর প্রতিটি ঘাতকে 3 দিয়ে ভাগশেষে নামাও। প্রশ্ন ২০: মান −4 — চিহ্ন বাদ দিলে 4 আসে, তাই অপশন (a) ফাঁদ।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>$\begin{vmatrix}1&\omega&\omega^2\\\omega&\omega^2&1\\\omega^2&1&\omega\end{vmatrix}$: $R_1\to R_1+R_2+R_3$ → প্রতিটি ভুক্তি $1+\omega+\omega^2=0$ → শূন্য সারি → মান <b>0</b>।</div></div>

<div class="th-p"><div class="th-ph"><span>P8</span> 1+x, 1, 1 ধরন</div>
$$\begin{vmatrix}1+x&1&1\\1&1+y&1\\1&1&1+z\end{vmatrix}=xyz+xy+yz+zx=xyz\left(1+\tfrac1x+\tfrac1y+\tfrac1z\right)$$
<p>প্রশ্ন ৩৪: এটা = 0 হলে $\frac1x+\frac1y+\frac1z=-1$।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>x = y = z = 1: $\begin{vmatrix}2&1&1\\1&2&1\\1&1&2\end{vmatrix}=4$, আর সূত্রে $xyz+xy+yz+zx=1+1+1+1=4$ ✓</div></div>
<div class="th-key">আরও দুটি মুখস্থ ফল: প্রশ্ন ২২-এর $\begin{vmatrix}1+a^2-b^2&2ab&-2b\\2ab&1-a^2+b^2&2a\\2b&-2a&1-a^2-b^2\end{vmatrix}=(1+a^2+b^2)^3$ · সাইক্লিক $\begin{vmatrix}a&b&c\\b&c&a\\c&a&b\end{vmatrix}=-(a^3+b^3+c^3-3abc)$</div>
</section>

<section class="ths" id="th-eq"><h3>৫. নির্ণায়ক = 0, x নির্ণয় কর <small>তাৎক্ষণিক কৌশল</small></h3>
<ol class="th-steps">
<li><b>ঘাত গুনো:</b> x কয়টি কর্ণে/কলামে আছে → মোট কয়টি মূল আসবে (প্রশ্ন ৩৬: ২টি, প্রশ্ন ৩৭: ৩টি)।</li>
<li><b>সমান সারি খোঁজো:</b> x-এর কোন মান বসালে দুটি সারি/কলাম হুবহু এক হয়? সেটা একটা মূল। প্রশ্ন ৩৬: x = a দিলে C₁ = C₂, x = b দিলে C₁ = C₃ → উত্তর তৈরি। প্রশ্ন ৩৭: x = −1 দিলে C₁ = C₂ = (3, 3, 5)।</li>
<li><b>সেই উৎপাদক বের করো:</b> যে দুই কলাম সমান হচ্ছিল তাদের বিয়োগ করো → (x − মূল) উৎপাদক বেরিয়ে আসবে → বাকিটা দ্বিঘাত।</li>
<li><b>ভিয়েটা দিয়ে যাচাই:</b> x³-এর সহগ 1 হলে মূলগুলোর যোগফল = −(কর্ণের ধ্রুবকের যোগ)। প্রশ্ন ৩৭: −(4+4+1) = −9 = (−1) + (−11) + 3 ✓।</li></ol>
<div class="th-key"><b>ভুল কোরো না:</b> (x+1) দিয়ে দুই পাশ ভাগ করে দিলে x = −1 মূলটা হারিয়ে যায়। উৎপাদক রেখে দাও, শেষে সব উৎপাদক = 0 বসাও।</div>
</section>

<section class="ths" id="th-cramer"><h3>৬. সমীকরণ জোট: ক্রেমার ও বিপরীত ম্যাট্রিক্স</h3>
<div class="th-f"><b>ক্রেমারের নিয়ম</b> — সমীকরণগুলো x, y, z ক্রমে সাজাও (না থাকা চলকের সহগ 0)।
$$D=\begin{vmatrix}a_1&b_1&c_1\\a_2&b_2&c_2\\a_3&b_3&c_3\end{vmatrix},\ D_x=\begin{vmatrix}d_1&b_1&c_1\\d_2&b_2&c_2\\d_3&b_3&c_3\end{vmatrix},\ D_y=\begin{vmatrix}a_1&d_1&c_1\\a_2&d_2&c_2\\a_3&d_3&c_3\end{vmatrix},\ D_z=\begin{vmatrix}a_1&b_1&d_1\\a_2&b_2&d_2\\a_3&b_3&d_3\end{vmatrix}$$
$$x=\frac{D_x}{D},\quad y=\frac{D_y}{D},\quad z=\frac{D_z}{D}$$
<p>$D_x$ মানে: D-এর <b>x-এর কলাম</b> সরিয়ে ধ্রুবক কলাম বসাও; বাকি দুই কলাম হুবহু।</p><div class="th-ex"><span class="ex-l">উদাহরণ</span>$2x+y=5,\ x-y=1$
$$D=\begin{vmatrix}2&1\\1&-1\end{vmatrix}=-3,\quad D_x=\begin{vmatrix}5&1\\1&-1\end{vmatrix}=-6,\quad D_y=\begin{vmatrix}2&5\\1&1\end{vmatrix}=-3$$
$x=\frac{-6}{-3}=2,\ y=\frac{-3}{-3}=1$। যাচাই: $2(2)+1=5$ ✓</div></div>
<table class="th-tbl"><tr><th>অবস্থা</th><th>সিদ্ধান্ত</th></tr>
<tr><td>$D\ne0$</td><td>অনন্য সমাধান</td></tr>
<tr><td>$D=0$ এবং $D_x, D_y, D_z$ এর অন্তত একটি $\ne0$</td><td>কোনো সমাধান নেই (অসামঞ্জস্য)</td></tr>
<tr><td>$D=0$ এবং সবগুলো 0</td><td>অসীম সংখ্যক সমাধান (বা নেই) — অনন্য নয়</td></tr>
<tr><td>সমমাত্রিক (সব ধ্রুবক 0)</td><td>অশূন্য সমাধান চাইলে $D=0$ হতে হবে</td></tr></table><div class="th-ex"><span class="ex-l">উদাহরণ</span>$x+y=2,\ 2x+2y=5$: $D=\begin{vmatrix}1&1\\2&2\end{vmatrix}=0$, কিন্তু $D_x=\begin{vmatrix}2&1\\5&2\end{vmatrix}=-1\ne0$ → কোনো সমাধান নেই (দুটি সমান্তরাল রেখা)।</div>
<div class="th-f"><b>বিপরীত ম্যাট্রিক্স পদ্ধতি</b> $$AX=B\ \Rightarrow\ X=A^{-1}B=\frac{\text{adj}A}{|A|}B$$
<p>ধাপ: |A| → ৯টি সহগুণক (দাবাবোর্ডের চিহ্নসহ) → ট্রান্সপোজ করে adj A → |A| দিয়ে ভাগ → B দিয়ে গুণ।</p></div>
<div class="th-key"><b>শেষ ধাপ বাধ্যতামূলক:</b> উত্তর একটা সমীকরণে বসিয়ে মিলিয়ে নাও (১৫ সেকেন্ড)। D বা Dx-এ একটা চিহ্ন ভুল হলে এখানেই ধরা পড়ে।</div>
</section>

<section class="ths" id="th-mist"><h3>৭. তোমার শিটের ভুলগুলো থেকে শেখা</h3>
<ul class="th-list">
<li><b>প্রশ্ন ১৮:</b> সহগুণকের সংজ্ঞা — B₁-এর আগে মাইনাস চিহ্ন। এবং “অন্য সারির সহগুণক → 0” নিয়মটা।</li>
<li><b>প্রশ্ন ২২, ২৪, ২৫, ৩০, ৩১, ৩৩:</b> সরাসরি বিস্তার করতে গেলে বীজগণিত লম্বা হয়ে ভুল হয় → আগে প্যাটার্ন চেনো (P1–P5), শূন্য বানাও, তারপর বিস্তার।</li>
<li><b>প্রশ্ন ৪০:</b><br>$|A|=0$ থেকে k = ±2, কিন্তু √k বাস্তব হতে হলে k ≥ 0 → শুধু 2। শর্ত ভুলো না।</li>
<li><b>প্রশ্ন ৪২:</b><br>$|2D|=2^{3}|D|$ (3×3 বলে ঘাত 3), 2|D| নয়।</li>
<li><b>প্রশ্ন ৪৩:</b> কর্ণ ম্যাট্রিক্সের বিপরীত ও ঘাত = প্রতিটি কর্ণভুক্তির বিপরীত/ঘাত।</li></ul>
</section>`;

/* ---------- typed step-by-step solutions (matrix determinant part) ---------- */
const box=s=>'<div class="ans-box">'+s+'</div>';
const pat=s=>'<div class="pat">🎯 <b>প্যাটার্ন:</b> '+s+'</div>';
const tip=s=>'<div class="tip">'+s+'</div>';
const M={};
M[6]=pat('সহগুণকের সংজ্ঞা + “অন্য সারির সহগুণক” নিয়ম।')+R`
<p><b>ধাপ ১ — সহগুণকগুলো লিখি।</b> $a_1$ এর অবস্থান (1,1), চিহ্ন +; $b_1$ (1,2), চিহ্ন −; $c_1$ (1,3), চিহ্ন +। প্রথম সারি ও নিজের কলাম কেটে:</p>
$$A_1=+\begin{vmatrix}b_2&c_2\\b_3&c_3\end{vmatrix}=b_2c_3-b_3c_2$$
$$B_1=-\begin{vmatrix}a_2&c_2\\a_3&c_3\end{vmatrix}=-(a_2c_3-a_3c_2)$$
$$C_1=+\begin{vmatrix}a_2&b_2\\a_3&b_3\end{vmatrix}=a_2b_3-a_3b_2$$
<p><b>ধাপ ২ — বামপক্ষে বসাই।</b></p>
$$\text{L.H.S.}=a_2(b_2c_3-b_3c_2)-b_2(a_2c_3-a_3c_2)+c_2(a_2b_3-a_3b_2)$$
<p><b>ধাপ ৩ — গুণ করে খুলি।</b></p>
$$=a_2b_2c_3-a_2b_3c_2-a_2b_2c_3+a_3b_2c_2+a_2b_3c_2-a_3b_2c_2$$
<p><b>ধাপ ৪ — জোড়ায় জোড়ায় কাটাকাটি।</b> $a_2b_2c_3$ ও $-a_2b_2c_3$; $-a_2b_3c_2$ ও $+a_2b_3c_2$; $+a_3b_2c_2$ ও $-a_3b_2c_2$ — সব বাদ।</p>`+box(R`$\text{L.H.S.}=0=\text{R.H.S.}$ (প্রমাণিত)`)+tip(R`<b>এক লাইনের যুক্তি:</b><br>$A_1,B_1,C_1$-এ প্রথম সারির কোনো ভুক্তি নেই। তাই $a_2A_1+b_2B_1+c_2C_1$ হলো এমন নির্ণায়কের বিস্তার যার প্রথম সারিতে $a_1,b_1,c_1$-এর জায়গায় $a_2,b_2,c_2$ বসানো: $\begin{vmatrix}a_2&b_2&c_2\\a_2&b_2&c_2\\a_3&b_3&c_3\end{vmatrix}$ — দুটি সারি সমান, তাই 0।`);

M[7]=pat('P2 — প্রথম কলাম = বাকি দুই কলামের যোগ ± কিছু → $C_1\\to C_1-(C_2+C_3)$।')+R`
<p><b>ধাপ ১ — $C_1\to C_1-C_2-C_3$</b> (প্রতিটি সারিতে আলাদা করে):</p>
<p>সারি ১: $(x+y)-x-y=0$<br>সারি ২: $x-(x+z)-z=-2z$<br>সারি ৩: $y-z-(y+z)=-2z$</p>
$$\Delta=\begin{vmatrix}0&x&y\\-2z&x+z&z\\-2z&z&y+z\end{vmatrix}$$
<p><b>ধাপ ২ — $R_2\to R_2-R_3$</b> (প্রথম কলামে আরেকটা 0 আনতে):</p>
<p>$-2z-(-2z)=0$<br>$(x+z)-z=x$<br>$z-(y+z)=-y$</p>
$$\Delta=\begin{vmatrix}0&x&y\\0&x&-y\\-2z&z&y+z\end{vmatrix}$$
<p><b>ধাপ ৩ — প্রথম কলাম বরাবর বিস্তার।</b> শুধু (3,1) ভুক্তি $-2z$ অশূন্য; চিহ্ন $(-1)^{3+1}=+$:</p>
$$\Delta=-2z\begin{vmatrix}x&y\\x&-y\end{vmatrix}=-2z\{x(-y)-y\cdot x\}=-2z(-2xy)=4xyz$$`+box(R`$\Delta=4xyz$ → অপশন (a)`)+tip(R`<b>MCQ শর্টকাট:</b> x = y = z = 1 বসাও: $\begin{vmatrix}2&1&1\\1&2&1\\1&1&2\end{vmatrix}=2(3)-1(1)+1(-1)=4$। অপশনগুলোতে: 4xyz = 4 ✓, 0, 1, xy+yz+zx = 3 → শুধু (a)।`);

M[8]=pat('P7 — ω-এর নির্ণায়ক: সোজা বিস্তার, তারপর ঘাত কমাও ($\\omega^3=1$)।')+R`
<p><b>ধাপ ১ — প্রথম সারি বরাবর বিস্তার</b> (চিহ্ন +, −, +):</p>
$$\Delta=1\begin{vmatrix}\omega^2&1\\1&-\omega\end{vmatrix}-(-\omega)\begin{vmatrix}-\omega&1\\\omega^2&-\omega\end{vmatrix}+\omega^2\begin{vmatrix}-\omega&\omega^2\\\omega^2&1\end{vmatrix}$$
<p><b>ধাপ ২ — তিনটি ২×২ আলাদা করে:</b></p>
<p>প্রথম: $\omega^2(-\omega)-1\cdot1=-\omega^3-1=-1-1=-2$</p>
<p>দ্বিতীয়: $(-\omega)(-\omega)-1\cdot\omega^2=\omega^2-\omega^2=0$ → পদটি $+\omega\times0=0$</p>
<p>তৃতীয়: $(-\omega)(1)-\omega^2\cdot\omega^2=-\omega-\omega^4=-\omega-\omega=-2\omega$ → পদটি $\omega^2(-2\omega)=-2\omega^3=-2$</p>
<p><b>ধাপ ৩ — যোগ:</b><br>$\Delta=-2+0-2=-4$</p>`+box(R`$\Delta=-4$ → অপশনে নেই → <b>None</b> (d)`)+tip(R`<b>ফাঁদ:</b> দ্বিতীয় পদের আগে $-(-\omega)=+\omega$; আর $\omega^4=\omega^3\cdot\omega=\omega$। চিহ্ন হারালে 4 আসে — সেটাই অপশন (a)-র ফাঁদ।`);

M[9]=pat('P6 — log-এর পার্থক্য সব সারিতে একই → দুটি কলাম সমানুপাতিক → 0।')+R`
<p><b>ধাপ ১ — মূল সূত্র:</b><br>$\log(kx)-\log(ky)=\log\frac{kx}{ky}=\log\frac{x}{y}$ — k যা-ই হোক।</p>
<p><b>ধাপ ২ — $C_1\to C_1-C_2$:</b><br>সারি ১: $\log x-\log y=\log\frac xy$; সারি ২: $\log2x-\log2y=\log\frac xy$; সারি ৩: $\log3x-\log3y=\log\frac xy$</p>
<p><b>ধাপ ৩ — $C_2\to C_2-C_3$:</b> একইভাবে তিন সারিতেই $\log\frac yz$</p>
$$\Delta=\begin{vmatrix}\log\frac xy&\log\frac yz&\log z\\\log\frac xy&\log\frac yz&\log2z\\\log\frac xy&\log\frac yz&\log3z\end{vmatrix}=\log\frac xy\cdot\log\frac yz\begin{vmatrix}1&1&\log z\\1&1&\log2z\\1&1&\log3z\end{vmatrix}$$
<p><b>ধাপ ৪:</b> প্রথম দুই কলাম হুবহু এক → নির্ণায়ক 0।</p>`+box(R`মান $=0$ → অপশন (b)`)+tip(R`<b>MCQ শর্টকাট:</b> x = y = z = 1 বসাও → প্রথম সারি $(\log1,\log1,\log1)=(0,0,0)$ → মান 0।`);

M[10]=pat('C₃-এর গুণিতক দিয়ে C₁ ও C₂ থেকে শূন্য বানানো; MCQ-তে a = b = 0।')+R`
<p>ধরি $k=1+a^2+b^2$। লক্ষ্য: প্রতিটি কলাম থেকে k বের করা।</p>
<p><b>ধাপ ১ — $C_1\to C_1-b\,C_3$:</b></p>
<p>সারি ১: $(1+a^2-b^2)-b(-2b)=1+a^2+b^2=k$</p>
<p>সারি ২: $2ab-b(2a)=0$</p>
<p>সারি ৩: $2b-b(1-a^2-b^2)=2b-b+a^2b+b^3=b(1+a^2+b^2)=bk$</p>
<p><b>ধাপ ২ — $C_2\to C_2+a\,C_3$:</b></p>
<p>সারি ১: $2ab+a(-2b)=0$</p>
<p>সারি ২: $(1-a^2+b^2)+a(2a)=1+a^2+b^2=k$</p>
<p>সারি ৩: $-2a+a(1-a^2-b^2)=-a-a^3-ab^2=-a\,k$</p>
$$\Delta=\begin{vmatrix}k&0&-2b\\0&k&2a\\bk&-ak&1-a^2-b^2\end{vmatrix}=k^2\begin{vmatrix}1&0&-2b\\0&1&2a\\b&-a&1-a^2-b^2\end{vmatrix}$$
<p><b>ধাপ ৩ — প্রথম সারি বরাবর বিস্তার:</b></p>
$$=k^2\left[1\begin{vmatrix}1&2a\\-a&1-a^2-b^2\end{vmatrix}-0+(-2b)\begin{vmatrix}0&1\\b&-a\end{vmatrix}\right]$$
<p>প্রথম ২×২: $(1-a^2-b^2)-2a(-a)=1+a^2-b^2$<br>দ্বিতীয় ২×২: $0\cdot(-a)-1\cdot b=-b$ → $(-2b)(-b)=2b^2$</p>
<p>বন্ধনীর ভেতর: $1+a^2-b^2+2b^2=1+a^2+b^2=k$</p>`+box(R`$\Delta=k^2\cdot k=(1+a^2+b^2)^3$ → অপশন (e)`)+tip(R`<b>৫ সেকেন্ডের উপায়:</b> a = b = 0 বসাও → নির্ণায়ক = $\begin{vmatrix}1&0&0\\0&1&0\\0&0&1\end{vmatrix}=1$। অপশন: (a) 4, (b) 5⁵, (c) 7, (d) 11, (e) 1 → শুধু (e)। এই ফলটা মুখস্থ রাখো।`);

M[11]=pat('P3 — ১, a, …: পাশাপাশি কলাম বিয়োগ, তারপর উৎপাদক।')+R`
<p><b>ধাপ ১ — $C_1\to C_1-C_2$:</b><br>সারি ১: 0<br>সারি ২: $a-b$<br>সারি ৩: $(a^2-bc)-(b^2-ca)=a^2-b^2+ca-bc=(a-b)(a+b)+c(a-b)=(a-b)(a+b+c)$</p>
<p><b>ধাপ ২ — $C_2\to C_2-C_3$:</b><br>সারি ১: 0<br>সারি ২: $b-c$<br>সারি ৩: $(b^2-ca)-(c^2-ab)=(b-c)(b+c)+a(b-c)=(b-c)(a+b+c)$</p>
$$\text{L.H.S.}=\begin{vmatrix}0&0&1\\a-b&b-c&c\\(a-b)(a+b+c)&(b-c)(a+b+c)&c^2-ab\end{vmatrix}$$
<p><b>ধাপ ৩ — C₁ থেকে $(a-b)$, C₂ থেকে $(b-c)$ বের করি:</b></p>
$$=(a-b)(b-c)\begin{vmatrix}0&0&1\\1&1&c\\a+b+c&a+b+c&c^2-ab\end{vmatrix}$$
<p><b>ধাপ ৪:</b> প্রথম দুই কলাম হুবহু এক → নির্ণায়ক 0। (বিস্তার করলেও: $1\cdot\{(a+b+c)-(a+b+c)\}=0$)</p>`+box(R`$\text{L.H.S.}=0=\text{R.H.S.}$ (প্রমাণিত)`)+tip(R`<b>মূল কৌশল:</b><br>$a^2-b^2+ca-bc$ দেখে প্রথমে $(a-b)$ খোঁজো — জোড়ায় ভাগ করো: $(a^2-b^2)+(ca-bc)$।`);

M[12]=pat('P1 — প্রতিটি সারির যোগফল $2(a+b+c)$ → সব কলাম যোগ।')+R`
<p>ধরি $s=a+b+c$।</p>
<p><b>ধাপ ১ — $C_1\to C_1+C_2+C_3$:</b></p>
<p>সারি ১: $(a+b+2c)+a+b=2a+2b+2c=2s$<br>সারি ২: $c+(b+c+2a)+b=2s$<br>সারি ৩: $c+a+(c+a+2b)=2s$</p>
$$\text{L.H.S.}=\begin{vmatrix}2s&a&b\\2s&b+c+2a&b\\2s&a&c+a+2b\end{vmatrix}=2s\begin{vmatrix}1&a&b\\1&b+c+2a&b\\1&a&c+a+2b\end{vmatrix}$$
<p><b>ধাপ ২ — $R_2\to R_2-R_1$:</b><br>$1-1=0$<br>$(b+c+2a)-a=a+b+c=s$<br>$b-b=0$</p>
<p><b>ধাপ ৩ — $R_3\to R_3-R_1$:</b><br>$0$<br>$a-a=0$<br>$(c+a+2b)-b=s$</p>
$$=2s\begin{vmatrix}1&a&b\\0&s&0\\0&0&s\end{vmatrix}$$
<p><b>ধাপ ৪:</b> নিচের ত্রিভুজ সব 0 → মান = কর্ণের গুণফল $=1\cdot s\cdot s$।</p>`+box(R`$\text{L.H.S.}=2s\cdot s^2=2(a+b+c)^3=\text{R.H.S.}$ (প্রমাণিত)`)+tip(R`শিটে $R_1-R_2,\ R_2-R_3$ করা ছিল; এখানে $R_2-R_1,\ R_3-R_1$ করায় সরাসরি ত্রিভুজাকার হয়ে গেল — বিস্তারই লাগল না।`);

M[13]=pat('P4 + P3 — আগে a, b, c বের করো, তারপর ভ্যান্ডারমন্ড।')+R`
<p><b>ধাপ ১ — উৎপাদক বের করা:</b><br>C₁ = (a, a², a³) থেকে a; C₂ থেকে b; C₃ থেকে c।</p>
$$\text{L.H.S.}=abc\begin{vmatrix}1&1&1\\a&b&c\\a^2&b^2&c^2\end{vmatrix}$$
<p><b>ধাপ ২ — $C_1\to C_1-C_2,\ C_2\to C_2-C_3$:</b></p>
<p>C₁: $(0,\ a-b,\ a^2-b^2)$<br>C₂: $(0,\ b-c,\ b^2-c^2)$<br>C₃ অপরিবর্তিত $(1, c, c^2)$</p>
$$=abc\begin{vmatrix}0&0&1\\a-b&b-c&c\\a^2-b^2&b^2-c^2&c^2\end{vmatrix}=abc(a-b)(b-c)\begin{vmatrix}0&0&1\\1&1&c\\a+b&b+c&c^2\end{vmatrix}$$
<p>($a^2-b^2=(a-b)(a+b)$ থেকে (a−b) বেরিয়ে a+b থাকল; একইভাবে b+c।)</p>
<p><b>ধাপ ৩ — প্রথম সারি বরাবর বিস্তার।</b> শুধু (1,3) ভুক্তি 1, চিহ্ন $(-1)^{1+3}=+$:</p>
$$=abc(a-b)(b-c)\begin{vmatrix}1&1\\a+b&b+c\end{vmatrix}=abc(a-b)(b-c)\{(b+c)-(a+b)\}=abc(a-b)(b-c)(c-a)$$`+box(R`$\text{L.H.S.}=abc(a-b)(b-c)(c-a)=\text{R.H.S.}$ (প্রমাণিত)`);

M[14]=pat('P3 — কলাম বিয়োগে x বাদ যায়, (a−b), (b−c) বের হয়।')+R`
<p><b>ধাপ ১ — $C_1\to C_1-C_2$:</b><br>$(a+x)-(b+x)=a-b$; $(a+y)-(b+y)=a-b$; $a^2-b^2$</p>
<p><b>ধাপ ২ — $C_2\to C_2-C_3$:</b><br>$b-c$; $b-c$; $b^2-c^2$<br>C₃ থাকে $(c+x,\ c+y,\ c^2)$</p>
$$\text{L.H.S.}=\begin{vmatrix}a-b&b-c&c+x\\a-b&b-c&c+y\\a^2-b^2&b^2-c^2&c^2\end{vmatrix}=(a-b)(b-c)\begin{vmatrix}1&1&c+x\\1&1&c+y\\a+b&b+c&c^2\end{vmatrix}$$
<p><b>ধাপ ৩ — $R_1\to R_1-R_2$:</b><br>$1-1=0$, $1-1=0$, $(c+x)-(c+y)=x-y$</p>
$$=(a-b)(b-c)\begin{vmatrix}0&0&x-y\\1&1&c+y\\a+b&b+c&c^2\end{vmatrix}$$
<p><b>ধাপ ৪ — প্রথম সারি বরাবর বিস্তার</b> ((1,3) চিহ্ন +):</p>
$$=(a-b)(b-c)(x-y)\begin{vmatrix}1&1\\a+b&b+c\end{vmatrix}=(a-b)(b-c)(x-y)\{(b+c)-(a+b)\}$$`+box(R`$\text{L.H.S.}=(a-b)(b-c)(c-a)(x-y)=\text{R.H.S.}$ (প্রমাণিত)`);

M[15]=pat('P1 — প্রতিটি কলামের যোগফল $a+b+c$ → সব সারি যোগ।')+R`
<p>ধরি $s=a+b+c$।</p>
<p><b>ধাপ ১ — $R_1\to R_1+R_2+R_3$:</b></p>
<p>কলাম ১: $(a-b-c)+2b+2c=a+b+c$<br>কলাম ২: $2a+(b-c-a)+2c=a+b+c$<br>কলাম ৩: $2a+2b+(c-a-b)=a+b+c$</p>
$$\text{L.H.S.}=s\begin{vmatrix}1&1&1\\2b&b-c-a&2b\\2c&2c&c-a-b\end{vmatrix}$$
<p><b>ধাপ ২ — $C_1\to C_1-C_2$:</b><br>$1-1=0$<br>$2b-(b-c-a)=a+b+c=s$<br>$2c-2c=0$</p>
<p><b>ধাপ ৩ — $C_2\to C_2-C_3$:</b><br>$1-1=0$<br>$(b-c-a)-2b=-(a+b+c)=-s$<br>$2c-(c-a-b)=a+b+c=s$</p>
$$=s\begin{vmatrix}0&0&1\\s&-s&2b\\0&s&c-a-b\end{vmatrix}$$
<p><b>ধাপ ৪ — প্রথম সারি বরাবর বিস্তার</b> ((1,3) চিহ্ন +):</p>
$$=s\cdot1\cdot\begin{vmatrix}s&-s\\0&s\end{vmatrix}=s(s\cdot s-(-s)\cdot0)=s\cdot s^2$$`+box(R`$\text{L.H.S.}=(a+b+c)^3=\text{R.H.S.}$ (প্রমাণিত)`);

M[16]=pat('P4 তারপর P2 — x, y, z বের করো → “x+y, x, y” ধরন।')+R`
<p><b>ধাপ ১ — প্রতিটি কলাম থেকে উৎপাদক:</b></p>
<p>C₁ = $(x^2,\ x^2+xy,\ xy)=x\,(x,\ x+y,\ y)$<br>C₂ = $(yz,\ y^2,\ y^2+yz)=y\,(z,\ y,\ y+z)$<br>C₃ = $(zx+z^2,\ zx,\ z^2)=z\,(x+z,\ x,\ z)$</p>
$$\text{L.H.S.}=xyz\begin{vmatrix}x&z&x+z\\x+y&y&x\\y&y+z&z\end{vmatrix}$$
<p><b>ধাপ ২ — $C_1\to C_1-C_2-C_3$:</b></p>
<p>সারি ১: $x-z-(x+z)=-2z$<br>সারি ২: $(x+y)-y-x=0$<br>সারি ৩: $y-(y+z)-z=-2z$</p>
$$=xyz\begin{vmatrix}-2z&z&x+z\\0&y&x\\-2z&y+z&z\end{vmatrix}$$
<p><b>ধাপ ৩ — $R_1\to R_1-R_3$:</b><br>$-2z-(-2z)=0$<br>$z-(y+z)=-y$<br>$(x+z)-z=x$</p>
$$=xyz\begin{vmatrix}0&-y&x\\0&y&x\\-2z&y+z&z\end{vmatrix}$$
<p><b>ধাপ ৪ — প্রথম কলাম বরাবর বিস্তার</b> (শুধু (3,1) = −2z, চিহ্ন +):</p>
$$=xyz\cdot(-2z)\begin{vmatrix}-y&x\\y&x\end{vmatrix}=xyz(-2z)\{(-y)(x)-x\cdot y\}=xyz(-2z)(-2xy)=4x^2y^2z^2$$`+box(R`$\text{L.H.S.}=4x^2y^2z^2=\text{R.H.S.}$ (প্রমাণিত)`)+tip(R`বের করার পরের নির্ণায়কটা আসলে প্রশ্ন ১৯-এর ভাই (মান 4xyz)। একবার চিনলে সরাসরি xyz × 4xyz লিখে দিতে পারো।`);

M[17]=pat('P5 — তৃতীয় কলাম = x·C₁ + y·C₂ (উপরের দুই সারিতে)।')+R`
<p><b>ধাপ ১ — চিনে নাও:</b><br>সারি ১-এ $ax+by=x\cdot a+y\cdot b$; সারি ২-এ $bx+cy=x\cdot b+y\cdot c$। অর্থাৎ $C_3$-এর উপরের দুটি ভুক্তি $=xC_1+yC_2$।</p>
<p><b>ধাপ ২ — $C_3\to C_3-xC_1-yC_2$:</b></p>
<p>সারি ১: $(ax+by)-xa-yb=0$<br>সারি ২: $(bx+cy)-xb-yc=0$</p>
<p>সারি ৩: $0-x(ax+by)-y(bx+cy)=-(ax^2+bxy+bxy+cy^2)=-(ax^2+2bxy+cy^2)$</p>
$$\text{L.H.S.}=\begin{vmatrix}a&b&0\\b&c&0\\ax+by&bx+cy&-(ax^2+2bxy+cy^2)\end{vmatrix}$$
<p><b>ধাপ ৩ — তৃতীয় কলাম বরাবর বিস্তার</b> (শুধু (3,3), চিহ্ন +):</p>
$$=-(ax^2+2bxy+cy^2)\begin{vmatrix}a&b\\b&c\end{vmatrix}=-(ax^2+2bxy+cy^2)(ac-b^2)$$
<p><b>ধাপ ৪ — মাইনাসটা ভেতরে নিই:</b><br>$-(ac-b^2)=b^2-ac$</p>`+box(R`$\text{L.H.S.}=(b^2-ac)(ax^2+2bxy+cy^2)=\text{R.H.S.}$ (প্রমাণিত)`);

M[18]=pat('P3 — ১, a, a³: ভ্যান্ডারমন্ড; $a^3-b^3$ ভাঙতে জানতে হবে।')+R`
<p><b>ধাপ ১ — $C_1\to C_1-C_2,\ C_2\to C_2-C_3$:</b></p>
<p>C₁: $(0,\ a-b,\ a^3-b^3)$<br>C₂: $(0,\ b-c,\ b^3-c^3)$<br>C₃: $(1,\ c,\ c^3)$</p>
<p>সূত্র: $a^3-b^3=(a-b)(a^2+ab+b^2)$</p>
$$\text{L.H.S.}=(a-b)(b-c)\begin{vmatrix}0&0&1\\1&1&c\\a^2+ab+b^2&b^2+bc+c^2&c^3\end{vmatrix}$$
<p><b>ধাপ ২ — প্রথম সারি বরাবর বিস্তার</b> ((1,3) চিহ্ন +):</p>
$$=(a-b)(b-c)\{(b^2+bc+c^2)-(a^2+ab+b^2)\}=(a-b)(b-c)(c^2-a^2+bc-ab)$$
<p><b>ধাপ ৩ — জোড়ায় ভেঙে উৎপাদক:</b><br>$c^2-a^2+bc-ab=(c-a)(c+a)+b(c-a)=(c-a)(a+b+c)$</p>`+box(R`$\text{L.H.S.}=(a-b)(b-c)(c-a)(a+b+c)=\text{R.H.S.}$ (প্রমাণিত)`);

M[19]=pat('কলাম ভাঙার ধর্ম: $\\begin{vmatrix}p-q&r\\\\s-t&u\\end{vmatrix}=\\begin{vmatrix}p&r\\\\s&u\\end{vmatrix}-\\begin{vmatrix}q&r\\\\t&u\\end{vmatrix}$')+R`
<p>সুবিধার জন্য লিখি $f=f(x),\ f'=f(x+h)$ (একইভাবে $g, g', \varphi, \varphi'$)। তাহলে $F(x)=\begin{vmatrix}f&\varphi\\g&\varphi\end{vmatrix}$, $F(x+h)=\begin{vmatrix}f'&\varphi'\\g'&\varphi'\end{vmatrix}$।</p>
<p><b>ধাপ ১ — R.H.S.-এর প্রথম নির্ণায়ক, প্রথম কলাম ভেঙে:</b></p>
$$\begin{vmatrix}f'-f&\varphi'\\g'-g&\varphi'\end{vmatrix}=\begin{vmatrix}f'&\varphi'\\g'&\varphi'\end{vmatrix}-\begin{vmatrix}f&\varphi'\\g&\varphi'\end{vmatrix}=F(x+h)-P$$
<p>যেখানে $P=\begin{vmatrix}f&\varphi'\\g&\varphi'\end{vmatrix}$।</p>
<p><b>ধাপ ২ — দ্বিতীয় নির্ণায়ক, দ্বিতীয় কলাম ভেঙে:</b></p>
$$\begin{vmatrix}f&\varphi'-\varphi\\g&\varphi'-\varphi\end{vmatrix}=\begin{vmatrix}f&\varphi'\\g&\varphi'\end{vmatrix}-\begin{vmatrix}f&\varphi\\g&\varphi\end{vmatrix}=P-F(x)$$
<p><b>ধাপ ৩ — যোগ:</b><br>$\{F(x+h)-P\}+\{P-F(x)\}$ → মাঝের P কেটে যায়।</p>`+box(R`$\text{R.H.S.}=F(x+h)-F(x)=\text{L.H.S.}$ (প্রমাণিত)`)+tip(R`<b>বিকল্প (সরাসরি বিস্তার):</b> প্রথম নির্ণায়ক $=\varphi'\{(f'-f)-(g'-g)\}$, দ্বিতীয় $=(\varphi'-\varphi)(f-g)$। যোগ করলে $\varphi'(f'-g')-\varphi'(f-g)+\varphi'(f-g)-\varphi(f-g)=\varphi'(f'-g')-\varphi(f-g)=F(x+h)-F(x)$।`);

M[20]=pat('P8 — 1+x, 1, 1 ধরন: পাশাপাশি কলাম বিয়োগ।')+R`
<p><b>ধাপ ১ — $C_1\to C_1-C_2$:</b><br>$(1+x)-1=x$<br>$1-(1+y)=-y$<br>$1-1=0$</p>
<p><b>ধাপ ২ — $C_2\to C_2-C_3$:</b><br>$1-1=0$<br>$(1+y)-1=y$<br>$1-(1+z)=-z$</p>
$$\begin{vmatrix}x&0&1\\-y&y&1\\0&-z&1+z\end{vmatrix}=0$$
<p><b>ধাপ ৩ — প্রথম সারি বরাবর বিস্তার:</b></p>
$$x\begin{vmatrix}y&1\\-z&1+z\end{vmatrix}-0+1\begin{vmatrix}-y&y\\0&-z\end{vmatrix}=0$$
<p>প্রথম: $y(1+z)-1\cdot(-z)=y+yz+z$<br>দ্বিতীয়: $(-y)(-z)-y\cdot0=yz$</p>
$$x(y+yz+z)+yz=0\ \Rightarrow\ xy+yz+zx+xyz=0$$
<p><b>ধাপ ৪ — xyz দিয়ে ভাগ</b> (x, y, z ≠ 0): $\frac1z+\frac1x+\frac1y+1=0$</p>`+box(R`$\dfrac1x+\dfrac1y+\dfrac1z=-1$`)+tip(R`মুখস্থ: $\begin{vmatrix}1+x&1&1\\1&1+y&1\\1&1&1+z\end{vmatrix}=xyz\left(1+\frac1x+\frac1y+\frac1z\right)$।`);

M[21]=pat('det = 0 সমীকরণ — “কোন x দিলে দুই কলাম সমান হয়?”')+R`
<p><b>তাৎক্ষণিক উপায়:</b> x শুধু প্রথম কলামে, সর্বোচ্চ ঘাত x² → সর্বোচ্চ ২টি মূল। x = a বসালে C₁ = C₂ → নির্ণায়ক 0; x = b বসালে C₁ = C₃ → 0। তাই x = a, b। নিচে পূর্ণ সমাধান:</p>
<p><b>ধাপ ১ — $C_1\to C_1-C_2,\ C_2\to C_2-C_3$:</b></p>
<p>C₁: $(0,\ x-a,\ x^2-a^2)$<br>C₂: $(0,\ a-b,\ a^2-b^2)$<br>C₃: $(1,\ b,\ b^2)$</p>
$$\begin{vmatrix}0&0&1\\x-a&a-b&b\\x^2-a^2&a^2-b^2&b^2\end{vmatrix}=0$$
<p><b>ধাপ ২ — প্রথম সারি বরাবর বিস্তার</b> ((1,3) চিহ্ন +):</p>
$$(x-a)(a^2-b^2)-(a-b)(x^2-a^2)=0$$
<p><b>ধাপ ৩ — উৎপাদকে ভাঙি:</b><br>$(x-a)(a-b)(a+b)-(a-b)(x-a)(x+a)=0$</p>
$$(x-a)(a-b)\{(a+b)-(x+a)\}=0\ \Rightarrow\ (x-a)(a-b)(b-x)=0$$
<p><b>ধাপ ৪:</b><br>$a\ne b$ (নইলে নির্ণায়ক সবসময় 0), তাই $x-a=0$ অথবা $b-x=0$।</p>`+box(R`$x=a,\ b$`);

M[22]=pat('det = 0 সমীকরণ — C₁ − C₂ করলে x কেটে (x+1) বের হয়।')+R`
<p><b>তাৎক্ষণিক যাচাই:</b> x = −1 দিলে C₁ = (3, 3, 5) = C₂ → একটা মূল −1। x তিন কর্ণে → ৩টি মূল।</p>
<p><b>ধাপ ১ — $C_1\to C_1-C_2$:</b><br>$(x+4)-3=x+1$<br>$3-(x+4)=-(x+1)$<br>$5-5=0$</p>
$$\begin{vmatrix}x+1&3&3\\-(x+1)&x+4&5\\0&5&x+1\end{vmatrix}=0\ \Rightarrow\ (x+1)\begin{vmatrix}1&3&3\\-1&x+4&5\\0&5&x+1\end{vmatrix}=0$$
<p><b>ধাপ ২ — $R_2\to R_2+R_1$:</b><br>$-1+1=0$<br>$(x+4)+3=x+7$<br>$5+3=8$</p>
$$(x+1)\begin{vmatrix}1&3&3\\0&x+7&8\\0&5&x+1\end{vmatrix}=0$$
<p><b>ধাপ ৩ — প্রথম কলাম বরাবর বিস্তার:</b></p>
$$(x+1)\{(x+7)(x+1)-8\cdot5\}=0\ \Rightarrow\ (x+1)(x^2+8x+7-40)=0\ \Rightarrow\ (x+1)(x^2+8x-33)=0$$
<p><b>ধাপ ৪ — দ্বিঘাত ভাঙি:</b> গুণফল −33, যোগফল 8 → 11 ও −3: $x^2+8x-33=(x+11)(x-3)$</p>
$$(x+1)(x+11)(x-3)=0$$`+box(R`$x=-1,\ -11,\ 3$`)+tip(R`<b>ভিয়েটা যাচাই:</b> মূলের যোগফল = −(4 + 4 + 1) = −9 এবং −1 − 11 + 3 = −9 ✓। <b>ফাঁদ:</b> (x+1) দিয়ে ভাগ করে ফেললে x = −1 হারিয়ে যায়।`);

M[26]=pat('ক্রেমার — D, Dₓ, D_y, D_z; প্রতিটা আলাদা লাইনে, শেষে যাচাই।')+R`
<p><b>ধাপ ১ — সমীকরণ:</b> M = N থেকে $x+2y+3z=-1,\ \ 2x+y+4z=2,\ \ 3x+2y+z=3$</p>
<p><b>ধাপ ২ — D</b> (প্রথম সারি বরাবর):</p>
$$D=\begin{vmatrix}1&2&3\\2&1&4\\3&2&1\end{vmatrix}=1(1\cdot1-4\cdot2)-2(2\cdot1-4\cdot3)+3(2\cdot2-1\cdot3)=-7+20+3=16$$
<p><b>ধাপ ৩ — Dₓ</b> (প্রথম কলামে ধ্রুবক −1, 2, 3):</p>
$$D_x=\begin{vmatrix}-1&2&3\\2&1&4\\3&2&1\end{vmatrix}=-1(1-8)-2(2-12)+3(4-3)=7+20+3=30$$
<p><b>ধাপ ৪ — D_y</b> (দ্বিতীয় কলামে ধ্রুবক):</p>
$$D_y=\begin{vmatrix}1&-1&3\\2&2&4\\3&3&1\end{vmatrix}=1(2-12)-(-1)(2-12)+3(6-6)=-10-10+0=-20$$
<p><b>ধাপ ৫ — D_z</b> (তৃতীয় কলামে ধ্রুবক):</p>
$$D_z=\begin{vmatrix}1&2&-1\\2&1&2\\3&2&3\end{vmatrix}=1(3-4)-2(6-6)+(-1)(4-3)=-1-0-1=-2$$
<p><b>ধাপ ৬ — ভাগ:</b><br>$x=\frac{30}{16}=\frac{15}{8},\ \ y=\frac{-20}{16}=-\frac54,\ \ z=\frac{-2}{16}=-\frac18$</p>`+box(R`$(x,y,z)=\left(\dfrac{15}{8},\ -\dfrac54,\ -\dfrac18\right)$`)+tip(R`<b>যাচাই</b> (প্রথম সমীকরণ): $\frac{15}{8}-\frac{20}{8}-\frac38=-\frac88=-1$ ✓`);

M[27]=pat('ক্রেমার — প্রথমে সমীকরণ জোট লেখো, তারপর ৪টি নির্ণায়ক।')+R`
<p><b>ধাপ ১ — AX = B খুলে:</b><br>$x+2y-z=-1,\ \ 3x+8y+2z=28,\ \ 4x+9y-z=14$</p>
<p><b>ধাপ ২ — D:</b></p>
$$D=\begin{vmatrix}1&2&-1\\3&8&2\\4&9&-1\end{vmatrix}=1(-8-18)-2(-3-8)+(-1)(27-32)=-26+22+5=1$$
<p><b>ধাপ ৩ — Dₓ:</b></p>
$$D_x=\begin{vmatrix}-1&2&-1\\28&8&2\\14&9&-1\end{vmatrix}=-1(-8-18)-2(-28-28)+(-1)(252-112)=26+112-140=-2$$
<p><b>ধাপ ৪ — D_y:</b></p>
$$D_y=\begin{vmatrix}1&-1&-1\\3&28&2\\4&14&-1\end{vmatrix}=1(-28-28)-(-1)(-3-8)+(-1)(42-112)=-56-11+70=3$$
<p><b>ধাপ ৫ — D_z:</b></p>
$$D_z=\begin{vmatrix}1&2&-1\\3&8&28\\4&9&14\end{vmatrix}=1(112-252)-2(42-112)+(-1)(27-32)=-140+140+5=5$$
<p><b>ধাপ ৬:</b><br>$x=\frac{-2}{1},\ y=\frac31,\ z=\frac51$</p>`+box(R`$(x,y,z)=(-2,\ 3,\ 5)$`)+tip(R`<b>যাচাই:</b><br>$-2+6-5=-1$ ✓<br>$-6+24+10=28$ ✓<br>$-8+27-5=14$ ✓। D_y-তে দ্বিতীয় পদের চিহ্ন: $-(-1)\times(-11)=-11$ — এখানেই সবচেয়ে বেশি ভুল হয়।`);

M[28]=pat('D = 0 ⇒ অনন্য সমাধান নেই; তারপর বিপরীত ম্যাট্রিক্স।')+R`
<p><b>অংশ ১ — কোন k-তে সমাধান নেই।</b> সহগের নির্ণায়ক:</p>
$$D=\begin{vmatrix}1&k&1\\3&-3&3\\2&1&k\end{vmatrix}=1\begin{vmatrix}-3&3\\1&k\end{vmatrix}-k\begin{vmatrix}3&3\\2&k\end{vmatrix}+1\begin{vmatrix}3&-3\\2&1\end{vmatrix}$$
$$=1(-3k-3)-k(3k-6)+(3+6)=-3k-3-3k^2+6k+9=-3k^2+3k+6$$
$$D=0\Rightarrow k^2-k-2=0\Rightarrow(k-2)(k+1)=0\Rightarrow k=2,\ -1$$
<p><b>অংশ ২ — k = −2:</b><br>$x-2y+z=1,\ \ 3x-3y+3z=3,\ \ 2x+y-2z=2$</p>
$$A=\begin{bmatrix}1&-2&1\\3&-3&3\\2&1&-2\end{bmatrix},\quad |A|=1(6-3)-(-2)(-6-6)+1(3+6)=3-24+9=-12$$
<p><b>৯টি সহগুণক</b> (চিহ্নসহ):</p>
<p>$C_{11}=+(6-3)=3,\ \ C_{12}=-(-6-6)=12,\ \ C_{13}=+(3+6)=9$</p>
<p>$C_{21}=-(4-1)=-3,\ \ C_{22}=+(-2-2)=-4,\ \ C_{23}=-(1+4)=-5$</p>
<p>$C_{31}=+(-6+3)=-3,\ \ C_{32}=-(3-3)=0,\ \ C_{33}=+(-3+6)=3$</p>
<p><b>adj A</b> = সহগুণক ম্যাট্রিক্সের ট্রান্সপোজ, তারপর |A| = −12 দিয়ে ভাগ:</p>
$$A^{-1}=\frac{1}{-12}\begin{bmatrix}3&-3&-3\\12&-4&0\\9&-5&3\end{bmatrix}=\begin{bmatrix}-\frac14&\frac14&\frac14\\-1&\frac13&0\\-\frac34&\frac5{12}&-\frac14\end{bmatrix}$$
<p><b>X = A⁻¹B</b>, B = (1, 3, 2):</p>
<p>x = $-\frac14+\frac34+\frac24=1$<br>y = $-1+1+0=0$<br>z = $-\frac34+\frac{15}{12}-\frac24=-\frac34+\frac54-\frac12=0$</p>`+box(R`সমাধানযোগ্য নয়: $k=2,\ -1$<br>k = −2 হলে $x=1,\ y=0,\ z=0$`)+tip(R`<b>সূক্ষ্ম কথা:</b> k = 2 বা −1 হলে আসলে <i>অনন্য</i> সমাধান থাকে না (যাচাই করলে দেখা যায় অসীম সংখ্যক সমাধান আছে)। পরীক্ষায় “D = 0 ⇒ অনন্য সমাধান নেই” লিখলেই পূর্ণ নম্বর। উত্তর যাচাই: $1-0+0=1$ ✓, $3=3$ ✓, $2=2$ ✓।`);

window.EXTRA={
  theory:{envchem:envTheory,matrix:matTheory},
  secTheory:{envchem:{1:['th-water','DO · BOD · COD · খরতার সূত্র আগে দেখে নাও'],2:['th-air','এসিড বৃষ্টি · গ্রিনহাউস · আর্সেনিকের থিওরি আগে দেখে নাও']},
             matrix:{1:['th-frame','৪ ধাপের ফ্রেমওয়ার্ক ও ৮ প্যাটার্ন আগে দেখে নাও'],2:['th-eq','det = 0 সমীকরণের তাৎক্ষণিক কৌশল'],4:['th-cramer','ক্রেমার ও বিপরীত ম্যাট্রিক্সের নিয়ম']}},
  sols:{matrix:M},
  notes:{
    matrix:{2:R`শিটের হাইলাইটে ছাপা ভাঙা: সঠিক উত্তর $B^{-1}=\dfrac{A}{x^2}$`,3:R`শিটের হাইলাইটে ছাপা ভাঙা: সঠিক উত্তর $\theta=n\pi+\dfrac{\pi}{6},\ n\in\mathbb Z$`,24:R`শিটের হাইলাইটে ছাপা ভাঙা: $|(2D)^{-1}|=\dfrac{1}{160}$`},
    envchem:{25:R`শিটের হাইলাইটে ছাপা ভাঙা: $C\propto\sqrt T$ এবং $C\propto\dfrac{1}{\sqrt M}$`,26:R`শিটের হাইলাইটে ছাপা ভাঙা: $\left(P+\dfrac{a}{V^2}\right)(V-b)=RT$ (1 mol)`}
  },
  weak:{Phy:[],Chem:[],Math:[{id:'Math:Matrix',sec:1,t:'নির্ণায়ক: মান ও সহগুণক',d:'ধাপে ধাপে সমাধান · ৪ ধাপের ফ্রেমওয়ার্ক · ৮ প্যাটার্ন',more:'নির্ণায়কে সমীকরণ সমাধান · ক্রেমার ও বিপরীত ম্যাট্রিক্স'}]}
};
})();
