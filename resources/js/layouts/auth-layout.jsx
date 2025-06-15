// import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
// import AuthLayoutTemplate from '@/layouts/auth/auth-split-layout'; 
import AuthLayoutTemplate from '@/layouts/auth/auth-card-layout'; 

export default function AuthLayout({ children, title, description, ...props }) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
