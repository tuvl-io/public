/* tuvl portal — 2026 */
(() => {
  "use strict";

  // ── Insight portal tab switcher ──────────────────────────────
  const INSIGHT_CAPTIONS = {
    "workflows": "Edit any workflow YAML in the browser. Visual graph, live versioning, hot reload — no IDE required.",
    "models": "ModelDefinition files auto-generate PostgreSQL tables, Pydantic schemas, and full CRUD REST routes at startup.",
    "datasources": "PostgreSQL connection configs with ${ENV_VAR:default} substitution. Health-checked on startup.",
    "ai-models": "One YAML config per LLM. LiteLLM under the hood — Ollama, OpenAI, Anthropic, Gemini, Groq, all 100+ providers.",
    "embeddings": "EmbeddingModel definitions for vector search. Supports Ollama, OpenAI, Cohere, and any LiteLLM embedding provider.",
    "collections": "Named pgvector tables with configurable dimensions and distance metrics. Powers the auto-registered rag_search node.",
    "iam": "Users, roles, and resource:action scopes — backed by Biscuit Ed25519 tokens. Bootstrap the first superadmin in one curl.",
    "federation": "OAuth2 / OIDC social login. Google, GitHub, Microsoft, or any OIDC-compliant provider — managed entirely from the portal.",
    "api-docs": "Live Swagger UI for every auto-generated CRUD route, workflow execution endpoint, and auth route. Try requests from the browser.",
    "spectrum": "Trigger workflows with custom JSON. Watch nodes glow as they execute. Click any node for input, output, duration, and stack trace.",
    "settings": "Redis for multi-worker state. OpenTelemetry for tracing. LLM Judge for tuvl test — all configured from YAML or this UI.",
  };

  const tabs = document.querySelectorAll(".i-tab");
  const img = document.getElementById("insight-img");
  const caption = document.getElementById("insight-caption");
  const urlPath = document.getElementById("insight-path");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const shot = tab.dataset.shot;
      const path = tab.dataset.path;
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      if (img) {
        img.style.opacity = "0.3";
        const next = new Image();
        next.onload = () => {
          img.src = next.src;
          img.style.opacity = "1";
        };
        next.src = `assets/insight/insight-${shot}.png`;
      }
      if (caption) caption.textContent = INSIGHT_CAPTIONS[shot] || "";
      if (urlPath) urlPath.textContent = path;
    });
  });

  // ── Workflow agentic/functional switcher ─────────────────────
  const wfBtns = document.querySelectorAll(".wf-btn");
  const wfPanes = document.querySelectorAll(".wf-pane");
  wfBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.wf;
      wfBtns.forEach((b) => b.classList.remove("active"));
      wfPanes.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.querySelector(`.wf-pane[data-pane="${target}"]`)?.classList.add("active");
    });
  });

  // ── Card glow follow-cursor ──────────────────────────────────
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });

  // ── Scroll reveal ────────────────────────────────────────────
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -50px 0px", threshold: 0.05 }
    );
    document.querySelectorAll(".card, .step, .aud-card, .i-cell").forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 35, 240)}ms`;
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".card, .step, .aud-card, .i-cell").forEach((el) => el.classList.add("reveal"));
  }
})();

// ── Early-access form (Formspree) ──────────────────────────────
async function handleSignup(ev) {
  ev.preventDefault();
  const form = ev.target;
  const formId = form.querySelector('input[name="_formspree_id"]')?.value;
  const btn = document.getElementById("earlyBtn");
  const success = document.getElementById("earlySuccess");
  const email = form.querySelector('input[name="email"]').value;

  if (!formId) {
    console.warn("No Formspree form ID configured");
    return;
  }

  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = "Sending…";

  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "tuvl-portal-early-access" }),
    });
    if (res.ok) {
      form.style.display = "none";
      if (success) success.hidden = false;
      if (window.gtag) gtag("event", "early_access_signup", { method: "formspree" });
    } else {
      throw new Error("Submission failed");
    }
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = original;
    alert("Something went wrong. Please try again or email developer@tuvl.io directly.");
  }
}
