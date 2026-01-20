import styles from "./profil.module.css";

export default function Profil({ age, genre, taille, poids }) {
  return (
    <div className={styles.containerProfil}>
      <p>Votre profil</p>
      <div className={styles.separatorLine}></div>
      <p>Âge : {age}</p>
      <p>Genre : {genre}</p>
      <p>Taille : {taille}</p>
      <p>Poids : {poids}kg</p>
    </div>
  );
}
