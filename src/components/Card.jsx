export function Card() {
    return (
      <div className="h-96 w-full flex justify-center bg-slate-400">
        <div className="h-full w-1/2 p-4 flex justify-center">
          <iframe className="w-full h-full" src="https://api.thingspeak.com/channels/2468578/charts/1?title=Umidade&color=FF69B4&width=850&height=300&xaxis=Time"></iframe>
        </div>
      </div>
    );
  }
  