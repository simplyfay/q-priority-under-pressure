// Inter is loaded here if not already imported at the app level.
// Remove this import once you add Inter to your root layout/index.html.
const interFontUrl =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';

function GoogleFontLoader() {
  if (typeof document !== 'undefined') {
    if (!document.querySelector(`link[href="${interFontUrl}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = interFontUrl;
      document.head.appendChild(link);
    }
  }
  return null;
}

export function TaskCard() {
  return (
    <div
      className="
        w-full max-w-xl
        bg-surface-raised
        border border-line-default
        rounded-xl
        p-6
      "
    >
      {/* Label */}
      <p className="text-content-accent text-sm font-medium tracking-widest uppercase mb-3">
        HIGHEST IMPACT · DUE BY 3PM
      </p>

      {/* Task title */}
      <h2 className="text-content-primary text-2xl font-semibold leading-snug mb-2">
        Review Q3 proposal draft
      </h2>

      {/* Rationale */}
      <p className="text-content-secondary text-base font-normal leading-normal mb-6">
        Flagged by your manager 2 hours ago. Client deadline today.
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          className="
            bg-action-primary text-action-primary-text
            rounded-full
            px-6 py-3
            text-base font-semibold
            transition-colors duration-150
            hover:bg-action-primary-hover
          "
        >
          Start task
        </button>

        <button
          className="
            bg-action-secondary text-action-secondary-text
            rounded-full
            px-6 py-3
            text-base font-medium
            transition-colors duration-150
            hover:bg-action-secondary-hover
          "
        >
          View all tasks
        </button>
      </div>
    </div>
  );
}

export default function TokenTest() {
  return (
    <>
      <GoogleFontLoader />

      <div className="min-h-screen bg-surface-default font-sans flex flex-col items-center justify-center px-6 py-16">

        {/* 1. Large heading */}
        <h1 className="text-content-primary text-5xl font-bold tracking-tight leading-tight mb-2">
          Q
        </h1>

        {/* 2. Subheading */}
        <p className="text-content-secondary text-xl font-medium leading-snug mb-12">
          Priority Under Pressure
        </p>

        {/* 3. Card */}
        <TaskCard />

        {/* 4. Footer label */}
        <p className="text-content-muted text-sm mt-8">
          Token system verified · Q Design System v1
        </p>

      </div>
    </>
  );
}
