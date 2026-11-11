import { useState } from 'react';
import { User } from 'lucide-react';

export default function UserAvatar({ user, size = 'md', className = '', alt }) {
  const [imgError, setImgError] = useState(false);

  const name = user?.name || '';
  const avatarUrl = user?.avatar_url;

  // Extract up to 2 initials
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-20 h-20 text-xl',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  if (avatarUrl && !imgError) {
    return (
      <img
        src={avatarUrl}
        alt={alt || name || 'User avatar'}
        onError={() => setImgError(true)}
        className={`${selectedSize} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${selectedSize} rounded-full bg-gradient-to-br from-terracotta to-[#C23C13] text-white font-bold flex items-center justify-center flex-shrink-0 select-none shadow-xs ${className}`}
      title={name}
    >
      {initials.length > 0 ? (
        <span>{initials}</span>
      ) : (
        <User size={size === 'xl' ? 32 : size === 'lg' ? 20 : 14} />
      )}
    </div>
  );
}
