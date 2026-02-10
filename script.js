/* ====== الأصوات ====== */
const clickSound = new Howl({
  src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
  volume: 0.6
});

const popSound = new Howl({
  src: ['https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3'],
  volume: 0.6
});

const laughs = [
  new Howl({ src:['https://assets.mixkit.co/active_storage/sfx/427/427-preview.mp3'], volume:0.8 }),
  new Howl({ src:['https://assets.mixkit.co/active_storage/sfx/466/466-preview.mp3'], volume:0.8 }),
  new Howl({ src:['https://assets.mixkit.co/active_storage/sfx/439/439-preview.mp3'], volume:0.8 })
];

let voiceEnabled = true;
const replies = [
"😂 ضحكتني بجد",
"🤣 دماغك دي محتاجة صيانة",
"😆 التفكير ده خطر",
"😂 لا لا كده كتير",
"🤣 إنت جاي تهزر رسمي",
"😜 الكلام ده كبير",
"😅 بسيطة يا نجم",
"😂 جت معاك",
"🤣 ضربة معلم",
"😆 إحساس عالي",

"😂 واضح إنك فايق",
"🤣 دماغ شقية",
"😜 ثقة زيادة",
"😆 خلصانة",
"😂 حاول تاني",
"🤣 ضحك رسمي",
"😅 كمل",
"😂 إنت كده تمام",
"😆 دماغك سبقانا",
"🤣 جامدة",

"😂 لا تعليق",
"😜 خطر على المجتمع",
"🤣 عبقري بس غلط",
"😆 ماشي الحال",
"😂 دماغك قالت سلام"
,
"🤣 إبداع غير متوقع",
"😂 التفكير ده محتاج فلتر",
"😆 لا لا استنى",
"🤣 ضحك من القلب",
"😜 انت كده بتهزر",
"😂 دي جت فجأة",
"😅 عادي بتحصل",
"🤣 إحنا بنضحك اهو",
"😆 تمام كمل",
"😂 مخك سابقك",

"🤣 جامد اوي",
"😜 الكلام ده خطر",
"😂 إيه ده",
"😆 مش بطالة",
"🤣 رسمي",
"😅 حاول تظبطها",
"😂 لا لا",
"😜 دماغ عالية",
"🤣 ضحكني",
"😆 استمر",

"😂 ضربة حظ",
"🤣 مش متوقعة",
"😜 تمام يا كبير",
"😆 سهلة",
"😂 عبث جميل"
,
"🤣 دماغ مبدعة",
"😂 هزار تقيل",
"😆 مش بطال",
"😜 انت خطر",
"🤣 استنى بس",
"😂 كلام كبير",
"😅 عدت",
"🤣 حلوة",
"😆 لا بأس",
"😂 دماغك غريبة",

"🤣 جابت معاك",
"😜 هزار عالي",
"😂 شغل مخك",
"😆 تمام كده",
"🤣 ضحك بسيط",
"😅 عادي",
"😂 فلتت",
"😜 سابق الزمن",
"🤣 دماغ فريدة",
"😆 تمام",

"😂 مقبولة",
"🤣 جامدة شوية",
"😜 تفكيرك مجنون",
"😆 نكمل",
"😂 خلاص"
,
"🤣 دي حلوة",
"😂 لا مؤاخذة",
"😆 استمر",
"😜 برافو",
"🤣 ضحكني",
"😂 تمام عليك",
"😅 سهلة",
"🤣 دماغك ناشفة",
"😆 ماشي",
"😂 تمام",

"🤣 كلام موزون",
"😜 عجباني",
"😂 فكرة مجنونة",
"😆 حلوة",
"🤣 نضحك شوية",
"😅 كمل",
"😂 تمام قوي",
"😜 مش طبيعي",
"🤣 خلصانة",
"😆 جامدة"
];
/* ====== العناصر ====== */
const btn = document.getElementById("btn");
const input = document.getElementById("textInput");
const result = document.getElementById("result");
const card = document.getElementById("card");

const laughBtn = document.getElementById("laughBtn");
const countSpan = document.getElementById("count");
const topSpan = document.getElementById("top");
const resetBtn = document.getElementById("resetBtn");
const voiceToggle = document.getElementById("voiceToggle");

/* ====== الصوت ====== */
voiceToggle.onclick = () => {
  voiceEnabled = !voiceEnabled;
  voiceToggle.innerText = voiceEnabled ? "🔊 الصوت شغال" : "🔇 الصوت مقفول";
};

function speak(text){
  if(!voiceEnabled || !("speechSynthesis" in window)) return;
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "ar-EG";
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

/* ====== العداد ====== */
let laughCount = Number(localStorage.getItem("laughCount")) || 0;
let topLaugh = Number(localStorage.getItem("topLaugh")) || 0;

countSpan.innerText = laughCount;
topSpan.innerText = topLaugh;

laughBtn.onclick = () => {
  laughCount++;
  localStorage.setItem("laughCount", laughCount);
  countSpan.innerText = laughCount;

  if(laughCount > topLaugh){
    topLaugh = laughCount;
    localStorage.setItem("topLaugh", topLaugh);
    topSpan.innerText = topLaugh;
  }

  if(voiceEnabled){
    laughs[Math.floor(Math.random()*laughs.length)].play();
  }
};

resetBtn.onclick = () => {
  laughCount = 0;
  localStorage.setItem("laughCount", 0);
  countSpan.innerText = 0;
};
btn.onclick = () => {
  if(input.value.trim() === "") return;

  btn.disabled = true;
  clickSound.play();

  input.value = "";

  const r = replies[Math.floor(Math.random() * replies.length)];
  result.innerText = r;

  if(voiceEnabled){
    popSound.play();
    speak(r);
  }

  confetti({
    particleCount: 90,
    spread: 80,
    origin: { y: 0.6 }
  });

  card.classList.add("shake");

  setTimeout(() => {
    btn.disabled = false;
    card.classList.remove("shake");
  }, 1000);
};
