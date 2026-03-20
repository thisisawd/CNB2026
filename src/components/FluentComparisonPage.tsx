import { useState } from 'react';
import { ChevronLeft, X, Check, AlertCircle, Info } from 'lucide-react';

// Current components
import { Button as ShadcnButton } from './ui/button';

// Fluent2Web components
import { Button as FluentButton } from '../Fluent2Web/components/button';
import { Input as FluentInput } from '../Fluent2Web/components/input';
import { Checkbox as FluentCheckbox } from '../Fluent2Web/components/checkbox';
import { Radio as FluentRadio } from '../Fluent2Web/components/radio';
import { Switch as FluentSwitch } from '../Fluent2Web/components/switch';
import { Spinner as FluentSpinner } from '../Fluent2Web/components/spinner';
import { Link as FluentLink } from '../Fluent2Web/components/link';
import { Dialog as FluentDialog } from '../Fluent2Web/components/dialog';
import { MessageBar as FluentMessageBar } from '../Fluent2Web/components/message_bar';
import { Badge as FluentBadge } from '../Fluent2Web/components/badge';

interface FluentComparisonPageProps {
  onBack: () => void;
  notebookType?: 'class' | 'staff';
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-[#323130] mb-1" style={{ fontSize: '20px', fontWeight: 600 }}>{title}</h2>
      <p className="text-[#605e5c]" style={{ fontSize: '13px' }}>{description}</p>
    </div>
  );
}

function ComparisonCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#edebe9] rounded-lg p-6 flex flex-col gap-4">
      <span className="text-[10px] tracking-wider text-[#a19f9d] uppercase">{label}</span>
      <div className="flex flex-wrap items-center gap-4">
        {children}
      </div>
    </div>
  );
}

export function FluentComparisonPage({ onBack, notebookType = 'class' }: FluentComparisonPageProps) {
  const accentColor = notebookType === 'staff' ? '#008272' : '#7719AA';
  const [inputCurrent, setInputCurrent] = useState('');
  const [inputFluent, setInputFluent] = useState('');
  const [checkCurrent, setCheckCurrent] = useState(false);
  const [checkFluent, setCheckFluent] = useState<boolean | 'indeterminate'>(false);
  const [radioCurrent, setRadioCurrent] = useState('a');
  const [radioFluent, setRadioFluent] = useState('a');
  const [switchCurrent, setSwitchCurrent] = useState(false);
  const [switchFluent, setSwitchFluent] = useState(false);
  const [showFluentDialog, setShowFluentDialog] = useState(false);
  const [showCurrentDialog, setShowCurrentDialog] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f8]">
      {/* Header */}
      <div className="bg-white border-b border-[#edebe9] px-8 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#605e5c] hover:text-[#323130] hover:bg-[#f3f2f1] px-2 py-1 rounded transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="h-6 w-px bg-[#edebe9]" />
            <h1 className="text-[#323130]" style={{ fontSize: '20px', fontWeight: 600 }}>
              Component Comparison
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#a19f9d] uppercase tracking-wider">Current</span>
            <span className="text-[11px] text-[#605e5c]">vs</span>
            <span className="text-[11px] uppercase tracking-wider" style={{ color: '#0f6cbd' }}>Fluent 2 Web</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8 space-y-12">

        {/* ===== BUTTONS ===== */}
        <section>
          <SectionHeader
            title="Buttons"
            description="Primary actions, secondary actions, and ghost/back buttons used throughout the wizard."
          />
          <div className="grid grid-cols-2 gap-6">
            <ComparisonCard label="Current — Primary Button">
              <ShadcnButton
                className="text-white px-6 rounded"
                style={{ backgroundColor: accentColor }}
              >
                Next
              </ShadcnButton>
              <ShadcnButton
                className="text-white px-6 rounded bg-[#d1d1d1] cursor-not-allowed"
                disabled
              >
                Next
              </ShadcnButton>
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Primary Button">
              <FluentButton
                label="Next"
                style="Primary"
                icon={false}
              />
              <FluentButton
                label="Next"
                style="Primary"
                icon={false}
                state="Disabled"
              />
            </ComparisonCard>

            <ComparisonCard label="Current — Secondary Button">
              <ShadcnButton variant="outline" className="px-6 rounded border-[#8a8886] text-[#323130]">
                Cancel
              </ShadcnButton>
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Secondary Button">
              <FluentButton
                label="Cancel"
                style="Secondary (Default)"
                icon={false}
              />
            </ComparisonCard>

            <ComparisonCard label="Current — Back Button (Ghost)">
              <button className="flex items-center gap-2 text-[#605e5c] hover:bg-[#f3f2f1] px-2 py-1 rounded transition-all">
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Subtle Button">
              <FluentButton
                label="Back"
                style="Subtle"
                icon={false}
              />
              <FluentButton
                label="Back"
                style="Transparent"
                icon={false}
              />
            </ComparisonCard>
          </div>
        </section>

        {/* ===== INPUTS ===== */}
        <section>
          <SectionHeader
            title="Text Inputs"
            description="Name fields, email fields, and text areas used in wizard steps."
          />
          <div className="grid grid-cols-2 gap-6">
            <ComparisonCard label="Current — Text Input">
              <input
                type="text"
                placeholder="For example, Biology 3 period 2"
                value={inputCurrent}
                onChange={(e) => setInputCurrent(e.target.value)}
                className="w-full px-3 py-2 text-[14px] text-[#323130] placeholder:text-[#707070] bg-white border border-[#8a8886]"
                style={{ outline: 'none' }}
              />
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Outline Input">
              <FluentInput
                placeholder="For example, Biology 3 period 2"
                value={inputFluent}
                onChange={setInputFluent}
                style="Outline"
              />
            </ComparisonCard>

            <ComparisonCard label="Current — Disabled Input">
              <input
                type="text"
                placeholder="Disabled"
                disabled
                className="w-full px-3 py-2 text-[14px] text-[#a19f9d] placeholder:text-[#a19f9d] bg-[#f3f2f1] border border-[#c8c6c4] cursor-not-allowed"
                style={{ outline: 'none' }}
              />
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Disabled Input">
              <FluentInput
                placeholder="Disabled"
                state="Disabled"
                disabled
              />
            </ComparisonCard>
          </div>
        </section>

        {/* ===== CHECKBOXES ===== */}
        <section>
          <SectionHeader
            title="Checkboxes"
            description="Used in student spaces configuration and feature toggles."
          />
          <div className="grid grid-cols-2 gap-6">
            <ComparisonCard label="Current — Checkbox">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                    checkCurrent
                      ? 'bg-[#0f6cbd] border-[#0f6cbd]'
                      : 'border-[#8a8886] bg-white'
                  }`}
                  onClick={() => setCheckCurrent(!checkCurrent)}
                >
                  {checkCurrent && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-[14px] text-[#323130]">Enable student spaces</span>
              </label>
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Checkbox">
              <FluentCheckbox
                checked={checkFluent}
                onChange={setCheckFluent}
                labelText="Enable student spaces"
              />
            </ComparisonCard>
          </div>
        </section>

        {/* ===== RADIO BUTTONS ===== */}
        <section>
          <SectionHeader
            title="Radio Buttons"
            description="Used for single-choice selections in configuration steps."
          />
          <div className="grid grid-cols-2 gap-6">
            <ComparisonCard label="Current — Radio Group">
              <div className="flex flex-col gap-3">
                {['Option A', 'Option B', 'Option C'].map((opt, i) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        radioCurrent === String.fromCharCode(97 + i)
                          ? 'border-[#0f6cbd]'
                          : 'border-[#8a8886]'
                      }`}
                      onClick={() => setRadioCurrent(String.fromCharCode(97 + i))}
                    >
                      {radioCurrent === String.fromCharCode(97 + i) && (
                        <div className="w-2 h-2 rounded-full bg-[#0f6cbd]" />
                      )}
                    </div>
                    <span className="text-[14px] text-[#323130]">{opt}</span>
                  </label>
                ))}
              </div>
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Radio Group">
              <div className="flex flex-col gap-1">
                {['Option A', 'Option B', 'Option C'].map((opt, i) => (
                  <FluentRadio
                    key={opt}
                    checked={radioFluent === String.fromCharCode(97 + i)}
                    onChange={() => setRadioFluent(String.fromCharCode(97 + i))}
                    layout="Icon+Label after"
                    label={opt}
                  />
                ))}
              </div>
            </ComparisonCard>
          </div>
        </section>

        {/* ===== SWITCHES ===== */}
        <section>
          <SectionHeader
            title="Toggle Switches"
            description="Used in feature flags panel and settings."
          />
          <div className="grid grid-cols-2 gap-6">
            <ComparisonCard label="Current — Toggle Switch">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    switchCurrent ? 'bg-[#0f6cbd]' : 'bg-[#8a8886]'
                  }`}
                  onClick={() => setSwitchCurrent(!switchCurrent)}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      switchCurrent ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
                <span className="text-[14px] text-[#323130]">Dark mode</span>
              </label>
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Switch">
              <FluentSwitch
                checked={switchFluent}
                onChange={setSwitchFluent}
                layout="Switch+Label after"
              />
            </ComparisonCard>
          </div>
        </section>

        {/* ===== LINKS ===== */}
        <section>
          <SectionHeader
            title="Links"
            description="Inline links and navigation links used in text content."
          />
          <div className="grid grid-cols-2 gap-6">
            <ComparisonCard label="Current — Links">
              <a href="#" className="text-[14px] text-[#0078d4] hover:underline">Learn more</a>
              <a href="#" className="text-[14px] text-[#605e5c] hover:underline">Subtle link</a>
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Links">
              <FluentLink text="Learn more" showIcon={false} />
              <FluentLink text="Subtle link" style="Subtle" showIcon={false} />
            </ComparisonCard>
          </div>
        </section>

        {/* ===== SPINNER ===== */}
        <section>
          <SectionHeader
            title="Loading Spinners"
            description="Loading indicators used during notebook creation and save operations."
          />
          <div className="grid grid-cols-2 gap-6">
            <ComparisonCard label="Current — Spinner">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-[#0078d4] border-t-transparent rounded-full animate-spin" />
                <span className="text-[14px] text-[#323130]">Creating notebook...</span>
              </div>
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Spinner">
              <FluentSpinner
                size="Small"
                layout="Label after"
              />
            </ComparisonCard>
          </div>
        </section>

        {/* ===== MESSAGE BAR ===== */}
        <section>
          <SectionHeader
            title="Message Bars"
            description="Status messages and notifications shown to users."
          />
          <div className="grid grid-cols-1 gap-6">
            <ComparisonCard label="Current — Info Message">
              <div className="flex items-center gap-3 bg-[#f3f2f1] border border-[#edebe9] rounded px-4 py-3 w-full">
                <Info className="w-5 h-5 text-[#0078d4] flex-shrink-0" />
                <span className="text-[14px] text-[#323130]">Your notebook has been saved successfully.</span>
                <button className="ml-auto text-[#605e5c] hover:text-[#323130]">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Message Bar">
              <FluentMessageBar />
            </ComparisonCard>
          </div>
        </section>

        {/* ===== DIALOGS ===== */}
        <section>
          <SectionHeader
            title="Dialogs"
            description="Modal dialogs for confirmations, sign-in, and critical actions."
          />
          <div className="grid grid-cols-2 gap-6">
            <ComparisonCard label="Current — Dialog">
              <ShadcnButton
                variant="outline"
                className="rounded border-[#8a8886] text-[#323130]"
                onClick={() => setShowCurrentDialog(true)}
              >
                Open Current Dialog
              </ShadcnButton>
            </ComparisonCard>
            <ComparisonCard label="Fluent 2 — Dialog">
              <FluentButton
                label="Open Fluent Dialog"
                style="Secondary (Default)"
                icon={false}
                onClick={() => setShowFluentDialog(true)}
              />
            </ComparisonCard>
          </div>
        </section>

        {/* ===== COMPOSITE: WIZARD STEP MOCK ===== */}
        <section>
          <SectionHeader
            title="Composite: Wizard Step Mock"
            description="How a full wizard step would look with each component set."
          />
          <div className="grid grid-cols-2 gap-6">
            {/* Current */}
            <div className="bg-white border border-[#edebe9] rounded-lg p-8">
              <span className="text-[10px] tracking-wider text-[#a19f9d] uppercase mb-4 block">Current Style</span>
              <button className="flex items-center gap-2 text-[#605e5c] hover:bg-[#f3f2f1] px-2 py-1 rounded transition-all mb-6 -ml-2">
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h2 className="text-[#323130] mb-2" style={{ fontSize: '24px' }}>What's the name of your class?</h2>
              <p className="text-[#605e5c] mb-4" style={{ fontSize: '13px' }}>This will be the name of your class notebook*</p>
              <input
                type="text"
                placeholder="For example, Biology 3 period 2"
                className="w-full px-3 py-2 text-[14px] text-[#323130] placeholder:text-[#707070] bg-white border border-[#8a8886] mb-6"
                style={{ outline: 'none' }}
              />
              <div className="flex justify-end">
                <ShadcnButton
                  className="text-white px-6 rounded"
                  style={{ backgroundColor: accentColor }}
                >
                  Next
                </ShadcnButton>
              </div>
            </div>

            {/* Fluent 2 */}
            <div className="bg-white border border-[#edebe9] rounded-lg p-8">
              <span className="text-[10px] tracking-wider text-[#a19f9d] uppercase mb-4 block">Fluent 2 Web Style</span>
              <FluentButton
                label="Back"
                style="Subtle"
                icon={false}
                size="Small"
              />
              <div className="mt-6 mb-2">
                <span className="web-title-3 text-[#242424]">What's the name of your class?</span>
              </div>
              <p className="web-caption-1 text-[#616161] mb-4">This will be the name of your class notebook*</p>
              <div className="mb-6">
                <FluentInput
                  placeholder="For example, Biology 3 period 2"
                  style="Outline"
                  className="w-full"
                />
              </div>
              <div className="flex justify-end">
                <FluentButton
                  label="Next"
                  style="Primary"
                  icon={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== NOTES ===== */}
        <section className="bg-[#fff4ce] border border-[#f7e28b] rounded-lg p-6 mb-8">
          <h3 className="text-[#323130] mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>
            ⚠️ Key Differences to Consider
          </h3>
          <ul className="space-y-2 text-[14px] text-[#323130]">
            <li><strong>Dark mode:</strong> Fluent 2 Web components use hardcoded light-mode colors. They would need custom CSS overrides to support your dark mode toggle.</li>
            <li><strong>Icons:</strong> Fluent 2 uses embedded SVG path data for icons (not lucide-react). Mixing both systems means two icon sets loaded.</li>
            <li><strong>Font:</strong> Fluent 2 components rely on Segoe UI which renders best on Windows. Other platforms fall back to system fonts.</li>
            <li><strong>Sizing:</strong> Fluent Input defaults to 280px width. Would need className overrides for responsive layouts.</li>
            <li><strong>Accent colors:</strong> Fluent 2 uses Microsoft Blue (#0F6CBD) as default brand color, not your OneNote purple (#7719AA) or teal (#008272). Would need token overrides.</li>
            <li><strong>Accessibility:</strong> Both approaches provide keyboard navigation and ARIA attributes, but interaction patterns differ slightly.</li>
          </ul>
        </section>
      </div>

      {/* Current Dialog */}
      {showCurrentDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCurrentDialog(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#323130]" style={{ fontSize: '20px', fontWeight: 600 }}>Confirm Action</h3>
              <button onClick={() => setShowCurrentDialog(false)} className="text-[#605e5c] hover:text-[#323130]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[14px] text-[#605e5c] mb-6">Are you sure you want to proceed with this action?</p>
            <div className="flex justify-end gap-3">
              <ShadcnButton variant="outline" className="rounded border-[#8a8886] text-[#323130]" onClick={() => setShowCurrentDialog(false)}>
                Cancel
              </ShadcnButton>
              <ShadcnButton className="text-white rounded" style={{ backgroundColor: accentColor }} onClick={() => setShowCurrentDialog(false)}>
                Confirm
              </ShadcnButton>
            </div>
          </div>
        </div>
      )}

      {/* Fluent Dialog */}
      <FluentDialog
        open={showFluentDialog}
        onOpenChange={setShowFluentDialog}
        headerText="Confirm Action"
        bodyText="Are you sure you want to proceed with this action?"
        layout="Text"
        size="600px"
        onPrimaryClick={() => setShowFluentDialog(false)}
        onSecondaryClick={() => setShowFluentDialog(false)}
      />
    </div>
  );
}
