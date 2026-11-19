const videoList=document.querySelector('#video-list');
const videoPlayer=document.querySelector('#video-player');
const clips=[...videoList.querySelectorAll('[data-video]')].map(button=>({
 id:button.dataset.video,
 title:button.querySelector('span').textContent,
 thumbnail:button.querySelector('img').src
}));
let current=0;
videoList.hidden=true;
const controls=document.createElement('div');
controls.className='video-controls';
controls.innerHTML='<p class="video-caption" aria-live="polite"></p><div class="video-nav"><button type="button" data-step="-1">ก่อนหน้า</button><span class="video-count"></span><button type="button" data-step="1">ถัดไป</button></div>';
videoPlayer.after(controls);
const caption=controls.querySelector('.video-caption');
const count=controls.querySelector('.video-count');

function showClip(){
 const clip=clips[current];
 caption.textContent=clip.title;
 count.textContent=(current+1)+' / '+clips.length;
 const play=document.createElement('button');
 play.type='button';
 play.className='video-preview';
 play.setAttribute('aria-label','เล่นวิดีโอ '+clip.title);
 const thumbnail=document.createElement('img');
 thumbnail.src=clip.thumbnail;
 thumbnail.alt='';
 const label=document.createElement('span');
 label.textContent='เล่นวิดีโอ';
 play.append(thumbnail,label);
 play.onclick=()=>{
  const frame=document.createElement('iframe');
  frame.title=clip.title;
  frame.referrerPolicy='strict-origin-when-cross-origin';
  frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.allowFullscreen=true;
  frame.src='https://www.youtube-nocookie.com/embed/'+clip.id+'?autoplay=1&playsinline=1';
  videoPlayer.replaceChildren(frame);
  frame.focus();
 };
 videoPlayer.replaceChildren(play);
}
controls.addEventListener('click',event=>{
 const control=event.target.closest('button[data-step]');
 if(!control)return;
 current=(current+Number(control.dataset.step)+clips.length)%clips.length;
 showClip();
});
showClip();