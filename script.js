/* ===== الأصوات ===== */
const tasbeehSounds = [
  new Howl({ src:['https://freesound.org/data/previews/415/415209_5121236-lq.mp3'], volume:0.8 }),
  new Howl({ src:['https://freesound.org/data/previews/415/415210_5121236-lq.mp3'], volume:0.8 }),
  new Howl({ src:['https://freesound.org/data/previews/415/415211_5121236-lq.mp3'], volume:0.8 })
];
const alert99Sound = new Howl({ src:['https://freesound.org/data/previews/415/415212_5121236-lq.mp3'], volume:0.8 });

let voiceEnabled = true;

/* ===== العناصر ===== */
const sessionSpan = document.getElementById("sessionCount");
const totalSpan = document.getElementById("totalCount");
const resetTotal = document.getElementById("resetTotal");
const popup = document.getElementById("popup");
const voiceToggle = document.getElementById("voiceToggle");

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

/* ===== جدول الكلمات والآيات النهائي ===== */
const quranTable = [
  { keyword: "العبادات", verses: [{ verse: "الصيام، قيام، تراويح، تهجد، قرآن، دعاء، ليلة القدر، اعتكاف، طاعات، حسنات، مغفرة، عتق من النار", audio: null }]},
  { keyword: "الروحانيات", verses: [{ verse: "ذكر الله، صلاة، تهجد، صيام، دعاء، تقرب لله بالروحانيات", audio: null }]},
  { keyword: "هلال", verses: [{ verse: "رؤية الهلال علامة بداية الشهر", audio: null }]},
  { keyword: "غروب", verses: [{ verse: "وقت المغرب عند الغروب", audio: null }]},
  { keyword: "شروق", verses: [{ verse: "وقت الفجر عند الشروق", audio: null }]},
  { keyword: "سحور", verses: [{ verse: "وجبة السحور قبل الفجر", audio: null }]},
  { keyword: "إفطار", verses: [{ verse: "الإفطار عند غروب الشمس", audio: null }]},
  { keyword: "فانوس", verses: [{ verse: "زينة رمضان، فانوس مضيء", audio: null }]},
  { keyword: "رمضان كريم", verses: [{ verse: "رمضان كريم", audio: null }]},
  { keyword: "مبارك عليكم الشهر", verses: [{ verse: "مبارك عليكم الشهر", audio: null }]},
  { keyword: "تمر", verses: [{ verse: "التمر من مأكولات رمضان", audio: null }]},
  { keyword: "قطايف", verses: [{ verse: "القطايف حلوى رمضانية", audio: null }]},
  { keyword: "كنافة", verses: [{ verse: "الكنافة مشهورة في رمضان", audio: null }]},
  { keyword: "كل عام وأنتم بخير", verses: [{ verse: "كل عام وأنتم بخير", audio: null }]},
  { keyword: "أعاده الله عليكم بالخير والبركات", verses: [{ verse: "أعاده الله عليكم بالخير والبركات", audio: null }]},
  { keyword: "شهر رمضان", verses: [{ verse: "﴿شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ ۚ فَمَن شَهِدَ مِنكُمُ الشَّهْرَ فَلْيَصُمْهُ ۖ وَمَن كَانَ مَرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ ۗ يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ﴾ [البقرة: 185]", audio: null }]},
  { keyword: "فرضية الصيام", verses: [{ verse: "﴿يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ﴾ [البقرة: 183]", audio: null }]},
  { keyword: "أحكام الصيام", verses: [{ verse: "﴿أَيَّامًا مَّعْدُودَاتٍ ۚ فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ ۚ وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ ۖ فَمَن تَطَوَّعَ خَيْرًا فَهُوَ خَيْرٌ لَّهُ ۚ وَأَن تَصُومُوا خَيْرٌ لَّكُمْ ۖ إِن كُنتُمْ تَعْلَمُونَ﴾ [البقرة: 184]", audio: null }]},
  { keyword: "قرب", verses: [
    { verse: "{وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ} [البقرة: 186]", audio: null },
    { verse: "{إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ} [الأعراف: 56]", audio: null },
    { verse: "{قُلْ إِن كُنتُمْ تُحِبُّونَ اللَّهَ فَاتَّبِعُونِي يُحْبِبْكُمُ اللَّهُ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ} [آل عمران: 31]", audio: null },
    { verse: "{إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ} [الحجرات: 13]", audio: null },
    { verse: "{وَاسْجُدْ وَاقْتَرِب} [العلق: 19]", audio: null },
    { verse: "{واذكر ربك في نفسك تضرعا وخيفة} [الأعراف: 205]", audio: null },
    { verse: "{إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ} [البقرة: 222]", audio: null },
    { verse: "{وَمَا أَمْوَالُكُمْ وَلَا أَوْلادُكُم بِالَّتِي تُقَرِّبُكُمْ عِندَنَا زُلْفَىٰ إِلَّا مَنْ آمَنَ وَعَمِلَ صَالِحًا} [سبأ: 37]", audio: null },
    { verse: "{تَتَجَافَىٰ جُنُوبُهُمْ عَنِ الْمَضَاجِعِ يَدْعُونَ رَبَّهُمْ خَوْفًا وَطَمَعًا} [السجدة: 16]", audio: null }
  ]}
];

/* ===== العدادات ===== */
let sessionCount = 0;
let totalCount = Number(localStorage.getItem("totalCount")) || 0;

function updateCounter(n, container){
  container.innerHTML = "";
  const digits = n.toString().split('');
  digits.forEach(d => {
    const box = document.createElement("span");
    box.className = "counter-box";
    box.innerText = d;
    container.appendChild(box);
  });
}
updateCounter(sessionCount, sessionSpan);
updateCounter(totalCount, totalSpan);

/* ===== أزرار التسبيح ===== */
tasbeehBtns.forEach((btn,index)=>{
  let subCount = 0;
  btn.onclick = () => {
    subCount++;
    subCounters[index].innerText = subCount;

    if(voiceEnabled && tasbeehSounds[index]) tasbeehSounds[index].play();

    sessionCount++;
    totalCount++;
    updateCounter(sessionCount, sessionSpan);
    updateCounter(totalCount, totalSpan);
    localStorage.setItem("totalCount", totalCount);

    if(sessionCount === 99){
      popup.style.display = "flex";
      if(voiceEnabled && alert99Sound) alert99Sound.play();
      setTimeout(()=>{
        popup.style.display = "none";
        sessionCount = 0;
        updateCounter(sessionCount, sessionSpan);
      },2000);
    }
  };
});

/* ===== مسح العداد الدائم ===== */
resetTotal.onclick = () => {
  totalCount = 0;
  localStorage.setItem("totalCount",0);
  updateCounter(totalCount, totalSpan);
};

/* ===== تشغيل / إيقاف الصوت ===== */
voiceToggle.onclick = () => {
  voiceEnabled = !voiceEnabled;
  voiceToggle.innerText = voiceEnabled ? "🔊 الصوت شغال" : "🔇 الصوت مقفول";
};

/* ===== عرض الآيات ===== */
btn.onclick = () => {
  const val = input.value.trim().toLowerCase();
  if(val === "") return;

  const found = quranTable.find(x => val.includes(x.keyword.toLowerCase()));
  verseListDiv.innerHTML = "";
  resultDiv.innerText = "";

  if(found){
    found.verses.forEach((v,i)=>{
      if(i === 0) resultDiv.innerText = v.verse;

      const div = document.createElement("div");
      div.className = "verse-item";
      div.innerHTML = `<span>${v.verse}</span> <button>🔊</button>`;
      const btnAudio = div.querySelector("button");

      btnAudio.onclick = (e)=>{
        e.stopPropagation();
        if(voiceEnabled && v.audio){
          new Howl({ src:[v.audio], volume:0.8 }).play();
        }
      };

      div.onclick = ()=>{
        resultDiv.innerText = v.verse;
        div.classList.toggle("expanded");
      };
      verseListDiv.appendChild(div);
    });
  } else {
    resultDiv.innerText = "لا يوجد نتيجة";
  }
};
