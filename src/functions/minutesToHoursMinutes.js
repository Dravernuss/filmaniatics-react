function minutesToHHMM(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const answer = `${h} h ${m}m`;
  return answer;
}

export default minutesToHHMM;
