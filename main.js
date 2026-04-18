// ============================
// Projects Detailed Data
// ============================
const projectsData = {
  shogi: {
    title: '5×5 将棋ゲーム',
    description: '42Tokyoの最終課題（ft_transcendence）として開発した、リアルタイムオンライン対戦ゲームプラットフォームです。単なるボードゲームではなく、モダンなWeb技術をフル活用したフルスタックアプリケーションです。',
    tags: ['React', 'TypeScript', 'Next.js', 'Three.js', 'WebSocket'],
    features: [
      'WebSocket（Socket.io）によるラグのないリアルタイム対戦',
      'Three.js を用いた 3D ボードと駒のレンダリング・アニメーション',
      '対戦中のリアルタイムチャットとスタンプ送信機能',
      'リロードしてもゲームが中断されない再接続ロジック',
      'OAuth認証によるログイン'
    ],
    github: 'https://github.com/KotaSakatsume/ft_transcendence/tree/dev',
    playUrl: 'https://gogoshogi.duckdns.org/login'
  },
  minishell: {
    title: 'minishell',
    description: 'C言語でbashを一から再構築するプロジェクトです。Unixプロセスの仕組み、システムコール、およびメモリ管理の深い理解を目的としています。',
    tags: ['C', 'Shell', 'Systems Programming'],
    features: [
      '独自のパーサーによるコマンドの構文解析',
      'fork/execve を用いたプロセス実行とパイプ（|）による通信の実装',
      'リダイレクト（<, >, >>, <<）の正確なハンドリング',
      '環境変数の展開と組み込みコマンド（cd, export, unset等）の実装'
    ],
    github: 'https://github.com/KotaSakatsume/minishell'
  },
  irc: {
    title: 'ft_IRC',
    description: 'IRC（Internet Relay Chat）サーバーをC++98でフルスクラッチ開発。RFCに準拠した通信プロトコルを実装し、複数のクライアントが同時に通信できる環境を構築しました。',
    tags: ['C++', 'Network Programming', 'Sockets'],
    features: [
      'poll() または select() を用いたノンブロッキングなI/O多重化',
      'RFC 1459/2812 準拠のメッセージパースとレスポンス生成',
      'チャンネル管理（JOIN, PART）とオペレーター権限（KICK, INVITE等）',
      '複数クライアントの同時接続とメッセージ転送'
    ],
    github: 'https://github.com/KotaSakatsume/ft_IRC'
  },
  cub3d: {
    title: 'cub3D',
    description: 'Wolfenstein 3D のような初期の3Dゲームで使用されていたレイキャスティング技術を再現。2Dマップから疑似3D空間を生成するグラフィックスエンジンです。',
    tags: ['C', 'Raycasting', 'Computer Graphics'],
    features: [
      'DDA（Digital Differential Analyzer）アルゴリズムによる高速な壁検出',
      'テクスチャマッピングによる壁の質感表現',
      '三角関数を用いた視点移動とスムーズなプレイヤー操作',
      'MiniLibX グラフィックライブラリを使用したピクセル単位の描画'
    ],
    github: 'https://github.com/KotaSakatsume/cub3D'
  }
};

// ============================
// Modal Logic
// ============================
const modal = document.getElementById('project-modal');
const modalClose = modal ? modal.querySelector('.modal-close') : null;
const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;

function openModal(projectId) {
  const data = projectsData[projectId];
  if (!data) {
    console.error('Project data not found for:', projectId);
    return;
  }

  const title = document.getElementById('modal-title');
  const desc = document.getElementById('modal-description');
  const tagsContainer = document.getElementById('modal-tags');
  const featuresList = document.getElementById('modal-features');
  const githubLink = document.getElementById('modal-github');
  const playLink = document.getElementById('modal-play');

  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.description;

  if (tagsContainer) {
    tagsContainer.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });
  }

  if (featuresList) {
    featuresList.innerHTML = '';
    data.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });
  }

  if (githubLink) githubLink.href = data.github;

  if (playLink) {
    if (data.playUrl) {
      playLink.href = data.playUrl;
      playLink.style.display = 'inline-flex';
    } else {
      playLink.style.display = 'none';
    }
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 確実に読み込まれた後にイベントを登録
document.addEventListener('DOMContentLoaded', () => {
  // Project cards click
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // GitHubリンク自体がクリックされた場合はモーダルを開かない
      if (e.target.closest('.project-link')) {
        return;
      }

      const projectId = card.getAttribute('data-project-id');
      if (projectId) {
        openModal(projectId);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
});

// Escape key to close
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});

// ============================
// Navbar scroll effect
// ============================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============================
// Mobile menu toggle
// ============================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
    });
  });
}

// ============================
// Scroll reveal for sections
// ============================
const sections = document.querySelectorAll('.section');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// ============================
// Click to Copy Email
// ============================
const contactEmail = document.getElementById('contact-email');

if (contactEmail) {
  contactEmail.addEventListener('click', (e) => {
    e.preventDefault();
    const span = contactEmail.querySelector('span');
    const email = span.textContent;
    const originalText = email;

    if (contactEmail.classList.contains('copied')) return;

    navigator.clipboard.writeText(email).then(() => {
      span.textContent = 'Copied!';
      contactEmail.classList.add('copied');

      setTimeout(() => {
        span.textContent = originalText;
        contactEmail.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  });
}

// ============================
// Smooth scroll for anchor links
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    if (anchor.closest('.modal')) return;
    if (anchor.id === 'contact-email') return;

    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
