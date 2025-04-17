import { AdvancedImageViewer } from "@/components/avanced.image.viewer";

export default function DashboardPage() {
  const mockImages = [
    { name: "Primeira", url: "/img1.jpg" },
    { name: "Segunda", url: "/img2.jpg" },
    { name: "Terceira", url: "/img3.jpg" },
  ];

  return (
    <div className="max-w-md mx-auto p-4">
      <AdvancedImageViewer images={mockImages} />
    </div>
  );
}
