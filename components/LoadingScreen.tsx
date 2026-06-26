"use client";

type LoadingScreenProps = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <div
      className="loading-screen fixed inset-0 z-[100] bg-background"
      role="status"
      aria-label="Loading site"
    >
      <div className="loading-fly-track" aria-hidden="true">
        <div className="loading-fly-square loading-fly-square--trail-4" />
        <div className="loading-fly-square loading-fly-square--trail-3" />
        <div className="loading-fly-square loading-fly-square--trail-2" />
        <div className="loading-fly-square loading-fly-square--trail-1" />
        <div
          className="loading-fly-square loading-fly-square--lead bg-accent"
          onAnimationEnd={(event) => {
            if (
              event.animationName === "loading-fly" ||
              event.animationName === "loading-fly-compact"
            ) {
              onComplete();
            }
          }}
        />
      </div>
    </div>
  );
}
