/**
 * Fluent 2 Adapter Components
 * These wrap the Fluent2Web components with simplified APIs matching our app's patterns.
 * When Fluent 2 is disabled, they render the current components instead.
 */
import { useFluent2 } from '../Fluent2Context';
import { Button as FluentButton } from '../../Fluent2Web/components/button';
import { Input as FluentInput } from '../../Fluent2Web/components/input';
import { Checkbox as FluentCheckbox } from '../../Fluent2Web/components/checkbox';
import { Button as ShadcnButton } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

// ─── Fluent Primary Button ──────────────────────────────────────────────────
interface F2ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'ghost';
  className?: string;
  style?: React.CSSProperties;
  accentColor?: string;
  accentHover?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export function F2Button({ children, onClick, disabled, variant = 'primary', className, style, accentColor, accentHover, onMouseEnter, onMouseLeave }: F2ButtonProps) {
  const { enabled } = useFluent2();

  if (enabled) {
    const fluentStyle = variant === 'primary' ? 'Primary'
      : variant === 'outline' ? 'Outline'
      : variant === 'subtle' || variant === 'ghost' ? 'Subtle'
      : 'Secondary (Default)' as const;

    return (
      <div className={variant === 'primary' ? 'inline-flex' : 'inline-flex'}>
        <FluentButton
          label={typeof children === 'string' ? children : 'Button'}
          style={fluentStyle}
          icon={false}
          onClick={onClick}
          disabled={disabled}
          state={disabled ? 'Disabled' : undefined}
        />
      </div>
    );
  }

  // Current implementation
  if (variant === 'outline' || variant === 'secondary') {
    return (
      <ShadcnButton
        variant="outline"
        onClick={onClick}
        disabled={disabled}
        className={className || "border-[#8a8886] text-[#323130] hover:bg-[#f3f2f1] rounded dark:border-[#605e5c] dark:text-[#ffffff] dark:hover:bg-[#3d3d3d]"}
        style={style}
      >
        {children}
      </ShadcnButton>
    );
  }

  return (
    <ShadcnButton
      onClick={onClick}
      disabled={disabled}
      className={className || "text-white px-6 rounded disabled:bg-[#f3f2f1] disabled:text-[#a19f9d] disabled:hover:bg-[#f3f2f1] disabled:cursor-not-allowed transition-colors"}
      style={style || (accentColor ? { backgroundColor: accentColor } : undefined)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </ShadcnButton>
  );
}

// ─── Fluent Back Button ─────────────────────────────────────────────────────
interface F2BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  accentColor?: string;
}

export function F2BackButton({ onClick, label = 'Back', className, accentColor }: F2BackButtonProps) {
  const { enabled } = useFluent2();

  if (enabled) {
    return (
      <div className="inline-flex">
        <FluentButton
          label={label}
          style="Subtle"
          icon={false}
          size="Small"
          onClick={onClick}
        />
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={className || "flex items-center gap-2 text-[#605e5c] dark:text-[#d0d0d0] hover:text-[#323130] dark:hover:text-[#ffffff] transition-all mb-8 -ml-2 px-2 py-1 rounded hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d]"}
      style={accentColor ? { color: accentColor } : undefined}
    >
      <ChevronLeft className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

// ─── Fluent Text Input ──────────────────────────────────────────────────────
interface F2InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  type?: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function F2Input({ value, onChange, placeholder, disabled, className, type = 'text', autoFocus, onKeyDown, onFocus, onBlur }: F2InputProps) {
  const { enabled } = useFluent2();

  if (enabled) {
    return (
      <FluentInput
        value={value}
        onChange={(val) => onChange({ target: { value: val } } as React.ChangeEvent<HTMLInputElement>)}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        style="Outline"
        className={className || "w-full"}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoFocus={autoFocus}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className || "w-full px-3 py-2 text-[14px] text-[#323130] dark:text-[#ffffff] placeholder:text-[#707070] dark:placeholder:text-[#8a8886] bg-white dark:bg-[#292929] border border-[#8a8886] dark:border-[#605e5c]"}
      style={{ outline: 'none' }}
    />
  );
}

// ─── Fluent Checkbox ────────────────────────────────────────────────────────
interface F2CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function F2Checkbox({ checked, onChange, label, disabled }: F2CheckboxProps) {
  const { enabled } = useFluent2();

  if (enabled) {
    return (
      <FluentCheckbox
        checked={checked}
        onChange={(val) => onChange(val === true)}
        labelText={label}
        label={!!label}
        disabled={disabled}
      />
    );
  }

  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
          checked
            ? 'bg-[#0f6cbd] border-[#0f6cbd]'
            : 'border-[#8a8886] bg-white dark:border-[#605e5c] dark:bg-[#292929]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && onChange(!checked)}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {label && <span className={`text-[14px] ${disabled ? 'text-[#a19f9d]' : 'text-[#323130] dark:text-[#ffffff]'}`}>{label}</span>}
    </label>
  );
}

// ─── Fluent Marketing Button (large CTA) ────────────────────────────────────
interface F2CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  accentColor?: string;
  accentHover?: string;
  className?: string;
}

export function F2CTAButton({ children, onClick, accentColor, accentHover, className }: F2CTAButtonProps) {
  const { enabled } = useFluent2();

  if (enabled) {
    return (
      <div className="inline-flex">
        <FluentButton
          label={typeof children === 'string' ? children : 'Button'}
          style="Primary"
          icon={false}
          size="Large"
          onClick={onClick}
        />
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={className || `text-white px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98]`}
      style={{ backgroundColor: accentColor }}
      onMouseEnter={(e) => accentHover && ((e.target as HTMLElement).style.backgroundColor = accentHover)}
      onMouseLeave={(e) => accentColor && ((e.target as HTMLElement).style.backgroundColor = accentColor)}
    >
      {children}
    </button>
  );
}
