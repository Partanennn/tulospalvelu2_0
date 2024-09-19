import logos from "./logos";

const includesTeamname = (teamName: string, comparedTeamName: string) =>
  teamName.toLowerCase().includes(comparedTeamName);

const getLogo = (teamName: string) => {
  if (includesTeamname(teamName, "ilves")) {
    return logos.IlvesPNG;
  }

  if (includesTeamname(teamName, "tappara")) {
    return logos.TapparaPNG;
  }

  if (includesTeamname(teamName, "nokia")) {
    return logos.HCNokiaPNG;
  }

  if (includesTeamname(teamName, "hpk")) {
    return logos.HpkPNG;
  }

  if (includesTeamname(teamName, "koovee")) {
    return logos.KooveePNG;
  }

  if (includesTeamname(teamName, "leki")) {
    return logos.LeKiPNG;
  }

  if (includesTeamname(teamName, "pelicans")) {
    return logos.PelicansPNG;
  }

  return logos.LeijonaMustaPNG;
};

export default getLogo;
