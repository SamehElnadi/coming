const sessionSpan = document.getElementById("sessionCount");
const totalSpan = document.getElementById("totalCount");

const btn = document.getElementById("btn");
const input = document.getElementById("textInput");
const resultDiv = document.getElementById("result");
const verseListDiv = document.getElementById("verseList");

const tasbeehBtns = document.querySelectorAll(".tasbeeh-btn");
const subCounters = [
  document.getElementById("subCount0"),
  document.getElementById("subCount1"),
  document.getElementById("subCount2")
];

let sessionCount = 0;
let totalCount = Number(localStorage.getItem("totalCount")) || 0;
let voiceEnabled = true;

function updateCounter(n, container) {
  container.innerText = n;
}
updateCounter(sessionCount, sessionSpan);
updateCounter(totalCount, totalSpan);

/* ===== جدول الكلمات والآيات ===== */
const quranTable = [
  { keyword: "العبادات", verses: [{ verse: "صيام، قيام، تراويح، تهجد، قرآن، دعاء، ليلة القدر، اعتكاف، طاعات، حسنات، مغفرة، عتق من النار." }]},
  { keyword: "الروحانيات", verses: [{ verse: "ذكر الله، صلاة، تهجد، صيام، دعاء، تقرب لله بالروحانيات." }]},
  { keyword: "شهر رمضان", verses: [{ verse: "﴿شَهْرُ رَمَضَانَ ...﴾ [البقرة: 185]" }]},
  { keyword: "فرضية الصيام", verses: [{ verse: "﴿يَا أَيُّهَا الَّذِينَ آمَنُوا ...﴾ [البقرة: 183]" }]},
  { keyword: "أحكام الصيام", verses: [
    { verse: "﴿أَيَّامًا مَّعْدُودَاتٍ ...﴾ [البقرة: 184]" },
    { verse: "﴿أُحِلَّ لَكُمْ لَيْلَةَ الصِّيَامِ ...﴾ [البقرة: 187]" }
  ]}
];

/* ===== عرض النتائج ===== */
btn.onclick = () => {
  const val = input.value.trim().toLowerCase();
  if (!val) return;

  verseListDiv.innerHTML = "";
  resultDiv.innerText = "";

  const found = quranTable.find(x => val.includes(x.keyword.toLowerCase()));

  if (found) {
    found.verses.forEach((v, i) => {
      if (i === 0) resultDiv.innerText = v.verse;
      const div = document.createElement("div");
      div.className = "verse-item";
      div.innerText = v.verse;
      div.onclick = () => div.classList.toggle("expanded");
      verseListDiv.appendChild(div);
    });
  } else {
    resultDiv.innerText = "لا يوجد نتيجة";
  }
};

/* ===== أزرار التسبيح ===== */
tasbeehBtns.forEach((btn,index)=>{
  let subCount = 0;
  btn.onclick = () => {
    subCount++;
    subCounters[index].innerText = subCount;

    sessionCount++;
    totalCount++;
    updateCounter(sessionCount, sessionSpan);
    updateCounter(totalCount, totalSpan);
    localStorage.setItem("totalCount", totalCount);
  };
});

/* ===== مسح العداد الدائم ===== */
document.getElementById("resetTotal").onclick = () => {
  totalCount = 0;
  localStorage.setItem("totalCount",0);
  updateCounter(totalCount, totalSpan);
};

/* ===== زر كتم الصوت (لا أصوات موجودة) ===== */
document.getElementById("voiceToggle").onclick = () => {
  voiceEnabled = !voiceEnabled;
  document.getElementById("voiceToggle").innerText = voiceEnabled ? "🔊 الصوت" : "🔇 الصوت";
};
