// assets/site.js
// Members -> details interaction + expanded intros + image fallback

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('membersList');
  const detailAvatar = document.getElementById('detailAvatar');
  const detailName = document.getElementById('detailName');
  const detailHobby = document.getElementById('detailHobby');
  const detailRoll = document.getElementById('detailRoll');
  const detailDesc = document.getElementById('detailDesc');

  // Expanded intro mapping
  const intros = {
    "Praveen Kumar": [
      "Praveen Kumar is an aspiring game developer who loves designing small interactive experiences. He focuses on core gameplay loops, level flow, and prototyping mechanics quickly.",
      "His practice routine includes building short prototypes, iterating on player feedback, and learning new tools and engines. Praveen enjoys solving design puzzles and tuning difficulty to make games feel fair and fun.",
      "Recent projects include a 2D platformer prototype exploring movement feel, and a puzzle mini-game that experiments with physics-based interactions. He documents lessons learned and shares builds for playtesting.",
      "Want to try his games? Visit the Game Development gallery to see builds and concept art, or use the contact icons to request a demo or give feedback."
    ],
    "Pooja": [
      "Pooja is a creative video editor who turns raw footage into engaging short videos and social reels. She focuses on rhythm, storytelling, and color correction to enhance mood.",
      "Her workflow includes cutting for pacing, adding motion graphics, and experimenting with sound design. Pooja studies editing techniques by remixing short clips and recreating styles she admires.",
      "Recent works include a travel montage, a short documentary-style piece, and several social media reels where she practices fast-cut storytelling and color grading.",
      "See examples in the Video Editing gallery, or contact Pooja via the icons to ask about her workflow or collaboration."
    ],
    "Aditya Sidhant": [
      "Aditya Sidhant specializes in game testing and QA. He carefully plays builds to find bugs, report reproducible steps, and suggest improvements to controls and balance.",
      "His work helps make games more stable and enjoyable. Aditya focuses on edge-case scenarios, player progression flow, and ensuring consistent behavior across platforms.",
      "Recent contributions include full playthrough reports for a platformer prototype and a spreadsheet of reproducible issues that the design team used to prioritize fixes.",
      "Visit the Game Testing gallery for bug logs, example reports, and notes about testing methods. Contact Aditya via icons for testing or feedback sessions."
    ]
  };

  // initial show: first card
  if(list){
    const first = list.querySelector('.member-card');
    if(first) showCard(first);
  }

  // click handler
  if(list){
    list.addEventListener('click', (e)=>{
      const card = e.target.closest('.member-card');
      if(card) showCard(card);
    });
  }

  function showCard(card){
    // highlight
    document.querySelectorAll('.member-card').forEach(c=>c.classList.remove('active'));
    card.classList.add('active');

    const name = card.dataset.name || '';
    const roll = card.dataset.roll || '';
    const hobby = card.dataset.hobby || '';
    const desc = card.dataset.desc || '';
    const imgEl = card.querySelector('img.thumb');

    // update UI
    detailName.textContent = name;
    detailHobby.textContent = hobby;
    detailRoll.textContent = roll;
    if(imgEl && imgEl.src) detailAvatar.src = imgEl.src;
    else detailAvatar.src = 'assets/unknown-person.svg';

    // fill expanded intro if available
    const paragraphs = intros[name];
    if(paragraphs){
      detailDesc.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
    } else {
      detailDesc.innerHTML = `<p>${desc}</p>`;
    }
  }

  // === Image fallback for all images ===
  (function(){
    const fallback = 'assets/unknown-person.svg';
    document.querySelectorAll('img').forEach(img=>{
      img.addEventListener('error', ()=>{
        if (!img._fallbackApplied) {
          img._fallbackApplied = true;
          img.src = fallback;
          img.classList.add('fallback');
        }
      });
      if (img.complete && img.naturalWidth === 0) {
        img.dispatchEvent(new Event('error'));
      }
    });
  })();
});
