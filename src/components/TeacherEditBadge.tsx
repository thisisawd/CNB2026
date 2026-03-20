import AppleIcon from '../imports/apple-icon';
import graduationHat from 'figma:asset/5abb26ea3ee09ddbf29db27b58a2873f400fccf7.png';

// OneNote purple color (OP) - consolidated in one place for easy updates
export const ONENOTE_PURPLE = '#7719AA';
export const OP = ONENOTE_PURPLE; // Alias for convenience

interface TeacherEditBadgeProps {
  className?: string;
  featureFlags?: Record<string, boolean>;
}

export function TeacherEditBadge({ className = '', featureFlags = {} }: TeacherEditBadgeProps) {
  const useGraduationHat = featureFlags.teacher_student_icon_alt1;
  
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${className}`} style={{ backgroundColor: `${OP}1A` }}>
      {useGraduationHat ? (
        <img src={graduationHat} alt="" className="w-[18px] h-[18px]" />
      ) : (
        <AppleIcon className="w-[18px] h-[18px]" style={{ color: OP }} />
      )}
      <span className="text-sm whitespace-nowrap" style={{ color: OP }}>
        Teacher can edit the content
      </span>
    </div>
  );
}