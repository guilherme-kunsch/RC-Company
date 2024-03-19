export function Card(props) {
    return (
      <div className="flex h-96 m-8 mx-auto md:flex">
          <iframe className={props.className} src={props.src}></iframe>
      </div>
    );
  }
  