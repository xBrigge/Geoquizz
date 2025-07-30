
  let isLocked = false; 
  let score = 0;
  let streak = 0;
  
  const maxQuestions = 10;
  let questionCount = 0;
  let usedStates = []; // liste des états déjà posés
  
  let timerStart = null;
  let timerInterval = null;
  
  function updateTimerDisplay() {
  const elapsed = (Date.now() - timerStart) / 1000;
  document.getElementById('timer').textContent = `⏱ Temps : ${elapsed.toFixed(1)} s`;
}
  
  
    const states = [
  { id: 'AL', name: 'Alabama' },
  { id: 'AZ', name: 'Arizona' },
  { id: 'AR', name: 'Arkansas' },
  { id: 'CA', name: 'Californie' },
  { id: 'CO', name: 'Colorado' },
  { id: 'CT', name: 'Connecticut' },
  { id: 'DE', name: 'Delaware' },
  { id: 'FL', name: 'Floride' },
  { id: 'GA', name: 'Géorgie' },
  { id: 'ID', name: 'Idaho' },
  { id: 'IL', name: 'Illinois' },
  { id: 'IN', name: 'Indiana' },
  { id: 'IA', name: 'Iowa' },
  { id: 'KS', name: 'Kansas' },
  { id: 'KY', name: 'Kentucky' },
  { id: 'LA', name: 'Louisiane' },
  { id: 'ME', name: 'Maine' },
  { id: 'MD', name: 'Maryland' },
  { id: 'MA', name: 'Massachusetts' },
  { id: 'MI', name: 'Michigan' },
  { id: 'MN', name: 'Minnesota' },
  { id: 'MS', name: 'Mississippi' },
  { id: 'MO', name: 'Missouri' },
  { id: 'MT', name: 'Montana' },
  { id: 'NE', name: 'Nebraska' },
  { id: 'NV', name: 'Nevada' },
  { id: 'NH', name: 'New Hampshire' },
  { id: 'NJ', name: 'New Jersey' },
  { id: 'NM', name: 'Nouveau-Mexique' },
  { id: 'NY', name: 'New York' },
  { id: 'NC', name: 'Caroline du Nord' },
  { id: 'ND', name: 'Dakota du Nord' },
  { id: 'OH', name: 'Ohio' },
  { id: 'OK', name: 'Oklahoma' },
  { id: 'OR', name: 'Oregon' },
  { id: 'PA', name: 'Pennsylvanie' },
  { id: 'RI', name: 'Rhode Island' },
  { id: 'SC', name: 'Caroline du Sud' },
  { id: 'SD', name: 'Dakota du Sud' },
  { id: 'TN', name: 'Tennessee' },
  { id: 'TX', name: 'Texas' },
  { id: 'UT', name: 'Utah' },
  { id: 'VT', name: 'Vermont' },
  { id: 'VA', name: 'Virginie' },
  { id: 'WA', name: 'Washington' },
  { id: 'WV', name: 'Virginie-Occidentale' },
  { id: 'WI', name: 'Wisconsin' },
  { id: 'WY', name: 'Wyoming' }
    ];


  let target = null;




  function pickRandom() {
  const remaining = states.filter(state => !usedStates.includes(state.id));
  if (remaining.length === 0) return null;
  return remaining[Math.floor(Math.random() * remaining.length)];
}
  
  
function showEndScreen() {
  document.getElementById('final-score').textContent = `Votre score final : ${score} points`;
  document.getElementById('end-screen').style.display = 'flex';
}

function restartGame() {
  score = 0;
  streak = 0;
  questionCount = 0;
  usedStates = [];
  updateScore();
  document.getElementById('end-screen').style.display = 'none';
  setNewQuestion();
}
  
  
  function setNewQuestion() {
  // Déverrouille les clics
  isLocked = false;

  // Nettoie les classes
  document.querySelectorAll('path.state').forEach(path => {
    path.classList.remove('correct', 'wrong', 'highlight');
  });

  questionCount++;

  // Vérifie la fin de partie
  if (questionCount > maxQuestions) {
    showEndScreen();
    return;
  }

  // Tire un nouvel état (jamais demandé avant)
  target = pickRandom();
  if (!target) {
    document.getElementById('target-name').textContent = '';
    document.getElementById('result').textContent = `✔️ Tous les États ont été joués. Score : ${score}`;
    return;
  }

  usedStates.push(target.id);
  document.getElementById('target-name').textContent = target.name;
  document.getElementById('result').textContent = '';
  document.getElementById('timer').textContent = '⏱ Temps : 0.0 s';

  timerStart = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimerDisplay, 100);
}

function handleClick(evt) {
  if (isLocked) return;
  isLocked = true;

  const clickedPath = evt.target;
  const clickedId = clickedPath.id;
  if (!clickedId) return;

  const isCorrect = clickedId === target.id;

  clearInterval(timerInterval);
  const timeTaken = (Date.now() - timerStart) / 1000;
  
  let timeBonus = 0;
  if (timeTaken < 2) timeBonus = 2;
  else if (timeTaken < 5) timeBonus = 1;

  if (isCorrect) {
    streak++;
    const streakBonus = streak > 1 ? streak - 1 : 0;
    const totalPoints = 1 + streakBonus + timeBonus;
    score += totalPoints;

    clickedPath.classList.add('correct');
    document.getElementById('result').textContent = `✅ Bonne réponse ! +${totalPoints} pts (${timeBonus} bonus temps)`;
    updateScore();

    setTimeout(setNewQuestion, 800);
  } else {
    streak = 0;
    clickedPath.classList.add('wrong');
    document.getElementById('result').textContent = '❌ Mauvaise réponse';

    const correctPath = document.getElementById(target.id);
    correctPath.classList.add('highlight');

    setTimeout(() => {
      correctPath.classList.remove('highlight');
      setNewQuestion();
    }, 1000);
  }
}

function updateScore() {
  document.getElementById('score').textContent = `Score : ${score}`;
}
  document.getElementById('map-container').addEventListener('click', handleClick);
  setNewQuestion();


document.getElementById('btn-home').addEventListener('click', () => {
  window.location.href = 'geoquizz.html'; // ou le nom exact de ta page d'accueil
});
  
  
  