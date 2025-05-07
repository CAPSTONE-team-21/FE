import { useRef, useEffect } from 'react';

const TextOrInput = ({
  value,
  isEditing,
  onStartEdit,
  onChange,
  onSave,
  onCancel,
  className = '',
}) => {
  const inputRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current && spanRef.current) {
      const width = spanRef.current.offsetWidth + 1;
      inputRef.current.style.width = `${width}px`;
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSave();
    if (e.key === 'Escape') onCancel();
  };

  return (
    <div className="inline-flex truncate items-center relative">
      {/* width 측정용 span */}
      <span
        ref={spanRef}
        className={`invisible absolute whitespace-pre text-[15px] font-medium leading-[1.4] ${className}`}
      >
        {value}
      </span>

      {!isEditing && (
        <span
          className={`inline-block cursor-pointer whitespace-nowrap truncate text-[15px] font-medium leading-[1.4] ${className}`}
          onDoubleClick={onStartEdit}
        >
          {value || '제목을 입력해주세요.'}
        </span>
      )}

      {isEditing && (
        <input
          placeholder="제목을 입력해주세요."
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onSave}
          onKeyDown={handleKeyDown}
          className={`
            inline-block
            bg-transparent border-none outline-none
            
            text-[15px] font-medium leading-[1.4]
            whitespace-nowrap align-baseline
            ${className}
          `}
          style={{ minWidth: '0px', boxSizing: 'content-box' }}
        />
      )}
    </div>
  );
};

export default TextOrInput;
