import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  // return (
  //   <div className="p-10">
  //     <h1 className="text-3xl font-bold">
  //       React Starter
  //     </h1>

  //     <button className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white">
  //       Test Tailwind
  //     </button>
  //   </div>
  // );
  return (
    <>
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 3500,
          style: {
            background: "#FFFFFF",
            color: "#1E293B",
            border: "1px solid #FECACA",
            borderLeft: "4px solid #EF4444",
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "13px",
            fontWeight: "500",
            lineHeight: "1.5",
            maxWidth: "380px",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.10)",
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#FFFFFF",
            },
          },
          success: {
            iconTheme: {
              primary: "#16A34A",
              secondary: "#FFFFFF",
            },
          },
        }}
      />
      <AppRoutes />
    </>
  );
}

export default App;
