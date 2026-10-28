const $ = (s) => document.querySelector(s);
const todayKey = () => new Date().toLocaleDateString('sv-SE');
const defaultTasks = [
  {id:crypto.randomUUID(),name:'Kitap oku',category:'Okuma',done:false},
  {id:crypto.randomUUID(),name:'Gitar çalış',category:'Müzik',done:false},
  {id:crypto.randomUUID(),name:'Spor / hareket hedefini tamamla',category:'Spor',done:false},
  {id:crypto.randomUUID(),name:'Beslenme planına uy',category:'Kişisel',done:false},
  {id:crypto.randomUUID(),name:'Günün harcamalarını kontrol et',category:'Finans',done:false}
];
const defaultGoals = [
  {id:crypto.randomUUID(),name:'Ayda 4 kitap bitir',progress:0},
  {id:crypto.randomUUID(),name:'Gitarda ve sahne performansında geliş',progress:0},
  {id:crypto.randomUUID(),name:'Gelirin %20’sini biriktir / yatır',progress:0},
  {id:crypto.randomUUID(),name:'Düzenli spor ve beslenme rutini',progress:0}
];
function load(key, fallback){try{const x=JSON.parse(localStorage.getItem(key));return x ?? fallback}catch{return fallback}}
let day = todayKey();
let daily = load('hedefler_daily', {});
let tasks = daily.date === day ? daily.tasks : defaultTasks;
let goals = load('hedefler_goals', defaultGoals);
let filter = 'all';
function save(){localStorage.setItem('hedefler_daily',JSON.stringify({date:day,tasks}));localStorage.setItem('hedefler_goals',JSON.stringify(goals))}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderTasks(){
 const list=$('#taskList'); const shown=tasks.filter(t=>filter==='all'||(filter==='done'?t.done:!t.done));
 list.innerHTML=shown.length?shown.map(t=>`<div class="task ${t.done?'done':''}"><input type="checkbox" data-check="${t.id}" ${t.done?'checked':''} aria-label="Görevi tamamla"><div class="task-main"><div class="task-name">${escapeHtml(t.name)}</div><span class="tag">${escapeHtml(t.category)}</span></div><button class="delete" data-delete="${t.id}" aria-label="Görevi sil">×</button></div>`).join(''):'<div class="empty">Bu filtrede görev yok.</div>';
 const done=tasks.filter(t=>t.done).length;const pct=tasks.length?Math.round(done/tasks.length*100):0;
 $('#progressPercent').textContent=pct+'%';$('#progressText').textContent=`${done} / ${tasks.length} tamamlandı`;
}
function renderGoals(){
 $('#goalList').innerHTML=goals.length?goals.map(g=>`<div class="goal"><div class="goal-top"><div class="goal-name">${escapeHtml(g.name)}</div><span class="goal-percent">${g.progress}%</span><button class="delete" data-goal-delete="${g.id}" aria-label="Hedefi sil">×</button></div><input type="range" min="0" max="100" step="5" value="${g.progress}" data-progress="${g.id}" aria-label="${escapeHtml(g.name)} ilerleme yüzdesi"></div>`).join(''):'<div class="empty">Henüz hedef eklemedin.</div>';
}
function render(){renderTasks();renderGoals();save()}
$('#today').textContent=new Intl.DateTimeFormat('tr-TR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date());
$('#taskList').addEventListener('change',e=>{const id=e.target.dataset.check;if(!id)return;const t=tasks.find(x=>x.id===id);if(t)t.done=e.target.checked;render()});
$('#taskList').addEventListener('click',e=>{const id=e.target.dataset.delete;if(!id)return;tasks=tasks.filter(t=>t.id!==id);render()});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));renderTasks()}));
$('#taskForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#taskInput');const name=input.value.trim();if(!name)return;tasks.push({id:crypto.randomUUID(),name,category:$('#taskCategory').value,done:false});input.value='';render()});
$('#goalForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#goalInput');const name=input.value.trim();if(!name)return;goals.push({id:crypto.randomUUID(),name,progress:0});input.value='';renderGoals();save()});
$('#goalList').addEventListener('input',e=>{const id=e.target.dataset.progress;if(!id)return;const g=goals.find(x=>x.id===id);if(g){g.progress=Number(e.target.value);e.target.previousElementSibling.querySelector('.goal-percent').textContent=g.progress+'%';save()}});
$('#goalList').addEventListener('click',e=>{const id=e.target.dataset.goalDelete;if(!id)return;goals=goals.filter(g=>g.id!==id);renderGoals();save()});
$('#resetDay').addEventListener('click',()=>{if(confirm('Bugünkü tüm görevlerin işaretlerini kaldırmak istiyor musun?')){tasks=tasks.map(t=>({...t,done:false}));render()}});
render();
