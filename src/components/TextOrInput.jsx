import { useRef, useEffect, useState } from 'react';

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
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    if (spanRef.current) {
      if (value === '') {
        setInputWidth(0); // ✅ 빈 문자열일 때 0으로 설정
      } else {
        const width = spanRef.current.offsetWidth;
        setInputWidth(width);
      }

      const rawWidth = spanRef.current.offsetWidth;
      const step = 10;
      const bufferedWidth = rawWidth + 10;
      const adjustedWidth = Math.ceil(bufferedWidth / step) * step;
      setInputWidth(adjustedWidth);
    }
  }, [value]);

  // useEffect(() => {
  //   if (spanRef.current) {
  //     if (value === '') {
  //       setInputWidth(0); // ✅ 빈 문자열일 때 0으로 설정
  //     } else {
  //       const width = spanRef.current.offsetWidth;
  //       setInputWidth(width);
  //     }
  //   }
  // }, [value]);

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
      <span ref={spanRef} className={`invisible whitespace-pre absolute ${className}`}>
        {value || '제목을 입력해주세요.'}
      </span>

      {!isEditing && (
        <span
          className={`inline-block cursor-pointer whitespace-nowrap truncate ${className}`}
          onDoubleClick={onStartEdit}
        >
          {value || '제목을 입력해주세요.'}
        </span>
      )}

      {isEditing && (
        <input
          ref={inputRef}
          type="text"
          className={`inline-block bg-transparent border-none outline-none whitespace-nowrap align-baseline ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onSave}
          onKeyDown={handleKeyDown}
          style={{ width: `${inputWidth}px` }}
        />
      )}
    </div>
  );
};

export default TextOrInput;
