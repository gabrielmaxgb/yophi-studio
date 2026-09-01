import { caseStudyBase } from "@/lib/content";

export const archiveImageSrcs = caseStudyBase.map((study) => study.image);

export function preloadArchiveImages(
  onProgress?: (loaded: number, total: number) => void
) {
  const total = archiveImageSrcs.length;
  let loaded = 0;

  const tick = () => {
    loaded += 1;
    onProgress?.(loaded, total);
  };

  return Promise.all(
    archiveImageSrcs.map((src) => {
      const img = new window.Image();
      img.src = src;
      return img
        .decode()
        .catch(() => undefined)
        .finally(tick);
    })
  );
}

export function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function waitForPath(path: string, timeout = 8000) {
  const started = performance.now();
  return new Promise<void>((resolve) => {
    const check = () => {
      if (window.location.pathname.includes(path)) {
        resolve();
        return;
      }
      if (performance.now() - started > timeout) {
        resolve();
        return;
      }
      requestAnimationFrame(check);
    };
    check();
  });
}
