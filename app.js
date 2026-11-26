/* =========================================================================
   MOTOR CENTRAL DE LA APLICACIÓN (app.js)
   - Conecta automáticamente todos los archivos de la carpeta asignaturas/
   - Gestiona puntos, medallas, tablas, modos de repaso (Ocultar/Ver) y modales.
   ========================================================================= */
document.addEventListener('DOMContentLoaded', function () {
  // Clave independiente para que esta web modular no mezcle puntos con la otra web
  const STORAGE_KEY = 'aprende_jugando_3primaria_modular_v1';
  const AVATARS = ['🦁', '🐼', '🦊', '🐯', '🐸', '🦄', '🐶', '🐱', '🐵', '🦖', '🚀', '⚽'];

  const SUBJECT_ORDER = [
    'mates', 'lengua', 'valencia', 'ingles', 'lectura',
    'cmedio', 'musica', 'plastica', 'efisica', 'religion'
  ];

  const MODULES = window.ASIGNATURAS_MODULOS || {};
  const SUBJECTS = SUBJECT_ORDER
    .filter(function (id) { return !!MODULES[id]; })
    .map(function (id) { return MODULES[id]; });

  const MEDALS = [
    { id: 'first_100', icon: '🌟', name: 'Primeros 100 pts', req: 'Consigue 100 puntos', check: function (p) { return p.points >= 100; } },
    { id: 'daily_1', icon: '☀️', name: 'Constancia Diaria', req: 'Completa 1 Reto del Día', check: function (p) { return p.dailyCount >= 1; } },
    { id: 'level_3', icon: '🚀', name: 'Explorador Nivel 3', req: 'Llega al Nivel 3 en Aventura', check: function (p) { return p.level >= 3; } },
    { id: 'points_500', icon: '🏆', name: 'Campeón de 3º', req: 'Acumula 500 puntos', check: function (p) { return p.points >= 500; } },
    { id: 'daily_5', icon: '🔥', name: 'Súper Racha', req: 'Completa 5 Retos del Día', check: function (p) { return p.dailyCount >= 5; } },
    { id: 'all_subjects', icon: '🎓', name: 'Todoterreno', req: 'Suma puntos en 5 asignaturas', check: function (p) {
      return Object.values(p.subjectPoints).filter(function (v) { return v > 0; }).length >= 5;
    }},
    { id: 'level_6', icon: '👑', name: 'Maestro Aventura', req: 'Llega al Nivel 6 en Aventura', check: function (p) { return p.level >= 6; } },
    { id: 'points_1500', icon: '💎', name: 'Leyenda Primaria', req: 'Consigue 1.500 puntos', check: function (p) { return p.points >= 1500; } }
  ];

  function getQuestionForSubject(subjId) {
    const mod = MODULES[subjId];
    if (!mod) return null;

    if (typeof mod.generateQuestion === 'function') {
      return mod.generateQuestion(state);
    }

    const list = mod.questions || [];
    const { pick, shuffle } = window.APP_UTILS;
    const item = pick(list);
    const correctText = item.o[item.a];
    const shuffledOpts = shuffle(item.o);
    return {
      subject: subjId,
      type: 'choice',
      topic: item.t,
      q: item.q,
      options: shuffledOpts,
      answer: shuffledOpts.indexOf(correctText),
      explanation: item.e
    };
  }

  /* =======================================================================
     ESTADO PERSISTENTE Y PERFIL
     ======================================================================= */
  function getTodayKey() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function createDefaultProfile() {
    const sp = {};
    SUBJECTS.forEach(function (s) { sp[s.id] = 0; });
    return {
      initialized: false,
      name: 'Campeón',
      avatar: '🦁',
      points: 0,
      level: 1,
      dailyCount: 0,
      lastDailyDate: '',
      subjectPoints: sp
    };
  }

  let profile = createDefaultProfile();

  const state = {
    activeTab: 'home',
    playMode: 'subject',
    currentSubject: 'mates',
    matesMode: 'suma',
    selectedMatesTable: 'all',
    valenciaMode: 'mixto',
    valenciaViewType: 'quiz',
    studySubjectId: 'valencia',
    valenciaStudyCat: 'dias',
    hideValenciaResults: false,
    revealedValenciaCells: {},
    questions: [],
    qIndex: 0,
    correctInRound: 0,
    pointsInRound: 0,
    streak: 0,
    mistakes: [],
    isReviewingMistakes: false,
    answered: false,
    numericInput: '',
    viewTableNum: 2,
    hideTableResults: false,
    revealedCells: {},
    tempAvatar: '🦁'
  };

  function loadProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const def = createDefaultProfile();
        profile = Object.assign({}, def, parsed);
        profile.subjectPoints = Object.assign({}, def.subjectPoints, parsed.subjectPoints || {});
      }
    } catch (err) {
      profile = createDefaultProfile();
    }
  }

  function saveProfile() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (err) {
      // Ignorar si está restringido
    }
    updateHeaderUI();
  }

  function updateHeaderUI() {
    document.getElementById('header-avatar').textContent = profile.avatar || '🦁';
    document.getElementById('header-greeting').textContent = '¡Hola, ' + (profile.name || 'Campeón') + '!';
    document.getElementById('header-level-tag').textContent = 'Nivel ' + profile.level + ' · 3º de Primaria';
    document.getElementById('header-points').textContent = profile.points;

    const doneToday = profile.lastDailyDate === getTodayKey();
    const dailyPill = document.getElementById('daily-status-pill');
    if (doneToday) {
      dailyPill.textContent = '✔ ¡Completado hoy!';
      dailyPill.style.background = '#dcfce7';
      dailyPill.style.color = '#15803d';
    } else {
      dailyPill.textContent = '⭐ +20 pts / acierto';
      dailyPill.style.background = 'rgba(255,255,255,0.85)';
      dailyPill.style.color = '#0f172a';
    }

    document.getElementById('adventure-level-pill').textContent = 'Nivel ' + profile.level;
  }

  /* =======================================================================
     NAVEGACIÓN Y MODOS DE REPASO (OCULTAR / VER EN CUALQUIER ASIGNATURA)
     ======================================================================= */
  function switchTab(tabName) {
    state.activeTab = tabName;
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    document.querySelectorAll('.view').forEach(function (v) {
      v.classList.remove('active');
    });

    if (tabName === 'home') {
      document.getElementById('view-home').classList.add('active');
    } else if (tabName === 'subjects') {
      renderSubjectsGrid();
      document.getElementById('view-subjects').classList.add('active');
    } else if (tabName === 'tables') {
      renderTablesView();
      document.getElementById('view-tables').classList.add('active');
    } else if (tabName === 'points') {
      renderPointsView();
      document.getElementById('view-points').classList.add('active');
    }
  }

  function openSubjectStudyMode(subjId, catKey) {
    const targetSubj = subjId || state.currentSubject || 'valencia';
    const mod = MODULES[targetSubj];
    if (!mod || !mod.studyBlocks) return;

    const blockKeys = Object.keys(mod.studyBlocks);
    if (!blockKeys.length) return;

    state.playMode = 'subject';
    state.currentSubject = targetSubj;
    state.studySubjectId = targetSubj;
    state.valenciaStudyCat = (catKey && mod.studyBlocks[catKey]) ? catKey : blockKeys[0];
    state.valenciaViewType = 'study';
    state.revealedValenciaCells = {};

    document.getElementById('mates-toolbar').style.display = 'none';
    document.getElementById('valencia-toolbar').style.display = targetSubj === 'valencia' ? 'flex' : 'none';
    document.getElementById('subject-study-toolbar').style.display = targetSubj !== 'valencia' ? 'flex' : 'none';
    document.getElementById('play-quiz-card').style.display = 'none';
    document.getElementById('valencia-study-card').style.display = 'flex';

    updateSubjectStudyToolbarUI();
    updateValenciaToolbarUI();
    renderSubjectStudyView();

    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
    document.getElementById('view-play').classList.add('active');
  }

  function startRound(mode, subjectId) {
    state.playMode = mode;
    state.currentSubject = subjectId || 'mates';
    state.valenciaViewType = 'quiz';
    state.isReviewingMistakes = false;
    state.mistakes = [];
    state.qIndex = 0;
    state.correctInRound = 0;
    state.pointsInRound = 0;
    state.streak = 0;

    const matesBar = document.getElementById('mates-toolbar');
    const valBar = document.getElementById('valencia-toolbar');
    const genBar = document.getElementById('subject-study-toolbar');
    document.getElementById('valencia-study-card').style.display = 'none';
    document.getElementById('play-quiz-card').style.display = 'flex';

    const mod = MODULES[state.currentSubject];
    const hasStudyBlocks = mod && mod.studyBlocks && Object.keys(mod.studyBlocks).length > 0;

    if (mode === 'subject' && state.currentSubject === 'mates') {
      matesBar.style.display = 'flex';
      valBar.style.display = 'none';
      genBar.style.display = 'none';
      updateMatesToolbarUI();
    } else if (mode === 'subject' && state.currentSubject === 'valencia') {
      matesBar.style.display = 'none';
      valBar.style.display = 'flex';
      genBar.style.display = 'none';
      updateValenciaToolbarUI();
    } else if (mode === 'subject' && hasStudyBlocks) {
      matesBar.style.display = 'none';
      valBar.style.display = 'none';
      genBar.style.display = 'flex';
      updateSubjectStudyToolbarUI();
    } else {
      matesBar.style.display = 'none';
      valBar.style.display = 'none';
      genBar.style.display = 'none';
    }

    const list = [];
    const allSubjIds = SUBJECTS.map(function (s) { return s.id; });
    for (let i = 0; i < 10; i++) {
      if (mode === 'subject') {
        list.push(getQuestionForSubject(state.currentSubject));
      } else {
        const pickSubj = allSubjIds[i % allSubjIds.length];
        list.push(getQuestionForSubject(pickSubj));
      }
    }
    state.questions = mode === 'subject' ? list : window.APP_UTILS.shuffle(list);

    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
    document.getElementById('view-play').classList.add('active');
    renderCurrentQuestion();
  }

  function startMistakesReview() {
    if (!state.mistakes.length) return;
    state.isReviewingMistakes = true;
    state.valenciaViewType = 'quiz';
    state.questions = state.mistakes.slice();
    state.mistakes = [];
    state.qIndex = 0;
    state.correctInRound = 0;
    state.pointsInRound = 0;
    state.streak = 0;

    document.getElementById('mates-toolbar').style.display = 'none';
    document.getElementById('valencia-toolbar').style.display = 'none';
    document.getElementById('subject-study-toolbar').style.display = 'none';
    document.getElementById('valencia-study-card').style.display = 'none';
    document.getElementById('play-quiz-card').style.display = 'flex';
    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
    document.getElementById('view-play').classList.add('active');
    renderCurrentQuestion();
  }

  function getMultiplier() {
    if (state.playMode !== 'adventure') return 1;
    if (state.streak >= 5) return 3;
    if (state.streak >= 3) return 2;
    return 1;
  }

  function renderCurrentQuestion() {
    const total = state.questions.length;
    const q = state.questions[state.qIndex];
    state.answered = false;
    state.numericInput = '';

    const subjMeta = MODULES[q.subject] || SUBJECTS[0];
    let badgeLabel = subjMeta.icon + ' ' + subjMeta.name;
    if (state.playMode === 'daily') badgeLabel = '☀️ Reto del Día · ' + subjMeta.name;
    if (state.playMode === 'adventure') badgeLabel = '🚀 Aventura Nv.' + profile.level + ' · ' + subjMeta.name;
    if (state.isReviewingMistakes) badgeLabel = '🔁 Repaso · ' + subjMeta.name;

    document.getElementById('play-mode-badge').textContent = badgeLabel;
    const mult = getMultiplier();
    document.getElementById('play-streak-badge').textContent = '🔥 Racha: ' + state.streak + (state.playMode === 'adventure' ? (' (×' + mult + ')') : '');

    document.getElementById('play-step-text').textContent = 'Pregunta ' + (state.qIndex + 1) + ' de ' + total;
    document.getElementById('play-pts-round').textContent = '+' + state.pointsInRound + ' pts en esta ronda';
    document.getElementById('play-progress-fill').style.width = Math.max(8, Math.round((state.qIndex / total) * 100)) + '%';

    const storyBox = document.getElementById('play-story-box');
    if (q.story) {
      storyBox.classList.add('visible');
      document.getElementById('play-story-title').textContent = q.storyTitle || '📖 Lee con atención:';
      document.getElementById('play-story-text').textContent = q.story;
    } else {
      storyBox.classList.remove('visible');
    }

    document.getElementById('play-topic').textContent = q.topic || subjMeta.name;
    document.getElementById('play-question').textContent = q.q;

    document.getElementById('play-feedback').className = 'feedback-box';
    document.getElementById('btn-play-next').classList.remove('visible');

    const numArea = document.getElementById('play-numeric-area');
    const optGrid = document.getElementById('play-options-grid');

    if (q.type === 'numeric') {
      numArea.classList.add('visible');
      optGrid.style.display = 'none';
      document.getElementById('play-math-expr').textContent = q.expr;
      const ansEl = document.getElementById('play-math-ans');
      ansEl.className = 'math-answer-box empty';
      ansEl.textContent = '?';
    } else {
      numArea.classList.remove('visible');
      optGrid.style.display = 'grid';
      const letters = ['A', 'B', 'C', 'D'];
      optGrid.innerHTML = q.options.map(function (opt, idx) {
        return (
          '<button type="button" class="option-btn" data-idx="' + idx + '">' +
            '<span class="option-letter">' + letters[idx] + '</span>' +
            '<span>' + opt + '</span>' +
          '</button>'
        );
      }).join('');

      optGrid.querySelectorAll('.option-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          evaluateChoice(parseInt(btn.getAttribute('data-idx'), 10));
        });
      });
    }
  }

  function evaluateChoice(idx) {
    if (state.answered) return;
    state.answered = true;
    const q = state.questions[state.qIndex];
    const ok = idx === q.answer;

    document.querySelectorAll('#play-options-grid .option-btn').forEach(function (btn, i) {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add('correct');
      else if (i === idx && !ok) btn.classList.add('wrong');
    });

    completeQuestionStep(ok, q, q.options[q.answer]);
  }

  function handleKeyInput(key) {
    if (state.answered) return;
    const ansEl = document.getElementById('play-math-ans');

    if (key === 'DEL') {
      state.numericInput = state.numericInput.slice(0, -1);
      ansEl.textContent = state.numericInput || '?';
      ansEl.classList.toggle('empty', state.numericInput === '');
      return;
    }

    if (key === 'OK') {
      if (state.numericInput === '') {
        showToast('✍️ Escribe primero tu respuesta');
        return;
      }
      state.answered = true;
      const q = state.questions[state.qIndex];
      const ok = parseInt(state.numericInput, 10) === q.answer;
      ansEl.classList.remove('empty');
      ansEl.classList.add(ok ? 'correct' : 'wrong', ok ? 'pop-anim' : 'shake-anim');
      completeQuestionStep(ok, q, String(q.answer));
      return;
    }

    if (state.numericInput.length < 4) {
      state.numericInput = state.numericInput === '0' ? key : (state.numericInput + key);
      ansEl.textContent = state.numericInput;
      ansEl.classList.remove('empty');
    }
  }

  function completeQuestionStep(isCorrect, q, correctLabel) {
    const fbBox = document.getElementById('play-feedback');
    const fbTitle = document.getElementById('play-feedback-title');
    const fbExpl = document.getElementById('play-feedback-expl');

    if (isCorrect) {
      state.correctInRound++;
      state.streak++;
      let earned = 10;
      if (state.playMode === 'daily') earned = 20;
      if (state.playMode === 'adventure') earned = 10 * getMultiplier();

      state.pointsInRound += earned;
      profile.points += earned;
      if (profile.subjectPoints[q.subject] !== undefined) {
        profile.subjectPoints[q.subject] += earned;
      }
      saveProfile();

      fbBox.className = 'feedback-box visible is-correct pop-anim';
      fbTitle.textContent = '🎉 ¡Genial! +' + earned + ' puntos';
      fbExpl.textContent = q.explanation || '¡Respuesta correcta!';
    } else {
      state.streak = 0;
      state.mistakes.push(q);
      fbBox.className = 'feedback-box visible is-wrong shake-anim';
      fbTitle.textContent = '💡 ¡Casi! La respuesta correcta es: ' + correctLabel;
      fbExpl.textContent = q.explanation || '';
    }

    const total = state.questions.length;
    const mult = getMultiplier();
    document.getElementById('play-streak-badge').textContent = '🔥 Racha: ' + state.streak + (state.playMode === 'adventure' ? (' (×' + mult + ')') : '');
    document.getElementById('play-pts-round').textContent = '+' + state.pointsInRound + ' pts en esta ronda';
    document.getElementById('play-progress-fill').style.width = Math.round(((state.qIndex + 1) / total) * 100) + '%';

    const nextBtn = document.getElementById('btn-play-next');
    nextBtn.querySelector('span').textContent = (state.qIndex + 1 < total) ? 'Siguiente pregunta' : 'Ver resultado final';
    nextBtn.classList.add('visible');
  }

  function finishCurrentRound() {
    const total = state.questions.length;
    let bonusMsg = '';

    if (!state.isReviewingMistakes) {
      if (state.playMode === 'daily') {
        const today = getTodayKey();
        if (profile.lastDailyDate !== today) {
          profile.lastDailyDate = today;
          profile.dailyCount++;
          profile.points += 100;
          state.pointsInRound += 100;
          bonusMsg = ' (+100 pts de bonus por Reto del Día)';
        }
      } else if (state.playMode === 'adventure' && state.correctInRound >= 6) {
        profile.level++;
        profile.points += 50;
        state.pointsInRound += 50;
        bonusMsg = ' ¡Subes al Nivel ' + profile.level + ' (+50 pts)!';
      }
      saveProfile();
    }

    const ratio = state.correctInRound / total;
    document.getElementById('summary-emoji').textContent = ratio >= 0.8 ? '🏆' : (ratio >= 0.5 ? '🌟' : '💪');
    document.getElementById('summary-title').textContent = ratio === 1 ? '¡Pleno de aciertos!' : (ratio >= 0.7 ? '¡Muy bien hecho!' : '¡Buen entrenamiento!');
    document.getElementById('summary-subtitle').textContent = 'Has terminado la ronda' + bonusMsg;

    document.getElementById('sum-correct').textContent = state.correctInRound + '/' + total;
    document.getElementById('sum-points').textContent = '+' + state.pointsInRound;
    document.getElementById('sum-level').textContent = 'Nv. ' + profile.level;

    const mBtn = document.getElementById('btn-sum-mistakes');
    if (state.mistakes.length > 0) {
      mBtn.style.display = 'block';
      document.getElementById('sum-mistakes-count').textContent = state.mistakes.length;
    } else {
      mBtn.style.display = 'none';
    }

    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
    document.getElementById('view-summary').classList.add('active');
  }

  /* =======================================================================
     RENDERIZADO DE ASIGNATURAS, REPASO OCULTAR/VER, TABLAS Y PUNTOS
     ======================================================================= */
  function renderSubjectsGrid() {
    const grid = document.getElementById('subjects-grid');
    grid.innerHTML = SUBJECTS.map(function (s) {
      const pts = profile.subjectPoints[s.id] || 0;
      return (
        '<button type="button" class="subject-card ' + s.bg + '" data-subj="' + s.id + '">' +
          '<div class="subj-top">' +
            '<div class="subj-icon">' + s.icon + '</div>' +
            '<span class="subj-pts-tag">⭐ ' + pts + ' pts</span>' +
          '</div>' +
          '<div>' +
            '<h3 class="subj-name">' + s.name + '</h3>' +
            '<p class="subj-desc">' + s.desc + '</p>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    grid.querySelectorAll('.subject-card').forEach(function (btn) {
      btn.addEventListener('click', function () {
        startRound('subject', btn.getAttribute('data-subj'));
      });
    });
  }

  function initMatesToolbar() {
    document.querySelectorAll('#mates-modes-grid .mode-btn[data-mmode]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.matesMode = btn.getAttribute('data-mmode');
        updateMatesToolbarUI();
        startRound('subject', 'mates');
      });
    });

    const pills = document.getElementById('mates-table-pills');
    let html = '<button type="button" class="pill-btn active" data-t="all">Todas</button>';
    for (let i = 1; i <= 10; i++) {
      html += '<button type="button" class="pill-btn" data-t="' + i + '">' + i + '</button>';
    }
    pills.innerHTML = html;

    pills.querySelectorAll('.pill-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        state.selectedMatesTable = b.getAttribute('data-t');
        updateMatesToolbarUI();
        startRound('subject', 'mates');
      });
    });

    document.getElementById('btn-jump-tables').addEventListener('click', function () {
      switchTab('tables');
    });
  }

  function initValenciaToolbar() {
    document.querySelectorAll('#valencia-modes-grid .mode-btn[data-vmode]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.valenciaMode = btn.getAttribute('data-vmode');
        startRound('subject', 'valencia');
      });
    });

    document.getElementById('btn-jump-valencia-study').addEventListener('click', function () {
      openSubjectStudyMode('valencia');
    });

    document.getElementById('btn-mode-quiz-generic').addEventListener('click', function () {
      startRound('subject', state.currentSubject);
    });

    document.getElementById('btn-mode-study-generic').addEventListener('click', function () {
      openSubjectStudyMode(state.currentSubject);
    });

    document.getElementById('btn-toggle-hide-valencia').addEventListener('click', function () {
      state.hideValenciaResults = !state.hideValenciaResults;
      state.revealedValenciaCells = {};
      renderSubjectStudyView();
    });

    document.getElementById('btn-practice-selected-valencia').addEventListener('click', function () {
      const targetSubj = state.studySubjectId || 'valencia';
      const mod = MODULES[targetSubj];
      if (targetSubj === 'valencia' && mod && mod.studyBlocks) {
        const catObj = mod.studyBlocks[state.valenciaStudyCat];
        state.valenciaMode = (catObj && catObj.practiceMode) ? catObj.practiceMode : 'mixto';
      }
      startRound('subject', targetSubj);
    });
  }

  function updateSubjectStudyToolbarUI() {
    const mod = MODULES[state.currentSubject];
    if (!mod) return;
    document.getElementById('subject-study-toolbar-title').textContent = mod.icon + ' ' + mod.name;
    const quizBtn = document.getElementById('btn-mode-quiz-generic');
    const studyBtn = document.getElementById('btn-mode-study-generic');

    if (state.valenciaViewType === 'study') {
      quizBtn.classList.remove('active-green');
      quizBtn.style.background = '#ffffff';
      quizBtn.style.color = '#334155';
      studyBtn.classList.add('active-green');
      studyBtn.style.background = '#15803d';
      studyBtn.style.color = '#ffffff';
    } else {
      quizBtn.classList.add('active-green');
      quizBtn.style.background = '#15803d';
      quizBtn.style.color = '#ffffff';
      studyBtn.classList.remove('active-green');
      studyBtn.style.background = '#dcfce7';
      studyBtn.style.color = '#14532d';
    }
  }

  function updateValenciaToolbarUI() {
    document.querySelectorAll('#valencia-modes-grid .mode-btn[data-vmode]').forEach(function (b) {
      const isMatch = state.valenciaViewType === 'quiz' && b.getAttribute('data-vmode') === state.valenciaMode;
      b.classList.toggle('active-green', isMatch);
    });
    const studyJumpBtn = document.getElementById('btn-jump-valencia-study');
    if (state.valenciaViewType === 'study') {
      studyJumpBtn.classList.add('active-green');
      studyJumpBtn.style.background = '#15803d';
      studyJumpBtn.style.color = '#ffffff';
    } else {
      studyJumpBtn.classList.remove('active-green');
      studyJumpBtn.style.background = '#dcfce7';
      studyJumpBtn.style.color = '#14532d';
    }
  }

  function renderSubjectStudyView() {
    const targetSubj = state.studySubjectId || 'valencia';
    const mod = MODULES[targetSubj];
    if (!mod || !mod.studyBlocks) return;

    document.getElementById('study-card-main-title').textContent = mod.studyTitle || (mod.icon + ' Repaso de ' + mod.name);

    const blocks = mod.studyBlocks;
    const keys = Object.keys(blocks);
    const catsEl = document.getElementById('valencia-study-cats');

    catsEl.innerHTML = keys.map(function (k) {
      const lbl = blocks[k].label || blocks[k].title || k;
      return '<button type="button" class="val-cat-btn' + (state.valenciaStudyCat === k ? ' active' : '') + '" data-vcat="' + k + '">' + lbl + '</button>';
    }).join('');

    catsEl.querySelectorAll('.val-cat-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        state.valenciaStudyCat = b.getAttribute('data-vcat');
        state.revealedValenciaCells = {};
        renderSubjectStudyView();
      });
    });

    const hideBtn = document.getElementById('btn-toggle-hide-valencia');
    hideBtn.textContent = state.hideValenciaResults ? 'Desactivar' : 'Activar';
    hideBtn.classList.toggle('active-green', state.hideValenciaResults);

    const currentCat = blocks[state.valenciaStudyCat] || blocks[keys[0]];
    document.getElementById('valencia-study-title').textContent = currentCat.title;

    const rowsEl = document.getElementById('valencia-study-rows');
    rowsEl.innerHTML = currentCat.items.map(function (item, idx) {
      const isHidden = state.hideValenciaResults && !state.revealedValenciaCells[idx];
      return (
        '<button type="button" class="table-row-btn valencia-row" data-vrow="' + idx + '">' +
          '<span>' + item.es + '</span>' +
          '<span style="color:#94a3b8;">➔</span>' +
          (isHidden
            ? '<span class="table-result-badge hidden-val-green">? Ver</span>'
            : '<span class="table-result-badge valencia-badge">' + item.va + '</span>') +
        '</button>'
      );
    }).join('');

    rowsEl.querySelectorAll('.table-row-btn').forEach(function (rb) {
      rb.addEventListener('click', function () {
        if (!state.hideValenciaResults) return;
        const rIdx = parseInt(rb.getAttribute('data-vrow'), 10);
        state.revealedValenciaCells[rIdx] = !state.revealedValenciaCells[rIdx];
        renderSubjectStudyView();
      });
    });
  }

  function updateMatesToolbarUI() {
    document.querySelectorAll('#mates-modes-grid .mode-btn[data-mmode]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-mmode') === state.matesMode);
    });
    document.getElementById('mates-table-row').classList.toggle('visible', state.matesMode === 'multiplicar');
    document.querySelectorAll('#mates-table-pills .pill-btn').forEach(function (p) {
      p.classList.toggle('active', p.getAttribute('data-t') === String(state.selectedMatesTable));
    });
  }

  function renderTablesView() {
    const grid = document.getElementById('tables-num-grid');
    let html = '';
    for (let n = 1; n <= 10; n++) {
      html += '<button type="button" class="table-num-btn' + (state.viewTableNum === n ? ' active' : '') + '" data-num="' + n + '">' + n + '</button>';
    }
    grid.innerHTML = html;
    grid.querySelectorAll('.table-num-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        state.viewTableNum = parseInt(b.getAttribute('data-num'), 10);
        state.revealedCells = {};
        renderTablesView();
      });
    });

    const hideBtn = document.getElementById('btn-toggle-hide-tables');
    hideBtn.textContent = state.hideTableResults ? 'Desactivar' : 'Activar';
    hideBtn.classList.toggle('active', state.hideTableResults);

    document.getElementById('tables-current-title').textContent = 'Tabla del ' + state.viewTableNum;

    const rowsGrid = document.getElementById('tables-rows-grid');
    let rHtml = '';
    for (let i = 1; i <= 10; i++) {
      const prod = state.viewTableNum * i;
      const hidden = state.hideTableResults && !state.revealedCells[i];
      rHtml += (
        '<button type="button" class="table-row-btn" data-f="' + i + '">' +
          '<span>' + state.viewTableNum + ' × ' + i + '</span>' +
          '<span style="color:#94a3b8;">=</span>' +
          (hidden ? '<span class="table-result-badge hidden-val">? Ver</span>' : '<span class="table-result-badge">' + prod + '</span>') +
        '</button>'
      );
    }
    rowsGrid.innerHTML = rHtml;
    rowsGrid.querySelectorAll('.table-row-btn').forEach(function (rb) {
      rb.addEventListener('click', function () {
        if (!state.hideTableResults) return;
        const f = parseInt(rb.getAttribute('data-f'), 10);
        state.revealedCells[f] = !state.revealedCells[f];
        renderTablesView();
      });
    });
  }

  function renderPointsView() {
    document.getElementById('pts-student-name').textContent = profile.name || 'Campeón';
    document.getElementById('pts-total-big').textContent = profile.points;
    document.getElementById('pts-level-big').textContent = profile.level;
    document.getElementById('pts-daily-big').textContent = profile.dailyCount;

    const mGrid = document.getElementById('medals-grid');
    mGrid.innerHTML = MEDALS.map(function (m) {
      const unlocked = m.check(profile);
      return (
        '<div class="medal-card' + (unlocked ? ' unlocked' : '') + '">' +
          '<div class="medal-icon">' + (unlocked ? m.icon : '🔒') + '</div>' +
          '<div class="medal-name">' + m.name + '</div>' +
          '<div class="medal-req">' + m.req + '</div>' +
        '</div>'
      );
    }).join('');

    const sList = document.getElementById('subj-progress-list');
    const maxPts = Math.max(200, Math.max.apply(null, Object.values(profile.subjectPoints)));
    sList.innerHTML = SUBJECTS.map(function (s) {
      const val = profile.subjectPoints[s.id] || 0;
      const pct = Math.min(100, Math.round((val / maxPts) * 100));
      return (
        '<div class="subj-prog-row">' +
          '<div class="subj-prog-top">' +
            '<span>' + s.icon + ' ' + s.name + '</span>' +
            '<span style="color:var(--primary-dark);">' + val + ' pts</span>' +
          '</div>' +
          '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%;"></div></div>' +
        '</div>'
      );
    }).join('');
  }

  /* =======================================================================
     MODALES: BIENVENIDA, PERFIL Y CÓDIGO DE SEGURIDAD
     ======================================================================= */
  function renderAvatarPicker(containerId, currentAvatar, onSelect) {
    const el = document.getElementById(containerId);
    el.innerHTML = AVATARS.map(function (av) {
      return '<button type="button" class="avatar-opt' + (av === currentAvatar ? ' selected' : '') + '" data-av="' + av + '">' + av + '</button>';
    }).join('');
    el.querySelectorAll('.avatar-opt').forEach(function (b) {
      b.addEventListener('click', function () {
        onSelect(b.getAttribute('data-av'));
      });
    });
  }

  function openWelcomeIfNeeded() {
    if (profile.initialized) return;
    state.tempAvatar = profile.avatar || '🦁';
    function refreshWelcomePicker(av) {
      state.tempAvatar = av;
      renderAvatarPicker('welcome-avatar-picker', state.tempAvatar, refreshWelcomePicker);
    }
    renderAvatarPicker('welcome-avatar-picker', state.tempAvatar, refreshWelcomePicker);
    document.getElementById('modal-welcome').classList.add('open');
  }

  function encodeBackup() {
    try {
      return btoa(unescape(encodeURIComponent(JSON.stringify(profile))));
    } catch (e) {
      return JSON.stringify(profile);
    }
  }

  function decodeBackup(str) {
    const trimmed = str.trim();
    try {
      return JSON.parse(decodeURIComponent(escape(atob(trimmed))));
    } catch (e) {
      return JSON.parse(trimmed);
    }
  }

  function openProfileModal() {
    document.getElementById('profile-name-input').value = profile.name || '';
    state.tempAvatar = profile.avatar || '🦁';
    function refreshPicker(av) {
      state.tempAvatar = av;
      renderAvatarPicker('profile-avatar-picker', state.tempAvatar, refreshPicker);
    }
    renderAvatarPicker('profile-avatar-picker', state.tempAvatar, refreshPicker);
    document.getElementById('backup-code-area').value = encodeBackup();
    document.getElementById('reset-confirm-box').style.display = 'none';
    document.getElementById('modal-profile').classList.add('open');
  }

  let toastTimer = null;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  function bindEvents() {
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchTab(btn.getAttribute('data-tab'));
      });
    });

    document.getElementById('card-daily-challenge').addEventListener('click', function () {
      startRound('daily');
    });
    document.getElementById('card-adventure-mode').addEventListener('click', function () {
      startRound('adventure');
    });
    document.getElementById('card-quick-subjects').addEventListener('click', function () {
      switchTab('subjects');
    });
    document.getElementById('card-quick-tables').addEventListener('click', function () {
      switchTab('tables');
    });
    document.getElementById('card-quick-valencia-study').addEventListener('click', function () {
      openSubjectStudyMode('valencia', 'dias');
    });

    document.getElementById('play-keypad').querySelectorAll('.key-btn').forEach(function (k) {
      k.addEventListener('click', function () {
        handleKeyInput(k.getAttribute('data-key'));
      });
    });

    document.getElementById('btn-play-next').addEventListener('click', function () {
      if (state.qIndex + 1 < state.questions.length) {
        state.qIndex++;
        renderCurrentQuestion();
      } else {
        finishCurrentRound();
      }
    });

    document.getElementById('btn-sum-mistakes').addEventListener('click', startMistakesReview);
    document.getElementById('btn-sum-again').addEventListener('click', function () {
      startRound(state.playMode, state.currentSubject);
    });
    document.getElementById('btn-sum-home').addEventListener('click', function () {
      switchTab('home');
    });

    document.getElementById('btn-toggle-hide-tables').addEventListener('click', function () {
      state.hideTableResults = !state.hideTableResults;
      state.revealedCells = {};
      renderTablesView();
    });

    document.getElementById('btn-practice-selected-table').addEventListener('click', function () {
      state.matesMode = 'multiplicar';
      state.selectedMatesTable = String(state.viewTableNum);
      startRound('subject', 'mates');
    });

    document.getElementById('btn-welcome-start').addEventListener('click', function () {
      const val = document.getElementById('welcome-name-input').value.trim();
      profile.name = val || 'Campeón';
      profile.avatar = state.tempAvatar;
      profile.initialized = true;
      saveProfile();
      document.getElementById('modal-welcome').classList.remove('open');
      showToast('🎉 ¡Hola, ' + profile.name + '! ¡A jugar!');
    });

    document.getElementById('btn-open-profile').addEventListener('click', openProfileModal);
    document.getElementById('btn-close-profile').addEventListener('click', function () {
      document.getElementById('modal-profile').classList.remove('open');
    });

    document.getElementById('btn-save-profile').addEventListener('click', function () {
      const val = document.getElementById('profile-name-input').value.trim();
      if (val) profile.name = val;
      profile.avatar = state.tempAvatar;
      profile.initialized = true;
      saveProfile();
      document.getElementById('modal-profile').classList.remove('open');
      showToast('✅ Perfil actualizado');
    });

    document.getElementById('btn-copy-backup').addEventListener('click', function () {
      const area = document.getElementById('backup-code-area');
      area.value = encodeBackup();
      area.select();
      try {
        document.execCommand('copy');
        showToast('📋 Código copiado. Guárdalo en un lugar seguro.');
      } catch (e) {
        showToast('Selecciona el texto y cópialo manualmente.');
      }
    });

    document.getElementById('btn-import-backup').addEventListener('click', function () {
      try {
        const data = decodeBackup(document.getElementById('backup-code-area').value);
        if (!data || typeof data.points !== 'number') throw new Error('Invalid');
        const def = createDefaultProfile();
        profile = Object.assign({}, def, data);
        profile.subjectPoints = Object.assign({}, def.subjectPoints, data.subjectPoints || {});
        profile.initialized = true;
        saveProfile();
        document.getElementById('modal-profile').classList.remove('open');
        switchTab('home');
        showToast('🎉 ¡Progreso restaurado con éxito!');
      } catch (e) {
        showToast('⚠️ El código pegado no es válido.');
      }
    });

    document.getElementById('btn-reset-progress').addEventListener('click', function () {
      document.getElementById('reset-confirm-box').style.display = 'block';
    });

    document.getElementById('btn-cancel-reset').addEventListener('click', function () {
      document.getElementById('reset-confirm-box').style.display = 'none';
    });

    document.getElementById('btn-confirm-reset').addEventListener('click', function () {
      const keepName = profile.name;
      const keepAvatar = profile.avatar;
      profile = createDefaultProfile();
      profile.name = keepName;
      profile.avatar = keepAvatar;
      profile.initialized = true;
      saveProfile();
      document.getElementById('modal-profile').classList.remove('open');
      switchTab('home');
      showToast('🔄 Progreso restaurado a 0 puntos.');
    });

    window.addEventListener('keydown', function (e) {
      const playActive = document.getElementById('view-play').classList.contains('active');
      const numVisible = document.getElementById('play-numeric-area').classList.contains('visible');
      if (!playActive || !numVisible) return;

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleKeyInput(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleKeyInput('DEL');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (state.answered) {
          document.getElementById('btn-play-next').click();
        } else {
          handleKeyInput('OK');
        }
      }
    });
  }

  loadProfile();
  updateHeaderUI();
  initMatesToolbar();
  initValenciaToolbar();
  bindEvents();
  openWelcomeIfNeeded();
});
