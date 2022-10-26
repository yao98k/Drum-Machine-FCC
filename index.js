const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  const [description, setDescription] = React.useState("");
  const [volume, setVolume] = React.useState(1);

  return (
    
    <div className="container main" id="drum-machine">
        <h2 className="text-center">Drum Machine freeCodeCamp</h2>
      <div class="row">
        <div class="col-6">
          <div className="pads">
            {bankOne.map((item, i) => (
              <Pad
                clip={item}
                key={item.id}
                volume={volume}
                setDescription={setDescription}
                description={description}
              />
            ))}
          </div>
        </div>

        <div class="col-6">
          <div className="options">
            <h4>Volume</h4>
            <input
              type="range"
              step="0.01"
              value={volume}
              onChange={(event) => setVolume(event.target.value)}
              max="1"
              min="0"
              className="w-50"
            />

            <div className="description" id="display">
              <h4>{description}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pad({ clip, volume, setDescription, description }) {
  //Seçilmiş olan drum'ı tutuyoruz. Seçildiğinde ses çıkartıp rengi değişiyor ve bir süre sonra eski haline dönüyor.
  const [selected, setSelected] = React.useState(false);

  //Klavye ile çalabilmek için
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  function handleKeyPress(event) {
    if (event.keyCode === clip.keyCode) {
      play();
    }
  }

  //Sesi çalmak için:
  function play() {
    const playAudio = document.getElementById(clip.keyTrigger);
    setSelected(true);
    setDescription(clip.id);
    //3 ms sonra select durumunu değiştiriyor ve rengi varsayılan duruma geçiyor.
    setTimeout(() => setSelected(false), 300);
    playAudio.volume = volume;
    playAudio.currentTime = 0;
    playAudio.play();
  }
  return (
    <div id="display">
      <button
     type="button" 
        className={`btn btn-info button ${selected && "btn-warning"} drum-pad`}
        onClick={play}
        id={clip.id}
      >
        <audio className="clip drum-pad" id={clip.keyTrigger} src={clip.url} />
        {clip.keyTrigger}
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
