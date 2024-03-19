export function Card(props) {
    return (
      <div className="h-96 m-8">
          <iframe className={props.className} src={props.src}></iframe>
      </div>
    );
  }
  