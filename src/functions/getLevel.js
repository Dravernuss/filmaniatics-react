function getLevel(total) {
  if (total < 21) {
    return <span className="level">Iniciado</span>;
  } else if (20 < total && total < 41) {
    return (
      <span className="level" style={{ color: "rgb(33, 125, 0)" }}>
        Novato
      </span>
    );
  } else if (40 < total && total < 61) {
    return (
      <span className="level" style={{ color: "rgb(14, 0, 98)" }}>
        Conocedor
      </span>
    );
  } else if (60 < total && total < 101) {
    return (
      <span className="level" style={{ color: "rgb(88, 75, 40)" }}>
        Experto
      </span>
    );
  } else if (total > 100) {
    return (
      <span className="level" style={{ color: "rgb(195, 149, 0" }}>
        FilManiatico
      </span>
    );
  }
}

export default getLevel;
