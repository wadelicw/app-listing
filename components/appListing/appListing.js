import styles from "./styles.module.scss"

const appListing = (props) => {

   const pictureUrl = props.icon;
   return(
      <div className={styles.section}>
         <div className={styles.number}>
            <p>{props.number}</p>
         </div>

         <div className={styles.pictureBox}>
            <figure>
               
               <img src={pictureUrl}></img>


            </figure>
         </div>

         <div className={styles.details}>
            <ul>
               <li> {props.appName}</li>
               <li> {props.genre}</li>
               <li> star rating </li>
            </ul>
         </div>
      </div>
   )
}   

export default appListing