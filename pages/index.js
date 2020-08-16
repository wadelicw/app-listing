import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import InputBar from '../components/inputBar/inputBar.js'
import AppListing from '../components/appListing/appListing.js'

export default function Home() {

   const [appsData, setAppsData] = useState({})
   const [hasError, setHasError] = useState(false)
   const [isLoading, setIsLoading] = useState(false);
   const [appsRating, setAppsRating] = useState({})
  

   useEffect( () => {
      const targetUrl = "https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/10/explicit.json ";
      /*
      Top 100:
      const targetUrl = "https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/100/explicit.json"
      */

      axios(targetUrl)
         .then(res => setAppsData( res.data))
         .then(() => setIsLoading(true))
         .catch((err) => setHasError(true));

      }, [])

   useEffect( () => {
      const targetUrl = "https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/10/explicit.json ";
      /*
      Top 100:
      const targetUrl = "https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/100/explicit.json"
      */

      axios(targetUrl)
         .then(res => setAppsData( res.data))
         .then(() => setIsLoading(true))
         .catch((err) => setHasError(true));

      }, [])   


      
   
   let appsArray = ['Top 100 Apps'];
   if(isLoading){
      for (var i =0; i < 10; i++){
        appsArray.push(
           <AppListing
            key={i}
            appName={appsData.feed.results[i].name}
            number={i+1}
            icon={appsData.feed.results[i].artworkUrl100}
            genre={appsData.feed.results[i].genres[0].name}
           />
        )
      }
   }
   

   
   return (
      <div className={styles.container}>
      <Head>
         <title>App Listing</title>
         <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

         <div >
            <InputBar className={styles.input}></InputBar>
         </div>

         
         <div>
            {hasError? <div>Error occured.</div> : null}    
            {isLoading? (console.log(appsData)) : <div>Loading.</div> }    
            {appsArray}
            
         </div>


         
      </main>

      
      </div>
   )
}
