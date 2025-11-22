// data-driven notes tree. Edit to add/remove nodes.
// Replace the href links with your Obsidian Publish or GitHub links.
const notes = [
  {
    name: 'PostgreSQL',
    children: [
      { title: 'Replication Concepts', href: 'https://github.com/mdsuhail-3257/notes/blob/main/PostgreSQL/Replication.md' },
      { title: 'Query Tuning Basics', href: 'https://github.com/mdsuhail-3257/notes/blob/main/PostgreSQL/QueryTuning.md' },
      { title: 'VACUUM & Analyze', href: 'https://github.com/mdsuhail-3257/notes/blob/main/PostgreSQL/Vacuum.md' }
    ]
  },
  {
    name: 'AWS',
    children: [
      { title: 'EC2 Basics', href: 'https://github.com/mdsuhail-3257/notes/blob/main/AWS/EC2.md' },
      { title: 'RDS & Aurora Notes', href: 'https://github.com/mdsuhail-3257/notes/blob/main/AWS/RDS_Aurora.md' }
    ]
  },
  {
    name: 'Career',
    children: [
      { title: 'Resume Framework', href: 'https://github.com/mdsuhail-3257/notes/blob/main/Career/Resume.md' }
    ]
  }
];

const root = document.getElementById('tree-root');

function makeSVG(icon = 'folder') {
  if (icon === 'folder') {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h4l2 3h10v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"></path></svg>`;
  }
  return '';
}

function createFolder(node) {
  const folder = document.createElement('div');
  folder.className = 'folder';

  const title = document.createElement('div');
  title.className = 'folder-title';
  title.innerHTML = `${makeSVG('folder')}<strong style="font-weight:700">${node.name}</strong>`;
  folder.appendChild(title);

  const children = document.createElement('div');
  children.className = 'children';
  node.children.forEach(ch => {
    const a = document.createElement('a');
    a.className = 'note';
    a.href = ch.href;
    a.target = '_blank';
    a.rel = 'noreferrer';
    a.textContent = ch.title;
    children.appendChild(a);
  });
  folder.appendChild(children);

  // Initially collapse
  children.style.display = 'none';

  title.addEventListener('click', () => {
    const isHidden = children.style.display === 'none';
    children.style.display = isHidden ? 'block' : 'none';
    // rotate icon for fun
    const svg = title.querySelector('svg');
    if (svg) svg.style.transform = isHidden ? 'rotate(20deg)' : 'rotate(0deg)';
  });

  return folder;
}

// render tree
notes.forEach(n => {
  const f = createFolder(n);
  root.appendChild(f);
});

// small avatar mousemove tilt effect
const avatarWrap = document.getElementById('avatarWrap');
const avatarImg = document.getElementById('avatarImg');
if (avatarWrap) {
  avatarWrap.addEventListener('mousemove', (e) => {
    const rect = avatarWrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    avatarWrap.style.transform = `perspective(800px) rotateY(${x/20}deg) rotateX(${ -y/20 }deg) translateY(-6px)`;
    avatarImg.style.transform = `translateZ(20px) scale(1.02)`;
  });
  avatarWrap.addEventListener('mouseleave', () => {
    avatarWrap.style.transform = '';
    avatarImg.style.transform = '';
  });
}
