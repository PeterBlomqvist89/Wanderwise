// app/auth/layout.js

export const metadata = {
  title: "Authentication - Wanderwise",
  description: "Log in or Sign up for Wanderwise",
};

export default function AuthLayout({ children }) {
  return <div className="bg-timberwolf">{children}</div>;
}
