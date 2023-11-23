import dynamic from "next/dynamic";

const SdkPage = dynamic(() => import("../src/sdk"), {
  ssr: false,
});
export default function Home() {
  return (
    <div className="uq-container-example">
      <SdkPage />
    </div>)
}
