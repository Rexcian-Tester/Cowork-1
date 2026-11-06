/* Sprint 2 extras (Nov 2026): Function, Complex Number, Statics, Thermodynamics, Ideal Gas, Qualitative Chemistry.
   Merges into window.EXTRA (loaded after extra.js). Same structure: theory / sols / notes. */
(function(){
const R=String.raw, X=window.EXTRA=window.EXTRA||{};
['theory','sols','notes','secTheory'].forEach(k=>{X[k]=X[k]||{}});
const box=s=>'<div class="ans-box">'+s+'</div>';
const pat=s=>'<div class="pat">🎯 <b>প্যাটার্ন:</b> '+s+'</div>';
const tip=s=>'<div class="tip">'+s+'</div>';
const ex=s=>'<div class="th-ex"><span class="ex-l">উদাহরণ</span>'+s+'</div>';
const img=(src,cap)=>'<figure style="margin:14px 0"><img src="'+src+'" alt="'+cap+'" style="width:100%;height:auto;border:1px solid var(--line);border-radius:12px"><figcaption class="muted" style="font-size:13.5px;margin-top:4px">'+cap+'</figcaption></figure>';

/* ======================= ফাংশন ======================= */
X.theory.func=R`
<div class="th-toc"><a data-jump="th-fdom">ডোমেন নির্ণয়</a><a data-jump="th-fran">রেঞ্জ নির্ণয়</a><a data-jump="th-fcomp">সংযোজিত ফাংশন</a><a data-jump="th-flog">লগের ভিত্তি বদল</a><a data-jump="th-fexp">e ও ln</a></div>

<section class="ths" id="th-fdom"><h3>১. ডোমেন — ৪টি শর্ত <small>যেখানে ফাংশন “ভেঙে যায়” সেটাই বাদ</small></h3>
<table class="th-tbl"><tr><th>ফাংশনে আছে</th><th>শর্ত</th></tr>
<tr><td>$\sqrt{u}$</td><td>$u\ge0$</td></tr>
<tr><td>$\ln u,\ \log u$</td><td>$u>0$ (শূন্যও নয়)</td></tr>
<tr><td>$\dfrac{1}{u}$</td><td>$u\ne0$</td></tr>
<tr><td>$\sin^{-1}u,\ \cos^{-1}u$</td><td>$-1\le u\le1$</td></tr></table>
<div class="th-key">ভগ্নাংশ অসমতায় হর দিয়ে গুণ করার আগে <b>হরের চিহ্ন</b> দেখো — ঋণাত্মক হলে অসমতা উল্টে যায়। তাই দুই কেস (হর &gt; 0, হর &lt; 0) আলাদা করো।</div>
`+ex(R`<b>প্রশ্ন ৮:</b> $\cos^{-1}\dfrac{2x}{x+1}$ এর ডোমেন।
<p>$x+1>0$ হলে: $-(x+1)\le2x\le x+1\Rightarrow x\ge-\tfrac13$ এবং $x\le1$।</p>
<p>$x+1<0$ হলে অসমতা উল্টে: $2x\ge x+1\Rightarrow x\ge1$ — কিন্তু $x<-1$, অসম্ভব।</p>
<p>ডোমেন $=\left[-\tfrac13,\,1\right]$</p>`)+R`</section>

<section class="ths" id="th-fran"><h3>২. রেঞ্জ — y = f(x) লিখে x বের করো</h3>
<p>$y=f(x)$ থেকে $x$-কে $y$ দিয়ে প্রকাশ করো, তারপর দেখো কোন $y$-এর জন্য $x$ বাস্তব ও ডোমেনে থাকে।</p>
<div class="th-key"><b>কাটাকাটির ফাঁদ:</b> সরলীকরণের আগে যে বিন্দু ডোমেন থেকে বাদ পড়েছিল, তার “প্রতিবিম্ব”ও রেঞ্জ থেকে বাদ যায়।</div>
`+ex(R`<b>প্রশ্ন ৭:</b> $f(x)=\dfrac{x^2-3}{x-\sqrt3}$, $x\ne\sqrt3$।
<p>সরল করলে $f(x)=x+\sqrt3$ — এটা সব বাস্তব মান নিতে পারত।</p>
<p>কিন্তু $x=\sqrt3$ বাদ, তাই $y=\sqrt3+\sqrt3=2\sqrt3$ কখনো আসে না।</p>
<p>রেঞ্জ $=\mathbb R-\{2\sqrt3\}$</p>`)+R`
`+ex(R`<b>একঘাতী ভগ্নাংশের দ্রুত রেঞ্জ:</b> $y=\dfrac{ax+b}{cx+d}$ হলে $y\ne\dfrac ac$।<br>যেমন $\dfrac{2x+1}{x-3}$ এর রেঞ্জ $\mathbb R-\{2\}$।`)+R`</section>

<section class="ths" id="th-fcomp"><h3>৩. সংযোজিত ফাংশনের ডোমেন <small>MIST-এর প্রিয় ফাঁদ</small></h3>
<div class="th-f"><b>নিয়ম</b>
$$D_{g\circ f}=\{x\in D_f:\ f(x)\in D_g\}$$
<p>অর্থাৎ <b>দুটো শর্তই একসাথে</b> (ইন্টারসেকশন): ভেতরের ফাংশন $f$ সংজ্ঞায়িত হতে হবে, <b>এবং</b> তার আউটপুট বাইরের $g$-এর ডোমেনে পড়তে হবে।</p></div>
<div class="th-key">সরল রূপ দেখে ডোমেন বের করবে না। আগে ভেতরের শর্ত লিখে রাখো, তারপর সরল করো।</div>
`+ex(R`<b>প্রশ্ন ১৪:</b> $f(x)=\sqrt{x+2}$, $g(x)=\ln(1-x^2)$।
<p>$(g\circ f)(x)=\ln\!\big(1-(x+2)\big)=\ln(-x-1)$</p>
<p>শর্ত ১ ($\sqrt{\ }$): $x\ge-2$ → $[-2,\infty)$<br>শর্ত ২ ($\ln$): $-x-1>0\Rightarrow x<-1$ → $(-\infty,-1)$</p>
<p>ইন্টারসেকশন: $[-2,-1)$ — −2 এ বর্গ ব্র্যাকেট (সমান চলে), −1 এ গোল ব্র্যাকেট।</p>
<p><b>যাচাই:</b> $x=-3$ দিলে $\ln(2)$ ঠিক আছে, কিন্তু $\sqrt{-1}$ অসংজ্ঞায়িত — তাই −3 ডোমেনে নেই।</p>`)+img('rev/func/note_composite.jpg','তোমার নোট — সংযোজিত ফাংশনের ডোমেন (সংখ্যারেখায় ইন্টারসেকশন)')+R`</section>

<section class="ths" id="th-flog"><h3>৪. লগের ভিত্তি বদল</h3>
<div class="th-f"><b>সূত্র</b>
$$\log_{a^k}x=\frac1k\log_a x\qquad \log_{1/a}x=-\log_a x$$</div>
`+ex(R`<b>প্রশ্ন ১৬:</b> $\log_{\sqrt2}u=2\log_2u$, $\log_{0.5}u=-\log_2u$।
<p>$\log_2(x-4)+2\log_2(x^3-2)-\log_2(x-4)=20\Rightarrow\log_2(x^3-2)=10$</p>
<p>$x^3=1026\Rightarrow x=\sqrt[3]{1026}\approx10.086$ — শেষে $x-4>0$ যাচাই করো।</p>`)+R`</section>

<section class="ths" id="th-fexp"><h3>৫. e ও ln এর অভেদ</h3>
<div class="th-f"><b>সূত্র</b> $$e^{\ln m}=m,\qquad e^{k\ln m}=m^k$$</div>
`+ex(R`<b>প্রশ্ন ৫:</b> $e^{2\varphi(a)}=e^{2\ln\cos a}=\cos^2a$, $e^{2f(a)}=\sin^2a$।
<p>পার্থক্য $=\cos^2a-\sin^2a=\cos2a=e^{\ln\cos2a}=e^{\varphi(2a)}$ ✓</p>`)+R`</section>`;

X.sols.func={
3:pat('$\\sin^{-1}/\\cos^{-1}$ এর ভেতর $[-1,1]$ — ভগ্নাংশ অসমতা, হরের চিহ্নে দুই কেস।')+R`
<p><b>ধাপ ১ — শর্ত লিখি।</b> $\cos^{-1}t$ সংজ্ঞায়িত হতে $-1\le t\le1$, এখানে $t=\dfrac{2x}{x+1}$, আর $x\ne-1$।</p>
<p><b>ধাপ ২ — কেস ১: $x+1>0$ (অর্থাৎ $x>-1$)।</b> হর ধনাত্মক, তাই গুণ করলে চিহ্ন বদলায় না:</p>
$$-(x+1)\le2x\le x+1$$
<p>বাম অংশ: $-x-1\le2x\Rightarrow-1\le3x\Rightarrow x\ge-\tfrac13$</p>
<p>ডান অংশ: $2x\le x+1\Rightarrow x\le1$</p>
<p>দুটো মিলিয়ে $-\tfrac13\le x\le1$ — এরা সবাই $x>-1$ শর্ত মানে ✓</p>
<p><b>ধাপ ৩ — কেস ২: $x+1<0$ (অর্থাৎ $x<-1$)।</b> হর ঋণাত্মক, গুণ করলে অসমতা উল্টে যায়:</p>
$$-(x+1)\ge2x\ge x+1$$
<p>ডান অংশ $2x\ge x+1\Rightarrow x\ge1$ — কিন্তু আমরা $x<-1$ ধরেছি। বিরোধ, তাই এই কেসে কোনো সমাধান নেই।</p>`+box(R`ডোমেন $=\left[-\dfrac13,\ 1\right]$`)+R`
<p><b>ধাপ ৪ — রেঞ্জ।</b> $t=\dfrac{2x}{x+1}=2-\dfrac{2}{x+1}$। $x>-1$ এ $\dfrac{2}{x+1}$ কমতে থাকে, তাই $t$ <b>ক্রমবর্ধমান</b>।</p>
<p>$x=-\tfrac13$ এ: $t=\dfrac{-2/3}{2/3}=-1$ &nbsp;&nbsp; $x=1$ এ: $t=\dfrac22=1$</p>
<p>তাই $t$ পুরো $[-1,1]$ ঘুরে আসে, আর $\cos^{-1}$ এই ব্যবধিকে $[0,\pi]$ এ পাঠায় ($\cos^{-1}1=0$, $\cos^{-1}(-1)=\pi$)।</p>`+box(R`রেঞ্জ $=[0,\ \pi]$`)+tip(R`<b>দ্রুত যাচাই:</b> $x=0$ দিলে $\cos^{-1}0=\dfrac\pi2$ — ডোমেনে আছে, রেঞ্জেও আছে ✓। $x=2$ দিলে $\dfrac43>1$ — ডোমেনের বাইরে ✓।`),

4:pat('সংযোজিত ফাংশনের ডোমেন = ভেতরের শর্ত ∩ বাইরের শর্ত। সরল রূপ দেখে শর্ত হারিও না।')+R`
<p><b>ধাপ ১ — সংযোজিত ফাংশন বানাই।</b></p>
$$(g\circ f)(x)=g\big(f(x)\big)=g\big(\sqrt{x+2}\big)=\ln\!\Big(1-\big(\sqrt{x+2}\big)^2\Big)$$
$$=\ln\big(1-(x+2)\big)=\ln(-x-1)$$
<p><b>ধাপ ২ — ভেতরের শর্ত ($\sqrt{\ }$):</b> $x+2\ge0\Rightarrow x\ge-2$ → Set 1 $=[-2,\infty)$</p>
<p><b>ধাপ ৩ — বাইরের শর্ত ($\ln$):</b> $-x-1>0\Rightarrow-x>1\Rightarrow x<-1$ → Set 2 $=(-\infty,-1)$</p>
<p><b>ধাপ ৪ — ইন্টারসেকশন (দুটো একসাথে সত্য):</b></p>
$$[-2,\infty)\cap(-\infty,-1)=[-2,-1)$$`+box(R`$(g\circ f)(x)=\ln(-x-1)$, &nbsp; ডোমেন $=[-2,\,-1)$`)+tip(R`<b>ফাঁদ:</b> শুধু $\ln(-x-1)$ দেখলে ডোমেন $(-\infty,-1)$ মনে হয়। কিন্তু $x=-3$ দিলে ভেতরের $\sqrt{-1}$ অসংজ্ঞায়িত — তাই $x\ge-2$ শর্ত থাকতেই হবে। −2 এ <b>[</b> (সমান চলে), −1 এ <b>)</b> (ln 0 অসংজ্ঞায়িত)।`)+img('rev/func/note_composite.jpg','তোমার নোট — এই প্রশ্নের পূর্ণ ব্যাখ্যা ও ইন্টারসেকশন ডায়াগ্রাম')
};
X.notes.func={};

/* ======================= জটিল সংখ্যা ======================= */
X.theory.complex=R`
<div class="th-toc"><a data-jump="th-cre">বাস্তব-কাল্পনিক সমীকরণ</a><a data-jump="th-cw">ω এর নিয়ম</a><a data-jump="th-csq">বর্গমূল ও n-তম মূল</a><a data-jump="th-cpoly">বহুপদীর মান</a><a data-jump="th-cloc">সঞ্চারপথ</a><a data-jump="th-ccis">cosθ + i sinθ</a></div>

<section class="ths" id="th-cre"><h3>১. বাস্তব ও কাল্পনিক অংশ সমীকরণ</h3>
<p>$a+ib=c+id$ (সব বাস্তব) হলে $a=c$ <b>এবং</b> $b=d$। আগে দুই পক্ষকে $A+iB$ রূপে আনো।</p>
<div class="th-key">$i^2=-1$ বসাতে গিয়ে চিহ্ন ভুল সবচেয়ে বেশি হয়: $-ib\cdot ix=-i^2bx=+bx$।</div>
`+ex(R`<b>প্রশ্ন ৩:</b> $1-ix=(u-ib)(1+ix)=(u+bx)+i(ux-b)$।
<p>বাস্তব: $1=u+bx$ → $x=\dfrac{1-u}{b}$ &nbsp; কাল্পনিক: $-x=ux-b$ → $x=\dfrac{b}{1+u}$</p>
<p>দুটো সমান হয় কারণ $1-u^2=b^2$ — যা দেওয়া আছে।</p>`)+R`</section>

<section class="ths" id="th-cw"><h3>২. এককের ঘনমূল ω</h3>
<div class="th-f"><b>তিনটা জিনিস মুখস্থ</b>
$$\omega^3=1,\qquad 1+\omega+\omega^2=0,\qquad \omega=\tfrac12(-1+i\sqrt3)$$
<p>ঘাত কমাও ৩ দিয়ে ভাগশেষে: $\omega^{3n+r}=\omega^r$। আর $\dfrac1\omega=\omega^2$।</p>
<p>উৎপাদক: $a^3+b^3=(a+b)(a+\omega b)(a+\omega^2 b)$ এবং $(1-\omega)(1-\omega^2)=3$।</p></div>
`+ex(R`<b>প্রশ্ন ২৪:</b> $(1-\omega^2)(1-\omega^4)(1-\omega^8)(1-\omega^{10})$।
<p>$\omega^4=\omega,\ \omega^8=\omega^2,\ \omega^{10}=\omega$ → $\big[(1-\omega)(1-\omega^2)\big]^2=3^2=9$</p>`)+ex(R`<b>প্রশ্ন ৩১:</b> $\omega^n+\omega^{2n}$ = 2 (যদি $3\mid n$), নইলে $\omega+\omega^2=-1$।`)+R`</section>

<section class="ths" id="th-csq"><h3>৩. বর্গমূল ও n-তম মূল</h3>
<div class="th-f"><b>বর্গমূল সূত্র</b> ($z=a+ib$)
$$\sqrt{a+ib}=\pm\left(\sqrt{\frac{|z|+a}{2}}+i\,\sqrt{\frac{|z|-a}{2}}\right)\quad(b>0)$$
<p>$b<0$ হলে মাঝের চিহ্ন <b>বিয়োগ</b>।</p></div>
`+ex(R`$\sqrt{-5+12i}$: $|z|=13$ → $\sqrt{\tfrac{13-5}{2}}=2$, $\sqrt{\tfrac{13+5}{2}}=3$ → $\pm(2+3i)$।<br>যাচাই: $(2+3i)^2=4-9+12i=-5+12i$ ✓`)+R`
<div class="th-key"><b>পরিচিত বর্গ মুখস্থ রাখো:</b> $(1\pm i)^2=\pm2i$, &nbsp; $(\sqrt3\mp i)^2=2\mp2\sqrt3\,i$<br>n-তম মূলে: $x^n$ কে আগে $(x^2)^k$ রূপে লিখে ধাপে ধাপে মূল নাও। <b>মোট n টা মূল</b> আসবে।</div>
`+ex(R`<b>প্রশ্ন ২২:</b> $x^6=-64\Rightarrow(x^2)^3=(-4)^3\Rightarrow x^2=-4,\,-4\omega,\,-4\omega^2$
<p>$-4=(2i)^2$, $-4\omega=2-2\sqrt3i=(\sqrt3-i)^2$, $-4\omega^2=(\sqrt3+i)^2$ → ছয়টা মূল $\pm2i,\ \pm(\sqrt3\pm i)$।</p>`)+R`</section>

<section class="ths" id="th-cpoly"><h3>৪. জটিল মান থেকে বহুপদীর মান</h3>
<p>$x$ এর মান থেকে একটা ছোট দ্বিঘাত সমীকরণ বানাও (যার মান 0), তারপর বড় বহুপদীকে ওই রাশি দিয়ে ভাগ করো — শুধু ভাগশেষটাই উত্তর।</p>
`+ex(R`<b>প্রশ্ন ৩৮:</b> $x=2+\sqrt{-3}\Rightarrow(x-2)^2=-3\Rightarrow x^2-4x+7=0$।
<p>$3x^4-17x^3+41x^2-35x+5=(3x^2-5x)(x^2-4x+7)+5=0+5=5$</p>`)+R`</section>

<section class="ths" id="th-cloc"><h3>৫. সঞ্চারপথ (Locus)</h3>
<table class="th-tbl"><tr><th>শর্ত</th><th>বক্ররেখা</th></tr>
<tr><td>$|z-z_1|=k$</td><td>বৃত্ত, কেন্দ্র $z_1$, ব্যাসার্ধ k</td></tr>
<tr><td>$|z-z_1|=|z-z_2|$</td><td>$z_1z_2$ এর লম্বসমদ্বিখণ্ডক</td></tr>
<tr><td>$|z-z_1|+|z-z_2|=2a$</td><td>উপবৃত্ত, উপকেন্দ্র $z_1,z_2$; $b^2=a^2-c^2$</td></tr></table>
`+ex(R`<b>প্রশ্ন ৪৬:</b> $|z-1|+|z+1|=4$ → উপকেন্দ্র $\pm1$ (c = 1), 2a = 4 (a = 2), $b^2=4-1=3$
$$\frac{x^2}{4}+\frac{y^2}{3}=1\iff3x^2+4y^2=12$$
<b>প্রশ্ন ৪৮:</b> $|z+4|+|z-4|=10$ → c = 4, a = 5, $b^2=9$ → $\dfrac{p^2}{25}+\dfrac{q^2}{9}=1$`)+R`</section>

<section class="ths" id="th-ccis"><h3>৬. cosθ + i sinθ ও জ্যামিতি</h3>
<div class="th-f"><b>অর্ধকোণ সূত্র</b> $$1+\cos\theta=2\cos^2\tfrac\theta2,\qquad\sin\theta=2\sin\tfrac\theta2\cos\tfrac\theta2$$
<p>ডি ময়ভার: $(\cos\theta+i\sin\theta)^n=\cos n\theta+i\sin n\theta$। $iz$ মানে z কে 90° ঘোরানো।</p></div>
`+ex(R`<b>প্রশ্ন ৪৯:</b> $\dfrac{2}{1+z}=\dfrac{2(1+\cos\theta-i\sin\theta)}{2+2\cos\theta}=1-i\dfrac{\sin\theta}{1+\cos\theta}=1-i\tan\dfrac\theta2$`)+ex(R`<b>প্রশ্ন ৫১:</b> $0,\ z,\ z+iz,\ iz$ একটি বর্গ (বাহু $|z|$)। $z,\ iz,\ z+iz$ ত্রিভুজ তার অর্ধেক → ক্ষেত্রফল $\tfrac12|z|^2$।`)+R`</section>`;

X.sols.complex={
14:pat('$|z-z_1|+|z-z_2|=2a$ → উপবৃত্ত। একটা মূল এক পাশে রেখে দুবার বর্গ।')+R`
<p><b>ধাপ ১ — f বসাই।</b> $f(z+6)=(z+6)-2=z+4$, &nbsp; $f(z-2)=(z-2)-2=z-4$</p>
$$|z+4|+|z-4|=10,\qquad z=p+iq$$
<p><b>ধাপ ২ — একটা মূল ডানে নিই।</b></p>
$$\sqrt{(p+4)^2+q^2}=10-\sqrt{(p-4)^2+q^2}$$
<p><b>ধাপ ৩ — প্রথম বর্গ।</b></p>
$$(p+4)^2+q^2=100-20\sqrt{(p-4)^2+q^2}+(p-4)^2+q^2$$
<p>$q^2$ কাটে, আর $(p+4)^2-(p-4)^2=16p$:</p>
$$16p=100-20\sqrt{(p-4)^2+q^2}\ \Rightarrow\ 20\sqrt{(p-4)^2+q^2}=100-16p$$
$$\Rightarrow\ 5\sqrt{(p-4)^2+q^2}=25-4p$$
<p><b>ধাপ ৪ — আবার বর্গ।</b></p>
$$25(p^2-8p+16+q^2)=625-200p+16p^2$$
$$25p^2-200p+400+25q^2=625-200p+16p^2$$
<p>$-200p$ দুই পাশে কাটে:</p>
$$9p^2+25q^2=225\ \Rightarrow\ \frac{p^2}{25}+\frac{q^2}{9}=1$$`+box(R`$\dfrac{p^2}{5^2}+\dfrac{q^2}{3^2}=1$ (উপবৃত্ত)`)+tip(R`<b>শিটের চিহ্ন ভুল:</b> শিটে “$16p+100=20\sqrt{\ }$” ও “$4p+25$” লেখা — হবে $25-4p$। উত্তর একই আসে, কিন্তু লিখিত পরীক্ষায় নম্বর কাটবে।<br><b>শর্টকাট (MCQ):</b> উপকেন্দ্র $\pm4$ → c = 4; যোগফল 10 → a = 5; $b^2=a^2-c^2=9$।`)
};
X.notes.complex={};

/* ======================= স্থিতিবিদ্যা ======================= */
X.theory.statics=R`
<div class="th-toc"><a data-jump="th-sres">লব্ধি</a><a data-jump="th-slami">লামি ও ত্রিভুজ</a><a data-jump="th-sres3">অনেক বল: বিভাজন</a><a data-jump="th-spar">সমান্তরাল বল</a><a data-jump="th-smom">ভ্রামক ও দ্বন্দ্ব</a><a data-jump="th-sincl">হেলানো তল</a></div>

<section class="ths" id="th-sres"><h3>১. দুই বলের লব্ধি</h3>
<div class="th-f"><b>সূত্র</b>
$$R^2=P^2+Q^2+2PQ\cos\alpha,\qquad\tan\theta=\frac{Q\sin\alpha}{P+Q\cos\alpha}$$
<p>θ = লব্ধি ও P-এর মধ্যবর্তী কোণ। সমান বল P, P হলে $R=2P\cos\frac\alpha2$, লব্ধি কোণকে সমদ্বিখণ্ডিত করে।</p></div>
<div class="th-key"><b>লব্ধি P-এর ওপর লম্ব</b> ⇔ $P+Q\cos\alpha=0$ ⇔ $R^2=Q^2-P^2$। এটা ৭, ৯, ১১ নং প্রশ্নের চাবি।</div>
`+ex(R`<b>প্রশ্ন ৭:</b> R ⊥ P, $R=\tfrac Q3$ → $\tfrac{Q^2}{9}=Q^2-P^2\Rightarrow P^2=\tfrac{8Q^2}{9}\Rightarrow P:Q=2\sqrt2:3$`)+ex(R`<b>প্রশ্ন ৮:</b> 3P, 2P → $R^2=P^2(13+12\cos\alpha)$; 6P, 2P → $4R^2=P^2(40+24\cos\alpha)$।<br>$4(13+12\cos\alpha)=40+24\cos\alpha\Rightarrow24\cos\alpha=-12\Rightarrow\alpha=120^\circ$`)+R`</section>

<section class="ths" id="th-slami"><h3>২. লামির উপপাদ্য ও বলের ত্রিভুজ</h3>
<div class="th-f"><b>লামি</b> (তিন বল সাম্যাবস্থায়)
$$\frac{P}{\sin(\angle Q,R)}=\frac{Q}{\sin(\angle R,P)}=\frac{R}{\sin(\angle P,Q)}$$
<p>প্রতিটি বলের নিচে <b>অপর দুটির</b> মধ্যবর্তী কোণ।</p></div>
`+ex(R`<b>প্রশ্ন ৩১:</b> W = 6, P আনুভূমিক, Q আনুভূমিকের সাথে 30°।<br>কোণ: (Q, W) = 120°, (W, P) = 90°, (P, Q) = 150°<br>$\dfrac{P}{\sin120^\circ}=\dfrac{Q}{\sin90^\circ}=\dfrac{6}{\sin150^\circ}=12\Rightarrow Q=12,\ P=6\sqrt3$`)+R`
<div class="th-f"><b>বলের ত্রিভুজ</b>: একটা বিন্দুতে তিন বল ত্রিভুজের তিন বাহুর সমান্তরাল ও <b>একই ক্রমে</b> থাকলে বলগুলো বাহুর সমানুপাতিক। ভরকেন্দ্র থেকে মধ্যমা বরাবর বল হলে $P:Q:R=AD:BE:CF$।</div>
`+ex(R`<b>প্রশ্ন ৩৩:</b> অন্তঃকেন্দ্র O থেকে: $\angle BOC=90^\circ+\tfrac A2$ → $\sin BOC=\cos\tfrac A2$ → $P:Q:R=\cos\tfrac A2:\cos\tfrac B2:\cos\tfrac C2$`)+R`</section>

<section class="ths" id="th-sres3"><h3>৩. অনেক বল — X ও Y বরাবর বিভাজন</h3>
<p>$X=\sum F\cos\theta_i$, $Y=\sum F\sin\theta_i$, $R^2=X^2+Y^2$, $\tan\phi=\dfrac YX$ — চতুর্ভাগ দেখে কোণ ঠিক করো।</p>
<div class="th-key">সমবাহু ত্রিভুজের বাহু বরাবর একই ক্রমে বল $a,\,b,\,c$ হলে কোণ 0°, 120°, 240° → সমান অংশ কেটে যায়। $Q-R,\ Q,\ Q+R$ ধরনের হলে লব্ধি $=\sqrt3R$।</div>
`+ex(R`<b>প্রশ্ন ২৫:</b> 8, 10, 12 = Q − R, Q, Q + R (Q = 10, R = 2) → লব্ধি $=\sqrt3\times2=2\sqrt3$ N`)+R`</section>

<section class="ths" id="th-spar"><h3>৪. সমান্তরাল বল</h3>
<table class="th-tbl"><tr><th></th><th>সদৃশ (একই দিকে)</th><th>অসদৃশ (বিপরীত)</th></tr>
<tr><td>লব্ধি</td><td>$P+Q$</td><td>$P-Q$ (বড়টির দিকে)</td></tr>
<tr><td>ক্রিয়াবিন্দু C</td><td>AB-এর <b>ভেতরে</b>, $P\cdot AC=Q\cdot BC$</td><td>AB-এর <b>বাইরে</b>, বড় বলের পাশে, $P\cdot AC=Q\cdot BC$</td></tr></table>
<div class="th-f"><b>বল দুটির স্থান বিনিময় করলে লব্ধি সরে</b> $$d=\frac{P-Q}{P+Q}\cdot AB$$
<p>P-কে x দূরত্ব সরালে লব্ধি সরে $\dfrac{Px}{P+Q}$।</p></div>
`+ex(R`<b>প্রশ্ন ৬৩:</b> 16 N ও 12 N, AB = 21 → $d=\dfrac{4}{28}\times21=3$ cm`)+ex(R`<b>প্রশ্ন ৬২:</b> 10 N ও 6 N অসদৃশ, 8 cm → $10x=6(8+x)\Rightarrow x=12$ cm (10 N থেকে, বাইরে)`)+R`</section>

<section class="ths" id="th-smom"><h3>৫. ভ্রামক ও দ্বন্দ্ব</h3>
<p>ভ্রামক = বল × ক্রিয়ারেখা থেকে লম্ব দূরত্ব। দ্বন্দ্বের (সমান, বিপরীত, সমান্তরাল) লব্ধি বল শূন্য, শুধু ভ্রামক $bS$।</p>
<div class="th-key">দুটি বিন্দুর সাপেক্ষে ভ্রামক সমান ও একই দিকে হলে ক্রিয়ারেখা ওই দুই বিন্দুর সংযোগরেখার <b>সমান্তরাল</b>।</div>
`+ex(R`<b>প্রশ্ন ৫৯:</b> লব্ধি (P + Q)-এর সাথে দ্বন্দ্ব bS যোগ → মান একই, শুধু সরে: $(P+Q)\cdot CD=bS\Rightarrow CD=\dfrac{bS}{P+Q}$`)+ex(R`<b>প্রশ্ন ৬৪:</b> 4 m দণ্ড, ভার 30 মাঝখানে (A থেকে 2 m), A তে 10 → $10x=30(2-x)\Rightarrow x=1.5$ m`)+R`</section>

<section class="ths" id="th-sincl"><h3>৬. হেলানো তল</h3>
<div class="th-f"><b>সূত্র</b> (মসৃণ তল, নতি α)
<p>তল বরাবর বল: $P=W\sin\alpha$ &nbsp;&nbsp; আনুভূমিক বল: $Q=W\tan\alpha$</p>
$$\csc^2\alpha-\cot^2\alpha=1\ \Rightarrow\ \frac{1}{P^2}-\frac{1}{Q^2}=\frac{1}{W^2}$$</div>
`+ex(R`<b>প্রশ্ন ৪৭:</b> P = 12, Q = 15 → $\dfrac1{W^2}=\dfrac1{144}-\dfrac1{225}=\dfrac{81}{32400}=\dfrac1{400}\Rightarrow W=20$ N`)+R`</section>`;

X.sols.statics={
10:pat('বিভাজন উপপাদ্য: যেকোনো দিকে উপাংশের যোগফল = লব্ধির উপাংশ।')+R`
<p><b>ধাপ ১ — গঠন।</b> O থেকে ছেদকের ওপর লম্ব OX আঁকি। ছেদক বলগুলোর ক্রিয়ারেখাকে R, S, T বিন্দুতে কাটে (T লব্ধির রেখায়)।</p>
<p><b>ধাপ ২ — OX বরাবর উপাংশ।</b> লব্ধির উপাংশ = উপাংশের যোগফল:</p>
$$4P\cos\angle XOR+3P\cos\angle XOS=5P\cos\angle XOT$$
<p><b>ধাপ ৩ — cos কে দৈর্ঘ্যে লিখি।</b> সমকোণী $\triangle OXR$-এ $\cos\angle XOR=\dfrac{OX}{OR}$। একইভাবে $\dfrac{OX}{OS}$, $\dfrac{OX}{OT}$।</p>
$$4P\cdot\frac{OX}{OR}+3P\cdot\frac{OX}{OS}=5P\cdot\frac{OX}{OT}$$
<p><b>ধাপ ৪ — $P\cdot OX$ দিয়ে ভাগ।</b></p>`+box(R`$\dfrac{4}{OR}+\dfrac{3}{OS}=\dfrac{5}{OT}$ (দেখানো হলো)`)+tip(R`<b>সাধারণ রূপ:</b> P, Q বলের লব্ধি R হলে যেকোনো ছেদকের জন্য $\dfrac{P}{OR}+\dfrac{Q}{OS}=\dfrac{R}{OT}$। এখানে 4P, 3P লম্ব ($16+9=25$), তাই লব্ধি 5P।`),

11:pat('বাহু বরাবর বল → BC কে OX ধরে X, Y উপাংশ, তারপর বর্গ করে যোগ।')+R`
<p><b>ধাপ ১ — দিক।</b> BC বরাবর OX। তাহলে CA-এর দিক OX-এর সাথে $(\pi-C)$ কোণে, AB-এর দিক $(\pi+B)$ কোণে।</p>
<p><b>ধাপ ২ — উপাংশ।</b></p>
$$X=P+P\cos(\pi-C)+P\cos(\pi+B)=P(1-\cos C-\cos B)$$
$$Y=0+P\sin(\pi-C)+P\sin(\pi+B)=P(\sin C-\sin B)$$
<p><b>ধাপ ৩ — বর্গ করে খুলি (শিট এখানে লাইন বাদ দিয়েছে)।</b></p>
$$(1-\cos B-\cos C)^2=1+\cos^2B+\cos^2C-2\cos B-2\cos C+2\cos B\cos C$$
$$(\sin C-\sin B)^2=\sin^2C+\sin^2B-2\sin B\sin C$$
<p><b>ধাপ ৪ — যোগ।</b> $\cos^2B+\sin^2B=1$, $\cos^2C+\sin^2C=1$:</p>
$$\frac{F^2}{P^2}=3-2\cos B-2\cos C+2(\cos B\cos C-\sin B\sin C)=3-2\cos B-2\cos C+2\cos(B+C)$$
<p><b>ধাপ ৫ —</b> $B+C=\pi-A\Rightarrow\cos(B+C)=-\cos A$</p>`+box(R`$F=P\sqrt{3-2\cos A-2\cos B-2\cos C}$`)+tip(R`<b>যাচাই:</b> সমবাহু ত্রিভুজে $A=B=C=60^\circ$ → $3-3=0$, F = 0। ঠিক — তিনটা সমান বল ত্রিভুজের বাহু বরাবর একই ক্রমে থাকলে বন্ধ ত্রিভুজ, লব্ধি শূন্য।`),

14:pat('লামির উপপাদ্যের প্রমাণ — বলের সামান্তরিক + সাইন সূত্র।')+R`
<p><b>ধাপ ১ — ধরি।</b> O বিন্দুতে OX, OY, OZ বরাবর P, Q, R সাম্যাবস্থায়। প্রমাণ করতে হবে $\dfrac{P}{\sin YOZ}=\dfrac{Q}{\sin ZOX}=\dfrac{R}{\sin XOY}$।</p>
<p><b>ধাপ ২ — সামান্তরিক।</b> OX থেকে OA = P, OY থেকে OB = Q কেটে সামান্তরিক OACB আঁকি। কর্ণ OC হলো P ও Q-এর লব্ধি।</p>
<p><b>ধাপ ৩ — সাম্যাবস্থা।</b> P, Q-এর লব্ধি তৃতীয় বল R-এর সমান ও বিপরীত। তাই OC = R এবং OC হলো OZ-এর ঠিক বিপরীত দিকে।</p>
<p><b>ধাপ ৪ — $\triangle OAC$।</b> OA = P, AC = OB = Q (সামান্তরিকের বিপরীত বাহু), OC = R। সাইন সূত্র:</p>
$$\frac{OA}{\sin\angle OCA}=\frac{AC}{\sin\angle AOC}=\frac{OC}{\sin\angle OAC}$$
<p><b>ধাপ ৫ — কোণগুলো।</b></p>
<p>$\angle OCA=\angle COB$ (একান্তর, AC ∥ OB) $=180^\circ-\angle YOZ$ (কারণ OC, OZ-এর বিপরীত)</p>
<p>$\angle AOC=180^\circ-\angle ZOX$ (একই কারণে)</p>
<p>$\angle OAC=180^\circ-\angle AOB=180^\circ-\angle XOY$ (সামান্তরিকের সন্নিহিত কোণ)</p>
<p><b>ধাপ ৬ —</b> $\sin(180^\circ-x)=\sin x$ বসিয়ে:</p>`+box(R`$\dfrac{P}{\sin YOZ}=\dfrac{Q}{\sin ZOX}=\dfrac{R}{\sin XOY}$`)+tip(R`<b>মনে রাখার কৌশল:</b> প্রতিটি বলের নিচে থাকে <b>অপর দুই বলের</b> মধ্যবর্তী কোণের sine। শিটের ছবিতে ভেক্টর চিহ্ন (□) ছাপা হয়নি — এখানে পুরো প্রমাণ।`)
};
X.notes.statics={
1:R`শিটের হাইলাইটে ছাপা ভাঙা: $\tan\theta=\dfrac{m-1}{m+1}$ (প্রমাণিত)`,
2:R`শিটের হাইলাইটে ছাপা ভাঙা: $P=\dfrac{3\pm\sqrt5}{2}$ একক`,
6:R`শিটের হাইলাইটে ছাপা ভাঙা: $R=\sqrt{F^2\cos^2\dfrac\alpha2+G^2\sin^2\dfrac\alpha2}$`,
7:R`শিটের হাইলাইটে ছাপা ভাঙা: $\alpha=\cos^{-1}\dfrac{Q-P}{Q}$ এবং $\alpha=2\sin^{-1}\sqrt{\dfrac{P}{2Q}}$ — কারণ $1-\cos\alpha=2\sin^2\frac\alpha2=\frac PQ$`,
9:R`শিটের হাইলাইটে ছাপা ভাঙা: অন্তর্গত কোণ $=3\cos^{-1}\dfrac{P}{2Q}$, লব্ধি $R=\dfrac{P^2-Q^2}{Q}$`,
16:R`শিটের হাইলাইটে ছাপা ভাঙা: $\dfrac{P}{AD}=\dfrac{Q}{BE}=\dfrac{R}{CF}$ — কারণ $GH=\tfrac23AD$, $HC=\tfrac23BE$, $CG=\tfrac23CF$`,
17:R`শিটের হাইলাইটে ছাপা ভাঙা: $P:Q:R=\cos\dfrac A2:\cos\dfrac B2:\cos\dfrac C2$`,
20:R`শিটের হাইলাইটে ছাপা ভাঙা: $\dfrac{1}{P^2}-\dfrac{1}{Q^2}=\dfrac{1}{W^2}$ (প্রমাণিত)`,
22:R`শিটের হাইলাইটে ছাপা ভাঙা: $AC=\dfrac{Q}{P-Q}\cdot AB$ — কারণ $P\cdot AC=Q(AB+AC)$`,
25:R`শিটের হাইলাইটে ছাপা ভাঙা: $DE=\dfrac{Px}{P+Q}$ (প্রমাণিত)`,
26:R`শিটের হাইলাইটে ছাপা ভাঙা: $S=R-\dfrac{(Q-R)^2}{P-Q}$ (প্রমাণিত)`,
27:R`শিটের হাইলাইটে ছাপা ভাঙা: $CD=\dfrac{bS}{P+Q}$ (প্রমাণিত)`
};

/* ======================= তাপগতিবিদ্যা ======================= */
X.theory.thermo=R`
<div class="th-toc"><a data-jump="th-tsc">তাপমাত্রার স্কেল</a><a data-jump="th-tcal">ক্যালরিমিতি</a><a data-jump="th-t1">১ম সূত্র</a><a data-jump="th-tad">রুদ্ধতাপীয়</a><a data-jump="th-tent">এন্ট্রপি</a><a data-jump="th-tcar">কার্নো ও রেফ্রিজারেটর</a></div>

<section class="ths" id="th-tsc"><h3>১. তাপমাত্রার স্কেল ও প্রসারণ</h3>
<div class="th-f"><b>সূত্র</b> $$\frac{C}{5}=\frac{F-32}{9}=\frac{K-273}{5}\qquad\Delta L=L\alpha\,\Delta\theta$$</div>
`+ex(R`<b>প্রশ্ন ১:</b> F ও K সমান পাঠ x: $\dfrac{x-273}{5}=\dfrac{x-32}{9}\Rightarrow4x=2297\Rightarrow x=574.25$`)+ex(R`<b>প্রশ্ন ৪:</b> Al: $20\times2.4\times10^{-5}\times75=0.036$ cm, ইস্পাত: $40\times1.2\times10^{-5}\times75=0.036$ cm → মোট 0.72 mm`)+R`</section>

<section class="ths" id="th-tcal"><h3>২. ক্যালরিমিতি — বর্জিত তাপ = গৃহীত তাপ</h3>
<p>$Q=ms\Delta\theta$ (তাপমাত্রা বদল), $Q=mL$ (অবস্থা বদল), $Pt=Q$ (হিটার)।</p>
<div class="th-key">একই তরল মেশালে: $\theta=\dfrac{m_1\theta_1+m_2\theta_2}{m_1+m_2}$। তিন তরলের প্রশ্নে আগে $s_A:s_B:s_C$ অনুপাত বের করো।</div>
`+ex(R`<b>প্রশ্ন ৫:</b> 0.25 kg 80°C + 1.25 kg 20°C → $\theta=\dfrac{0.25(80)+1.25(20)}{1.5}=30^\circ$C`)+ex(R`<b>প্রশ্ন ১০:</b> $t=\dfrac{mL_v}{P}=\dfrac{2\times2.09\times10^4}{100}=418$ s $=6.97$ min`)+R`</section>

<section class="ths" id="th-t1"><h3>৩. তাপগতিবিদ্যার ১ম সূত্র</h3>
<div class="th-f"><b>সূত্র</b> $$Q=\Delta U+W,\qquad W=P\Delta V$$
<p>Q: শোষিত (+), W: সিস্টেম দ্বারা কৃত (+)।</p></div>
`+ex(R`<b>প্রশ্ন ১৪:</b> 900 J শোষণ, 300 J কাজ → $\Delta U=600$ J`)+ex(R`<b>প্রশ্ন ১৫:</b> $W=1.013\times10^5\times(1671-1)\times10^{-6}=169$ J`)+R`</section>

<section class="ths" id="th-tad"><h3>৪. রুদ্ধতাপীয় প্রক্রিয়া</h3>
<div class="th-f"><b>তিন রূপ</b>
$$PV^\gamma=\text{ধ্রুবক},\qquad TV^{\gamma-1}=\text{ধ্রুবক},\qquad \frac{P_2}{P_1}=\left(\frac{T_2}{T_1}\right)^{\frac{\gamma}{\gamma-1}}$$
<p>ঘনত্বে: $V\propto\frac1\rho$ → $P\rho^{-\gamma}=$ ধ্রুবক।</p></div>
<div class="th-key">“কত গুণ বৃদ্ধি” = অনুপাত − 1। 128 গুণ হলে বৃদ্ধি 127 গুণ। আর সবসময় K-এ কাজ করো।</div>
`+ex(R`<b>প্রশ্ন ১৮:</b> 300 K → 1200 K, γ = 1.4: $\dfrac{P_2}{P_1}=4^{3.5}=128$ → 127 গুণ বৃদ্ধি`)+ex(R`<b>প্রশ্ন ১৯:</b> $T_2=288\times\left(\tfrac14\right)^{2/3}=114.29$ K $=-158.7^\circ$C`)+R`</section>

<section class="ths" id="th-tent"><h3>৫. এন্ট্রপি</h3>
<div class="th-f"><b>সূত্র</b> $$\Delta S=\frac{mL}{T}\ (\text{অবস্থা বদল}),\qquad \Delta S=ms\ln\frac{T_2}{T_1}\ (\text{তাপমাত্রা বদল})$$</div>
`+ex(R`<b>প্রশ্ন ২১:</b> $\Delta S=2\times4200\times\ln\dfrac{373}{303}=8400\times0.2079=1745.9$ J/K`)+ex(R`<b>প্রশ্ন ২২:</b> −10°C বরফ → 0°C পানি: $10(0.5)\ln\frac{273}{263}+\frac{10\times80}{273}=0.187+2.930=3.12$ cal/K`)+R`</section>

<section class="ths" id="th-tcar"><h3>৬. কার্নো ইঞ্জিন ও রেফ্রিজারেটর</h3>
<div class="th-f"><b>সূত্র</b> $$\eta=1-\frac{T_2}{T_1}=\frac{W}{Q_1},\qquad\frac{Q_2}{Q_1}=\frac{T_2}{T_1},\qquad K=\frac{T_2}{T_1-T_2}=\frac{Q_2}{W}$$</div>
`+ex(R`<b>প্রশ্ন ৩১:</b> $\eta=\tfrac14\Rightarrow T_2=\tfrac34T_1$; $T_2$ 65 কমালে $\eta=\tfrac12$: $\tfrac12=1-\tfrac34+\tfrac{65}{T_1}\Rightarrow T_1=260$ K, $T_2=195$ K`)+ex(R`<b>প্রশ্ন ৩৫:</b> $K=\dfrac{273}{27}=10.11$, $W=\dfrac{336000}{10.11}=33231$ J`)+R`</section>`;
X.sols.thermo={};
X.notes.thermo={};

/* ======================= আদর্শ গ্যাস ======================= */
X.theory.gas=R`
<div class="th-toc"><a data-jump="th-glaw">গ্যাস সূত্র</a><a data-jump="th-groom">ঘরের বাতাস</a><a data-jump="th-gpv">PV = nRT</a><a data-jump="th-gspd">গড় বেগ</a><a data-jump="th-gke">গতিশক্তি</a><a data-jump="th-gmfp">গড় মুক্ত পথ</a><a data-jump="th-ghum">আর্দ্রতা</a></div>

<section class="ths" id="th-glaw"><h3>১. সমন্বিত গ্যাস সূত্র</h3>
<div class="th-f"><b>সূত্র</b> $$\frac{P_1V_1}{T_1}=\frac{P_2V_2}{T_2}\qquad(\text{n ধ্রুব; বদলালে }\frac{PV}{nT}\text{ ধ্রুব})$$</div>
<div class="th-key">“আয়তন কত বৃদ্ধি” চাইলে $V_2-V_1$, শুধু $V_2$ নয়। বুদবুদে চাপ = বায়ুমণ্ডল + পানির স্তম্ভ (h)।</div>
`+ex(R`<b>প্রশ্ন ২:</b> $V_2=\dfrac{76}{7.6}\times\dfrac{219}{300}\times30=219$ m³ → বৃদ্ধি 189 m³`)+ex(R`<b>প্রশ্ন ৬:</b> 20% দ্রবীভূত → $n_2=0.8n_1$: $\dfrac{(10+H)\cdot3}{n_1}=\dfrac{10\cdot6}{0.8n_1}\Rightarrow H=15$ m`)+R`</section>

<section class="ths" id="th-groom"><h3>২. ঘরের বাতাস ঢোকা / বের হওয়া</h3>
<p>P ও V স্থির → $n\propto\frac1T$। ঠান্ডা হলে বাতাস <b>ঢোকে</b>।</p>
<div class="th-key">কার তুলনায় শতকরা? প্রাথমিক বাতাসের তুলনায় $\dfrac{\Delta T}{T_2}$, চূড়ান্ত বাতাসের তুলনায় $\dfrac{\Delta T}{T_1}$। অপশন দেখে ঠিক করো।</div>
`+ex(R`<b>প্রশ্ন ৮:</b> 310 K → 295 K: $\dfrac{15}{310}=4.84\%$ (চূড়ান্ত বাতাসের তুলনায় নতুন বাতাস)`)+R`</section>

<section class="ths" id="th-gpv"><h3>৩. PV = nRT — ভর ও মোল</h3>
<p>$n=\dfrac{PV}{RT}$, ভর $m=nM$। একই চাপের দুই পাত্রে $m\propto\dfrac VT$।</p>
`+ex(R`<b>প্রশ্ন ১১:</b> $\dfrac{m_Y}{m_X}=\dfrac{V/400}{2V/200}=\dfrac14$ → $m_Y=\dfrac m4$`)+ex(R`<b>প্রশ্ন ১২:</b> $\Delta n=\dfrac{(2.5-1.3)\times10^5\times10^{-2}}{8.314\times300}=0.481$ mol → ×32 = 15.39 g`)+R`</section>

<section class="ths" id="th-gspd"><h3>৪. গ্যাস অণুর বেগ</h3>
<table class="th-tbl"><tr><th>বেগ</th><th>সূত্র</th><th>অনুপাত</th></tr>
<tr><td>মূল গড় বর্গ (rms)</td><td>$\sqrt{3RT/M}$</td><td>1.73</td></tr>
<tr><td>গড় (mean)</td><td>$\sqrt{8RT/\pi M}$</td><td>1.60</td></tr>
<tr><td>সম্ভাব্যতম (mp)</td><td>$\sqrt{2RT/M}$</td><td>1.41</td></tr></table>
`+ex(R`<b>প্রশ্ন ১৪:</b> বেগ দ্বিগুণ → T চারগুণ: $300\times4=1200$ K $=927^\circ$C (54°C নয়!)`)+R`</section>

<section class="ths" id="th-gke"><h3>৫. গতিশক্তি ও স্বাধীনতার মাত্রা</h3>
<div class="th-f"><b>সূত্র</b> $$E=\frac f2nRT\qquad f=3\ (\text{রৈখিক/চলন}),\ f=5\ (\text{দ্বিপরমাণুক মোট})$$</div>
`+ex(R`<b>প্রশ্ন ১৮:</b> শুধু “গতিশক্তি” → রৈখিক: $\tfrac32(0.25)(8.314)(303)=944.68$ J<br><b>প্রশ্ন ১৯:</b> “মোট গতিশক্তি”, N₂ → f = 5: $\tfrac52\cdot\tfrac{3}{28}\cdot8.314\cdot302=672.5$ J`)+R`</section>

<section class="ths" id="th-gmfp"><h3>৬. গড় মুক্ত পথ</h3>
<div class="th-f"><b>সূত্র</b> $$\lambda=\frac{1}{\sqrt2\,\pi\sigma^2 n}=\frac{RT}{\sqrt2\,\pi\sigma^2PN_A}\qquad\sigma=2r\ (\text{ব্যাস})$$</div>
`+ex(R`<b>প্রশ্ন ২০:</b> r = 1 Å → σ = 2×10⁻¹⁰ m, P = 3 atm → $\lambda=7.67\times10^{-8}$ m। ব্যাসার্ধ বসালে উত্তর ৪ গুণ বড় আসে।`)+R`</section>

<section class="ths" id="th-ghum"><h3>৭. আর্দ্রতা ও বাষ্পচাপ</h3>
<p>আপেক্ষিক আর্দ্রতা $=\dfrac{f}{F}$ (প্রকৃত ÷ সম্পৃক্ত বাষ্পচাপ)। ঠান্ডা হলে F কমে; f &gt; নতুন F হলে বাড়তি বাষ্প ঘনীভূত হয়।</p>
`+ex(R`<b>প্রশ্ন ২৩:</b> $f=0.7\times25.21=17.647$ mm; 18°C এ F = 15.48 → ঘনীভূত $\dfrac{17.647-15.48}{17.647}=12.28\%$`)+ex(R`<b>প্রশ্ন ২১:</b> $P=31.83\times10^{-3}\times13600\times9.8=4242$ Pa, $n=\dfrac{PV}{RT}=252.6$ mol → ×18 = 4.55 kg`)+R`</section>`;
X.sols.gas={};
X.notes.gas={5:R`শিটের হাইলাইটে ছাপা ভাঙা: $m_Y=\dfrac m4$ → উত্তর (a)`};

/* ======================= গুণগত রসায়ন ======================= */
X.theory.qual=R`
<div class="th-toc"><a data-jump="th-qspec">H বর্ণালি</a><a data-jump="th-qph">ফোটন শক্তি</a><a data-jump="th-qconf">ইলেকট্রন বিন্যাস</a><a data-jump="th-qsol">দ্রাব্যতা</a><a data-jump="th-qksp">Ksp ও অধঃক্ষেপ</a><a data-jump="th-qcom">সম-আয়ন প্রভাব</a><a data-jump="th-qext">দ্রাবক নিষ্কাশন</a><a data-jump="th-qflame">শিখা পরীক্ষা</a></div>

<section class="ths" id="th-qspec"><h3>১. হাইড্রোজেন বর্ণালি</h3>
<div class="th-f"><b>সূত্র</b> $$\frac1\lambda=R_H\left(\frac1{n_L^2}-\frac1{n_H^2}\right)$$
$$\text{রেখার সংখ্যা}=\frac{(n_H-n_L)(n_H-n_L+1)}{2}$$</div>
<table class="th-tbl"><tr><th>সিরিজ</th><th>$n_L$</th><th>অঞ্চল</th></tr>
<tr><td>লাইম্যান</td><td>1</td><td>UV</td></tr><tr><td>বামার</td><td>2</td><td>দৃশ্যমান</td></tr><tr><td>পাশ্চেন</td><td>3</td><td>IR</td></tr></table>
`+ex(R`<b>প্রশ্ন ৭৮:</b> 6 → 2: বামার, রেখা $\frac{4\times5}{2}=10$, $\frac1\lambda=R_H\cdot\frac29$ → 410 nm (দৃশ্যমান)`)+ex(R`<b>প্রশ্ন ৬৪:</b> 4 → 2: $\frac1\lambda=R_H\cdot\frac{3}{16}$ → $\lambda=\dfrac{16}{3R_H}$ (উল্টাতে ভুলো না)`)+R`</section>

<section class="ths" id="th-qph"><h3>২. ফোটনের শক্তি ও আলোক-তড়িৎ</h3>
<div class="th-f"><b>সূত্র</b> $$E=h\nu=\frac{hc}{\lambda},\qquad E_k=h\nu-h\nu_0,\qquad E_{\text{মোল}}=E\times N_A$$
<p>1 J = 10⁷ erg, 1 eV = 1.6×10⁻¹⁹ J, 1 amu ≡ 931.5 MeV।</p></div>
`+ex(R`<b>প্রশ্ন ৪৭:</b> $E_k=9.939\times10^{-19}-6.626\times10^{-34}\times1.1\times10^{15}=2.65\times10^{-19}$ J`)+ex(R`<b>প্রশ্ন ২৪ শর্টকাট:</b> Δm = 3.184 amu → $3.184\times931.5=2966$ MeV → ÷239 = 12.4 MeV/নিউক্লিয়ন`)+R`</section>

<section class="ths" id="th-qconf"><h3>৩. ইলেকট্রন বিন্যাস</h3>
<p>ক্রম: 1s 2s 2p 3s 3p <b>4s 3d</b> 4p <b>5s 4d</b> 5p 6s 4f 5d 6p 7s।</p>
<div class="th-key"><b>ব্যতিক্রম:</b> Cr (3d⁵4s¹), Cu (3d¹⁰4s¹), Mo, Ag (4d¹⁰5s¹), Au। অর্ধপূর্ণ/পূর্ণ d বেশি স্থিতিশীল।</div>
`+ex(R`<b>প্রশ্ন ৪৬:</b> …4d¹⁰5s¹ → মোট 47 → Ag; …6s¹ (55) → Cs; …7s¹ (87) → Fr`)+R`</section>

<section class="ths" id="th-qsol"><h3>৪. দ্রাব্যতা ও কেলাসন</h3>
<p>দ্রাব্যতা S = 100 g <b>দ্রাবকে</b> দ্রবের ভর। সম্পৃক্ত দ্রবণের ভর = 100 + S।</p>
<div class="th-key">ফাঁদ: “250 g সম্পৃক্ত দ্রবণ” মানে দ্রব + দ্রাবক মিলে 250 g — দ্রাবক 250 g নয়।</div>
`+ex(R`<b>প্রশ্ন ৮৫:</b> 50°C এ 185 g দ্রবণে 85 g লবণ; 25°C এ নামালে 35 g পৃথক → 250 g থেকে $\dfrac{35\times250}{185}=47.3$ g`)+R`</section>

<section class="ths" id="th-qksp"><h3>৫. Ksp ও অধঃক্ষেপণের শর্ত</h3>
<table class="th-tbl"><tr><th>ধরন</th><th>Ksp</th></tr>
<tr><td>AB (AgCl)</td><td>$S^2$</td></tr><tr><td>AB₂ / A₂B (Mg(OH)₂, Ag₂CO₃)</td><td>$4S^3$</td></tr><tr><td>AB₃ (Al(OH)₃)</td><td>$27S^4$</td></tr></table>
<div class="th-key">মেশানোর পর <b>নতুন মোট আয়তন</b> দিয়ে ঘনমাত্রা হিসাব করো। $K_{ip}>K_{sp}$ হলে অধঃক্ষেপ পড়বে।<br>ভিন্ন ধরনের লবণ (AB বনাম A₂B) হলে শুধু Ksp দেখে দ্রাব্যতা তুলনা করা যায় না — S বের করো।</div>
`+ex(R`<b>প্রশ্ন ১০৩:</b> 40 mL 0.3 M Ag⁺ + 20 mL 0.1 M Cl⁻ → $[Ag^+]=0.2$, $[Cl^-]=0.0333$ → $K_{ip}=6.7\times10^{-3}>1.8\times10^{-10}$ → অধঃক্ষেপ পড়বে`)+ex(R`<b>প্রশ্ন ৭:</b> $[OH^-]=\sqrt{10^{-11}/0.1}=10^{-5}$ → pOH 5 → pH 9`)+R`</section>

<section class="ths" id="th-qcom"><h3>৬. সম-আয়ন প্রভাব <small>তোমার দ্রাব্যতা নোট</small></h3>
<div class="th-f"><b>সূত্র</b> (যোগ করা সম-আয়নের ঘনমাত্রা x, নতুন দ্রাব্যতা $s_1\ll x$)
<p>AB টাইপ: $s_1=\dfrac{K_{sp}}{x}$ &nbsp;&nbsp; AB₂ টাইপে OH⁻ সম-আয়ন: $s_1=\dfrac{K_{sp}}{x^2}$</p></div>
`+ex(R`<b>প্রশ্ন ১০৫:</b> Ca(OH)₂, $K_{sp}=4.42\times10^{-5}$, মেশানোর পর $[OH^-]=0.2$ M → $s_1=\dfrac{4.42\times10^{-5}}{0.04}=1.105\times10^{-3}$ M`)+img('rev/qual/note_solub1.jpg','তোমার দ্রাব্যতা নোট — পৃষ্ঠা ১')+img('rev/qual/note_solub2.jpg','তোমার দ্রাব্যতা নোট — পৃষ্ঠা ২')+R`</section>

<section class="ths" id="th-qext"><h3>৭. দ্রাবক নিষ্কাশন</h3>
<div class="th-f"><b>সূত্র</b> (V = পানির আয়তন, v = প্রতিবার জৈব দ্রাবক, n বার)
$$W_n=W_0\left(\frac{V}{K_Dv+V}\right)^n$$
<p>$K_D$ জৈব দ্রাবকের অনুকূলে নিতে হবে; উল্টো দেওয়া থাকলে $1/K_D$।</p></div>
`+ex(R`<b>প্রশ্ন ৯৪:</b> $K_D=\frac1{0.167}=6$, 90% নিষ্কাশন: $\frac1{10}=\frac{1000}{6v+1000}\Rightarrow v=1500$ mL`)+R`</section>

<section class="ths" id="th-qflame"><h3>৮. শিখা পরীক্ষা</h3>
<table class="th-tbl"><tr><th>ধাতু</th><th>বর্ণ</th></tr>
<tr><td>Li</td><td>টকটকে লাল</td></tr><tr><td>Na</td><td>সোনালি হলুদ</td></tr><tr><td>K</td><td>হালকা বেগুনি</td></tr><tr><td>Ca</td><td>ইটের মতো লাল</td></tr><tr><td>Sr</td><td>উজ্জ্বল লাল</td></tr><tr><td>Ba</td><td>আপেল সবুজ</td></tr></table>
`+ex(R`<b>প্রশ্ন ১২৯:</b> গাঢ় HCl দিয়ে ভেজানো হয় — উদ্বায়ী ক্লোরাইড তৈরি হয়, তাই শিখায় দ্রুত বাষ্পীভূত হয়ে বর্ণ দেয়।`)+R`</section>`;

X.sols.qual={
35:pat('সম-আয়ন প্রভাব, AB₂ টাইপ লবণ: $K_{sp}=s_1(x)^2$। তোমার দ্রাব্যতা নোটের প্রশ্ন এটাই।')+R`
<p><b>ধাপ ১ — বিশুদ্ধ পানিতে দ্রাব্যতা।</b> $Ca(OH)_2\rightleftharpoons Ca^{2+}+2OH^-$</p>
$$K_{sp}=S\,(2S)^2=4S^3=4.42\times10^{-5}\Rightarrow S^3=1.105\times10^{-5}\Rightarrow S=0.02227\ \text{M}$$
<p>500 mL এ দ্রবীভূত: $0.02227\times0.5=0.011135$ mol</p>
<p><b>ধাপ ২ — মেশানোর পর সম-আয়ন।</b> মোট আয়তন 500 + 500 = 1000 mL = 1 L</p>
$$[OH^-]_{NaOH}=\frac{0.5\times0.4}{1}=0.2\ \text{M}$$
<p><b>ধাপ ৩ — নতুন দ্রাব্যতা $s_1$।</b> $[Ca^{2+}]=s_1$, $[OH^-]=0.2+2s_1\approx0.2$ (কারণ $2s_1\ll0.2$)</p>
$$K_{sp}=s_1(0.2)^2\Rightarrow s_1=\frac{4.42\times10^{-5}}{0.04}=1.105\times10^{-3}\ \text{M}$$
<p>(2s₁ বাদ না দিলে: $s_1(0.2+2s_1)^2=4.42\times10^{-5}\Rightarrow s_1=1.081\times10^{-3}$ M — শিট এটা নিয়েছে।)</p>
<p><b>ধাপ ৪ — অধঃক্ষিপ্ত মোল ও ভর।</b> 1 L এ এখন দ্রবীভূত থাকে $1.105\times10^{-3}$ mol</p>
$$\Delta n=0.011135-0.001105=0.01003\ \text{mol}$$
$$m=0.01003\times74=0.742\ \text{g}=742\ \text{mg}$$`+box(R`হ্রাসকৃত দ্রাব্যতা $\approx1.1\times10^{-3}$ M; অধঃক্ষিপ্ত Ca(OH)₂ $\approx742$ mg (সঠিক হিসাবে 745 mg)`)+tip(R`<b>742 না 745?</b> দুটোই সঠিক পদ্ধতি — পার্থক্য শুধু $2s_1$ রাখা-না-রাখায়। MCQ-তে কাছের অপশনটাই নাও। <b>ফাঁদ:</b> প্রাথমিক মোল বের করতে 0.5 L দিয়ে গুণ, শেষে 1 L দিয়ে — আয়তন বদলে যায়।`)+img('rev/qual/note_solub1.jpg','তোমার দ্রাব্যতা নোট — থিওরি ও সূত্রের তুলনা')+img('rev/qual/note_solub2.jpg','তোমার দ্রাব্যতা নোট — ধাপভিত্তিক সমাধান')
};
X.notes.qual={
10:R`শর্টকাট যাচাই: $\Delta m\times931.5=3.184\times931.5\approx2966$ MeV → প্রতি নিউক্লিয়নে $\approx12.4$ MeV`,
21:R`শিটের হাইলাইটে ছাপা ভাঙা: $\lambda=\dfrac{16}{3R_H}$ → উত্তর (a)`
};
})();
