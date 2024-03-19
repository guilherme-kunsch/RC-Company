import { Buttons } from "./components/Buttons";
import { Header } from "./components/Header";
import "./global.css";

import { Card } from "./components/Card";

export function App() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center flex-wrap">
        <Card
          className="w-80 md:w-[37.5rem] h-full"
          src="https://api.thingspeak.com/channels/2468578/charts/1?title=Umidade&width=600&type=spline&dynamic=true&results=20"
        />
        <Card
          className="w-80 md:w-[37.5rem] h-full"
          src="https://api.thingspeak.com/channels/2468578/charts/2?title=Temperatura&width=600&type=spline&dynamic=true&results=20"
        />
      </div>
    </div>
  );
}
