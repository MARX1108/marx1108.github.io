function createLinkList(items, className) {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = item.label;
    link.target = item.url.startsWith("http") ? "_blank" : "_self";
    link.rel = item.url.startsWith("http") ? "noreferrer noopener" : "";
    if (className) {
      link.classList.add(className);
    }
    li.append(link);
    fragment.append(li);
  });
  return fragment;
}

function setText(id, text) {
  const node = document.getElementById(id);
  if (node) {
    node.textContent = text;
  }
}

function renderSite(config) {
  const profile = config.profile;

  document.title = `${profile.name} | Portfolio`;
  setText("brand-name", profile.name);
  setText("hero-role", profile.role);
  setText("hero-name", profile.name);
  setText("hero-tagline", profile.tagline);
  setText("email-display", profile.emailDisplay);

  const emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.href = profile.emailLink;
  }

  const portrait = document.getElementById("portrait");
  if (portrait) {
    if (profile.profileImage) {
      portrait.style.backgroundImage = `url("${profile.profileImage}")`;
      portrait.textContent = "";
    } else {
      portrait.textContent = profile.initials || "";
    }
  }

  const nav = document.getElementById("nav-links");
  if (nav) {
    const navFrag = document.createDocumentFragment();
    config.navigation.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${item.id}`;
      a.textContent = item.label;
      li.append(a);
      navFrag.append(li);
    });
    nav.append(navFrag);
  }

  const quickLinks = document.getElementById("quick-links");
  if (quickLinks) {
    quickLinks.append(createLinkList(config.quickLinks));
  }

  const about = document.getElementById("about-content");
  if (about) {
    const aboutFrag = document.createDocumentFragment();
    config.about.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      aboutFrag.append(p);
    });
    about.append(aboutFrag);
  }

  const research = document.getElementById("research-list");
  if (research) {
    const researchFrag = document.createDocumentFragment();
    config.research.forEach((item) => {
      const li = document.createElement("li");

      const title = document.createElement("div");
      title.className = "pub-title";
      title.textContent = item.title;

      const meta = document.createElement("div");
      meta.className = "pub-meta";
      meta.textContent = `${item.authors} • ${item.venue} ${item.year ? `(${item.year})` : ""}`;

      const summary = document.createElement("p");
      summary.textContent = item.summary || "";

      li.append(title, meta, summary);

      if (item.links && item.links.length > 0) {
        const links = document.createElement("div");
        links.className = "pub-links";
        item.links.forEach((linkItem) => {
          const a = document.createElement("a");
          a.href = linkItem.url;
          a.textContent = linkItem.label;
          a.target = linkItem.url.startsWith("http") ? "_blank" : "_self";
          a.rel = linkItem.url.startsWith("http") ? "noreferrer noopener" : "";
          links.append(a);
        });
        li.append(links);
      }

      researchFrag.append(li);
    });
    research.append(researchFrag);
  }

  const news = document.getElementById("news-list");
  if (news) {
    const newsFrag = document.createDocumentFragment();
    config.news.forEach((item) => {
      const li = document.createElement("li");
      const date = document.createElement("div");
      date.className = "news-date";
      date.textContent = item.date;
      const text = document.createElement("div");
      text.textContent = item.text;
      li.append(date, text);
      newsFrag.append(li);
    });
    news.append(newsFrag);
  }

  const service = document.getElementById("service-list");
  if (service) {
    const serviceFrag = document.createDocumentFragment();
    config.service.forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = entry;
      serviceFrag.append(li);
    });
    service.append(serviceFrag);
  }

  const contact = document.getElementById("contact-links");
  if (contact) {
    contact.append(createLinkList(config.contact.links));
  }
  setText("contact-note", config.contact.note);

  const year = new Date().getFullYear();
  setText("footer-text", `© ${year} ${profile.name}. ${profile.footerNote}`);
}

function enableRevealAnimation() {
  const nodes = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -5% 0px",
    },
  );

  nodes.forEach((node, index) => {
    node.style.transitionDelay = `${index * 45}ms`;
    observer.observe(node);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const config = window.SITE_CONFIG;
  if (!config) {
    return;
  }
  renderSite(config);
  enableRevealAnimation();
});
