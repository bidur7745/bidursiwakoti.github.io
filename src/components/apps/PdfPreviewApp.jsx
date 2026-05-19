import { Download, Loader2, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";
import { desktopAssets } from "../../assets/appAssets.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

export default function PdfPreviewApp() {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(100);
  const [pageCount, setPageCount] = useState(1);
  const [status, setStatus] = useState("Loading PDF...");
  const [error, setError] = useState("");

  function changeZoom(amount) {
    setZoom((value) => Math.min(140, Math.max(80, value + amount)));
  }

  useEffect(() => {
    let isCancelled = false;
    let renderTask = null;
    let loadedDocument = null;

    async function renderPdf() {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      setError("");
      setStatus("Loading PDF...");

      try {
        const loadingTask = pdfjsLib.getDocument(desktopAssets.resumePdf);
        loadedDocument = await loadingTask.promise;

        if (isCancelled) {
          return;
        }

        setPageCount(loadedDocument.numPages);
        setStatus("Rendering page...");

        const page = await loadedDocument.getPage(1);

        if (isCancelled) {
          return;
        }

        const pixelRatio = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale: zoom / 100 });
        const context = canvas.getContext("2d");

        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        context.clearRect(0, 0, viewport.width, viewport.height);

        renderTask = page.render({
          canvasContext: context,
          viewport,
        });

        await renderTask.promise;

        if (!isCancelled) {
          setStatus("");
        }
      } catch (renderError) {
        if (!isCancelled) {
          setError("Could not render the PDF preview.");
          setStatus("");
          console.error(renderError);
        }
      }
    }

    renderPdf();

    return () => {
      isCancelled = true;

      if (renderTask) {
        renderTask.cancel();
      }

      if (loadedDocument) {
        loadedDocument.destroy();
      }
    };
  }, [zoom]);

  return (
    <div style={styles.page}>
      <div style={styles.toolbar}>
        <div style={styles.documentTitle}>
          <img src={desktopAssets.previewIcon} alt="" style={styles.previewIcon} />
          <div>
            <p style={styles.filename}>Bidur Siwakoti Resume.pdf</p>
            <p style={styles.meta}>PDF document · Page 1 of {pageCount}</p>
          </div>
        </div>

        <div style={styles.actions}>
          <button type="button" style={styles.iconButton} aria-label="Zoom out" onClick={() => changeZoom(-10)}>
            <ZoomOut size={16} strokeWidth={2} />
          </button>
          <span style={styles.zoomValue}>{zoom}%</span>
          <button type="button" style={styles.iconButton} aria-label="Zoom in" onClick={() => changeZoom(10)}>
            <ZoomIn size={16} strokeWidth={2} />
          </button>
          <a href={desktopAssets.resumePdf} download style={styles.downloadButton}>
            <Download size={16} strokeWidth={2} />
            <span>Save</span>
          </a>
        </div>
      </div>

      <div style={styles.viewerShell}>
        <div style={styles.canvasWrap}>
          {status ? (
            <div style={styles.status}>
              <Loader2 size={18} strokeWidth={2} style={styles.spinner} />
              <span>{status}</span>
            </div>
          ) : null}
          {error ? <p style={styles.error}>{error}</p> : null}
          <canvas ref={canvasRef} style={styles.canvas} aria-label="Bidur Siwakoti resume PDF preview" />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: 0,
    margin: "-24px",
    color: "#f8fafc",
    background: "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(2,6,23,0.86))",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))",
    flexWrap: "wrap",
  },
  documentTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: 0,
  },
  previewIcon: {
    width: "34px",
    height: "34px",
    objectFit: "contain",
  },
  filename: {
    margin: 0,
    fontSize: "0.92rem",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  meta: {
    margin: "3px 0 0",
    color: "rgba(203,213,225,0.72)",
    fontSize: "0.78rem",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  iconButton: {
    display: "inline-grid",
    placeItems: "center",
    width: "32px",
    height: "32px",
    borderRadius: "9px",
    background: "rgba(255,255,255,0.08)",
    color: "#f8fafc",
    cursor: "pointer",
  },
  zoomValue: {
    minWidth: "44px",
    textAlign: "center",
    color: "rgba(226,232,240,0.9)",
    fontSize: "0.84rem",
    fontVariantNumeric: "tabular-nums",
  },
  downloadButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "8px 10px",
    borderRadius: "10px",
    background: "rgba(59,130,246,0.18)",
    color: "#f8fafc",
    textDecoration: "none",
  },
  viewerShell: {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
    padding: "26px",
    background: "rgba(2,6,23,0.5)",
  },
  canvasWrap: {
    position: "relative",
    width: "fit-content",
    minWidth: "min(100%, 420px)",
    minHeight: "420px",
    margin: "0 auto",
    borderRadius: "8px",
    display: "grid",
    placeItems: "center",
  },
  canvas: {
    display: "block",
    background: "#ffffff",
    borderRadius: "6px",
    boxShadow: "0 22px 80px rgba(2,6,23,0.46)",
  },
  status: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    color: "rgba(226,232,240,0.88)",
    fontSize: "0.9rem",
  },
  spinner: {
    animation: "pdf-spin 900ms linear infinite",
  },
  error: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    margin: 0,
    color: "#fecdd3",
  },
};
