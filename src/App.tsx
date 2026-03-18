import { useState } from "react";
import { Button } from "./components/Button";
import { cn } from "./utils/cn";

type ShadowMode = "neutral" | "tint";

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
  const [shadow, setShadow] = useState<ShadowMode>("neutral");
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const previewDisabled = disabled && !loading;

  const previewClassName =
    hover && !loading && !previewDisabled
      ? shadow === "tint"
        ? "shadow-tint-hover"
        : "shadow-neutral-hover"
      : undefined;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(146,37,255,0.12),_transparent_32%),linear-gradient(180deg,_#faf7ff_0%,_#f8f8fb_42%,_#f4f5f8_100%)] px-4 py-6 text-[color:var(--text-h)] sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-3">
        <section className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_24px_80px_rgba(109,86,146,0.12)] backdrop-blur lg:col-span-1">
          <div className="space-y-6">
            <p className="space-y-6 font-sharp-medium text-header text-gray-700">
              Assignment
            </p>
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
              {/*   <div className="rounded-full border border-purple-200 bg-purple-50 px-4 py-2 font-mono-brand text-header-small text-purple-700">
                shadow={shadow} hover={String(hover)} loading={String(loading)}{" "}
                disabled={String(disabled)}
              </div> */}
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="h-full rounded-[28px] border border-dashed border-purple-200 bg-[linear-gradient(135deg,_rgba(250,247,255,0.9),_rgba(255,255,255,0.95))] p-8">
                <div className="flex h-full min-h-40 items-center justify-center rounded-[24px] bg-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
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
                      Hover only affects the preview when the button is neither
                      loading nor disabled. Disabled is only applied when
                      loading is off.
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
    </main>
  );
}
