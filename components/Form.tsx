interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
}

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isLoading?: boolean;
}

type FormError = {
    children: React.ReactNode;
    className?: string;
};

export function Form({ className, children, ...props }: FormProps) {
    return (
        <form className={className} {...props}>
            {children}
        </form>
    );
}

export function FormGroup({ className, children, ...props }: FormGroupProps) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
}

export function FormLabel({ className, children, ...props }: FormLabelProps) {
    return (
        <label className={className} {...props}>
            {children}
        </label>
    );
}

export function FormError({ className, children }: FormError) {
    return <span className={className}>{children}</span>;
}

export function Button({
    className,
    children,
    isLoading,
    ...props
}: ButtonProps) {
    return (
        <button className={className} disabled={isLoading} {...props}>
            {children}
        </button>
    );
}
