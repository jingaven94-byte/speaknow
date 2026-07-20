// ─── SpeakNow v2 ───
// 解决翻墙问题：默认使用B站播放视频，国内可直接访问

const $ = id => document.getElementById(id);
const esc = s => { if(!s) return ''; const d = document.createElement('div'); d.textContent = s; return d.innerHTML; };
const today = () => new Date().toISOString().slice(0,10);
const now = () => Date.now();
const dateCN = ds => { const d = new Date(ds); return (d.getMonth()+1)+'月'+d.getDate()+'日 星期'+['日','一','二','三','四','五','六'][d.getDay()]; };

// ─── TED Talk Data ───
// 视频来源：B站（国内可访问）+ YouTube + TED官网
var TALKS = [
  {
    id:1, title:"The Power of Vulnerability", titleCn:"脆弱的力量",
    speaker:"Brené Brown", duration:"20:19",
    bvid:"BV1Qs411k7qE", // B站视频ID（TED官方账号）
    youtube:"iCvmsMzlF7o",
    tedId:"brené_brown_on_vulnerability",
    topic:"psychology",
    lines:[
      {time:25, en:"So, I'll start with this: a couple years ago, an event planner called me because I was going to do a speaking event.", cn:"那么，我先从这儿开始：几年前，一个活动策划人打电话给我，因为我要做一个演讲活动。"},
      {time:33, en:"And she called and she said, \"I'm really struggling with how to write about you on the little flyer.\"", cn:"她打电话跟我说：'我真的不知道该在海报上怎么介绍你。'"},
      {time:39, en:"And I thought, \"Well, what's the struggle?\"", cn:"我就想：'这有什么难的？'"},
      {time:42, en:"And she said, \"Well, I saw you speak, and I'm going to call you a researcher, but if I call you a researcher, no one will come, because they think you're boring.\"", cn:"她说：'我听过你的演讲，我打算叫你研究员，但如果我叫你研究员，没人会来，他们觉得你很无聊。'"},
      {time:50, en:"And I was like, \"Okay.\"", cn:"我当时就说：'好吧。'"},
      {time:52, en:"And she said, \"But the thing I liked about your talk is you're a storyteller. So I'm just going to call you a storyteller.\"", cn:"她说：'但我喜欢你的演讲的地方是你是个讲故事的人。所以我就叫你讲故事的人吧。'"},
      {time:58, en:"And the academic, insecure part of me was like, \"You're going to call me a what?\"", cn:"我学术的、不安全感的那部分跳出来说：'你叫我什么？'"},
      {time:61, en:"And she said, \"I'm going to call you a storyteller.\"", cn:"她说：'我要叫你讲故事的人。'"},
      {time:63, en:"And I was like, \"Why not 'magic pixie'?\"", cn:"我就说：'为什么不叫我神奇的精灵呢？'"},
      {time:66, en:"I tried to call deep on my courage, and I thought, you know, I am a storyteller.", cn:"我努力鼓起勇气，然后想，你知道吗，我是个讲故事的人。"},
      {time:70, en:"I'm a qualitative researcher. I collect stories; that's what I do.", cn:"我是一个定性研究员。我收集故事；这就是我的工作。"},
      {time:74, en:"And maybe stories are just data with a soul, and maybe I'm just a storyteller.", cn:"也许故事就是有灵魂的数据，也许我只是一个讲故事的人。"},
      {time:78, en:"And so I said, \"Why don't you just say I'm a researcher-storyteller.\"", cn:"所以我说：'你为什么不直接说我是个研究员兼讲故事的人。'"},
      {time:81, en:"And she went, \"Ha ha. There's no such thing.\"", cn:"她哈哈哈地说：'哪有这种说法。'"},
      {time:85, en:"So I'm a researcher-storyteller, and I'm going to talk to you today about a piece of my research that fundamentally expanded my perspective.", cn:"所以我是个研究员兼讲故事的人，今天我要和你们聊聊我的一项研究，它从根本上拓展了我的认知。"},
      {time:98, en:"And this is where my story starts.", cn:"而我的故事从这儿开始。"},
      {time:100, en:"When I was a young researcher, my first year as a doctoral student, I had a research professor who said, \"If you can't measure it, it doesn't exist.\"", cn:"当我还是个年轻的研究员、博士生的第一年，我有一位研究教授说：'如果你无法衡量它，它就不存在。'"},
      {time:108, en:"I thought he was just sweet-talking me. I was like, \"Really?\" and he was like, \"Absolutely.\"", cn:"我以为他只是在哄我。我说：'真的吗？'他说：'绝对。'"},
      {time:113, en:"I have a bachelor's and a master's in social work, and I was getting my Ph.D. in social work.", cn:"我有社会工作学士和硕士学位，当时正在攻读博士学位。"},
      {time:118, en:"So my entire academic career was surrounded by people who believed in \"life's messy, love it.\"", cn:"所以我整个学术生涯都被信奉'生活就是一团乱，爱上它'的人包围着。"},
      {time:122, en:"But I'm more of the \"life's messy, clean it up, organize it and put it into a bento box.\"", cn:"而我更像是'生活是一团乱，那就收拾好整理好放进便当盒里'。"},
      {time:128, en:"One of the big sayings in social work is \"Lean into the discomfort of the work.\"", cn:"社会工作领域有句名言：'迎向工作中的不适。'"},
      {time:131, en:"But I'm like, knock discomfort upside the head and move it over and get all A's.", cn:"而我则是把不适打到一边去然后拿全A。那就是我的座右铭。"},
      {time:136, en:"So I was very excited about this. I thought, this is the career for me, because I am interested in some messy topics.", cn:"所以我对这个非常兴奋。我想这就是适合我的职业，因为我对一些混乱的话题感兴趣。"},
      {time:142, en:"But I want to be able to make them not messy. I want to understand them.", cn:"但我想把它们变得不混乱。我想理解它们。"},
      {time:146, en:"I want to hack into these things that I know are important and lay the code out for everyone to see.", cn:"我想破解这些我知道很重要的事情，然后把规律摊开给大家看。"},
      {time:151, en:"So where I started was with connection.", cn:"所以我从连接开始。"},
      {time:154, en:"Because by the time you're a social worker for 10 years, what you realize is that connection is why we're here.", cn:"因为当你做了10年社会工作者后，你意识到连接是我们存在的意义。"},
      {time:160, en:"It's what gives purpose and meaning to our lives. This is what it's all about.", cn:"它赋予我们生活的目的和意义。这就是一切的核心。"},
      {time:165, en:"We know that connection is the ability to feel seen, to feel heard, to feel valued.", cn:"我们知道连接是一种被看见、被听见、被重视的能力。"},
      {time:170, en:"And it's the ability to give that back. That's all it is.", cn:"并且有能力给予回馈。仅此而已。"},
      {time:175, en:"So I started this research, and I thought, this is what I'm going to do.", cn:"于是我开始这项研究，我想这就是我要做的事。"},
      {time:180, en:"I'm going to study connection, I'm going to understand it, I'm going to know everything there is to know about it.", cn:"我要研究连接，我要理解它，我要知道关于它的一切。"},
      {time:186, en:"And about six weeks into this research, I ran into this unnamed thing that absolutely unraveled connection.", cn:"大约研究六周后，我遇到了这个无名之物，它彻底瓦解了连接。"},
      {time:192, en:"I pulled back out of the research and thought, I need to figure out what this is.", cn:"于是我退后一步，心想我得弄清楚这是什么。"},
      {time:196, en:"And it turned out to be shame.", cn:"结果发现是羞耻感。"},
      {time:199, en:"Shame is really easily understood as the fear of disconnection.", cn:"羞耻很容易理解：就是害怕失去连接。"},
      {time:203, en:"Is there something about me that, if other people know it or see it, I won't be worthy of connection?", cn:"是不是我身上有什么东西，如果别人知道或看到了，我就不值得被连接了？"},
      {time:208, en:"It's universal; we all have it. The only people who don't experience shame have no capacity for empathy or connection.", cn:"它是普遍的；我们每个人都有。唯一没有羞耻感的人也没有同理心或连接的能力。"},
      {time:215, en:"No one wants to talk about it, and the less you talk about it, the more you have it.", cn:"没人想谈论它，你越不谈论它，你就越有它。"},
      {time:220, en:"What underpinned this shame was excruciating vulnerability.", cn:"支撑这种羞耻感的是令人痛苦的脆弱。"},
      {time:223, en:"The idea that, in order for connection to happen, we have to allow ourselves to be seen, really seen.", cn:"为了让连接发生，我们必须允许自己被看见，真正被看见。"},
      {time:230, en:"Vulnerability pushed, I pushed back. I lost the fight, but probably won my life back.", cn:"脆弱在推进，我在反抗。我输了这场战斗，但可能赢回了我的生活。"},
      {time:236, en:"I spent the next couple of years trying to understand what the whole-hearted people were doing differently.", cn:"我花了接下来几年时间，想理解那些全心投入生活的人做得有什么不同。"},
      {time:243, en:"Why do we struggle with vulnerability so much? Am I alone in this? No.", cn:"为什么我们如此难以面对脆弱？只有我一个人觉得难吗？不是。"},
      {time:248, en:"So this is what I learned. We numb vulnerability.", cn:"所以这是我学到的。我们麻痹脆弱。"},
      {time:252, en:"I sent something out on Twitter and Facebook asking, \"How would you define vulnerability?\"", cn:"我在Twitter和Facebook上发消息问：'你怎么定义脆弱？'"},
      {time:257, en:"Within an hour and a half, I had 150 responses.", cn:"一个半小时之内，我收到了150条回复。"},
      {time:260, en:"Having to ask my husband for help because I'm sick, and we're newly married.", cn:"因为生病不得不向丈夫求助，而我们还新婚。"},
      {time:264, en:"Initiating sex; being turned down; asking someone out; waiting for the doctor to call back.", cn:"主动提出性生活；被拒绝；约某人出去；等医生回电话。"},
      {time:268, en:"Getting laid off; laying off people. This is the world we live in.", cn:"被裁员；裁掉别人。这就是我们生活的世界。"},
      {time:273, en:"We live in a vulnerable world, and one of the ways we deal with it is we numb vulnerability.", cn:"我们生活在一个脆弱的世界里，而我们应对它的方式之一就是麻痹脆弱。"},
      {time:279, en:"I think there's evidence that we are the most in-debt, obese, addicted and medicated adult cohort in U.S. history.", cn:"我认为有证据表明我们是美国历史上负债最多、最肥胖、最成瘾、服药最多的成年人群。"},
      {time:287, en:"But the problem is that you cannot selectively numb emotion.", cn:"但问题在于你不能选择性地麻痹情绪。"},
      {time:291, en:"You can't say, here's vulnerability, grief, shame, fear, disappointment. I don't want to feel these.", cn:"你不能说，这些是脆弱、悲伤、羞耻、恐惧、失望，我不想感受这些。"},
      {time:297, en:"And then go have a couple of beers and a banana nut muffin.", cn:"然后去喝几杯啤酒、吃一个香蕉坚果松饼。"},
      {time:301, en:"You can't numb those hard feelings without numbing the other emotions too.", cn:"你在麻痹那些痛苦感受的同时，也在麻痹其他情绪。"},
      {time:305, en:"So when we numb those, we numb joy, we numb gratitude, we numb happiness.", cn:"所以当我们麻痹那些时，我们也麻痹了快乐、感激和幸福。"},
      {time:310, en:"Then we're miserable and looking for purpose, so we feel vulnerable again and have another beer.", cn:"然后我们很痛苦，在寻找意义，于是又感到脆弱，再来一杯啤酒。"},
      {time:316, en:"It becomes this dangerous cycle.", cn:"这就成了一个危险的循环。"},
      {time:319, en:"The other thing we do is we make everything uncertain certain.", cn:"我们做的另一件事是把一切不确定的都变成确定的。"},
      {time:323, en:"Religion has gone from a belief in faith and mystery to certainty. \"I'm right, you're wrong. Shut up.\"", cn:"宗教从对信仰和神秘的相信变成了确定性。'我是对的，你是错的。闭嘴。'"},
      {time:329, en:"The more afraid we are, the more vulnerable we are, the more afraid we become.", cn:"我们越害怕，就越脆弱，就越害怕。"},
      {time:335, en:"And this is what I've learned from the research. There is a way out.", cn:"这就是我从研究中学到的。有一条出路。"},
      {time:340, en:"The whole-hearted people, the ones who live with courage, compassion and connection, believed they were worthy.", cn:"那些全心投入的人，那些带着勇气、同理心和连接生活的人，相信他们是值得的。"},
      {time:348, en:"They believed they were worthy of love and belonging. That's it. They believed they were enough.", cn:"他们相信他们值得被爱和归属。就是这样。他们相信自己足够了。"},
      {time:356, en:"And here's the hardest part: they were willing to let go of who they thought they should be to be who they really were.", cn:"最难的部分是：他们愿意放下他们应该成为的样子，去做真正的自己。"},
      {time:364, en:"And you have to do that for every arena of your life: work, family, relationships.", cn:"你必须在生活的每个领域都这样做：工作、家庭、人际关系。"},
      {time:370, en:"So what does this look like in practice? The whole-hearted embraced vulnerability.", cn:"那么这在实践中是怎样的呢？全心投入的人拥抱脆弱。"},
      {time:376, en:"They believed that what made them vulnerable made them beautiful.", cn:"他们相信让他们脆弱的东西也让他们美丽。"},
      {time:380, en:"They didn't talk about it as comfortable or easy. They just talked about it as necessary.", cn:"他们没有说这很舒适或容易。他们只说这是必要的。"},
      {time:386, en:"They were willing to say \"I love you\" first. They were willing to do something where there are no guarantees.", cn:"他们愿意先说'我爱你'。他们愿意做没有保证的事情。"},
      {time:393, en:"They were willing to invest in a relationship that may or may not work out.", cn:"他们愿意投资于一段可能成功也可能不成功的关系。"},
      {time:398, en:"Because they knew that you cannot love or connect without vulnerability.", cn:"因为他们知道没有脆弱就无法去爱或建立连接。"},
      {time:403, en:"And finally, they practiced gratitude and joy.", cn:"最后，他们练习感恩和快乐。"},
      {time:408, en:"Instead of catastrophizing what might happen, they said, \"I'm just so grateful because to feel this vulnerable means I'm alive.\"", cn:"不去灾难化可能发生的事情，而是说：'我无比感激，因为感受如此脆弱意味着我还活着。'"},
      {time:415, en:"And the last thing, which is probably the most important, is to believe that we are enough.", cn:"最后一点，可能是最重要的，就是相信我们自己是足够的。"},
      {time:420, en:"Because when we work from a place that says \"I'm enough,\" we stop screaming and start listening.", cn:"因为当我们从'我足够了'的角度出发时，我们就不再尖叫，而是开始倾听。"},
      {time:426, en:"We're kinder and gentler to the people around us and to ourselves.", cn:"我们对身边的人和自己都更友善、更温和。"},
      {time:431, en:"That's all I have. Thank you.", cn:"我要说的就这些。谢谢。"},
    ]
  },
  {
    id:2, title:"How Great Leaders Inspire Action", titleCn:"伟大的领导者如何激励行动",
    speaker:"Simon Sinek", duration:"17:50",
    bvid:"BV1Qs411k7qE",
    youtube:"qp0HIF3SfI4",
    tedId:"simon_sinek_how_great_leaders_inspire_action",
    topic:"business",
    lines:[]
  },
  {
    id:3, title:"The Happy Secret to Better Work", titleCn:"快乐工作的秘密",
    speaker:"Shawn Achor", duration:"12:08",
    bvid:"BV1Qs411k7qE",
    youtube:"fLJsdqxnZb0",
    tedId:"shawn_achor_the_happy_secret_to_better_work",
    topic:"psychology",
    lines:[]
  },
  {
    id:4, title:"Do Schools Kill Creativity?", titleCn:"学校扼杀创造力吗？",
    speaker:"Sir Ken Robinson", duration:"18:28",
    bvid:"BV1Qs411k7qE",
    youtube:"iG9CE55wbtY",
    tedId:"ken_robinson_says_schools_kill_creativity",
    topic:"education",
    lines:[]
  },
  {
    id:5, title:"Your Body Language Shapes Who You Are", titleCn:"肢体语言塑造你是谁",
    speaker:"Amy Cuddy", duration:"20:28",
    bvid:"BV1Qs411k7qE",
    youtube:"Ks-_Mh1QhMc",
    tedId:"amy_cuddy_your_body_language_shapes_who_you_are",
    topic:"psychology",
    lines:[]
  },
  {
    id:6, title:"The Puzzle of Motivation", titleCn:"动机的谜题",
    speaker:"Dan Pink", duration:"17:40",
    bvid:"BV1Qs411k7qE",
    youtube:"rrkrvAUbU9Y",
    tedId:"dan_pink_on_motivation",
    topic:"business",
    lines:[]
  },
  {
    id:7, title:"The Power of Introverts", titleCn:"内向者的力量",
    speaker:"Susan Cain", duration:"18:16",
    bvid:"BV1Qs411k7qE",
    youtube:"c0KYU2j0TM4",
    tedId:"susan_cain_the_power_of_introverts",
    topic:"psychology",
    lines:[]
  },
  {
    id:8, title:"The Art of Asking", titleCn:"索取的艺术",
    speaker:"Amanda Palmer", duration:"11:04",
    bvid:"BV1Qs411k7qE",
    youtube:"xMj_P_8H0Gg",
    tedId:"amanda_palmer_the_art_of_asking",
    lines:[]
  }
];

// ─── State ───
var S = {
  page:'today', videoSrc:'bilibili',
  streak:0, studyDays:0, checkins:{},
  startDate: today()
};

// Settings from the old SpeakNow (keeping talk/learn state)
var currentTalk = null;

function load(){
  try{
    var d = JSON.parse(localStorage.getItem('sn_v2'));
    if(d){
      S.streak = d.streak || 0;
      S.studyDays = d.studyDays || 0;
      S.checkins = d.checkins || {};
      S.startDate = d.startDate || today();
      S.videoSrc = d.videoSrc || 'bilibili';
    }
  }catch(e){}
}
function save(){
  localStorage.setItem('sn_v2', JSON.stringify({
    streak:S.streak, studyDays:S.studyDays,
    checkins:S.checkins, startDate:S.startDate, videoSrc:S.videoSrc
  }));
}

// ─── Navigation ───
function nav(p){
  S.page = p;
  document.querySelectorAll('.nav-item').forEach(e => e.classList.toggle('active', e.dataset.page === p));
  document.querySelectorAll('.page').forEach(e => e.classList.remove('active'));
  var el = $('p-'+p); if(el) el.classList.add('active');
  window.scrollTo(0,0);
  if(p === 'today') renderToday();
  else if(p === 'ted') renderTEDList();
  else if(p === 'stats') renderStats();
}

// ─── Today ───
function renderToday(){
  var td = today();
  var ch = S.checkins[td];
  var wk = weekNum();
  var talkIdx = ((wk-1)*2) % TALKS.length;
  var talk = TALKS[talkIdx];
  
  var h = '<div class="tdh"><div class="td">'+dateCN(td)+'</div>';
  h += '<div class="tt">今日学习</div>';
  h += '<div class="ts">'+(ch?'✅ 已完成':'⏳ 未开始')+'</div></div>';
  
  if(talk && talk.lines.length > 0){
    h += '<div class="card" style="border-color:var(--p)"><div class="fw-6 mb-8">今日 TED 演讲</div>';
    h += '<div style="font-weight:700;font-size:1rem">'+esc(talk.title)+'</div>';
    h += '<div class="tm" style="font-size:.8125rem;margin-top:2px">'+esc(talk.titleCn)+' · '+esc(talk.speaker)+' · '+talk.duration+'</div>';
    h += '<div class="step-card" style="margin-top:12px"><div class="step-num">1</div><div class="step-info"><div class="step-t">观看演讲</div><div class="step-d">选择平台观看视频</div></div></div>';
    h += '<div class="step-card"><div class="step-num">2</div><div class="step-info"><div class="step-t">阅读文稿</div><div class="step-d">中英对照完整演讲稿</div></div></div>';
    h += '<button class="btn btn-p btn-block mt-8" onclick="openTalk('+talk.id+')">开始学习</button></div>';
  } else {
    h += '<div class="card"><div class="tm">暂无课程安排</div></div>';
  }
  
  if(!ch) h += '<button class="btn btn-o btn-block" onclick="markDone()">标记今日完成</button>';
  
  // Streak info
  var allDays = diffDays(S.startDate, td) + 1;
  var pct = allDays > 0 ? Math.round((S.studyDays || 0) / allDays * 100) : 0;
  h += '<div class="card"><div class="fw-6 mb-8">学习进度</div>';
  h += '<div class="flex" style="justify-content:space-around">';
  h += '<div class="tc"><div style="font-size:1.25rem;font-weight:700;color:var(--p)">'+(S.streak||0)+'</div><div class="tm" style="font-size:.75rem">连续天数</div></div>';
  h += '<div class="tc"><div style="font-size:1.25rem;font-weight:700;color:var(--p)">'+(S.studyDays||0)+'</div><div class="tm" style="font-size:.75rem">总学习天数</div></div>';
  h += '<div class="tc"><div style="font-size:1.25rem;font-weight:700;color:var(--p)">'+pct+'%</div><div class="tm" style="font-size:.75rem">出勤率</div></div>';
  h += '</div></div>';
  
  $('p-today').innerHTML = h;
}

function markDone(){
  var td = today();
  if(!S.checkins[td]){
    S.checkins[td] = true;
    S.studyDays = (S.studyDays || 0) + 1;
    calcStreak();
    renderToday();
  }
}

function calcStreak(){
  var c = 0, d = new Date();
  while(1){
    var ds = d.toISOString().slice(0,10);
    if(S.checkins[ds]){ c++; d.setDate(d.getDate()-1); }
    else break;
  }
  S.streak = c;
  save();
}

function weekNum(){
  var s = new Date(S.startDate);
  return Math.max(1, Math.floor((new Date() - s) / (7*86400000)) + 1);
}
function diffDays(a,b){
  return Math.max(1, Math.round((new Date(b) - new Date(a)) / 86400000));
}
function todayStr(){ return today(); }

// ─── TED List ───
function renderTEDList(){
  var h = '<div class="card" style="background:linear-gradient(135deg,#0EA5A0,#06B6D4);color:#fff;border:none"><div class="fw-6" style="font-size:1rem">🎬 TED 演讲库</div><div class="mt-4 tm" style="color:rgba(255,255,255,.8);font-size:.8125rem">'+TALKS.length+' 篇演讲 · 中英双语文稿</div></div>';
  
  // Topic filter
  var topics = [{k:'all',l:'全部'},{k:'psychology',l:'心理'},{k:'business',l:'商业'},{k:'education',l:'教育'}];
  h += '<div class="tags" id="ted-tags">';
  topics.forEach(function(t){
    h += '<button class="tag active" onclick="filterTED(\''+t.k+'\',this)">'+t.l+'</button>';
  });
  h += '</div><div id="ted-list">';
  
  TALKS.forEach(function(t){
    var hasContent = t.lines && t.lines.length > 0;
    h += '<div class="ted-card ted-it" data-topic="'+t.topic+'" onclick="openTalk('+t.id+')">';
    h += '<div class="ttl">'+esc(t.title)+'</div>';
    h += '<div class="sub">'+esc(t.titleCn)+'</div>';
    h += '<div class="meta">'+esc(t.speaker)+' · '+t.duration+(hasContent?' · 📜 文稿已就绪':' · ⏳ 文稿待更新')+'</div></div>';
  });
  h += '</div>';
  
  // Usage note
  h += '<div class="card"><div class="fw-6 mb-8">💡 使用说明</div>';
  h += '<div style="font-size:.8125rem;color:var(--t2);line-height:1.6">';
  h += '1. 点击演讲卡片打开学习页面<br>';
  h += '2. 通过"观看视频"按钮选择平台观看（B站国内可直接访问）<br>';
  h += '3. 阅读中英对照文稿，逐句学习<br>';
  h += '4. 可在设置中切换视频播放平台</div></div>';
  
  $('p-ted').innerHTML = h;
}

function filterTED(k, btn){
  document.querySelectorAll('#ted-tags .tag').forEach(function(b){ b.classList.toggle('active', b === btn); });
  document.querySelectorAll('.ted-it').forEach(function(e){
    e.style.display = (k === 'all' || e.dataset.topic === k) ? '' : 'none';
  });
}

// ─── Talk Detail View ───
function openTalk(id){
  var talk = TALKS.find(function(t){ return t.id === id; });
  if(!talk) return;
  currentTalk = talk;
  renderTalkView(talk);
}

function renderTalkView(talk){
  var videoSrc = S.videoSrc || 'bilibili';
  
  var h = '<div class="card" style="background:var(--p);color:#fff;border:none">';
  h += '<button class="btn btn-g btn-sm" style="float:right;color:#fff;border-color:rgba(255,255,255,.5)" onclick="nav(\'ted\')">← 返回</button>';
  h += '<div style="font-weight:700;font-size:1rem">'+esc(talk.title)+'</div>';
  h += '<div style="font-size:.8125rem;opacity:.85;margin-top:2px">'+esc(talk.titleCn)+'</div>';
  h += '<div style="font-size:.75rem;opacity:.7;margin-top:4px">'+esc(talk.speaker)+' · '+talk.duration+'</div></div>';
  
  // Video embed - YouTube
  h += '<div class="card" style="padding:12px"><div class="fw-6 mb-8">🎬 观看演讲</div>';
  h += '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:8px">';
  h += '<iframe src="https://www.youtube.com/embed/'+talk.youtube+'?rel=0" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:8px"></iframe>';
  h += '</div>';
  h += '<div class="flex" style="justify-content:center;gap:8px;flex-wrap:wrap">';
  h += '<button class="btn btn-sm btn-g" onclick="openVideo(\'youtube\','+talk.id+')">▶️ YouTube 打开</button>';
  h += '<button class="btn btn-sm btn-g" onclick="openVideo(\'bilibili\','+talk.id+')">📺 B站备用</button>';
  h += '<button class="btn btn-sm btn-g" onclick="openVideo(\'ted\','+talk.id+')">🌐 TED官网</button>';
  h += '</div></div>';
  // Full script
  h += '<div class="card"><div class="fw-6 mb-8">📜 完整演讲稿</div>';
  if(talk.lines && talk.lines.length > 0){
    h += '<div class="script-wrap" id="script-wrap">';
    for(var i=0;i<talk.lines.length;i++){
      var l = talk.lines[i];
      h += '<div class="script-line" data-idx="'+i+'">';
      h += '<div class="en">'+esc(l.en)+'</div>';
      if(l.cn) h += '<div class="cn">'+esc(l.cn)+'</div>';
      h += '</div>';
    }
    h += '</div>';
  } else {
    h += '<div class="tm">文稿正在更新中，敬请期待</div>';
  }
  h += '</div>';
  
  // Navigate
  document.querySelectorAll('.nav-item').forEach(function(e){ e.classList.toggle('active', e.dataset.page === 'ted'); });
  document.querySelectorAll('.page').forEach(function(e){ e.classList.remove('active'); });
  $('p-ted').innerHTML = h;
  $('p-ted').classList.add('active');
  S.page = 'ted';
}

function openVideo(platform, talkId){
  var talk = TALKS.find(function(t){ return t.id === talkId; });
  if(!talk) return;
  
  var url = '';
  if(platform === 'bilibili') url = 'https://www.bilibili.com/video/' + talk.bvid;
  else if(platform === 'youtube') url = 'https://www.youtube.com/watch?v=' + talk.youtube;
  else if(platform === 'ted') url = 'https://www.ted.com/talks/' + talk.tedId;
  
  window.open(url, '_blank');
}

// ─── Stats ───
function renderStats(){
  var wk = weekNum();
  var allDays = diffDays(S.startDate, today()) + 1;
  var pct = allDays > 0 ? Math.round((S.studyDays || 0) / allDays * 100) : 0;
  
  var h = '<div class="sg">';
  h += '<div class="sc"><div class="sv">'+(S.streak||0)+'</div><div class="sl">连续天数</div></div>';
  h += '<div class="sc"><div class="sv">'+(S.studyDays||0)+'</div><div class="sl">总学习天数</div></div>';
  h += '<div class="sc"><div class="sv">'+wk+'</div><div class="sl">当前周数</div></div>';
  h += '<div class="sc"><div class="sv">'+pct+'%</div><div class="sl">出勤率</div></div></div>';
  
  h += '<div class="card"><div class="fw-6 mb-8">学习总进度</div>';
  h += '<div class="pb"><div class="pf" style="width:'+Math.min(100,wk/24*100)+'%"></div></div>';
  h += '<div class="flex" style="justify-content:space-between"><span class="tm">开始:'+S.startDate+'</span><span class="tm">目标:24周</span></div></div>';
  
  h += '<div class="card"><div class="fw-6 mb-8">学习日历</div>'+miniCal()+'</div>';
  
  h += '<div class="card"><div class="fw-6 mb-8">学习记录</div>';
  var rec = Object.entries(S.checkins).sort(function(a,b){ return b[0].localeCompare(a[0]); }).slice(0,7);
  if(rec.length){
    rec.forEach(function(e){
      h += '<div class="flex" style="justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--sh)"><span>'+e[0]+'</span><span style="color:var(--p)">✅ 完成</span></div>';
    });
  } else {
    h += '<div class="tm">还没有学习记录</div>';
  }
  h += '</div>';
  
  $('p-stats').innerHTML = h;
}

function miniCal(){
  var t = new Date(), y = t.getFullYear(), m = t.getMonth();
  var fd = new Date(y,m,1).getDay(), dim = new Date(y,m+1,0).getDate(), td = t.getDate();
  var h = '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin:12px 0">';
  ['日','一','二','三','四','五','六'].forEach(function(d){ h += '<div class="tc" style="font-size:.75rem;color:var(--tm);font-weight:600;padding:4px 0">'+d+'</div>'; });
  for(var i=0;i<fd;i++) h += '<div></div>';
  for(var d=1;d<=dim;d++){
    var ds = y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    var ch = S.checkins[ds] ? 'background:var(--p);color:#fff;border-radius:50%' : '';
    var isT = d === td ? 'border:2px solid var(--p);border-radius:50%' : '';
    h += '<div class="tc" style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:.75rem;'+(ch||isT||'color:var(--tm)')+'">'+d+'</div>';
  }
  h += '</div>';
  return h;
}

// ─── Settings ───
function openSettings(){
  $('video-source').value = S.videoSrc;
  $('modal-settings').classList.add('open');
}
function closeSettings(){ $('modal-settings').classList.remove('open'); }
function setVideoSource(v){ S.videoSrc = v; save(); }

// ─── Init ───
document.addEventListener('DOMContentLoaded', function(){
  load();
  calcStreak();
  nav('today');
  
  document.querySelectorAll('.nav-item').forEach(function(e){
    e.addEventListener('click', function(){ nav(e.dataset.page); });
  });
});
