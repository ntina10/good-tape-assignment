import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { cn } from "./utils/cn";

type ShadowMode = "neutral" | "tint";
type FlowStage = "idle" | "loading" | "success";

type ControlChipProps = {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

function ControlChip({ active, children, onClick }: ControlChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-label transition-all duration-200",
        active
          ? "border-purple-500 bg-purple-100 text-purple-700 shadow-sm"
          : "border-gray-200 bg-white text-[color:var(--text)] hover:border-purple-300 hover:text-purple-700",
      )}
    >
      {children}
    </button>
  );
}

type ToggleRowProps = {
  checked: boolean;
  label: string;
  onToggle: () => void;
};

function ToggleRow({ checked, label, onToggle }: ToggleRowProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className={cn(
        "flex items-center justify-between rounded-3xl border px-4 py-3 text-left transition-all duration-200",
        checked
          ? "border-purple-500 bg-purple-100/80 text-purple-700"
          : "border-gray-200 bg-white text-[color:var(--text)] hover:border-purple-300",
      )}
    >
      <span className="font-sharp-medium text-label">{label}</span>
      <span
        className={cn(
          "relative flex h-7 w-12 items-center rounded-full p-1 transition-colors duration-200",
          checked ? "bg-purple-600" : "bg-gray-200",
        )}
      >
        <span
          className={cn(
            "h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}

export default function App() {
  const [flowStage, setFlowStage] = useState<FlowStage>("idle");
  const [flowProgress, setFlowProgress] = useState(0);
  const [shadow, setShadow] = useState<ShadowMode>("neutral");
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const previewDisabled = disabled && !loading;

  useEffect(() => {
    if (flowStage !== "loading") {
      return;
    }

    const interval = window.setInterval(() => {
      setFlowProgress((current) => {
        const next = Math.min(current + 1, 100);

        if (next === 100) {
          window.clearInterval(interval);
          setFlowStage("success");
        }

        return next;
      });
    }, 30);

    return () => window.clearInterval(interval);
  }, [flowStage]);

  const previewClassName =
    hover && !loading && !previewDisabled
      ? shadow === "tint"
        ? "shadow-tint-hover"
        : "shadow-neutral-hover"
      : undefined;

  const startFlow = () => {
    if (flowStage !== "idle") {
      return;
    }

    setFlowProgress(0);
    setFlowStage("loading");
  };

  const restartFlow = () => {
    setFlowProgress(0);
    setFlowStage("idle");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(168,82,255,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(146,37,255,0.12),transparent_38%)] px-4 py-6 text-[color:var(--text-h)] sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/88 p-8 shadow-[0_24px_80px_rgba(109,86,146,0.12)] backdrop-blur">
          <div className="relative flex min-h-72 flex-col gap-8">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono-brand text-header-small uppercase tracking-[0.18em] text-purple-600">
                Flow Demo
              </p>
              <div className="space-y-2">
                <h1 className="font-sharp-medium text-display text-[color:var(--text-h)]">
                  Button state progression
                </h1>
                <p className="font-sharp-book text-body text-[color:var(--text)]">
                  Click once to move the button through loading and success.
                  When the toast appears, use it to reset the sequence.
                </p>
              </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center rounded-[28px] border border-dashed border-purple-200 p-8">
              <div className="flex min-h-44 w-full items-center justify-center rounded-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                {flowStage === "loading" ? (
                  <Button loading progress={flowProgress} shadow="tint">
                    Run action
                  </Button>
                ) : (
                  <Button
                    disabled={flowStage === "success"}
                    onClick={startFlow}
                    shadow="tint"
                  >
                    Run action
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="grid w-full gap-6 lg:grid-cols-3">
          <section className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_24px_80px_rgba(109,86,146,0.12)] backdrop-blur lg:col-span-1">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="font-mono-brand text-header-small uppercase tracking-[0.18em] text-purple-600">
                  Assignment
                </p>
                <div>
                  <h1 className="font-sharp-medium text-display text-[color:var(--text-h)]">
                    Button preview
                  </h1>
                  <p className="font-sharp-book text-body text-[color:var(--text)]">
                    Check out the states.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 pt-5 space-y-5">
                <Button disabled shadow="tint">
                  Disabled
                </Button>
                <Button shadow="tint">Clickable</Button>
                <Button>Boring shadow</Button>
                <Button className="shadow-tint-hover" shadow="tint">
                  Exciting shadow!
                </Button>
                <Button loading progress={80} shadow="tint">
                  Loading
                </Button>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/70 bg-white/88 p-8 shadow-[0_24px_80px_rgba(109,86,146,0.12)] backdrop-blur lg:col-span-2">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                  <p className="font-mono-brand text-header-small uppercase tracking-[0.18em] text-purple-600">
                    Playground
                  </p>
                  <div>
                    <h1 className="font-sharp-medium text-display text-[color:var(--text-h)]">
                      Button preview
                    </h1>
                    <p className="font-sharp-book text-body text-[color:var(--text)]">
                      Toggle the states and see how the button responds.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                <div className="h-full rounded-[28px] border border-dashed border-purple-200 p-8">
                  <div className="flex h-full min-h-40 items-center justify-center rounded-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <Button
                      className={previewClassName}
                      disabled={previewDisabled}
                      loading={loading}
                      progress={80}
                      shadow={shadow}
                    >
                      Preview button
                    </Button>
                  </div>
                </div>

                <div className="h-full rounded-[28px] border border-gray-200/80 bg-[#fcfcfe] p-5">
                  <div className="space-y-4">
                    <div>
                      <p className="font-sharp-medium text-header text-[color:var(--text-h)]">
                        Controls
                      </p>
                      <p className="font-sharp-book text-body-small text-[color:var(--text)]">
                        Hover only affects the preview when the button is
                        neither loading nor disabled. Disabled is only applied
                        when loading is off.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-sharp-medium text-label text-[color:var(--text-h)]">
                          Shadow
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <ControlChip
                          active={shadow === "neutral"}
                          onClick={() => setShadow("neutral")}
                        >
                          Neutral
                        </ControlChip>
                        <ControlChip
                          active={shadow === "tint"}
                          onClick={() => setShadow("tint")}
                        >
                          Tint
                        </ControlChip>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <ToggleRow
                        checked={hover}
                        label="Hover"
                        onToggle={() => setHover((current) => !current)}
                      />
                      <ToggleRow
                        checked={loading}
                        label="Loading"
                        onToggle={() => setLoading((current) => !current)}
                      />
                      <ToggleRow
                        checked={disabled}
                        label="Disabled"
                        onToggle={() => setDisabled((current) => !current)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {flowStage === "success" ? (
        <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4">
          <div className="pointer-events-auto w-full max-w-md rounded-[24px] border border-purple-200 bg-white px-6 py-5 shadow-sm">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-sharp-medium text-header text-purple-700">
                  Success
                </p>
                <p className="font-sharp-book text-body text-[color:var(--text)]">
                  The loading flow reached 100%. The main button is now disabled
                  until you restart it.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="rounded-full border border-purple-200 bg-purple-50 px-4 py-2 font-sharp-medium text-label text-purple-700 transition-colors duration-200 hover:bg-purple-100"
                  onClick={restartFlow}
                  type="button"
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
