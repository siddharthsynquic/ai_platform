import { Link } from "react-router-dom";
import { FileText, MapPin, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const tiles = [
  {
    to: "/pdf",
    title: "PDF Library",
    description: "Upload, browse, extract content from architectural drawings.",
    icon: FileText,
  },
  {
    to: "/site/observations",
    title: "Site Observations",
    description: "Field capture, spatial pins, issue management.",
    icon: MapPin,
  },
  {
    to: "/site/chat",
    title: "Site Chatbot",
    description: "Grounded queries across site + drawings.",
    icon: MessageSquare,
  },
];

export function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Platform</h1>
        <p className="text-muted-foreground">
          Architerrax drawing validation + site intelligence.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {tiles.map(({ to, title, description, icon: Icon }) => (
          <Link key={to} to={to}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <Icon className="mb-2 h-6 w-6 text-primary" />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
