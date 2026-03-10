import { IconProps } from '@/types/icons.interfaces';

export function CloseNewIcon({
  color = 'currentColor',
  width = 14,
  height = 14,
  className="",
  bgColor = "#3c4255",
  svgColor = "none",
  pathColor = "var(--text-active-load-secondary)",
  ...rest
}: IconProps) {
  return (
    <svg width={width}
    height={height} viewBox={`0 0 ${width} ${height}`} fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.16642 11.6551C0.841006 11.9806 0.841056 12.5081 1.16652 12.8336C1.49199 13.159 2.01962 13.159 2.34503 12.8335L6.9994 8.17831L11.6541 12.8331C11.9796 13.1585 12.5072 13.1585 12.8326 12.8331C13.1581 12.5076 13.1581 11.98 12.8326 11.6546L8.17781 6.99973L12.8323 2.34441C13.1576 2.01895 13.1576 1.49131 12.8321 1.16591C12.5067 0.84049 11.9791 0.840539 11.6536 1.16601L6.99923 5.82123L2.34446 1.16641C2.01903 0.840973 1.49139 0.840973 1.16596 1.16641C0.840515 1.49185 0.840515 2.01948 1.16596 2.34492L5.8209 6.99981L1.16642 11.6551Z"
      fill={pathColor}/>
    </svg>
  );
}

CloseNewIcon.displayName = 'CloseNewIcon';
