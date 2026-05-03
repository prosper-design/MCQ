const app = document.getElementById("app");

let selectedSubject = "";
let current = 0;
let answers = [];
let examQ = [];

// ================= HOME =================
function home() {
  app.innerHTML = `
    <div class="card">
      <h2>Select Subject</h2>

      ${["Math","English","Physics","Chemistry","Biology"].map(sub => `
        <div class="subject" onclick="selectSubject('${sub}')" id="${sub}">
          ${sub}
        </div>
      `).join("")}

      <button onclick="startExam()">Start Exam</button>
    </div>
  `;
}

// ================= SELECT SUBJECT =================
function selectSubject(sub) {
  selectedSubject = sub;

  document.querySelectorAll(".subject").forEach(el=>{
    el.classList.remove("active");
  });

  document.getElementById(sub).classList.add("active");
}

// ================= START =================
function startExam() {
  if (!selectedSubject) {
    alert("Select subject first");
    return;
  }

  examQ = getQuestions(selectedSubject);
  current = 0;
  answers = new Array(50).fill(null);

  showQuestion();
}

// ================= SHOW =================
function showQuestion() {
  let q = examQ[current];

  app.innerHTML = `
    <div class="card">
      <h3>Q${current + 1}/50</h3>
      <p>${q.q}</p>

      ${q.options.map((opt,i)=>`
        <div class="option ${answers[current]===i ? "selected":""}" 
             onclick="selectAnswer(${i})">
          ${opt}
        </div>
      `).join("")}

      <button onclick="prev()">Prev</button>
      <button onclick="next()">Next</button>
      <button onclick="submitExam()">Submit</button>
    </div>
  `;
}

// ================= ANSWER =================
function selectAnswer(i){
  answers[current] = i;
  showQuestion();
}

// ================= NAV =================
function next(){
  if(current < 49){
    current++;
    showQuestion();
  }
}

function prev(){
  if(current > 0){
    current--;
    showQuestion();
  }
}

// ================= RESULT =================
function submitExam(){
  let score = 0;

  let reviewHTML = "";

  examQ.forEach((q, i) => {
    let userAns = answers[i];
    let correct = q.answer;

    let isCorrect = userAns === correct;

    if(isCorrect) score++;

    reviewHTML += `
      <div style="margin-bottom:20px; padding:10px; border-radius:10px; background:#111;">
        <p><b>Q${i+1}:</b> ${q.q}</p>

        ${q.options.map((opt, index) => {
          let style = "";

          if(index === correct){
            style = "color: lightgreen; font-weight:bold;";
          }

          if(index === userAns && userAns !== correct){
            style = "color: red;";
          }

          return `<div style="${style}">${opt}</div>`;
        }).join("")}

        <p style="margin-top:5px;">
          Your Answer: ${userAns !== undefined ? q.options[userAns] : "Not answered"}
        </p>

        <p>
          Correct Answer: <span style="color:lightgreen;">
            ${q.options[correct]}
          </span>
        </p>
      </div>
    `;
  });

  app.innerHTML = `
    <div class="card">
      <h2>Result</h2>
      <h3>${score}/${examQ.length}</h3>

      <div style="max-height:400px; overflow-y:auto; text-align:left;">
        ${reviewHTML}
      </div>

      <button onclick="home()">Back</button>
    </div>
  `;
}

// ================= QUESTIONS =================
function getQuestions(subject){

let questions = [];

// ================= MATH (40 REAL QUESTIONS) =================
if(subject==="Math"){
questions = [
{q:"Solve 2x + 4 = 10",options:["2","3","4","5"],answer:1},
{q:"sin 30° =",options:["1","0.5","0","√3"],answer:1},
{q:"tan 45° =",options:["1","0","-1","2"],answer:0},
{q:"Area of circle?",options:["πr²","2πr","πd","r²"],answer:0},
{q:"x² - 9 = 0",options:["±3","3","-3","0"],answer:0},
{q:"Derivative of x²",options:["2x","x","1","x²"],answer:0},
{q:"Angle sum triangle",options:["180","90","360","270"],answer:0},
{q:"1/2 + 1/3 =",options:["5/6","2/5","3/5","1"],answer:0},
{q:"Solve 5x = 20",options:["4","5","2","10"],answer:0},
{q:"√16 =",options:["2","4","8","16"],answer:1},
{q:"cos 0° =",options:["1","0","-1","2"],answer:0},
{q:"3² =",options:["6","9","3","12"],answer:1},
{q:"Perimeter of square?",options:["4a","a²","2a","a³"],answer:0},
{q:"x² = 16",options:["±4","4","-4","8"],answer:0},
{q:"Mean of 2,4,6?",options:["4","3","5","6"],answer:0},
{q:"Mode of 1,2,2,3?",options:["2","1","3","0"],answer:0},
{q:"Median of 1,3,5?",options:["3","1","5","2"],answer:0},
{q:"sin 90° =",options:["1","0","-1","2"],answer:0},
{q:"tan 0° =",options:["0","1","-1","2"],answer:0},
{q:"Area of rectangle?",options:["l×b","l+b","2l","b²"],answer:0},
{q:"Volume of cube?",options:["a³","a²","2a","3a"],answer:0},
{q:"Solve 3x=9",options:["3","2","1","4"],answer:0},
{q:"√25 =",options:["5","4","6","3"],answer:0},
{q:"2³ =",options:["8","6","4","10"],answer:0},
{q:"Angle on straight line?",options:["180","90","360","270"],answer:0},
{q:"Probability max value?",options:["1","0","2","-1"],answer:0},
{q:"0! =",options:["1","0","undefined","2"],answer:0},
{q:"Slope formula?",options:["y2-y1/x2-x1","x+y","xy","y/x"],answer:0},
{q:"sin²θ+cos²θ =",options:["1","0","2","θ"],answer:0},
{q:"Quadratic form?",options:["ax²+bx+c","ax+b","x²","bx+c"],answer:0},
{q:"Area triangle?",options:["1/2bh","bh","b+h","2bh"],answer:0},
{q:"Circumference?",options:["2πr","πr²","r²","πd²"],answer:0},
{q:"Derivative of x?",options:["1","0","x","2"],answer:0},
{q:"Integral of 1 dx?",options:["x","1","0","x²"],answer:0},
{q:"Solve x+3=7",options:["4","3","2","5"],answer:0},
{q:"√49 =",options:["7","6","8","9"],answer:0},
{q:"cos 60° =",options:["0.5","1","0","√3"],answer:0},
{q:"tan 90° =",options:["undefined","0","1","-1"],answer:0},
{q:"LCM of 2,3?",options:["6","5","3","2"],answer:0},
{q:"HCF of 6,9?",options:["3","6","9","1"],answer:0}
];
}

// ================= ENGLISH (40) =================
if(subject==="English"){
questions = [
{q:"He is ___ boy",options:["a","an","the","some"],answer:0},
{q:"Opposite of hot?",options:["cold","warm","heat","fire"],answer:0},
{q:"Synonym of fast?",options:["quick","slow","late","weak"],answer:0},
{q:"She ___ going",options:["is","are","be","was"],answer:0},
{q:"Plural of child?",options:["children","childs","childes","child"],answer:0},
{q:"Antonym of big?",options:["small","large","wide","huge"],answer:0},
{q:"Sound of ph?",options:["f","p","h","b"],answer:0},
{q:"Meaning of brave?",options:["bold","fear","weak","calm"],answer:0},
{q:"Fill: good ___ English",options:["at","on","in","with"],answer:0},
{q:"You came, ___?",options:["didn't you","did you","won't you","haven't you"],answer:0},
{q:"Past of go?",options:["went","gone","goes","going"],answer:0},
{q:"Synonym of happy?",options:["joyful","sad","angry","tired"],answer:0},
{q:"Antonym of tall?",options:["short","high","big","wide"],answer:0},
{q:"Plural of man?",options:["men","mans","man","mens"],answer:0},
{q:"She ___ a book",options:["reads","read","reading","reader"],answer:0},
{q:"They ___ playing",options:["are","is","was","be"],answer:0},
{q:"Opposite of early?",options:["late","soon","fast","quick"],answer:0},
{q:"Synonym of smart?",options:["intelligent","dull","slow","weak"],answer:0},
{q:"Antonym of rich?",options:["poor","wealthy","big","full"],answer:0},
{q:"Correct: I ___ happy",options:["am","is","are","be"],answer:0},
{q:"Plural of tooth?",options:["teeth","tooths","toothes","tooth"],answer:0},
{q:"Synonym of begin?",options:["start","end","stop","finish"],answer:0},
{q:"Opposite of light?",options:["dark","bright","clear","white"],answer:0},
{q:"He ___ to school",options:["goes","go","gone","going"],answer:0},
{q:"Fill: afraid ___ dog",options:["of","on","in","at"],answer:0},
{q:"Antonym of strong?",options:["weak","hard","big","tough"],answer:0},
{q:"Synonym of angry?",options:["mad","happy","calm","soft"],answer:0},
{q:"Plural of foot?",options:["feet","foots","footes","foot"],answer:0},
{q:"Opposite of clean?",options:["dirty","neat","clear","pure"],answer:0},
{q:"She ___ eating",options:["is","are","was","be"],answer:0},
{q:"Synonym of quick?",options:["fast","slow","late","weak"],answer:0},
{q:"Antonym of happy?",options:["sad","joyful","smile","laugh"],answer:0},
{q:"He ___ gone",options:["has","have","had","having"],answer:0},
{q:"Plural of mouse?",options:["mice","mouses","mouse","mices"],answer:0},
{q:"Opposite of good?",options:["bad","nice","great","fine"],answer:0},
{q:"Synonym of big?",options:["large","small","tiny","short"],answer:0},
{q:"Fill: listen ___ me",options:["to","on","in","at"],answer:0},
{q:"Antonym of fast?",options:["slow","quick","rapid","speed"],answer:0},
{q:"He ___ running",options:["is","are","was","be"],answer:0},
{q:"Plural of woman?",options:["women","womans","woman","womens"],answer:0}
];
}


// ================= PHYSICS (40) =================
if(subject==="Physics"){
questions = [
{q:"Unit of force?",options:["Newton","Joule","Watt","Pascal"],answer:0},
{q:"Speed formula?",options:["d/t","t/d","d×t","none"],answer:0},
{q:"Projectile path?",options:["Parabola","Circle","Line","Square"],answer:0},
{q:"Heat flows from?",options:["Hot to cold","Cold to hot","Same","None"],answer:0},
{q:"Wave transfers?",options:["Energy","Mass","None","Light"],answer:0},
{q:"Unit of current?",options:["Ampere","Volt","Ohm","Watt"],answer:0},
{q:"Moment = ?",options:["Force×Distance","Mass×Speed","Energy×Time","Force/Time"],answer:0},
{q:"Vector has?",options:["Magnitude only","Direction only","Both","None"],answer:2},
{q:"g value?",options:["9.8","10","8","5"],answer:0},
{q:"Magnet poles?",options:["2","1","3","0"],answer:0},
{q:"Energy unit?",options:["Joule","Watt","Volt","Ampere"],answer:0},
{q:"Work = ?",options:["F×d","m×v","v/t","m×a"],answer:0},
{q:"Power unit?",options:["Watt","Joule","Newton","Volt"],answer:0},
{q:"Density = ?",options:["m/v","v/m","m×v","none"],answer:0},
{q:"Light travels?",options:["Fastest","Slow","Medium","None"],answer:0},
{q:"Reflection occurs?",options:["Mirror","Water","Air","All"],answer:3},
{q:"Refraction is bending of?",options:["Light","Sound","Heat","Force"],answer:0},
{q:"Unit of voltage?",options:["Volt","Ampere","Watt","Ohm"],answer:0},
{q:"Resistance unit?",options:["Ohm","Volt","Ampere","Watt"],answer:0},
{q:"Sound needs?",options:["Medium","Vacuum","Light","Heat"],answer:0},
{q:"Heat unit?",options:["Joule","Watt","Volt","Ampere"],answer:0},
{q:"Mass unit?",options:["kg","g","m","s"],answer:0},
{q:"Time unit?",options:["second","meter","kg","amp"],answer:0},
{q:"Distance unit?",options:["meter","second","kg","amp"],answer:0},
{q:"Acceleration?",options:["v/t","d/t","t/v","none"],answer:0},
{q:"Inertia?",options:["Resistance to motion","Speed","Force","Energy"],answer:0},
{q:"Gravity pulls?",options:["Objects","Light","Heat","Sound"],answer:0},
{q:"Kinetic energy?",options:["1/2mv²","mv","mgh","v²"],answer:0},
{q:"Potential energy?",options:["mgh","mv²","v/t","m/v"],answer:0},
{q:"Mirror image?",options:["Virtual","Real","None","Both"],answer:0},
{q:"Lens bends?",options:["Light","Sound","Heat","Force"],answer:0},
{q:"Electric current?",options:["Flow of charge","Energy","Heat","Light"],answer:0},
{q:"Battery provides?",options:["Energy","Heat","Light","Sound"],answer:0},
{q:"Magnet attracts?",options:["Iron","Wood","Plastic","Glass"],answer:0},
{q:"North pole attracts?",options:["South","North","None","All"],answer:0},
{q:"Friction?",options:["Opposes motion","Causes motion","Speed","Energy"],answer:0},
{q:"Pressure = ?",options:["F/A","A/F","F×A","none"],answer:0},
{q:"Liquid pressure increases with?",options:["Depth","Height","Time","Speed"],answer:0},
{q:"Boiling point?",options:["100°C","0°C","50°C","10°C"],answer:0},
{q:"Free fall?",options:["Under gravity","Force","Heat","Light"],answer:0}
];
}


// ================= CHEMISTRY (40) =================
if(subject==="Chemistry"){
questions = [
{q:"NaCl is?",options:["Salt","Acid","Base","Metal"],answer:0},
{q:"pH < 7?",options:["Acid","Base","Neutral","Salt"],answer:0},
{q:"Oxygen symbol?",options:["O","Ox","Og","Om"],answer:0},
{q:"Hydrogen is?",options:["Gas","Liquid","Solid","Metal"],answer:0},
{q:"Water formula?",options:["H2O","CO2","O2","NaCl"],answer:0},
{q:"Acid turns litmus?",options:["Red","Blue","Green","Yellow"],answer:0},
{q:"Periodic table arranged by?",options:["Atomic number","Mass","Volume","Density"],answer:0},
{q:"Carbon forms?",options:["Chains","Salt","Gas","Liquid"],answer:0},
{q:"Base pH?",options:[">7","<7","7","0"],answer:0},
{q:"Neutral pH?",options:["7","<7",">7","1"],answer:0},
{q:"CO2 is?",options:["Gas","Liquid","Solid","Metal"],answer:0},
{q:"O2 is?",options:["Gas","Liquid","Solid","Metal"],answer:0},
{q:"Na is?",options:["Metal","Non-metal","Gas","Liquid"],answer:0},
{q:"Cl is?",options:["Non-metal","Metal","Gas","Liquid"],answer:0},
{q:"Rusting needs?",options:["Oxygen","Light","Heat","None"],answer:0},
{q:"Water is?",options:["Compound","Element","Mixture","Gas"],answer:0},
{q:"Mixture example?",options:["Air","Water","Salt","Sugar"],answer:0},
{q:"Element example?",options:["Oxygen","Salt","Water","Air"],answer:0},
{q:"Acid example?",options:["HCl","NaCl","NaOH","CO2"],answer:0},
{q:"Base example?",options:["NaOH","HCl","CO2","O2"],answer:0},
{q:"Salt example?",options:["NaCl","HCl","NaOH","O2"],answer:0},
{q:"Gas example?",options:["O2","Na","Fe","Cu"],answer:0},
{q:"Liquid example?",options:["Water","Iron","Salt","Air"],answer:0},
{q:"Solid example?",options:["Iron","Water","Air","Gas"],answer:0},
{q:"Boiling water?",options:["100°C","0°C","50°C","10°C"],answer:0},
{q:"Freezing water?",options:["0°C","100°C","10°C","50°C"],answer:0},
{q:"Evaporation?",options:["Liquid to gas","Gas to liquid","Solid to liquid","None"],answer:0},
{q:"Condensation?",options:["Gas to liquid","Liquid to gas","Solid to gas","None"],answer:0},
{q:"Melting?",options:["Solid to liquid","Liquid to solid","Gas to liquid","None"],answer:0},
{q:"Freezing?",options:["Liquid to solid","Solid to liquid","Gas to liquid","None"],answer:0},
{q:"Atom is?",options:["Smallest unit","Compound","Mixture","Gas"],answer:0},
{q:"Molecule is?",options:["Group of atoms","Single atom","Element","Gas"],answer:0},
{q:"Compound is?",options:["2+ elements","Single atom","Gas","Liquid"],answer:0},
{q:"Solution is?",options:["Mixture","Element","Compound","Gas"],answer:0},
{q:"Solute?",options:["Dissolved","Solvent","Liquid","Gas"],answer:0},
{q:"Solvent?",options:["Dissolves","Solute","Solid","Gas"],answer:0},
{q:"Air is?",options:["Mixture","Element","Compound","Gas"],answer:0},
{q:"Oxygen supports?",options:["Burning","Cooling","Freezing","None"],answer:0},
{q:"Hydrogen burns?",options:["Yes","No","Sometimes","Never"],answer:0},
{q:"CO2 used in?",options:["Fire extinguisher","Fuel","Metal","Plastic"],answer:0}
];
}


// ================= BIOLOGY (40) =================
if(subject==="Biology"){
questions = [
{q:"Cell is?",options:["Unit of life","Tissue","Organ","Atom"],answer:0},
{q:"Photosynthesis occurs in?",options:["Leaf","Root","Stem","Flower"],answer:0},
{q:"DNA is?",options:["Genetic material","Food","Energy","Cell"],answer:0},
{q:"Heart pumps?",options:["Blood","Air","Water","Food"],answer:0},
{q:"Respiration uses?",options:["Oxygen","CO2","Nitrogen","Hydrogen"],answer:0},
{q:"Ecology studies?",options:["Environment","Math","Physics","Chemistry"],answer:0},
{q:"Plants make food in?",options:["Leaves","Roots","Stem","Flower"],answer:0},
{q:"Digestive breaks?",options:["Food","Water","Air","Blood"],answer:0},
{q:"Genetics studies?",options:["Heredity","Plants","Animals","Cells"],answer:0},
{q:"Stomach digests?",options:["Food","Air","Blood","Water"],answer:0},
{q:"Blood carries?",options:["Oxygen","Water","Food","Air"],answer:0},
{q:"Brain controls?",options:["Body","Food","Air","Water"],answer:0},
{q:"Lungs exchange?",options:["Gas","Food","Blood","Water"],answer:0},
{q:"Kidney filters?",options:["Blood","Air","Food","Water"],answer:0},
{q:"Skin protects?",options:["Body","Food","Air","Water"],answer:0},
{q:"Plant roots absorb?",options:["Water","Air","Light","Heat"],answer:0},
{q:"Stem supports?",options:["Plant","Animal","Cell","Water"],answer:0},
{q:"Flower for?",options:["Reproduction","Growth","Food","Water"],answer:0},
{q:"Seed grows into?",options:["Plant","Animal","Cell","Food"],answer:0},
{q:"Animals move?",options:["Yes","No","Sometimes","Never"],answer:0},
{q:"Plants move?",options:["Yes","No","Sometimes","Never"],answer:2},
{q:"Photosynthesis uses?",options:["Light","Sound","Heat","Wind"],answer:0},
{q:"Chlorophyll is?",options:["Green pigment","Water","Food","Air"],answer:0},
{q:"Energy source?",options:["Sun","Moon","Water","Air"],answer:0},
{q:"Food gives?",options:["Energy","Air","Water","Light"],answer:0},
{q:"Bones support?",options:["Body","Food","Air","Water"],answer:0},
{q:"Muscles help?",options:["Movement","Breathing","Eating","Sleeping"],answer:0},
{q:"Teeth chew?",options:["Food","Air","Water","Blood"],answer:0},
{q:"Tongue tastes?",options:["Food","Air","Water","Blood"],answer:0},
{q:"Eye sees?",options:["Light","Sound","Food","Water"],answer:0},
{q:"Ear hears?",options:["Sound","Light","Food","Water"],answer:0},
{q:"Nose smells?",options:["Odor","Light","Food","Water"],answer:0},
{q:"Skin feels?",options:["Touch","Light","Sound","Food"],answer:0},
{q:"Living things grow?",options:["Yes","No","Sometimes","Never"],answer:0},
{q:"Living things reproduce?",options:["Yes","No","Sometimes","Never"],answer:0},
{q:"Living things breathe?",options:["Yes","No","Sometimes","Never"],answer:0},
{q:"Plants need water?",options:["Yes","No","Sometimes","Never"],answer:0},
{q:"Animals need food?",options:["Yes","No","Sometimes","Never"],answer:0},
{q:"Cells divide?",options:["Yes","No","Sometimes","Never"],answer:0},
{q:"Organism is?",options:["Living thing","Non-living","Gas","Water"],answer:0}
];
}

// return ONLY real questions (no slicing, no fill)
return questions;
}

// ================= INIT =================
home();