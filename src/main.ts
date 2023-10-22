import "./style.css";
import { setupGraph } from "./graph";

document.querySelector<HTMLDivElement>("#app")!.innerHTML =
  "<div id='container' class='container mx-auto p-8 flex flex-col items-center mt-2'></div>";

setupGraph(document.querySelector<HTMLDivElement>("#container")!);
