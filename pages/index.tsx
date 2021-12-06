import React, { useEffect, useRef, useState } from "react";
import type Excalidraw from "@excalidraw/excalidraw";
import type { ExcalidrawAPIRefValue } from "@excalidraw/excalidraw/types/types";

const HomePage: React.FC = () => {
  const [Whiteboard, setWhiteboard] = useState<typeof Excalidraw>(null);
  const whiteboardRef = useRef<ExcalidrawAPIRefValue>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setWhiteboard(comp.default));
  }, []);

  return (
    <>
      <main>
        <div>
          {Whiteboard && (
            <Whiteboard
              ref={whiteboardRef}
              initialData={{ elements: JSON.parse(localStorage.getItem("data")), scrollToContent: true }}
              gridModeEnabled={true}
              UIOptions={{
                canvasActions: {
                  export: false,
                  loadScene: false,
                  saveToActiveFile: false,
                  theme: false,
                  saveAsImage: false,
                },
              }}
            />
          )}
        </div>
        <button
          onClick={async () => {
            const data = await whiteboardRef.current.readyPromise;
            console.log(data);
            localStorage.setItem("data", JSON.stringify(data.getSceneElements()));
          }}
        >
          Save
        </button>
      </main>

      <style jsx>{`
        main {
          background: #1d1d1d;
          position: absolute;
          inset: 0;
        }

        div {
          height: 70%;
          width: 70%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
};

export default HomePage;
