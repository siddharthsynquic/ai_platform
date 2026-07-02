import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export function LoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Login form scaffolded here. Wire once /auth endpoints exist.
          </p>
          {/* TODO: <LoginForm /> with React Hook Form + Zod */}
        </CardContent>
      </Card>
    </div>
  );
}
