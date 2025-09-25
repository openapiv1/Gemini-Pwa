import * as React from "react";
import * as TooltipPrimitive from "react"; // Using React for context
import * as PopoverPrimitive from "react"; // Using React for context
import * as DialogPrimitive from "react"; // Using React for context


type ClassValue = string | number | boolean | null | undefined;
function cn(...inputs: ClassValue[]): string {
  // This is a simplified version of clsx + twMerge for demonstration.
  // In a real project, you would use the actual libraries.
  const classes = inputs.reduce((acc: string[], input) => {
    if (typeof input === 'string') {
      acc.push(input);
    } else if (typeof input === 'object' && input !== null) {
      for (const key in input) {
        // FIX: Cast `input` to allow indexing, as its inferred type is `never` in this branch due to an incomplete `ClassValue` type definition.
        if (Object.prototype.hasOwnProperty.call(input, key) && (input as Record<string, unknown>)[key]) {
          acc.push(key);
        }
      }
    }
    return acc;
  }, []);
  return [...new Set(classes)].join(' ');
}


// Mock implementations for Radix-like components
const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const Tooltip = ({ children }: { children: React.ReactNode }) => <div className="relative inline-block">{children}</div>;
const TooltipTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => asChild ? <>{children}</> : <button>{children}</button>;
const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { side?: 'top' | 'bottom' | 'left' | 'right'; showArrow?: boolean }>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("absolute z-10 p-2 bg-black text-white rounded-md", className)} {...props}>
    {children}
  </div>
));
TooltipContent.displayName = "TooltipContent";

const Dialog = ({ children, open, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => onOpenChange?.(false)}>
      {children}
    </div>
  );
};
const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("bg-white dark:bg-[#303030] rounded-lg p-4 max-w-lg w-full m-4", className)} {...props} onClick={(e) => e.stopPropagation()}>
    {children}
  </div>
));
DialogContent.displayName = "DialogContent";

// --- SVG Icon Components ---
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}> <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg> );
const SendIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}> <path d="M12 5.25L12 18.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M18.75 12L12 5.25L5.25 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </svg> );
const StopIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}> <rect x="5" y="5" width="14" height="14" rx="2" /> </svg> );
const XIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}> <line x1="18" y1="6" x2="6" y2="18" /> <line x1="6" y1="6" x2="18" y2="18" /> </svg> );

interface PlaceholdersAndVanishInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isGenerating?: boolean;
  onStop?: () => void;
}

export const PlaceholdersAndVanishInput = React.forwardRef<HTMLTextAreaElement, PlaceholdersAndVanishInputProps>(
  ({ className, isGenerating, onStop, onChange, ...props }, ref) => {
    const internalTextareaRef = React.useRef<HTMLTextAreaElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [value, setValue] = React.useState("");
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [isImageDialogOpen, setIsImageDialogOpen] = React.useState(false);
    React.useImperativeHandle(ref, () => internalTextareaRef.current!, []);

    React.useLayoutEffect(() => {
      const textarea = internalTextareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        const newHeight = Math.min(textarea.scrollHeight, 200);
        textarea.style.height = `${newHeight}px`;
      }
    }, [value]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      if (onChange) onChange(e);
    };
    
    const handlePlusClick = () => { fileInputRef.current?.click(); };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => { setImagePreview(reader.result as string); };
        reader.readAsDataURL(file);
      }
      event.target.value = "";
    };
    
    const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setImagePreview(null);
      if(fileInputRef.current) { fileInputRef.current.value = ""; }
    };
    
    const hasValue = value.trim().length > 0 || imagePreview;

    React.useEffect(() => {
      if (isGenerating) {
        setValue("");
        setImagePreview(null);
      }
    }, [isGenerating]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !isGenerating) {
        if (hasValue) {
          e.preventDefault();
          internalTextareaRef.current?.closest('form')?.requestSubmit();
        }
      }
    };


    return (
      <div className={cn("relative flex flex-col rounded-t-[28px] md:rounded-[28px] px-0 md:p-2 transition-colors bg-white dark:bg-[#212121] cursor-text shadow-[0_-6px_12px_-6px_rgba(0,0,0,0.15)] dark:shadow-[0_-6px_12px_-6px_rgba(255,255,255,0.12)] md:border md:dark:border-transparent md:shadow-sm", className)}>
        <div className="px-2">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*"/>
            
            {/* FIX: Refactored the image preview and dialog logic. 
                The preview thumbnail is now separate from the Dialog component to ensure it's always visible when an image is selected.
                The Dialog component now correctly wraps only the full-size image content. */}
            {imagePreview && (
              <>
                <div className="relative mb-1 w-fit rounded-[1rem] px-1 pt-1">
                  <button type="button" className="transition-transform" onClick={() => setIsImageDialogOpen(true)}>
                    <img src={imagePreview} alt="Image preview" className="h-14 w-14 rounded-[1rem] object-cover" />
                  </button>
                  <button onClick={handleRemoveImage} className="absolute right-2 top-2 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-white/50 dark:bg-[#303030] text-black dark:text-white transition-colors hover:bg-gray-200 dark:hover:bg-[#515151]" aria-label="Remove image">
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
                <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                  <DialogContent>
                    <img src={imagePreview} alt="Full size preview" className="w-full max-h-[95vh] object-contain rounded-[24px]" />
                  </DialogContent>
                </Dialog>
              </>
            )}
            
            <textarea ref={internalTextareaRef} rows={1} value={value} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Message..." className="custom-scrollbar w-full resize-none border-0 bg-transparent p-3 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300 focus:ring-0 focus-visible:outline-none min-h-[48px]" {...props} />
            
            <div className="mt-0.5 p-1 pt-0 pb-0">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={handlePlusClick} className="flex h-8 w-8 items-center justify-center rounded-full text-black dark:text-white transition-colors hover:bg-gray-100 dark:hover:bg-[#515151] focus-visible:outline-none"><PlusIcon className="h-6 w-6" /><span className="sr-only">Attach image</span></button>

                  <div className="ml-auto flex items-center gap-2">
                        <button
                          type={isGenerating ? "button" : "submit"}
                          onClick={isGenerating ? onStop : undefined}
                          disabled={isGenerating ? false : !hasValue}
                          className="relative h-8 w-8 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 disabled:bg-black/40 dark:disabled:bg-[#515151]">
                          {isGenerating ? <StopIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6" /> : <SendIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6" />}
                          <span className="sr-only">{isGenerating ? 'Stop generation' : 'Send message'}</span>
                        </button>
                  </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
);
PlaceholdersAndVanishInput.displayName = "PlaceholdersAndVanishInput";