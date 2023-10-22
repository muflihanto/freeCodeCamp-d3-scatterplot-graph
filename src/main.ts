import "./style.css";
import { setupGraph } from "./graph";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container mx-auto p-8 flex flex-col items-center">
    <h1 class="font-bold text-2xl" id="title">Doping in Professional Bicycle Racing</h1>
    <div id="container" class="mt-2"></div> 
  </div>
`;

setupGraph(document.querySelector<HTMLDivElement>("#container")!);
