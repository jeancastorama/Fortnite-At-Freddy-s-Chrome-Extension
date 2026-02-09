const motRemplacer = "Fortnite";
const regex = /\bfive\s+night(?:'s)?s?\b/gi;

function processTextNode(node) {
  if (!node || node.nodeType !== Node.TEXT_NODE) return;

  const txt = node.textContent;
  if (!txt) return;

  if (txt.match(regex)) {
    node.textContent = txt.replace(regex, motRemplacer);
  }
}

function walkAndReplace(root) {
  if (!root) return;

  if (root.nodeType === Node.TEXT_NODE) {
    processTextNode(root);
    return;
  }

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let current;
  while ((current = walker.nextNode())) {
    processTextNode(current);
  }
}

function runReplacement() {
  walkAndReplace(document.body);
  walkAndReplace(document.head);
}

runReplacement();

const observer = new MutationObserver((mutations) => {
  for (const m of mutations) {
    if (m.type === "characterData") {
      processTextNode(m.target);
    }

    if (m.type === "childList") {
      m.addedNodes.forEach((n) => {
        walkAndReplace(n);
      });
    }
  }
});

observer.observe(document.documentElement, {
  subtree: true,
  childList: true,
  characterData: true
});

