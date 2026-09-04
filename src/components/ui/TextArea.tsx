import React from 'react'

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none ${className}`}
      {...props}
    />
  )
)

TextArea.displayName = 'TextArea'

export default TextArea
