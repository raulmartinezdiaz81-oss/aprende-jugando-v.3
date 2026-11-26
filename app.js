/* =========================================================================
   MOTOR CENTRAL DE LA APLICACIÓN (app.js)
   - Conecta automáticamente todos los archivos de la carpeta asignaturas/
   - Conecta el catálogo de vídeos educativos (window.ASIGNATURAS_VIDEOS) y juegos
   - Gestiona puntos, medallas, tablas, modos de repaso (Ocultar/Ver) y modales.
   ========================================================================= */
document.addEventListener('DOMContentLoaded', function () {
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
    selectedVideoSection: null,
    selectedVideoId: null,
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
     VÍDEOS EDUCATIVOS (APARTADOS POR ASIGNATURA)
     ======================================================================= */
  function getVideoSections() {
    const raw = window.ASIGNATURAS_VIDEOS || window.VIDEOS_EDUCATIVOS;
    if (!raw) return [];

    if (Array.isArray(raw)) {
      return raw.filter(function (sec) {
        return sec && Array.isArray(sec.videos) && sec.videos.length > 0;
      });
    }

    const orderedKeys = SUBJECT_ORDER.filter(function (k) { return !!raw[k]; })
      .concat(Object.keys(raw).filter(function (k) { return SUBJECT_ORDER.indexOf(k) === -1; }));

    return orderedKeys.map(function (key) {
      const entry = raw[key];
      const mod = MODULES[key] || {};
      const videos = Array.isArray(entry) ? entry : (Array.isArray(entry && entry.videos) ? entry.videos : []);
      if (!videos.length) return null;

      return {
        id: (entry && entry.id) || key,
        name: (entry && entry.name) || mod.name || key,
        icon: (entry && entry.icon) || mod.icon || '🎬',
        desc: (entry && entry.desc) || ('Vídeos y canciones de ' + ((entry && entry.name) || mod.name || key)),
        bg: (entry && entry.bg) || mod.bg || '',
        videos: videos
      };
    }).filter(Boolean);
  }

  function renderVideosView(sectionId) {
    const view = document.getElementById('view-videos');
    if (!view) return;

    const sections = getVideoSections();
    const gridEl = document.getElementById('videos-sections-grid');
    const panelEl = document.getElementById('videos-player-panel');
    const subtitleEl = document.getElementById('videos-subtitle');

    if (!sections.length) {
      gridEl.style.display = 'none';
      panelEl.style.display = 'none';
      subtitleEl.textContent = 'Aún no hay vídeos añadidos en asignaturas/videos.js.';
      return;
    }

    if (typeof sectionId === 'string') {
      state.selectedVideoSection = sectionId;
    }

    const activeSection = sections.find(function (s) { return s.id === state.selectedVideoSection; }) || null;

    if (!activeSection) {
      subtitleEl.textContent = 'Elige un apartado por asignatura para ver sus canciones y vídeos';
      gridEl.style.display = 'grid';
      panelEl.style.display = 'none';
      document.getElementById('videos-main-yt-player').src = '';

      gridEl.innerHTML = sections.map(function (sec) {
        const countLabel = sec.videos.length + (sec.videos.length === 1 ? ' vídeo' : ' vídeos');
        return (
          '<button type="button" class="subject-card ' + (sec.bg || '') + '" data-vsec="' + sec.id + '">' +
            '<div class="subj-top">' +
              '<div class="subj-icon">' + sec.icon + '</div>' +
              '<span class="subj-pts-tag">🎬 ' + countLabel + '</span>' +
            '</div>' +
            '<div>' +
              '<h3 class="subj-name">' + sec.name + '</h3>' +
              '<p class="subj-desc">' + sec.desc + '</p>' +
            '</div>' +
          '</button>'
        );
      }).join('');

      gridEl.querySelectorAll('[data-vsec]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.selectedVideoSection = btn.getAttribute('data-vsec');
          state.selectedVideoId = null;
          renderVideosView();
        });
      });
      return;
    }

    subtitleEl.textContent = 'Apartado de ' + activeSection.name;
    gridEl.style.display = 'none';
    panelEl.style.display = 'flex';

    const currentVideo = activeSection.videos.find(function (v) { return v.id === state.selectedVideoId; }) || activeSection.videos[0];
    state.selectedVideoId = currentVideo.id;

    document.getElementById('videos-active-section-title').textContent = activeSection.icon + ' ' + activeSection.name;
    document.getElementById('videos-active-caption').textContent = currentVideo.title || currentVideo.label || '';

    const listBtnsEl = document.getElementById('videos-list-buttons');
    listBtnsEl.innerHTML = activeSection.videos.map(function (v) {
      const isAct = v.id === currentVideo.id;
      return '<button type="button" class="mode-btn' + (isAct ? ' active-green' : '') + '" data-vid="' + v.id + '">' + v.label + '</button>';
    }).join('');

    const iframe = document.getElementById('videos-main-yt-player');
    const targetSrc = 'https://www.youtube.com/embed/' + currentVideo.id + '?rel=0&modestbranding=1&playsinline=1';
    if (iframe.getAttribute('src') !== targetSrc) {
      iframe.src = targetSrc;
    }

    listBtnsEl.querySelectorAll('[data-vid]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.selectedVideoId = btn.getAttribute('data-vid');
        renderVideosView();
      });
    });
  }

  function openEducationalVideos(sectionId) {
    state.activeTab = 'videos';
    if (typeof sectionId === 'string') {
      state.selectedVideoSection = sectionId;
      state.selectedVideoId = null;
    } else {
      state.selectedVideoSection = null;
      state.selectedVideoId = null;
    }
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.classList.remove('active');
    });
    document.querySelectorAll('.view').forEach(function (v) {
      v.classList.remove('active');
    });
    const view = document.getElementById('view-videos');
    if (view) {
      view.classList.add('active');
      renderVideosView();
    }
  }

  function openEducationalGames(gameId) {
    state.activeTab = 'games';
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === 'games');
    });
    document.querySelectorAll('.view').forEach(function (v) {
      v.classList.remove('active');
    });
    const view = document.getElementById('view-games');
    if (view) {
      view.classList.add('active');
    }
    if (typeof window.openEducationalGame === 'function') {
      window.openEducationalGame(gameId || null);
      return;
    }
    showToast('🎮 Cargando zona de juegos...');
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
      document.getElementById('view-tables').classList.add('active');
      renderTablesView();
    } else if (tabName === 'points') {
      renderPointsView();
      document.getElementById('view-points').classList.add('active');
    } else if (tabName === 'videos') {
      openEducationalVideos();
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

    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
    document.getElementById('view-play').classList.add('active');
    renderSubjectStudyView();
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
    document.getElementById('card-quick-videos').addEventListener('click', function () {
      openEducationalVideos();
    });
    document.getElementById('card-quick-games').addEventListener('click', function () {
      openEducationalGames();
    });

    document.getElementById('btn-videos-back-home').addEventListener('click', function () {
      switchTab('home');
    });
    document.getElementById('btn-videos-all-sections').addEventListener('click', function () {
      state.selectedVideoSection = null;
      state.selectedVideoId = null;
      renderVideosView();
    });

    const btnGamesHome = document.getElementById('btn-games-back-home');
    if (btnGamesHome) {
      btnGamesHome.addEventListener('click', function () {
        if (window.GAMES_ENGINE && typeof window.GAMES_ENGINE.cleanup === 'function') {
          window.GAMES_ENGINE.cleanup();
        }
        switchTab('home');
      });
    }

    const btnGamesMenu = document.getElementById('btn-games-back-menu');
    if (btnGamesMenu) {
      btnGamesMenu.addEventListener('click', function () {
        if (window.GAMES_ENGINE && typeof window.GAMES_ENGINE.showMenu === 'function') {
          window.GAMES_ENGINE.showMenu();
        }
      });
    }

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
/* =========================================================================
   MÓDULO DE 10 JUEGOS EDUCATIVOS (CONECTADO CON #view-games Y #header-points)
   ========================================================================= */
(function () {
  const PROFILE_KEY = 'aprende_jugando_3primaria_modular_v1';

  const ENGINE = {
    activeGameId: null,
    activeCustomCleanup: null,
    timerId: null,
    timeLeft: 50,
    score: 0,
    round: 1,
    maxRounds: 6,
    selectedCards: [],
    matchedIds: new Set(),
    wordTokens: [],
    ladderStep: 0
  };

  function clearTimer() {
    if (ENGINE.timerId) {
      clearInterval(ENGINE.timerId);
      ENGINE.timerId = null;
    }
  }

  function cleanupActiveGame() {
    clearTimer();
    if (typeof ENGINE.activeCustomCleanup === 'function') {
      try {
        ENGINE.activeCustomCleanup();
      } catch (e) {
        // Ignorar errores de limpieza
      }
      ENGINE.activeCustomCleanup = null;
    }
  }

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function addPoints(pts, subjId) {
    ENGINE.score += pts;
    const scoreBadge = document.getElementById('g-live-score');
    if (scoreBadge) scoreBadge.textContent = '⭐ +' + ENGINE.score + ' pts';

    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        p.points = (p.points || 0) + pts;
        if (subjId && p.subjectPoints && typeof p.subjectPoints[subjId] === 'number') {
          p.subjectPoints[subjId] += pts;
        }
        localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
        const hdrPts = document.getElementById('header-points');
        if (hdrPts) hdrPts.textContent = p.points;
      }
    } catch (e) {
      // Ignorar si está restringido
    }
  }

  const BUILTIN_GAMES = [
    { id: 'tablas_reto', icon: '✖️', name: 'Tablas Exprés', desc: 'Acierta multiplicaciones del 1 al 10 contrarreloj.', badge: '+15 pts', subj: 'mates', bg: 'bg-mates' },
    { id: 'memory_vocab', icon: '🃏', name: 'Memory Idiomas', desc: 'Encuentra las parejas entre castellano, valencià e inglés.', badge: '+25 pts', subj: 'valencia', bg: 'bg-valencia' },
    { id: 'sopa_letras', icon: '🔤', name: 'Sopa de Letras', desc: 'Descubre las palabras escondidas en la cuadrícula.', badge: '+20 pts', subj: 'lengua', bg: 'bg-lengua' },
    { id: 'el_intruso', icon: '🕵️', name: 'El Intruso', desc: 'Detecta la palabra o elemento que no pertenece al grupo.', badge: '+15 pts', subj: 'cmedio', bg: 'bg-cmedio' },
    { id: 'escalera_calculo', icon: '🪜', name: 'Escalera de Cálculo', desc: 'Sube peldaños resolviendo sumas, restas y dobles.', badge: '+15 pts', subj: 'mates', bg: 'bg-mates' },
    { id: 'ordena_frase', icon: '🧩', name: 'Ordena la Frase', desc: 'Coloca las palabras en orden para formar oraciones.', badge: '+15 pts', subj: 'lengua', bg: 'bg-lectura' },
    { id: 'verdadero_falso', icon: '✅', name: 'Verdadero o Falso', desc: 'Responde rápido a retos de ciencias, mates y lengua.', badge: '+15 pts', subj: 'cmedio', bg: 'bg-musica' },
    { id: 'completa_hueco', icon: '✍️', name: 'Completa el Hueco', desc: 'Elige la palabra o número exacto que falta.', badge: '+15 pts', subj: 'ingles', bg: 'bg-ingles' },
    { id: 'mayor_menor', icon: '⚖️', name: 'Mayor, Menor o Igual', desc: 'Compara números y operaciones antes de que acabe el tiempo.', badge: '+15 pts', subj: 'mates', bg: 'bg-plastica' },
    { id: 'reto_relampago', icon: '⚡', name: 'Reto Relámpago', desc: 'Preguntas rápidas mezcladas de varias asignaturas.', badge: '+20 pts', subj: 'lectura', bg: 'bg-efisica' }
  ];

  function getAllGames() {
    const custom = Array.isArray(window.JUEGOS_EDUCATIVOS) ? window.JUEGOS_EDUCATIVOS : [];
    const map = new Map();
    BUILTIN_GAMES.forEach(function (g) { map.set(g.id, g); });
    custom.forEach(function (g) {
      if (g && g.id) {
        const prev = map.get(g.id) || {};
        map.set(g.id, Object.assign({}, prev, g));
      }
    });
    return Array.from(map.values());
  }

  function showGamesMenu() {
    cleanupActiveGame();
    ENGINE.activeGameId = null;

    const menuGrid = document.getElementById('games-menu-grid');
    const stage = document.getElementById('game-stage-container');
    const btnBackMenu = document.getElementById('btn-games-back-menu');
    const subtitle = document.getElementById('games-view-subtitle');

    if (btnBackMenu) btnBackMenu.style.display = 'none';
    if (stage) {
      stage.style.display = 'none';
      stage.innerHTML = '';
    }
    if (subtitle) subtitle.textContent = 'Elige uno de los 10 minijuegos y suma puntos a tu perfil';

    if (!menuGrid) return;
    menuGrid.style.display = 'grid';

    const games = getAllGames();
    menuGrid.innerHTML = games.map(function (g) {
      return (
        '<button type="button" class="subject-card ' + (g.bg || '') + '" data-launch-game="' + g.id + '">' +
          '<div class="subj-top">' +
            '<div class="subj-icon">' + (g.icon || '🎮') + '</div>' +
            '<span class="subj-pts-tag">' + (g.badge || '+15 pts') + '</span>' +
          '</div>' +
          '<div>' +
            '<h3 class="subj-name">' + g.name + '</h3>' +
            '<p class="subj-desc">' + (g.desc || '') + '</p>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    menuGrid.querySelectorAll('[data-launch-game]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        launchGame(btn.getAttribute('data-launch-game'));
      });
    });
  }

  function launchGame(gameId) {
    cleanupActiveGame();
    const games = getAllGames();
    const game = games.find(function (g) { return g.id === gameId; });
    if (!game) {
      showGamesMenu();
      return;
    }

    ENGINE.activeGameId = game.id;
    ENGINE.score = 0;
    ENGINE.round = 1;
    ENGINE.maxRounds = 6;
    ENGINE.timeLeft = 50;
    ENGINE.ladderStep = 0;

    const menuGrid = document.getElementById('games-menu-grid');
    const stage = document.getElementById('game-stage-container');
    const btnBackMenu = document.getElementById('btn-games-back-menu');
    const subtitle = document.getElementById('games-view-subtitle');

    if (menuGrid) menuGrid.style.display = 'none';
    if (btnBackMenu) btnBackMenu.style.display = 'inline-flex';
    if (subtitle) subtitle.textContent = game.name + ' · ¡A sumar puntos!';
    if (!stage) return;

    stage.style.display = 'block';

    if (typeof game.mount === 'function') {
      stage.innerHTML = '<div id="custom-game-host"></div>';
      const host = document.getElementById('custom-game-host');
      const cleanup = game.mount(host, {
        addPoints: addPoints,
        backToMenu: showGamesMenu,
        randInt: randInt,
        shuffle: shuffle
      });
      if (typeof cleanup === 'function') {
        ENGINE.activeCustomCleanup = cleanup;
      }
      return;
    }

    stage.innerHTML = [
      '<div class="card" style="gap:14px;">',
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--border);">',
          '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">',
            '<span class="round-badge">' + (game.icon || '🎮') + ' ' + game.name + '</span>',
            '<span id="g-round-lbl" style="font-weight:800;color:var(--muted);font-size:0.86rem;">Ronda 1/' + ENGINE.maxRounds + '</span>',
          '</div>',
          '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">',
            '<span id="g-live-timer" style="font-weight:900;color:#ea580c;">⏱ 50s</span>',
            '<span id="g-live-score" style="font-weight:900;color:#15803d;">⭐ +0 pts</span>',
          '</div>',
        '</div>',
        '<div id="g-canvas" style="min-height:200px;"></div>',
        '<div id="g-msg" class="feedback-box" style="display:none;"></div>',
        '<div style="display:flex;justify-content:flex-end;gap:10px;">',
          '<button type="button" class="btn-primary" id="g-next-btn" style="display:none;max-width:220px;">Siguiente ➔</button>',
        '</div>',
      '</div>'
    ].join('');

    document.getElementById('g-next-btn').addEventListener('click', function () {
      if (ENGINE.timeLeft <= 0 || ENGINE.round >= ENGINE.maxRounds) {
        renderGameEnd(ENGINE.timeLeft <= 0 ? '¡Tiempo agotado!' : '¡Partida completada!');
      } else {
        ENGINE.round++;
        renderCurrentMiniRound(game);
      }
    });

    ENGINE.timerId = setInterval(function () {
      ENGINE.timeLeft--;
      const tEl = document.getElementById('g-live-timer');
      if (tEl) {
        tEl.textContent = '⏱ ' + Math.max(0, ENGINE.timeLeft) + 's';
        tEl.style.color = ENGINE.timeLeft <= 10 ? '#dc2626' : '#ea580c';
      }
      if (ENGINE.timeLeft <= 0) {
        clearTimer();
        renderGameEnd('¡Se acabó el tiempo!');
      }
    }, 1000);

    renderCurrentMiniRound(game);
  }

  function setMsg(text, ok) {
    const el = document.getElementById('g-msg');
    if (!el) return;
    el.style.display = 'block';
    el.className = 'feedback-box visible ' + (ok ? 'is-correct' : 'is-wrong');
    el.innerHTML = '<div class="feedback-header">' + (ok ? '🎉 ¡Muy bien!' : '💡 ¡Casi!') + '</div><div>' + text + '</div>';
    const nextBtn = document.getElementById('g-next-btn');
    if (nextBtn) nextBtn.style.display = 'inline-flex';
  }

  function hideMsg() {
    const el = document.getElementById('g-msg');
    const nextBtn = document.getElementById('g-next-btn');
    if (el) el.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  }

  function renderGameEnd(title) {
    clearTimer();
    hideMsg();
    const canvas = document.getElementById('g-canvas');
    if (!canvas) return;
    canvas.innerHTML = [
      '<div style="text-align:center;padding:20px 10px;">',
        '<div style="font-size:3.2rem;">🏆</div>',
        '<h3 style="margin:8px 0 6px;font-size:1.35rem;font-weight:900;">' + title + '</h3>',
        '<p style="margin:0 0 16px;color:var(--muted);font-weight:700;">Has ganado <strong>+' + ENGINE.score + ' puntos</strong>.</p>',
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">',
          '<button type="button" class="btn-primary" id="g-retry-btn" style="max-width:200px;">🔁 Jugar otra vez</button>',
          '<button type="button" class="btn-secondary" id="g-all-btn" style="max-width:200px;">🎮 Ver los 10 juegos</button>',
        '</div>',
      '</div>'
    ].join('');
    document.getElementById('g-retry-btn').addEventListener('click', function () {
      launchGame(ENGINE.activeGameId);
    });
    document.getElementById('g-all-btn').addEventListener('click', showGamesMenu);
  }

  function renderChoiceQuestion(promptText, options, correctIdx, explanation, pts, subj) {
    const canvas = document.getElementById('g-canvas');
    const letters = ['A', 'B', 'C', 'D'];
    canvas.innerHTML = [
      '<div style="text-align:center;">',
        '<p style="font-size:1.25rem;font-weight:900;margin:8px 0 18px;color:#0f172a;">' + promptText + '</p>',
        '<div class="options-grid" style="max-width:520px;margin:0 auto;">',
          options.map(function (opt, i) {
            return '<button type="button" class="option-btn" data-opt="' + i + '"><span class="option-letter">' + letters[i] + '</span><span>' + opt + '</span></button>';
          }).join(''),
        '</div>',
      '</div>'
    ].join('');

    canvas.querySelectorAll('[data-opt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        canvas.querySelectorAll('[data-opt]').forEach(function (b) { b.disabled = true; });
        const picked = parseInt(btn.getAttribute('data-opt'), 10);
        if (picked === correctIdx) {
          btn.classList.add('correct');
          addPoints(pts, subj);
          setMsg(explanation + ' (+' + pts + ' pts)', true);
        } else {
          btn.classList.add('wrong');
          const right = canvas.querySelector('[data-opt="' + correctIdx + '"]');
          if (right) right.classList.add('correct');
          setMsg(explanation, false);
        }
      });
    });
  }

  function renderCurrentMiniRound(game) {
    hideMsg();
    const rLbl = document.getElementById('g-round-lbl');
    if (rLbl) rLbl.textContent = 'Ronda ' + ENGINE.round + '/' + ENGINE.maxRounds;

    const id = game.id;

    if (id === 'tablas_reto') {
      const a = randInt(2, 10);
      const b = randInt(1, 10);
      const ans = a * b;
      const set = new Set([ans]);
      while (set.size < 4) {
        const c = ans + randInt(-10, 10);
        if (c >= 0 && c !== ans) set.add(c);
      }
      const opts = shuffle(Array.from(set));
      renderChoiceQuestion('¿Cuánto es ' + a + ' × ' + b + '?', opts, opts.indexOf(ans), a + ' × ' + b + ' = ' + ans + '.', 15, 'mates');
      return;
    }

    if (id === 'escalera_calculo') {
      ENGINE.ladderStep = Math.min(6, ENGINE.round);
      const isAdd = ENGINE.round % 2 === 1;
      const a = randInt(20, 140);
      const b = randInt(5, 65);
      const ans = isAdd ? a + b : a - b;
      const set = new Set([ans]);
      while (set.size < 4) {
        const c = ans + randInt(-9, 9);
        if (c >= 0 && c !== ans) set.add(c);
      }
      const opts = shuffle(Array.from(set));
      renderChoiceQuestion(
        'Peldaño ' + ENGINE.ladderStep + '/6 · Resuelve: ' + a + (isAdd ? ' + ' : ' - ') + b,
        opts,
        opts.indexOf(ans),
        'Resultado correcto: ' + ans + '.',
        15,
        'mates'
      );
      return;
    }

    if (id === 'mayor_menor') {
      const n1 = randInt(10, 99);
      const n2 = ENGINE.round % 3 === 0 ? n1 : randInt(10, 99);
      const rightSym = n1 > n2 ? '>' : (n1 < n2 ? '<' : '=');
      const opts = ['>', '<', '='];
      renderChoiceQuestion(
        'Compara los números: ' + n1 + '  [ ? ]  ' + n2,
        opts,
        opts.indexOf(rightSym),
        n1 + ' ' + rightSym + ' ' + n2 + '.',
        15,
        'mates'
      );
      return;
    }

    if (id === 'memory_vocab') {
      const pairs = shuffle([
        { id: '1', a: 'Perro', b: 'Gos / Dog', subj: 'valencia' },
        { id: '2', a: 'Agua', b: 'Aigua / Water', subj: 'valencia' },
        { id: '3', a: 'Libro', b: 'Llibre / Book', subj: 'ingles' },
        { id: '4', a: 'Casa', b: 'Casa / House', subj: 'ingles' }
      ]);
      const cards = shuffle(
        pairs.map(function (p) { return { pid: p.id, txt: p.a, subj: p.subj }; })
          .concat(pairs.map(function (p) { return { pid: p.id, txt: p.b, subj: p.subj }; }))
      );
      ENGINE.selectedCards = [];
      ENGINE.matchedIds = new Set();

      const canvas = document.getElementById('g-canvas');
      canvas.innerHTML = [
        '<p style="text-align:center;font-weight:800;color:var(--muted);margin:0 0 12px;">Toca dos tarjetas que signifiquen lo mismo:</p>',
        '<div class="options-grid" style="max-width:540px;margin:0 auto;">',
          cards.map(function (c, i) {
            return '<button type="button" class="option-btn" data-mcard="' + i + '" data-pid="' + c.pid + '" data-subj="' + c.subj + '">' + c.txt + '</button>';
          }).join(''),
        '</div>'
      ].join('');

      canvas.querySelectorAll('[data-mcard]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const pid = btn.getAttribute('data-pid');
          if (ENGINE.matchedIds.has(pid) || ENGINE.selectedCards.indexOf(btn) !== -1) return;
          btn.style.borderColor = '#2563eb';
          ENGINE.selectedCards.push(btn);

          if (ENGINE.selectedCards.length === 2) {
            const [b1, b2] = ENGINE.selectedCards;
            ENGINE.selectedCards = [];
            if (b1.getAttribute('data-pid') === b2.getAttribute('data-pid')) {
              ENGINE.matchedIds.add(pid);
              b1.classList.add('correct');
              b2.classList.add('correct');
              b1.disabled = true;
              b2.disabled = true;
              if (ENGINE.matchedIds.size === pairs.length) {
                addPoints(25, b1.getAttribute('data-subj'));
                setMsg('¡Has emparejado todas las palabras! (+25 pts)', true);
              }
            } else {
              setTimeout(function () {
                b1.style.borderColor = '';
                b2.style.borderColor = '';
              }, 400);
            }
          }
        });
      });
      return;
    }

    if (id === 'sopa_letras') {
      const targets = [
        { word: 'SOL', grid: ['S','O','L','A','M','O','P','R','T'], subj: 'cmedio' },
        { word: 'MAR', grid: ['E','L','S','M','A','R','O','T','U'], subj: 'cmedio' },
        { word: 'LIBRO', grid: ['L','I','B','R','O','A','S','E','T'], subj: 'lengua' },
        { word: 'GOS', grid: ['P','A','G','O','S','L','E','T','A'], subj: 'valencia' }
      ];
      const t = targets[(ENGINE.round - 1) % targets.length];
      let picked = '';
      const canvas = document.getElementById('g-canvas');
      canvas.innerHTML = [
        '<div style="text-align:center;">',
          '<p style="font-weight:900;margin:0 0 6px;">Busca y toca las letras de: <span style="color:var(--primary-dark);">' + t.word + '</span></p>',
          '<div id="sopa-word" style="min-height:32px;font-size:1.2rem;font-weight:900;margin-bottom:10px;color:#15803d;"></div>',
          '<div style="display:grid;grid-template-columns:repeat(3,64px);gap:8px;justify-content:center;margin-bottom:12px;">',
            t.grid.map(function (ch, idx) {
              return '<button type="button" class="mode-btn" data-sopa="' + idx + '" data-ch="' + ch + '" style="justify-content:center;font-size:1.1rem;">' + ch + '</button>';
            }).join(''),
          '</div>',
          '<button type="button" class="pill-btn" id="sopa-reset">Limpiar letras</button>',
        '</div>'
      ].join('');

      const wordDisp = document.getElementById('sopa-word');
      canvas.querySelectorAll('[data-sopa]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (btn.disabled) return;
          btn.disabled = true;
          btn.classList.add('active-green');
          picked += btn.getAttribute('data-ch');
          wordDisp.textContent = picked;
          if (picked === t.word) {
            addPoints(20, t.subj);
            setMsg('¡Has encontrado la palabra ' + t.word + '! (+20 pts)', true);
          } else if (picked.length >= t.word.length) {
            setMsg('La palabra era ' + t.word + '.', false);
          }
        });
      });

      document.getElementById('sopa-reset').addEventListener('click', function () {
        picked = '';
        wordDisp.textContent = '';
        hideMsg();
        canvas.querySelectorAll('[data-sopa]').forEach(function (b) {
          b.disabled = false;
          b.classList.remove('active-green');
        });
      });
      return;
    }

    if (id === 'el_intruso') {
      const groups = [
        { q: '¿Cuál es el intruso entre estos animales?', opts: ['Perro', 'Gato', 'Martillo', 'Conejo'], ans: 2, exp: 'El martillo es una herramienta, no un animal.', subj: 'cmedio' },
        { q: '¿Cuál NO es un día de la semana?', opts: ['Lunes', 'Enero', 'Viernes', 'Domingo'], ans: 1, exp: 'Enero es un mes del año.', subj: 'lengua' },
        { q: '¿Cuál es el intruso entre estos colores?', opts: ['Rojo', 'Azul', 'Silla', 'Verde'], ans: 2, exp: 'Silla es un mueble, no un color.', subj: 'ingles' }
      ];
      const item = groups[(ENGINE.round - 1) % groups.length];
      renderChoiceQuestion(item.q, item.opts, item.ans, item.exp, 15, item.subj);
      return;
    }

    if (id === 'ordena_frase') {
      const sents = [
        { words: ['El', 'sol', 'sale', 'por', 'la', 'mañana.'], subj: 'lengua' },
        { words: ['Nosaltres', 'anem', 'a', 'l'escola.'], subj: 'valencia' },
        { words: ['La', 'Tierra', 'gira', 'alrededor', 'del', 'Sol.'], subj: 'cmedio' }
      ];
      const s = sents[(ENGINE.round - 1) % sents.length];
      const target = s.words.join(' ');
      const scr = shuffle(s.words);
      ENGINE.wordTokens = [];

      const canvas = document.getElementById('g-canvas');
      canvas.innerHTML = [
        '<div style="text-align:center;">',
          '<p style="font-weight:800;color:var(--muted);margin:0 0 10px;">Toca las palabras en el orden correcto:</p>',
          '<div id="ord-box" style="min-height:46px;padding:10px;border-radius:12px;border:2px dashed #cbd5e1;background:#f8fafc;font-weight:900;margin-bottom:12px;"></div>',
          '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px;">',
            scr.map(function (w, i) {
              return '<button type="button" class="mode-btn" data-w="' + i + '" data-val="' + w + '">' + w + '</button>';
            }).join(''),
          '</div>',
          '<div style="display:flex;gap:8px;justify-content:center;">',
            '<button type="button" class="pill-btn" id="ord-clear">Borrar</button>',
            '<button type="button" class="mode-btn active-green" id="ord-check">Comprobar</button>',
          '</div>',
        '</div>'
      ].join('');

      const box = document.getElementById('ord-box');
      const wBtns = Array.from(canvas.querySelectorAll('[data-w]'));
      wBtns.forEach(function (b) {
        b.addEventListener('click', function () {
          if (b.disabled) return;
          b.disabled = true;
          b.style.opacity = '0.45';
          ENGINE.wordTokens.push(b.getAttribute('data-val'));
          box.textContent = ENGINE.wordTokens.join(' ');
        });
      });

      document.getElementById('ord-clear').addEventListener('click', function () {
        ENGINE.wordTokens = [];
        box.textContent = '';
        hideMsg();
        wBtns.forEach(function (b) {
          b.disabled = false;
          b.style.opacity = '1';
        });
      });

      document.getElementById('ord-check').addEventListener('click', function () {
        const attempt = ENGINE.wordTokens.join(' ');
        if (attempt === target) {
          addPoints(15, s.subj);
          setMsg('Frase correcta: "' + target + '" (+15 pts)', true);
        } else {
          setMsg('La frase correcta es: "' + target + '"', false);
        }
      });
      return;
    }

    if (id === 'verdadero_falso') {
      const bank = [
        { q: 'El agua en estado sólido se llama hielo.', ans: true, exp: '¡Sí! Al enfriarse por debajo de 0 °C se vuelve hielo.', subj: 'cmedio' },
        { q: '7 × 8 es igual a 54.', ans: false, exp: '7 × 8 = 56.', subj: 'mates' },
        { q: '"Perro" en inglés se dice "Dog".', ans: true, exp: '¡Correcto! Perro = Dog.', subj: 'ingles' }
      ];
      const item = bank[(ENGINE.round - 1) % bank.length];
      renderChoiceQuestion(item.q, ['Verdadero', 'Falso'], item.ans ? 0 : 1, item.exp, 15, item.subj);
      return;
    }

    if (id === 'completa_hueco') {
      const bank = [
        { q: 'Completa: "I have a red _____" (manzana)', opts: ['apple', 'dog', 'chair', 'sun'], ans: 0, exp: 'Apple significa manzana.', subj: 'ingles' },
        { q: 'Completa: "Avui és _____" (martes)', opts: ['dilluns', 'dimarts', 'divendres', 'diumenge'], ans: 1, exp: 'Martes en valencià es dimarts.', subj: 'valencia' },
        { q: 'Completa la serie: 10, 20, 30, _____, 50', opts: ['35', '40', '45', '60'], ans: 1, exp: 'Va sumando de 10 en 10.', subj: 'mates' }
      ];
      const item = bank[(ENGINE.round - 1) % bank.length];
      renderChoiceQuestion(item.q, item.opts, item.ans, item.exp, 15, item.subj);
      return;
    }

    const rapid = [
      { q: '¿Cuántos lados tiene un hexágono?', opts: ['5', '6', '7', '8'], ans: 1, exp: 'Un hexágono tiene 6 lados.', subj: 'mates' },
      { q: '¿Cuál es el plural de "luz"?', opts: ['luzes', 'luces', 'luses', 'luzs'], ans: 1, exp: 'El plural de luz es luces.', subj: 'lengua' },
      { q: '¿Qué planeta está más cerca del Sol?', opts: ['Marte', 'Mercurio', 'Saturno', 'Urano'], ans: 1, exp: 'Mercurio es el planeta más cercano al Sol.', subj: 'cmedio' }
    ];
    const rItem = rapid[(ENGINE.round - 1) % rapid.length];
    renderChoiceQuestion(rItem.q, rItem.opts, rItem.ans, rItem.exp, 20, rItem.subj);
  }

  window.openEducationalGame = function (gameId) {
    if (gameId) {
      launchGame(gameId);
    } else {
      showGamesMenu();
    }
  };

  window.GAMES_ENGINE = {
    launch: launchGame,
    showMenu: showGamesMenu,
    cleanup: cleanupActiveGame
  };
})();
