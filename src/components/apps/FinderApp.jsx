import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  ExternalLink,
  FileText,
  Folder,
  GitBranch,
  HardDrive,
  LayoutGrid,
  List,
  RefreshCw,
  Search,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { desktopAssets } from "../../assets/appAssets.js";
import { projects } from "../../data/projects.js";

const ORDERED_PROJECT_NAMES = [
  "KrishiMitra",
  "SmartGov Bot",
  "Academic MCQ Website",
  "BreatheNow",
  "DeReFund",
  "Shopify Theme Work",
  "EvilEverest OS",
  "Mini Projects",
];

const REQUIRED_PLACEHOLDERS = [
  {
    id: "breathe-now",
    name: "BreatheNow",
    category: "Health / Wellness Project",
    description: "A wellness-focused digital project concept.",
    techStack: ["React", "JavaScript"],
    status: "Project details to be expanded",
    githubOwner: "bidur7745",
    githubRepo: "",
    githubUrl: "",
  },
  {
    id: "derefund",
    name: "DeReFund",
    category: "Blockchain / Transparency Concept",
    description: "A concept around transparent digital funding.",
    techStack: ["React", "Node.js"],
    status: "Prototype / In development",
    githubOwner: "bidur7745",
    githubRepo: "",
    githubUrl: "",
  },
  {
    id: "shopify-theme-work",
    name: "Shopify Theme Work",
    category: "Freelance / Commerce Work",
    description: "Custom Shopify theme development and storefront work.",
    techStack: ["Shopify Liquid", "JavaScript"],
    status: "Ongoing",
    githubOwner: "bidur7745",
    githubRepo: "",
    githubUrl: "",
  },
  {
    id: "evileverest-os",
    name: "EvilEverest OS",
    category: "Portfolio Project",
    description: "macOS-inspired portfolio operating-system experience.",
    techStack: ["React", "Vite"],
    status: "In development",
    githubOwner: "bidur7745",
    githubRepo: "",
    githubUrl: "",
  },
  {
    id: "mini-projects",
    name: "Mini Projects",
    category: "Practice Collection",
    description: "Small focused builds for learning and rapid practice.",
    techStack: ["React", "JavaScript"],
    status: "In progress",
    githubOwner: "bidur7745",
    githubRepo: "",
    githubUrl: "",
  },
];

const SIDEBAR_FAVORITES = [
  { id: "projects", label: "Projects", icon: Folder },
  { id: "github", label: "GitHub Repos", icon: FaGithub, reactIcon: true },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "recents", label: "Recents", icon: Clock3 },
];

const SIDEBAR_LOCATIONS = [
  { id: "evilos", label: "EvilEverest OS", icon: HardDrive },
  { id: "nepal", label: "Nepal Workspace", icon: HardDrive },
  { id: "github-profile", label: "bidur7745 GitHub", icon: GitBranch },
];

const TAGS = [
  { id: "important", label: "Important", color: "#a855f7" },
  { id: "in-progress", label: "In Progress", color: "#3b82f6" },
  { id: "completed", label: "Completed", color: "#22c55e" },
];

const SECTION_LABELS = {
  projects: "Projects",
  github: "GitHub Repos",
  resume: "Resume",
  downloads: "Downloads",
  recents: "Recents",
};

const INITIAL_LOCATION = {
  section: "projects",
  projectId: null,
  path: "",
};

function normalizeProject(project) {
  const githubOwner = project.githubOwner || "bidur7745";
  const githubRepo = project.githubRepo || "";
  const githubUrl = project.githubUrl || (githubRepo ? `https://github.com/${githubOwner}/${githubRepo}` : "");

  return {
    ...project,
    category: project.category || project.type || "Project",
    type: project.type || project.category || "Project",
    status: project.status || "In development",
    techStack: Array.isArray(project.techStack) ? project.techStack : [],
    githubOwner,
    githubRepo,
    githubUrl,
  };
}

function buildFinderProjects() {
  const normalized = projects.map(normalizeProject);
  const merged = [...normalized];

  REQUIRED_PLACEHOLDERS.forEach((placeholder) => {
    if (!merged.some((project) => project.name === placeholder.name)) {
      merged.push(normalizeProject(placeholder));
    }
  });

  const ordered = ORDERED_PROJECT_NAMES
    .map((name) => merged.find((project) => project.name === name))
    .filter(Boolean);

  const extra = merged.filter((project) => !ORDERED_PROJECT_NAMES.includes(project.name));

  return [...ordered, ...extra];
}

function isSameLocation(left, right) {
  return left.section === right.section && left.projectId === right.projectId && left.path === right.path;
}

function getFileExtension(name) {
  const index = name.lastIndexOf(".");

  if (index <= 0 || index === name.length - 1) {
    return "";
  }

  return name.slice(index + 1);
}

function formatBytes(bytes) {
  if (typeof bytes !== "number") {
    return "--";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const precision = value >= 10 ? 0 : 1;
  return `${value.toFixed(precision)} ${units[unitIndex]}`;
}

function sortRepoItems(items) {
  return [...items].sort((left, right) => {
    if (left.type !== right.type) {
      return left.type === "dir" ? -1 : 1;
    }

    return left.name.localeCompare(right.name);
  });
}

function matchesTag(project, tagId) {
  const source = `${project.name} ${project.category} ${project.description} ${project.status}`.toLowerCase();

  if (tagId === "important") {
    return /final year|portfolio|hackathon|important|major/.test(source);
  }

  if (tagId === "in-progress") {
    return /in development|in progress|ongoing|prototype/.test(source);
  }

  if (tagId === "completed") {
    return /completed|done|shipped/.test(source);
  }

  return true;
}

function FolderGlyph({ size = 58 }) {
  const width = size;
  const height = Math.round(size * 0.76);

  return (
    <span style={{ ...styles.folderGlyph, width: `${width}px`, height: `${height}px` }} aria-hidden="true">
      <span
        style={{
          ...styles.folderGlyphTab,
          width: `${Math.round(width * 0.45)}px`,
          height: `${Math.round(height * 0.3)}px`,
        }}
      />
      <span style={{ ...styles.folderGlyphBody, top: `${Math.round(height * 0.18)}px` }} />
    </span>
  );
}

function FileGlyph({ extension, size = 54, variant = "icon" }) {
  const badge = extension ? extension.slice(0, 4).toUpperCase() : "FILE";
  const isList = variant === "list";
  const width = Math.round(size * (isList ? 0.66 : 0.72));

  return (
    <span
      style={{
        ...styles.fileGlyph,
        ...(isList ? styles.fileGlyphList : null),
        width: `${width}px`,
        height: `${size}px`,
      }}
      aria-hidden="true"
    >
      <span style={styles.fileGlyphFold} />
      {!isList && <span style={styles.fileGlyphBadge}>{badge}</span>}
    </span>
  );
}

function SidebarIcon({ Icon, reactIcon = false }) {
  if (reactIcon) {
    return <Icon size={14} />;
  }

  return <Icon size={15} strokeWidth={1.85} />;
}

function EmptyState({ title, description }) {
  return (
    <div style={styles.emptyState}>
      <p style={styles.emptyStateTitle}>{title}</p>
      <p style={styles.emptyStateText}>{description}</p>
    </div>
  );
}

export default function FinderApp() {
  const finderProjects = useMemo(() => buildFinderProjects(), []);
  const [navigation, setNavigation] = useState({ entries: [INITIAL_LOCATION], index: 0 });
  const [viewMode, setViewMode] = useState("icon");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [repoItems, setRepoItems] = useState([]);
  const [repoCache, setRepoCache] = useState({});
  const [repoState, setRepoState] = useState({ loading: false, errorType: "", message: "" });
  const [viewportWidth, setViewportWidth] = useState(() => {
    if (typeof window === "undefined") {
      return 1280;
    }

    return window.innerWidth;
  });

  const location = navigation.entries[navigation.index];
  const selectedProject =
    finderProjects.find((project) => project.id === location.projectId) || null;
  const inRepoSection = location.section === "projects" || location.section === "github";
  const showingProjectGrid = inRepoSection && !selectedProject;
  const showingRepository = inRepoSection && Boolean(selectedProject);

  const breadcrumb = useMemo(() => {
    const rootLabel = location.section === "github" ? "GitHub Repos" : "Projects";
    const parts = [{ label: rootLabel, path: "", level: 0 }];

    if (!selectedProject) {
      return parts;
    }

    parts.push({ label: selectedProject.name, path: "", level: 1 });

    if (location.path) {
      let acc = "";
      location.path.split("/").forEach((segment, index) => {
        acc = acc ? `${acc}/${segment}` : segment;
        parts.push({ label: segment, path: acc, level: index + 2 });
      });
    }

    return parts;
  }, [location.path, location.section, selectedProject]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return finderProjects.filter((project) => {
      if (location.section === "github" && !project.githubRepo) {
        return false;
      }

      const source = `${project.name} ${project.category} ${project.status} ${project.techStack.join(" ")}`.toLowerCase();
      const queryPass = !query || source.includes(query);
      const tagPass = !activeTag || matchesTag(project, activeTag);

      return queryPass && tagPass;
    });
  }, [activeTag, finderProjects, location.section, searchQuery]);

  const filteredRepoItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return repoItems;
    }

    return repoItems.filter((item) => item.name.toLowerCase().includes(query));
  }, [repoItems, searchQuery]);

  const canGoBack = navigation.index > 0;
  const canGoForward = navigation.index < navigation.entries.length - 1;
  const canRefresh = Boolean(selectedProject?.githubOwner && selectedProject?.githubRepo);
  const showSidebar = viewportWidth >= 760;
  const showInfoPanel = viewportWidth >= 1040;
  const compactListIcons = viewportWidth < 940;
  const listProjectFolderSize = compactListIcons ? 26 : 30;
  const listFolderSize = compactListIcons ? 24 : 28;
  const listFileSize = compactListIcons ? 26 : 32;

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!showingRepository || !selectedProject) {
      setRepoItems([]);
      setRepoState({ loading: false, errorType: "", message: "" });
      return;
    }

    if (!selectedProject.githubOwner || !selectedProject.githubRepo) {
      setRepoItems([]);
      setRepoState({
        loading: false,
        errorType: "not-connected",
        message: "GitHub repo not connected yet.",
      });
      return;
    }

    const cacheKey = `${selectedProject.id}:${location.path || "/"}`;

    if (repoCache[cacheKey]) {
      setRepoItems(repoCache[cacheKey]);
      setRepoState({ loading: false, errorType: "", message: "" });
      return;
    }

    const controller = new AbortController();
    const pathSegment = location.path
      ? `/${location.path.split("/").map((part) => encodeURIComponent(part)).join("/")}`
      : "";
    const endpoint = `https://api.github.com/repos/${selectedProject.githubOwner}/${selectedProject.githubRepo}/contents${pathSegment}`;

    setRepoState({ loading: true, errorType: "", message: "" });

    fetch(endpoint, {
      signal: controller.signal,
      headers: {
        Accept: "application/vnd.github+json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const isRateLimited =
            response.status === 403 && response.headers.get("x-ratelimit-remaining") === "0";

          if (isRateLimited) {
            throw new Error("rate-limit");
          }

          if (response.status === 404) {
            throw new Error("unavailable");
          }

          throw new Error("unavailable");
        }

        return response.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        const sorted = sortRepoItems(list);

        setRepoCache((current) => ({
          ...current,
          [cacheKey]: sorted,
        }));
        setRepoItems(sorted);
        setRepoState({ loading: false, errorType: "", message: "" });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }

        if (error.message === "rate-limit") {
          setRepoItems([]);
          setRepoState({
            loading: false,
            errorType: "rate-limit",
            message: "GitHub API rate limit reached. Try again later or open the repository directly.",
          });
          return;
        }

        setRepoItems([]);
        setRepoState({
          loading: false,
          errorType: "unavailable",
          message: "Repository unavailable, private, or not connected yet.",
        });
      });

    return () => {
      controller.abort();
    };
  }, [location.path, repoCache, selectedProject, showingRepository]);

  function pushLocation(nextLocation) {
    setNavigation((current) => {
      const currentLocation = current.entries[current.index];

      if (isSameLocation(currentLocation, nextLocation)) {
        return current;
      }

      const trimmed = current.entries.slice(0, current.index + 1);
      const entries = [...trimmed, nextLocation];

      return {
        entries,
        index: entries.length - 1,
      };
    });
  }

  function goHistory(direction) {
    setNavigation((current) => {
      const index = current.index + direction;

      if (index < 0 || index >= current.entries.length) {
        return current;
      }

      return {
        ...current,
        index,
      };
    });
  }

  function handleSidebarSectionSelect(sectionId) {
    pushLocation({
      section: sectionId,
      projectId: null,
      path: "",
    });
    setSelectedItem(null);

    if (sectionId !== "projects" && sectionId !== "github") {
      setActiveTag(null);
    }
  }

  function handleLocationSelect(locationId) {
    if (locationId === "github-profile") {
      window.open("https://github.com/bidur7745", "_blank", "noopener,noreferrer");
      return;
    }

    pushLocation({
      section: "projects",
      projectId: null,
      path: "",
    });
  }

  function openProject(project) {
    pushLocation({
      section: location.section === "github" ? "github" : "projects",
      projectId: project.id,
      path: "",
    });
    setSelectedItem({ kind: "project", payload: project });
  }

  function handleBreadcrumbClick(crumb) {
    if (!selectedProject) {
      pushLocation({ section: location.section, projectId: null, path: "" });
      return;
    }

    if (crumb.level === 0) {
      pushLocation({ section: location.section, projectId: null, path: "" });
      return;
    }

    if (crumb.level === 1) {
      pushLocation({ section: location.section, projectId: selectedProject.id, path: "" });
      return;
    }

    pushLocation({
      section: location.section,
      projectId: selectedProject.id,
      path: crumb.path,
    });
  }

  function refreshRepo() {
    if (!selectedProject) {
      return;
    }

    const cacheKey = `${selectedProject.id}:${location.path || "/"}`;

    setRepoCache((current) => {
      const next = { ...current };
      delete next[cacheKey];
      return next;
    });
  }

  function handleRepoItemClick(item) {
    setSelectedItem({ kind: "repo-item", payload: item });

    if (item.type === "dir") {
      pushLocation({
        section: location.section,
        projectId: selectedProject.id,
        path: item.path,
      });
      return;
    }

    if (item.html_url) {
      window.open(item.html_url, "_blank", "noopener,noreferrer");
    }
  }

  function renderProjectContent() {
    if (viewMode === "list") {
      return (
        <div style={styles.listWrap}>
          <div style={styles.listHead}>
            <span>Name</span>
            <span>Category</span>
            <span>Status</span>
            <span>GitHub</span>
          </div>
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              style={styles.listRow}
              onClick={() => openProject(project)}
              onFocus={() => setSelectedItem({ kind: "project", payload: project })}
            >
              <span style={styles.listNameCell}>
                <FolderGlyph size={listProjectFolderSize} />
                <span style={styles.listNameText}>{project.name}</span>
              </span>
              <span style={styles.listCellMuted}>{project.category}</span>
              <span style={styles.listCellMuted}>{project.status}</span>
              <span style={styles.listCellMuted}>{project.githubRepo || "Not connected"}</span>
            </button>
          ))}
        </div>
      );
    }

    return (
      <div style={styles.iconGrid}>
        {filteredProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            style={styles.iconItem}
            onClick={() => openProject(project)}
            onFocus={() => setSelectedItem({ kind: "project", payload: project })}
          >
            <FolderGlyph />
            <p style={styles.iconName}>{project.name}</p>
            <p style={styles.iconMeta}>{project.category}</p>
          </button>
        ))}
      </div>
    );
  }

  function renderRepoContent() {
    if (repoState.loading) {
      return (
        <EmptyState
          title="Loading repository files..."
          description="Finder is fetching public repository contents from GitHub."
        />
      );
    }

    if (repoState.errorType) {
      return <EmptyState title={repoState.message} description="You can still open the repository directly from the preview panel." />;
    }

    if (!filteredRepoItems.length) {
      return <EmptyState title="No files found." description="This path has no visible files or folders." />;
    }

    if (viewMode === "list") {
      return (
        <div style={styles.listWrap}>
          <div style={styles.listHead}>
            <span>Name</span>
            <span>Type</span>
            <span>Size</span>
            <span>Path</span>
          </div>
          {filteredRepoItems.map((item) => {
            const isFolder = item.type === "dir";
            const extension = getFileExtension(item.name);

            return (
              <button
                key={item.path}
                type="button"
                style={styles.listRow}
                onClick={() => handleRepoItemClick(item)}
                onFocus={() => setSelectedItem({ kind: "repo-item", payload: item })}
              >
                <span style={styles.listNameCell}>
                  {isFolder ? <FolderGlyph size={listFolderSize} /> : <FileGlyph extension={extension} size={listFileSize} variant="list" />}
                  <span style={styles.listNameText}>{item.name}</span>
                </span>
                <span style={styles.listCellMuted}>{isFolder ? "Folder" : extension || "File"}</span>
                <span style={styles.listCellMuted}>{isFolder ? "--" : formatBytes(item.size)}</span>
                <span style={styles.listCellMuted}>{item.path}</span>
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <div style={styles.iconGrid}>
        {filteredRepoItems.map((item) => {
          const isFolder = item.type === "dir";
          const extension = getFileExtension(item.name);

          return (
            <button
              key={item.path}
              type="button"
              style={styles.iconItem}
              onClick={() => handleRepoItemClick(item)}
              onFocus={() => setSelectedItem({ kind: "repo-item", payload: item })}
            >
              {isFolder ? <FolderGlyph /> : <FileGlyph extension={extension} />}
              <p style={styles.iconName}>{item.name}</p>
              <p style={styles.iconMeta}>
                {isFolder ? "Folder" : `${extension || "File"} • ${formatBytes(item.size)}`}
              </p>
            </button>
          );
        })}
      </div>
    );
  }

  function renderSpecialSection() {
    if (location.section === "resume") {
      return (
        <div style={styles.iconGrid}>
          <button
            type="button"
            style={styles.iconItem}
            onClick={() => window.open(desktopAssets.resumePdf, "_blank", "noopener,noreferrer")}
            onFocus={() =>
              setSelectedItem({
                kind: "resume-file",
                payload: {
                  name: "Bidur Siwakoti Resume.pdf",
                  type: "file",
                  path: "Documents/Bidur Siwakoti Resume.pdf",
                  size: null,
                  html_url: desktopAssets.resumePdf,
                },
              })
            }
          >
            <FileGlyph extension="pdf" />
            <p style={styles.iconName}>Bidur Siwakoti Resume.pdf</p>
            <p style={styles.iconMeta}>PDF Document</p>
          </button>
        </div>
      );
    }

    if (location.section === "downloads") {
      return <EmptyState title="Downloads is empty." description="No downloaded files are tracked in this portfolio build yet." />;
    }

    if (location.section === "recents") {
      return <EmptyState title="No recent items." description="Open project folders to populate your recent activity." />;
    }

    return null;
  }

  function renderMainContent() {
    if (showingProjectGrid) {
      if (!filteredProjects.length) {
        return <EmptyState title="No matching projects." description="Try a different search or clear active tag filters." />;
      }

      return renderProjectContent();
    }

    if (showingRepository) {
      return renderRepoContent();
    }

    return renderSpecialSection();
  }

  function renderPreviewPanel() {
    if (!selectedProject && showingProjectGrid) {
      return (
        <div style={styles.previewCard}>
          <FolderGlyph size={72} />
          <h3 style={styles.previewTitle}>Projects</h3>
          <p style={styles.previewType}>Folder</p>
          <p style={styles.previewText}>All portfolio projects and repositories</p>
          <p style={styles.previewCount}>{finderProjects.length} items</p>
        </div>
      );
    }

    if ((selectedItem?.kind === "repo-item" || selectedItem?.kind === "resume-file") && selectedItem.payload) {
      const item = selectedItem.payload;
      const isFolder = item.type === "dir";

      return (
        <div style={styles.previewCard}>
          {isFolder ? <FolderGlyph size={72} /> : <FileGlyph extension={getFileExtension(item.name)} size={72} />}
          <h3 style={styles.previewTitle}>{item.name}</h3>
          <p style={styles.previewType}>{isFolder ? "Folder" : "File"}</p>
          <div style={styles.previewInfoList}>
            <p style={styles.previewInfoRow}><span>Path</span><span>{item.path}</span></p>
            <p style={styles.previewInfoRow}><span>Size</span><span>{isFolder ? "--" : formatBytes(item.size)}</span></p>
          </div>
          {item.html_url ? (
            <button
              type="button"
              style={styles.previewButton}
              onClick={() => window.open(item.html_url, "_blank", "noopener,noreferrer")}
            >
              <span>Open on GitHub</span>
              <ExternalLink size={14} strokeWidth={2} />
            </button>
          ) : null}
        </div>
      );
    }

    if (selectedProject) {
      const hasRepo = Boolean(selectedProject.githubOwner && selectedProject.githubRepo);
      const githubUrl =
        selectedProject.githubUrl ||
        (hasRepo ? `https://github.com/${selectedProject.githubOwner}/${selectedProject.githubRepo}` : "");

      return (
        <div style={styles.previewCard}>
          <FolderGlyph size={72} />
          <h3 style={styles.previewTitle}>{selectedProject.name}</h3>
          <p style={styles.previewType}>{selectedProject.category}</p>
          <p style={styles.previewText}>{selectedProject.description}</p>

          <div style={styles.previewBadgeWrap}>
            {selectedProject.techStack.slice(0, 5).map((tech) => (
              <span key={tech} style={styles.previewBadge}>{tech}</span>
            ))}
          </div>

          <div style={styles.previewInfoList}>
            <p style={styles.previewInfoRow}><span>Status</span><span>{selectedProject.status}</span></p>
            <p style={styles.previewInfoRow}><span>Owner</span><span>{selectedProject.githubOwner || "bidur7745"}</span></p>
            <p style={styles.previewInfoRow}><span>Repo</span><span>{selectedProject.githubRepo || "Not connected"}</span></p>
          </div>

          <button
            type="button"
            style={{
              ...styles.previewButton,
              ...(hasRepo ? null : styles.previewButtonDisabled),
            }}
            onClick={() => {
              if (hasRepo && githubUrl) {
                window.open(githubUrl, "_blank", "noopener,noreferrer");
              }
            }}
            disabled={!hasRepo}
          >
            <span>Open on GitHub</span>
            <ExternalLink size={14} strokeWidth={2} />
          </button>
        </div>
      );
    }

    return null;
  }

  const heading = selectedProject
    ? location.path.split("/").filter(Boolean).pop() || selectedProject.name
    : SECTION_LABELS[location.section] || "Finder";

  const statusCount = showingProjectGrid
    ? filteredProjects.length
    : showingRepository
      ? filteredRepoItems.length
      : location.section === "resume"
        ? 1
        : 0;

  const statusText = repoState.loading
    ? "Loading repository files..."
    : repoState.message || `${statusCount} items`;

  return (
    <div style={styles.page}>
      <section style={styles.finderSurface}>
        <header style={styles.toolbar}>
          <div style={styles.toolbarLeft}>
            <button
              type="button"
              style={{ ...styles.circleButton, ...(canGoBack ? null : styles.disabledButton) }}
              onClick={() => goHistory(-1)}
              disabled={!canGoBack}
              aria-label="Go back"
            >
              <ChevronLeft size={15} strokeWidth={2.2} />
            </button>
            <button
              type="button"
              style={{ ...styles.circleButton, ...(canGoForward ? null : styles.disabledButton) }}
              onClick={() => goHistory(1)}
              disabled={!canGoForward}
              aria-label="Go forward"
            >
              <ChevronRight size={15} strokeWidth={2.2} />
            </button>

            <div style={styles.viewModeGroup}>
              <button
                type="button"
                style={{ ...styles.modeButton, ...(viewMode === "icon" ? styles.modeButtonActive : null) }}
                onClick={() => setViewMode("icon")}
                aria-label="Icon view"
              >
                <LayoutGrid size={14} strokeWidth={2} />
              </button>
              <button
                type="button"
                style={{ ...styles.modeButton, ...(viewMode === "list" ? styles.modeButtonActive : null) }}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div style={styles.toolbarCenter}>
            <h2 style={styles.heading}>{heading}</h2>
            <div style={styles.breadcrumb}>
              {breadcrumb.map((crumb, index) => (
                <button
                  key={`${crumb.label}-${crumb.path || "root"}`}
                  type="button"
                  style={{
                    ...styles.breadcrumbButton,
                    ...(index === breadcrumb.length - 1 ? styles.breadcrumbButtonCurrent : null),
                  }}
                  onClick={() => handleBreadcrumbClick(crumb)}
                >
                  <span>{crumb.label}</span>
                  {index < breadcrumb.length - 1 ? <span style={styles.breadcrumbSlash}>/</span> : null}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.toolbarRight}>
            <button
              type="button"
              style={{ ...styles.iconActionButton, ...(canRefresh ? null : styles.disabledButton) }}
              onClick={refreshRepo}
              disabled={!canRefresh}
              aria-label="Refresh"
            >
              <RefreshCw size={14} strokeWidth={2} />
            </button>
            <label style={styles.searchWrap}>
              <Search size={13} strokeWidth={2} />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search"
                style={styles.searchInput}
              />
            </label>
          </div>
        </header>

        {!showSidebar ? (
          <div style={styles.mobileSectionRow}>
            {SIDEBAR_FAVORITES.map((item) => {
              const isActive = location.section === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  style={{ ...styles.mobileSectionButton, ...(isActive ? styles.mobileSectionButtonActive : null) }}
                  onClick={() => handleSidebarSectionSelect(item.id)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        ) : null}

        <div
          style={{
            ...styles.explorerBody,
            gridTemplateColumns: showSidebar
              ? showInfoPanel
                ? "210px minmax(0, 1fr) 280px"
                : "210px minmax(0, 1fr)"
              : showInfoPanel
                ? "minmax(0, 1fr) 280px"
                : "minmax(0, 1fr)",
          }}
        >
          {showSidebar ? (
            <aside style={styles.sidebar}>
              <div style={styles.sidebarGroup}>
                <p style={styles.sidebarHeading}>Favorites</p>
                <div style={styles.sidebarList}>
                  {SIDEBAR_FAVORITES.map((item) => {
                    const isActive = location.section === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        style={{ ...styles.sidebarButton, ...(isActive ? styles.sidebarButtonActive : null) }}
                        onClick={() => handleSidebarSectionSelect(item.id)}
                      >
                        <span style={styles.sidebarIcon}><SidebarIcon Icon={item.icon} reactIcon={item.reactIcon} /></span>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={styles.sidebarGroup}>
                <p style={styles.sidebarHeading}>Locations</p>
                <div style={styles.sidebarList}>
                  {SIDEBAR_LOCATIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      style={styles.sidebarButton}
                      onClick={() => handleLocationSelect(item.id)}
                    >
                      <span style={styles.sidebarIcon}><SidebarIcon Icon={item.icon} /></span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.sidebarGroup}>
                <p style={styles.sidebarHeading}>Tags</p>
                <div style={styles.sidebarList}>
                  {TAGS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      style={{ ...styles.sidebarButton, ...(activeTag === item.id ? styles.sidebarButtonActive : null) }}
                      onClick={() => setActiveTag((current) => (current === item.id ? null : item.id))}
                    >
                      <span style={{ ...styles.tagDot, background: item.color }} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          ) : null}

          <main style={styles.mainArea}>
            {renderMainContent()}
          </main>

          {showInfoPanel ? <aside style={styles.previewPane}>{renderPreviewPanel()}</aside> : null}
        </div>

        <footer style={styles.statusBar}>
          <span>{statusText}</span>
          <span style={styles.statusPath}>{breadcrumb.map((item) => item.label).join(" / ")}</span>
        </footer>
      </section>
    </div>
  );
}

const styles = {
  page: {
    display: "grid",
    minHeight: "100%",
  },
  finderSurface: {
    minHeight: "100%",
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "linear-gradient(160deg, rgba(11, 35, 68, 0.74), rgba(7, 19, 38, 0.78) 55%, rgba(8, 16, 28, 0.86))",
    backdropFilter: "blur(20px) saturate(140%)",
    WebkitBackdropFilter: "blur(20px) saturate(140%)",
    boxShadow: "0 24px 60px rgba(2, 6, 23, 0.34)",
    overflow: "hidden",
  },
  toolbar: {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
    gap: "14px",
    alignItems: "center",
    padding: "12px 14px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))",
  },
  toolbarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  toolbarCenter: {
    minWidth: 0,
    display: "grid",
    gap: "4px",
    justifyItems: "center",
  },
  toolbarRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  heading: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "0.98rem",
    fontWeight: 700,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    minWidth: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  breadcrumbButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    border: 0,
    background: "transparent",
    color: "rgba(219,234,254,0.82)",
    fontSize: "0.76rem",
    padding: 0,
    maxWidth: "180px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  breadcrumbButtonCurrent: {
    color: "#93c5fd",
    fontWeight: 600,
  },
  breadcrumbSlash: {
    color: "rgba(191,219,254,0.48)",
  },
  circleButton: {
    width: "28px",
    height: "28px",
    borderRadius: "9px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    color: "#dbeafe",
    display: "inline-grid",
    placeItems: "center",
  },
  iconActionButton: {
    width: "28px",
    height: "28px",
    borderRadius: "9px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#dbeafe",
    display: "inline-grid",
    placeItems: "center",
  },
  disabledButton: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  viewModeGroup: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(15,23,42,0.36)",
  },
  modeButton: {
    width: "28px",
    height: "24px",
    borderRadius: "7px",
    color: "rgba(191,219,254,0.84)",
    display: "inline-grid",
    placeItems: "center",
  },
  modeButtonActive: {
    background: "rgba(59,130,246,0.4)",
    color: "#eff6ff",
  },
  searchWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    minWidth: "160px",
    maxWidth: "260px",
    width: "22vw",
    padding: "7px 10px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(219,234,254,0.86)",
    background: "rgba(15,23,42,0.4)",
  },
  searchInput: {
    width: "100%",
    border: 0,
    outline: "none",
    background: "transparent",
    color: "#eff6ff",
    fontSize: "0.86rem",
  },
  mobileSectionRow: {
    display: "flex",
    gap: "8px",
    padding: "8px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    overflowX: "auto",
  },
  mobileSectionButton: {
    flex: "0 0 auto",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.14)",
    padding: "6px 10px",
    fontSize: "0.78rem",
    color: "#dbeafe",
    background: "rgba(15,23,42,0.34)",
  },
  mobileSectionButtonActive: {
    background: "rgba(59,130,246,0.34)",
    borderColor: "rgba(147,197,253,0.5)",
    color: "#eff6ff",
  },
  explorerBody: {
    minHeight: 0,
    display: "grid",
  },
  sidebar: {
    minHeight: 0,
    overflowY: "auto",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(180deg, rgba(15,23,42,0.26), rgba(15,23,42,0.46))",
    padding: "12px 10px",
    display: "grid",
    alignContent: "start",
    gap: "14px",
  },
  sidebarGroup: {
    display: "grid",
    gap: "8px",
  },
  sidebarHeading: {
    margin: 0,
    padding: "0 8px",
    color: "rgba(191,219,254,0.72)",
    fontSize: "0.74rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  sidebarList: {
    display: "grid",
    gap: "3px",
  },
  sidebarButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "10px",
    padding: "7px 8px",
    border: "1px solid transparent",
    background: "transparent",
    color: "#dbeafe",
    fontSize: "0.84rem",
    textAlign: "left",
  },
  sidebarButtonActive: {
    background: "rgba(59,130,246,0.28)",
    borderColor: "rgba(147,197,253,0.38)",
    color: "#eff6ff",
  },
  sidebarIcon: {
    width: "16px",
    display: "inline-grid",
    placeItems: "center",
    color: "rgba(191,219,254,0.9)",
  },
  tagDot: {
    width: "9px",
    height: "9px",
    borderRadius: "999px",
    boxShadow: "0 0 12px rgba(255,255,255,0.2)",
  },
  mainArea: {
    minWidth: 0,
    minHeight: 0,
    overflow: "auto",
    padding: "14px",
  },
  iconGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "14px 12px",
    alignContent: "start",
  },
  iconItem: {
    minHeight: "120px",
    borderRadius: "12px",
    border: "1px solid transparent",
    background: "transparent",
    padding: "10px 8px",
    display: "grid",
    justifyItems: "center",
    alignContent: "start",
    gap: "8px",
    color: "#eff6ff",
    transition: "background-color 150ms ease, border-color 150ms ease",
  },
  iconName: {
    margin: 0,
    fontSize: "0.86rem",
    lineHeight: 1.35,
    textAlign: "center",
    color: "#eff6ff",
    overflowWrap: "anywhere",
  },
  iconMeta: {
    margin: 0,
    fontSize: "0.72rem",
    textAlign: "center",
    color: "rgba(191,219,254,0.76)",
    lineHeight: 1.3,
  },
  listWrap: {
    display: "grid",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.09)",
    overflow: "hidden",
  },
  listHead: {
    display: "grid",
    gridTemplateColumns: "minmax(170px, 1.8fr) minmax(120px, 1fr) 110px minmax(140px, 1.2fr)",
    gap: "10px",
    alignItems: "center",
    padding: "8px 12px",
    fontSize: "0.75rem",
    color: "rgba(191,219,254,0.88)",
    borderBottom: "1px solid rgba(255,255,255,0.09)",
    background: "rgba(15,23,42,0.35)",
  },
  listRow: {
    display: "grid",
    gridTemplateColumns: "minmax(170px, 1.8fr) minmax(120px, 1fr) 110px minmax(140px, 1.2fr)",
    gap: "10px",
    alignItems: "center",
    padding: "9px 12px",
    fontSize: "0.82rem",
    color: "#eff6ff",
    textAlign: "left",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
  },
  listNameCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: 0,
    overflow: "hidden",
  },
  listNameText: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  listCellMuted: {
    color: "rgba(191,219,254,0.84)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  previewPane: {
    borderLeft: "1px solid rgba(255,255,255,0.08)",
    padding: "12px",
    background: "linear-gradient(180deg, rgba(15,23,42,0.18), rgba(15,23,42,0.34))",
    minHeight: 0,
    overflow: "auto",
  },
  previewCard: {
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(15,23,42,0.34)",
    padding: "14px",
    display: "grid",
    justifyItems: "center",
    gap: "10px",
  },
  previewTitle: {
    margin: 0,
    color: "#eff6ff",
    fontSize: "1.02rem",
    textAlign: "center",
  },
  previewType: {
    margin: 0,
    color: "rgba(191,219,254,0.88)",
    fontSize: "0.82rem",
    textAlign: "center",
  },
  previewText: {
    margin: 0,
    color: "rgba(219,234,254,0.9)",
    fontSize: "0.82rem",
    lineHeight: 1.55,
    textAlign: "center",
  },
  previewCount: {
    margin: 0,
    color: "#93c5fd",
    fontSize: "0.84rem",
  },
  previewBadgeWrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "6px",
  },
  previewBadge: {
    borderRadius: "999px",
    padding: "4px 8px",
    fontSize: "0.74rem",
    color: "#dbeafe",
    border: "1px solid rgba(147,197,253,0.3)",
    background: "rgba(59,130,246,0.2)",
  },
  previewInfoList: {
    width: "100%",
    display: "grid",
    gap: "6px",
  },
  previewInfoRow: {
    margin: 0,
    display: "grid",
    gridTemplateColumns: "84px minmax(0, 1fr)",
    gap: "8px",
    color: "rgba(219,234,254,0.9)",
    fontSize: "0.8rem",
    lineHeight: 1.35,
  },
  previewButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "4px",
    borderRadius: "10px",
    border: "1px solid rgba(96,165,250,0.5)",
    background: "linear-gradient(135deg, rgba(59,130,246,0.66), rgba(29,78,216,0.8))",
    color: "#eff6ff",
    padding: "8px 12px",
    fontSize: "0.84rem",
  },
  previewButtonDisabled: {
    opacity: 0.5,
  },
  statusBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    padding: "7px 12px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(15,23,42,0.48)",
    color: "rgba(219,234,254,0.9)",
    fontSize: "0.78rem",
  },
  statusPath: {
    color: "rgba(147,197,253,0.86)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  emptyState: {
    borderRadius: "12px",
    border: "1px dashed rgba(148,163,184,0.45)",
    background: "rgba(15,23,42,0.24)",
    padding: "24px 16px",
    display: "grid",
    gap: "8px",
    justifyItems: "center",
    textAlign: "center",
  },
  emptyStateTitle: {
    margin: 0,
    color: "#dbeafe",
    fontWeight: 600,
  },
  emptyStateText: {
    margin: 0,
    color: "rgba(191,219,254,0.82)",
    fontSize: "0.84rem",
    lineHeight: 1.5,
    maxWidth: "56ch",
  },
  folderGlyph: {
    position: "relative",
    display: "inline-block",
    flex: "0 0 auto",
    filter: "drop-shadow(0 10px 18px rgba(2, 6, 23, 0.32))",
  },
  folderGlyphTab: {
    position: "absolute",
    left: "9%",
    top: 0,
    borderRadius: "6px 6px 0 0",
    background: "linear-gradient(180deg, #7dd3fc, #4fa7f8)",
    border: "1px solid rgba(191,219,254,0.72)",
    borderBottom: 0,
  },
  folderGlyphBody: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "9px",
    border: "1px solid rgba(191,219,254,0.72)",
    background: "linear-gradient(180deg, #58b8ff, #287ff2)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.42)",
  },
  fileGlyph: {
    position: "relative",
    display: "inline-grid",
    placeItems: "end center",
    flex: "0 0 auto",
    overflow: "hidden",
    paddingBottom: "7px",
    borderRadius: "7px",
    border: "1px solid rgba(226,232,240,0.7)",
    background: "linear-gradient(180deg, #ffffff, #dce6f6)",
    filter: "drop-shadow(0 8px 16px rgba(2, 6, 23, 0.24))",
  },
  fileGlyphList: {
    paddingBottom: "0",
    placeItems: "center",
  },
  fileGlyphFold: {
    position: "absolute",
    top: "-1px",
    right: "-1px",
    width: "14px",
    height: "14px",
    borderRadius: "0 7px 0 7px",
    background: "linear-gradient(180deg, #f8fafc, #dbeafe)",
    borderTop: "1px solid rgba(226,232,240,0.82)",
    borderRight: "1px solid rgba(226,232,240,0.82)",
    borderLeft: "1px solid rgba(148,163,184,0.38)",
    borderBottom: "1px solid rgba(148,163,184,0.38)",
  },
  fileGlyphBadge: {
    borderRadius: "999px",
    padding: "2px 7px",
    fontSize: "0.55rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: "#1e3a8a",
    background: "rgba(96,165,250,0.26)",
  },
};
