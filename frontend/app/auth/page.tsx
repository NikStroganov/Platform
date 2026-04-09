import { AuthContainer } from "./_components/AuthContainer";

export default function AuthPage() {
  return (
    <main
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/auth-bg.webp')" }}
    >
      <AuthContainer>
        <span>Введите почту</span>
      </AuthContainer>
    </main>

  );
}
