import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { EyeClosed, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ImageData = {
  name: string;
  url: string;
};

interface AdvancedImageViewerProps {
  images: ImageData[];
}

export function AdvancedImageViewer({ images }: AdvancedImageViewerProps) {
  const [selected, setSelected] = useState(images[0]);
  const [zoom, setZoom] = useState(1);
  const [focused, setFocused] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  const ref = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    setDragging(true);
    setStartDrag({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !ref.current) return;

    const container = ref.current.getBoundingClientRect();

    const imgWidth = container.width * zoom;
    const imgHeight = container.height * zoom;

    const maxX = (imgWidth - container.width) / 2;
    const maxY = (imgHeight - container.height) / 2;

    const newX = e.clientX - startDrag.x;
    const newY = e.clientY - startDrag.y;

    setPosition({
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY)),
    });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current.getBoundingClientRect();
    const imgWidth = container.width * zoom;
    const imgHeight = container.height * zoom;

    const maxX = (imgWidth - container.width) / 2;
    const maxY = (imgHeight - container.height) / 2;

    // Se zoom for 1, reseta posição
    if (zoom === 1) {
      setPosition({ x: 0, y: 0 });
    } else {
      // Limita a posição dentro do novo tamanho
      setPosition((prev) => ({
        x: Math.max(-maxX, Math.min(maxX, prev.x)),
        y: Math.max(-maxY, Math.min(maxY, prev.y)),
      }));
    }
  }, [zoom]);

  // Zoom com Ctrl + Scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      //   if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.1 : -0.1;

      setZoom((z) => Math.min(Math.max(1, z + delta), 5));
      //   }
    };

    const el = ref.current;
    if (el) el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el?.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      className={cn(
        focused ? "border-sm border-white" : "",
        "relative w-full max-w-3xl mx-auto aspect-video rounded-sm border shadow-md overflow-hidden bg-muted transition-all duration-200"
      )}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
    >
      {/* Select */}
      <div className="absolute top-2 right-2 z-20">
        <Select
          onValueChange={(name) =>
            setSelected(images.find((img) => img.name === name)!)
          }
        >
          <SelectTrigger className="w-[140px] h-8 bg-background border">
            {selected.name}
          </SelectTrigger>
          <SelectContent>
            {images.map((img) => (
              <SelectItem key={img.name} value={img.name}>
                {img.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Imagem */}
      <div
        ref={ref}
        className={cn(
          "w-full h-full flex items-center justify-center transition-all duration-200 cursor-grab active:cursor-grabbing",
          focused ? "ring-2 ring-blue-500" : ""
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={selected.url}
          alt={selected.name}
          draggable="false"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${
              position.y / zoom
            }px)`,
            transition: dragging ? "none" : "transform 0.2s ease-in-out",
            maxWidth: "100%",
            maxHeight: "100%",
            // position: "absolute",
            top: "50%",
            left: "50%",
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Controles de zoom - superior esquerdo */}
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-2 left-2 z-20 flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md shadow-md "
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-300 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setZoom(Math.max(1, zoom - 0.5));
              }}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Slider
              min={1}
              max={5}
              step={0.1}
              value={[zoom]}
              onValueChange={(val) => setZoom(val[0])}
              className="w-28 [&_[role=slider]]:bg-blue-600 [&_[role=slider]]:hover:bg-blue-700
             [&_[role=slider]]:border-none [&_[role=slider]]:shadow-md
             [&_[data-state=active]]:ring-2 [&_[data-state=active]]:ring-blue-300
             [&_[data-state=active]]:ring-offset-1
             [&_[data-part=track]]:bg-blue-200
             [&_[data-part=range]]:bg-blue-600"
            />
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                setZoom(Math.min(5, zoom + 0.5));
              }}
            >
              <Plus className="w-4 h-4" />
            </Button>
            {zoom > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom(1);
                }}
              >
                <EyeClosed className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
