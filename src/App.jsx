import { Buttons } from "./components/Buttons";
import { Header } from "./components/Header";
import "./global.css";

import { Card } from "./components/Card";

export function App() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <Card
          className="w-[600px] h-full"
          src="https://api.thingspeak.com/channels/2468578/charts/2?title=Temperatura&color=FF69B4&xaxis=Time&type=column&yaxismin&yaxismax&width=600&height"
        />
        <Card
          className="w-[600px] h-full"
          src="https://api.thingspeak.com/channels/2468578/charts/1?title=Umidade&color=FF69B4&xaxis=Time&type=column&yaxismin&yaxismax&width=600&height"
        />
      </div>
    </div>
  );
}
